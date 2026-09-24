import { gmailPC, gmailPhoneInbox, INBOX, phoneHome } from './ui.js';

const annaMail = () => gmailPC([
  { tools: [{ icon: 'back', label: 'Zurück', id: 'mail-back' }, { icon: 'trash', label: 'Löschen', id: 'mail-delete' }, { icon: 'dots', label: 'Mehr', id: 'mail-more' }] },
  { mailhead: { from: 'Anna Huber', addr: 'anna.knoedel@gmx.at', subject: 'Fotos vom Sonntag', color: '#b0578d', time: '09:12', fromId: 'mh-from' } },
  { p: 'Hallo Papa,\n\nanbei das Foto aus dem Garten. Die Sonnenblumen sind heuer riesig!\n\nBis Sonntag\nAnna' },
  { attach: 'Garten.jpg', kind: 'image', size: '2,1 MB', id: 'att' },
  { tools: [{ icon: 'reply', text: 'Antworten', id: 'reply' }, { icon: 'replyall', text: 'Allen antworten', id: 'replyall' }, { icon: 'forward', text: 'Weiterleiten', id: 'forward' }] }
], { address: 'mail.google.com/mail/u/0/#inbox/FMfcgz', tab: 'Fotos vom Sonntag – Gmail' });

const composeScreen = (c, extra = {}) => gmailPC([{ h: 'Neue Nachricht' }, { compose: { toId: 'to', subjectId: 'subject', ...c } }], { address: 'mail.google.com/mail/u/0/#inbox?compose=new', tab: 'Neue Nachricht – Gmail', ...extra });

const LETTER = 'Liebe Anna,\n\nder Zug kommt am Sonntag um 11:42 in Linz an. Holst du mich vom Bahnhof ab?\n\nLiebe Grüße\nPapa';

const mail = ({ from, addr, subject, color, body, btn, href }) => gmailPC([
  { mailhead: { from, addr, subject, color, fromId: 'mh-from' } },
  ...body,
  ...(btn ? [{ btn, href, id: 'cta' }] : [])
], { address: 'mail.google.com/mail/u/0/#inbox/QgrcJHs', tab: `${subject} – Gmail` });

const paypal = () => gmailPC([
  { mailhead: { from: 'PayPal', addr: 'service@paypal-konto-hilfe.com', subject: 'Ihr Konto wurde eingeschränkt', color: '#1e3a8a', fromId: 'mh-from' } },
  { p: 'Sehr geehrter Kunde,', id: 'greet' },
  { p: 'wir haben ungewöhnliche Aktivitäten in Ihrem Konto festgestellt. **Bestätigen Sie Ihre Daten innerhalb von 24 Stunden**, sonst wird Ihr Konto dauerhaft gesperrt.', id: 'press' },
  { btn: 'Konto jetzt bestätigen', id: 'cta', href: 'paypal-konto-hilfe.com/verify/login' },
  { p: 'Ihr PayPal-Team', small: true, muted: true }
], { address: 'mail.google.com/mail/u/0/#inbox/KtbxLrjd', tab: 'Ihr Konto wurde eingeschränkt – Gmail' });

export default {
  title: 'E-Mail',
  goal: 'E-Mails lesen, schreiben und Betrug erkennen',
  lessons: [
    {
      id: 'posteingang',
      title: 'Das E-Mail-Postfach',
      goal: 'E-Mails öffnen, Anhänge ansehen, Spam finden',
      summary: [
        '**Fett** gedruckte E-Mails sind noch ungelesen. Anklicken öffnet sie.',
        'Der **Absender** steht oben: Name und die echte Adresse in spitzen Klammern.',
        'Ein **Anhang** ist eine mitgeschickte Datei, zum Beispiel ein Foto oder eine Rechnung.',
        'E-Mail nicht angekommen? Im **Spam**-Ordner nachsehen oder die **Suche** verwenden.'
      ],
      steps: [
        {
          show: 'Gmail am Computer',
          text: 'Fredi verwendet Gmail. Andere Anbieter wie GMX, Outlook oder A1 sehen ähnlich aus – die Knöpfe heißen fast gleich.',
          screen: gmailPC(INBOX),
          marks: { compose: 1, 'nav-inbox': 2, 'nav-spam': 3, 'mail-anna': 4, 'mail-search': 5 },
          legend: [
            '**Schreiben:** eine neue E-Mail beginnen.',
            '**Posteingang:** hier kommen neue E-Mails an.',
            '**Spam:** Gmail sortiert Werbung und Betrug hierher aus.',
            '**Fett gedruckt** = noch nicht gelesen.',
            '**Suche:** findet alte E-Mails nach Name oder Stichwort.'
          ]
        },
        {
          tap: 'Öffne die ungelesene E-Mail von Anna.',
          screen: gmailPC(INBOX),
          answer: 'mail-anna',
          ok: 'Die E-Mail ist offen. Einmal klicken genügt.',
          other: 'Das ist eine andere E-Mail. Gesucht ist die fett gedruckte Nachricht von Anna Huber.'
        },
        {
          show: 'Eine E-Mail lesen',
          screen: annaMail(),
          marks: { 'mh-from': 1, att: 2, reply: 3, forward: 4 },
          legend: [
            '**Absender:** Name und die echte E-Mail-Adresse in spitzen Klammern.',
            '**Anhang:** eine mitgeschickte Datei. Anklicken öffnet sie.',
            '**Antworten:** schreibt direkt an Anna zurück.',
            '**Weiterleiten:** schickt die E-Mail an jemand anderen.'
          ]
        },
        {
          tap: 'Sieh dir das Foto im Anhang an.',
          screen: annaMail(),
          answer: 'att',
          ok: 'Das Foto öffnet sich groß. Anhänge von Menschen, die du kennst und von denen du etwas erwartest, kannst du öffnen.',
          wrong: { 'mail-delete': 'Der Papierkorb löscht die E-Mail.' }
        },
        {
          tap: 'Fredi wartet auf die Bestätigung vom Theater. Im Posteingang ist sie nicht. Wo schaut er nach?',
          screen: gmailPC(INBOX),
          answer: ['nav-spam', 'mail-search'],
          ok: 'Beides hilft: Die **Suche** findet eine E-Mail in allen Ordnern. Und im **Spam**-Ordner landen manchmal auch echte E-Mails. Dann: öffnen und „Kein Spam“ anklicken.',
          wrong: { 'nav-trash': 'Im Papierkorb liegen E-Mails, die du selbst gelöscht hast.', 'nav-sent': 'Unter „Gesendet“ stehen E-Mails, die du selbst verschickt hast.' }
        },
        {
          tap: 'Das Postfach gibt es auch am Handy. Öffne Gmail.',
          screen: phoneHome(),
          answer: 'app-gmail',
          ok: 'Am Handy siehst du dasselbe Postfach wie am Computer. Was du am einen Gerät liest oder löschst, ist auch am anderen gelesen oder gelöscht.',
          other: 'Gmail ist das weiße Symbol mit dem roten Briefumschlag.'
        },
        {
          show: 'Gmail am Handy',
          text: 'Alles ist gleich, nur kompakter. Die Ordner wie Spam oder Gesendet findest du über die **drei Striche** oben links.',
          screen: gmailPhoneInbox(),
          marks: { 'gm-menu': 1, compose: 2, 'mail-anna': 3 },
          legend: ['**Menü:** Ordner wie Spam und Gesendet.', '**Schreiben:** neue E-Mail.', 'Ungelesene E-Mail, fett gedruckt.']
        }
      ]
    },
    {
      id: 'email-senden',
      title: 'Eine E-Mail schreiben',
      goal: 'Adresse, Betreff, Text, Anhang und Senden',
      summary: [
        '**Schreiben** → bei **An** die Adresse → **Betreff** als Überschrift → Text → **Senden**.',
        'Anhang: auf die **Büroklammer** klicken und die Datei auswählen.',
        '**Antworten** geht nur an den Absender, **Allen antworten** an alle Empfänger.',
        '„Adresse nicht gefunden“ bedeutet meist einen Tippfehler in der Adresse.'
      ],
      steps: [
        {
          tap: 'Fredi will Anna schreiben, wann sein Zug ankommt. Beginne eine neue E-Mail.',
          screen: gmailPC(INBOX),
          answer: 'compose',
          ok: 'Ein leeres Fenster für die neue E-Mail geht auf.',
          other: 'Damit öffnest du eine bestehende E-Mail oder einen Ordner. Für eine neue E-Mail nimmst du „Schreiben“ oben links.'
        },
        {
          type: 'Trage bei „An“ Annas Adresse ein: anna.knoedel@gmx.at',
          screen: composeScreen({}),
          field: 'to',
          expect: 'anna.knoedel@gmx.at',
          help: '@ = **AltGr + Q**. Oft schlägt Gmail die Adresse schon nach den ersten Buchstaben vor – dann genügt ein Klick auf den Vorschlag.',
          ok: 'Richtig. Die Adresse muss ganz genau stimmen – ein einziger falscher Buchstabe, und die E-Mail kommt nicht an.'
        },
        {
          type: 'Schreibe einen Betreff: Zugzeit Sonntag',
          screen: composeScreen({ to: 'anna.knoedel@gmx.at' }),
          field: 'subject',
          expect: 'Zugzeit Sonntag',
          ok: 'Der Betreff ist wie die Überschrift eines Briefes. So sieht Anna sofort, worum es geht.'
        },
        {
          show: 'Der Text',
          text: 'Den Text schreibst du wie einen kurzen Brief: Anrede, Inhalt, Gruß. Mit **Enter** beginnt eine neue Zeile. Fredi hat den Text schon geschrieben.',
          screen: composeScreen({ to: 'anna.knoedel@gmx.at', subject: 'Zugzeit Sonntag', body: LETTER })
        },
        {
          tap: 'Hänge noch den Fahrplan als Datei an.',
          screen: composeScreen({ to: 'anna.knoedel@gmx.at', subject: 'Zugzeit Sonntag', body: LETTER }),
          answer: 'attach',
          ok: 'Ein Fenster zeigt die Dateien auf deinem Computer.',
          wrong: {
            'c-image': 'Das fügt ein Bild mitten in den Text ein. Für eine Datei als Anhang nimmst du die Büroklammer.',
            send: 'Noch nicht senden – zuerst den Anhang dazu.',
            discard: 'Der Papierkorb verwirft den ganzen Entwurf.'
          }
        },
        {
          tap: 'Wähle die Datei „Fahrplan_Linz_Wien.pdf“ aus.',
          text: 'Doppelklick auf die Datei – oder einmal anklicken und dann „Öffnen“.',
          screen: composeScreen({ to: 'anna.knoedel@gmx.at', subject: 'Zugzeit Sonntag', body: LETTER }, {
            dialog: {
              title: 'Öffnen – Downloads',
              body: [
                { row: 'Stromrechnung_August.pdf', icon: 'file', color: '#d93025', id: 'f-strom', dense: true },
                { row: 'Fahrplan_Linz_Wien.pdf', icon: 'file', color: '#d93025', id: 'f-fahrplan', dense: true },
                { row: 'Garten_September.jpg', icon: 'image', color: '#1a73e8', id: 'f-garten', dense: true }
              ],
              buttons: [{ text: 'Abbrechen', id: 'dlg-cancel' }, { text: 'Öffnen', id: 'dlg-open', primary: true }]
            }
          }),
          answer: 'f-fahrplan',
          double: true,
          confirm: 'dlg-open',
          single: 'Ausgewählt. Jetzt unten auf **„Öffnen“** klicken – oder gleich doppelklicken.',
          ok: 'Der Fahrplan hängt jetzt an der E-Mail.',
          wrong: { 'dlg-open': 'Wähle zuerst die Datei aus, dann „Öffnen“.', 'dlg-cancel': 'Abbrechen schließt das Fenster ohne Anhang.' },
          other: 'Das ist eine andere Datei. Gesucht ist „Fahrplan_Linz_Wien.pdf“.'
        },
        {
          tap: 'Alles fertig. Schick die E-Mail ab.',
          screen: composeScreen({ to: 'anna.knoedel@gmx.at', subject: 'Zugzeit Sonntag', body: LETTER, attach: 'Fahrplan_Linz_Wien.pdf' }),
          answer: 'send',
          ok: 'Gesendet. Du findest die E-Mail danach im Ordner „Gesendet“.',
          wrong: { discard: 'Der Papierkorb verwirft den Entwurf. Die E-Mail wäre dann weg.' }
        },
        {
          ask: 'Die Gemeinde schickt eine Einladung an 80 Personen. Du willst absagen. Welchen Knopf nimmst du?',
          options: [
            ['Antworten – dann geht die Absage nur an die Gemeinde.', true, 'Richtig. „Allen antworten“ würde deine Absage an alle 80 Empfänger schicken.'],
            ['Allen antworten.', false, 'Dann bekommen alle 80 Personen deine Absage.'],
            ['Weiterleiten.', false, 'Weiterleiten schickt die Einladung an jemand Neuen.']
          ]
        },
        {
          ask: 'Kurz nach dem Senden kommt: „Adresse nicht gefunden – Ihre Nachricht wurde nicht zugestellt“. Was ist wohl passiert?',
          options: [
            ['Ein Tippfehler in der Adresse, etwa „anna.knödel“ statt „anna.knoedel“.', true, 'Richtig. Adresse genau prüfen, korrigieren, noch einmal senden. Die E-Mail ist nirgends falsch gelandet.'],
            ['Anna hat mich blockiert.', false, 'Diese Meldung bedeutet: Die Adresse gibt es so nicht.'],
            ['Mein Computer ist gehackt.', false, 'Nein. Die Meldung kommt ganz normal, wenn eine Adresse nicht existiert.']
          ]
        },
        {
          tap: 'Am Handy: Beginne eine neue E-Mail.',
          screen: gmailPhoneInbox(),
          answer: 'compose',
          ok: 'Genau. Danach geht es wie am Computer: An, Betreff, Text, Senden. Der Senden-Knopf ist am Handy ein Papierflieger oben rechts.',
          other: 'Gesucht ist der Knopf „Schreiben“ rechts unten.'
        }
      ]
    },
    {
      id: 'email-pruefen',
      title: 'Echt oder Betrug?',
      goal: 'Gefälschte E-Mails in vier Schritten erkennen',
      summary: [
        'Prüfe die **Absender-Adresse**, nicht nur den Namen.',
        'Am Computer: **Maus über den Link halten**, ohne zu klicken. Unten links steht, wohin er führt.',
        '**Druck und Drohung** („24 Stunden“, „gesperrt“) und **Frage nach Daten** sind Warnzeichen.',
        'Im Zweifel: nicht in der E-Mail klicken, sondern **selbst die App oder die bekannte Adresse** öffnen.'
      ],
      steps: [
        {
          show: 'Vier Dinge prüfen',
          text: 'Diese E-Mail sieht auf den ersten Blick nach PayPal aus. Vier Stellen verraten sie.',
          screen: paypal(),
          marks: { 'mh-from': 1, greet: 2, press: 3, cta: 4 },
          legend: [
            '**Absender-Adresse:** Den Namen „PayPal“ kann jeder hinschreiben. Die Adresse dahinter endet auf paypal-konto-hilfe.com – nicht auf paypal.com.',
            '**Anrede:** „Sehr geehrter Kunde“ statt deines Namens.',
            '**Druck und Drohung:** „innerhalb von 24 Stunden“, „dauerhaft gesperrt“.',
            '**Knopf:** führt auf eine nachgebaute Seite, die Passwort oder Kartendaten abfragt.'
          ]
        },
        {
          tap: 'Wo siehst du, wer die E-Mail wirklich geschickt hat?',
          screen: paypal(),
          answer: 'mh-from',
          ok: 'Richtig. Die Adresse in den spitzen Klammern zählt. Am Handy tippst du auf den Namen des Absenders, dann erscheint die Adresse.',
          wrong: { cta: 'Nicht klicken! Der Knopf führt auf eine fremde Seite. Gesucht ist die Zeile ganz oben mit dem Absender.' },
          other: 'Gesucht ist die Zeile oben mit dem Namen und der Adresse in spitzen Klammern.'
        },
        {
          ask: 'Halte die Maus über den Knopf „Konto jetzt bestätigen“, ohne zu klicken. Wohin führt er?',
          text: 'Achte auf die graue Leiste, die dann unten links im Fenster erscheint.',
          screen: paypal(),
          note: 'Maus auf den blauen Knopf bewegen – nicht klicken.',
          keepOrder: true,
          options: [
            ['paypal-konto-hilfe.com', true, 'Richtig. Das ist nicht PayPal. Am Handy siehst du das Ziel, wenn du lange auf den Link drückst – danach aber „Abbrechen“ wählen.'],
            ['paypal.com', false, 'Schau unten links noch einmal genau hin, während die Maus auf dem Knopf ist.'],
            ['Das kann man nicht herausfinden.', false, 'Doch: Maus darüber halten, ohne zu klicken. Unten links steht dann die Adresse.']
          ]
        },
        {
          show: 'Die sichere Gewohnheit',
          text: 'Du bist unsicher, ob eine E-Mail echt ist? Dann **klicke nicht in der E-Mail**. Öffne stattdessen die App oder tippe die bekannte Adresse selbst ein und melde dich dort an. Wenn wirklich etwas mit deinem Konto ist, siehst du es dort auch.\n\nEchte Firmen fragen **nie per E-Mail** nach Passwort, PIN, TAN oder Kartennummer.',
          fredi: ['misstrauisch', 'Wenn’s brennt, schau i selber nach. Aber ned über den Link.']
        },
        {
          ask: 'Echt oder Betrug?',
          screen: mail({ from: 'Österreichische Post', addr: 'info@post-zustellung-at.com', subject: 'Zollgebühr offen', color: '#c29a00', body: [{ p: 'Ihr Paket wird beim Zoll zurückgehalten. Bitte begleichen Sie die offene Gebühr von **1,99 €**, sonst wird die Sendung zurückgeschickt.' }], btn: 'Jetzt bezahlen', href: 'post-zustellung-at.com/zoll/zahlung' }),
          keepOrder: true,
          options: [
            ['Betrug', true, 'Richtig. Kleiner Betrag, fremde Adresse, Druck. Die 1,99 € sind nur der Köder – es geht um deine Kartendaten.'],
            ['Echt', false, 'Die Adresse endet auf post-zustellung-at.com, nicht auf post.at. Und die Post verlangt keine Gebühren über einen Link mit Kartenzahlung.']
          ]
        },
        {
          ask: 'Echt oder Betrug? Fredi hat gestern eine Kaffeemaschine bestellt.',
          screen: mail({ from: 'Amazon.de', addr: 'bestellbestaetigung@amazon.de', subject: 'Deine Amazon.de-Bestellung', color: '#232f3e', body: [{ p: 'Hallo Alfred,\n\ndanke für deine Bestellung. Wir schicken dir eine Nachricht, sobald sie versandt wurde.' }, { kv: [['Artikel', 'Filterkaffeemaschine, Edelstahl'], ['Lieferung', 'Donnerstag, 26. September'], ['Summe', '49,99 €']] }], btn: 'Bestellung anzeigen', href: 'www.amazon.de/gp/your-account/order-details' }),
          keepOrder: true,
          options: [
            ['Echt – und im Zweifel prüfe ich die Bestellung direkt in der Amazon-App.', true, 'Richtig. Absender und Link enden auf amazon.de, die Anrede ist persönlich und die Bestellung passt. Ganz sicher bist du, wenn du sie selbst in der App ansiehst.'],
            ['Betrug', false, 'Hier passt alles zusammen: Adresse amazon.de, persönlicher Name, eine Bestellung, die Fredi selbst gemacht hat. Halte die Maus über den Knopf – er führt zu amazon.de.']
          ]
        },
        {
          ask: 'Echt oder Betrug?',
          screen: mail({ from: 'Finanzamt Österreich', addr: 'rueckerstattung@bmf-gv.info', subject: 'Steuerrückerstattung: 438,20 €', color: '#c8102e', body: [{ p: 'Sehr geehrte/r Steuerpflichtige/r,\n\nSie haben Anspruch auf eine Rückerstattung von **438,20 €**. Geben Sie Ihre Kreditkartendaten ein, um den Betrag innerhalb von 48 Stunden zu erhalten.' }], btn: 'Rückerstattung anfordern', href: 'bmf-gv.info/erstattung' }),
          keepOrder: true,
          options: [
            ['Betrug', true, 'Richtig. Das Finanzamt überweist Guthaben automatisch auf das Konto, das in FinanzOnline hinterlegt ist. Es fragt nie nach Kartendaten. Und die Adresse endet nicht auf bmf.gv.at.'],
            ['Echt', false, 'bmf-gv.info ist keine Behörde. Und das Finanzamt fragt nie nach Kreditkartendaten.']
          ]
        },
        {
          ask: 'Du hast auf einen Link geklickt und dort dein Passwort eingegeben. Jetzt kommen dir Zweifel. Was tust du zuerst?',
          options: [
            ['Sofort über die echte App oder Adresse das Passwort ändern. Bei Bankdaten: die Bank anrufen.', true, 'Richtig. Je schneller, desto besser. Mehr dazu in der letzten Lektion „Wenn es doch passiert ist“.'],
            ['Abwarten, ob etwas passiert.', false, 'Betrüger nutzen gestohlene Passwörter oft innerhalb weniger Minuten.'],
            ['Die E-Mail löschen, dann ist es erledigt.', false, 'Das Passwort ist trotzdem bei den Betrügern.']
          ]
        }
      ]
    }
  ]
};
