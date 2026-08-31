(() => {
  const D = window.ODYSSEUS_DATA;
  const KEY = "athenes-archiv-v1";
  const API = "https://odysseus-foxtrail-class.patrick-fischer.workers.dev";
  const USERS_KEY = "athenes-schueler-v1";
  const USERS_BACKUP_KEY = "athenes-schueler-sicherung-v1";
  const ACTIVE_KEY = "athenes-aktives-profil-v1";
  const TEACHER_PIN_KEY = "athenes-lehrer-pin-v1";
  const FILM_PAUSED_KEY = "athenes-hintergrundfilm-pausiert-v1";
  const STATE_SCHEMA_VERSION = 2;
  const READING_PLAN = [
    {date:"2026-08-24",pages:50,label:"bis Seite 50"},
    {date:"2026-08-31",pages:100,label:"bis Seite 100"},
    {date:"2026-09-07",pages:150,label:"bis Seite 150"},
    {date:"2026-09-14",pages:200,label:"bis Seite 200"},
    {date:"2026-09-21",pages:Infinity,label:"ganzes Buch"}
  ];
  const initial = {
    schemaVersion:STATE_SCHEMA_VERSION,
    completed:[],taskResults:{},hints:{},attempts:{},score:12,clues:[],achievements:[],
    rewardedAchievements:[],transactions:[{amount:12,label:"Startguthaben",kind:"reward"}],
    streak:0,bestStreak:0,mediaNotes:{},journeyResults:{},journeyAttempts:{},journeyHints:{},
    writing:{fields:{},completed:[],revision:[],draftComplete:false},journeyStageNotes:{},journeyStageCompleted:[],theoryNotes:{},theoryCompleted:[],podcastNotes:{},podcastCompleted:[],podcastPlayback:{},podcastListened:[],podcastAcknowledged:false,teiresiasChats:{},teiresiasCompleted:[],final:false
  };
  let activeStudentId = localStorage.getItem(ACTIVE_KEY) || "";
  let state = load();
  let cloudSaveTimer = null;
  let teacherStudents = [];
  let teacherUnlockedStations = [];
  let teacherPinSession = "";
  let currentStation = null;
  let taskIndex = 0;
  let order = [];
  const view = document.querySelector("#view");
  const dialog = document.querySelector("#stationDialog");
  const loginDialog = document.querySelector("#loginDialog");
  const teacherDialog = document.querySelector("#teacherDialog");

  function getUsers(){
    for(const key of [USERS_KEY,USERS_BACKUP_KEY]){
      try{
        const users=JSON.parse(localStorage.getItem(key)||"{}");
        if(users&&typeof users==="object"&&!Array.isArray(users))return users;
      }catch{}
    }
    return {};
  }
  function setUsers(users){
    const serialized=JSON.stringify(users);
    const previous=localStorage.getItem(USERS_KEY);
    if(previous&&previous!==serialized)localStorage.setItem(USERS_BACKUP_KEY,previous);
    localStorage.setItem(USERS_KEY,serialized);
  }
  // Bestandsschutz: Versionswechsel ergänzen Daten nur. Lernstände werden nie durch neue Defaults ersetzt.
  function migrateState(raw={}){
    const old=raw&&typeof raw==="object"?raw:{};
    const array=(key,fallback=[])=>Array.isArray(old[key])?[...old[key]]:[...fallback];
    const map=key=>old[key]&&typeof old[key]==="object"&&!Array.isArray(old[key])?{...old[key]}:{};
    return {...initial,...old,schemaVersion:STATE_SCHEMA_VERSION,
      completed:array("completed"),taskResults:map("taskResults"),hints:map("hints"),attempts:map("attempts"),
      clues:array("clues"),achievements:array("achievements"),rewardedAchievements:array("rewardedAchievements"),
      transactions:array("transactions",initial.transactions),mediaNotes:map("mediaNotes"),journeyResults:map("journeyResults"),
      journeyAttempts:map("journeyAttempts"),journeyHints:map("journeyHints"),journeyStageNotes:map("journeyStageNotes"),
      journeyStageCompleted:array("journeyStageCompleted"),theoryNotes:map("theoryNotes"),theoryCompleted:array("theoryCompleted"),
      podcastNotes:map("podcastNotes"),podcastCompleted:array("podcastCompleted"),podcastPlayback:map("podcastPlayback"),
      podcastListened:array("podcastListened"),teiresiasChats:map("teiresiasChats"),teiresiasCompleted:array("teiresiasCompleted"),
      writing:{...initial.writing,...(old.writing||{}),fields:{...initial.writing.fields,...(old.writing?.fields||{})},
        completed:Array.isArray(old.writing?.completed)?[...old.writing.completed]:[],revision:Array.isArray(old.writing?.revision)?[...old.writing.revision]:[]}
    };
  }
  function mergeLearningStates(localState,remoteState){
    const local=migrateState(localState),remote=migrateState(remoteState),merged=migrateState({...local,...remote});
    const union=key=>[...new Set([...(local[key]||[]),...(remote[key]||[])])];
    ["completed","clues","achievements","rewardedAchievements","journeyStageCompleted","theoryCompleted","podcastCompleted","podcastListened","teiresiasCompleted"].forEach(key=>merged[key]=union(key));
    merged.taskResults={...(local.taskResults||{})};Object.entries(remote.taskResults||{}).forEach(([key,value])=>merged.taskResults[key]=Boolean(merged.taskResults[key]||value));
    ["hints","attempts","journeyAttempts","journeyHints"].forEach(key=>{merged[key]={...(local[key]||{})};Object.entries(remote[key]||{}).forEach(([id,value])=>merged[key][id]=Math.max(Number(merged[key][id])||0,Number(value)||0));});
    ["mediaNotes","journeyStageNotes","theoryNotes","podcastNotes"].forEach(key=>{merged[key]={...(local[key]||{})};Object.entries(remote[key]||{}).forEach(([id,value])=>{if(String(value||"").length>String(merged[key][id]||"").length)merged[key][id]=value;});});
    merged.journeyResults={...(local.journeyResults||{}),...(remote.journeyResults||{})};merged.podcastPlayback={...(local.podcastPlayback||{}),...(remote.podcastPlayback||{})};
    merged.teiresiasChats={...(local.teiresiasChats||{})};Object.entries(remote.teiresiasChats||{}).forEach(([id,value])=>{if((value?.length||0)>(merged.teiresiasChats[id]?.length||0))merged.teiresiasChats[id]=value;});
    merged.score=Math.max(Number(local.score)||0,Number(remote.score)||0);
    merged.bestStreak=Math.max(Number(local.bestStreak)||0,Number(remote.bestStreak)||0);
    merged.transactions=[...(remote.transactions||[]),...(local.transactions||[])].filter((item,index,all)=>index===all.findIndex(x=>x.time===item.time&&x.label===item.label)).sort((a,b)=>(b.time||0)-(a.time||0)).slice(0,60);
    const localWriting=local.writing||initial.writing,remoteWriting=remote.writing||initial.writing;
    const writingFields={...(localWriting.fields||{})};Object.entries(remoteWriting.fields||{}).forEach(([id,value])=>{if(String(value||"").length>String(writingFields[id]||"").length)writingFields[id]=value;});
    merged.writing={...localWriting,...remoteWriting,fields:writingFields,completed:[...new Set([...(localWriting.completed||[]),...(remoteWriting.completed||[])])],revision:[...new Set([...(localWriting.revision||[]),...(remoteWriting.revision||[])])],draftComplete:Boolean(localWriting.draftComplete||remoteWriting.draftComplete)};
    return merged;
  }
  function load(){
    try {
      const profile=getUsers()[activeStudentId];
      return migrateState(profile?.state||JSON.parse(localStorage.getItem(KEY)||"{}"));
    }
    catch { return migrateState(); }
  }
  function record(amount,label,kind=amount>=0?"reward":"cost"){
    state.score=state.score+amount;
    state.transactions=[{amount,label,kind,time:Date.now()},...(state.transactions||[])].slice(0,60);
  }
  function deriveAchievements(){
    const earned=new Set(state.achievements);
    const clean=state.completed.filter(id=>{
      const s=D.stations.find(x=>x.id===id);
      return s&&s.tasks.every(q=>(state.hints[q.id]||0)<3);
    });
    if(clean.length>=3)earned.add("mind");
    for(const key of ["ithaka","gods"]){
      const ids=D.stations.filter(s=>s.thread===key).map(s=>s.id);
      if(ids.length&&ids.every(id=>state.completed.includes(id)))earned.add(key);
    }
    if(state.taskResults.f3)earned.add("time");
    state.achievements=[...earned];
    state.rewardedAchievements=state.rewardedAchievements||[];
    state.achievements.forEach(id=>{
      if(!state.rewardedAchievements.includes(id)){
        const achievement=D.achievements.find(a=>a.id===id);
        state.rewardedAchievements.push(id);
        record(10,`Abzeichen: ${achievement?.name||id}`);
      }
    });
  }
  function save(){
    deriveAchievements();
    if(activeStudentId){
      const users=getUsers(), profile=users[activeStudentId];
      if(profile){users[activeStudentId]={...profile,state,updatedAt:Date.now()};setUsers(users)}
    }else localStorage.setItem(KEY,JSON.stringify(state));
    scheduleCloudSave();
    updateHeader();
  }
  function scheduleCloudSave(){
    const profile=getUsers()[activeStudentId];
    if(!profile?.cloudToken)return;
    window.clearTimeout(cloudSaveTimer);
    const scheduledStudentId=activeStudentId;
    const scheduledToken=profile.cloudToken;
    const scheduledState=migrateState(JSON.parse(JSON.stringify(state)));
    const baseUpdatedAt=Number(profile.cloudUpdatedAt)||0;
    cloudSaveTimer=window.setTimeout(async()=>{
      try{
        if(activeStudentId!==scheduledStudentId)return;
        const response=await fetch(`${API}/student`,{method:"PUT",headers:{"Content-Type":"application/json","X-Student-Token":scheduledToken},body:JSON.stringify({state:scheduledState,baseUpdatedAt})});
        const result=await response.json().catch(()=>({}));
        if(activeStudentId!==scheduledStudentId)return;
        if(response.status===409&&result.state){
          state=mergeLearningStates(state,result.state);
          const users=getUsers(),current=users[scheduledStudentId];
          if(current?.cloudToken===scheduledToken){users[scheduledStudentId]={...current,state,updatedAt:Date.now(),cloudUpdatedAt:result.updatedAt};setUsers(users)}
          scheduleCloudSave();
          document.querySelector("#storageStatus").dataset.sync="error";
          document.querySelector("#storageStatus").textContent=`Angemeldet: ${profile.first} ${profile.last} · Lernstände zusammengeführt, Sicherung läuft`;
          return;
        }
        if(response.ok){
          const users=getUsers(),current=users[scheduledStudentId];
          if(current?.cloudToken===scheduledToken){users[scheduledStudentId]={...current,cloudUpdatedAt:result.updatedAt||Date.now()};setUsers(users)}
        }
        document.querySelector("#storageStatus").dataset.sync=response.ok?"ok":"error";
        document.querySelector("#storageStatus").textContent=response.ok
          ?`Angemeldet: ${profile.first} ${profile.last} · Spielstand synchronisiert`
          :`Angemeldet: ${profile.first} ${profile.last} · lokal gespeichert, Synchronisation ausstehend`;
      }catch{
        document.querySelector("#storageStatus").dataset.sync="error";
        document.querySelector("#storageStatus").textContent=`Angemeldet: ${profile.first} ${profile.last} · offline lokal gespeichert`;
      }
    },700);
  }
  function esc(s){ const d=document.createElement("div"); d.textContent=String(s); return d.innerHTML; }
  function normal(s){ return String(s).trim().toLocaleLowerCase("de-CH").normalize("NFD").replace(/\p{Diacritic}/gu,"").replace(/[^a-z0-9]/g,""); }
  const stopWords=new Set(["die","der","das","den","dem","des","ein","eine","einen","einer","und","oder","mit","von","vor","nach","wird","werden","sich","sein","seine","ihre","ihren","ihm","sie","er","ist","als","bei","zum","zur","auf","wegen","durch","gegen"]);
  function words(s){return String(s).toLocaleLowerCase("de-CH").normalize("NFD").replace(/\p{Diacritic}/gu,"").match(/[a-z0-9]+/g)?.filter(w=>w.length>2&&!stopWords.has(w))||[]}
  function maxPage(station){
    return Math.max(...String(station.pageRef).match(/\d+/g).map(Number));
  }
  function releaseFor(station){
    return READING_PLAN.find(phase=>maxPage(station)<=phase.pages)||READING_PLAN.at(-1);
  }
  function phaseDate(phase){
    return new Date(`${phase.date}T00:00:00`);
  }
  function dateLabel(date){
    return phaseDate({date}).toLocaleDateString("de-CH",{day:"2-digit",month:"2-digit",year:"numeric"});
  }
  function currentReadingLimit(){
    const now=new Date();
    return READING_PLAN.filter(phase=>now>=phaseDate(phase)).at(-1)?.pages||0;
  }
  function readingStations(){
    return [...D.stations].sort((a,b)=>maxPage(a)-maxPage(b)||a.chapter[0]-b.chapter[0]);
  }
  function released(station){
    return teacherUnlockedStations.includes(station.id)||new Date()>=phaseDate(releaseFor(station));
  }
  async function loadTeacherUnlocks(){
    try{
      const response=await fetch(`${API}/settings`,{cache:"no-store"});
      const result=await response.json();
      if(response.ok)teacherUnlockedStations=Array.isArray(result.stationIds)?result.stationIds:[];
    }catch{}
  }
  function openAnswerCorrect(q,value){
    const synonymSets=[
      ["gott","gotter","gottheit","olympier"],["zorn","wut","arger","erzurn"],["schuld","untat","frevel","verbrechen"],
      ["warn","rat","raten","empfehl"],["heimkehr","ruckkehr","heimweg","ithaka","heimat"],["helfen","hilfe","rett","unterstutz","beistand"],
      ["tod","tot","sterb","toten","umbring","erschlag"],["verlust","verlier","untergang","vernicht"],["schatz","reichtum","beute","gold"],
      ["feier","fest","trink","zechen"],["bleib","wart","verweil","nicht abfahr"],["verstark","unterstutz","weitere kampfer","mehr soldat"],
      ["list","tausch","trick","plan"],["blind","blend","auge"],["versteck","verberg","widder","schaf"],
      ["stolz","hochmut","prah","uberheb"],["name","nennen","enthull"],["rache","vergelt","rachen"],["treu","loyal","ergeben"],
      ["freier","brautwerber"],["konig","herrscher"],["sohn","kind"],["vater","eltern"],["ehefrau","frau","gattin"],
      ["angst","furcht","sorge"],["essen","nahrung","hunger"],["verbot","nicht durfen","schonen","unberuhrt"],["schiff","flotte","boot"],
      ["gefahr","bedroh","hindern","gegner"],["wissen","nachricht","auskunft","rat"],["erkenn","identitat","beweis"],["frieden","ordnung","versohn"]
    ];
    const stop=new Set(["aber","alle","alles","auch","auf","aus","bei","bis","dann","das","dass","dem","den","der","des","die","durch","ein","eine","einer","eines","er","es","fur","gegen","hat","haben","ihr","ihre","im","in","ist","mit","nach","nicht","oder","sich","sie","sind","so","und","vom","von","vor","war","weil","wenn","werden","wird","wodurch","warum","welche","welcher","welches","wie","zu","zum","zur"]);
    const concept=word=>{const stem=normal(word);const set=synonymSets.find(items=>items.some(item=>stem.includes(normal(item))||normal(item).includes(stem)));return set?normal(set[0]):stem.slice(0,Math.max(4,stem.length-2));};
    const concepts=text=>new Set(words(text).filter(w=>w.length>=3&&!stop.has(w)).map(concept));
    const entered=words(value), enteredConcepts=concepts(value), compact=normal(value);
    if(!entered.length)return false;
    if([q.answer,...(q.alternatives||[])].filter(x=>typeof x==="string").some(x=>normal(x)===compact))return true;
    const containsIdea=idea=>{
      const keys=[...concepts(idea)];
      if(!keys.length)return false;
      const hits=keys.filter(k=>enteredConcepts.has(k)).length;
      return hits>=Math.max(1,Math.floor(keys.length*.28));
    };
    if(Array.isArray(q.answer))return q.answer.every(containsIdea);
    if(q.answer&&typeof q.answer==="object")return Object.entries(q.answer).every(([a,b])=>containsIdea(a)&&containsIdea(b));
    return containsIdea(q.answer);
  }
  function unlocked(i,stations=readingStations()){
    if(teacherUnlockedStations.includes(stations[i].id))return true;
    return released(stations[i])&&(i===0 || state.completed.includes(stations[i-1].id));
  }
  function completeCount(){ return state.completed.length; }
  function updateHeader(){
    const p=Math.round(completeCount()/D.stations.length*100);
    document.querySelector("#owlScore").textContent=state.score;
    document.querySelector("#progressPercent").textContent=p+"%";
    document.querySelector("#progressText").textContent=`${completeCount()} von ${D.stations.length} Stationen`;
    document.querySelector("#progressRing").style.setProperty("--p",`${p*3.6}deg`);
    const profile=getUsers()[activeStudentId];
    document.querySelector("#profileButton").textContent=profile?`${profile.first} ${profile.last}`:"Anmelden";
    document.querySelector("#storageStatus").textContent=profile
      ?`Angemeldet: ${profile.first} ${profile.last} · Spielstand auf diesem Gerät gespeichert`
      :"Noch nicht angemeldet · Spielstand wird nur vorläufig auf diesem Gerät gespeichert";
  }
  function studentId(first,last){
    return `${normal(first)}-${normal(last)}`;
  }
  function openLogin(){
    const profile=getUsers()[activeStudentId];
    const form=document.querySelector("#studentLoginForm");
    const panel=document.querySelector("#activeStudentPanel");
    form.hidden=Boolean(profile);panel.hidden=!profile;
    if(profile)panel.innerHTML=`<div class="active-profile"><strong>${esc(profile.first)} ${esc(profile.last)}</strong>
      <span>${state.completed.length}/${D.stations.length} Stationen · ${state.score} Eulen</span>
      <button class="primary" id="continueStudent" type="button">Weiterspielen</button>
      <button class="hint-btn" id="logoutStudent" type="button">Austragen</button></div>`;
    loginDialog.showModal();
    document.querySelector("#continueStudent")?.addEventListener("click",()=>loginDialog.close());
    document.querySelector("#logoutStudent")?.addEventListener("click",logoutStudent);
  }
  async function loginStudent(first,last){
    first=first.trim();last=last.trim();if(!first||!last)return;
    const id=studentId(first,last), users=getUsers();
    if(!users[id]){
      const legacy=Object.keys(users).length===0?JSON.parse(localStorage.getItem(KEY)||"null"):null;
      users[id]={first,last,createdAt:Date.now(),updatedAt:Date.now(),state:migrateState(legacy||{})};
    }
    const feedback=document.querySelector("#studentLoginFeedback");
    try{
      if(!users[id].cloudToken){
        const response=await fetch(`${API}/register`,{method:"POST",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({first,last,state:users[id].state})});
        const result=await response.json();
        if(!response.ok)throw new Error(result.error||"Anmeldung nicht möglich.");
        users[id].cloudToken=result.token;users[id].cloudId=result.id;users[id].cloudUpdatedAt=result.updatedAt||0;
      }else{
        const response=await fetch(`${API}/student`,{headers:{"X-Student-Token":users[id].cloudToken}});
        if(response.ok){
          const result=await response.json();
          if(result.state)users[id].state=mergeLearningStates(users[id].state,result.state);
          users[id].cloudUpdatedAt=result.updatedAt||users[id].cloudUpdatedAt||0;
        }
      }
      setUsers(users);activeStudentId=id;localStorage.setItem(ACTIVE_KEY,id);
      state=load();save();loginDialog.close();showTrail();
    }catch(error){
      feedback.innerHTML=`<div class="feedback bad">${esc(error.message)} Prüfe deine Internetverbindung.</div>`;
    }
  }
  function logoutStudent(){
    save();window.clearTimeout(cloudSaveTimer);activeStudentId="";localStorage.removeItem(ACTIVE_KEY);state=migrateState();
    loginDialog.close();updateHeader();showTrail();window.setTimeout(openLogin,50);
  }
  function teacherRows(students=teacherStudents){
    return students.sort((a,b)=>a.last.localeCompare(b.last,"de")).map(p=>{
      const s={...initial,...p.state}, percent=Math.round((s.completed?.length||0)/D.stations.length*100);
      return `<tr><td><strong>${esc(p.last)}, ${esc(p.first)}</strong></td><td>${s.completed?.length||0}/${D.stations.length}</td>
        <td>${percent}%</td><td>${s.score||0}</td><td>${s.podcastCompleted?.length||0}/${D.podcastLab.tasks.length}</td><td>${s.writing?.draftComplete?"abgeschlossen":`${countWords(s.writing?.fields?.draft||"")} Wörter`}</td>
        <td>${new Date(p.updatedAt||p.createdAt).toLocaleString("de-CH")}</td></tr>`;
    }).join("");
  }
  function teacherAnswer(answer){
    if(Array.isArray(answer))return `<ol>${answer.map(item=>`<li>${esc(item)}</li>`).join("")}</ol>`;
    if(answer&&typeof answer==="object")return `<dl>${Object.entries(answer).map(([term,match])=>`<div><dt>${esc(term)}</dt><dd>${esc(match)}</dd></div>`).join("")}</dl>`;
    return `<p>${esc(answer)}</p>`;
  }
  function teacherWalkthrough(stations){
    const stationGuide=stations.map((station,index)=>`<details class="walkthrough-station" data-walkthrough-station data-search="${esc(`${station.title} ${station.place} ${station.themes.join(" ")} ${station.tasks.map(q=>`${q.prompt} ${q.answer}`).join(" ")}`.toLocaleLowerCase("de-CH"))}">
      <summary><span>${String(index+1).padStart(2,"0")}</span><div><strong>${esc(station.title)}</strong><small>${esc(station.place)} · PDF ${esc(station.pageRef)} · ${station.tasks.length} Aufgaben</small></div></summary>
      <div class="walkthrough-station-body">${station.tasks.map((q,taskIndex)=>`<article class="walkthrough-answer">
        <header><span>AUFGABE ${taskIndex+1}/${station.tasks.length} · ${esc(q.creativeMode)}</span><strong>${esc(q.objective)}</strong></header>
        <h4>${esc(q.prompt)}</h4>
        <p class="walkthrough-format"><strong>Erwartetes Antwortformat:</strong> ${esc(q.instruction)}</p>
        <div class="walkthrough-solution"><strong>Musterlösung</strong>${teacherAnswer(q.answer)}</div>
        ${q.alternatives?.length?`<p><strong>Gültige Kurzvarianten:</strong> ${q.alternatives.map(esc).join(" · ")}</p>`:""}
        <div class="walkthrough-support"><p><strong>Gratis-Hinweis:</strong> ${esc(q.hints[0])}</p><p><strong>Textstelle:</strong> ${esc(q.hints[q.hints.length-1])}</p></div>
        <p class="walkthrough-comment"><strong>Didaktische Auswertung:</strong> ${esc(q.feedback)}</p>
      </article>`).join("")}</div>
    </details>`).join("");
    const oracleGuide=D.teiresiasInterrogations.map(item=>`<article class="walkthrough-answer"><header><span>TEIRESIAS</span><strong>${esc(item.source)}</strong></header><h4>${esc(item.title)}</h4><p><strong>Gesprächsimpuls:</strong> ${esc(item.guide)}</p><div class="walkthrough-solution"><strong>Vollständige Antwort</strong><p>${esc(item.answer)}</p></div></article>`).join("");
    const openModules=[
      ["Video-Spur",D.mediaResource.prompts,"Eine überzeugende Antwort verbindet eine konkrete Aussage aus dem Video mit einem überprüfbaren Beleg aus Lechners Text und kennzeichnet Unterschiede zwischen Primär- und Sekundärquelle."],
      ["SRF- und Voß-Theorielabor",D.srfTheory.tasks,"Eine überzeugende Antwort verwendet die im Auftrag genannten Quellen und Begriffe, trennt Beobachtung, Deutung und Urteil und belegt jede zentrale Aussage konkret."],
      ["Podcast-Labor",D.podcastLab.tasks,"Eine überzeugende Antwort nennt Zeitmarken beziehungsweise konkrete Podcastthesen, prüft sie an Lechners Text und unterscheidet antike Ordnung, göttliche Lenkung und heutiges Urteil."],
      ["Heldenreise-Werkstatt",D.heroJourney.tasks,"Eine überzeugende Antwort ordnet konkrete Odysseus-Episoden begründet den passenden Stufen zu und benennt auch Grenzen oder Abweichungen des Modells."]
    ].map(([title,tasks,standard])=>`<details class="walkthrough-module"><summary>${esc(title)} · ${tasks.length} offene Aufgaben</summary><div class="walkthrough-station-body">${tasks.map((q,i)=>`<article class="walkthrough-answer"><header><span>AUFGABE ${i+1}</span><strong>Erwartungshorizont</strong></header><h4>${esc(q.title||q.prompt)}</h4>${q.title?`<p>${esc(q.prompt)}</p>`:""}<div class="walkthrough-solution"><strong>Bewertbare Kernelemente</strong>${q.answer?teacherAnswer(q.answer):`<p>${esc(q.guide||standard)}</p>`}${q.answer?`<p>${esc(q.feedback||standard)}</p>`:""}${q.phaseIds?`<p><strong>Zugeordnete Stufen:</strong> ${q.phaseIds.map(id=>esc(D.heroJourney.phases.find(p=>p.id===id)?.title||id)).join(" · ")}</p>`:""}</div></article>`).join("")}</div></details>`).join("");
    return `<section class="teacher-walkthrough" id="teacherWalkthrough"><div class="walkthrough-head"><div><p class="eyebrow">VOLLSTÄNDIGER LÖSUNGSWEG</p><h3>Walkthrough für die Lehrperson</h3><p>Alle ${stations.reduce((sum,s)=>sum+s.tasks.length,0)} Stationsaufgaben mit Musterlösungen, Hinweisen, Textstellen und Lernzielen. Darunter folgen die Antworten von Teiresias und Erwartungshorizonte für offene Zusatzmodule.</p></div><strong>${stations.length}<small>Stationen</small></strong></div>
      <div class="walkthrough-tools"><label>Station oder Thema suchen<input id="walkthroughSearch" type="search" placeholder="z. B. Polyphem, List oder Seite 48"></label><button class="hint-btn" id="walkthroughOpenAll" type="button">Alle Stationen öffnen</button><button class="hint-btn" id="walkthroughCloseAll" type="button">Alle schliessen</button><button class="hint-btn" id="walkthroughPrint" type="button">Walkthrough drucken</button></div>
      <p id="walkthroughCount" class="walkthrough-count">${stations.length} von ${stations.length} Stationen sichtbar</p>
      <div class="walkthrough-list">${stationGuide}</div>
      <details class="walkthrough-module"><summary>Teiresias · 6 vollständige Antworten</summary><div class="walkthrough-station-body">${oracleGuide}</div></details>
      ${openModules}</section>`;
  }
  function bindTeacherWalkthrough(){
    const items=[...document.querySelectorAll("[data-walkthrough-station]")],count=document.querySelector("#walkthroughCount");
    document.querySelector("#walkthroughSearch").addEventListener("input",event=>{
      const term=event.target.value.trim().toLocaleLowerCase("de-CH");let visible=0;
      items.forEach(item=>{item.hidden=Boolean(term)&&!item.dataset.search.includes(term);if(!item.hidden)visible++});
      count.textContent=`${visible} von ${items.length} Stationen sichtbar`;
    });
    document.querySelector("#walkthroughOpenAll").addEventListener("click",()=>items.filter(item=>!item.hidden).forEach(item=>item.open=true));
    document.querySelector("#walkthroughCloseAll").addEventListener("click",()=>items.forEach(item=>item.open=false));
    document.querySelector("#walkthroughPrint").addEventListener("click",()=>window.print());
  }
  function showTeacherDashboard(students){
    teacherStudents=students;
    const dashboard=document.querySelector("#teacherDashboard"), gate=document.querySelector("#teacherGate");
    const stations=readingStations();
    gate.hidden=true;dashboard.hidden=false;
    dashboard.innerHTML=`<p class="local-warning"><strong>Zentrale Klassenübersicht:</strong> ${students.length} Profile · von allen verbundenen Schülergeräten.</p>
      <div class="teacher-actions"><button class="primary" id="previewJourney" type="button">12-Stufen-Werkstatt ansehen</button><button class="hint-btn" id="exportClass" type="button">Klassendaten exportieren</button></div>
      <div class="teacher-table-wrap"><table class="teacher-table"><thead><tr><th>Name</th><th>Stationen</th><th>Fortschritt</th><th>Eulen</th><th>Podcast</th><th>Schreibprojekt</th><th>Zuletzt aktiv</th></tr></thead>
      <tbody>${teacherRows(students)||'<tr><td colspan="7">Noch keine Schülerprofile eingetragen.</td></tr>'}</tbody></table></div>
      <section class="station-release-panel"><div><p class="eyebrow">MANUELLE FREIGABEN</p><h3>Einzelne Stationen öffnen</h3>
      <p>Markierte Stationen sind für alle Schüler sofort zugänglich – unabhängig von Datum und vorherigen Stationen.</p></div>
      <div class="release-grid">${stations.map((station,index)=>{
        const phase=releaseFor(station),checked=teacherUnlockedStations.includes(station.id);
        return `<label class="release-item"><input type="checkbox" data-release-station="${station.id}" ${checked?"checked":""}>
          <span><strong>${String(index+1).padStart(2,"0")} · ${esc(station.title)}</strong><small>PDF ${esc(station.pageRef)} · regulär ${dateLabel(phase.date)}</small></span></label>`;
      }).join("")}</div>
      <div class="teacher-actions"><button class="primary" id="saveStationReleases" type="button">Freigaben speichern</button>
      <span id="releaseFeedback" aria-live="polite"></span></div></section>
      ${teacherWalkthrough(stations)}`;
    document.querySelector("#exportClass").addEventListener("click",exportClass);
    document.querySelector("#previewJourney").addEventListener("click",()=>{teacherDialog.close();setView("threads")});
    document.querySelector("#saveStationReleases").addEventListener("click",saveStationReleases);
    bindTeacherWalkthrough();
  }
  async function saveStationReleases(){
    const stationIds=[...document.querySelectorAll("[data-release-station]:checked")].map(input=>input.dataset.releaseStation);
    const feedback=document.querySelector("#releaseFeedback");
    try{
      const response=await fetch(`${API}/teacher/settings`,{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({pin:teacherPinSession,stationIds})});
      const result=await response.json();if(!response.ok)throw new Error(result.error||"Speichern nicht möglich.");
      teacherUnlockedStations=result.stationIds||[];
      feedback.innerHTML='<span class="sync-success">✓ Freigaben sind auf allen Geräten gespeichert.</span>';
    }catch(error){feedback.innerHTML=`<span class="sync-error">${esc(error.message)}</span>`}
  }
  function openTeacher(){
    loginDialog.close();teacherDialog.showModal();
    const gate=document.querySelector("#teacherGate");
    document.querySelector("#teacherDashboard").hidden=true;gate.hidden=false;
    gate.innerHTML=`<form id="teacherPinForm"><p>Lehrer-PIN eingeben, um die zentralen Spielstände zu laden.</p>
      <label>Lehrer-PIN<input id="teacherPin" type="password" required minlength="3" autocomplete="current-password"></label>
      <button class="primary" type="submit">Klassenübersicht laden</button><div id="teacherPinFeedback"></div></form>`;
    document.querySelector("#teacherPinForm").addEventListener("submit",async event=>{
      event.preventDefault();const pin=document.querySelector("#teacherPin").value;
      try{
        const response=await fetch(`${API}/teacher/students`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pin})});
        const result=await response.json();if(!response.ok)throw new Error(result.error||"Zugriff nicht möglich.");
        teacherPinSession=pin;
        await loadTeacherUnlocks();
        showTeacherDashboard(result.students||[]);
      }catch(error){document.querySelector("#teacherPinFeedback").innerHTML=`<div class="feedback bad">${esc(error.message)}</div>`}
    });
  }
  function exportClass(){
    const data={version:2,exportedAt:new Date().toISOString(),students:teacherStudents};
    const link=document.createElement("a");link.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}));
    link.download=`odysseus-klasse-${new Date().toISOString().slice(0,10)}.json`;link.click();URL.revokeObjectURL(link.href);
  }
  function head(title,sub=""){
    return `<div class="section-head"><div><p class="eyebrow">${esc(sub)}</p><h2>${esc(title)}</h2></div>
      <div class="legend">${Object.entries(D.threads).map(([k,t])=>`<span><i style="background:${t.colour}"></i>${t.label}</span>`).join("")}</div></div>`;
  }
  function showTrail(){
    const stations=readingStations(), limit=currentReadingLimit();
    const voyagePositions=[[12,165],[33,120],[55,225],[78,135],[89,315],[69,385],[44,305],[20,405],[10,585],[31,525],[57,625],[83,535],[91,735],[70,805],[47,705],[23,815],[9,1005],[32,925],[56,1045],[82,945],[91,1160],[68,1245],[45,1135],[20,1240],[10,1435],[35,1355],[60,1480],[84,1385]];
    const available=stations.filter(released).length;
    const activePhase=[...READING_PLAN].reverse().find(phase=>new Date()>=phaseDate(phase));
    view.innerHTML=head("Die zerrissene Spur","FOXTRAIL-KARTE")+`
      <section class="reading-plan panel">
        <div class="reading-plan-head"><div><p class="eyebrow">LESEPLAN 2026</p><h3>${activePhase?`Aktueller Lesestand: ${activePhase.label}`:"Start am 24. August"}</h3>
        <p>Nur Stationen, deren vollständige Textgrundlage bereits gelesen wurde, werden freigegeben. ${available} von ${stations.length} Stationen sind derzeit verfügbar.</p></div>
        <span class="reading-limit">${limit===Infinity?"Buch fertig":`${limit} Seiten`}</span></div>
        <div class="reading-phases">${READING_PLAN.map(phase=>{
          const active=new Date()>=phaseDate(phase), count=stations.filter(s=>maxPage(s)<=phase.pages).length;
          return `<div class="reading-phase ${active?"released":""}"><strong>${dateLabel(phase.date)}</strong><span>${esc(phase.label)}</span><small>${count} Stationen insgesamt</small></div>`;
        }).join("")}</div>
      </section><section class="voyage-map" aria-label="Odysseus’ Heimreise als interaktive Seekarte">
      <div class="voyage-map-head"><div><p class="eyebrow">VON TROJA NACH ITHAKA</p><h3>Fahre die Heimreise Etappe für Etappe</h3><p>Jeder Wegpunkt ist eine Textstation. Das Schiff zeigt, wo deine Reise weitergeht.</p></div><div class="map-progress"><strong>${completeCount()}</strong><span>/ ${stations.length} Etappen</span></div></div>
      <div class="voyage-sea"><canvas id="voyageRoute" aria-hidden="true"></canvas><div class="sea-current current-a" aria-hidden="true"></div><div class="sea-current current-b" aria-hidden="true"></div>
      <div class="map-port map-troja" data-route-point><span>START</span><strong>TROJA</strong><small>Der Krieg ist vorbei</small></div>${
      stations.map((s,i)=>{
        const done=state.completed.includes(s.id), manual=teacherUnlockedStations.includes(s.id), isReleased=released(s), open=unlocked(i,stations), t=D.threads[s.thread], phase=releaseFor(s);
        const [x,y]=voyagePositions[i], current=open&&!done&&(i===0||state.completed.includes(stations[i-1].id));
        return `<button class="journey-node ${done?"sailed":""} ${current?"current-node":""}" style="--thread:${t.colour};left:${x}%;top:${y}px" data-route-point data-station="${s.id}" ${open?"":"disabled"} aria-label="Spur ${i+1}: ${esc(s.title)}">
          ${current?'<span class="map-ship" aria-hidden="true">⛵</span>':""}<span class="node-disc"><i>${done?"✓":s.symbol}</i><b>${String(i+1).padStart(2,"0")}</b></span>
          <span class="node-label"><strong>${esc(s.title)}</strong><small>${open?esc(s.place):isReleased?"Vorherige Spur fehlt":`ab ${dateLabel(phase.date)}`}</small></span></button>`;
      }).join("")
    }<div class="map-port map-ithaka ${completeCount()===stations.length?"reached":""}" data-route-point><span>ZIEL</span><strong>ITHAKA</strong><small>Heimat · Identität · Frieden</small></div></div></section>${completeCount()===D.stations.length?renderFinal():""}`;
    view.querySelectorAll("[data-station]").forEach(b=>b.addEventListener("click",()=>openStation(b.dataset.station)));
    window.requestAnimationFrame(drawVoyageRoute);
  }
  function drawVoyageRoute(){
    const sea=document.querySelector(".voyage-sea"),canvas=document.querySelector("#voyageRoute");if(!sea||!canvas)return;
    const ratio=window.devicePixelRatio||1,box=sea.getBoundingClientRect();canvas.width=box.width*ratio;canvas.height=box.height*ratio;canvas.style.width=box.width+"px";canvas.style.height=box.height+"px";
    const ctx=canvas.getContext("2d");ctx.scale(ratio,ratio);const points=[...sea.querySelectorAll("[data-route-point]")].map(node=>{const r=node.getBoundingClientRect();return{x:r.left-box.left+r.width/2,y:r.top-box.top+r.height/2}});
    const path=(end,color,width,dash)=>{const route=points.slice(0,end);if(route.length<2)return;ctx.beginPath();ctx.moveTo(route[0].x,route[0].y);for(let i=1;i<route.length-1;i++){const next=route[i+1],mid={x:(route[i].x+next.x)/2,y:(route[i].y+next.y)/2};ctx.quadraticCurveTo(route[i].x,route[i].y,mid.x,mid.y)}const last=route.at(-1),before=route.at(-2);ctx.quadraticCurveTo(before.x,before.y,last.x,last.y);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineJoin="round";ctx.lineCap="round";ctx.setLineDash(dash);ctx.stroke()};
    path(points.length,"rgba(126,183,197,.42)",4,[5,11]);path(Math.min(completeCount()+2,points.length),"rgba(113,213,167,.9)",5,[]);
  }
  function showThreads(){
    const counts={}; D.events.forEach(e=>counts[e.thread]=(counts[e.thread]||0)+1);
    const journey=D.heroJourney;
    view.innerHTML=head("Vier Ebenen derselben Geschichte","ERZÄHLSTRÄNGE")+`<div class="thread-grid">${
      Object.entries(D.threads).map(([id,t])=>`<article class="thread-card" style="--thread:${t.colour}">
        <span class="chip">${counts[id]||0} Ereignisse</span><h3>${t.label}</h3>
        <p>${id==="odysseus"?"Irrfahrt, Gefährten, Kalypso, Phaiaken und Heimkehr":id==="telemachos"?"Aufbruch, Nachrichtensuche und Rückkehr des Sohns":id==="ithaka"?"Penelope, Freier, Loyalitäten und Wiederherstellung der Ordnung":"Hilfe, Widerstand, Prüfung und Friedensschluss"}</p></article>`).join("")
    }</div><div class="panel" style="margin-top:1rem"><h3>Narrative Zeitleiste</h3><p class="muted">Links: tatsächliche Chronologie · rechts: Lechners Erzählposition</p><div class="timeline">${
      [...D.events].sort((a,b)=>a.narrationIndex-b.narrationIndex).map(e=>`<div class="event ${e.narrativeMode}" style="--thread:${D.threads[e.thread].colour}">
        <span>Zeit ${e.chronologyIndex}</span><strong>${esc(e.label)}</strong><span>Erzählung ${e.narrationIndex}<br>${e.narrativeMode}</span></div>`).join("")
    }</div></div>
    <section class="hero-journey">
      <div class="section-head journey-head"><div><p class="eyebrow">ANALYSEMODELL</p><h2>${esc(journey.title)}</h2></div></div>
      <div class="panel journey-intro"><p>${esc(journey.intro)}</p><div class="journey-source"><strong>Vollständig eingebaute Adaption</strong><span>Alle zwölf Stufen sind unten erklärt, auf Lechners Roman übertragen und mit eigenen Arbeitsaufträgen versehen. Die externe Seite ist nur der transparente Herkunftsnachweis.</span><a href="${journey.source.url}" target="_blank" rel="noopener noreferrer">Originalquelle ↗</a></div></div>
      <div class="journey-acts">${["AUFBRUCH","PRÜFUNG","RÜCKKEHR"].map((act,i)=>`<article><span>AKT ${i+1}</span><strong>${act}</strong><small>${journey.phases.filter(p=>p.act===act).map(p=>p.number).join(" · ")}</small></article>`).join("")}</div>
      <div class="journey-lab panel"><div><p class="eyebrow">HELDENREISE-LERNLABOR</p><h3>${Object.keys(state.journeyResults||{}).length} von ${journey.tasks.length} Spuren gelöst</h3>
        <p>Beantworte die offenen Fragen. Jede Lösung schaltet die zugehörigen Deutungen frei und bringt Eulen.</p></div>
        <div class="journey-meter"><span style="width:${Object.keys(state.journeyResults||{}).length/journey.tasks.length*100}%"></span></div></div>
      <div class="journey-questions">${journey.tasks.map((q,i)=>renderJourneyQuestion(q,i)).join("")}</div>
      <div class="journey-workshop-head panel"><div><p class="eyebrow">12-STUFEN-WERKSTATT</p><h3>${(state.journeyStageCompleted||[]).length} von 12 Deutungen erarbeitet</h3><p>Öffne jede Stufe, prüfe ihre Passung und formuliere eine eigene Textdeutung. Die Aufgaben werden gespeichert.</p></div><div class="journey-wheel" style="--journey-progress:${(state.journeyStageCompleted||[]).length*30}deg"><strong>${(state.journeyStageCompleted||[]).length}</strong><span>/ 12</span></div></div>
      <div class="journey-path journey-path-12">${journey.phases.map((p,i)=>{
        const unlocked=journey.tasks.some(q=>(state.journeyResults||{})[q.id]&&q.phaseIds.includes(p.id));
        const stageDone=(state.journeyStageCompleted||[]).includes(p.id),note=(state.journeyStageNotes||{})[p.id]||"";
        return `<details class="journey-step journey-stage ${stageDone?"stage-done":""}" style="--thread:${D.threads[p.thread].colour}" ${i===0?"open":""}>
        <summary><div class="journey-number">${p.number}</div><div><span class="chip">${esc(p.act)}</span><h3>${esc(p.name)}</h3><small class="fit fit-${p.fit}">${p.fit==="strong"?"starke Passung":p.fit==="partial"?"teilweise Passung":"bewusste Leerstelle"}</small></div></summary>
        <div class="journey-stage-body"><p class="stage-concept"><strong>Konzept:</strong> ${esc(p.concept)}</p><p><strong>Bei Lechner:</strong> ${esc(p.events)}</p><p class="stage-meaning"><strong>Deutung:</strong> ${esc(p.meaning)}</p><small>${esc(p.chapters)}</small>
        <div class="stage-task"><label for="stage-${p.id}">${esc(p.workshopPrompt)}</label><textarea id="stage-${p.id}" data-stage-note="${p.id}" rows="4" placeholder="Deute mit konkreten Ereignissen und Figuren …">${esc(note)}</textarea><div class="stage-task-actions"><span data-stage-count="${p.id}">${note.length}/80 Zeichen</span><button class="primary" data-complete-stage="${p.id}" ${stageDone?"disabled":""}>${stageDone?"Erarbeitet ✓":"Deutung sichern · +4 Eulen"}</button></div><div data-stage-feedback="${p.id}"></div></div></div>
        </details>`}).join("")}</div>
      <div class="journey-bottom"><article class="panel"><p class="eyebrow">TELEMACHOS’ KLEINE HELDENREISE</p><ol>${
        journey.telemachos.map(x=>`<li>${esc(x)}</li>`).join("")
      }</ol></article><article class="panel caution-card"><p class="eyebrow">ACHTUNG: DREI ORDNUNGEN</p><p>${esc(journey.caution)}</p></article></div>
    </section>`;
    bindJourneyQuestions();bindJourneyStages();
  }
  function bindJourneyStages(){
    state.journeyStageNotes=state.journeyStageNotes||{};state.journeyStageCompleted=state.journeyStageCompleted||[];
    document.querySelectorAll("[data-stage-note]").forEach(area=>area.addEventListener("input",()=>{state.journeyStageNotes[area.dataset.stageNote]=area.value;const count=document.querySelector(`[data-stage-count="${area.dataset.stageNote}"]`);if(count)count.textContent=`${area.value.length}/80 Zeichen`;save()}));
    document.querySelectorAll("[data-complete-stage]").forEach(button=>button.addEventListener("click",()=>{const id=button.dataset.completeStage,note=(state.journeyStageNotes[id]||"").trim(),feedback=document.querySelector(`[data-stage-feedback="${id}"]`);if(note.length<80){feedback.innerHTML='<div class="feedback bad">Begründe genauer und verwende mindestens 80 Zeichen.</div>';return}if(!state.journeyStageCompleted.includes(id)){state.journeyStageCompleted.push(id);record(4,`Heldenreise-Stufe erarbeitet: ${D.heroJourney.phases.find(p=>p.id===id).name}`);save();showThreads()}}));
  }
  function renderJourneyQuestion(q,index){
    const solved=(state.journeyResults||{})[q.id], hints=(state.journeyHints||{})[q.id]||0;
    return `<article class="panel journey-question ${solved?"solved":""}"><p class="source">LERNLABOR ${index+1}</p><h3>${esc(q.title)}</h3><p>${esc(q.prompt)}</p>
      ${solved?`<div class="feedback good"><strong>Gelöst.</strong> ${esc(q.feedback)}</div>`:`<textarea class="journey-answer" data-journey-answer="${q.id}" rows="4" placeholder="Begründe mit Ereignissen aus Lechners Text …"></textarea>
      <div data-journey-feedback="${q.id}"></div><div class="actions"><button class="primary" data-check-journey="${q.id}">Antwort prüfen</button>
      <button class="hint-btn" data-hint-journey="${q.id}">${hints>=q.hints.length?"Hinweis erneut ansehen":`Hinweis ${hints+1} · −${hints+1} Eulen`}</button></div>`}</article>`;
  }
  function bindJourneyQuestions(){
    document.querySelectorAll("[data-check-journey]").forEach(button=>button.addEventListener("click",()=>{
      const q=D.heroJourney.tasks.find(x=>x.id===button.dataset.checkJourney);
      const input=document.querySelector(`[data-journey-answer="${q.id}"]`), feedback=document.querySelector(`[data-journey-feedback="${q.id}"]`);
      if(openAnswerCorrect(q,input.value)){
        state.journeyResults=state.journeyResults||{};state.journeyResults[q.id]=true;
        const first=!((state.journeyAttempts||{})[q.id]>0), reward=first?12:8;
        record(reward,`Heldenreise-Lernlabor: ${q.title}${first?" · Erstversuch":""}`);save();showThreads();
      }else{
        state.journeyAttempts=state.journeyAttempts||{};state.journeyAttempts[q.id]=(state.journeyAttempts[q.id]||0)+1;save();
        feedback.innerHTML=`<div class="feedback bad"><strong>Noch nicht vollständig.</strong> Verbinde alle verlangten Teile mit konkreten Ereignissen.</div>`;
      }
    }));
    document.querySelectorAll("[data-hint-journey]").forEach(button=>button.addEventListener("click",()=>{
      const q=D.heroJourney.tasks.find(x=>x.id===button.dataset.hintJourney);
      state.journeyHints=state.journeyHints||{};const opened=state.journeyHints[q.id]||0;
      const index=Math.min(opened,q.hints.length-1), cost=opened>=q.hints.length?0:index+1;
      if(opened<q.hints.length){state.journeyHints[q.id]=opened+1;record(-cost,`Heldenreise-Hinweis: ${q.title}`,"cost");save();}
      document.querySelector(`[data-journey-feedback="${q.id}"]`).innerHTML=`<div class="feedback"><strong>Hinweis${cost?` · −${cost} Eulen`:""}:</strong> ${esc(q.hints[index])}</div>`;
      if(opened<q.hints.length)button.textContent=opened+1>=q.hints.length?"Hinweis erneut ansehen":`Hinweis ${opened+2} · −${opened+2} Eulen`;
    }));
  }
  function showRoute(){
    view.innerHTML=head("Odysseus’ Welt im Mittelmeer","INTERAKTIVE REISEKARTE")+`
      <div class="map-intro panel"><p><strong>So liest du die Karte:</strong> Troja, Ismaros, Ithaka, Pylos und Sparta sind geografisch
      lokalisierbar. Die übrigen Punkte zeigen mögliche antike oder spätere Lokalisierungstraditionen,
      nicht gesicherte Reiseziele. Öffne einen Marker für Textbezug und Quellenstatus.</p>
      <div class="legend"><span><i class="map-dot certain"></i>lokalisierbar</span>
      <span><i class="map-dot debated"></i>mythisch / umstritten</span>
      <span class="route-key">— mögliche Rekonstruktionslinie</span></div></div>
      <div id="leafletMap" class="route-map real-map" aria-label="Interaktive Mittelmeerkarte der Reiseorte"></div>
      <p class="map-disclaimer">Die Linie ist eine didaktische Visualisierung, keine historisch gesicherte Route.
      Kartendaten: OpenStreetMap-Mitwirkende.</p>`;
    window.setTimeout(initRouteMap,0);
  }
  function initRouteMap(){
    const target=document.querySelector("#leafletMap"); if(!target)return;
    const points=[
      {name:"Troja",lat:39.9575,lng:26.2389,certain:true,chapter:"Kapitel 1 · PDF S. 5",note:"Archäologisch lokalisierbarer Ausgangspunkt der Heimkehr."},
      {name:"Ismaros / Kikonen",lat:40.94,lng:25.57,certain:true,chapter:"Kapitel 1 · PDF S. 8–9",note:"Antiker Ort an der thrakischen Küste."},
      {name:"Lotophagen",lat:33.81,lng:10.85,certain:false,chapter:"Kapitel 1 · PDF S. 12–14",note:"Djerba ist eine häufige, aber nicht beweisbare Lokalisierungstradition."},
      {name:"Kyklopen",lat:37.73,lng:15.0,certain:false,chapter:"Kapitel 1 · PDF S. 18–29",note:"Ostsizilien wird traditionell mit den Kyklopen verbunden; der Ort bleibt mythisch."},
      {name:"Aiolia",lat:38.47,lng:14.95,certain:false,chapter:"Kapitel 2 · PDF S. 30–33",note:"Die Liparischen Inseln sind eine mögliche spätere Zuordnung zu Aiolos."},
      {name:"Laistrygonen",lat:37.05,lng:15.29,certain:false,chapter:"Kapitel 2 · PDF S. 33–36",note:"Mehrere Lokalisierungen wurden vorgeschlagen; keine ist gesichert."},
      {name:"Aia / Kirke",lat:41.23,lng:13.05,certain:false,chapter:"Kapitel 2–3 · PDF S. 35–64",note:"Monte Circeo bewahrt eine Kirke-Tradition, ist aber kein gesicherter Romanort."},
      {name:"Unterwelt / Kimmerier",lat:40.85,lng:14.05,certain:false,chapter:"Kapitel 2 · PDF S. 43–57",note:"Cumae wurde später mit Unterweltsvorstellungen verbunden; Lechners Ort ist mythisch."},
      {name:"Sirenen",lat:40.57,lng:14.33,certain:false,chapter:"Kapitel 3 · PDF S. 58–64",note:"Die Küste bei Sorrent ist eine traditionelle, nicht eindeutige Zuordnung."},
      {name:"Skylla und Charybdis",lat:38.24,lng:15.63,certain:false,chapter:"Kapitel 3 · PDF S. 59–67",note:"Die Strasse von Messina gilt als plausible geografische Deutung der Meerenge."},
      {name:"Thrinakia / Helios",lat:37.5,lng:14.0,certain:false,chapter:"Kapitel 3 · PDF S. 67–73",note:"Oft mit Sizilien verbunden, im Text jedoch mythisch und nicht eindeutig lokalisierbar."},
      {name:"Ogygia / Kalypso",lat:36.05,lng:14.25,certain:false,chapter:"Kapitel 3 und 6 · PDF S. 75–83, 128–130",note:"Gozo/Malta ist eine von mehreren umstrittenen Traditionen."},
      {name:"Scheria / Phaiaken",lat:39.62,lng:19.92,certain:false,chapter:"Kapitel 6 · PDF S. 133–154",note:"Häufig mit Korfu verbunden; die Gleichsetzung ist nicht gesichert."},
      {name:"Ithaka",lat:38.43,lng:20.68,certain:true,chapter:"Kapitel 4, 7–11",note:"Reale Insel und Ziel der Heimkehr; Einzelheiten der epischen Topografie bleiben diskutiert."},
      {name:"Pylos",lat:36.91,lng:21.70,certain:true,chapter:"Kapitel 5 · PDF S. 103–110",note:"Realer Ort von Telemachos’ Nachrichtensuche bei Nestor."},
      {name:"Sparta",lat:37.07,lng:22.43,certain:true,chapter:"Kapitel 5 · PDF S. 111–121",note:"Realer Ort von Telemachos’ Besuch bei Menelaos und Helena."}
    ];
    if(!window.L){
      target.innerHTML=`<div class="map-fallback"><h3>Die Onlinekarte konnte nicht geladen werden.</h3>
        <p>Für die Kartenkacheln ist eine Internetverbindung erforderlich.</p>
        <div>${points.map(p=>`<span class="chip">${esc(p.name)} · ${p.certain?"lokalisierbar":"umstritten"}</span>`).join("")}</div></div>`;
      return;
    }
    const map=L.map(target,{scrollWheelZoom:false}).setView([38.2,18.2],5);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
      maxZoom:12,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende'
    }).addTo(map);
    const routePoints=points.slice(0,14).map(p=>[p.lat,p.lng]);
    L.polyline(routePoints,{color:"#d9a441",weight:3,opacity:.82,dashArray:"8 8"}).addTo(map);
    points.forEach(p=>{
      const marker=L.circleMarker([p.lat,p.lng],{
        radius:p.certain?8:7,color:p.certain?"#49b6c8":"#d9a441",
        weight:3,fillColor:p.certain?"#49b6c8":"#132f3d",fillOpacity:p.certain?.9:.65,
        dashArray:p.certain?null:"4 3"
      }).addTo(map);
      marker.bindPopup(`<strong>${esc(p.name)}</strong><br><small>${esc(p.certain?"geografisch lokalisierbar":"mythisch oder umstritten")}</small>
        <p>${esc(p.note)}</p><span>Kapitel- und Seitenbezug wird erst nach der zugehörigen Stationslösung sichtbar.</span>`);
    });
    map.fitBounds(L.latLngBounds(points.map(p=>[p.lat,p.lng])),{padding:[24,24]});
    window.setTimeout(()=>map.invalidateSize({pan:false}),250);
  }
  function showCharacters(){
    const people={}; D.characters.forEach(c=>people[c.id]=c);
    const nodes=[
      ["laertes",9,15,"ithaka"],["odysseus",28,29,"ithaka"],["penelope",28,8,"ithaka"],["telemachos",48,18,"ithaka"],
      ["eurykleia",29,50,"allies"],["eumaios",50,48,"allies"],["antinoos",72,12,"foes"],["eurymachos",88,24,"foes"],
      ["zeus",8,72,"gods"],["athene",29,71,"gods"],["poseidon",51,72,"gods"],["polyphem",72,64,"gods"],["hermes",89,78,"gods"],
      ["alkinoos",9,91,"phaeacians"],["arete",29,91,"phaeacians"],["nausikaa",50,91,"phaeacians"]
    ];
    const links=[
      ["laertes","odysseus","family","Vater und Sohn"],["odysseus","penelope","family","Ehepaar"],["odysseus","telemachos","family","Vater und Sohn"],["penelope","telemachos","family","Mutter und Sohn"],
      ["eurykleia","odysseus","ally","Amme und Schützling"],["eurykleia","telemachos","ally","Amme und Schützling"],["eumaios","odysseus","ally","treuer Diener seines Hauses"],
      ["antinoos","penelope","conflict","bedrängt Penelope als Freier"],["eurymachos","penelope","conflict","bedrängt Penelope als Freier"],["antinoos","telemachos","conflict","Rivale im Haus"],
      ["zeus","athene","family","Vater und Tochter"],["zeus","poseidon","family","Brüder"],["athene","odysseus","divine","Schutz und Rat"],["poseidon","odysseus","conflict","Gegenspieler auf dem Meer"],["poseidon","polyphem","family","Vater und Sohn"],["hermes","odysseus","divine","göttlicher Bote und Helfer"],
      ["alkinoos","arete","family","Ehepaar"],["alkinoos","nausikaa","family","Vater und Tochter"],["arete","nausikaa","family","Mutter und Tochter"],["nausikaa","odysseus","ally","hilft dem Fremden"]
    ];
    const trees={
      ithaka:{label:"Haus Ithaka",ids:["laertes","odysseus","penelope","telemachos","eurykleia","eumaios"]},
      gods:{label:"Götterfamilien",ids:["zeus","athene","poseidon","polyphem","hermes","odysseus"]},
      phaeacians:{label:"Haus der Phaiaken",ids:["alkinoos","arete","nausikaa","odysseus"]},
      all:{label:"Ganzes Netz",ids:nodes.map(n=>n[0])}
    };
    view.innerHTML=head("Personennetz & Stammbäume","VON BEGINN AN FREI · SPOILERARME ORIENTIERUNG")+`
      <section class="kinship-intro panel"><div><p class="eyebrow">ATHENES PERSONENKARTE</p><h3>Wer gehört zu wem?</h3><p>Wähle einen Stammbaum oder tippe eine Figur an. Das Netz hebt ihre direkten Beziehungen hervor. Es zeigt Rollen und Verwandtschaft, aber verrät keine späteren Schicksalsausgänge.</p></div><span class="always-open">∞ immer verfügbar</span></section>
      <div class="kinship-tabs" role="tablist" aria-label="Stammbäume">${Object.entries(trees).map(([id,t],i)=>`<button type="button" role="tab" data-tree="${id}" aria-selected="${i===0}">${t.label}</button>`).join("")}</div>
      <section class="kinship-layout">
        <div class="kinship-map" id="kinshipMap"><canvas aria-hidden="true"></canvas>${nodes.map(([id,x,y,group])=>`<button type="button" class="person-node group-${group}" data-person="${id}" style="--x:${x}%;--y:${y}%" aria-label="${people[id].name}: ${esc(people[id].role)}"><span>${people[id].symbol}</span><strong>${people[id].name}</strong></button>`).join("")}</div>
        <aside class="person-focus" id="personFocus" aria-live="polite"><p class="eyebrow">LESEHILFE</p><h3>Figur auswählen</h3><p>Tippe im Diagramm auf einen Namen. Hier erscheinen Rolle und direkte Beziehungen.</p></aside>
      </section>
      <div class="relation-legend"><span class="family">Familie / Ehe</span><span class="ally">Hilfe / Treue</span><span class="divine">göttlicher Beistand</span><span class="conflict">Konflikt</span></div>`;
    const map=view.querySelector("#kinshipMap"), canvas=map.querySelector("canvas"), focus=view.querySelector("#personFocus");
    let activeTree="ithaka", selected="";
    function visibleIds(){return new Set(trees[activeTree].ids)}
    function draw(){
      const scale=window.devicePixelRatio||1, rect=map.getBoundingClientRect();
      canvas.width=rect.width*scale; canvas.height=rect.height*scale; canvas.style.width=`${rect.width}px`; canvas.style.height=`${rect.height}px`;
      const ctx=canvas.getContext("2d"); ctx.scale(scale,scale); ctx.clearRect(0,0,rect.width,rect.height);
      const visible=visibleIds();
      links.forEach(([a,b,type])=>{if(!visible.has(a)||!visible.has(b))return; const A=map.querySelector(`[data-person="${a}"]`).getBoundingClientRect(),B=map.querySelector(`[data-person="${b}"]`).getBoundingClientRect();
        ctx.beginPath();ctx.moveTo(A.left-rect.left+A.width/2,A.top-rect.top+A.height/2);ctx.bezierCurveTo(A.left-rect.left+A.width/2,(A.top+B.top)/2-rect.top,B.left-rect.left+B.width/2,(A.top+B.top)/2-rect.top,B.left-rect.left+B.width/2,B.top-rect.top+B.height/2);
        ctx.strokeStyle={family:"rgba(224,179,96,.75)",ally:"rgba(73,182,200,.72)",divine:"rgba(154,134,216,.8)",conflict:"rgba(196,92,107,.72)"}[type];ctx.lineWidth=type==="family"?3:2;ctx.setLineDash(type==="conflict"?[7,6]:[]);ctx.stroke();
      });
    }
    function update(){
      const visible=visibleIds(); map.querySelectorAll("[data-person]").forEach(el=>{const id=el.dataset.person;el.hidden=!visible.has(id);el.classList.toggle("selected",id===selected);el.classList.toggle("related",!!selected&&links.some(l=>(l[0]===selected&&l[1]===id)||(l[1]===selected&&l[0]===id)));el.classList.toggle("dimmed",!!selected&&id!==selected&&!el.classList.contains("related"))});
      view.querySelectorAll("[data-tree]").forEach(b=>b.setAttribute("aria-selected",b.dataset.tree===activeTree)); draw();
    }
    view.querySelectorAll("[data-tree]").forEach(b=>b.addEventListener("click",()=>{activeTree=b.dataset.tree;selected="";focus.innerHTML=`<p class="eyebrow">${trees[activeTree].label.toUpperCase()}</p><h3>Stammbaum erkunden</h3><p>Wähle eine Figur, um ihre Beziehungen in diesem Teil des Netzes zu untersuchen.</p>`;update()}));
    map.querySelectorAll("[data-person]").forEach(b=>b.addEventListener("click",()=>{selected=b.dataset.person;const c=people[selected], related=links.filter(l=>l[0]===selected||l[1]===selected).filter(l=>visibleIds().has(l[0])&&visibleIds().has(l[1]));focus.innerHTML=`<p class="eyebrow">${esc(c.kind)} · ${c.symbol}</p><h3>${esc(c.name)}</h3><p>${esc(c.role)}</p><h4>Direkte Beziehungen</h4><ul>${related.map(l=>{const other=people[l[0]===selected?l[1]:l[0]];return `<li><button type="button" data-jump="${other.id}"><strong>${other.name}</strong></button><span>${esc(l[3])}</span></li>`}).join("")||"<li>In diesem Ausschnitt keine weitere Verbindung.</li>"}</ul>`;focus.querySelectorAll("[data-jump]").forEach(j=>j.addEventListener("click",()=>map.querySelector(`[data-person="${j.dataset.jump}"]`).click()));update()}));
    const observer=new ResizeObserver(draw);observer.observe(map);update();
  }
  function showClues(){
    deriveAchievements();
    view.innerHTML=head("Gesammelte Indizien","ATHENES ARCHIV")+`<div class="clue-grid">${
      D.stations.map((s,i)=>state.completed.includes(s.id)?`<article class="clue"><span class="sigil">${s.symbol}</span><h3>${esc(s.reward)}</h3><p>${esc(s.title)} · Kapitel ${s.chapter.join(", ")}, PDF S. ${s.pageRef}</p></article>`
      :`<article class="clue" style="opacity:.35"><h3>Fragment ${i+1}</h3><p>Noch nicht rekonstruiert</p></article>`).join("")
    }</div><div class="panel" style="margin-top:1rem"><h3>Abzeichen</h3><div class="clue-grid">${
      D.achievements.map(a=>`<article class="clue" style="opacity:${state.achievements.includes(a.id)?1:.35}">
        <span class="sigil">${state.achievements.includes(a.id)?"✦":"◇"}</span><h3>${a.name}</h3><p>${a.rule}</p></article>`).join("")
    }</div></div>${completeCount()===D.stations.length?renderFinal():""}`;
    bindFinal();
  }
  function showEconomy(){
    const costs=[["1. Fehlversuch","nur richtig/falsch"],["2. Fehlversuch","Gratis-Hinweis"],["3. Fehlversuch","Musterlösung"]];
    const rewards=[["Richtige Textspur","＋8"],["Beim ersten Versuch","＋4 Bonus"],["Ohne Hinweis","＋2 Bonus"],["Dreierserie beim ersten Versuch","＋5"],["Station abgeschlossen","＋12"],["Neues Abzeichen","＋10"],["Schlussrätsel","＋30"]];
    view.innerHTML=head("Athenes Eulen-Konto","SPIELPUNKTE · KEIN ECHTES GELD")+`<div class="economy-grid">
      <section class="panel balance-panel"><p class="eyebrow">AKTUELLER STAND</p><strong class="big-balance">${state.score}</strong><span>Athenes Eulen</span>
        <p>Die Eulen zeigen Ausdauer, genaue Textarbeit und klugen Umgang mit Hinweisen. Sie haben keinerlei Geldwert.</p>
        <div class="streak">Aktuelle Erstversuch-Serie: <strong>${state.streak||0}</strong> · Beste Serie: <strong>${state.bestStreak||0}</strong></div></section>
      <section class="panel"><h3>Hilfen ohne Eulenabzug</h3><div class="tariff-list">${costs.map(([a,b])=>`<div><span>${a}</span><strong>${b}</strong></div>`).join("")}</div>
        <p class="muted">Bei den 84 Stationsfragen werden für Hinweise und Musterlösungen keine Eulen mehr abgezogen.</p></section>
      <section class="panel"><h3>Belohnungen</h3><div class="tariff-list">${rewards.map(([a,b])=>`<div><span>${a}</span><strong>${b}</strong></div>`).join("")}</div></section>
      <section class="panel ledger"><h3>Letzte Buchungen</h3>${(state.transactions||[]).length?`<div class="ledger-list">${state.transactions.map(t=>`<div>
        <span>${esc(t.label)}</span><strong class="${t.amount<0?"cost":""}">${t.amount>0?"+":""}${t.amount}</strong></div>`).join("")}</div>`:"<p>Noch keine Buchungen.</p>"}</section>
    </div>`;
  }
  function showWriting(){
    const p=D.writingProject;
    state.writing=state.writing||{fields:{},completed:[],revision:[],draftComplete:false};
    state.writing.revision=state.writing.revision||[];
    const completed=state.writing.completed||[], allPlans=p.stages.every(s=>completed.includes(s.id));
    view.innerHTML=head(p.title,"KREATIVES ABSCHLUSSPROJEKT")+`<section class="writing-hero panel">
      <div><p class="eyebrow">ENTWERFEN · KONZIPIEREN · DURCHFÜHREN</p><h2>${esc(p.title)}</h2><p>${esc(p.intro)}</p></div>
      <div class="writing-progress"><strong>${completed.length}/${p.stages.length}</strong><span>Planungsschritte</span></div></section>
      <section class="panel writing-principles"><h3>Leitplanken für eine glaubwürdige Sportgeschichte</h3><ul>${p.principles.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>
      <div class="writing-stages">${p.stages.map((s,i)=>{
        const unlocked=i===0||completed.includes(p.stages[i-1].id), done=completed.includes(s.id), value=state.writing.fields[s.id]||"";
        return `<article class="panel writing-stage ${unlocked?"":"writing-locked"} ${done?"done":""}">
          <div class="writing-stage-head"><span>${s.number}</span><div><p class="source">${done?"ABGESCHLOSSEN":unlocked?"IN ARBEIT":"NOCH GESPERRT"}</p><span class="chip">${esc(s.heroStages)}</span><h3>${esc(s.title)}</h3></div></div>
          ${unlocked?`<p>${esc(s.prompt)}</p><div class="prompt-grid">${s.questions.map(q=>`<span>${esc(q)}</span>`).join("")}</div>
          <label for="write-${s.id}">Planungsnotizen</label><textarea id="write-${s.id}" data-writing-field="${s.id}" rows="8" placeholder="Entwickle diesen Baustein mit eigenen Ideen …">${esc(value)}</textarea>
          <div class="writing-actions"><span data-count="${s.id}">${value.length}/${s.min} Zeichen Mindestumfang</span>
          <button class="primary" data-complete-writing="${s.id}" ${done?"disabled":""}>${done?"Abgeschlossen · +10 Eulen":"Schritt abschliessen · +10 Eulen"}</button></div>
          <div data-writing-feedback="${s.id}"></div>`:`<p>Schliesse zuerst «${esc(p.stages[i-1].title)}» ab.</p>`}</article>`;
      }).join("")}</div>
      <section class="panel draft-studio ${allPlans?"":"writing-locked"}"><p class="eyebrow">PHASE 07 · DURCHFÜHRUNG</p><h2>${esc(p.draft.title)}</h2>
        ${allPlans?`<p>${esc(p.draft.prompt)}</p><div class="draft-toolbar"><span>Zielumfang: ${p.draft.target}</span><strong id="draftWordCount">${countWords(state.writing.fields.draft||"")} Wörter</strong></div>
        <textarea data-writing-field="draft" class="draft-area" rows="28" placeholder="Beginne mit einer konkreten Szene …">${esc(state.writing.fields.draft||"")}</textarea>
        <div class="writing-actions"><button class="primary" id="completeDraft" ${state.writing.draftComplete?"disabled":""}>${state.writing.draftComplete?"Erzählung abgeschlossen · +25 Eulen":"Erzählung abschliessen · +25 Eulen"}</button>
        <button class="hint-btn" id="exportWriting">Projekt als Textdatei exportieren</button></div><div id="draftFeedback"></div>`:`<p>Die Schreibwerkstatt wird nach allen sechs Planungsschritten freigeschaltet.</p>`}</section>
      <section class="panel revision-check"><p class="eyebrow">ÜBERARBEITUNG</p><h2>Redaktionskonferenz</h2><div class="revision-grid">${p.revision.map((x,i)=>`<label><input type="checkbox" data-revision="${i}" ${state.writing.revision.includes(i)?"checked":""}> <span>${esc(x)}</span></label>`).join("")}</div></section>`;
    bindWriting();
  }
  function countWords(text){return String(text).trim()?String(text).trim().split(/\s+/).length:0}
  function bindWriting(){
    document.querySelectorAll("[data-writing-field]").forEach(area=>area.addEventListener("input",()=>{
      state.writing.fields[area.dataset.writingField]=area.value;save();
      const count=document.querySelector(`[data-count="${area.dataset.writingField}"]`);
      if(count){const stage=D.writingProject.stages.find(s=>s.id===area.dataset.writingField);count.textContent=`${area.value.length}/${stage.min} Zeichen Mindestumfang`;}
      if(area.dataset.writingField==="draft")document.querySelector("#draftWordCount").textContent=`${countWords(area.value)} Wörter`;
    }));
    document.querySelectorAll("[data-complete-writing]").forEach(button=>button.addEventListener("click",()=>{
      const stage=D.writingProject.stages.find(s=>s.id===button.dataset.completeWriting), value=state.writing.fields[stage.id]||"";
      const feedback=document.querySelector(`[data-writing-feedback="${stage.id}"]`);
      if(value.trim().length<stage.min){feedback.innerHTML=`<div class="feedback bad">Entwickle den Baustein noch genauer: mindestens ${stage.min} Zeichen.</div>`;return;}
      if(!state.writing.completed.includes(stage.id)){state.writing.completed.push(stage.id);record(10,`Schreibprojekt: ${stage.title}`);save();showWriting();}
    }));
    document.querySelector("#completeDraft")?.addEventListener("click",()=>{
      const words=countWords(state.writing.fields.draft||"");
      if(words<D.writingProject.draft.min){document.querySelector("#draftFeedback").innerHTML=`<div class="feedback bad">Der Entwurf umfasst ${words} Wörter. Für eine ausgearbeitete Heldenreise werden mindestens ${D.writingProject.draft.min} Wörter benötigt.</div>`;return;}
      if(state.writing.revision.length<D.writingProject.revision.length){document.querySelector("#draftFeedback").innerHTML=`<div class="feedback bad">Führe vor dem Abschluss die vollständige Redaktionskonferenz durch und bestätige alle Überarbeitungsschritte.</div>`;return;}
      if(!state.writing.draftComplete){state.writing.draftComplete=true;record(25,"Kreatives Schreibprojekt abgeschlossen");save();showWriting();}
    });
    document.querySelectorAll("[data-revision]").forEach(box=>box.addEventListener("change",()=>{
      const id=+box.dataset.revision;
      if(box.checked&&!state.writing.revision.includes(id))state.writing.revision.push(id);
      if(!box.checked)state.writing.revision=state.writing.revision.filter(x=>x!==id);
      save();
    }));
    document.querySelector("#exportWriting")?.addEventListener("click",exportWriting);
  }
  function exportWriting(){
    const p=D.writingProject, sections=p.stages.map(s=>`${s.number} ${s.title}\n${state.writing.fields[s.id]||""}`).join("\n\n");
    const content=`${p.title}\n\nPLANUNG\n\n${sections}\n\nERZÄHLUNG\n\n${state.writing.fields.draft||""}`;
    const link=document.createElement("a");link.href=URL.createObjectURL(new Blob([content],{type:"text/plain;charset=utf-8"}));
    link.download="heldenreise-eines-sportlers.txt";link.click();URL.revokeObjectURL(link.href);
  }
  function oracleAvailable(){return currentReadingLimit()>=57||teacherUnlockedStations.includes("totenstimmen")}
  function oracleVoice(){
    const voices=speechSynthesis.getVoices(), german=voices.filter(v=>/^de/i.test(v.lang));
    return german.find(v=>/martin|markus|stefan|male|deutsch/i.test(v.name))||german[0]||voices[0];
  }
  function speakOracle(text){
    if(!("speechSynthesis" in window))return;
    speechSynthesis.cancel();
    const utterance=new SpeechSynthesisUtterance(String(text).replace(/[;:]/g," … "));
    utterance.lang="de-DE";utterance.rate=.64;utterance.pitch=.42;utterance.volume=.96;
    const voice=oracleVoice();if(voice)utterance.voice=voice;
    speechSynthesis.speak(utterance);
  }
  function oracleReply(item,question){
    const hits=item.terms.filter(term=>words(question).some(word=>word.startsWith(normal(term).slice(0,5))||normal(term).startsWith(word.slice(0,5))));
    if(hits.length)return item.answer;
    return `Deine Frage dringt noch nicht bis zu dieser Spur vor. ${item.guide} Bleibe bei ${item.source.replace("PDF-","")}.`;
  }
  function showTeiresias(){
    if(!oracleAvailable()){
      view.innerHTML=head("Die Stimme ist noch fern","FREIGABE AB SEITE 57")+`<section class="panel reading-lock"><div class="reward">◉</div><h3>Die Unterwelt darf nichts vorwegnehmen.</h3><p>Die sechs Befragungen werden am <strong>31.08.2026</strong> nach der Lektüre bis mindestens Seite 57 freigegeben. Die Lehrperson kann die Station «Totenstimmen» früher öffnen.</p><button class="primary" data-view="trail">Zu den aktuellen Textspuren</button></section>`;
      view.querySelector("[data-view=trail]").addEventListener("click",()=>setView("trail"));return;
    }
    state.teiresiasChats=state.teiresiasChats||{};state.teiresiasCompleted=state.teiresiasCompleted||[];
    view.innerHTML=head("Befrage Teiresias","SECHS STIMMEN AUS DEM JENSEITS")+`<section class="oracle-intro panel"><div class="oracle-sigil" aria-hidden="true">◉</div><div><h2>Sprich – und höre die Weissagung</h2><p>Wähle eine Befragung, formuliere eine eigene Frage oder sprich sie ins Mikrofon. Teiresias antwortet nur innerhalb der angegebenen Textspur. Die Stimme wird lokal durch dein Gerät erzeugt; ihre genaue Klangfarbe hängt vom verfügbaren Browser und Betriebssystem ab.</p><p class="source">QUELLENGRENZE · PDF-SEITEN 45–54 · KEIN WISSEN AUS SPÄTEREN KAPITELN</p></div><div class="oracle-count"><strong>${state.teiresiasCompleted.length}/6</strong><span>befragt</span></div></section>
      <div class="oracle-grid">${D.teiresiasInterrogations.map(item=>{const chat=state.teiresiasChats[item.id]||[];return `<article class="oracle-card panel ${state.teiresiasCompleted.includes(item.id)?"answered":""}" data-oracle-card="${item.id}"><p class="source">${esc(item.source)}</p><h3>${esc(item.title)}</h3><p class="oracle-opening">${esc(item.opening)}</p><p class="oracle-guide">${esc(item.guide)}</p><div class="oracle-transcript" data-oracle-log="${item.id}" aria-live="polite">${chat.map(turn=>`<p class="${turn.role}"><span>${turn.role==="student"?"DU":"TEIRESIAS"}</span>${esc(turn.text)}</p>`).join("")}</div><label for="oracle-${item.id}">Deine Frage</label><textarea id="oracle-${item.id}" rows="3" data-oracle-input="${item.id}" placeholder="Frage mit eigenen Worten …"></textarea><div class="oracle-actions"><button class="hint-btn" data-oracle-mic="${item.id}" type="button">◉ Frage sprechen</button><button class="primary" data-oracle-send="${item.id}" type="button">Teiresias befragen</button><button class="oracle-stop" data-oracle-stop type="button">Stimme stoppen</button></div><small class="oracle-status" data-oracle-status="${item.id}"></small></article>`}).join("")}</div>`;
    bindOracle();
  }
  function bindOracle(){
    document.querySelectorAll("[data-oracle-send]").forEach(button=>button.addEventListener("click",()=>askOracle(button.dataset.oracleSend)));
    document.querySelectorAll("[data-oracle-input]").forEach(input=>input.addEventListener("keydown",event=>{if(event.key==="Enter"&&!event.shiftKey){event.preventDefault();askOracle(input.dataset.oracleInput)}}));
    document.querySelectorAll("[data-oracle-stop]").forEach(button=>button.addEventListener("click",()=>window.speechSynthesis?.cancel()));
    document.querySelectorAll("[data-oracle-mic]").forEach(button=>button.addEventListener("click",()=>{
      const id=button.dataset.oracleMic, Recognition=window.SpeechRecognition||window.webkitSpeechRecognition, status=document.querySelector(`[data-oracle-status="${id}"]`);
      if(!Recognition){status.textContent="Spracheingabe wird von diesem Browser nicht unterstützt. Tippe deine Frage ein.";return;}
      const recognition=new Recognition();recognition.lang="de-CH";recognition.interimResults=false;recognition.maxAlternatives=1;
      status.textContent="Das Orakel hört zu …";button.classList.add("listening");recognition.start();
      recognition.onresult=event=>{document.querySelector(`[data-oracle-input="${id}"]`).value=event.results[0][0].transcript;status.textContent="Frage erkannt. Du kannst sie prüfen und absenden."};
      recognition.onerror=()=>{status.textContent="Die Spracheingabe gelang nicht. Erlaube den Mikrofonzugriff oder tippe die Frage."};
      recognition.onend=()=>button.classList.remove("listening");
    }));
  }
  function askOracle(id){
    const input=document.querySelector(`[data-oracle-input="${id}"]`),question=input.value.trim(),status=document.querySelector(`[data-oracle-status="${id}"]`);
    if(question.length<5){status.textContent="Formuliere eine vollständige Frage.";return;}
    const item=D.teiresiasInterrogations.find(x=>x.id===id),answer=oracleReply(item,question);
    state.teiresiasChats[id]=[...(state.teiresiasChats[id]||[]),{role:"student",text:question},{role:"oracle",text:answer}].slice(-8);
    if(!state.teiresiasCompleted.includes(id)){state.teiresiasCompleted.push(id);record(6,`Teiresias befragt: ${item.title}`);}
    save();showTeiresias();speakOracle(answer);
  }
  function showTheory(){
    const t=D.srfTheory;state.theoryNotes=state.theoryNotes||{};state.theoryCompleted=state.theoryCompleted||[];
    view.innerHTML=head("Wo war Odysseus?","INTERAKTIVES THEORIE-LABOR")+`<section class="theory-hero panel"><div><p class="eyebrow">SRF-RESSOURCEN · KRITISCH ADAPTIERT</p><h2>Kann man einen Mythos kartieren?</h2><p>Nur Troja, Kap Maleia und Ithaka erscheinen auch auf heutigen Karten. Alle weiteren Zuordnungen bleiben Rekonstruktionen. Dieses Labor verarbeitet Wolfs Route, die zwölf Ortsargumente, sechs Reisefilme und vier Gegenmodelle der SRF-Seite.</p><a href="${t.sourceUrl}" target="_blank" rel="noopener noreferrer">SRF-Originalbeitrag und Bildergalerien öffnen ↗</a></div><img src="${t.mapImage}" alt="SRF-Karte einer rekonstruierten Odysseusroute"></section>
      <section class="theory-section"><div class="section-head"><div><p class="eyebrow">FORSCHUNGSMETHODE</p><h2>Armin Wolfs nautischer Dreischritt</h2></div></div><div class="method-flow">${t.method.map((m,i)=>`<article class="panel"><span>${m.n}</span><h3>${esc(m.title)}</h3><p>${esc(m.text)}</p>${i<t.method.length-1?'<i aria-hidden="true">→</i>':""}</article>`).join("")}</div><aside class="wolf-card panel"><img src="${t.wolfImage}" alt="Der Historiker Armin Wolf im Jahr 2015"><div><h3>Armin Wolf († 2025)</h3><p>Wolf erforschte die homerische Geografie rund fünfzig Jahre. Seine Route ist eine argumentierte Hypothese: Sie verbindet Textdaten mit realen Küsten, bleibt aber eine mögliche Deutung unter mehreren.</p></div></aside></section>
      <section class="theory-section"><div class="section-head"><div><p class="eyebrow">12 ORTSHYPOTHESEN</p><h2>Öffne Wolfs Indizienkette</h2></div><span class="muted">Behauptung ≠ Beweis</span></div><div class="place-theory-grid">${t.wolfPlaces.map((p,i)=>`<details class="place-theory panel"><summary><span>${String(i+1).padStart(2,"0")}</span><div><strong>${esc(p.name)}</strong><small>${esc(p.place)}</small></div></summary><p>${esc(p.claim)}</p><div class="evidence"><strong>Verwendetes Indiz</strong>${esc(p.evidence)}</div></details>`).join("")}</div></section>
      <section class="theory-section srf-screening"><div class="section-head"><div><p class="eyebrow">SRF-REISEGESCHICHTEN · 6 FOLGEN</p><h2>Das Mittelmeer als Prüfstrecke</h2></div></div><div class="screening-layout"><div class="screening-player"><iframe id="srfVideoFrame" title="SRF Reisegeschichten" src="https://www.srf.ch/play/embed?urn=${encodeURIComponent(t.videos[0].urn)}" allow="fullscreen; autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe><p id="srfVideoFocus">Beobachtungsauftrag: ${esc(t.videos[0].focus)}</p></div><div class="episode-list">${t.videos.map((v,i)=>`<button data-srf-video="${i}" class="${i===0?"active":""}"><span>FOLGE ${i+1}</span><strong>${esc(v.title)}</strong><small>${esc(v.focus)}</small></button>`).join("")}</div></div></section>
      <section class="theory-section"><div class="section-head"><div><p class="eyebrow">KONKURRIERENDE KARTEN</p><h2>Vier andere Odysseen</h2></div></div><div class="thesis-deck">${t.alternatives.map(a=>`<article class="panel"><span>${esc(a.date)}</span><h3>${esc(a.name)}</h3><strong>${esc(a.route)}</strong><p>${esc(a.method)}</p></article>`).join("")}</div></section>
      <section class="theory-section voss-lab"><div class="section-head"><div><p class="eyebrow">VOM GRIECHISCHEN EPOS ZUR DEUTSCHEN STIMME</p><h2>Wie Voß’ «Odyssee» entstand</h2></div><a class="resource-link" href="assets/media/homer-odyssee-voss.pdf" target="_blank">Voß-Ausgabe als PDF öffnen ↗</a></div><div class="transmission-path">
        <article><span>1</span><strong>Mündliche epische Tradition</strong><p>Formelhafte Wendungen und Hexameter helfen Sängern, Stoffe über Generationen vorzutragen und dabei zu verändern.</p></article>
        <article><span>2</span><strong>Griechischer Epostext</strong><p>Die «Odyssee», traditionell Homer zugeschrieben und meist ins späte 8. Jahrhundert v. Chr. datiert, wird schriftlich fixiert und weiter überliefert.</p></article>
        <article><span>3</span><strong>Edition und Handschriften</strong><p>Antike Gelehrte ordnen den Text in 24 Gesänge; Abschriften, Lesarten und spätere Druckausgaben vermitteln den griechischen Wortlaut.</p></article>
        <article><span>4</span><strong>Voß übersetzt 1781</strong><p>Johann Heinrich Voß arbeitet direkt am Griechischen. Er will nicht bloss den Inhalt, sondern auch Homers epischen Hexameter im Deutschen hörbar machen.</p></article>
        <article><span>5</span><strong>Revision 1793</strong><p>Voß überarbeitet die «Odyssee» und veröffentlicht sie zusammen mit seiner «Ilias». Die formnahe Sprache prägt das deutsche Homerbild nachhaltig.</p></article>
      </div><div class="voss-sample panel"><p class="eyebrow">ÜBERSETZUNGSWERKSTATT</p><blockquote>«Sage mir, Muse, die Taten des vielgewanderten Mannes …»</blockquote><p>Die Anrufung der Muse, die auffällige Wortstellung, Zusammensetzungen wie «vielgewandert» und ein sechshebiger Versgang sollen Nähe zum griechischen Epos schaffen. Ältere Schreibungen und syntaktische Umstellungen zeigen zugleich: Übersetzen ist keine neutrale Kopie, sondern eine historische Gestaltung.</p><div class="translation-scale"><span>griechische Form</span><i></i><span>deutsche Verständlichkeit</span></div></div></section>
      <section class="theory-section"><div class="section-head"><div><p class="eyebrow">8 OFFENE FORSCHUNGSAUFTRÄGE</p><h2>${state.theoryCompleted.length} von ${t.tasks.length} bearbeitet</h2></div></div><div class="theory-task-grid">${t.tasks.map((q,i)=>{const note=state.theoryNotes[q.id]||"",done=state.theoryCompleted.includes(q.id);return `<article class="panel theory-task ${done?"done":""}"><p class="source">AUFTRAG ${i+1}</p><h3>${esc(q.title)}</h3><p>${esc(q.prompt)}</p><textarea data-theory-note="${q.id}" rows="6" placeholder="Argumentiere in eigenen Worten …">${esc(note)}</textarea><div class="theory-task-actions"><span data-theory-count="${q.id}">${note.length}/${q.min} Zeichen</span><button class="primary" data-complete-theory="${q.id}" ${done?"disabled":""}>${done?"Gesichert ✓":"Antwort sichern · +6 Eulen"}</button></div><div data-theory-feedback="${q.id}"></div></article>`}).join("")}</div></section>
      <section class="theory-section panel"><p class="eyebrow">WEITERE SRF-RESSOURCEN</p><div class="theory-links">${t.related.map(r=>`<a href="${r.url}" target="_blank" rel="noopener noreferrer"><span>${esc(r.kind)}</span><strong>${esc(r.title)}</strong></a>`).join("")}</div><p class="muted">Bild- und Medienrechte verbleiben bei SRF und den dort genannten Rechteinhabern. Die Medien werden über die offiziellen SRF-Seiten beziehungsweise Player bereitgestellt.</p></section>`;
    bindTheory();
  }
  function bindTheory(){
    document.querySelectorAll("[data-srf-video]").forEach(button=>button.addEventListener("click",()=>{const index=+button.dataset.srfVideo,v=D.srfTheory.videos[index];document.querySelector("#srfVideoFrame").src=`https://www.srf.ch/play/embed?urn=${encodeURIComponent(v.urn)}`;document.querySelector("#srfVideoFocus").textContent=`Beobachtungsauftrag: ${v.focus}`;document.querySelectorAll("[data-srf-video]").forEach(x=>x.classList.toggle("active",x===button))}));
    document.querySelectorAll("[data-theory-note]").forEach(area=>area.addEventListener("input",()=>{state.theoryNotes[area.dataset.theoryNote]=area.value;const q=D.srfTheory.tasks.find(x=>x.id===area.dataset.theoryNote);document.querySelector(`[data-theory-count="${q.id}"]`).textContent=`${area.value.length}/${q.min} Zeichen`;save()}));
    document.querySelectorAll("[data-complete-theory]").forEach(button=>button.addEventListener("click",()=>{const q=D.srfTheory.tasks.find(x=>x.id===button.dataset.completeTheory),note=(state.theoryNotes[q.id]||"").trim(),feedback=document.querySelector(`[data-theory-feedback="${q.id}"]`);if(note.length<q.min){feedback.innerHTML=`<div class="feedback bad">Entwickle deine Argumentation auf mindestens ${q.min} Zeichen.</div>`;return}if(!state.theoryCompleted.includes(q.id)){state.theoryCompleted.push(q.id);record(6,`Theorie-Labor: ${q.title}`);save();showTheory()}}));
  }
  function showPodcast(){
    const p=D.podcastLab;state.podcastNotes=state.podcastNotes||{};state.podcastCompleted=state.podcastCompleted||[];state.podcastPlayback=state.podcastPlayback||{};state.podcastListened=state.podcastListened||[];
    const firstEight=p.tasks.filter(q=>q.episode!=="both").every(q=>state.podcastCompleted.includes(q.id));
    view.innerHTML=head(p.title,"PODCAST-LABOR · TRUE CRIME KRITISCH HÖREN")+`<section class="podcast-hero panel"><div><p class="eyebrow">HÖREN · PRÜFEN · URTEILEN</p><h2>Der Held auf der Anklagebank</h2><p>${esc(p.intro)}</p></div><div class="podcast-score"><strong>${state.podcastCompleted.length}</strong><span>/ ${p.tasks.length} Aufträge</span></div></section>
      <section class="podcast-safety panel"><div class="safety-mark" aria-hidden="true">!</div><div><p class="eyebrow">INHALTS- UND SPOILERHINWEIS</p><h3>Vor dem Start bewusst entscheiden</h3><p>${esc(p.contentNote)}</p><label><input type="checkbox" id="podcastAcknowledge" ${state.podcastAcknowledged?"checked":""}> <span>Ich habe den Hinweis gelesen und möchte die Podcasts öffnen.</span></label></div></section>
      <section class="listening-contract"><div class="section-head"><div><p class="eyebrow">DIDAKTISCHE SICHERUNG</p><h2>Vier Regeln für kritisches Hören</h2></div></div><div>${p.listeningRules.map((rule,i)=>`<article class="panel"><span>${i+1}</span><p>${esc(rule)}</p></article>`).join("")}</div></section>
      <section class="podcast-episodes ${state.podcastAcknowledged?"":"podcast-locked"}">${p.episodes.map(ep=>`<article class="podcast-episode panel" style="--episode:${ep.id==="dark"?"var(--gods)":"var(--ithaka)"}"><div class="episode-heading"><span>FOLGE ${ep.number}</span><small>${ep.duration}</small><h2>${esc(ep.title)}</h2><strong>${esc(ep.lens)}</strong></div><div class="episode-spoiler"><strong>Spoilerbereich</strong><p>${esc(ep.spoiler)}</p></div><audio controls preload="metadata" data-podcast-audio="${ep.id}" src="${ep.src}" ${state.podcastAcknowledged?"":"inert"}>Dein Browser kann diese Audiodatei nicht wiedergeben.</audio><div class="listening-phases"><details><summary>Vor dem Hören</summary><p>${esc(ep.before)}</p></details><details><summary>Während des Hörens</summary><p>${esc(ep.during)}</p></details><details><summary>Nach dem Hören</summary><p>${esc(ep.after)}</p></details></div><p class="listened-state">${state.podcastListened.includes(ep.id)?"✓ Folge vollständig abgespielt":"Der Hörstand wird beim Pausieren gespeichert."}</p></article>`).join("")}</section>
      <section class="podcast-work"><div class="section-head"><div><p class="eyebrow">OFFENE HÖR- UND TEXTAUFTRÄGE</p><h2>Vom Eindruck zum belegten Urteil</h2></div></div><div class="podcast-task-grid">${p.tasks.map((q,i)=>{const note=state.podcastNotes[q.id]||"",done=state.podcastCompleted.includes(q.id),locked=q.episode==="both"&&!firstEight;return `<article class="panel podcast-task ${done?"done":""} ${locked?"task-locked":""}"><div class="podcast-task-head"><span>${esc(q.phase)}</span><small>${q.episode==="dark"?"FOLGE 1":q.episode==="revenge"?"FOLGE 2":"BEIDE FOLGEN"}</small></div><h3>${esc(q.title)}</h3><p>${esc(q.prompt)}</p>${locked?'<div class="feedback">Die Schlussakte öffnet sich nach den acht Vorarbeiten.</div>':`<textarea data-podcast-note="${q.id}" rows="7" placeholder="Notiere Zeitmarken und konkrete Textbelege …">${esc(note)}</textarea><div class="podcast-task-actions"><span data-podcast-count="${q.id}">${note.length}/${q.min} Zeichen</span><button class="primary" data-complete-podcast="${q.id}" ${done?"disabled":""}>${done?"Gesichert ✓":"Sichern · +8 Eulen"}</button></div><div data-podcast-feedback="${q.id}"></div>`}</article>`}).join("")}</div></section>
      <section class="podcast-source panel"><p><strong>Quellenregel:</strong> Die Audios sind journalistische Deutungen. Primärquellen bleiben Homers «Odyssee» in der Übersetzung von Voß und die gelesene Nacherzählung von Auguste Lechner. Aussagen über Motive und Schuld müssen deshalb rückgeprüft werden.</p></section>`;
    bindPodcast();
  }
  function bindPodcast(){
    document.querySelector("#podcastAcknowledge")?.addEventListener("change",event=>{state.podcastAcknowledged=event.target.checked;save();showPodcast()});
    document.querySelectorAll("[data-podcast-audio]").forEach(audio=>{
      const id=audio.dataset.podcastAudio;
      audio.addEventListener("loadedmetadata",()=>{const saved=state.podcastPlayback[id]||0;if(saved>0&&saved<audio.duration-5)audio.currentTime=saved},{once:true});
      audio.addEventListener("pause",()=>{if(audio.currentTime>0){state.podcastPlayback[id]=Math.floor(audio.currentTime);save()}});
      audio.addEventListener("ended",()=>{if(!state.podcastListened.includes(id)){state.podcastListened.push(id);record(5,`Podcast vollständig gehört: ${D.podcastLab.episodes.find(x=>x.id===id).title}`);save();showPodcast()}});
    });
    document.querySelectorAll("[data-podcast-note]").forEach(area=>area.addEventListener("input",()=>{state.podcastNotes[area.dataset.podcastNote]=area.value;const q=D.podcastLab.tasks.find(x=>x.id===area.dataset.podcastNote);document.querySelector(`[data-podcast-count="${q.id}"]`).textContent=`${area.value.length}/${q.min} Zeichen`;save()}));
    document.querySelectorAll("[data-complete-podcast]").forEach(button=>button.addEventListener("click",()=>{const q=D.podcastLab.tasks.find(x=>x.id===button.dataset.completePodcast),note=(state.podcastNotes[q.id]||"").trim(),feedback=document.querySelector(`[data-podcast-feedback="${q.id}"]`);if(note.length<q.min){feedback.innerHTML=`<div class="feedback bad">Vertiefe die Antwort auf mindestens ${q.min} Zeichen und arbeite mit Belegen.</div>`;return}if(!state.podcastCompleted.includes(q.id)){state.podcastCompleted.push(q.id);record(8,`Podcast-Labor: ${q.title}`);save();showPodcast()}}));
  }
  function showMedia(){
    const m=D.mediaResource;
    view.innerHTML=head(m.title,"ERGÄNZENDE MULTIMEDIA-SPUR")+`<div class="media-layout">
      <section class="panel media-player">${m.videos.map((video, index) => `<div class="video-part">
        <p class="eyebrow">${esc(video.label)}</p>
        <video controls preload="metadata" data-video-part="${index}">
          <source src="${video.src}" type="video/mp4">Dein Browser kann dieses Video nicht wiedergeben.
        </video>
      </div>`).join("")}<div class="media-meta"><span class="chip">${esc(m.sourceType)}</span>
        ${m.themes.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}
        <p class="feedback"><strong>Quellenhinweis:</strong> ${esc(m.notice)}</p>
        <a class="resource-link" href="${m.transcript}" target="_blank">Transkript als PDF öffnen ↗</a>
      </div></section>
      <section class="media-prompts">${m.prompts.map((p,i)=>`<article class="panel media-prompt">
        <p class="source">VIDEO-SPUR ${i+1}</p><h3>${esc(p.title)}</h3><p>${esc(p.prompt)}</p>
        <label for="${p.id}">Deine Beobachtungen</label>
        <textarea id="${p.id}" data-media-note="${p.id}" rows="5" placeholder="Formuliere mit eigenen Worten …">${esc(state.mediaNotes[p.id]||"")}</textarea>
        <details><summary>Auswertungshilfe</summary><p>${esc(p.guide)}</p></details></article>`).join("")}</section>
    </div>`;
    view.querySelectorAll("[data-media-note]").forEach(x=>x.addEventListener("input",()=>{
      state.mediaNotes[x.dataset.mediaNote]=x.value;save();
    }));
  }
  function openStation(id){
    currentStation=D.stations.find(s=>s.id===id); taskIndex=0; renderStation(); dialog.showModal();
  }
  function renderStation(){
    const s=currentStation, done=state.completed.includes(s.id), t=D.threads[s.thread];
    dialog.style.setProperty("--thread",t.colour);
    document.querySelector("#stationContent").innerHTML=`<div class="station-content">
      <p class="source">${t.label.toUpperCase()} · ${esc(s.place).toUpperCase()} · ${
        done?`KAPITEL ${s.chapter.join(", ")} · PDF-SEITEN ${s.pageRef}`:"QUELLENANGABE NACH DER LÖSUNG"
      }</p>
      <h2 id="dialogTitle">${esc(s.title)}</h2><div class="mission"><div><strong>1 · SPUR ENTDECKEN</strong>${esc(s.discover)}</div>
      <div><strong>2 · TEXT ERMITTELN</strong>${esc(s.read)}</div></div>
      <div class="legend">${s.themes.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div>
      ${done?`<div class="summary"><div class="reward">${s.symbol}</div><h3>Diese Spur ist rekonstruiert.</h3><p>${esc(s.reward)}</p><button class="primary" data-replay>Aufgaben wiederholen</button></div>`:renderTask(s.tasks[taskIndex])}</div>`;
    document.querySelector("[data-replay]")?.addEventListener("click",()=>{taskIndex=0; renderStationActive();});
    bindTask();
  }
  function renderStationActive(){
    const box=document.querySelector(".summary"); if(box){box.outerHTML=renderTask(currentStation.tasks[taskIndex]);bindTask();}
  }
  function shuffledOrder(q){
    const items=[...q.options];
    for(let i=items.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [items[i],items[j]]=[items[j],items[i]];
    }
    if(items.length>1&&JSON.stringify(items)===JSON.stringify(q.answer)){
      [items[0],items[1]]=[items[1],items[0]];
    }
    return items;
  }
  function renderTask(q){
    order=q.type==="order"?shuffledOrder(q):[];
    const attempts=(state.attempts||{})[q.id]||0;
    const answerRows=q.expectedParts>=3?Math.min(7,q.expectedParts+1):q.expectedParts===2?4:3;
    const answerHTML=q.type==="text"?`<textarea class="text-answer" id="textAnswer" rows="${answerRows}" autocomplete="off" aria-label="Antwort" placeholder="Schreibe deine Antwort hier. Mit Enter beginnst du eine neue Zeile."></textarea>`
      :q.type==="order"?`<div class="answers sortable" id="orderList">${order.map((x,i)=>`<div class="answer"><span>${i+1}. ${esc(x)}</span><span><button data-up="${i}" aria-label="Nach oben">↑</button> <button data-down="${i}" aria-label="Nach unten">↓</button></span></div>`).join("")}</div>`
      :"";
    return `<div class="task-box"><span class="task-progress">3 · TEXTSPUR LÖSEN · ${esc(q.creativeMode).toUpperCase()} · AUFGABE ${taskIndex+1}/3 · SCHWIERIGKEIT ${"●".repeat(q.difficulty)}${"○".repeat(3-q.difficulty)}</span>
      <h3>${esc(q.prompt)}</h3><p class="answer-instruction">${esc(q.instruction||"Antworte mit Bezug zum gelesenen Text.")}</p>
      <div class="attempt-path" aria-label="Ablauf der Lösungsversuche"><span class="${attempts===0?"active":""}">1 · Prüfung</span><span class="${attempts===1?"active":""}">2 · Gratis-Hinweis</span><span class="${attempts>=2?"active":""}">3 · Musterlösung</span></div>
      ${answerHTML}<div id="taskFeedback"></div><div class="actions"><button class="primary" id="checkAnswer">Antwort prüfen</button></div></div>`;
  }
  function bindTask(){
    const q=currentStation?.tasks[taskIndex]; if(!q)return;
    bindOrder(q);
    document.querySelector("#checkAnswer")?.addEventListener("click",()=>check(q));
  }
  function bindOrder(q){
    document.querySelectorAll("[data-up],[data-down]").forEach(b=>b.addEventListener("click",()=>{
      const i=+(b.dataset.up??b.dataset.down), j=b.hasAttribute("data-up")?i-1:i+1;
      if(j<0||j>=order.length)return; [order[i],order[j]]=[order[j],order[i]];
      document.querySelector("#orderList").innerHTML=order.map((x,k)=>`<div class="answer"><span>${k+1}. ${esc(x)}</span><span><button data-up="${k}">↑</button> <button data-down="${k}">↓</button></span></div>`).join("");bindOrder(q);
    }));
  }
  function check(q){
    let ok=false;
    if(q.type==="text"){ok=openAnswerCorrect(q,document.querySelector("#textAnswer").value);}
    else if(q.type==="order")ok=JSON.stringify(order)===JSON.stringify(q.answer);
    const f=document.querySelector("#taskFeedback");
    if(!ok){
      state.attempts=state.attempts||{};state.attempts[q.id]=(state.attempts[q.id]||0)+1;
      state.streak=0;save();
      const attempts=state.attempts[q.id];
      if(attempts===1){f.innerHTML='<div class="feedback bad"><strong>Falsch.</strong> Prüfe deine Antwort noch einmal am Text. Beim nächsten Fehlversuch erhältst du kostenlos einen Hinweis.</div>';return;}
      if(attempts===2){state.hints[q.id]=Math.max(state.hints[q.id]||0,1);save();f.innerHTML=`<div class="feedback"><strong>Falsch – kostenloser Hinweis:</strong> ${esc(q.hints[0])}</div>`;return;}
      state.hints[q.id]=Math.max(state.hints[q.id]||0,2);save();
      const solution=Array.isArray(q.answer)?q.answer.join(" · "):q.answer&&typeof q.answer==="object"?Object.entries(q.answer).map(([a,b])=>`${a} – ${b}`).join(" · "):String(q.answer);
      f.innerHTML=`<div class="feedback solution"><strong>Musterlösung:</strong> ${esc(solution)}<br><span class="muted">Vergleiche sie mit deiner Antwort. Dafür werden keine Eulen abgezogen.</span></div>`;
      setContinueButton(taskIndex===2?"Musterlösung verstanden · Station abschliessen":"Musterlösung verstanden · nächste Aufgabe");return;
    }
    if(!state.taskResults[q.id]){
      const firstTry=!((state.attempts||{})[q.id]>0), noHint=!(state.hints[q.id]>0);
      let reward=8;const parts=["Textspur +8"];
      if(firstTry){reward+=4;parts.push("Erstversuch +4");state.streak=(state.streak||0)+1;}else state.streak=0;
      if(noHint){reward+=2;parts.push("ohne Hinweis +2");}
      if(firstTry&&state.streak%3===0){reward+=5;parts.push("Dreierserie +5");}
      state.bestStreak=Math.max(state.bestStreak||0,state.streak||0);
      state.taskResults[q.id]=true;record(reward,`${q.creativeMode}: ${parts.join(", ")}`);save();
    }
    f.innerHTML=`<div class="feedback good"><strong>Spur bestätigt.</strong> ${esc(q.feedback)}<br><span class="muted">Lernziel: ${esc(q.objective)}</span></div>`;
    setContinueButton(taskIndex===2?"Station abschliessen":"Nächste Aufgabe");
  }
  function setContinueButton(label){
    const old=document.querySelector("#checkAnswer"),next=old.cloneNode(true);
    next.textContent=label;next.removeAttribute("id");old.replaceWith(next);next.addEventListener("click",nextTask);
  }
  function nextTask(){
    if(taskIndex<2){taskIndex++;document.querySelector(".task-box").outerHTML=renderTask(currentStation.tasks[taskIndex]);bindTask();return;}
    if(!state.completed.includes(currentStation.id)){state.completed.push(currentStation.id);state.clues.push(currentStation.reward);record(12,`Station abgeschlossen: ${currentStation.title}`);save();}
    document.querySelector(".task-box").outerHTML=`<div class="summary"><div class="reward">${currentStation.symbol}</div><h3>Routenfragment gesichert</h3><p>${esc(currentStation.reward)}</p><button class="primary" id="continueTrail">Weiter zur Karte</button></div>`;
    document.querySelector("#continueTrail").onclick=()=>{dialog.close();showTrail();};
  }
  function renderFinal(){
    const p=D.finalPuzzle;
    return `<section class="final-puzzle" style="margin-top:2rem"><p class="eyebrow">SCHLUSSRÄTSEL</p><h2>${p.title}</h2><p>${p.prompt}</p>
      ${p.parts.map((x,i)=>`<label>${x.label}<input class="text-answer" data-final="${i}" placeholder="Begriff aus den gesammelten Spuren"></label>`).join("")}
      <button class="primary" id="checkFinal">Athenes Siegel öffnen</button><div id="finalFeedback">${state.final?`<div class="feedback good"><strong>${p.solutionWord}</strong> · ${p.feedback}</div>`:""}</div></section>`;
  }
  function bindFinal(){
    document.querySelector("#checkFinal")?.addEventListener("click",()=>{
      const ok=D.finalPuzzle.parts.every((p,i)=>normal(document.querySelector(`[data-final="${i}"]`).value)===normal(p.answer));
      document.querySelector("#finalFeedback").innerHTML=`<div class="feedback ${ok?"good":"bad"}">${ok?`<strong>${D.finalPuzzle.solutionWord}</strong> · ${D.finalPuzzle.feedback}`:"Mindestens eine Verbindung stimmt noch nicht. Prüfe Zorn, Treffpunkt und Penelopes privaten Beweis."}</div>`;
      if(ok&&!state.final){state.final=true;record(30,"Schlussrätsel gelöst");save();}
    });
  }
  function setView(name){
    document.querySelectorAll("nav [data-view]").forEach(b=>b.setAttribute("aria-current",b.dataset.view===name?"page":"false"));
    if(["threads","theory","media","podcast","writing"].includes(name)&&currentReadingLimit()!==Infinity&&!teacherPinSession){
      view.innerHTML=head("Noch nicht freigegeben","LESEPLAN 2026")+`<section class="panel reading-lock"><div class="reward">⌛</div>
        <h3>Dieser Lernbereich setzt die vollständige Lektüre voraus.</h3>
        <p>Erzählstränge und Heldenreise, das Theorie- und Podcast-Labor, die Video-Aufgaben sowie das kreative Schreibprojekt enthalten Wissen aus dem ganzen Buch. Sie werden am <strong>21.09.2026</strong> freigeschaltet.</p>
        <button class="primary" data-view="trail">Zu den aktuellen Textspuren</button></section>`;
      view.querySelector("[data-view=trail]").addEventListener("click",()=>setView("trail"));
      view.focus({preventScroll:true});return;
    }
    ({trail:showTrail,threads:showThreads,route:showRoute,theory:showTheory,characters:showCharacters,clues:showClues,teiresias:showTeiresias,media:showMedia,podcast:showPodcast,economy:showEconomy,writing:showWriting}[name]||showTrail)();
    view.focus({preventScroll:true});
  }
  document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>setView(b.dataset.view)));
  document.querySelector("#profileButton").addEventListener("click",openLogin);
  const backgroundFilm=document.querySelector(".cinematic-bg"),filmToggle=document.querySelector("#filmToggle");
  function setFilmPaused(paused){
    if(paused)backgroundFilm.pause();else backgroundFilm.play().catch(()=>{});
    filmToggle.setAttribute("aria-pressed",String(paused));filmToggle.textContent=paused?"▶ Film starten":"Ⅱ Film pausieren";
    localStorage.setItem(FILM_PAUSED_KEY,String(paused));
  }
  filmToggle.addEventListener("click",()=>setFilmPaused(filmToggle.getAttribute("aria-pressed")!=="true"));
  if(localStorage.getItem(FILM_PAUSED_KEY)==="true")setFilmPaused(true);
  document.querySelector("#studentLoginForm").addEventListener("submit",event=>{
    event.preventDefault();loginStudent(document.querySelector("#studentFirstName").value,document.querySelector("#studentLastName").value);
  });
  document.querySelector(".account-close").addEventListener("click",()=>loginDialog.close());
  document.querySelector(".teacher-close").addEventListener("click",()=>teacherDialog.close());
  document.querySelector("#openTeacherButton").addEventListener("click",openTeacher);
  document.querySelector(".dialog-close").addEventListener("click",()=>dialog.close());
  dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
  document.querySelector("#resetButton").addEventListener("click",()=>{
    if(confirm("Den gesamten lokalen Fortschritt wirklich löschen?")){
      state={...initial,completed:[],taskResults:{},hints:{},attempts:{},clues:[],achievements:[],rewardedAchievements:[],
        transactions:[{amount:12,label:"Startguthaben",kind:"reward"}],mediaNotes:{},journeyResults:{},journeyAttempts:{},journeyHints:{},
        writing:{fields:{},completed:[],revision:[],draftComplete:false},journeyStageNotes:{},journeyStageCompleted:[],theoryNotes:{},theoryCompleted:[],podcastNotes:{},podcastCompleted:[],podcastPlayback:{},podcastListened:[],podcastAcknowledged:false,teiresiasChats:{},teiresiasCompleted:[]};save();showTrail();
    }
  });
  updateHeader();showTrail();loadTeacherUnlocks().then(showTrail);if(!activeStudentId)window.setTimeout(openLogin,250);
})();
