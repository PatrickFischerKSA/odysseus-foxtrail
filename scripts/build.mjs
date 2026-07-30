import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const client = join(dist, "client");

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "server"), { recursive: true });
await mkdir(client, { recursive: true });

for (const file of ["index.html", "styles.css", "data.js", "app.js"]) {
  await cp(join(root, file), join(client, file));
}
await cp(join(root, "assets"), join(client, "assets"), { recursive: true });

const worker = `export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);
    if (incoming.pathname === "/") incoming.pathname = "/index.html";
    let response = await env.ASSETS.fetch(new Request(incoming, request));
    if (response.status === 404 && request.headers.get("accept")?.includes("text/html")) {
      const fallback = new URL("/index.html", request.url);
      response = await env.ASSETS.fetch(new Request(fallback, request));
    }
    return response;
  }
};
`;
await writeFile(join(dist, "server", "index.js"), worker);

const html = await readFile(join(client, "index.html"), "utf8");
if (!html.includes("Die verlorenen Spuren des Odysseus")) {
  throw new Error("Finished site title is missing from index.html");
}
console.log("Static Sites build ready.");
