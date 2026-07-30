/* Selbst formulierte Lerninhalte nach Auguste Lechners Nacherzählung.
   pageRef bezeichnet die PDF-Zählung der Projektquelle. */
window.ODYSSEUS_DATA = (() => {
  const threads = {
    odysseus: { label: "Odysseus", colour: "#49b6c8" },
    telemachos: { label: "Telemachos", colour: "#d9a441" },
    ithaka: { label: "Ithaka", colour: "#b76d8d" },
    gods: { label: "Götter & Schicksal", colour: "#9a86d8" }
  };

  const chapters = [
    [1,"Troja bis Polyphem","5–29"],[2,"Aiolos bis Unterwelt","30–57"],
    [3,"Sirenen bis Kalypso","58–83"],[4,"Athene sendet Telemachos aus","84–102"],
    [5,"Nestor, Menelaos und der Hinterhalt","103–127"],[6,"Kalypso bis Phaiaken","128–154"],
    [7,"Ithaka, Eumaios und Wiederbegegnung","155–178"],[8,"Der Bettler im Palast","179–194"],
    [9,"Penelope und Eurykleia","195–209"],[10,"Bogenprobe und Kampf","210–225"],
    [11,"Bett, Laertes und Frieden","226–242"]
  ].map(([id,title,pages]) => ({ id,title,pages }));

  const characters = [
    ["odysseus","Odysseus",["Ulysses"],"Mensch","König von Ithaka; Heimkehrer","zu Penelope und Telemachos zurückkehren","List und Ausdauer","Bogen","wechselt","1","5"],
    ["penelope","Penelope",[],"Mensch","Königin von Ithaka; Ehefrau","Zeit gewinnen und Gewissheit erlangen","Prüfung mit dem Bett","Webstuhl","prüft","4","84"],
    ["telemachos","Telemachos",[],"Mensch","Sohn und suchender Erbe","Nachricht und Handlungsfähigkeit gewinnen","Reise nach Pylos und Sparta","Speer","hilft","4","84"],
    ["athene","Athene",["Pallas Athene"],"Gottheit","Schutzgöttin und Strategin","Odysseus’ Haus und Ordnung retten","Verkleidungen, Rat und Friedensschluss","Eule","hilft","1","6"],
    ["poseidon","Poseidon",[],"Gottheit","Meeresgott; Vater Polyphems","Polyphem rächen","Stürme und erschwerte Heimkehr","Dreizack","behindert","1","28"],
    ["zeus","Zeus",[],"Gottheit","oberster Entscheider","göttliche Ordnung wahren","entscheidet über Kalypso und Helios’ Klage","Blitz","prüft","1","6"],
    ["hermes","Hermes",[],"Gottheit","Götterbote und Helfer","Aufträge der Götter ausführen","Moly und Botschaft an Kalypso","Stab","hilft","2","38"],
    ["polyphem","Polyphem",["Kyklop"],"anderes Wesen","einäugiger Sohn Poseidons","Eindringlinge fressen und festhalten","verflucht Odysseus nach dessen Selbstenthüllung","Auge","behindert","1","18"],
    ["kirke","Kirke",[],"Gottheit","Zauberin auf Aia","Macht ausüben, später beraten","verwandelt und befreit Gefährten","Becher","wechselt","2","35"],
    ["kalypso","Kalypso",[],"Gottheit","Nymphe auf Ogygia","Odysseus bei sich behalten","gibt ihn auf göttlichen Befehl frei","Insel","wechselt","3","75"],
    ["nausikaa","Nausikaa",[],"Mensch","Tochter des Alkinoos","dem Schiffbrüchigen taktvoll helfen","weist den Weg zum Palast","Wäschekorb","hilft","6","133"],
    ["alkinoos","Alkinoos",[],"Mensch","König der Phaiaken","Gastrecht gewähren","organisiert Odysseus’ Heimfahrt","Schiff","hilft","6","139"],
    ["arete","Arete",[],"Mensch","Königin der Phaiaken","Fremden beurteilen","nimmt Odysseus als Bittenden an","Thron","prüft","6","141"],
    ["nestor","Nestor",["Rossebändiger"],"Mensch","König von Pylos; alter Ratgeber","Telemachos mit Wissen und Rat helfen","berichtet von Heimkehrern","Pferd","hilft","1","5"],
    ["menelaos","Menelaos",[],"Mensch","König von Sparta; Helenas Gemahl","Telemachos Auskunft geben","berichtet Proteus’ Nachricht über Odysseus","Becher","hilft","1","5"],
    ["helena","Helena",[],"Mensch","Königin von Sparta","Vergangenheit deuten","erkennt Telemachos’ Ähnlichkeit","Spindel","prüft","5","111"],
    ["eumaios","Eumaios",[],"Mensch","loyaler Schweinehirt","Odysseus’ Haus treu bleiben","beherbergt den verkleideten Herrn","Hirtenstab","hilft","7","158"],
    ["eurykleia","Eurykleia",[],"Mensch","alte Schaffnerin und Amme","dem Haus treu dienen","erkennt die Narbe und schweigt","Waschbecken","hilft","4","85"],
    ["laertes","Laertes",[],"Mensch","Odysseus’ alter Vater","Sohn und Haus wiedergewinnen","wird im Obstgarten geprüft und erkannt","Baum","hilft","11","232"],
    ["antinoos","Antinoos",[],"Mensch","aggressiver Wortführer der Freier","Macht im Palast gewinnen","plant Hinterhalt und misshandelt den Bettler","Schemel","behindert","4","91"],
    ["eurymachos","Eurymachos",[],"Mensch","berechnender Freier","Verantwortung abwälzen und überleben","versucht nach Antinoos’ Tod zu verhandeln","Becher","behindert","4","91"],
    ["philoitios","Philoitios",[],"Mensch","loyaler Rinderhirt","seinem Herrn treu bleiben","kämpft an Odysseus’ Seite","Rinderhorn","hilft","10","216"],
    ["melanthios","Melanthios",[],"Mensch","illoyaler Ziegenhirt","sich den Freiern andienen","holt Waffen für die Freier","Ziegenfell","behindert","8","187"],
    ["teiresias","Teiresias",[],"anderes Wesen","Seher in der Unterwelt","den Heimweg und seine Bedingungen offenlegen","warnt vor Helios’ Herde","Stab","prüft","2","44"]
  ].map(([id,name,variants,kind,role,goal,action,symbol,status,chapter,pageRef]) =>
    ({id,name,variants,kind,role,goal,action,symbol,status,firstAppearance:{chapter:+chapter,pageRef}}));

  const locations = [
    ["troja","Troja","real","Ausgangspunkt"],["ithaka","Ithaka","real","Ziel und bedrohte Heimat"],
    ["ismaros","Land der Kikonen","uncertain","erste Station nach Troja"],["lotos","Land der Lotophagen","mythic","Ort des Vergessens"],
    ["kyklopen","Kyklopeninsel","mythic","Polyphems Höhle"],["aiolia","Aiolia","mythic","Insel des Windherrschers"],
    ["laistrygonen","Land der Laistrygonen","mythic","Flotte wird vernichtet"],["aia","Aia","mythic","Kirkes Insel"],
    ["unterwelt","Unterwelt","mythic","Befragung des Teiresias"],["sirenen","Sireneninsel","mythic","gefährlicher Gesang"],
    ["meerenge","Skylla und Charybdis","mythic","Wahl zwischen Gefahren"],["thrinakia","Thrinakia","mythic","Herde des Helios"],
    ["ogygia","Ogygia","mythic","Kalypso hält Odysseus fest"],["scheria","Land der Phaiaken","mythic","letzte Hilfe vor Ithaka"],
    ["pylos","Pylos","real","Nestors Hof"],["sparta","Sparta","real","Menelaos und Helena"]
  ].map(([id,name,certainty,note],i)=>({id,name,certainty,note,x:8+(i%8)*12,y:20+Math.floor(i/8)*42}));

  const events = [
    ["troja-end","Troja fällt; die Heimkehr beginnt","odysseus",1,1,"gegenwart"],
    ["polyphem-name","Odysseus nennt Polyphem seinen Namen","odysseus",2,2,"gegenwart"],
    ["wind-open","Gefährten öffnen den Windsack kurz vor Ithaka","odysseus",3,3,"gegenwart"],
    ["underworld","Teiresias warnt vor Helios’ Herde","gods",4,4,"gegenwart"],
    ["cattle","Die Gefährten töten verbotene Rinder","odysseus",5,5,"gegenwart"],
    ["calypso","Odysseus bleibt jahrelang bei Kalypso","odysseus",6,6,"zeitdehnung"],
    ["athena-visit","Athene gibt Telemachos den Reiseauftrag","telemachos",7,7,"parallel"],
    ["search","Telemachos befragt Nestor und Menelaos","telemachos",8,8,"parallel"],
    ["release","Hermes überbringt Kalypso den Freilassungsbefehl","gods",9,9,"parallel"],
    ["phaeacian-retelling","Odysseus erzählt den Phaiaken von der Irrfahrt","odysseus",10,1,"rueckblick"],
    ["reunion","Odysseus und Telemachos erkennen einander","telemachos",11,10,"zusammenlauf"],
    ["scar","Eurykleia erkennt die Narbe","ithaka",12,11,"gegenwart"],
    ["bow","Odysseus besteht die Bogenprobe","ithaka",13,12,"gegenwart"],
    ["bed","Penelope prüft das Geheimnis des Betts","ithaka",14,13,"gegenwart"],
    ["peace","Athene beendet den letzten Konflikt","gods",15,14,"abschluss"]
  ].map(([id,label,thread,chronologyIndex,narrationIndex,narrativeMode])=>({id,label,thread,chronologyIndex,narrationIndex,narrativeMode}));

  const task = (id,type,prompt,answer,options,hints,feedback,objective,difficulty=2,alternatives=[]) =>
    ({id,type,prompt,answer,options,hints,feedback,objective,difficulty,alternatives});

  const stations = [
    {
      id:"troja",title:"Asche über den Mauern",thread:"odysseus",chapter:[1],pageRef:"5–9",symbol:"⚔",
      discover:"Zwischen rauchenden Trümmern liegt ein zerbrochenes Siegel. Es trägt zwei Wege: sofort heimfahren oder erst die Götter versöhnen.",
      read:"Lies den Beginn der Erzählung bis zum Aufbruch der Flotte.",
      reward:"Routenfragment TROJA",
      tasks:[
        task("t1","choice","Warum beginnt die Heimkehr der Achaier unter einem schlechten Zeichen?","Die Götter zürnen wegen der Untaten des Kriegs.",["Die Schiffe sind zu klein.","Die Götter zürnen wegen der Untaten des Kriegs.","Helena verbietet die Abfahrt.","Odysseus kennt den Weg nicht."],["Denke an das Verhalten der Sieger.","Achte auf Zeus und Athene am Kapitelanfang.","Lies PDF-Seiten 5–7."],"Lechner verbindet die schwierige Heimkehr ausdrücklich mit Schuld, Streit und göttlichem Zorn.","Ursachen erklären"),
        task("t2","match","Ordne Fürst und Bezug.",{"Menelaos":"Helena","Agamemnon":"Bruder des Menelaos","Odysseus":"Ithaka"},["Menelaos|Helena","Agamemnon|Bruder des Menelaos","Odysseus|Ithaka"],["Nutze Verwandtschaft und Herrschaftsort.","Eine Zuordnung führt direkt zur Heimat des Titelhelden.","Lies PDF-Seite 5."],"Die Beziehungen eröffnen die politische Welt der Heimkehrer.","Figurenbeziehungen"),
        task("t3","order","Ordne die ersten Stationen.",["Troja","Kikonen","Lotophagen","Kyklopen"],["Troja","Kikonen","Lotophagen","Kyklopen"],["Beginne beim Kriegsschauplatz.","Die Frucht des Vergessens kommt vor der Höhle.","Lies Kapitel 1, PDF-Seiten 5–18."],"Lechner führt von Troja über zwei Zwischenstationen zu Polyphem.","Route sichern")
      ]
    },
    {
      id:"polyphem",title:"Der Name im Fels",thread:"odysseus",chapter:[1],pageRef:"18–29",symbol:"◉",
      discover:"In einer Höhle steht nur ein Wort: NIEMAND. Darunter ist ein echter Name frisch eingeritzt.",
      read:"Untersuche Polyphems Gefangenschaft, Blendung und Fluch.",
      reward:"Indiz NAME",
      tasks:[
        task("p1","text","Mit welchem falschen Namen täuscht Odysseus den Kyklopen?","niemand",[],["Der Name macht die Hilferufe des Kyklopen wirkungslos.","Er klingt wie ein unbestimmtes Pronomen.","Lies PDF-Seiten 23–25."],"«Niemand» verwandelt Sprache in eine Waffe.","List als Handlungsmittel",1,["keiner"]),
        task("p2","multi","Welche zwei Handlungen sichern zunächst die Flucht?",["Polyphem blenden","Sich unter den Widdern verbergen"],["Polyphem blenden","Sich unter den Widdern verbergen","Den Windsack öffnen","Lotos essen"],["Gesucht sind Höhle und Herde.","Eine Handlung nimmt Sicht, die andere nutzt Tiere.","Lies PDF-Seiten 23–27."],"Blendung und Versteck unter den Tieren gehören zusammen.","Ursache-Folge"),
        task("p3","choice","Welche Entscheidung verlängert die Heimkehr entscheidend?","Odysseus ruft Polyphem seinen wirklichen Namen zu.",["Odysseus nimmt Käse mit.","Odysseus ruft Polyphem seinen wirklichen Namen zu.","Die Gefährten lösen die Widder.","Niemand löscht das Feuer."],["Die Flucht ist bereits gelungen.","Stolz macht eine anonyme Tat zurechenbar.","Lies PDF-Seiten 27–29."],"Erst die Selbstenthüllung ermöglicht Polyphems gezielten Ruf an Poseidon.","Folgen einer Entscheidung")
      ]
    },
    {
      id:"wind",title:"Heimat am Horizont",thread:"odysseus",chapter:[2],pageRef:"30–36",symbol:"≈",
      discover:"Ithakas Feuer sind schon sichtbar. Neben dem schlafenden Steuermann bewegt sich ein verschnürter Sack.",
      read:"Lies von Aiolos bis zur Flucht vor den Laistrygonen.",
      reward:"Motiv WINDSACK",
      tasks:[
        task("w1","choice","Warum öffnen die Gefährten den Sack?","Sie vermuten darin verheimlichte Schätze.",["Sie wollen Poseidon opfern.","Sie vermuten darin verheimlichte Schätze.","Aiolos befiehlt es.","Sie suchen Nahrung."],["Misstrauen richtet sich gegen Odysseus.","Die Männer deuten das Geschenk als Beute.","Lies PDF-Seiten 31–33."],"Habgier und Misstrauen zerstören die fast erreichte Heimkehr.","Motive erkennen"),
        task("w2","order","Ordne Ursache und Folgen.",["Odysseus schläft ein","Der Sack wird geöffnet","Die Winde brechen los","Die Schiffe werden zurückgetrieben"],["Odysseus schläft ein","Der Sack wird geöffnet","Die Winde brechen los","Die Schiffe werden zurückgetrieben"],["Beginne mit dem Verlust der Kontrolle.","Auf das Öffnen folgt unmittelbar Naturgewalt.","Lies PDF-Seiten 31–33."],"Die Kette zeigt, wie eine kleine Handlung eine grosse Umkehr auslöst.","Ursache-Folge"),
        task("w3","choice","Was unterscheidet die Verluste bei den Laistrygonen vom Polyphem-Abenteuer?","Fast die ganze Flotte wird auf einmal vernichtet.",["Odysseus verliert dort erstmals Männer.","Fast die ganze Flotte wird auf einmal vernichtet.","Ein Gott rettet alle Schiffe.","Niemand entkommt."],["Vergleiche den Umfang, nicht die Art der Gefahr.","Nur Odysseus’ eigenes Schiff liegt günstig.","Lies PDF-Seiten 33–36."],"Nach dem Angriff bleibt nur Odysseus’ Schiff übrig.","Handlungsfolgen vergleichen")
      ]
    },
    {
      id:"kirke",title:"Das Haus der Verwandlung",thread:"gods",chapter:[2],pageRef:"35–57",symbol:"✦",
      discover:"Ein Becher, ein Kraut und ein Schattenweg bilden ein Dreieck. Nur in der richtigen Beziehung öffnet es sich.",
      read:"Ermittle Kirkes Wandel von der Gegnerin zur Ratgeberin und den Auftrag der Unterwelt.",
      reward:"Figurenkarte KIRKE",
      tasks:[
        task("k1","match","Ordne Macht und Wirkung.",{"Kirke":"Zaubertrank","Hermes":"Moly","Teiresias":"Warnung"},["Kirke|Zaubertrank","Hermes|Moly","Teiresias|Warnung"],["Eine Figur verwandelt, eine schützt, eine weiss Zukünftiges.","Hermes gibt Odysseus ein Gegenmittel.","Lies PDF-Seiten 37–48."],"Die drei Figuren bilden eine Kette aus Gefahr, Hilfe und Orientierung.","Göttereingriffe unterscheiden"),
        task("k2","choice","Warum fährt Odysseus in die Unterwelt?","Er muss Teiresias nach dem Heimweg befragen.",["Er sucht Polyphem.","Er muss Teiresias nach dem Heimweg befragen.","Er will Kalypso besuchen.","Er holt den Windsack."],["Kirke nennt ihm einen notwendigen Ratgeber.","Der Ratgeber ist ein toter Seher.","Lies PDF-Seiten 42–44."],"Die Fahrt ist kein Selbstzweck, sondern eine Wissenssuche.","Handlungsmotiv"),
        task("k3","multi","Welche Bedingungen der Heimkehr nennt die Weissagung?",["Helios’ Herde schonen","Mit Poseidons Widerstand rechnen"],["Helios’ Herde schonen","Mit Poseidons Widerstand rechnen","Polyphem zurückholen","In Sparta König werden"],["Eine Warnung betrifft Tiere, die andere einen Gott.","Poseidons Zorn ist bereits ausgelöst.","Lies PDF-Seiten 44–48."],"Die Heimkehr bleibt möglich, ist aber an Verhalten und Widerstand gebunden.","Prophezeiung anwenden")
      ]
    },
    {
      id:"meerenge",title:"Stimmen und Strudel",thread:"odysseus",chapter:[3],pageRef:"58–67",symbol:"≋",
      discover:"Wachs, Taue und sechs leere Plätze liegen auf einer Seekarte.",
      read:"Vergleiche Odysseus’ Umgang mit Sirenen sowie Skylla und Charybdis.",
      reward:"Zeitmarke PRÜFUNGEN",
      tasks:[
        task("m1","match","Ordne Schutzmassnahme und Gefahr.",{"Wachs in den Ohren":"Sirenen","Am Mast festbinden":"Odysseus hört gefahrlos","Nähe zu Skylla wählen":"Charybdis meiden"},["Wachs in den Ohren|Sirenen","Am Mast festbinden|Odysseus hört gefahrlos","Nähe zu Skylla wählen|Charybdis meiden"],["Zwei Massnahmen gehören zum Gesang.","Kirke empfiehlt bei der Meerenge das kleinere Übel.","Lies PDF-Seiten 58–65."],"Voraussicht schützt bei den Sirenen; in der Meerenge bleibt nur eine Verlustwahl.","Strategien vergleichen"),
        task("m2","choice","Warum verschweigt Odysseus den Gefährten Skylla?","Er fürchtet, sie würden aus Angst nicht mehr rudern.",["Er hat Kirke nicht verstanden.","Er fürchtet, sie würden aus Angst nicht mehr rudern.","Skylla ist unsichtbar.","Er will sie überraschen."],["Denke an Führungswissen und Handlungsfähigkeit.","Eine Panikreaktion hätte alle gefährdet.","Lies PDF-Seiten 61–65."],"Odysseus entscheidet paternalistisch: Er erhält Handlungsfähigkeit, nimmt den Männern aber Wissen.","Entscheidungen beurteilen"),
        task("m3","multi","Welche Aussagen sind richtig?",["Odysseus darf den Sirenengesang hören.","Skylla reisst sechs Männer fort."],["Odysseus darf den Sirenengesang hören.","Alle Gefährten hören den Gesang.","Skylla reisst sechs Männer fort.","Charybdis hilft dem Schiff."],["Die Mannschaft und ihr Anführer erhalten verschiedene Schutzmassnahmen.","Achte auf die Zahl der Köpfe und Opfer.","Lies PDF-Seiten 58–66."],"Odysseus hört gebunden zu; Skyllas Angriff kostet sechs Gefährten.","Details sichern",1)
      ]
    },
    {
      id:"helios",title:"Die verbotene Herde",thread:"gods",chapter:[3],pageRef:"67–83",symbol:"☀",
      discover:"Ein schwarzes Segel liegt neben einem goldenen Rinderhorn. Nur einer erreicht die Insel ohne Zeit.",
      read:"Verfolge Warnung, Hungerentscheidung, Strafe und Kalyspos Angebot.",
      reward:"Indiz VERBOT",
      tasks:[
        task("h1","order","Ordne die Katastrophe.",["Sturm hält die Mannschaft fest","Vorräte gehen aus","Gefährten schlachten Helios’ Rinder","Zeus zerstört das Schiff"],["Sturm hält die Mannschaft fest","Vorräte gehen aus","Gefährten schlachten Helios’ Rinder","Zeus zerstört das Schiff"],["Hunger entsteht vor dem Frevel.","Helios fordert nach dem Frevel Vergeltung.","Lies PDF-Seiten 67–73."],"Not erklärt die Entscheidung, hebt das bekannte Verbot aber nicht auf.","Chronologie"),
        task("h2","choice","Wer überlebt den Untergang des letzten Schiffs?","Odysseus",["Eurylochos","Odysseus","Alle Gefährten","Kirke"],["Der Anführer hatte nicht mitgegessen.","Er erreicht danach Kalypso allein.","Lies PDF-Seiten 71–75."],"Odysseus verliert nun auch seine letzten Gefährten.","Folgen sichern"),
        task("h3","choice","Warum bleibt Odysseus nicht freiwillig für immer bei Kalypso?","Er sehnt sich trotz ihres Angebots nach Ithaka und Penelope.",["Er kennt ihren Namen nicht.","Er sehnt sich trotz ihres Angebots nach Ithaka und Penelope.","Sie besitzt kein Schiff.","Poseidon befiehlt die Abreise."],["Unsterblichkeit ersetzt ihm die Heimat nicht.","Achte auf seine Blicke aufs Meer und seine Familie.","Lies PDF-Seiten 75–82."],"Die Heimkehr ist für ihn stärker als Komfort oder Unsterblichkeit.","Figurenmotiv")
      ]
    },
    {
      id:"ithaka",title:"Der Palast ohne König",thread:"ithaka",chapter:[4],pageRef:"84–102",symbol:"⌂",
      discover:"Drei Fäden laufen im Palast auseinander: eine wartende Königin, ein unsicherer Sohn und Gäste, die sich wie Herren benehmen.",
      read:"Untersuche die Lage auf Ithaka und Athenes Auftrag an Telemachos.",
      reward:"Strangfragment ITHAKA",
      tasks:[
        task("i1","multi","Welche Probleme bedrohen Odysseus’ Haus?",["Die Freier verbrauchen den Besitz.","Telemachos’ Stellung ist gefährdet."],["Die Freier verbrauchen den Besitz.","Telemachos’ Stellung ist gefährdet.","Nestor belagert Ithaka.","Penelope hat Odysseus vergessen."],["Suche wirtschaftliche und politische Bedrohung.","Die Freier wollen mehr als bewirtet werden.","Lies PDF-Seiten 84–94."],"Die Besetzung des Palasts schwächt Besitz, Herrschaft und Familie.","Konfliktlage"),
        task("i2","choice","In welcher Gestalt ermutigt Athene Telemachos zunächst?","Als vertrauter Gast und Ratgeber.",["Als Polyphem.","Als vertrauter Gast und Ratgeber.","Als Kalypso.","Als Freier."],["Athene verbirgt ihre göttliche Identität.","Die Gestalt erlaubt ein persönliches Gespräch.","Lies PDF-Seiten 84–89."],"Athene stärkt Telemachos, ohne offen als Göttin aufzutreten.","Göttereingriff"),
        task("i3","order","Ordne Telemachos’ neue Schritte.",["Athene spricht ihm Mut zu","Er tritt den Freiern entgegen","Er beruft eine Versammlung ein","Er plant die Reise"],["Athene spricht ihm Mut zu","Er tritt den Freiern entgegen","Er beruft eine Versammlung ein","Er plant die Reise"],["Der Impuls kommt von aussen, danach handelt er selbst.","Die öffentliche Bewährung kommt vor der Abfahrt.","Lies Kapitel 4."],"Telemachos entwickelt sich vom Beobachter zum Handelnden.","Figurenentwicklung")
      ]
    },
    {
      id:"suche",title:"Nachrichten über das Meer",thread:"telemachos",chapter:[5],pageRef:"103–127",symbol:"✧",
      discover:"Zwei Gastgeber besitzen verschiedene Teile derselben Nachricht. Hinter Telemachos schliesst sich bereits eine Falle.",
      read:"Vergleiche Nestors und Menelaos’ Wissen und den Plan der Freier.",
      reward:"Figurenkarten NESTOR & MENELAOS",
      tasks:[
        task("s1","match","Ordne Gastgeber und Auskunft.",{"Nestor":"berichtet von der Trennung der Heimkehrer","Menelaos":"kennt Proteus’ Nachricht über Kalypso","Helena":"erkennt Telemachos’ Ähnlichkeit"},["Nestor|berichtet von der Trennung der Heimkehrer","Menelaos|kennt Proteus’ Nachricht über Kalypso","Helena|erkennt Telemachos’ Ähnlichkeit"],["Pylos bietet Rat, Sparta konkretere Nachricht.","Eine Auskunft stammt mittelbar vom Meeresgott Proteus.","Lies PDF-Seiten 103–118."],"Telemachos fügt Teilwissen aus mehreren Begegnungen zusammen.","Informationsquellen verbinden"),
        task("s2","choice","Was erfährt Telemachos Entscheidendes?","Odysseus lebt, wird aber auf einer Insel festgehalten.",["Odysseus fiel in Troja.","Odysseus lebt, wird aber auf einer Insel festgehalten.","Odysseus herrscht in Pylos.","Odysseus ist ein Freier."],["Menelaos besitzt eine Nachricht aus der Fremde.","Die Insel gehört Kalypso.","Lies PDF-Seiten 114–118."],"Aus ungewisser Hoffnung wird eine konkrete Spur.","Information bewerten"),
        task("s3","choice","Was planen die Freier während Telemachos’ Reise?","Einen Hinterhalt auf seiner Rückfahrt.",["Eine Reise zu Kalypso.","Einen Hinterhalt auf seiner Rückfahrt.","Die Räumung des Palasts.","Ein Fest für Nestor."],["Die Gefahr liegt zwischen Festland und Ithaka.","Sie wollen den Erben ausschalten.","Lies PDF-Seiten 121–125."],"Der Suchstrang und der Ithaka-Strang laufen gleichzeitig unter Zeitdruck.","Parallelhandlung")
      ]
    },
    {
      id:"phaiaken",title:"Der Fremde ohne Geschichte",thread:"odysseus",chapter:[6],pageRef:"128–154",symbol:"◇",
      discover:"Ein Floss zerbricht. Am Strand muss ein namenloser Mann entscheiden, wem er seine Geschichte anvertraut.",
      read:"Lies von Kalyspos Freilassung bis zur Aufnahme bei den Phaiaken.",
      reward:"Routenfragment SCHERIA",
      tasks:[
        task("f1","match","Ordne Eingriff und Wirkung.",{"Hermes":"Kalypso muss Odysseus ziehen lassen","Poseidon":"zerstört das Floss","Leukothea":"gibt einen rettenden Schleier","Athene":"ebnet die Landung"},["Hermes|Kalypso muss Odysseus ziehen lassen","Poseidon|zerstört das Floss","Leukothea|gibt einen rettenden Schleier","Athene|ebnet die Landung"],["Zwei Mächte helfen auf See, eine bekämpft ihn.","Hermes wirkt schon vor der Abfahrt.","Lies PDF-Seiten 128–133."],"Die Heimkehr entsteht aus gegensätzlichen göttlichen Eingriffen und Odysseus’ Ausdauer.","Götterrollen"),
        task("f2","choice","Warum geht Nausikaa nicht gemeinsam mit Odysseus durch die Stadt?","Sie will Gerede und falsche Deutungen vermeiden.",["Sie fürchtet seine Waffen.","Sie will Gerede und falsche Deutungen vermeiden.","Sie kennt den Palast nicht.","Alkinoos verbietet Hilfe."],["Es geht um ihren Ruf.","Sie gibt ihm dennoch genaue Anweisungen.","Lies PDF-Seiten 136–139."],"Nausikaa verbindet Hilfsbereitschaft mit sozialer Vorsicht.","Figureninteresse"),
        task("f3","timeline","Welche Aussage trennt Erzählordnung und Zeitordnung korrekt?","Bei den Phaiaken erzählt Odysseus frühere Abenteuer rückblickend.",["Die Phaiaken-Episode geschieht vor Troja.","Bei den Phaiaken erzählt Odysseus frühere Abenteuer rückblickend.","Telemachos erzählt Polyphems Geschichte.","Lechner erwähnt die Irrfahrt erstmals hier."],["Das Erzählen geschieht später als das Erzählte.","Lechner hat die Abenteuer in Kapitel 1–3 bereits dargestellt.","Lies PDF-Seiten 143–154 und vergleiche Kapitel 1–3."],"Die Irrfahrt ist vergangen, wird aber in der Phaiaken-Gegenwart nochmals berichtet.","Erzählordnung verstehen",3)
      ]
    },
    {
      id:"eumaios",title:"Zwei Wege, eine Hütte",thread:"telemachos",chapter:[7],pageRef:"155–178",symbol:"Y",
      discover:"Auf einer Karte nähern sich zwei Linien derselben Hütte. Eine gehört einem Greis, der keiner ist.",
      read:"Verfolge Odysseus’ Verkleidung, Telemachos’ Rückkehr und die Wiederbegegnung.",
      reward:"Indiz ZUSAMMENLAUF",
      tasks:[
        task("e1","choice","Warum verkleidet Athene Odysseus als alten Bettler?","Damit er die Lage und Loyalitäten unerkannt prüfen kann.",["Damit Penelope ihn nie erkennt.","Damit er die Lage und Loyalitäten unerkannt prüfen kann.","Damit Poseidon ihn zum König macht.","Damit er nach Sparta reisen kann."],["Die Verkleidung ist strategisch und vorläufig.","Unerkannt sammelt er Wissen im eigenen Land.","Lies PDF-Seiten 155–160."],"Verborgene Identität wird zum Werkzeug der Rückeroberung.","Strategie erklären"),
        task("e2","multi","Wer gehört in Kapitel 7 zum loyalen Bündnis?",["Odysseus","Telemachos","Eumaios","Athene"],["Odysseus","Telemachos","Eumaios","Athene","Antinoos","Melanthios"],["Vier Figuren schützen oder planen die Heimkehr.","Die beiden letzten Namen dienen den Freiern.","Lies PDF-Seiten 158–178."],"Familie, loyaler Diener und Göttin bilden das Gegenlager.","Beziehungsnetz"),
        task("e3","order","Ordne den Zusammenlauf.",["Telemachos entgeht dem Hinterhalt","Er erreicht Eumaios’ Hütte","Athene gibt Odysseus zeitweise sein Aussehen zurück","Vater und Sohn planen gemeinsam"],["Telemachos entgeht dem Hinterhalt","Er erreicht Eumaios’ Hütte","Athene gibt Odysseus zeitweise sein Aussehen zurück","Vater und Sohn planen gemeinsam"],["Zuerst endet die Gefahr auf See.","Die Erkennung braucht eine sichtbare Verwandlung.","Lies PDF-Seiten 169–178."],"Hier verbinden sich die zuvor getrennten Handlungsstränge.","Stränge verbinden")
      ]
    },
    {
      id:"bettler",title:"Vor der eigenen Tür",thread:"ithaka",chapter:[8],pageRef:"179–194",symbol:"⌁",
      discover:"Ein alter Hund hebt den Kopf. Menschen sehen einen Bettler; das Tier erkennt seinen Herrn.",
      read:"Beobachte, wie Odysseus im Palast Loyalität und Charakter prüft.",
      reward:"Figurenkarte ARGOS",
      tasks:[
        task("b1","choice","Wer erkennt Odysseus trotz der Verkleidung unmittelbar?","Der Hund Argos.",["Antinoos.","Der Hund Argos.","Eurymachos.","Melanthios."],["Kein Mensch ist gesucht.","Die lange Treue endet kurz nach dem Wiedersehen.","Lies PDF-Seiten 183–185."],"Argos’ Erkennen ist still und emotional, ohne Odysseus’ Plan zu gefährden.","Wiedererkennung"),
        task("b2","match","Ordne Figur und Verhalten gegenüber dem Bettler.",{"Eumaios":"schützt und begleitet","Antinoos":"beleidigt und wirft nach ihm","Melanthios":"verhöhnt ihn"},["Eumaios|schützt und begleitet","Antinoos|beleidigt und wirft nach ihm","Melanthios|verhöhnt ihn"],["Eine Figur ist loyal, zwei zeigen Illoyalität.","Der Wortführer der Freier wird auch körperlich gewalttätig.","Lies PDF-Seiten 179–191."],"Der Bettlerstatus macht verborgene Haltungen sichtbar.","Figuren charakterisieren"),
        task("b3","multi","Was gewinnt Odysseus durch das Verbergen seiner Identität?",["Wissen über Loyalitäten","Überraschungsvorteil"],["Wissen über Loyalitäten","Überraschungsvorteil","Sofortige Anerkennung als König","Poseidons Freundschaft"],["Gesucht sind strategische Vorteile.","Offene Anerkennung kommt erst später.","Lies Kapitel 8."],"Die Verkleidung verzögert Anerkennung, schafft aber Wissen und Kontrolle.","Strategie bewerten")
      ]
    },
    {
      id:"narbe",title:"Wasser über einer alten Narbe",thread:"ithaka",chapter:[9],pageRef:"195–209",symbol:"∿",
      discover:"Beim Waschen hält eine Hand inne. Ein Geheimnis ist erkannt, aber noch nicht öffentlich.",
      read:"Untersuche Penelopes Gespräch mit dem Fremden und Eurykleias Entdeckung.",
      reward:"Indiz NARBE",
      tasks:[
        task("n1","choice","Woran erkennt Eurykleia Odysseus?","An einer alten Narbe am Bein.",["An seinem Bogen.","An einer alten Narbe am Bein.","An seinem Siegelring.","An seiner Stimme allein."],["Die Erkenntnis geschieht beim Waschen.","Das Zeichen stammt von einer früheren Jagd.","Lies PDF-Seiten 200–203."],"Der Körper verrät die Identität, obwohl Gesicht und Kleidung täuschen.","Erkennungszeichen",1),
        task("n2","choice","Warum muss Eurykleia schweigen?","Eine frühe Enthüllung würde den Plan gegen die Freier gefährden.",["Penelope kennt sie nicht.","Eine frühe Enthüllung würde den Plan gegen die Freier gefährden.","Sie glaubt sich geirrt zu haben.","Athene nimmt ihr die Sprache."],["Erkennen und öffentliches Enthüllen sind getrennt.","Die Freier sind zahlenmässig überlegen.","Lies PDF-Seiten 201–204."],"Odysseus gewinnt seine Identität stufenweise und kontrolliert zurück.","Plan verstehen"),
        task("n3","multi","Welche zwei Prüfungen bereiten die Entscheidung vor?",["Penelope befragt den Fremden genau.","Die Waffen werden aus dem Saal entfernt."],["Penelope befragt den Fremden genau.","Die Waffen werden aus dem Saal entfernt.","Antinoos erhält Odysseus’ Bogen.","Kalypso kommt nach Ithaka."],["Eine Prüfung ist sprachlich, eine Vorbereitung praktisch.","Telemachos hilft bei den Waffen.","Lies PDF-Seiten 195–209."],"Gespräch, Geheimhaltung und Entwaffnung verdichten den Plan.","Vorbereitung erkennen")
      ]
    },
    {
      id:"bogen",title:"Die Sehne entscheidet",thread:"ithaka",chapter:[10],pageRef:"210–225",symbol:"➶",
      discover:"Ein Bogen liegt vor einer Reihe von Beilen. Kraft allein reicht nicht: Das Zeichen gehört nur seinem Besitzer.",
      read:"Lies Bogenprobe, Enthüllung und Kampf.",
      reward:"Motiv BOGEN",
      tasks:[
        task("g1","order","Ordne die Enthüllung.",["Die Freier scheitern am Bogen","Odysseus erhält den Bogen","Der Pfeil fliegt durch die Beile","Odysseus gibt sich zu erkennen"],["Die Freier scheitern am Bogen","Odysseus erhält den Bogen","Der Pfeil fliegt durch die Beile","Odysseus gibt sich zu erkennen"],["Der Beweis der Fähigkeit kommt vor der Namensenthüllung.","Zuerst zeigt sich das Versagen der Konkurrenten.","Lies PDF-Seiten 210–216."],"Bogen und Schuss machen den Bettler glaubhaft zum Hausherrn.","Spannungsfolge"),
        task("g2","multi","Wer kämpft auf Odysseus’ Seite?",["Telemachos","Eumaios","Philoitios"],["Telemachos","Eumaios","Philoitios","Antinoos","Melanthios"],["Sohn und zwei loyale Hirten.","Der Ziegenhirt hilft den Freiern.","Lies PDF-Seiten 216–224."],"Das Bündnis bestätigt die zuvor geprüften Loyalitäten.","Beziehungsnetz"),
        task("g3","choice","Warum scheitert Eurymachos’ Verhandlungsversuch?","Odysseus macht die Freier gemeinsam für den Missbrauch seines Hauses verantwortlich.",["Odysseus erkennt ihn nicht.","Odysseus macht die Freier gemeinsam für den Missbrauch seines Hauses verantwortlich.","Penelope verbietet das Gespräch.","Der Bogen zerbricht."],["Eurymachos versucht, Schuld auf Antinoos zu schieben.","Odysseus akzeptiert diese Einzelerklärung nicht.","Lies PDF-Seiten 217–220."],"Die Verantwortung lässt sich nach jahrelangem Mitmachen nicht auf einen Toten begrenzen.","Verantwortung beurteilen",3)
      ]
    },
    {
      id:"bett",title:"Das unbewegliche Geheimnis",thread:"gods",chapter:[11],pageRef:"226–242",symbol:"♜",
      discover:"Der letzte Schlüssel ist kein Name und keine Waffe, sondern etwas, das sich nicht verschieben lässt.",
      read:"Ermittle Penelopes letzte Prüfung, Laertes’ Erkennung und Athenes Friedensschluss.",
      reward:"Schlussfragment OLIVENBAUM",
      tasks:[
        task("l1","text","Welcher Baum bildet den unverrückbaren Kern des Ehebetts?","olivenbaum",[],["Das Bett wurde um einen lebenden Stamm gebaut.","Der Baum liefert auch Öl.","Lies PDF-Seiten 226–230."],"Nur Odysseus kennt die Konstruktion um den Olivenbaum; seine Empörung beweist Penelope seine Identität.","Schlussprüfung",2,["olive","olivenstamm"]),
        task("l2","match","Ordne Wiedererkennung und Beweis.",{"Eurykleia":"Narbe","Penelope":"Geheimnis des Betts","Laertes":"gemeinsame Erinnerungen und Bäume"},["Eurykleia|Narbe","Penelope|Geheimnis des Betts","Laertes|gemeinsame Erinnerungen und Bäume"],["Jede Figur braucht ein anderes persönliches Zeichen.","Penelopes Beweis ist Wissen über ein gemeinsames Werk.","Lies PDF-Seiten 226–235."],"Identität wird nicht durch Aussehen allein, sondern durch geteilte Geschichte bestätigt.","Beweise vergleichen"),
        task("l3","choice","Wie endet der erneute Konflikt mit den Angehörigen der Freier?","Athene greift ein und stiftet Frieden.",["Odysseus verlässt Ithaka.","Athene greift ein und stiftet Frieden.","Poseidon zerstört den Palast.","Telemachos wird verbannt."],["Die Ordnung endet nicht mit dem Kampf im Saal.","Eine Göttin stoppt die Vergeltungsspirale.","Lies PDF-Seiten 238–242."],"Die wiederhergestellte Ordnung braucht zuletzt einen göttlich gestützten Friedensschluss.","Ende erklären")
      ]
    }
  ];

  const additionalStations = {
    troja:{
      id:"lotos",title:"Die Frucht des Vergessens",thread:"odysseus",chapter:[1],pageRef:"12–15",symbol:"❧",
      discover:"Drei Kundschafter kehren nicht zum Schiff zurück. Ihre Erinnerung an Auftrag, Gefährten und Heimat löst sich auf.",
      read:"Lies die Episode bei den Lotophagen und achte darauf, was die Frucht mit dem Willen der Männer macht.",
      reward:"Motiv ERINNERUNG",
      tasks:[
        task("lo1","text","Erkläre mit eigenen Worten, weshalb die Lotosfrucht für die Heimkehr gefährlicher ist als gewöhnliche Nahrung.","Die Frucht lässt die Männer Heimat und Rückkehr vergessen.",[],["Die Gefahr wirkt im Inneren der Männer.","Frage dich, welcher Wunsch nach dem Essen verschwindet.","Lies Kapitel 1, PDF-Seiten 12–13."],"Die Frucht löscht nicht den Körper, sondern das Ziel der Reise aus.","Symbolische Gefahr"),
        task("lo2","text","Verfasse einen kurzen inneren Monolog eines Gefährten vor und nach dem Genuss der Frucht.",["Auftrag und Heimkehr vor dem Essen","Vergessen und Bleibenwollen nach dem Essen"],[],["Baue einen deutlichen Vorher-nachher-Gegensatz ein.","Vorher denkt der Mann an Schiff oder Heimat, danach nur noch ans Bleiben.","Lies PDF-Seiten 12–14."],"Der Perspektivwechsel macht den Verlust von Erinnerung und Willen sichtbar.","Perspektivübernahme",2),
        task("lo3","order","Rekonstruiere Odysseus’ Rettungsaktion.",["Kundschafter bleiben aus","Odysseus sucht sie","Er erkennt die Wirkung des Lotos","Die Männer werden mit Gewalt zu den Schiffen gebracht"],["Kundschafter bleiben aus","Odysseus sucht sie","Er erkennt die Wirkung des Lotos","Die Männer werden mit Gewalt zu den Schiffen gebracht"],["Beginne mit dem gebrochenen Auftrag.","Die Rückkehr aufs Schiff geschieht nicht freiwillig.","Lies PDF-Seiten 12–14."],"Odysseus schützt die Heimkehr hier gegen den veränderten Willen seiner eigenen Männer.","Handlungsfolge")
      ]
    },
    polyphem:{
      id:"fluch",title:"Der Ruf an das Meer",thread:"gods",chapter:[1],pageRef:"27–29",symbol:"♆",
      discover:"Das Schiff ist entkommen, doch über dem Wasser liegt ein Gebet, das den wahren Namen seines Ziels kennt.",
      read:"Untersuche Odysseus’ Zuruf und Polyphems Bitte an Poseidon.",
      reward:"Indiz POSEIDONS FLUCH",
      tasks:[
        task("pf1","text","Formuliere die Ursache-Folge-Kette von Odysseus’ Stolz bis zu Poseidons Rache.","Odysseus nennt seinen Namen, Polyphem kann ihn identifizieren und bittet Poseidon um Rache.",[],["Drei Glieder sind nötig: Name, Gebet, Rache.","Ohne den echten Namen könnte der Fluch sein Ziel nicht genau benennen.","Lies PDF-Seiten 27–29."],"Die Selbstenthüllung verwandelt einen gelungenen Fluchtplan in den Ausgangspunkt weiterer Leiden.","Ursache und Folge",3),
        task("pf2","text","Beurteile Odysseus’ Zuruf aus der Sicht eines geretteten Gefährten.","Der Gefährte kritisiert den unnötigen Stolz und die neue Gefahr.",[],["Schreibe aus der Perspektive eines Menschen im schwankenden Schiff.","Die Gefährten versuchen Odysseus vom weiteren Rufen abzuhalten.","Lies PDF-Seiten 27–28."],"Aus Sicht der Mannschaft gefährdet Odysseus nachträglich einen gemeinsam errungenen Erfolg.","Perspektivurteil"),
        task("pf3","text","Erkläre, weshalb Poseidons Eingreifen Rache und nicht bloss schlechtes Wetter ist.","Polyphem ist Poseidons Sohn und bittet den Vater gezielt um Vergeltung an Odysseus.",[],["Nenne die Beziehung zwischen Gott und Kyklop.","Der Sturm bekommt durch das Gebet ein persönliches Ziel.","Lies PDF-Seiten 28–29."],"Lechner bindet die Naturgewalt des Meeres an eine familiär begründete Vergeltung.","Göttermotiv")
      ]
    },
    wind:{
      id:"steinhafen",title:"Der Hafen aus Stein",thread:"odysseus",chapter:[2],pageRef:"33–36",symbol:"⬟",
      discover:"Elf Schiffe liegen tief in einer engen Bucht. Nur eines bleibt draussen – eine scheinbar kleine Entscheidung über den Ankerplatz.",
      read:"Lies die Laistrygonen-Episode und verfolge, weshalb nur ein Schiff entkommt.",
      reward:"Routenfragment LAISTRYGONEN",
      tasks:[
        task("la1","text","Erkläre, wie die Form des Hafens zur Falle für Odysseus’ Flotte wird.","Die enge Bucht schliesst die Schiffe ein und die Laistrygonen zerstören sie von den Felsen aus.",[],["Verbinde Gelände und Angriff.","Die Schiffe können in der engen Einfahrt nicht rasch ausweichen.","Lies PDF-Seiten 33–36."],"Der Ort selbst verstärkt den Angriff und macht die Flotte bewegungsunfähig.","Raumwirkung"),
        task("la2","text","Warum entkommt ausgerechnet Odysseus’ eigenes Schiff?","Odysseus lässt sein Schiff ausserhalb der engen Bucht ankern und kann die Taue rechtzeitig kappen.",[],["Achte auf den unterschiedlichen Ankerplatz.","Die Rettung beginnt vor dem Angriff mit einer vorsichtigen Entscheidung.","Lies PDF-Seiten 33–36."],"Vorsicht beim Ankern entscheidet später über das Überleben.","Voraussicht"),
        task("la3","text","Verfasse einen knappen Unglücksbericht: Was verliert Odysseus hier, und wie verändert dies die weitere Reise?","Er verliert alle übrigen Schiffe und einen grossen Teil der Gefährten; die Reise geht mit nur einem Schiff weiter.",[],["Nenne Umfang und Folge des Verlusts.","Vergleiche die Flotte vor und nach dem Hafen.","Lies PDF-Seite 36."],"Nach den Laistrygonen ist aus einer Flotte ein einzelnes, verletzliches Schiff geworden.","Folgen zusammenfassen")
      ]
    },
    kirke:{
      id:"totenstimmen",title:"Stimmen ohne Atem",thread:"gods",chapter:[2],pageRef:"43–57",symbol:"☾",
      discover:"Am Rand der Welt wartet kein Gegner, sondern Wissen. Doch die Toten dürfen erst sprechen, wenn Odysseus ein genaues Ritual vollzieht.",
      read:"Lies die Fahrt zu den Kimmeriern, das Opfer und die Begegnungen in der Unterwelt.",
      reward:"Zeitmarke UNTERWELT",
      tasks:[
        task("u1","order","Ordne den Zugang zum Wissen der Toten.",["Odysseus erreicht das Land der Kimmerier","Er gräbt die Opfergrube","Das Blut zieht die Schatten an","Teiresias darf sprechen"],["Odysseus erreicht das Land der Kimmerier","Er gräbt die Opfergrube","Das Blut zieht die Schatten an","Teiresias darf sprechen"],["Ort, Ritual, Schatten, Auskunft.","Odysseus kontrolliert zunächst, wer vom Opfer trinken darf.","Lies PDF-Seiten 43–46."],"Die Weissagung wird durch ein genau vorbereitetes Grenzritual zugänglich.","Ritual rekonstruieren"),
        task("u2","text","Welche Nachricht aus Ithaka macht die Begegnung mit Odysseus’ Mutter besonders schmerzhaft?","Sie berichtet von Penelopes und Telemachos’ Warten sowie Laertes’ Trauer und ist aus Sehnsucht nach Odysseus gestorben.",[],["Verbinde Familie, Abwesenheit und Tod.","Odysseus erfährt, was seine lange Abwesenheit zu Hause bewirkt.","Lies PDF-Seiten 48–51."],"Die Unterwelt zeigt erstmals sehr persönlich die Kosten der Abwesenheit auf Ithaka.","Familienfolgen"),
        task("u3","text","Vergleiche das Wissen des Teiresias mit dem Wissen der Gefährten: Warum entsteht daraus später eine besondere Verantwortung für Odysseus?","Odysseus kennt die Warnung vor Helios’ Herde und muss sie der Mannschaft vermitteln und durchsetzen.",[],["Wissen schafft eine Führungsaufgabe.","Die spätere Katastrophe wurde hier bereits angekündigt.","Lies PDF-Seiten 45–48 und 67–71."],"Wer die Warnung kennt, trägt besondere Verantwortung für spätere Entscheidungen.","Wissen und Verantwortung",3)
      ]
    },
    meerenge:{
      id:"sechs",title:"Sechs leere Plätze",thread:"odysseus",chapter:[3],pageRef:"64–67",symbol:"Ⅵ",
      discover:"Nach der Meerenge stehen sechs Ruder still. Die Mannschaft hat den Strudel vermieden, aber einen Preis bezahlt.",
      read:"Konzentriere dich auf Kirkes Rat, Odysseus’ Entscheidung und Skyllas Angriff.",
      reward:"Indiz KLEINERES ÜBEL",
      tasks:[
        task("sk1","text","Erkläre das Dilemma zwischen Skylla und Charybdis, ohne die beiden Gefahren nur zu beschreiben.","Bei Charybdis droht der Untergang des ganzen Schiffs, bei Skylla sicher der Verlust von sechs Männern.",[],["Ein Dilemma zwingt zur Wahl zwischen zwei Schäden.","Vergleiche Teilverlust und Totalverlust.","Lies PDF-Seiten 59–65."],"Die Entscheidung ist tragisch, weil keine gefahrlose Lösung existiert.","Dilemma erklären"),
        task("sk2","text","Schreibe eine Anklage eines Gefährten und eine Verteidigung Odysseus’ zu seinem Verschweigen der Gefahr.","Anklage: Er entzieht Wissen; Verteidigung: Er verhindert Panik und erhält die Ruderkraft.",[],["Beide Seiten müssen dasselbe Handeln verschieden bewerten.","Nutze Wissen, Angst und Handlungsfähigkeit.","Lies PDF-Seiten 61–66."],"Die Gegenreden zeigen die moralische Spannung zwischen Führung und Selbstbestimmung.","Multiperspektivität",3),
        task("sk3","text","Warum kann Odysseus Skylla nicht mit persönlichem Mut oder Waffen besiegen?","Kirke erklärt, dass Skylla einer menschlichen Abwehr nicht zugänglich ist und ein Kampf nur weitere Opfer riskieren würde.",[],["Nicht jede Gefahr ist eine Heldenprobe.","Achte auf Kirkes Antwort auf Odysseus’ Kampfplan.","Lies PDF-Seiten 60–62."],"Lechner begrenzt hier bewusst die Wirksamkeit heroischer Kampfkraft.","Grenzen des Helden")
      ]
    },
    helios:{
      id:"inselzeit",title:"Die Insel ohne Zeit",thread:"odysseus",chapter:[3,6],pageRef:"75–83, 128–130",symbol:"∞",
      discover:"Sieben Jahre lang sieht Odysseus aufs Meer. Kalypso bietet Unsterblichkeit, doch die Zeit ohne Heimkehr bleibt Gefangenschaft.",
      read:"Vergleiche Odysseus’ Leben bei Kalypso mit dem göttlichen Beschluss seiner Freilassung.",
      reward:"Figurenkarte KALYPSO",
      tasks:[
        task("ka1","text","Erkläre den Widerspruch: Kalyspos Insel bietet Sicherheit und Unsterblichkeit und ist für Odysseus trotzdem kein glückliches Ziel.","Odysseus sehnt sich nach Ithaka, Penelope und seinem menschlichen Leben; Kalypso hält ihn gegen seinen Heimkehrwunsch fest.",[],["Komfort und Freiheit sind nicht dasselbe.","Stelle Unsterblichkeit der Zugehörigkeit zur Heimat gegenüber.","Lies PDF-Seiten 75–82."],"Odysseus entscheidet sich für Bindung, Endlichkeit und Heimat statt für zeitlosen Komfort.","Wertekonflikt"),
        task("ka2","text","Ordne Zeus, Athene, Hermes und Kalypso in die Freilassung ein: Wer fordert, entscheidet, überbringt und gehorcht?","Athene fordert Hilfe, Zeus entscheidet, Hermes überbringt den Befehl und Kalypso gehorcht widerwillig.",[],["Vier Rollen, vier Figuren.","Die Entscheidung wird nicht von der Person überbracht, die sie fordert.","Lies Kapitel 5–6, PDF-Seiten 126–130."],"Der Götterbeschluss funktioniert als Kette von Fürsprache, Autorität, Botschaft und Ausführung.","Götterordnung"),
        task("ka3","text","Verfasse Odysseus’ erste Logbuchnotiz beim Bau des Flosses: Welche Hoffnung und welche Gefahr müssen vorkommen?","Hoffnung auf Ithaka und Gefahr des offenen Meers beziehungsweise Poseidons Zorn.",[],["Verbinde handwerkliches Handeln mit innerem Ziel.","Die Freilassung beendet Poseidons Widerstand nicht.","Lies PDF-Seiten 128–131."],"Der Flossbau macht Odysseus wieder zum Handelnden, bleibt aber ein riskanter Aufbruch.","Kreatives Textverstehen")
      ]
    },
    ithaka:{
      id:"webstuhl",title:"Das Gewebe der Königin",thread:"ithaka",chapter:[4],pageRef:"89–98",symbol:"⌗",
      discover:"Tagsüber wächst ein Totentuch, nachts verschwindet es. Penelope verwandelt häusliche Arbeit in politischen Widerstand.",
      read:"Ermittle Penelopes Versprechen, ihre nächtliche List und deren Aufdeckung.",
      reward:"Motiv WEBSTUHL",
      tasks:[
        task("pe1","text","Erkläre genau, wie Penelopes Weblist funktioniert und welches Ziel sie verfolgt.","Sie verspricht nach Fertigstellung des Totentuchs zu wählen, trennt nachts das Gewebte auf und gewinnt so Zeit für Odysseus’ Rückkehr.",[],["Nenne Versprechen, Tagesarbeit und Nachtarbeit.","Die List verändert Zeit, nicht die Stärke der Freier.","Lies Kapitel 4, PDF-Seiten 89–98."],"Penelope verteidigt das Haus mit einer zeitgewinnenden List, die Odysseus’ Einfallsreichtum entspricht.","List erklären"),
        task("pe2","text","Warum ist der Webstuhl zugleich privater Gegenstand und politisches Werkzeug?","Das Tuch gehört zur Familienpflicht für Laertes, doch Penelope nutzt seine Fertigstellung zur Verzögerung der Heirat und Herrschaftsfrage.",[],["Verbinde Familie und Königshaus.","Die Wahl eines Freiers hätte Folgen für die Macht auf Ithaka.","Lies PDF-Seiten 90–98."],"Im bedrängten Palast wird Hausarbeit zu einer Strategie gegen den Machtwechsel.","Symbol deuten",3),
        task("pe3","text","Schreibe eine kurze geheime Nachricht Penelopes an Telemachos, in der sie Nutzen und Grenze ihrer List erklärt.","Die List gewinnt Zeit, kann die Freier aber nicht dauerhaft aufhalten, nachdem eine Magd sie verrät.",[],["Nenne Erfolg und Scheiternsgrund.","Eine gute List löst das Grundproblem nicht endgültig.","Lies Kapitel 4."],"Penelopes Strategie ist wirksam, aber zeitlich begrenzt.","Perspektivisches Schreiben")
      ]
    },
    suche:{
      id:"hinterhalt",title:"Segel in der Dunkelheit",thread:"telemachos",chapter:[5,7],pageRef:"121–125, 169–172",symbol:"◒",
      discover:"Zwischen Festland und Ithaka warten Bewaffnete. Telemachos’ Suche hat ihn stärker gemacht – und zum Ziel der Freier.",
      read:"Verbinde den Plan der Freier mit Athenes Warnung und Telemachos’ veränderter Rückroute.",
      reward:"Indiz HINTERHALT",
      tasks:[
        task("hi1","text","Warum wollen die Freier Telemachos gerade jetzt töten?","Seine Reise und sein selbstbewusstes Handeln bedrohen ihre Machtpläne; als Erbe steht er zwischen ihnen und Odysseus’ Haus.",[],["Frage nach seiner politischen Rolle.","Vergleiche den Telemachos vor und nach Athenes Auftrag.","Lies PDF-Seiten 121–125."],"Telemachos wird gefährlich, weil er beginnt, seine Rolle als Sohn und Erbe aktiv auszufüllen.","Figurenentwicklung"),
        task("hi2","order","Ordne Plan und Gegenplan.",["Die Freier erfahren von der Reise","Sie legen einen Hinterhalt","Athene warnt Telemachos","Er wählt eine vorsichtige Rückkehr und erreicht Ithaka"],["Die Freier erfahren von der Reise","Sie legen einen Hinterhalt","Athene warnt Telemachos","Er wählt eine vorsichtige Rückkehr und erreicht Ithaka"],["Zuerst entsteht die Gefahr, dann die göttliche Warnung.","Der Gegenplan verändert die Route.","Lies PDF-Seiten 121–125 und 169–172."],"Menschliche Intrige und göttliche Hilfe stehen in einer direkten Plan-Gegenplan-Struktur.","Parallelhandlung"),
        task("hi3","text","Verfasse einen Lagebericht Telemachos’: Welche Nachricht bringt er heim, und welche neue Verantwortung übernimmt er?","Er weiss, dass Odysseus lebt, und übernimmt Verantwortung für Heimkehr, Haus und später den gemeinsamen Plan gegen die Freier.",[],["Verbinde Wissen aus Sparta mit Handeln auf Ithaka.","Die Reise verändert mehr als seinen Informationsstand.","Lies Kapitel 5 und 7."],"Die Nachrichtensuche wird zu einer Reifungsreise.","Entwicklung zusammenfassen")
      ]
    },
    phaiaken:{
      id:"nausikaa",title:"Wäsche am fremden Ufer",thread:"odysseus",chapter:[6],pageRef:"133–142",symbol:"≈",
      discover:"Ein schiffbrüchiger Fremder steht ohne Namen und Kleidung vor jungen Frauen. Seine erste Aufgabe ist nicht Kampf, sondern richtiges Sprechen.",
      read:"Lies Nausikaas Traum, die Begegnung am Fluss und ihren Rat für den Weg zum Palast.",
      reward:"Figurenkarte NAUSIKAA",
      tasks:[
        task("na1","text","Wie steuert Athene die Begegnung mit Nausikaa, ohne Odysseus direkt an den Hof zu führen?","Athene sendet Nausikaa einen Traum, der sie zum Wäschewaschen führt, und lässt den Ball so geraten, dass Odysseus erwacht.",[],["Nenne Traum und Erwachen.","Die Hilfe arbeitet mit einer Kette scheinbar alltäglicher Ereignisse.","Lies PDF-Seiten 133–136."],"Athene arrangiert günstige Umstände, während Menschen die eigentliche Begegnung gestalten.","Indirekter Göttereingriff"),
        task("na2","text","Analysiere Odysseus’ Gesprächslist: Wie bittet er um Hilfe, ohne Nausikaa zusätzlich zu erschrecken?","Er hält Abstand, spricht respektvoll und schmeichelnd und verzichtet auf eine körperliche Bittgeste.",[],["Achte auf Körperabstand und Wortwahl.","Seine Lage verlangt soziale Klugheit statt Täuschung.","Lies PDF-Seiten 135–137."],"Odysseus’ List zeigt sich hier als taktvolle Anpassung an eine verletzliche Situation.","Kommunikationsstrategie"),
        task("na3","text","Warum soll Odysseus Nausikaa nicht direkt durch die Stadt folgen, obwohl sie ihm hilft?","Nausikaa will Gerede über einen fremden Mann und Schaden für ihren Ruf vermeiden.",[],["Die Gefahr ist sozial, nicht körperlich.","Hilfe und öffentlicher Abstand widersprechen sich nur scheinbar.","Lies PDF-Seiten 137–139."],"Nausikaa berücksichtigt Gastfreundschaft und gesellschaftliche Erwartungen zugleich.","Figureninteresse")
      ]
    },
    eumaios:{
      id:"hirtenfeuer",title:"Das Feuer des Schweinehirten",thread:"ithaka",chapter:[7],pageRef:"158–169",symbol:"♨",
      discover:"Der Hausherr kommt als Bettler. Eumaios kennt ihn nicht – und zeigt gerade deshalb, wem seine Treue wirklich gilt.",
      read:"Untersuche Aufnahme, Gespräch und Haltung des Schweinehirten gegenüber dem unbekannten Gast.",
      reward:"Figurenkarte EUMAIOS",
      tasks:[
        task("eu1","text","Woran erkennt Odysseus Eumaios’ Loyalität, obwohl er seine eigene Identität verbirgt?","Eumaios beklagt den verlorenen Herrn, schützt dessen Besitz und behandelt den fremden Bettler gastfreundlich.",[],["Treue zeigt sich in Worten und Handlungen.","Eumaios erwartet keine Belohnung vom vermeintlichen Bettler.","Lies PDF-Seiten 158–166."],"Die Verkleidung ermöglicht eine unverfälschte Prüfung der Loyalität.","Loyalität belegen"),
        task("eu2","text","Warum erzählt Odysseus Eumaios eine erfundene Lebensgeschichte?","Er will unerkannt bleiben, Eumaios prüfen und zugleich Hoffnung auf die Rückkehr des Herrn andeuten.",[],["Die Lüge schützt und testet.","Achte darauf, welche Reaktion Odysseus mit seiner Nachricht auslöst.","Lies PDF-Seiten 163–168."],"Die erfundene Biografie ist eine defensive List und ein Mittel der Menschenkenntnis.","Erzählte List"),
        task("eu3","text","Verfasse Eumaios’ Charakterkarte mit drei Belegen aus der Hüttenszene.","Gastfreundlich, loyal und vorsichtig; Belege sind Aufnahme des Bettlers, Sorge um Odysseus’ Besitz und skeptischer Umgang mit Heimkehrmeldungen.",[],["Drei Eigenschaften brauchen drei Handlungen.","Seine Skepsis widerspricht seiner Hoffnung nicht.","Lies PDF-Seiten 158–169."],"Eumaios verbindet Treue mit nüchterner Erfahrung.","Charakterisieren")
      ]
    },
    bettler:{
      id:"argos",title:"Der letzte Blick des Argos",thread:"ithaka",chapter:[8],pageRef:"183–185",symbol:"♢",
      discover:"Auf einem Misthaufen liegt ein alter Hund. Was den Menschen verborgen bleibt, erkennt er ohne Prüfung.",
      read:"Lies die kurze Argos-Episode und beachte Erinnerung, Verfall und Odysseus’ beherrschte Reaktion.",
      reward:"Motiv ARGOS",
      tasks:[
        task("ar1","text","Woran erkennt Argos seinen Herrn, und weshalb darf Odysseus seine eigene Reaktion nicht offen zeigen?","Argos erkennt Odysseus trotz Verkleidung; Odysseus muss seine Tränen verbergen, um den Racheplan nicht zu gefährden.",[],["Tiererkennen und Menschenverkleidung bilden einen Gegensatz.","Die öffentliche Enthüllung wäre zu früh.","Lies PDF-Seiten 183–185."],"Das stille Erkennen bestätigt Identität, ohne den strategischen Schein aufzuheben.","Wiedererkennung"),
        task("ar2","text","Deute Argos’ verwahrlosten Zustand als Bild für Ithaka während Odysseus’ Abwesenheit.","Wie Argos ist auch das Haus vernachlässigt und seiner früheren Ordnung beraubt; treue Bindungen sind geschwächt, aber nicht ausgelöscht.",[],["Vergleiche Hund und Herrschaftshaus.","Denke an frühere Stärke und gegenwärtigen Verfall.","Lies Kapitel 8."],"Argos verdichtet den Zustand des gesamten Hauses in einer einzelnen Gestalt.","Symbolische Deutung",3),
        task("ar3","text","Schreibe die Szene aus Argos’ Wahrnehmung, ohne Odysseus beim Namen zu nennen.","Der Hund erkennt Geruch, Stimme oder Gegenwart des lange vermissten Herrn und findet vor dem Tod Ruhe.",[],["Das Tier braucht keinen öffentlich ausgesprochenen Namen.","Halte die Szene knapp und auf Wahrnehmung konzentriert.","Lies PDF-Seiten 183–185."],"Die Perspektive macht die wortlose Treue der Episode erfahrbar.","Kreatives Schreiben")
      ]
    },
    narbe:{
      id:"fremdbericht",title:"Die Wahrheit hinter der Lüge",thread:"ithaka",chapter:[9],pageRef:"195–203",symbol:"?",
      discover:"Penelope befragt einen Fremden über ihren eigenen Mann. Jede erfundene Einzelheit muss genug Wahrheit tragen, um glaubwürdig zu sein.",
      read:"Untersuche Odysseus’ erfundene Herkunft und Penelopes Prüfung seiner Angaben.",
      reward:"Indiz ERZÄHLTE IDENTITÄT",
      tasks:[
        task("fr1","text","Warum erzählt Odysseus Penelope nicht sofort die Wahrheit, obwohl er ihre Treue erkennt?","Er muss den Plan geheim halten, die Lage weiter prüfen und den Überraschungsvorteil gegenüber den Freiern bewahren.",[],["Gefühl und Strategie ziehen in verschiedene Richtungen.","Penelope ist nicht allein im Palast.","Lies PDF-Seiten 195–200."],"Die verzögerte Wahrheit schützt die spätere offene Wiederkehr.","Identitätsstrategie"),
        task("fr2","text","Wie prüft Penelope, ob der Fremde Odysseus wirklich begegnet sein könnte?","Sie verlangt genaue Angaben über Odysseus’ Kleidung und Begleiter beziehungsweise erkennbare Einzelheiten.",[],["Penelope begnügt sich nicht mit einer allgemeinen Behauptung.","Gesucht sind überprüfbare Details.","Lies PDF-Seiten 197–200."],"Penelope arbeitet wie eine Spurensucherin und testet Erzählungen an konkreten Merkmalen.","Prüfendes Lesen"),
        task("fr3","text","Erkläre den Unterschied zwischen Odysseus’ erfundener Biografie und einer beliebigen Lüge.","Die Erzählung ist strategisch, enthält passende wahre Details und dient dem Schutz seiner Identität sowie der Prüfung Penelopes.",[],["Nenne Zweck und Wahrheitsanteile.","Eine wirksame Tarnung muss zur bekannten Welt passen.","Lies Kapitel 9."],"Odysseus konstruiert eine glaubhafte Zwischenidentität aus Erfindung und wahrem Wissen.","Erzählstrategie",3)
      ]
    },
    bogen:{
      id:"verborgenehelfer",title:"Die verschlossene Waffenkammer",thread:"ithaka",chapter:[9,10],pageRef:"195–199, 216–224",symbol:"⚿",
      discover:"Ein Plan gelingt nicht durch einen Bogen allein. Türen, Waffen und loyale Hände entscheiden, wer im Saal handlungsfähig bleibt.",
      read:"Verfolge Telemachos’ Entfernen der Waffen und die Aufgaben von Eumaios und Philoitios.",
      reward:"Bündnisfragment TREUE HELFER",
      tasks:[
        task("vh1","order","Ordne die Vorbereitung des Kräfteverhältnisses.",["Odysseus und Telemachos planen","Die Waffen werden aus dem Saal entfernt","Eumaios und Philoitios werden eingeweiht","Die Türen werden gesichert"],["Odysseus und Telemachos planen","Die Waffen werden aus dem Saal entfernt","Eumaios und Philoitios werden eingeweiht","Die Türen werden gesichert"],["Der geheime Familienplan beginnt vor der Einweihung weiterer Helfer.","Raumkontrolle wird unmittelbar vor dem Kampf wichtig.","Lies Kapitel 9–10."],"Der Sieg entsteht aus Vorbereitung, Vertrauen und Kontrolle des Raums.","Plan rekonstruieren"),
        task("vh2","text","Warum vertraut Odysseus Eumaios und Philoitios, aber nicht Melanthios?","Die ersten beiden zeigen beständige Treue zum abwesenden Herrn; Melanthios dient den Freiern, verhöhnt den Bettler und beschafft ihnen Waffen.",[],["Vergleiche Verhalten vor der Enthüllung.","Die Verkleidung hat echte Loyalitäten sichtbar gemacht.","Lies PDF-Seiten 187–190 und 216–223."],"Odysseus stützt sein Bündnis auf beobachtetes Verhalten, nicht auf Rang oder Behauptungen.","Figuren vergleichen"),
        task("vh3","text","Erstelle für jeden der vier Kämpfer eine knappe Funktionsbeschreibung: Odysseus, Telemachos, Eumaios, Philoitios.","Odysseus führt und schiesst, Telemachos kämpft als Sohn, Eumaios sichert und unterstützt, Philoitios verschliesst beziehungsweise kämpft loyal.",[],["Nicht alle leisten dasselbe.","Verbinde familiäre und dienende Loyalität.","Lies PDF-Seiten 216–224."],"Der Kampf ist eine koordinierte Gemeinschaftsleistung um Odysseus.","Beziehungsnetz")
      ]
    },
    bett:{
      id:"obstgarten",title:"Die Bäume des Laertes",thread:"ithaka",chapter:[11],pageRef:"232–242",symbol:"♧",
      discover:"Nach Bett und Narbe braucht es noch einen anderen Beweis: Erinnerungen an Bäume, die ein Vater seinem Sohn schenkte.",
      read:"Lies Odysseus’ Besuch bei Laertes und den letzten Konflikt mit den Angehörigen der Freier.",
      reward:"Schlussfragment FRIEDEN",
      tasks:[
        task("ob1","text","Warum gibt sich Odysseus Laertes nicht sofort zu erkennen, und wodurch überzeugt er ihn schliesslich?","Odysseus prüft beziehungsweise schont den Vater zunächst und überzeugt ihn dann mit Narbe, Erinnerungen und den gemeinsam bekannten geschenkten Bäumen.",[],["Auch diese Wiedererkennung verläuft in Stufen.","Der stärkste Beweis gehört zur gemeinsamen Familiengeschichte.","Lies PDF-Seiten 232–236."],"Wie bei Penelope wird Identität durch exklusiv geteiltes Wissen sicher.","Wiedererkennung vergleichen"),
        task("ob2","text","Welche Bedeutung haben die Bäume im Vergleich zu Bogen und Bett?","Die Bäume bezeugen die Vater-Sohn-Beziehung und Verwurzelung im Land; Bogen und Bett stehen stärker für Herrschaft beziehungsweise Ehe.",[],["Ordne jedem Gegenstand eine Beziehung zu.","Alle drei Zeichen verbinden Identität mit einer Lebensgeschichte.","Lies Kapitel 10–11."],"Gegenstände und Orte tragen verschiedene Teile von Odysseus’ wiedergewonnener Identität.","Motive vernetzen",3),
        task("ob3","text","Warum ist Athenes Friedensschluss notwendig, obwohl Odysseus die Freier bereits besiegt hat?","Die Angehörigen der Freier wollen Rache; ohne Eingriff würde die Vergeltung weitergehen und Ithakas Ordnung nicht dauerhaft wiederhergestellt.",[],["Ein Sieg beendet nicht automatisch die Gewaltspirale.","Rache erzeugt neue Rache.","Lies PDF-Seiten 238–242."],"Erst der Friedensschluss verwandelt persönlichen Sieg in politische Ordnung.","Schluss deuten")
      ]
    }
  };
  const expandedStations=[];
  stations.forEach(station=>{
    expandedStations.push(station);
    if(additionalStations[station.id])expandedStations.push(additionalStations[station.id]);
  });
  stations.splice(0,stations.length,...expandedStations);

  const achievements = [
    {id:"mind",name:"Listenreicher Geist",rule:"Drei Stationen ohne dritten Hinweis"},
    {id:"ithaka",name:"Kennerin Ithakas",rule:"Alle Ithaka-Stationen gelöst"},
    {id:"gods",name:"Spurenleser der Götter",rule:"Alle Götter-Aufgaben gelöst"},
    {id:"time",name:"Hüterin der Zeit",rule:"Zeitleistenaufgabe gelöst"}
  ];

  const finalPuzzle = {
    id:"final",title:"Athenes Siegel",
    prompt:"Verbinde Ursache, Zusammenlauf und sicheren Identitätsbeweis.",
    parts:[
      {label:"Die Heimkehr wird besonders verlängert durch …",answer:"poseidon",options:["poseidon","nestor","nausikaa"]},
      {label:"Odysseus’ und Telemachos’ Stränge treffen sich bei …",answer:"eumaios",options:["menelaos","eumaios","kalypso"]},
      {label:"Penelopes sicherer Beweis betrifft …",answer:"bett",options:["narbe","windsack","bett"]}
    ],
    solutionWord:"HEIMKEHR",
    feedback:"Poseidons Zorn erklärt die lange Irrfahrt; bei Eumaios verbinden sich Vater und Sohn; das Geheimnis des Betts stellt Odysseus’ private Identität zweifelsfrei wieder her."
  };
  const mediaResource = {
    title:"Homers Odyssee – Die Geschichte dahinter",
    video:"assets/media/homers-odyssee-web.m4v",
    transcript:"assets/media/transkript-homers-odyssee.pdf",
    sourceType:"Ergänzende Videoquelle mit automatisch erzeugtem Transkript",
    notice:"Das Video erklärt Homers Epos und seinen historischen Hintergrund. Es ersetzt Lechners Nacherzählung nicht. Das automatische Transkript kann Erkennungsfehler enthalten.",
    themes:["Homer-Frage","Trojanischer Krieg","Seefahrt und Wetter","Göttereingriffe","List und Rache","Aktualität des Epos"],
    prompts:[
      {id:"video-context",title:"Kontextspur",prompt:"Notiere zwei historische oder literaturgeschichtliche Informationen aus dem Video, die Lechners Erzählung in einen grösseren Zusammenhang stellen.",guide:"Mögliche Aspekte sind die unsichere Autorschaft Homers, mündliche Überlieferung, Troja oder die Gefahren antiker Seefahrt."},
      {id:"video-weather",title:"Wetterlogbuch",prompt:"Sammle drei Stellen, an denen Wind, Sturm oder Schiffbruch den Weg verändern. Erkläre jeweils, ob Menschen oder Götter als Ursache erscheinen.",guide:"Vergleiche Kap Malea, den Windsack des Aiolos, Thrinakia und Poseidons Sturm vor den Phaiaken."},
      {id:"video-gods",title:"Götterprotokoll",prompt:"Stelle Athene, Poseidon, Zeus, Hermes und Helios gegenüber: Wer hilft, wer behindert, wer entscheidet und wer rächt sich?",guide:"Die Rollen sind nicht gleich: Schutz, Widerstand, Befehl, Botenhilfe und Vergeltung müssen unterschieden werden."},
      {id:"video-comparison",title:"Quellenvergleich",prompt:"Wähle eine Station. Formuliere eine Gemeinsamkeit und einen Unterschied zwischen dem Video und Lechners Darstellung. Belege Lechner mit Kapitel und PDF-Seite.",guide:"Achte nicht nur auf Ereignisse, sondern auch auf Ausführlichkeit, Wertung und Erzählreihenfolge."},
      {id:"video-hero",title:"Urteil über Odysseus",prompt:"Das Video beschreibt Odysseus als vielschichtigen Menschen. Prüfe diese Aussage an je einem Beispiel für List, Fehler, Ausdauer und Loyalität aus Lechners Text.",guide:"Polyphem, die Sirenen, Kalypso und die Heimkehr bieten unterschiedliche Belege."}
    ]
  };
  const heroJourney = {
    title:"Die Heldenreise als Lesemodell",
    intro:"Die Heldenreise beschreibt ein häufiges Erzählmuster: Eine Figur verlässt ihre vertraute Ordnung, besteht Prüfungen, gerät in eine tiefe Krise und kehrt verändert zurück. Sie ist kein Naturgesetz und passt nicht in jedem Detail. Bei Lechner hilft sie vor allem, die tatsächliche Chronologie hinter den Wechseln und Rückblicken zu erkennen.",
    phases:[
      {id:"order",number:"01",name:"Verlorene Ordnung",thread:"odysseus",events:"Troja ist gefallen; Odysseus will aus dem Krieg zu Familie und Königreich zurück.",meaning:"Die vertraute Heimat ist Ziel, aber noch nicht erreichbar.",chapters:"Kapitel 1"},
      {id:"threshold",number:"02",name:"Aufbruch über die Schwelle",thread:"odysseus",events:"Die Flotte verlässt Troja und gerät bei Kikonen, Lotophagen und Polyphem in eine fremde Welt.",meaning:"Regeln des Kriegs helfen auf der Heimfahrt nicht immer weiter.",chapters:"Kapitel 1"},
      {id:"trials",number:"03",name:"Prüfungen, Helfer und Gegner",thread:"gods",events:"Aiolos, Hermes und Kirke helfen zeitweise; Poseidon, Ungeheuer, Wetter und Fehlentscheidungen behindern.",meaning:"Odysseus braucht List, Führung und die Hilfe anderer.",chapters:"Kapitel 2–3"},
      {id:"depth",number:"04",name:"Abstieg und Wissen",thread:"gods",events:"In der Unterwelt erfährt Odysseus von Teiresias Bedingungen und Grenzen seiner Heimkehr.",meaning:"Der tiefste räumliche Abstieg bringt entscheidendes Wissen.",chapters:"Kapitel 2"},
      {id:"crisis",number:"05",name:"Verlust und tiefste Krise",thread:"odysseus",events:"Die Gefährten missachten das Verbot des Helios; Schiff und Mannschaft gehen unter.",meaning:"Odysseus bleibt allein zurück und kann nicht mehr als Flottenführer heimkehren.",chapters:"Kapitel 3"},
      {id:"turn",number:"06",name:"Wendepunkt",thread:"gods",events:"Athene setzt sich bei Zeus ein; Hermes überbringt Kalypso den Befehl zur Freilassung.",meaning:"Göttliche Hilfe eröffnet einen neuen Weg, den Odysseus mit dem Floss selbst ergreifen muss.",chapters:"Kapitel 5–6"},
      {id:"return",number:"07",name:"Rückkehr in Verkleidung",thread:"ithaka",events:"Phaiaken bringen Odysseus nach Ithaka; als Bettler prüft er Menschen und Verhältnisse.",meaning:"Heimkehr bedeutet noch nicht Anerkennung. Der Held muss seinen Platz neu gewinnen.",chapters:"Kapitel 7–9"},
      {id:"final",number:"08",name:"Letzte Bewährung und neue Ordnung",thread:"ithaka",events:"Bogenprobe, Kampf, Bettgeheimnis, Laertes und Athenes Friedensschluss stellen Identität und Ordnung wieder her.",meaning:"Die Rückkehr endet erst mit Anerkennung, Beziehung und Frieden.",chapters:"Kapitel 10–11"}
    ],
    telemachos:[
      "Athene ruft Telemachos aus seiner passiven Lage heraus.",
      "Er überschreitet mit der Reise nach Pylos und Sparta erstmals selbstständig die Grenze Ithakas.",
      "Nestor, Menelaos und Helena geben Rat und Wissen; die Freier planen den Gegenangriff.",
      "Er kehrt gereifter zurück, entgeht dem Hinterhalt und handelt als Verbündeter seines Vaters."
    ],
    tasks:[
      {id:"hj1",phaseIds:["order","threshold"],title:"Ordnung oder Erzählung?",prompt:"Erkläre den Unterschied zwischen der zeitlichen Heldenreise und Lechners Erzählreihenfolge. Nenne dabei den Wechsel zu Telemachos oder den Rückblick bei den Phaiaken.",answer:["Heldenreise folgt der zeitlichen Entwicklung","Lechner wechselt zu Telemachos oder erzählt bei den Phaiaken rückblickend"],alternatives:[],hints:["Vergleiche das Nacheinander der Ereignisse mit dem Nacheinander der Kapitel.","Kapitel 4 wechselt nach Ithaka; bei den Phaiaken wird Vergangenes nochmals erzählt."],feedback:"Die Heldenreise ordnet die Entwicklung chronologisch. Lechners Roman erzeugt dagegen Spannung durch Strangwechsel und Rückblicke.",objective:"Erzählordnung unterscheiden",creativeMode:"Chronologie-Labor"},
      {id:"hj2",phaseIds:["trials","depth"],title:"Helfer, Gegner, Wissen",prompt:"Ordne in einem kurzen Text mindestens einen Helfer, einen Gegner und eine Quelle entscheidenden Wissens ein. Erkläre jeweils ihre Wirkung auf die Heimkehr.",answer:["Helfer wie Hermes, Athene, Kirke oder Aiolos","Gegner wie Poseidon, Polyphem, Skylla oder Charybdis","Teiresias vermittelt Wissen über Heimkehr und Helios"],alternatives:[],hints:["Gesucht sind drei verschiedene Funktionen, nicht bloss drei Namen.","Teiresias weiss etwas, Hermes schützt, Poseidon behindert."],feedback:"Die mittlere Phase besteht aus einem Netz unterschiedlicher Funktionen: Hilfe, Widerstand und vorausweisendes Wissen.",objective:"Figurenfunktionen analysieren",creativeMode:"Figurennetz"},
      {id:"hj3",phaseIds:["crisis","turn"],title:"Vom Tiefpunkt zum Wendepunkt",prompt:"Beschreibe Ursache und Folge des tiefsten Verlusts und erkläre anschliessend, wodurch ein neuer Heimweg möglich wird.",answer:["Gefährten schlachten Helios’ Rinder und Schiff sowie Mannschaft gehen unter","Athene wirkt bei Zeus, Hermes bringt Kalypso den Freilassungsbefehl"],alternatives:[],hints:["Die Krise beginnt mit einem bekannten Verbot.","Der Wendepunkt entsteht durch Fürsprache, Entscheidung und Botschaft der Götter."],feedback:"Die völlige Vereinzelung beendet die Flottenreise; der Götterbeschluss eröffnet Odysseus einen neuen, persönlichen Rückweg.",objective:"Krise und Wendepunkt verbinden",creativeMode:"Ursache-Folge-Protokoll"},
      {id:"hj4",phaseIds:["return","final"],title:"Identität zurückgewinnen",prompt:"Zeige an drei verschiedenen Beweisen oder Handlungen, wie Odysseus auf Ithaka seine Identität schrittweise zurückgewinnt.",answer:["Narbe oder Argos","Bogenprobe und Enthüllung","Bettgeheimnis oder Bäume des Laertes"],alternatives:[],hints:["Suche ein körperliches Zeichen, eine öffentliche Fähigkeit und privates Wissen.","Eurykleia, die Freier und Penelope erkennen nicht auf dieselbe Weise."],feedback:"Odysseus wird nicht in einem einzigen Moment wieder zum Hausherrn: Körperzeichen, Fähigkeit und geteilte Erinnerung bestätigen verschiedene Seiten seiner Identität.",objective:"Wiedererkennungen vernetzen",creativeMode:"Beweisarchiv"},
      {id:"hj5",phaseIds:["threshold","return"],title:"Telemachos’ eigene Reise",prompt:"Erkläre, wie Telemachos sich zwischen Athenes Auftrag und seiner Rückkehr verändert. Belege Anfang, Prüfung und Ergebnis.",answer:["Athene ruft den zunächst unsicheren Telemachos zum Handeln","Reise zu Nestor und Menelaos sowie Gefahr durch die Freier","Er kehrt selbstständiger zurück und handelt mit Odysseus"],alternatives:[],hints:["Nutze die Struktur Ausgangslage – Reise – Rückkehr.","Am Ende besitzt er nicht nur Nachrichten, sondern übernimmt Verantwortung."],feedback:"Telemachos’ Reise ist eine kleinere Heldenreise: Aus dem bedrängten Sohn wird ein handlungsfähiger Verbündeter.",objective:"Figurenentwicklung erklären",creativeMode:"Entwicklungsprofil"},
      {id:"hj6",phaseIds:["order","final"],title:"Grenzen des Modells",prompt:"Begründe, weshalb die Heldenreise für Lechners Roman hilfreich ist, aber nicht als starres Schema behandelt werden darf.",answer:["Das Modell macht Entwicklung und Chronologie sichtbar","Lechner nutzt parallele Stränge, Rückblicke und Ereignisse, die nicht exakt in ein starres Schema passen"],alternatives:[],hints:["Nenne einen Nutzen und eine Grenze.","Ein Analysemodell ist eine Lesebrille, nicht der Bauplan des Romans."],feedback:"Das Modell hilft beim Ordnen, darf aber die besondere Erzählweise und widersprüchliche Entscheidungen der Figuren nicht verdecken.","objective":"Modell kritisch anwenden",creativeMode:"Modellkritik"}
    ],
    caution:"Lechner erzählt dieses Muster nicht einfach von Phase 1 bis 8. Nach drei Irrfahrtskapiteln wechselt die Erzählung zu Telemachos und Ithaka; bei den Phaiaken werden frühere Abenteuer nochmals rückblickend gebündelt. Deshalb sind Heldenreise, Reiseweg und Erzählreihenfolge drei verschiedene Ordnungen."
  };
  const writingProject = {
    title:"Die Heldenreise eines Sportlers",
    intro:"Entwirf eine eigenständige Erzählung über eine Sportlerin oder einen Sportler. Im Mittelpunkt steht nicht bloss ein Sieg, sondern eine innere Entwicklung: Die Hauptfigur verlässt ihre vertraute Ordnung, erlebt Widerstand, trifft Entscheidungen und kehrt mit einer veränderten Sicht auf Leistung, Gemeinschaft oder sich selbst zurück.",
    principles:[
      "Die Hauptfigur darf erfunden sein. Reale Personen sollen respektvoll und nicht mit erfundenen privaten Behauptungen dargestellt werden.",
      "Verletzungen, psychischer Druck und Niederlagen werden glaubwürdig behandelt, nicht als einfache Abkürzungen zum Erfolg.",
      "Doping, Betrug und Selbstgefährdung werden nicht verherrlicht. Eine schwierige Entscheidung braucht nachvollziehbare Folgen.",
      "Der sportliche Wettkampf ist die äussere Handlung; die Veränderung der Figur bildet die innere Heldenreise."
    ],
    stages:[
      {id:"athlete",number:"01",title:"Hauptfigur und vertraute Welt",min:180,prompt:"Entwirf deine Hauptfigur. Beschreibe Sportart, Alter, Alltag, Stärke, Schwäche, wichtiges Verhältnis und die vertraute Ordnung vor dem Aufbruch.",questions:["Was kann die Figur besonders gut?","Wovor hat sie Angst oder was verdrängt sie?","Wer erwartet etwas von ihr?","Was würde sie verlieren, wenn alles unverändert bliebe?"]},
      {id:"call",number:"02",title:"Ruf, Ziel und Einsatz",min:180,prompt:"Konzipiere den Ruf zum Abenteuer. Lege ein konkretes sportliches Ziel, den inneren Einsatz und einen Grund fest, weshalb die Figur zunächst zögert.",questions:["Welches Ereignis stört die vertraute Ordnung?","Was will die Figur äusserlich erreichen?","Was muss sie innerlich lernen?","Warum kann sie den Ruf nicht einfach annehmen?"]},
      {id:"forces",number:"03",title:"Helfer, Gegner und Kräfte",min:220,prompt:"Baue ein Beziehungs- und Kräftesystem. Mindestens eine helfende, eine behindernde und eine wechselhafte Kraft müssen vorkommen.",questions:["Wer übernimmt eine Mentorinnen- oder Mentorenrolle?","Ist der Gegner eine Person, ein Team, das Wetter, der Körper oder die eigene Haltung?","Welche Hilfe hat einen Preis?","Welche Figur wechselt ihre Position?"]},
      {id:"trials",number:"04",title:"Prüfungen und Steigerung",min:240,prompt:"Plane drei unterschiedliche Prüfungen. Jede soll eine Entscheidung verlangen und die nächste Prüfung verschärfen.",questions:["Welche erste Prüfung unterschätzt die Figur?","Wann funktioniert ihre bisherige Stärke nicht mehr?","Welche Entscheidung belastet eine Beziehung?","Welches Motiv verbindet die drei Prüfungen?"]},
      {id:"crisis",number:"05",title:"Krise, Entscheidung und Veränderung",min:240,prompt:"Entwirf den Tiefpunkt und die entscheidende Wahl. Vermeide eine zufällige Wunderrettung: Die Wendung muss aus früheren Erfahrungen, Beziehungen oder Fehlern hervorgehen.",questions:["Was verliert oder riskiert die Figur?","Welche Wahrheit muss sie anerkennen?","Welche verlockende falsche Lösung lehnt sie ab?","Woran wird die innere Veränderung sichtbar?"]},
      {id:"return",number:"06",title:"Rückkehr und neue Ordnung",min:180,prompt:"Plane das Ende. Entscheide, wie die Figur in ihre Welt zurückkehrt und was sich dort durch ihre Entwicklung verändert.",questions:["Gewinnt sie den Wettkampf – und ist das überhaupt der wichtigste Gewinn?","Welche Beziehung wird neu geordnet?","Welches Bild vom Anfang kehrt verändert wieder?","Welche Frage darf am Ende offenbleiben?"]}
    ],
    draft:{id:"draft",title:"Schreibwerkstatt: die Reise durchführen",min:900,target:"900–1500 Wörter",prompt:"Schreibe die vollständige Erzählung. Zeige die Entwicklung in Szenen, Handlungen, Dialogen und sinnlichen Einzelheiten. Erkläre die Heldenreise nicht theoretisch im Text; lasse sie durch Entscheidungen und Folgen erkennbar werden."},
    revision:[
      "Beginnt die Geschichte in einer konkreten Situation statt mit einer langen Erklärung?",
      "Hat jede Prüfung Folgen für die nächste Phase?",
      "Verändert sich nicht nur die sportliche Lage, sondern auch die Hauptfigur?",
      "Sind Helfer und Gegner mehr als blosse Funktionen?",
      "Wird die Krise durch eine Entscheidung und nicht durch Zufall gelöst?",
      "Greift das Ende ein Bild, einen Gegenstand oder einen Konflikt vom Anfang verändert auf?",
      "Sind Sportabläufe verständlich, ohne den Text mit Fachbegriffen zu überladen?",
      "Wurden Rechtschreibung, Absätze, Dialogzeichen und Zeitform geprüft?"
    ]
  };

  const stationContexts = {
    troja:{place:"Troja und die Küste der Kikonen",themes:["Kriegsschuld","Götterzorn","Aufbruch"]},
    lotos:{place:"Das Land der Lotophagen",themes:["Erinnerung","Verführung","Heimkehrwille"]},
    polyphem:{place:"Polyphems Höhle",themes:["List","Stolz","Rache"]},
    fluch:{place:"Die Küste der Kyklopen",themes:["Stolz","Poseidon","Rache"]},
    wind:{place:"Aiolia und das Land der Laistrygonen",themes:["Wind und Wetter","Misstrauen","Verlust"]},
    steinhafen:{place:"Der Hafen der Laistrygonen",themes:["Raumfalle","Voraussicht","Flottenverlust"]},
    kirke:{place:"Aia und die Unterwelt",themes:["Verwandlung","Götterhilfe","Weissagung"]},
    totenstimmen:{place:"Das Land der Kimmerier und die Unterwelt",themes:["Ritual","Familie","Weissagung"]},
    meerenge:{place:"Sireneninsel und Meerenge",themes:["List","Führung","Naturgewalt"]},
    sechs:{place:"Die Meerenge bei Skylla",themes:["Dilemma","Führung","Verlust"]},
    helios:{place:"Thrinakia und Ogygia",themes:["Verbot","Götterrache","Sehnsucht"]},
    inselzeit:{place:"Kalyspos Insel Ogygia",themes:["Unsterblichkeit","Sehnsucht","Götterbeschluss"]},
    ithaka:{place:"Der bedrängte Palast auf Ithaka",themes:["Macht","Treue","Athenes Plan"]},
    webstuhl:{place:"Penelopes Gemächer auf Ithaka",themes:["Weblist","Zeitgewinn","Widerstand"]},
    suche:{place:"Pylos und Sparta",themes:["Nachrichtensuche","Gastfreundschaft","Hinterhalt"]},
    hinterhalt:{place:"Die Meerenge vor Ithaka",themes:["Freierplan","Athenes Warnung","Reifung"]},
    phaiaken:{place:"Ogygia und das Land der Phaiaken",themes:["Sturm","Götterstreit","Rückblick"]},
    nausikaa:{place:"Der Fluss und die Stadt der Phaiaken",themes:["Gastfreundschaft","Takt","Athenes Führung"]},
    eumaios:{place:"Eumaios’ Hütte auf Ithaka",themes:["Verkleidung","Treue","Wiederbegegnung"]},
    hirtenfeuer:{place:"Eumaios’ Hütte",themes:["Gastfreundschaft","Loyalität","Erzählte List"]},
    bettler:{place:"Weg und Palast von Ithaka",themes:["Prüfung der Menschen","Demütigung","Racheplan"]},
    argos:{place:"Vor dem Palast von Ithaka",themes:["Treue","Verfall","Wiedererkennung"]},
    narbe:{place:"Der nächtliche Palast",themes:["Erinnerung","Geheimnis","Identität"]},
    fremdbericht:{place:"Penelopes Saal",themes:["Erzählte Identität","Prüfung","Geheimhaltung"]},
    bogen:{place:"Der grosse Saal des Palasts",themes:["Bogenlist","Vergeltung","Loyalität"]},
    verborgenehelfer:{place:"Waffenkammer und Palastsaal",themes:["Vorbereitung","Bündnis","Raumkontrolle"]},
    bett:{place:"Schlafgemach, Landgut und Ithaka",themes:["Wiedererkennung","Familie","Frieden"]}
    ,obstgarten:{place:"Laertes’ Obstgarten und Ithaka",themes:["Vater und Sohn","Verwurzelung","Friedensschluss"]}
  };
  const creativeModes=["Spurenbericht","Ursache-Folge-Protokoll","Figurennetz","Wetterlogbuch","List-Analyse","Zeugenbericht"];
  stations.forEach((station,stationIndex)=>{
    Object.assign(station,stationContexts[station.id]);
    station.tasks.forEach((q,taskNumber)=>{
      if(q.type!=="order"){q.type="text";delete q.options;}
      q.creativeMode=q.type==="order"?"Rekonstruktion":creativeModes[(stationIndex+taskNumber)%creativeModes.length];
    });
  });

  return {threads,chapters,characters,locations,events,stations,achievements,finalPuzzle,mediaResource,heroJourney,writingProject};
})();
