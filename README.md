# Die verlorenen Spuren des Odysseus

Ein konto- und serverfreier Foxtrail zur Lektüre von Auguste Lechners
«Die Abenteuer des Odysseus».

Der vollständige Trail umfasst 28 individuell ausgearbeitete Handlungsorte mit
84 offenen Text- und Rekonstruktionsaufgaben.

## Athenes Eulen

Die Eulen sind ausschliesslich Spielpunkte. Denkhinweise kosten gestaffelt 1, 2 und
3 Eulen; die genaue Leseorientierung ist der dritte Hinweis. Richtige Lösungen,
Erstversuche, hinweisfreie Lösungen, Serien, Stationsabschlüsse und Abzeichen bringen
Eulen ein. Ein anklickbares Konto in der Kopfleiste zeigt Tarife, Serien und die
letzten Buchungen. Es gibt weder echtes Geld noch eine spielerische Sackgasse.

## Kreatives Schreibprojekt

Das Abschlussatelier «Die Heldenreise eines Sportlers» führt durch sechs verbindliche
Planungsphasen: Hauptfigur, Ruf, Kräftefeld, Prüfungen, Krise und Rückkehr. Jeder
ausgearbeitete Schritt schaltet den nächsten frei und bringt Eulen. Danach entsteht
eine vollständige Erzählung von 900 bis 1500 Wörtern. Der Abschluss setzt mindestens
900 Wörter und eine bestätigte achtteilige Redaktionskonferenz voraus. Planung und
Text werden lokal gespeichert und können als UTF-8-Textdatei exportiert werden.

## Start

`index.html` direkt im Browser öffnen. Alternativ im Ordner einen einfachen lokalen
Webserver starten:

```bash
python3 -m http.server 8080
```

Danach `http://localhost:8080` öffnen. Der Spielstand liegt ausschliesslich im
`localStorage` des Browsers.

## Inhalte ergänzen

Alle Lerninhalte stehen in `data.js`. Eine neue Station benötigt einen eindeutigen
`id`, einen Handlungsort, thematische Spuren, Metadaten zu Kapitel, PDF-Seite und
Strang sowie drei Aufgaben. Unterstützt werden offene `text`-Aufgaben und kreative
`order`-Rekonstruktionen. Multiple Choice wird bewusst nicht verwendet. Jede Aufgabe
enthält Lösungsideen, alternative Formulierungen, Hinweise, Feedback, Schwierigkeit
und Lernziel.

Nach Änderungen ausführen:

```bash
node tests.mjs
```

Der Test prüft IDs, Mindestumfang, Quellenangaben, Hinweise, Lösungen und die
Verknüpfung aller Stationen.

## Multimedia-Spur

Unter `assets/media/` liegen das ergänzende Video «Homers Odyssee – Die Geschichte
dahinter» und sein automatisch erzeugtes Transkript. Die Video-Spur enthält fünf
offene Beobachtungs- und Vergleichsaufträge. Notizen werden wie der Spielstand lokal
gespeichert. Das Video dient als Kontextquelle; für Aussagen über Auguste Lechners
Nacherzählung bleiben Kapitel und PDF-Seiten des Buchs verbindlich.

Die Ressourcenleiste am Seitenanfang öffnet ausserdem die lokale Buch-PDF und die
verlinkte Hörbuch-Ressource in jeweils einem neuen Tab.
