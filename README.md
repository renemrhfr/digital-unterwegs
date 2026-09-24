# Digital unterwegs

Eine Lern-App für Menschen mit wenig digitaler Erfahrung: Windows-Computer und Android-Handy von den Grundlagen bis zu Online-Banking, Amazon, FinanzOnline und dem Erkennen von Betrug. Geübt wird direkt an nachgebauten Bildschirmen.

## Lokal starten

Voraussetzung: Node.js (aktuelle LTS-Version). Keine Paketinstallation notwendig.

```sh
npm run dev
```

Öffne http://localhost:5173. Der Entwicklungsserver ist absichtlich nur auf dem eigenen Computer erreichbar. Alternativ die öffentlichen Dateien mit einem beliebigen statischen Webserver bereitstellen. `index.html` nicht direkt über `file://` öffnen, weil die App JavaScript-Module verwendet.

## Konzept

Zielgruppe sind Menschen zwischen 50 und 70 mit Windows-Computer und Android-Handy. Nach allen Lektionen sollen sie E-Mails schreiben, Online-Banking nutzen, bei Amazon bestellen, FinanzOnline verwenden und Betrugsversuche selbst erkennen.

- 25 Lektionen in 6 Kapiteln, frei wählbar. Jede Lektion ist eine Folge von Schritten:
  - **Erklärung** (`show`): kurzer Text, optional mit nachgebautem Bildschirm und nummerierten Markierungen.
  - **Klick-Aufgabe** (`tap`): direkt im nachgebauten Bildschirm auf die richtige Stelle klicken oder tippen. Falsche Stellen erklären, was sie tun. Nach einem Fehlversuch zeigt „Zeig mir die Stelle“ das Ziel. Doppelklick-Aufgaben üben den echten Doppelklick.
  - **Frage** (`ask`): Antwort wählen, jede Antwort erklärt ihre Folge.
  - **Schreib-Aufgabe** (`type`): Text in ein Feld im Bildschirm tippen (E-Mail-Adresse mit @, IBAN, Code …).
- Am Ende jeder Lektion eine kurze Zusammenfassung. Alle Zusammenfassungen plus wichtige Notrufnummern stehen auf dem druckbaren **Spickzettel**.
- Fredi Knödelmayer taucht nur gezielt auf: als Reaktion auf richtige und falsche Antworten und mit einem eigenen Satz an einzelnen passenden Stellen (`fredi: [stimmung, text]`).
- Schrift lässt sich oben vergrößern. Fortschritt bleibt lokal unter `digital-unterwegs-v2` im Browser, ohne Konto, Tracking oder externe Abhängigkeiten.
- Die Adresse jeder Seite ist ein Hash (`#/l/<lektion>/<schritt>`), damit die Zurück-Taste des Browsers funktioniert.

## Lektionen

1. **Der Computer:** Die Maus · Die Tastatur · Startmenü und Fenster · Dateien, Downloads und PDF
2. **Das Handy:** Tippen, wischen, zurück · Die obere Leiste · Einstellungen · Apps installieren · WhatsApp: Fotos und Sprachnachrichten
3. **Internet und Konten:** Adresse und Suche · Konto und Passwort · Passwort vergessen · Bestätigung am Handy
4. **E-Mail:** Das E-Mail-Postfach · Eine E-Mail schreiben · Echt oder Betrug?
5. **Alltag erledigen:** Bei Amazon bestellen · Online-Banking · Eine Rechnung überweisen · FinanzOnline und ID Austria
6. **Betrug erkennen:** Falsche SMS und WhatsApp · Falsche Anrufe · Falsche Shops und Abo-Fallen · Verkaufen auf willhaben · Wenn es doch passiert ist

## GitHub Pages

Der Workflow `.github/workflows/pages.yml` veröffentlicht nur die öffentlichen Dateien. Kein Build und keine Zugangsdaten in der Anwendung erforderlich. Relative Asset-Pfade funktionieren auch bei einer Projekt-URL wie `https://NAME.github.io/REPOSITORY/`.

1. Repository bei GitHub erstellen und diese Dateien auf den Branch `main` übertragen.
2. Im Repository unter **Settings → Pages → Build and deployment → Source** die Option **GitHub Actions** wählen.
3. Auf `main` pushen oder unter **Actions → Publish to GitHub Pages → Run workflow** starten.
4. Nach erfolgreichem Lauf zeigt GitHub die veröffentlichte URL im Environment `github-pages`.

Die lokale Erstellung des Projekts bedeutet noch keine Veröffentlichung. Das Ziel-Repository muss vorhanden und für den ausführenden Account zugänglich sein.

## Aufbau und Beiträge

- `index.html`: Einstieg und Metadaten
- `style.css`: Oberfläche, nachgebaute Bildschirme, responsive Layouts, Druckansicht
- `app.js`: Navigation, Lernablauf, Auswertung der Aufgaben und Speicherung
- `screens.js`: nachgebaute Windows- und Android-Bildschirme aus Inhaltsblöcken
- `icons.js`: Symbole und Text-Hilfsfunktionen
- `lessons/*.js`: ein Kapitel pro Datei; `lessons/ui.js` enthält wiederkehrende Bildschirme (Gmail, Amazon, Bank, FinanzOnline …)
- `assets/fredi-*.jpg`: Fredis sechs Gesichtsausdrücke (aus `assets/fredi-expressions.png` zugeschnitten)
- `server.mjs`: kleiner lokaler Entwicklungsserver; wird nicht veröffentlicht

Ein Bildschirm ist ein Objekt mit `device` (`pc`, `phone` oder `none`), einer Ansicht (`view`) und einer Liste von Blöcken (`body`). Jeder Block mit `id` wird in Klick-Aufgaben antippbar. Bedienelemente wie Startknopf, Fensterknöpfe, Adresszeile oder die Handy-Tasten haben feste IDs und eine Standard-Erklärung (`CHROME_INFO` in `screens.js`).

Beispiel einer Klick-Aufgabe:

```js
{
  tap: 'Das Fenster soll kurz aus dem Weg, aber offen bleiben.',
  screen: news(),
  answer: 'win-min',
  ok: 'Das Fenster liegt jetzt unten in der Taskleiste.',
  wrong: { 'win-close': 'Das X schließt das Fenster ganz.' }
}
```

Bei Fragen ist `options` eine Liste aus `[Text, richtig, Erklärung]`; die Reihenfolge wird gemischt, außer bei `keepOrder: true`.

Für Beiträge: konkrete Alltagsaufgaben, echte Handlungen als Antworten, keine absurden Ablenker, keine Werbesprüche. Feedback erklärt die Folge der Entscheidung. Keine echten Zugangsdaten oder anklickbaren Betrugslinks. Lektions-IDs stabil halten, damit gespeicherter Fortschritt zugeordnet bleibt.

## Inhaltliche Quellen

Fachlicher Abgleich am 19. September 2026 mit österreichischen Stellen:

- [Bundeskanzleramt: onlinesicherheit.gv.at](https://www.onlinesicherheit.gv.at/)
- [oesterreich.gv.at: ID Austria](https://www.oesterreich.gv.at/id-austria)
- [Bundeskriminalamt: Betrug verhindern](https://www.bundeskriminalamt.at/202/Betrug_verhindern/)
- [BMF: Anmeldung, Rücksetzen und Abmeldung bei FinanzOnline](https://www.bmf.gv.at/services/finanzonline/informationen-fuer-buerger/anmeldung-buerger.html)
- [Gesundheitsportal: ELGA und e-Medikation](https://www.gesundheit.gv.at/gesundheitsleistungen/elga/e-medikation.html)
- [Watchlist Internet: aktuelle Betrugswarnungen](https://www.watchlist-internet.at/)

Die Übungen sind eigenständig formuliert und verwenden echte Dienstnamen wie Google, Amazon, WhatsApp, PayPal und ÖBB zur Orientierung. Der allgemeine Wiederherstellungsablauf zeigt einen Beispiel-Shop und ein nachgestelltes Gmail-Postfach; er behauptet keinen einheitlichen Ablauf für alle Shops. Banken und Behörden verwenden unterschiedliche Wiederherstellungsverfahren; „immer per Brief“ wäre falsch.

## Prüfung

Wie gewünscht gibt es keine automatisierten Test-Suites. `npm run check` prüft lediglich die JavaScript-Syntax aller Dateien. Die Benutzeroberfläche wird manuell im Browser geprüft.

## Lizenz

MIT, siehe `LICENSE`.
