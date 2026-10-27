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
const migrationCode=appSource.slice(appSource.indexOf("function migrateState"),appSource.indexOf("function load()"));
const migrationSandbox={};
vm.runInNewContext(`const STATE_SCHEMA_VERSION=2;const initial={schemaVersion:2,completed:[],taskResults:{},hints:{},attempts:{},score:12,clues:[],achievements:[],rewardedAchievements:[],transactions:[{amount:12,label:"Startguthaben"}],mediaNotes:{},journeyResults:{},journeyAttempts:{},journeyHints:{},journeyStageNotes:{},journeyStageCompleted:[],theoryNotes:{},theoryCompleted:[],podcastNotes:{},podcastCompleted:[],podcastPlayback:{},podcastListened:[],teiresiasChats:{},teiresiasCompleted:[],writing:{fields:{},completed:[],revision:[],draftComplete:false}};${migrationCode};globalThis.stateTools={migrateState,mergeLearningStates};`,migrationSandbox);
const oldState={completed:["troja"],taskResults:{t1:true},attempts:{t2:2},score:37,theoryNotes:{x:"alter ausführlicher Text"},writing:{fields:{draft:"bestehender Entwurf"},completed:["plan"],revision:[1],draftComplete:false}};
const migrated=migrationSandbox.stateTools.migrateState(oldState);
if(!migrated.completed.includes("troja")||!migrated.taskResults.t1||migrated.score!==37||migrated.writing.fields.draft!=="bestehender Entwurf")errors.push("Migration zerstört bestehenden Lernstand");
const mergedProgress=migrationSandbox.stateTools.mergeLearningStates(oldState,{completed:["polyphem"],taskResults:{t3:true},attempts:{t2:1},score:20,theoryNotes:{x:"kurz"},writing:{fields:{draft:"neu"},completed:[],revision:[],draftComplete:true}});
if(!mergedProgress.completed.includes("troja")||!mergedProgress.completed.includes("polyphem")||!mergedProgress.taskResults.t1||!mergedProgress.taskResults.t3||mergedProgress.attempts.t2!==2||mergedProgress.score!==37||mergedProgress.theoryNotes.x!=="alter ausführlicher Text"||mergedProgress.writing.fields.draft!=="bestehender Entwurf"||!mergedProgress.writing.draftComplete)errors.push("Synchronisation überschreibt bestehenden Lernstand");
const answerCode=appSource.slice(appSource.indexOf("function openAnswerCorrect"),appSource.indexOf("function unlocked"));
const answerSandbox={};
vm.runInNewContext(`function normal(s){return String(s).trim().toLocaleLowerCase("de-CH").normalize("NFD").replace(/\\p{Diacritic}/gu,"").replace(/[^a-z0-9]/g,"")}const stopWords=new Set(["die","der","das","den","dem","des","ein","eine","einen","einer","und","oder","mit","von","vor","nach","wird","werden","sich","sein","seine","ihre","ihren","ihm","sie","er","ist","als","bei","zum","zur","auf","wegen","durch","gegen"]);function words(s){return String(s).toLocaleLowerCase("de-CH").normalize("NFD").replace(/\\p{Diacritic}/gu,"").match(/[a-z0-9]+/g)?.filter(w=>w.length>2&&!stopWords.has(w))||[]}${answerCode};globalThis.check=openAnswerCorrect;`,answerSandbox);
const taskById=id=>tasks.find(x=>x.q.id===id).q;
if(!answerSandbox.check(taskById("t1"),"Die Gottheiten sind wütend über die Verbrechen der Sieger."))errors.push("Synonymantwort wird nicht erkannt");
if(!answerSandbox.check(taskById("p1"),"Keiner"))errors.push("Hinterlegte Alternativantwort wird nicht erkannt");
if(answerSandbox.check(taskById("t3"),"Odysseus hat Hunger."))errors.push("Offensichtlich falsche Kurzantwort wird akzeptiert");
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
for(const {q} of tasks.filter(({q})=>q.type==="order"))if(!q.prompt.includes("eingeblendeten")||!q.prompt.includes("chronologisch"))errors.push(`Reihenfolgefrage ist nicht klar, ohne die Lösung vorwegzunehmen: ${q.id}`);
if(new Set(d.stations.flatMap(s=>s.chapter)).size!==11)errors.push("nicht alle 11 Kapitel");
for(const {s,q} of tasks){
  if(ids.has(q.id))errors.push(`doppelte ID ${q.id}`);ids.add(q.id);
  if(!s.pageRef||!s.chapter.length)errors.push(`Quelle fehlt ${q.id}`);
  if(!s.place||!s.themes||s.themes.length<3)errors.push(`Ort oder Themen fehlen ${s.id}`);
  if(!q.hints||q.hints.length<2)errors.push(`Hinweise fehlen ${q.id}`);
  if(q.answer===undefined||!q.feedback||!q.objective)errors.push(`Inhalt unvollständig ${q.id}`);
  if(!q.instruction)errors.push(`Antwortformat fehlt ${q.id}`);
  if(!q.promptSimplified)errors.push(`Frage nicht einzeln vereinfacht ${q.id}`);
  if(q.expectedParts>1&&!/(genau|beide|zwei|drei|vier|1\.|2\.|3\.|4\.|ordne|alle|je einen)/i.test(q.prompt))errors.push(`Mehrteilige Frage nennt ihren Umfang nicht eindeutig: ${q.id}`);
  if(!q.instruction.includes(q.objective))errors.push(`Individueller Prüffokus fehlt ${q.id}`);
  if(!Number.isInteger(q.expectedParts)||q.expectedParts<1)errors.push(`Erwartungsumfang fehlt ${q.id}`);
  const stationPages=pagesFrom(s.pageRef);
  for(const hint of q.hints){
    const marker=hint.match(/PDF-Seite(?:n)?\s+(.+?)(?:\.|$)/);
    if(!marker)continue;
    const missing=[...pagesFrom(marker[1])].filter(page=>!stationPages.has(page));
    if(missing.length)errors.push(`Quellenbereich ${q.id}: PDF-Seite ${missing.join(", ")} fehlt in Station ${s.pageRef}`);
  }
}
for(const vague of ["Welche wichtigen Nachrichten","Nenne die richtigen Aussagen","Was wird zuerst erzählt, und was geschieht zeitlich zuerst","Welche Personen sind in Kapitel 7 treu","Welche Vorteile hat Odysseus","Welche zwei Prüfungen plant Penelope"]){
  if(tasks.some(({q})=>q.prompt.includes(vague)))errors.push(`Vage Frageformulierung noch vorhanden: ${vague}`);
}
if(!appSource.includes('id="requestTaskHint"'))errors.push("Abrufbarer Stationshinweis fehlt");
if(!appSource.includes("kostenloser Hinweis:")||!appSource.includes("Musterlösung:"))errors.push("Dreistufige Rückmeldung fehlt");
if(!appSource.includes('<textarea class="text-answer" id="textAnswer"')||appSource.includes('<input class="text-answer" id="textAnswer"'))errors.push("Stationsantworten sind nicht mehrzeilig beschreibbar");
if(!appSource.includes('const KEY = "athenes-archiv-v1"'))errors.push("Bestehender Lernstand-Schlüssel wurde verändert");
if(!appSource.includes('let activeStudentId = ""')||!appSource.includes("let pendingStudentId = localStorage.getItem(ACTIVE_KEY)"))errors.push("Letztes Schülerprofil wird weiterhin stillschweigend aktiviert");
if(!appSource.includes('id="confirmStudent"')||!appSource.includes('id="chooseOtherStudent"'))errors.push("Explizite Profilbestätigung oder sicherer Profilwechsel fehlt");
if(!appSource.includes("function migrateState")||!appSource.includes("function mergeLearningStates"))errors.push("Verlustfreie Lernstand-Migration fehlt");
if(!appSource.includes("Bestandsschutz: Versionswechsel ergänzen Daten nur"))errors.push("Bestandsschutz ist nicht als Projektregel verankert");
if(!appSource.includes('id="teacherWalkthrough"')||!appSource.includes("Musterlösung")||!appSource.includes("bindTeacherWalkthrough"))errors.push("Lehrer-Walkthrough fehlt");
if(!appSource.includes("stations.reduce((sum,s)=>sum+s.tasks.length,0)"))errors.push("Lehrer-Walkthrough zählt nicht sämtliche Stationsaufgaben");
if(!appSource.includes('USERS_BACKUP_KEY = "athenes-schueler-sicherung-v1"'))errors.push("lokale Lernstand-Sicherung fehlt");
if(!appSource.includes("activeStudentId!==scheduledStudentId"))errors.push("Profilwechsel-Schutz der Cloud-Synchronisation fehlt");
if(!appSource.includes("response.status===409"))errors.push("Konfliktschutz für neuere Cloud-Lernstände fehlt");
if(!appSource.includes("function shuffledOrder(q)")||!appSource.includes("Math.random()*(i+1)"))errors.push("Zufallsgenerator für Reihenfolgeaufgaben fehlt");
if(!appSource.includes('JSON.stringify(items)===JSON.stringify(q.answer)'))errors.push("Reihenfolgeaufgaben können weiterhin bereits richtig erscheinen");
const workerSource=fs.readFileSync(new URL("./worker/src/index.js",import.meta.url),"utf8");
if(!workerSource.includes("row.updated_at > baseUpdatedAt")||!workerSource.includes("}, 409)"))errors.push("Server schützt neuere Lernstände nicht vor Überschreiben");
if(appSource.includes("q.promptSimplified||q.prompt"))errors.push("Lehrer-Walkthrough zeigt Wahr/Falsch-Kennzeichen statt Fragetext");
const limits=[50,100,150,200,Infinity];
const expected=[6,13,16,22,28];
const counts=limits.map(limit=>d.stations.filter(s=>Math.max(...pagesFrom(s.pageRef))<=limit).length);
if(counts.some((count,index)=>count!==expected[index]))errors.push(`unerwartete Leseplan-Pakete: ${counts.join("/")}`);
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log(`OK: ${d.stations.length} Stationen, ${tasks.length} offene/kreative Aufgaben, keine MC-Aufgabe, ${d.characters.length} Figuren.`);

// Gezielte Rückmeldungen müssen genau die fehlenden Teilaspekte anzeigen.
const reviewSandbox={};
vm.runInNewContext(appSource.slice(appSource.indexOf('function journeyReview'),appSource.indexOf('function journeyFeedback'))+';globalThis.review=journeyReview;',reviewSandbox);
const journeySamples=[
  'Die Heldenreise ordnet die zeitliche Entwicklung. Lechner wechselt zu Telemachos und erzählt bei den Phaiaken im Rückblick.',
  'Hermes hilft mit Moly gegen Kirkes Zauber. Poseidon behindert durch Stürme. Teiresias warnt vor Helios und seinen Rindern.',
  'Die Gefährten schlachten Helios’ Rinder trotz Verbot. Schiff und Mannschaft gehen unter. Athene bittet Zeus und Hermes bringt Kalypso den Freilassungsbefehl.',
  'Eurykleia erkennt die Narbe als Beweis. Die Bogenprobe zeigt seine Fähigkeit und enthüllt seine Identität öffentlich. Penelope erkennt ihn am Bettgeheimnis.',
  'Athene gibt dem unsicheren Telemachos einen Auftrag. Er besucht Nestor und Menelaos und entgeht dem Hinterhalt der Freier. Er handelt selbstständig mit seinem Vater.',
  'Das Modell ordnet die zeitliche Entwicklung. Lechners Roman nutzt parallele Stränge und Rückblicke, die das Schema durchbrechen.'
];
for(const [i,q] of d.heroJourney.tasks.entries()){
  if(!reviewSandbox.review(q,journeySamples[i]).correct)throw new Error(`Vollständige Antwort abgelehnt: ${q.id}`);
  if(reviewSandbox.review(q,'').missing.length!==q.criteria.length)throw new Error(`Leere Antwort nicht erklärt: ${q.id}`);
  if(reviewSandbox.review(q,'Odysseus ist ein Held.').correct)throw new Error(`Pauschale Antwort akzeptiert: ${q.id}`);
}
const partial=reviewSandbox.review(d.heroJourney.tasks[1],'Hermes hilft mit Moly gegen Kirkes Zauber.');
if(partial.correct||partial.missing.length!==2||!partial.missing[0].hint.includes('Gegner')||!partial.missing[1].hint.includes('Teiresias'))throw new Error('Teilantwort erhält keine gezielte Defizitrückmeldung');
console.log('OK: 6 differenzierte Heldenreise-Prüfungen, leere und unvollständige Antworten.');

const hintSandbox={};
vm.runInNewContext(appSource.slice(appSource.indexOf('function hintStep'),appSource.indexOf('function renderJourneyQuestion'))+';globalThis.hintTools={hintStep,hintLabel,hintContent};',hintSandbox);
for(const [opened,total,attempts,count,cost] of [[0,2,0,1,1],[1,2,0,2,1],[0,2,1,1,0],[1,2,1,2,0],[2,2,0,2,0],[2,2,3,2,0],[0,3,4,1,0]]){
  const actual=hintSandbox.hintTools.hintStep(opened,total,attempts);
  if(actual.count!==count||actual.cost!==cost)throw new Error('Falscher Hinweistarif: '+JSON.stringify({opened,total,attempts,actual}));
}
const hintQ={hints:['Erster Hinweis','Zweiter Hinweis']};
if(!hintSandbox.hintTools.hintLabel(hintQ,0,0).includes('−1 Eule')||!hintSandbox.hintTools.hintLabel(hintQ,0,1).includes('kostenlos'))throw new Error('Hinweisbutton zeigt falsche Kosten');
console.log('OK: Hinweise kosten vor einem Versuch 1 Eule, danach und beim Wiederansehen 0.');

// Exercise the actual journey click handlers, including an empty submission,
// a paid hint before trying, and free hints after a failed answer at zero balance.
function journeyHarness(){
  const elements=new Map();
  const element=selector=>{if(!elements.has(selector))elements.set(selector,{value:'',innerHTML:'',textContent:'',dataset:{},addEventListener(type,handler){this[type]=handler;}});return elements.get(selector);};
  const checkButton=element('check');checkButton.dataset.checkJourney='hj1';
  const hintButton=element('[data-hint-journey="hj1"]');hintButton.dataset.hintJourney='hj1';
  const state={score:0,journeyHints:{},journeyAttempts:{}};
  const context={D:d,state,document:{querySelector:element,querySelectorAll:selector=>selector==='[data-check-journey]'?[checkButton]:selector==='[data-hint-journey]'?[hintButton]:[]},esc:s=>String(s),save(){},record(amount){state.score+=amount},showThreads(){}};
  const code=appSource.slice(appSource.indexOf('function journeyReview'),appSource.indexOf('function unlocked'))+appSource.slice(appSource.indexOf('function hintStep'),appSource.indexOf('function showRoute'));
  vm.runInNewContext(code+';bindJourneyQuestions();',context);
  return {state,element,checkButton,hintButton};
}
const emptyRun=journeyHarness();emptyRun.checkButton.click();
if(emptyRun.state.journeyAttempts.hj1)throw new Error('Leere Eingabe zählt als Versuch');
const paidRun=journeyHarness();paidRun.state.score=5;paidRun.hintButton.click();
if(paidRun.state.score!==4)throw new Error('Hinweis vor Versuch kostet nicht genau 1 Eule');
paidRun.element('[data-journey-answer="hj1"]').value='Odysseus ist ein Held.';paidRun.checkButton.click();paidRun.hintButton.click();paidRun.hintButton.click();
if(paidRun.state.score!==4||paidRun.state.journeyHints.hj1!==2)throw new Error('Kosten nach Antwortversuch oder Wiederholung');
const freeRun=journeyHarness();freeRun.element('[data-journey-answer="hj1"]').value='Odysseus ist ein Held.';freeRun.checkButton.click();freeRun.hintButton.click();freeRun.hintButton.click();
if(freeRun.state.score!==0||!freeRun.hintButton.textContent.includes('kostenlos'))throw new Error('Hinweise funktionieren ohne Eulen nicht');
if(!freeRun.element('[data-journey-hints="hj1"]').innerHTML.includes(d.heroJourney.tasks[0].hints[0])||!freeRun.element('[data-journey-hints="hj1"]').innerHTML.includes(d.heroJourney.tasks[0].hints[1]))throw new Error('Geöffnete Hinweise verschwinden');
console.log('OK: Tatsächliche Hinweis- und Prüfbuttons buchen korrekt, auch mit 0 Eulen.');
