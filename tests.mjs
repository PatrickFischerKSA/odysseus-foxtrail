import fs from "node:fs";
import vm from "node:vm";
const source=fs.readFileSync(new URL("./data.js",import.meta.url),"utf8");
const appSource=fs.readFileSync(new URL("./app.js",import.meta.url),"utf8");
const htmlSource=fs.readFileSync(new URL("./index.html",import.meta.url),"utf8");
const sandbox={window:{}};vm.runInNewContext(source,sandbox);
const d=sandbox.window.ODYSSEUS_DATA;
const tasks=d.stations.flatMap(s=>s.tasks.map(q=>({s,q})));
const ids=new Set();
const errors=[];
const pagesFrom=text=>{
  const pages=new Set();
  for(const match of String(text).matchAll(/(\d+)(?:\s*[–-]\s*(\d+))?/g)){
    const start=Number(match[1]),end=Number(match[2]||match[1]);
    for(let page=start;page<=end;page++)pages.add(page);
  }
  return pages;
};
if(d.stations.length!==28)errors.push(`erwartet 28 Stationen, gefunden ${d.stations.length}`);
if(d.teiresiasInterrogations?.length!==6)errors.push(`erwartet 6 Teiresias-Befragungen, gefunden ${d.teiresiasInterrogations?.length||0}`);
if(d.heroJourney?.phases?.length!==12)errors.push(`erwartet 12 Heldenreise-Stufen, gefunden ${d.heroJourney?.phases?.length||0}`);
if(d.srfTheory?.wolfPlaces?.length!==12)errors.push("SRF-Theorieblock enthält nicht alle 12 Ortsstationen");
if(d.srfTheory?.videos?.length!==6)errors.push("SRF-Theorieblock enthält nicht alle 6 Reisefolgen");
if(d.srfTheory?.alternatives?.length!==4)errors.push("SRF-Theorieblock enthält nicht alle 4 Alternativthesen");
if(d.srfTheory?.tasks?.length!==8)errors.push("SRF-Theorieblock enthält nicht 8 offene Aufgaben");
if(d.podcastLab?.episodes?.length!==2)errors.push("Podcast-Labor enthält nicht beide Folgen");
if(d.podcastLab?.tasks?.length!==9)errors.push("Podcast-Labor enthält nicht 9 offene Aufgaben");
if((d.podcastLab?.tasks||[]).some(q=>!q.prompt||!q.min||q.min<100))errors.push("Podcast-Aufgabe unvollständig");
if((d.podcastLab?.episodes||[]).some(e=>!e.before||!e.during||!e.after||!e.spoiler))errors.push("Didaktische Podcast-Sicherung unvollständig");
if((d.srfTheory?.tasks||[]).some(q=>!q.prompt||!q.min||q.min<100))errors.push("SRF-Theorieaufgabe unvollständig");
const journeyPhaseIds=new Set((d.heroJourney?.phases||[]).map(x=>x.id));
for(const phase of d.heroJourney?.phases||[])if(!phase.concept||!phase.events||!phase.meaning||!phase.workshopPrompt||!phase.fit)errors.push(`Heldenreise-Stufe unvollständig: ${phase.id}`);
for(const task of d.heroJourney?.tasks||[])for(const id of task.phaseIds)if(!journeyPhaseIds.has(id))errors.push(`Unbekannte Heldenreise-Stufe ${id} in ${task.id}`);
for(const oracle of d.teiresiasInterrogations||[]){
  if(!oracle.source||!oracle.answer||!oracle.guide||oracle.terms.length<5)errors.push(`Teiresias-Befragung unvollständig: ${oracle.id}`);
  if(Math.max(...pagesFrom(oracle.source))>54)errors.push(`Teiresias-Befragung greift zu weit voraus: ${oracle.id}`);
}
if(tasks.length!==84)errors.push(`erwartet 84 Aufgaben, gefunden ${tasks.length}`);
if(d.characters.length<20)errors.push("weniger als 20 Figuren");
if(!htmlSource.includes('data-view="characters">Personennetz'))errors.push("Personennetz fehlt in der Hauptnavigation");
if(!htmlSource.includes("https://www.dropbox.com/scl/fi/")||!htmlSource.includes("&amp;dl=1"))errors.push("Hörbuch ist nicht mit dem offiziellen Dropbox-Downloadparameter eingebunden");
if(/class="resource-button audio"[^>]*\sdownload(?:\s|>)/.test(htmlSource))errors.push("Browserabhängiges download-Attribut am Dropbox-Link vorhanden");
if(htmlSource.includes("Dropbox-Ressource öffnen")||htmlSource.includes("&amp;dl=0"))errors.push("Veralteter Dropbox-Vorschaulink vorhanden");
if(!appSource.includes('VON BEGINN AN FREI · SPOILERARME ORIENTIERUNG'))errors.push("Personennetz ist nicht als freie Lesehilfe gekennzeichnet");
for(const tree of ["Haus Ithaka","Götterfamilien","Haus der Phaiaken","Ganzes Netz"])if(!appSource.includes(tree))errors.push(`Stammbaum fehlt: ${tree}`);
if(tasks.some(x=>!["text","order"].includes(x.q.type)))errors.push("nicht-offener Aufgabentyp vorhanden");
if(tasks.some(x=>["choice","multi","timeline","match"].includes(x.q.type)))errors.push("Auswahlaufgabe vorhanden");
if(new Set(d.stations.flatMap(s=>s.chapter)).size!==11)errors.push("nicht alle 11 Kapitel");
for(const {s,q} of tasks){
  if(ids.has(q.id))errors.push(`doppelte ID ${q.id}`);ids.add(q.id);
  if(!s.pageRef||!s.chapter.length)errors.push(`Quelle fehlt ${q.id}`);
  if(!s.place||!s.themes||s.themes.length<3)errors.push(`Ort oder Themen fehlen ${s.id}`);
  if(!q.hints||q.hints.length<2)errors.push(`Hinweise fehlen ${q.id}`);
  if(q.answer===undefined||!q.feedback||!q.objective)errors.push(`Inhalt unvollständig ${q.id}`);
  const stationPages=pagesFrom(s.pageRef);
  for(const hint of q.hints){
    const marker=hint.match(/PDF-Seite(?:n)?\s+(.+?)(?:\.|$)/);
    if(!marker)continue;
    const missing=[...pagesFrom(marker[1])].filter(page=>!stationPages.has(page));
    if(missing.length)errors.push(`Quellenbereich ${q.id}: PDF-Seite ${missing.join(", ")} fehlt in Station ${s.pageRef}`);
  }
}
const limits=[50,100,150,200,Infinity];
const expected=[6,13,16,22,28];
const counts=limits.map(limit=>d.stations.filter(s=>Math.max(...pagesFrom(s.pageRef))<=limit).length);
if(counts.some((count,index)=>count!==expected[index]))errors.push(`unerwartete Leseplan-Pakete: ${counts.join("/")}`);
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log(`OK: ${d.stations.length} Stationen, ${tasks.length} offene/kreative Aufgaben, keine MC-Aufgabe, ${d.characters.length} Figuren.`);
