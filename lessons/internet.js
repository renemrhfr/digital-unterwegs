import { pcBrowser, googleStart, googleResults, amazon, amazonLogin, gmailPC, INBOX, phoneApp, whatsappChat, smsChat } from './ui.js';

const oebbResults = () => googleResults('öbb tickets', [
  { id: 'res-ad', ad: true, url: 'oebb-tickets-guenstig.com', title: 'ÖBB Tickets – Jetzt günstig buchen', text: 'Zugtickets für ganz Österreich. Sofort per E-Mail. Servicegebühr gilt.' },
  { id: 'res-oebb', url: 'www.oebb.at › tickets', title: 'Tickets kaufen – ÖBB', text: 'Zugtickets online kaufen, Sparschiene, Vorteilscard und Fahrplanauskunft.' },
  { id: 'res-wiki', url: 'de.wikipedia.org › wiki › ÖBB', title: 'Österreichische Bundesbahnen – Wikipedia', text: 'Die Österreichischen Bundesbahnen (ÖBB) sind die staatliche Eisenbahngesellschaft …' }
]);

const approval = (device, place, extra = {}) => phoneApp('default', 'Google', [
  { center: [
    { h: 'Versuchst du gerade, dich anzumelden?', size: 'l' },
    { kv: [['Gerät', device], ['Ort', place], ['Zeit', 'Gerade eben']] }
  ] },
  { btn: 'Nein, ich bin es nicht', id: 'no', style: 'secondary', full: true },
  { btn: 'Ja, ich bin es', id: 'yes', full: true }
], { noBack: true, menu: false, sub: 'fredi.knoedelmayer@gmail.com', ...extra });

export default {
  title: 'Internet und Konten',
  goal: 'Seiten finden, Adressen lesen, sicher anmelden',
  lessons: [
    {
      id: 'browser',
      title: 'Adresse und Suche',
      goal: 'Die richtige Seite finden und Adressen lesen',
      summary: [
        'Kennst du die Adresse, tippst du sie **selbst in die Adresszeile**.',
        'Bei Suchergebnissen ist „**Gesponsert**“ Werbung. Auf die Adresse darüber achten.',
        'Wem gehört eine Adresse? Vor dem ersten **/** stehen die entscheidenden **letzten zwei Teile**: www.**amazon.de**/…',
        'Cookie-Fragen: „Ablehnen“ oder „Nur notwendige“ ist in Ordnung.'
      ],
      steps: [
        {
          show: 'Der Browser',
          text: 'Der **Browser** ist das Programm für das Internet. Am Computer heißt er **Edge**, am Handy meist **Chrome**. Beide funktionieren gleich.',
          screen: googleStart(),
          marks: { 'nav-back': 1, address: 2, 'tab-new': 3, 'g-search': 4 },
          legend: [
            '**Zurück:** zur vorherigen Seite.',
            '**Adresszeile:** zeigt, wo du gerade bist. Hier tippst du auch eine Adresse ein.',
            '**Neuer Tab:** eine zweite Seite öffnen, ohne die erste zu schließen.',
            '**Google-Suche:** wenn du die Adresse nicht kennst.'
          ]
        },
        {
          type: 'Du kennst die Adresse der ÖBB. Tippe sie in die Adresszeile: oebb.at',
          screen: googleStart(),
          field: 'address',
          expect: ['oebb.at', 'www.oebb.at'],
          help: 'Danach würdest du **Enter** drücken. Hier genügt „Prüfen“.',
          ok: 'Mit Enter kommst du direkt zur Seite. Wenn du die Adresse kennst, ist das der sicherste Weg – ohne Umweg über Suchergebnisse und Anzeigen.'
        },
        {
          show: 'Suchergebnisse lesen',
          text: 'Wenn du etwas suchst, zeigt Google eine Liste. Ganz oben stehen oft **Anzeigen**.',
          screen: oebbResults(),
          marks: { 'res-ad': 1, 'res-oebb': 2 },
          legend: [
            '**Gesponsert:** bezahlte Werbung. Kann seriös sein, muss aber nicht – Betrüger kaufen solche Plätze gezielt.',
            '**Die Adresse** über dem Titel zeigt, zu welcher Seite der Treffer führt.'
          ]
        },
        {
          tap: 'Öffne die echte Seite der ÖBB.',
          screen: oebbResults(),
          answer: 'res-oebb',
          ok: 'Richtig. www.oebb.at ist die Seite der ÖBB.',
          wrong: {
            'res-ad': 'Das ist eine Anzeige einer fremden Seite: oebb-tickets-guenstig.com gehört nicht der ÖBB. Solche Seiten verlangen Aufschläge oder sind Betrug.',
            'res-wiki': 'Das ist ein Lexikon-Artikel über die ÖBB. Tickets gibt es dort keine.'
          }
        },
        {
          show: 'Wem gehört eine Adresse?',
          text: 'Schau auf den Teil **vor dem ersten Schrägstrich /**. Davon zählen die **letzten zwei Teile**:\n\nwww.**amazon.de**/bestellungen → gehört Amazon\nlogin.**sparkasse.at**/konto → gehört der Sparkasse\namazon.**de-kundenkonto.com**/login → gehört „de-kundenkonto.com“, **nicht** Amazon\n**sparkasse-at.info** → gehört „sparkasse-at.info“, **nicht** der Sparkasse\n\nDer Anfang darf alles Mögliche enthalten. Betrüger stellen den bekannten Namen deshalb gern nach vorne.',
          fredi: ['misstrauisch', 'Hinten schauen, ned vorne. Des merk i ma.']
        },
        {
          ask: 'Welche Adresse gehört wirklich zu Amazon?',
          options: [
            ['www.amazon.de/gp/your-account', true, 'Richtig. Vor dem ersten / steht www.amazon.de – die letzten zwei Teile sind amazon.de.'],
            ['amazon.de.konto-pruefung.com/login', false, 'Die letzten zwei Teile vor dem / sind konto-pruefung.com. Diese Seite gehört nicht Amazon.'],
            ['amazon-sicherheit.net', false, 'Das ist amazon-sicherheit.net – ein fremder Besitzer mit „amazon“ im Namen.']
          ]
        },
        {
          ask: 'Und welche gehört zu FinanzOnline?',
          options: [
            ['finanzonline.bmf.gv.at', true, 'Richtig. bmf.gv.at ist das Finanzministerium. Die Endung **gv.at** verwenden nur österreichische Behörden.'],
            ['finanzonline-bmf.at.rueckzahlung.info', false, 'Die letzten zwei Teile sind rueckzahlung.info. Das ist keine Behörde.'],
            ['bmf-gv-at.com', false, 'Hier sind die Punkte durch Bindestriche ersetzt. Die Seite heißt bmf-gv-at.com – keine Behörde.']
          ]
        },
        {
          ask: 'Eine Seite fragt, ob sie Cookies verwenden darf. Was passiert, wenn du „Alle ablehnen“ wählst?',
          screen: pcBrowser('www.wetter-und-nachrichten.at', [
            { bar: { theme: 'shop', logo: 'Wetter & Nachrichten' } },
            { h: 'Sonniges Wochenende in ganz Österreich' }
          ], { dialog: { title: 'Wir verwenden Cookies', text: 'Wir und unsere Partner verwenden Cookies, um Inhalte und Werbung zu personalisieren.', buttons: [{ text: 'Alle ablehnen' }, { text: 'Einstellungen' }, { text: 'Alle akzeptieren', primary: true }] } }),
          options: [
            ['Die Seite funktioniert trotzdem. Du wirst nur weniger für Werbung verfolgt.', true, 'Richtig. Beides ist ungefährlich. „Ablehnen“ oder „Nur notwendige“ schützt deine Privatsphäre etwas besser.'],
            ['Du wirst von der Seite ausgesperrt.', false, 'Die Seite bleibt benutzbar.'],
            ['Der Computer bekommt einen Virus.', false, 'Cookies sind kleine Notizen der Seite, keine Viren.']
          ]
        }
      ]
    },
    {
      id: 'konto',
      title: 'Konto und Passwort',
      goal: 'Anmelden, gute Passwörter, Passwörter aufbewahren',
      summary: [
        'Anmelden: **Benutzername** (oft deine E-Mail-Adresse) plus **Passwort**.',
        'Gutes Passwort: **lang**, aus mehreren Wörtern, mit Zahl – zum Beispiel Kaffeetasse-Wanderweg-Marille-12.',
        '**Für jedes Konto ein eigenes Passwort.** Aufschreiben in ein Heft, das daheim bleibt, ist erlaubt.',
        'Passwort falsch? Feststelltaste prüfen, dann „**Passwort vergessen?**“.'
      ],
      steps: [
        {
          show: 'Was ist ein Konto?',
          text: 'Ein **Konto** (auch Account oder Kundenkonto) ist dein persönlicher Bereich bei einer Firma – bei Amazon, deiner Bank oder beim Finanzamt. Zum Anmelden brauchst du zwei Dinge: den **Benutzernamen**, damit die Seite weiß, wer du bist, und das **Passwort**, das nur du kennst.',
          screen: amazonLogin(),
          marks: { 'f-user': 1, 'f-pass': 2, 'f-eye': 3, forgot: 4 },
          legend: [
            '**Benutzername** – hier ist es Fredis E-Mail-Adresse.',
            '**Passwort** – erscheint als Punkte, damit niemand mitliest.',
            '**Auge** – zeigt das Passwort kurz an, um Tippfehler zu finden.',
            '**Passwort vergessen?** – Hilfe, wenn es dir nicht einfällt.'
          ]
        },
        {
          tap: 'Wo gehört dein Passwort hin?',
          screen: amazonLogin(),
          answer: 'f-pass',
          ok: 'Richtig. Das Passwort gehört nur in das Feld, das „Passwort“ heißt – und nur auf der richtigen Seite.',
          wrong: { 'f-user': 'Hier kommt deine E-Mail-Adresse hin. Das Passwort gehört ins Feld darunter.' }
        },
        {
          tap: 'Du willst prüfen, ob du dich beim Passwort vertippt hast. Worauf klickst du?',
          screen: amazonLogin(),
          answer: 'f-eye',
          ok: 'Das Auge zeigt das Passwort lesbar an. Mach das nur, wenn niemand neben dir auf den Bildschirm schaut.'
        },
        {
          ask: 'Die Seite meldet dreimal hintereinander: „Dein Passwort ist falsch.“ Was tust du?',
          screen: amazonLogin({ error: 'Dein Passwort ist falsch.' }),
          options: [
            ['Prüfen, ob die Feststelltaste an ist. Dann auf „Passwort vergessen?“ klicken.', true, 'Richtig. Nach mehreren Fehlversuchen sperren manche Seiten das Konto für eine Weile. Weiterraten bringt nichts.'],
            ['Alle Passwörter durchprobieren, die mir einfallen.', false, 'Nach einigen Fehlversuchen wird das Konto oft gesperrt.'],
            ['Ein neues Konto anlegen.', false, 'Dann fehlen dir deine Bestellungen und Daten aus dem alten Konto.']
          ]
        },
        {
          show: 'Ein gutes Passwort',
          text: '**Lang ist wichtiger als kompliziert.** Gut merken lassen sich mehrere Wörter, die nichts miteinander zu tun haben, dazu eine Zahl:\n\nKnödel-Gartenzaun-Bahnhof-47\n\n**Für jedes Konto ein eigenes Passwort.** Wird eine Firma gehackt, probieren Betrüger das Passwort sofort bei E-Mail, Amazon und Bank aus.\n\n**Aufschreiben ist erlaubt** – in einem Heft, das zu Hause bleibt. Nicht auf einem Zettel am Bildschirm und nicht in der Geldbörse. Noch bequemer: Browser oder Handy merken sich die Passwörter für dich.',
          fredi: ['grantig', 'Früher hab i überall „Fredi1958“ g’habt. Überall. Des war ned so gscheit.']
        },
        {
          ask: 'Welches Passwort ist am sichersten?',
          options: [
            ['Kaffeetasse-Wanderweg-Marille-12', true, 'Richtig. Lang, aus Wörtern, die nicht zusammenpassen – schwer zu erraten und gut zu merken.'],
            ['Fredi1958', false, 'Name und Geburtsjahr findet man leicht heraus, zum Beispiel auf Facebook.'],
            ['123456', false, 'Das ist eines der häufigsten Passwörter der Welt. Es wird sofort erraten.'],
            ['Pa$$w0rt', false, 'Sieht kompliziert aus, aber genau solche Abwandlungen probieren Betrüger zuerst.']
          ]
        },
        {
          ask: 'Edge fragt nach dem Anmelden: „Passwort speichern?“ Du bist an deinem eigenen Computer daheim. Was tust du?',
          options: [
            ['Speichern. Nächstes Mal füllt Edge das Passwort selbst aus.', true, 'Richtig. Auf deinem eigenen, mit Passwort geschützten Gerät ist das bequem und sicher. Auf fremden Computern, etwa in der Bücherei, wählst du „Nie“.'],
            ['Niemals speichern, das ist immer gefährlich.', false, 'Auf dem eigenen Gerät ist das sicherer, als überall dasselbe einfache Passwort zu verwenden.'],
            ['Speichern und mir das Passwort zusätzlich per E-Mail schicken.', false, 'Passwörter gehören nicht in E-Mails.']
          ]
        }
      ]
    },
    {
      id: 'zuruecksetzen',
      title: 'Passwort vergessen',
      goal: 'Selbst wieder ins Konto kommen',
      summary: [
        'Auf der Anmeldeseite auf „**Passwort vergessen?**“ klicken.',
        'Die Seite schickt einen **Code oder Link an dein E-Mail-Postfach**. Nur die Nachricht verwenden, die **gerade eben** nach deiner Anfrage kam.',
        'Ein **neues Passwort** wählen, das du noch nirgends verwendest.',
        'Reset-Mail ohne eigene Anfrage? Nichts anklicken.'
      ],
      steps: [
        {
          show: 'Das passiert allen',
          text: 'Fast jede Seite hat den Link **„Passwort vergessen?“**. Die Seite schickt dir dann eine E-Mail mit einem **Code** oder einem **Link**. Damit legst du ein neues Passwort fest.\n\nDeshalb ist dein **E-Mail-Postfach** so wichtig: Wer es öffnen kann, kann auf diesem Weg auch andere Konten übernehmen. Das E-Mail-Passwort ist dein wichtigstes Passwort.',
          fredi: ['ratlos', 'Passwort hab i eh. Wo, is a andere Frage.']
        },
        {
          tap: 'Fredi hat sein Amazon-Passwort vergessen. Klicke auf den passenden Link.',
          screen: amazonLogin({ error: 'Dein Passwort ist falsch.' }),
          answer: 'forgot',
          ok: 'Amazon fragt jetzt, wohin der Code geschickt werden soll.',
          wrong: { new: 'Ein neues Konto hätte keine von Fredis Bestellungen. Er will zurück in sein bestehendes Konto.', login: 'Das Passwort ist falsch – noch einmal anmelden hilft nicht.' }
        },
        {
          tap: 'Amazon will einen Code an Fredis E-Mail-Adresse schicken. Klicke auf „Weiter“.',
          screen: amazon('ap/forgotpassword', [{ center: [
            { h: 'Passwortunterstützung', size: 'l' },
            { p: 'Gib die E-Mail-Adresse oder Handynummer ein, die mit deinem Amazon-Konto verknüpft ist.' },
            { field: 'E-Mail-Adresse oder Handynummer', value: 'fredi.knoedelmayer@gmail.com' },
            { btn: 'Weiter', id: 'send-code', style: 'amz', full: true }
          ] }], { tab: 'Amazon Passwortunterstützung' }),
          answer: 'send-code',
          ok: 'Amazon hat einen Code geschickt. Jetzt schaust du ins Postfach.'
        },
        {
          tap: 'Wechsle zum Tab mit Gmail. Öffne die Nachricht von Amazon, die gerade eben gekommen ist.',
          screen: gmailPC([
            { row: 'Amazon.de', sub: '**amazon.de: Passwortunterstützung** – Um dein Passwort zurückzusetzen, gib diesen Code ein …', meta: '09:41', avatar: 'Amazon', color: '#232f3e', bold: true, id: 'mail-amazon' },
            { row: 'Amazon Sicherheit', sub: 'Ihr Konto wurde eingeschränkt – Bitte bestätigen Sie Ihre Daten innerhalb von 24 Stunden', meta: 'Mo.', avatar: 'Amazon', color: '#7c2d12', id: 'mail-fake' },
            ...INBOX.slice(0, 2)
          ], { tabs: ['Amazon Passwortunterstützung', 'Posteingang – Gmail'], activeTab: 1 }),
          answer: 'mail-amazon',
          ok: 'Richtig. Diese Nachricht kam vor einer Minute – direkt nach deiner Anfrage.',
          wrong: {
            'mail-fake': 'Diese Nachricht ist schon ein paar Tage alt und passt nicht zu deiner Anfrage von gerade eben. Sie sieht übrigens stark nach Betrug aus.',
            'mail-anna': 'Das ist Annas E-Mail. Gesucht ist die neue Nachricht von Amazon.'
          },
          other: 'Gesucht ist die neueste Nachricht von Amazon, oben in der Liste.'
        },
        {
          show: 'Der Code',
          text: 'Die Nachricht kam direkt nach deiner Anfrage, und die Absender-Adresse endet auf **amazon.de**. Der Code gilt nur ein paar Minuten und nur für diesen einen Vorgang.',
          screen: gmailPC([
            { mailhead: { from: 'Amazon.de', addr: 'account-update@amazon.de', subject: 'amazon.de: Passwortunterstützung', color: '#232f3e', fromId: 'mh-from' } },
            { p: 'Um dein Passwort zurückzusetzen, gib diesen Code ein:' },
            { code: '482 915' },
            { p: 'Gib diesen Code niemandem weiter. Amazon wird dich nie danach fragen.', small: true, muted: true }
          ], { tabs: ['Amazon Passwortunterstützung', 'amazon.de: Passwortunterstützung – Gmail'], activeTab: 1 }),
          marks: { 'mh-from': 1 },
          legend: ['Absender-Adresse endet auf **amazon.de** – passt.']
        },
        {
          type: 'Zurück bei Amazon: Tippe den Code ein.',
          text: 'Der Code aus der E-Mail lautet **482 915**.',
          screen: amazon('ap/cvf/verify', [{ center: [
            { h: 'Bestätigung erforderlich', size: 'l' },
            { p: 'Wir haben einen Code an fredi.knoedelmayer@gmail.com gesendet.' },
            { field: 'Code eingeben', id: 'otp' },
            { btn: 'Code senden', style: 'amz', full: true }
          ] }], { tab: 'Amazon Passwortunterstützung' }),
          field: 'otp',
          expect: '482915',
          loose: true,
          ok: 'Stimmt. Jetzt darfst du ein neues Passwort festlegen.'
        },
        {
          show: 'Neues Passwort festlegen',
          text: 'Wähle ein Passwort, das du noch nirgends verwendest. Tipp es zweimal gleich ein, damit sich kein Tippfehler einschleicht. Danach: ins Passwort-Heft schreiben oder vom Browser speichern lassen.',
          screen: amazon('ap/reset-password', [{ center: [
            { h: 'Neues Passwort erstellen', size: 'l' },
            { field: 'Neues Passwort', type: 'password', value: 'xxxxxxxxxxxxxxxxxxxx' },
            { field: 'Passwort erneut eingeben', type: 'password', value: 'xxxxxxxxxxxxxxxxxxxx' },
            { btn: 'Änderungen speichern', style: 'amz', full: true }
          ] }], { tab: 'Amazon Passwortunterstützung' })
        },
        {
          ask: 'Eine E-Mail „Passwort zurücksetzen“ kommt, obwohl du nichts angefordert hast. Was tust du?',
          options: [
            ['Nichts anklicken. Kommt das öfter, melde ich mich selbst über die bekannte Adresse an und ändere mein Passwort.', true, 'Richtig. Vielleicht hat sich jemand bei der Adresse vertippt – oder jemand probiert es. Ohne dein Postfach kommt er aber nicht weiter.'],
            ['Auf den Link klicken, um nachzusehen.', false, 'Wenn die E-Mail gefälscht ist, führt der Link auf eine falsche Anmeldeseite.'],
            ['Den Code an den Kundendienst schicken, damit die das klären.', false, 'Codes gibst du nie weiter – an niemanden.']
          ]
        }
      ]
    },
    {
      id: 'zweiter-faktor',
      title: 'Bestätigung am Handy',
      goal: 'Codes und Anmelde-Bestätigungen richtig nutzen',
      summary: [
        'Viele Konten verlangen beim Anmelden eine **zweite Bestätigung**: Code per SMS oder „Ja, ich bin es“ in einer App.',
        '**Bestätige nur, was du gerade selbst machst.** Gerät und Ort müssen passen.',
        'Codes gibst du **nie** weiter – nicht am Telefon, nicht per WhatsApp, auch nicht an Bekannte.'
      ],
      steps: [
        {
          show: 'Der zweite Schritt',
          text: 'Viele Konten verlangen beim Anmelden einen zweiten Schritt: einen **Code per SMS** oder eine **Bestätigung in einer App**. Selbst wenn jemand dein Passwort kennt, kommt er ohne dein Handy nicht hinein.\n\nDie Regel dazu: **Bestätige nur, was du gerade selbst machst.**',
          screen: smsChat('Google', [{ msg: 'G-482915 ist dein Google-Bestätigungscode. Gib ihn nicht weiter.', time: '09:41' }], { composer: null })
        },
        {
          tap: 'Fredi meldet sich gerade am Computer bei Gmail an. Am Handy erscheint diese Frage. Was tippt er?',
          screen: approval('Windows · Edge', 'Linz, Österreich'),
          answer: 'yes',
          ok: 'Richtig. Gerät, Ort und Zeit passen zu dem, was Fredi gerade tut.',
          wrong: { no: 'Fredi meldet sich gerade selbst an, und Gerät und Ort passen. Hier darf er bestätigen.' }
        },
        {
          tap: 'Am Abend, Fredi sitzt vor dem Fernseher, kommt dieselbe Frage. Was tippt er?',
          screen: approval('Linux · Chrome', 'Bukarest, Rumänien'),
          answer: 'no',
          ok: 'Richtig. Jemand kennt offenbar Fredis Passwort. Mit „Nein“ wird der Versuch blockiert. Danach ändert Fredi sein Passwort.',
          wrong: { yes: 'Fredi macht gerade gar nichts am Computer – und er ist nicht in Rumänien. Damit hätte er einen Fremden hineingelassen.' }
        },
        {
          ask: 'Ein freundlicher Anrufer „vom Google-Support“ sagt, er müsse dein Konto schützen. Er bittet um den Code, der gleich per SMS kommt. Was tust du?',
          options: [
            ['Auflegen. Den Code gebe ich niemandem.', true, 'Richtig. Mit dem Code meldet sich der Anrufer selbst in deinem Konto an. Kein echter Kundendienst fragt danach.'],
            ['Den Code vorlesen – er will ja helfen.', false, 'Genau so übernehmen Betrüger Konten. Echter Support fragt nie nach Codes.'],
            ['Nur die ersten drei Ziffern verraten.', false, 'Auch Teile gibst du nicht weiter. Am besten sofort auflegen.']
          ]
        },
        {
          ask: 'In WhatsApp schreibt „Tante Gerti“: „Ich hab dir aus Versehen einen Code geschickt, kannst du ihn mir weiterleiten?“ Kurz davor kam eine SMS mit einem WhatsApp-Code.',
          screen: whatsappChat('Tante Gerti', [
            { msg: 'Hallo Fredi! Ich hab dir aus Versehen einen 6-stelligen Code geschickt 🙈 Kannst du ihn mir schnell weiterleiten? Danke!!', time: '18:02' }
          ]),
          options: [
            ['Nicht weiterleiten. Gerti unter ihrer bekannten Nummer anrufen.', true, 'Richtig. Mit dem Code würde jemand **dein** WhatsApp übernehmen und dann deinen Kontakten schreiben. Wahrscheinlich wurde Gertis Konto bereits übernommen.'],
            ['Den Code weiterleiten – es ist ja meine Tante.', false, 'Der Code ist für dein eigenes WhatsApp-Konto. Wer ihn hat, übernimmt es.'],
            ['Den Code in die Familiengruppe schreiben, damit jemand hilft.', false, 'Dann können ihn alle sehen – auch der Betrüger, der Gertis Konto hat.']
          ]
        }
      ]
    }
  ]
};
