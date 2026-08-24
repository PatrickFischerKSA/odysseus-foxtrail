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
        task("t3","text","Erkläre die Ursache-Folge-Kette vom missachteten Rat des Odysseus bis zum Verlust von sechs Männern auf jedem Schiff.","Die Gefährten bleiben trotz Odysseus’ Warnung, feiern und plündern; die Kikonen holen Verstärkung und töten bei der Gegenwehr sechs Männer auf jedem Schiff.",[],["Beginne mit Odysseus’ Aufforderung zur sofortigen Abfahrt.","Verbinde Feiern, Verstärkung und Flucht.","Lies PDF-Seiten 8–9."],"Die erste Niederlage entsteht aus dem missachteten Rat und der verzögerten Abfahrt.","Ursache und Folge erklären")
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
      id:"phaiaken",title:"Der Fremde ohne Geschichte",thread:"odysseus",chapter:[3,6],pageRef:"77–83, 128–154",symbol:"◇",
      discover:"Ein Floss zerbricht. Am Strand muss ein namenloser Mann entscheiden, wem er seine Geschichte anvertraut.",
      read:"Lies von Kalyspos Freilassung bis zur Aufnahme bei den Phaiaken.",
      reward:"Routenfragment SCHERIA",
      tasks:[
        task("f1","match","Ordne Eingriff und Wirkung.",{"Hermes":"Kalypso muss Odysseus ziehen lassen","Poseidon":"zerstört das Floss","Leukothea":"gibt einen rettenden Schleier","Athene":"ebnet die Landung"},["Hermes|Kalypso muss Odysseus ziehen lassen","Poseidon|zerstört das Floss","Leukothea|gibt einen rettenden Schleier","Athene|ebnet die Landung"],["Zwei Mächte helfen auf See, eine bekämpft ihn.","Hermes wirkt schon vor der Abfahrt.","Lies PDF-Seiten 77–83 und 128–133."],"Die Heimkehr entsteht aus gegensätzlichen göttlichen Eingriffen und Odysseus’ Ausdauer.","Götterrollen"),
        task("f2","choice","Warum geht Nausikaa nicht gemeinsam mit Odysseus durch die Stadt?","Sie will Gerede und falsche Deutungen vermeiden.",["Sie fürchtet seine Waffen.","Sie will Gerede und falsche Deutungen vermeiden.","Sie kennt den Palast nicht.","Alkinoos verbietet Hilfe."],["Es geht um ihren Ruf.","Sie gibt ihm dennoch genaue Anweisungen.","Lies PDF-Seiten 136–139."],"Nausikaa verbindet Hilfsbereitschaft mit sozialer Vorsicht.","Figureninteresse"),
        task("f3","timeline","Welche Aussage trennt Erzählordnung und Zeitordnung korrekt?","Bei den Phaiaken erzählt Odysseus frühere Abenteuer rückblickend.",["Die Phaiaken-Episode geschieht vor Troja.","Bei den Phaiaken erzählt Odysseus frühere Abenteuer rückblickend.","Telemachos erzählt Polyphems Geschichte.","Lechner erwähnt die Irrfahrt erstmals hier."],["Das Erzählen geschieht später als das Erzählte.","Lechner hat die Abenteuer in Kapitel 1–3 bereits dargestellt.","Lies PDF-Seiten 143–154. Vergleiche anschliessend Kapitel 1–3."],"Die Irrfahrt ist vergangen, wird aber in der Phaiaken-Gegenwart nochmals berichtet.","Erzählordnung verstehen",3)
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
        task("u3","text","Welche besondere Verantwortung entsteht für Odysseus aus dem Wissen des Teiresias, noch bevor die weitere Reise beginnt?","Odysseus kennt die Warnung vor Helios’ Herde und muss sie der Mannschaft vermitteln und bei künftigen Entscheidungen durchsetzen.",[],["Wissen schafft eine Führungsaufgabe.","Odysseus muss die Weissagung in verantwortliches Handeln übersetzen.","Lies PDF-Seiten 45–48."],"Wer die Warnung kennt, trägt Verantwortung für die kommenden Entscheidungen.","Wissen und Verantwortung",3)
      ]
    },
    meerenge:{
      id:"sechs",title:"Sechs leere Plätze",thread:"odysseus",chapter:[3],pageRef:"59–67",symbol:"Ⅵ",
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
      id:"inselzeit",title:"Die Insel ohne Zeit",thread:"odysseus",chapter:[3],pageRef:"75–83",symbol:"∞",
      discover:"Sieben Jahre lang sieht Odysseus aufs Meer. Kalypso bietet Unsterblichkeit, doch die Zeit ohne Heimkehr bleibt Gefangenschaft.",
      read:"Vergleiche Odysseus’ Leben bei Kalypso mit dem göttlichen Beschluss seiner Freilassung.",
      reward:"Figurenkarte KALYPSO",
      tasks:[
        task("ka1","text","Erkläre den Widerspruch: Kalyspos Insel bietet Sicherheit und Unsterblichkeit und ist für Odysseus trotzdem kein glückliches Ziel.","Odysseus sehnt sich nach Ithaka, Penelope und seinem menschlichen Leben; Kalypso hält ihn gegen seinen Heimkehrwunsch fest.",[],["Komfort und Freiheit sind nicht dasselbe.","Stelle Unsterblichkeit der Zugehörigkeit zur Heimat gegenüber.","Lies PDF-Seiten 75–82."],"Odysseus entscheidet sich für Bindung, Endlichkeit und Heimat statt für zeitlosen Komfort.","Wertekonflikt"),
        task("ka2","text","Ordne Zeus, Athene, Hermes und Kalypso in die Freilassung ein: Wer fordert, entscheidet, überbringt und gehorcht?","Athene fordert Hilfe, Zeus entscheidet, Hermes überbringt den Befehl und Kalypso gehorcht widerwillig.",[],["Vier Rollen, vier Figuren.","Die Entscheidung wird nicht von der Person überbracht, die sie fordert.","Lies PDF-Seiten 77–81."],"Der Götterbeschluss funktioniert als Kette von Fürsprache, Autorität, Botschaft und Ausführung.","Götterordnung"),
        task("ka3","text","Verfasse Odysseus’ erste Logbuchnotiz beim Bau des Flosses: Welche Hoffnung und welche Gefahr müssen vorkommen?","Hoffnung auf Ithaka und Gefahr des offenen Meers beziehungsweise Poseidons Zorn.",[],["Verbinde handwerkliches Handeln mit innerem Ziel.","Die Freilassung beendet Poseidons Widerstand nicht.","Lies PDF-Seiten 82–83."],"Der Flossbau macht Odysseus wieder zum Handelnden, bleibt aber ein riskanter Aufbruch.","Kreatives Textverstehen")
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
      id:"verborgenehelfer",title:"Die verschlossene Waffenkammer",thread:"ithaka",chapter:[8,9,10],pageRef:"182–184, 195, 203–205, 213–224",symbol:"⚿",
      discover:"Ein Plan gelingt nicht durch einen Bogen allein. Türen, Waffen und loyale Hände entscheiden, wer im Saal handlungsfähig bleibt.",
      read:"Verfolge Telemachos’ Entfernen der Waffen und die Aufgaben von Eumaios und Philoitios.",
      reward:"Bündnisfragment TREUE HELFER",
      tasks:[
        task("vh1","order","Ordne die Vorbereitung des Kräfteverhältnisses.",["Odysseus und Telemachos planen","Die Waffen werden aus dem Saal entfernt","Eumaios und Philoitios werden eingeweiht","Die Türen werden gesichert"],["Odysseus und Telemachos planen","Die Waffen werden aus dem Saal entfernt","Eumaios und Philoitios werden eingeweiht","Die Türen werden gesichert"],["Der geheime Familienplan beginnt vor der Einweihung weiterer Helfer.","Raumkontrolle wird unmittelbar vor dem Kampf wichtig.","Lies Kapitel 9–10."],"Der Sieg entsteht aus Vorbereitung, Vertrauen und Kontrolle des Raums.","Plan rekonstruieren"),
        task("vh2","text","Warum vertraut Odysseus Eumaios und Philoitios, aber nicht Melanthios?","Die ersten beiden zeigen beständige Treue zum abwesenden Herrn; Melanthios dient den Freiern, verhöhnt den Bettler und beschafft ihnen Waffen.",[],["Vergleiche Verhalten vor der Enthüllung.","Die Verkleidung hat echte Loyalitäten sichtbar gemacht.","Lies PDF-Seiten 182–184, 203–205 und 216–223."],"Odysseus stützt sein Bündnis auf beobachtetes Verhalten, nicht auf Rang oder Behauptungen.","Figuren vergleichen"),
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
    videos:[
      {src:"assets/media/homers-odyssee-teil-1.m4v",label:"Teil 1 · Beginn bis 7:13"},
      {src:"assets/media/homers-odyssee-teil-2.m4v",label:"Teil 2 · ab 7:13"}
    ],
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
    intro:"Die Heldenreise beschreibt ein häufiges Erzählmuster: Eine Figur verlässt ihre vertraute Ordnung, besteht Prüfungen, gerät in eine tiefe Krise und kehrt verändert zurück. Joseph Campbell untersuchte wiederkehrende Motive; Christopher Vogler entwickelte daraus ein zwölfstufiges Erzählmodell. Es ist eine Lesebrille, kein Naturgesetz. Gerade die Stellen, an denen Lechners Odysseus nicht sauber hineinpasst, führen zu genauer Textanalyse.",
    source:{label:"Storytelling Masterclass: Die 12 Stufen der Heldenreise",url:"https://www.storytellingmasterclass.de/die-heldenreise-stufen/"},
    phases:[
      {id:"ordinary",number:"01",act:"AUFBRUCH",name:"Gewohnte Welt",fit:"partial",thread:"ithaka",concept:"Die Ausgangsordnung zeigt Alltag, Sicherheit und einen Mangel, der Veränderung nötig macht.",events:"Odysseus’ früherer Alltag auf Ithaka wird kaum ausgespielt. Er erscheint als verlorenes Ziel: Penelope, Telemachos, Laertes, Haus und Königreich.",meaning:"Die gewohnte Welt liegt vor dem Roman und wird aus Sehnsucht und Erinnerung rekonstruiert. Das Modell macht eine Leerstelle sichtbar.",chapters:"Kapitel 1, 4 und 11",workshopPrompt:"Rekonstruiere Odysseus’ gewohnte Welt aus drei späteren Erinnerungen oder Beziehungen. Welcher Mangel bestimmt sie?"},
      {id:"call",number:"02",act:"AUFBRUCH",name:"Ruf zum Abenteuer",fit:"partial",thread:"odysseus",concept:"Ein Ereignis oder innerer Impuls fordert die Figur auf, die vertraute Ordnung zu verlassen.",events:"Der Trojanische Krieg wäre der ursprüngliche Ruf; Lechners Erzählung setzt aber erst nach Trojas Fall ein. Nun ruft nicht das Abenteuer, sondern die Heimkehr.",meaning:"Der Roman beginnt mit einem Helden, dessen erste Reise schon vorbei ist. Der Ruf ist rückwärts gerichtet: fort vom Ruhm, zurück zur Familie.",chapters:"Vorgeschichte und Kapitel 1",workshopPrompt:"Begründe, ob das Ende des Kriegs als neuer Ruf zur Heimkehr gelten kann. Worin unterscheidet er sich vom klassischen Abenteuer?"},
      {id:"refusal",number:"03",act:"AUFBRUCH",name:"Verweigerung des Rufs",fit:"gap",thread:"odysseus",concept:"Angst, Zweifel oder Bindung halten die Figur zunächst davon ab, dem Ruf zu folgen.",events:"Odysseus verweigert die Heimkehr nicht. Er bricht entschlossen auf; später halten Verführung, Stolz, Gefährten und göttliche Mächte ihn auf.",meaning:"Eine Verzögerung ist nicht automatisch eine Verweigerung. Diese fehlende Stufe schützt vor mechanischer Zuordnung.",chapters:"Kapitel 1–3",workshopPrompt:"Nenne zwei Verzögerungen der Heimkehr und erkläre, warum sie keine echte Verweigerung des Rufs sind."},
      {id:"mentor",number:"04",act:"AUFBRUCH",name:"Begegnung mit dem Mentor",fit:"partial",thread:"gods",concept:"Eine erfahrene Figur vermittelt Wissen, Schutz oder ein Werkzeug für die besondere Welt.",events:"Odysseus besitzt nicht den einen Mentor: Hermes schützt vor Kirke, Kirke weist den Weg, Teiresias warnt, Athene lenkt die Heimkehr.",meaning:"Die Mentorenfunktion ist auf mehrere Figuren und Zeitpunkte verteilt. Hilfe ersetzt Odysseus’ eigene Entscheidungen nicht.",chapters:"Kapitel 2, 6–8",workshopPrompt:"Vergleiche zwei Mentorfiguren: Welche Gabe geben sie Odysseus, und wo endet ihre Hilfe?"},
      {id:"threshold",number:"05",act:"AUFBRUCH",name:"Erste Schwelle",fit:"strong",thread:"odysseus",concept:"Mit einer unumkehrbaren Handlung tritt die Figur aus der bekannten in die besondere Welt.",events:"Die Flotte verlässt Troja. Spätestens bei Kikonen, Lotophagen und Kyklopen gelten andere Regeln als im Krieg und auf Ithaka.",meaning:"Der Aufbruch ist räumlich klar; moralisch trägt Odysseus Kriegshandeln und Beutelust zunächst in die neue Welt mit.",chapters:"Kapitel 1",workshopPrompt:"Bestimme den überzeugendsten Schwellenmoment und belege, welche alte Regel danach nicht mehr funktioniert."},
      {id:"tests",number:"06",act:"PRÜFUNG",name:"Bewährungsproben, Verbündete, Feinde",fit:"strong",thread:"gods",concept:"Prüfungen zeigen die Regeln der neuen Welt und ordnen Beziehungen als Hilfe, Widerstand oder Wechselkraft.",events:"Aiolos, Hermes, Kirke und die Phaiaken helfen; Poseidon, Polyphem, Ungeheuer und Wetter widerstehen. Die Gefährten sind zugleich Verbündete und Ursache von Verlusten.",meaning:"Die Rollen sind beweglich. Dieselbe Figur kann helfen und gefährden; Odysseus’ Führung wird ebenso geprüft wie seine List.",chapters:"Kapitel 1–6",workshopPrompt:"Erstelle ein Dreieck aus Helfer, Gegner und wechselhafter Kraft. Zeige an Folgen, weshalb die Rollen nicht bloss Etiketten sind."},
      {id:"approach",number:"07",act:"PRÜFUNG",name:"Vordringen zur tiefsten Höhle",fit:"strong",thread:"gods",concept:"Die Figur nähert sich dem Zentrum ihrer Angst und erkennt äussere sowie innere Gegner klarer.",events:"Odysseus fährt ins Reich der Toten. Teiresias benennt Poseidons Zorn, Helios’ Verbot und die Gefahr im eigenen Haus.",meaning:"Die Metapher wird wörtlich. Das Wissen löst die Gefahr nicht, sondern verschärft Odysseus’ Verantwortung.",chapters:"Kapitel 2 · PDF S. 43–57",workshopPrompt:"Erkläre, welches äussere und welches innere Problem Odysseus nach Teiresias’ Aussage erkennen müsste."},
      {id:"ordeal",number:"08",act:"PRÜFUNG",name:"Entscheidungskampf",fit:"partial",thread:"odysseus",concept:"In der zentralen Krise stirbt eine alte Ordnung symbolisch oder wirklich; die Figur kann nicht unverändert weitergehen.",events:"Nach dem Frevel an Helios’ Rindern vernichtet Zeus Schiff und Mannschaft. Odysseus überlebt allein und verliert seine Rolle als Flottenführer.",meaning:"Der Tiefpunkt folgt einer Entscheidung der Gefährten und göttlicher Strafe. Odysseus’ innere Verwandlung bleibt weniger eindeutig als sein äusserer Verlust.",chapters:"Kapitel 3",workshopPrompt:"Prüfe kritisch: Ist der Schiffbruch Odysseus’ eigener Entscheidungskampf oder vor allem die Folge fremder Entscheidungen?"},
      {id:"reward",number:"09",act:"RÜCKKEHR",name:"Belohnung",fit:"partial",thread:"odysseus",concept:"Nach der Krise gewinnt die Figur Erkenntnis, Anerkennung, einen Gegenstand oder neue Handlungsfähigkeit.",events:"Nach Kalypso und dem letzten Poseidonsturm erhält Odysseus bei den Phaiaken Gastfreundschaft, Gehör, Geschenke und die Überfahrt nach Ithaka.",meaning:"Die Belohnung ist kein Triumphpreis. Erzählen, Anerkanntwerden und Transport ersetzen die verlorene Flotte.",chapters:"Kapitel 6",workshopPrompt:"Unterscheide materielle und immaterielle Belohnung bei den Phaiaken. Welche ist für die Heimkehr entscheidender?"},
      {id:"road",number:"10",act:"RÜCKKEHR",name:"Rückweg",fit:"strong",thread:"ithaka",concept:"Die Figur wendet sich der Ausgangswelt zu; offene Gegner machen die Rückkehr zur neuen Prüfung.",events:"Odysseus ist auf Ithaka, bleibt aber als Bettler verkleidet. Bei Eumaios, Telemachos und im Palast prüft er Loyalitäten und bereitet die Umkehr der Macht vor.",meaning:"Geografisch ist der Rückweg beendet, sozial und politisch beginnt er erst. Heimkehr ohne Anerkennung bleibt unvollständig.",chapters:"Kapitel 7–9",workshopPrompt:"Zeige an zwei Begegnungen, wie die Bettlerverkleidung den Rückweg zugleich verzögert und sicherer macht."},
      {id:"resurrection",number:"11",act:"RÜCKKEHR",name:"Erneuerung und Verwandlung",fit:"strong",thread:"ithaka",concept:"Eine letzte Bewährung zeigt, ob die Figur das Gelernte unter höherem Einsatz wirklich verkörpert.",events:"Bogenprobe, Enthüllung und Kampf stellen Odysseus öffentlich als Hausherrn wieder her. Helfer und Telemachos tragen den Sieg mit.",meaning:"List, Geduld und Bündnisse sind ebenso wichtig wie Kampfkraft. Gewalt allein schafft jedoch noch keinen Frieden.",chapters:"Kapitel 10",workshopPrompt:"Beurteile, woran Odysseus’ Veränderung im Kampf sichtbar wird – und woran er noch dem Krieger von Troja ähnelt."},
      {id:"elixir",number:"12",act:"RÜCKKEHR",name:"Rückkehr mit dem Elixier",fit:"strong",thread:"ithaka",concept:"Die gewonnene Erkenntnis oder Ordnung wirkt über die Hauptfigur hinaus und verändert die zurückgewonnene Welt.",events:"Penelope erkennt Odysseus am Bettgeheimnis, Laertes an Narbe und Bäumen; Athene beendet die drohende Rachespirale und stiftet Frieden.",meaning:"Das Elixier ist kein Gegenstand, sondern erneuerte Beziehung und politische Ordnung. Erst Frieden macht aus persönlicher Rache dauerhafte Heimkehr.",chapters:"Kapitel 10–11",workshopPrompt:"Formuliere Odysseus’ «Elixier» in einem Satz und belege, warum Bett, Bäume und Friedensschluss zusammengehören."}
    ],
    telemachos:[
      "Athene ruft Telemachos aus seiner passiven Lage heraus.",
      "Er überschreitet mit der Reise nach Pylos und Sparta erstmals selbstständig die Grenze Ithakas.",
      "Nestor, Menelaos und Helena geben Rat und Wissen; die Freier planen den Gegenangriff.",
      "Er kehrt gereifter zurück, entgeht dem Hinterhalt und handelt als Verbündeter seines Vaters."
    ],
    tasks:[
      {id:"hj1",phaseIds:["ordinary","call","threshold"],title:"Ordnung oder Erzählung?",prompt:"Erkläre den Unterschied zwischen der zeitlichen Heldenreise und Lechners Erzählreihenfolge. Nenne dabei den Wechsel zu Telemachos oder den Rückblick bei den Phaiaken.",answer:["Heldenreise folgt der zeitlichen Entwicklung","Lechner wechselt zu Telemachos oder erzählt bei den Phaiaken rückblickend"],alternatives:[],hints:["Vergleiche das Nacheinander der Ereignisse mit dem Nacheinander der Kapitel.","Kapitel 4 wechselt nach Ithaka; bei den Phaiaken wird Vergangenes nochmals erzählt."],feedback:"Die Heldenreise ordnet die Entwicklung chronologisch. Lechners Roman erzeugt dagegen Spannung durch Strangwechsel und Rückblicke.",objective:"Erzählordnung unterscheiden",creativeMode:"Chronologie-Labor"},
      {id:"hj2",phaseIds:["tests","approach"],title:"Helfer, Gegner, Wissen",prompt:"Ordne in einem kurzen Text mindestens einen Helfer, einen Gegner und eine Quelle entscheidenden Wissens ein. Erkläre jeweils ihre Wirkung auf die Heimkehr.",answer:["Helfer wie Hermes, Athene, Kirke oder Aiolos","Gegner wie Poseidon, Polyphem, Skylla oder Charybdis","Teiresias vermittelt Wissen über Heimkehr und Helios"],alternatives:[],hints:["Gesucht sind drei verschiedene Funktionen, nicht bloss drei Namen.","Teiresias weiss etwas, Hermes schützt, Poseidon behindert."],feedback:"Die mittlere Phase besteht aus einem Netz unterschiedlicher Funktionen: Hilfe, Widerstand und vorausweisendes Wissen.",objective:"Figurenfunktionen analysieren",creativeMode:"Figurennetz"},
      {id:"hj3",phaseIds:["ordeal","reward"],title:"Vom Tiefpunkt zum Wendepunkt",prompt:"Beschreibe Ursache und Folge des tiefsten Verlusts und erkläre anschliessend, wodurch ein neuer Heimweg möglich wird.",answer:["Gefährten schlachten Helios’ Rinder und Schiff sowie Mannschaft gehen unter","Athene wirkt bei Zeus, Hermes bringt Kalypso den Freilassungsbefehl"],alternatives:[],hints:["Die Krise beginnt mit einem bekannten Verbot.","Der Wendepunkt entsteht durch Fürsprache, Entscheidung und Botschaft der Götter."],feedback:"Die völlige Vereinzelung beendet die Flottenreise; der Götterbeschluss eröffnet Odysseus einen neuen, persönlichen Rückweg.",objective:"Krise und Wendepunkt verbinden",creativeMode:"Ursache-Folge-Protokoll"},
      {id:"hj4",phaseIds:["road","resurrection","elixir"],title:"Identität zurückgewinnen",prompt:"Zeige an drei verschiedenen Beweisen oder Handlungen, wie Odysseus auf Ithaka seine Identität schrittweise zurückgewinnt.",answer:["Narbe oder Argos","Bogenprobe und Enthüllung","Bettgeheimnis oder Bäume des Laertes"],alternatives:[],hints:["Suche ein körperliches Zeichen, eine öffentliche Fähigkeit und privates Wissen.","Eurykleia, die Freier und Penelope erkennen nicht auf dieselbe Weise."],feedback:"Odysseus wird nicht in einem einzigen Moment wieder zum Hausherrn: Körperzeichen, Fähigkeit und geteilte Erinnerung bestätigen verschiedene Seiten seiner Identität.",objective:"Wiedererkennungen vernetzen",creativeMode:"Beweisarchiv"},
      {id:"hj5",phaseIds:["call","threshold","road"],title:"Telemachos’ eigene Reise",prompt:"Erkläre, wie Telemachos sich zwischen Athenes Auftrag und seiner Rückkehr verändert. Belege Anfang, Prüfung und Ergebnis.",answer:["Athene ruft den zunächst unsicheren Telemachos zum Handeln","Reise zu Nestor und Menelaos sowie Gefahr durch die Freier","Er kehrt selbstständiger zurück und handelt mit Odysseus"],alternatives:[],hints:["Nutze die Struktur Ausgangslage – Reise – Rückkehr.","Am Ende besitzt er nicht nur Nachrichten, sondern übernimmt Verantwortung."],feedback:"Telemachos’ Reise ist eine kleinere Heldenreise: Aus dem bedrängten Sohn wird ein handlungsfähiger Verbündeter.",objective:"Figurenentwicklung erklären",creativeMode:"Entwicklungsprofil"},
      {id:"hj6",phaseIds:["refusal","mentor","elixir"],title:"Grenzen des Modells",prompt:"Begründe, weshalb die Heldenreise für Lechners Roman hilfreich ist, aber nicht als starres Schema behandelt werden darf.",answer:["Das Modell macht Entwicklung und Chronologie sichtbar","Lechner nutzt parallele Stränge, Rückblicke und Ereignisse, die nicht exakt in ein starres Schema passen"],alternatives:[],hints:["Nenne einen Nutzen und eine Grenze.","Ein Analysemodell ist eine Lesebrille, nicht der Bauplan des Romans."],feedback:"Das Modell hilft beim Ordnen, darf aber die besondere Erzählweise und widersprüchliche Entscheidungen der Figuren nicht verdecken.","objective":"Modell kritisch anwenden",creativeMode:"Modellkritik"}
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
      {id:"athlete",number:"01",heroStages:"Stufe 1 · Gewohnte Welt",title:"Hauptfigur und vertraute Welt",min:180,prompt:"Entwirf deine Hauptfigur. Beschreibe Sportart, Alter, Alltag, Stärke, Schwäche, wichtiges Verhältnis und die vertraute Ordnung vor dem Aufbruch.",questions:["Was kann die Figur besonders gut?","Wovor hat sie Angst oder was verdrängt sie?","Wer erwartet etwas von ihr?","Was würde sie verlieren, wenn alles unverändert bliebe?"]},
      {id:"call",number:"02",heroStages:"Stufen 2–3 · Ruf und Verweigerung",title:"Ruf, Ziel und Einsatz",min:180,prompt:"Konzipiere den Ruf zum Abenteuer. Lege ein konkretes sportliches Ziel, den inneren Einsatz und einen Grund fest, weshalb die Figur zunächst zögert.",questions:["Welches Ereignis stört die vertraute Ordnung?","Was will die Figur äusserlich erreichen?","Was muss sie innerlich lernen?","Warum kann sie den Ruf nicht einfach annehmen?"]},
      {id:"forces",number:"03",heroStages:"Stufen 4 und 6 · Mentor, Verbündete, Feinde",title:"Helfer, Gegner und Kräfte",min:220,prompt:"Baue ein Beziehungs- und Kräftesystem. Mindestens eine helfende, eine behindernde und eine wechselhafte Kraft müssen vorkommen.",questions:["Wer übernimmt eine Mentorinnen- oder Mentorenrolle?","Ist der Gegner eine Person, ein Team, das Wetter, der Körper oder die eigene Haltung?","Welche Hilfe hat einen Preis?","Welche Figur wechselt ihre Position?"]},
      {id:"trials",number:"04",heroStages:"Stufen 5–7 · Schwelle, Prüfungen, tiefste Höhle",title:"Prüfungen und Steigerung",min:240,prompt:"Plane drei unterschiedliche Prüfungen. Jede soll eine Entscheidung verlangen und die nächste Prüfung verschärfen.",questions:["Welche erste Prüfung unterschätzt die Figur?","Wann funktioniert ihre bisherige Stärke nicht mehr?","Welche Entscheidung belastet eine Beziehung?","Welches Motiv verbindet die drei Prüfungen?"]},
      {id:"crisis",number:"05",heroStages:"Stufen 8–9 · Entscheidungskampf und Belohnung",title:"Krise, Entscheidung und Veränderung",min:240,prompt:"Entwirf den Tiefpunkt und die entscheidende Wahl. Vermeide eine zufällige Wunderrettung: Die Wendung muss aus früheren Erfahrungen, Beziehungen oder Fehlern hervorgehen.",questions:["Was verliert oder riskiert die Figur?","Welche Wahrheit muss sie anerkennen?","Welche verlockende falsche Lösung lehnt sie ab?","Woran wird die innere Veränderung sichtbar?"]},
      {id:"return",number:"06",heroStages:"Stufen 10–12 · Rückweg, Erneuerung, Elixier",title:"Rückkehr und neue Ordnung",min:180,prompt:"Plane das Ende. Entscheide, wie die Figur in ihre Welt zurückkehrt und was sich dort durch ihre Entwicklung verändert.",questions:["Gewinnt sie den Wettkampf – und ist das überhaupt der wichtigste Gewinn?","Welche Beziehung wird neu geordnet?","Welches Bild vom Anfang kehrt verändert wieder?","Welche Frage darf am Ende offenbleiben?"]}
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
      if(q.type==="order")q.instruction="Bringe alle Ereignisse mit den Pfeilen in die richtige zeitliche Reihenfolge.";
      else if(q.answer&&typeof q.answer==="object"&&!Array.isArray(q.answer))q.instruction="Schreibe jede Zuordnung in einer eigenen Zeile nach dem Muster «Figur – Bezug».";
      else if(Array.isArray(q.answer))q.instruction="Nenne alle verlangten Punkte. Du kannst sie mit Kommas trennen oder in ganzen Sätzen formulieren.";
      else if(String(q.answer).trim().split(/\s+/).length<=3)q.instruction="Ein passender Begriff oder Name genügt. Rechtschreibvarianten und Synonyme werden akzeptiert.";
      else q.instruction="Antworte in 1–3 klaren Sätzen. Nenne die verlangten Ursachen, Handlungen oder Folgen ausdrücklich.";
      q.creativeMode=q.type==="order"?"Rekonstruktion":creativeModes[(stationIndex+taskNumber)%creativeModes.length];
    });
  });

  const teiresiasInterrogations = [
    {id:"poseidon",title:"I · Der Zorn des Meeres",source:"PDF-Seite 48 (Rückbezug: Seiten 27–29)",opening:"Sterblicher … frage nach dem Zorn, der über dem Meer liegt.",guide:"Frage, weshalb Poseidon Odysseus verfolgt und welche Rolle Polyphem spielt.",terms:["poseidon","polyphem","zyklop","auge","zorn","fluch","meer"],answer:"Poseidon hemmt die Heimkehr, weil Odysseus seinen Sohn Polyphem geblendet hat. Der Fluch des Kyklopen macht aus dem Meer einen Gegner. Doch höre genau: Nicht jedes Unglück ist blindes Schicksal. Odysseus hat durch seinen stolzen Namensruf dem Rachewunsch erst ein Ziel gegeben."},
    {id:"helios",title:"II · Das verbotene Vieh",source:"PDF-Seite 48",opening:"Ich sehe eine sonnendurchglühte Insel … und Hunger, der lauter spricht als Vernunft.",guide:"Frage nach Thrinakia, den Rindern des Helios und der verlangten Selbstbeherrschung.",terms:["helios","rinder","vieh","thrinakia","hunger","verbot","beherrschen","enthaltsam"],answer:"Nur wenn Odysseus und seine Gefährten auf Thrinakia ihre Begierde bezwingen und das Vieh des Helios unberührt lassen, bleibt Heimkehr möglich. Schlachten sie es, gehen Schiff und Gefährten zugrunde; Odysseus kann spät, allein und auf einem fremden Schiff heimkehren. Die Weissagung warnt – sie zwingt die Männer nicht zum Frevel."},
    {id:"heimkehr",title:"III · Das besetzte Haus",source:"PDF-Seite 48",opening:"Hinter dem letzten Horizont wartet kein stilles Haus … sondern ein Saal voller Zehrer.",guide:"Frage nach der verspäteten Heimkehr, den Freiern und dem Frieden danach.",terms:["heimkehr","ithaka","freier","haus","palast","kampf","frieden","spat","allein"],answer:"Die Heimat wird erreicht, doch spät und unter Schmerzen. Im Haus verzehren Freier Odysseus’ Gut und bedrängen Penelope. Darum endet die Reise nicht beim Anlanden: Erst nach dem Kampf gegen die Freier kann Frieden folgen. Heimkehr bedeutet hier, Ordnung und Identität zurückzugewinnen."},
    {id:"blut",title:"IV · Stimmen ohne Körper",source:"PDF-Seiten 45–50",opening:"Die Toten haben keinen Atem … Blut leiht ihrer Erinnerung für einen Augenblick eine Stimme.",guide:"Frage nach dem Opferritual, dem Blut oder der Begegnung mit Antikleia.",terms:["blut","opfer","ritual","tote","antikleia","mutter","korper","stimme","sprechen"],answer:"Kirke befiehlt das Opfer; Teiresias erklärt, dass nur jene Schatten sprechen und erkennen, denen Odysseus vom Blut zu trinken erlaubt. Antikleia berichtet danach von Penelopes Treue, Telemachos, Laertes und ihrem eigenen Tod aus Sorge. Das ist wichtig: Ihre Familiennachrichten stammen von Antikleia – nicht aus meiner Weissagung."},
    {id:"agamemnon",title:"V · Die mörderische Heimkehr",source:"PDF-Seiten 51–52",opening:"Nicht jede Heimkehr öffnet eine treue Tür … zuweilen wartet das Messer am Gastmahl.",guide:"Frage, was Agamemnons Schicksal Odysseus über Heimkehr und Vertrauen lehrt.",terms:["agamemnon","aigisthos","klytaimnestra","mord","vertrauen","gastmahl","warnung"],answer:"Agamemnon erzählt selbst, wie Aigisthos und Klytaimnestra ihn bei der Heimkehr ermorden liessen. Sein Bericht ist keine Weissagung des Teiresias, sondern eine warnende Gegenstimme aus dem Totenreich: Heimkehr allein schafft noch keine Sicherheit; Odysseus muss sein Haus zunächst unerkannt prüfen."},
    {id:"ruhm",title:"VI · Ruhm im Schattenreich",source:"PDF-Seiten 52–54",opening:"Glänzender Ruhm wird im Reich der Schatten kalt … und alter Groll schweigt länger als ein Leben.",guide:"Frage nach Achilleus’ Urteil über Leben und Tod oder nach Aias’ Schweigen.",terms:["achilleus","aias","ajax","ruhm","ehre","leben","tod","schweigen","groll"],answer:"Achilleus sagt selbst, er wäre lieber ein armer Knecht unter Lebenden als Herrscher über die Toten. Aias dagegen verweigert Odysseus aus altem Groll jedes Wort. Beide Begegnungen widersprechen einem einfachen Heldenruhm: Der Tod entzaubert Ruhm, und ungeklärte Kränkung überdauert sogar das Leben. Diese Stimmen gehören Achilleus und Aias – ich deute nur ihre Spur."}
  ];

  const srfTheory = {
    sourceUrl:"https://www.srf.ch/kultur/literatur/die-route-der-odysee-die-irrfahrt-wo-war-odysseus-eigentlich",
    mapImage:"https://www.srf.ch/static/cms/images/960w/dea0c3.jpg",
    wolfImage:"https://www.srf.ch/static/cms/images/480w/233c05.webp",
    method:[
      {n:"01",title:"Textdaten sammeln",text:"Armin Wolf liest nautische Angaben: Himmels- und Windrichtungen, Segeln oder Rudern sowie genannte Reisetage und Fahrtdauern."},
      {n:"02",title:"Geometrisches Muster",text:"Kräftiger Wind ergibt lange Geraden, Ruderfahrt kurze Strecken. Aus diesen Relationen entsteht zunächst eine abstrakte Route."},
      {n:"03",title:"Mit Realität abgleichen",text:"Das Muster wird von Troja aus über das Mittelmeer gelegt und danach mit Strömungen, Küstenformen, Natur, Kultur und Archäologie verglichen."}
    ],
    wolfPlaces:[
      {name:"Troja",place:"bei Çanakkale, Türkei",claim:"Realer Ausgangspunkt an den strategisch wichtigen Dardanellen.",evidence:"Ortsname und Ruinen sind lokalisierbar."},
      {name:"Lotophagen",place:"Djerba, Tunesien",claim:"Nordwind und Strömung könnten die Schiffe nach Nordafrika versetzt haben.",evidence:"Dattelwein wird als mögliche Spur zur vergessensstiftenden Lotusfrucht gelesen."},
      {name:"Kyklopen",place:"Kerkennah und Matmata",claim:"Die Strömung führt von Djerba zu einer niedrigen Insel vor einem höhlenreichen Festland.",evidence:"Höhlenwohnungen und Ziegenhaltung erinnern an einzelne Textmerkmale."},
      {name:"Aiolos",place:"Malta / Marsaxlokk",claim:"Klippen, ein südöstlicher Hafen und die mögliche direkte Westwindfahrt nach Ithaka stützen Wolfs Zuordnung.",evidence:"Homerische Mauer- und Hafenmerkmale werden mit Maltas Südküste verglichen."},
      {name:"Laistrygonen",place:"Mozia bei Marsala",claim:"Ruderfahrt und Westdrift führen zu einer flachen Hafenbucht mit phönizischen Ruinen.",evidence:"Die lokale Thunfischjagd mit Lanzen wird als kulturelle Parallele gedeutet."},
      {name:"Kirke / Aiaia",place:"Ustica",claim:"Von Mozia nordöstlich liegt Ustica als einzige Insel der Region weit im Meer.",evidence:"Lage und Inselcharakter entsprechen ausgewählten Angaben der Dichtung."},
      {name:"Hades",place:"Himera, Sizilien",claim:"Zwei Flüsse münden nahe einer antiken Kultstätte zusammen.",evidence:"Wolf deutet den Hades möglicherweise als Kult- und Opferplatz statt als geografische Unterwelt."},
      {name:"Sirenen",place:"Capo Peloro",claim:"Eine gefährliche Küste vor der Strasse von Messina könnte hinter der Sirenenepisode stehen.",evidence:"Abstandsregeln und Überlieferungen über ausgeraubte Strandungen bilden reale Gefahren."},
      {name:"Skylla, Charybdis, Helios",place:"Strasse von Messina",claim:"Zwei Meere erzeugen Strudel, Wellen und starke Gezeitenströme.",evidence:"Scilla als Ortsname und die riskante Meerenge passen besonders deutlich."},
      {name:"Kalypso / Ogygia",place:"Liparische Inseln",claim:"Von Griechenland aus liegt Ogygia laut dieser Lesart hinter, also nördlich der Meerenge.",evidence:"Wolf widerspricht damit der touristischen Zuordnung zu Gozo, bleibt hier aber selbst besonders unsicher."},
      {name:"Phaiaken",place:"Kalabrien",claim:"Schérie werde als Festland beschrieben; Kalabrien liege zwischen zwei Meeren und gleiche einem Schild.",evidence:"Küstenform, Wortdeutung und direkte Fahrtmöglichkeit nach Ithaka werden kombiniert."},
      {name:"Ithaka",place:"Ithaka / Kefalonia",claim:"Kefalonia verdeckt bei der Anfahrt aus Kalabrien die Sicht auf Ithaka.",evidence:"Die Nachbarinsel besitzt zudem mehr archäologische Funde; selbst das Ziel bleibt daher Teil der Debatte."}
    ],
    videos:[
      {title:"Von der Türkei nach Djerba",urn:"urn:srf:video:1ba522bc-ba95-45fa-866e-4ae3e03a8b71",focus:"Troja, Aufbruch, Wind und Fehlkurs"},
      {title:"Von Tunesien nach Malta",urn:"urn:srf:video:e5e202a2-e775-4758-8bdf-0fb1896ef7b6",focus:"Lotophagen, Höhlenräume und Aiolos"},
      {title:"Von Malta nach Sizilien",urn:"urn:srf:video:0ff58db5-3aad-4029-b721-4b10a21821b1",focus:"Häfen, Strömung und Laistrygonen"},
      {title:"Via Palermo auf die Insel Ustica",urn:"urn:srf:video:a1016772-26bf-4685-ba35-99bcac047cb9",focus:"Kirke, Inselraum und mögliche Kultorte"},
      {title:"Durch den Stretto di Messina auf Lipari",urn:"urn:srf:video:8201eda5-d3ee-47c7-8772-3a4e49d1e712",focus:"Sirenen, Skylla, Charybdis und Kalypso"},
      {title:"Durch Kalabrien auf die Insel Ithaka",urn:"urn:srf:video:aafe24b7-a34c-424f-95f4-40757a17137f",focus:"Phaiakenland, letzte Überfahrt und Heimat"}
    ],
    alternatives:[
      {name:"Victor Bérard",date:"1927–1929",route:"Phönizische Seewege im Mittelmeer",method:"Er behandelt Homers Dichtung als relativ genaue Erinnerung an Seerouten, erklärt Widersprüche aber teilweise mit Ungenauigkeiten Homers."},
      {name:"Ernle Bradford",date:"1963",route:"Ersegelte Mittelmeerroute",method:"Der frühere Navigator prüfte Fahrtleistung, Zeit- und Streckenangaben während eigener jahrelanger Segelreisen."},
      {name:"Felice Vinci",date:"1995",route:"Baltikum und Skandinavien",method:"Ortsnamen und eine angenommene Migration sollen nördliche Mythen nach Griechenland gebracht haben."},
      {name:"Mertz / Petrides",date:"1964 / 1994",route:"Atlantik bis Nordamerika",method:"Golfstrom und Fernfahrt werden zur These verbunden, Griechen hätten Amerika erreicht; die Deutung ist besonders spekulativ."}
    ],
    tasks:[
      {id:"srf-method",title:"Vom Vers zur Koordinate",prompt:"Erkläre Wolfs drei Arbeitsschritte und nenne bei jedem Schritt eine mögliche Fehlerquelle.",min:160},
      {id:"srf-evidence",title:"Indiz oder Beweis?",prompt:"Wähle zwei der zwölf Orte. Ordne die jeweiligen Argumente als Textindiz, Naturbeobachtung, Namensähnlichkeit, Kulturparallele oder Archäologie ein. Begründe, weshalb daraus noch kein Beweis entsteht.",min:200},
      {id:"srf-tourism",title:"Mythos als Standortwerbung",prompt:"Vergleiche eine touristische Tradition wie Gozo, Korfu oder die Zyklopenküste mit Wolfs Methode. Welche Interessen und welche Belege wirken jeweils?",min:170},
      {id:"srf-video",title:"Reisebeobachtung",prompt:"Sieh mindestens eine SRF-Folge. Notiere eine Beobachtung zu Landschaft oder Seefahrt und verknüpfe sie mit einer konkreten Stelle aus Lechner.",min:180},
      {id:"srf-theses",title:"Vier Karten, vier Odysseen",prompt:"Vergleiche Wolf mit einer alternativen Route. Welche Annahme steuert jeweils das Ergebnis, und welche These wirkt nachvollziehbarer?",min:190},
      {id:"srf-verdict",title:"Urteil der Kartenkammer",prompt:"Formuliere ein begründetes Schlussurteil: Soll man die Irrfahrt überhaupt auf einer modernen Karte festlegen? Trenne literarischen Nutzen von historischer Gewissheit.",min:220},
      {id:"voss-process",title:"Vom griechischen Epos zu Voß",prompt:"Erkläre die Überlieferungskette von der mündlichen Dichtung über den griechischen Text bis zu Voß’ deutscher Hexameterübersetzung. Wo entstehen Veränderungen?",min:220},
      {id:"voss-language",title:"Übersetzen heisst entscheiden",prompt:"Untersuche am Beginn «Sage mir, Muse …» Wortstellung, Rhythmus und ältere Schreibweisen. Was gewinnt und was erschwert Voß’ formnahe Übersetzung?",min:180}
    ],
    related:[
      {title:"SRF-Audio: «The Odyssey» – Fantasydrama mit Starbesetzung",url:"https://www.srf.ch/play/radio/redirect/detail/urn:srf:audio:278847c2-9763-4f72-8f82-80dbb5f34de9",kind:"Audio · 4:41"},
      {title:"Ithaka – wo liegt Odysseus’ wahre Heimat?",url:"https://www.srf.ch/sendungen/reisegeschichten/reisegeschichten-ithaka-wo-liegt-odysseus-wahre-heimat",kind:"Vertiefung"},
      {title:"Die Odyssee animiert",url:"https://www.srf.ch/school?search=Die%20Odyssee%20animiert",kind:"SRF school"},
      {title:"IMAX, Mythen, Megacast: «The Odyssey»",url:"https://www.srf.ch/kultur/film-serien/neu-im-kino-imax-mythen-megacast-the-odyssey-setzt-massstaebe",kind:"Filmbezug"}
    ]
  };

  const podcastLab = {
    title:"Tatort Geschichte: Odysseus unter Verdacht",
    intro:"Zwei True-Crime-Podcasts prüfen nicht nur, was Odysseus erlebt, sondern was er selbst tut. Das Labor behandelt die Folgen als deutende Sekundärquellen: Jede Behauptung muss am gelesenen Text kontrolliert werden.",
    contentNote:"Die Folgen behandeln Krieg, Tötungen, sexualisierte Macht, Täuschung und Rache. Die Aufgaben verlangen keine anschauliche Wiedergabe von Gewalt. Wer eine Szene nicht nochmals hören möchte, darf mit Buchbelegen und den Leitfragen arbeiten.",
    listeningRules:[
      "Podcastaussagen werden als These notiert, nicht als historische Tatsache.",
      "Zu jeder Bewertung gehört ein konkreter Beleg aus Lechner oder Voß.",
      "Erklären bedeutet nicht entschuldigen; verurteilen ersetzt keine Textanalyse.",
      "Göttlicher Auftrag, antike Norm und heutiges Urteil werden getrennt betrachtet."
    ],
    episodes:[
      {id:"dark",number:"1/2",title:"Die dunkle Seite eines Helden",duration:"51:21",src:"assets/media/podcast-odysseus-dunkle-seite.mp3",lens:"Held, Täter, Überlebender?",spoiler:"Bezieht sich auf Odysseus’ Handlungen und Entscheidungen über die gesamte Irrfahrt.",before:"Notiere vor dem Hören drei Eigenschaften, die für dich einen Helden ausmachen. Welche davon erfüllt Odysseus – welche nicht?",during:"Führe ein Hörprotokoll mit Zeitmarke, Podcastthese, genanntem Beleg und deiner vorläufigen Prüfung am Buch.",after:"Formuliere ein differenziertes Urteil, das mindestens eine entlastende und eine belastende Perspektive berücksichtigt."},
      {id:"revenge",number:"2/2",title:"Heimkehr eines Rächers",duration:"53:05",src:"assets/media/podcast-odysseus-heimkehr-raecher.mp3",lens:"Recht, Rache oder Wiederherstellung?",spoiler:"Verrät Bogenprobe, Tötung der Freier, Bestrafungen und den abschliessenden Friedensschluss.",before:"Lege Kriterien fest, nach denen Vergeltung gerecht oder ungerecht sein könnte: Schuld, Verfahren, Verhältnismässigkeit und Alternativen.",during:"Trenne im Hörprotokoll Odysseus’ Motive, Athenes Plan, das Verhalten der Freier und die Stimme des Podcasts.",after:"Beurteile, ob die Heimkehr Recht wiederherstellt oder eine neue Gewaltspirale eröffnet. Beziehe Athenes Friedensschluss ein."}
    ],
    tasks:[
      {id:"pod-dark-before",episode:"dark",phase:"VOR DEM HÖREN",title:"Heldenmassstab",prompt:"Bearbeite den Vorbereitungsauftrag der Folge. Formuliere einen eigenen Heldenbegriff, bevor der Podcast dein Urteil beeinflusst.",min:150},
      {id:"pod-dark-log",episode:"dark",phase:"WÄHREND DES HÖRENS",title:"These – Beleg – Prüfung",prompt:"Dokumentiere mindestens drei Aussagen mit Zeitmarke. Nenne den Podcastbeleg und prüfe jede Aussage an einer konkreten Buchstelle.",min:320},
      {id:"pod-dark-perspective",episode:"dark",phase:"NACH DEM HÖREN",title:"Wer erzählt den Helden?",prompt:"Welche Perspektiven erhalten im Podcast Gewicht, welche Figuren bleiben eher stumm? Erkläre, wie dieser Fokus das Odysseusbild verändert.",min:220},
      {id:"pod-dark-verdict",episode:"dark",phase:"NACH DEM HÖREN",title:"Ambivalentes Urteil",prompt:"Ist «Held» für Odysseus eine Beschreibung, eine Wertung oder beides? Formuliere ein Urteil mit belastendem und entlastendem Textbeleg.",min:260},
      {id:"pod-revenge-before",episode:"revenge",phase:"VOR DEM HÖREN",title:"Kriterien der Gerechtigkeit",prompt:"Definiere Schuld, Verfahren, Verhältnismässigkeit und mögliche Alternativen als Kriterien für dein späteres Urteil.",min:180},
      {id:"pod-revenge-log",episode:"revenge",phase:"WÄHREND DES HÖRENS",title:"Vier Stimmen auseinanderhalten",prompt:"Halte mit Zeitmarken fest, was Odysseus will, was Athene lenkt, was die Freier getan haben und wie der Podcast diese Ebenen bewertet.",min:320},
      {id:"pod-revenge-law",episode:"revenge",phase:"NACH DEM HÖREN",title:"Rache ohne Gericht",prompt:"Prüfe Bogenprobe und Freierkampf an deinen vier Kriterien. Berücksichtige antike Hausordnung, göttliche Legitimation und eine heutige Perspektive getrennt.",min:280},
      {id:"pod-revenge-peace",episode:"revenge",phase:"NACH DEM HÖREN",title:"Warum braucht es Athene?",prompt:"Erkläre, weshalb der Sieg im Palast die Geschichte noch nicht beendet. Was zeigt der Friedensschluss über die Grenzen persönlicher Rache?",min:220},
      {id:"pod-synthesis",episode:"both",phase:"ABSCHLUSS",title:"Anklage, Verteidigung, Urteil",prompt:"Verfasse eine dreiteilige Schlussakte: stärkste Anklage gegen Odysseus, stärkste Verteidigung und ein abgewogenes Urteil. Verwende beide Podcasts und mindestens vier Buchbelege.",min:500}
    ]
  };

  return {threads,chapters,characters,locations,events,stations,achievements,finalPuzzle,mediaResource,heroJourney,writingProject,teiresiasInterrogations,srfTheory,podcastLab};
})();
