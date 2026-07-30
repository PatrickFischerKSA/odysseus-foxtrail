const SITE_ORIGIN = "https://patrickfischerksa.github.io";

function cors(request) {
  const origin = request.headers.get("Origin") || "";
  const allowed = origin === SITE_ORIGIN || origin === "null" || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : SITE_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type, X-Student-Token",
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    "Vary": "Origin",
    "Cache-Control": "no-store"
  };
}

function json(request, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors(request), "Content-Type": "application/json; charset=utf-8" }
  });
}

async function hash(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map(x => x.toString(16).padStart(2, "0")).join("");
}

function cleanName(value) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, 50);
}

function validState(state) {
  const serialized = JSON.stringify(state);
  return state && typeof state === "object" && serialized.length <= 250000 ? serialized : null;
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(request) });
    const url = new URL(request.url);
    try {
      if (url.pathname === "/health") return json(request, { ok: true });

      if (url.pathname === "/register" && request.method === "POST") {
        const body = await request.json();
        const first = cleanName(body.first);
        const last = cleanName(body.last);
        if (first.length < 2 || last.length < 2) return json(request, { error: "Vor- und Nachname fehlen." }, 400);
        const id = crypto.randomUUID();
        const token = `${crypto.randomUUID()}${crypto.randomUUID()}`;
        const tokenHash = await hash(token);
        const now = Date.now();
        await env.DB.prepare(
          "INSERT INTO students (id, first_name, last_name, token_hash, state_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
        ).bind(id, first, last, tokenHash, JSON.stringify(body.state || {}), now, now).run();
        return json(request, { id, token, first, last, updatedAt: now }, 201);
      }

      if (url.pathname === "/student") {
        const token = request.headers.get("X-Student-Token") || "";
        if (!token) return json(request, { error: "Schülerzugang fehlt." }, 401);
        const tokenHash = await hash(token);
        const row = await env.DB.prepare(
          "SELECT id, first_name, last_name, state_json, updated_at FROM students WHERE token_hash = ?"
        ).bind(tokenHash).first();
        if (!row) return json(request, { error: "Schülerzugang ist ungültig." }, 401);
        if (request.method === "GET") {
          return json(request, { id: row.id, first: row.first_name, last: row.last_name, state: JSON.parse(row.state_json), updatedAt: row.updated_at });
        }
        if (request.method === "PUT") {
          const body = await request.json();
          const serialized = validState(body.state);
          if (!serialized) return json(request, { error: "Spielstand ist ungültig oder zu gross." }, 400);
          const now = Date.now();
          await env.DB.prepare("UPDATE students SET state_json = ?, updated_at = ? WHERE token_hash = ?")
            .bind(serialized, now, tokenHash).run();
          return json(request, { ok: true, updatedAt: now });
        }
      }

      if (url.pathname === "/teacher/students" && request.method === "POST") {
        const body = await request.json();
        if (body.pin !== env.TEACHER_PIN) return json(request, { error: "Lehrer-PIN stimmt nicht." }, 403);
        const result = await env.DB.prepare(
          "SELECT id, first_name, last_name, state_json, created_at, updated_at FROM students ORDER BY last_name, first_name"
        ).all();
        return json(request, {
          students: result.results.map(row => ({
            id: row.id, first: row.first_name, last: row.last_name,
            state: JSON.parse(row.state_json), createdAt: row.created_at, updatedAt: row.updated_at
          }))
        });
      }

      return json(request, { error: "Nicht gefunden." }, 404);
    } catch (error) {
      return json(request, { error: "Serverfehler.", detail: error.message }, 500);
    }
  }
};
