import fs from "node:fs";
import vm from "node:vm";
const source=fs.readFileSync(new URL("./data.js",import.meta.url),"utf8");
const sandbox={window:{}};vm.runInNewContext(source,sandbox);
const d=sandbox.window.ODYSSEUS_DATA;
const tasks=d.stations.flatMap(s=>s.tasks.map(q=>({s,q})));
const ids=new Set();
const errors=[];
if(d.stations.length!==28)errors.push(`erwartet 28 Stationen, gefunden ${d.stations.length}`);
if(tasks.length!==84)errors.push(`erwartet 84 Aufgaben, gefunden ${tasks.length}`);
if(d.characters.length<20)errors.push("weniger als 20 Figuren");
if(tasks.some(x=>!["text","order"].includes(x.q.type)))errors.push("nicht-offener Aufgabentyp vorhanden");
if(tasks.some(x=>["choice","multi","timeline","match"].includes(x.q.type)))errors.push("Auswahlaufgabe vorhanden");
if(new Set(d.stations.flatMap(s=>s.chapter)).size!==11)errors.push("nicht alle 11 Kapitel");
for(const {s,q} of tasks){
  if(ids.has(q.id))errors.push(`doppelte ID ${q.id}`);ids.add(q.id);
  if(!s.pageRef||!s.chapter.length)errors.push(`Quelle fehlt ${q.id}`);
  if(!s.place||!s.themes||s.themes.length<3)errors.push(`Ort oder Themen fehlen ${s.id}`);
  if(!q.hints||q.hints.length<2)errors.push(`Hinweise fehlen ${q.id}`);
  if(q.answer===undefined||!q.feedback||!q.objective)errors.push(`Inhalt unvollständig ${q.id}`);
}
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log(`OK: ${d.stations.length} Stationen, ${tasks.length} offene/kreative Aufgaben, keine MC-Aufgabe, ${d.characters.length} Figuren.`);
