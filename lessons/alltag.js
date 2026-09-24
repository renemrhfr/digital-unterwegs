import { amazon, bankPC, foPC, pcBrowser, googleStart, phoneApp } from './ui.js';

// ---------- Amazon ----------
const productPage = () => amazon('Filterkaffeemaschine-Edelstahl/dp/B0C7K2', [
  { cols: [[{ img: 'Kaffeemaschine', tone: 'product' }], [
    { h: 'Filterkaffeemaschine, 1,25 Liter, Edelstahl, Warmhalteplatte', size: 'm' },
    { p: '★★★★☆ 4,4 · 2.314 Bewertungen', id: 'p-rating', small: true },
    { h: '49,99 €', size: 'price', id: 'p-price' },
    { p: 'Kostenlose Lieferung **Donnerstag, 26. September**', small: true },
    { kv: [['Versand', 'Amazon'], ['Verkäufer', 'Amazon', 'p-seller']] },
    { btn: 'In den Einkaufswagen', id: 'add-cart', style: 'amz', full: true },
    { btn: 'Jetzt kaufen', id: 'buy-now', style: 'amz-buy', full: true }
  ]], w: '38% 1fr' }
], { tab: 'Filterkaffeemaschine – Amazon.de', search: 'kaffeemaschine' });

const checkout = (address) => amazon('gp/buy/spc/handlers/display.html', [
  { h: 'Bestellung überprüfen', size: 'l' },
  { cols: [[
    { kv: [['Lieferadresse', address, 'addr'], ['Zahlungsart', 'Visa endet auf 4417', 'pay'], ['Lieferung', 'Donnerstag, 26. September']] },
    { link: 'Lieferadresse ändern', id: 'addr-change' }
  ], [
    { card: [
      { btn: 'Jetzt kaufen', id: 'buy', style: 'amz-buy', full: true },
      { kv: [['Artikel', '49,99 €'], ['Versand', '0,00 €'], ['Gesamtsumme', '**49,99 €**', 'total']] },
      { p: 'Mit deiner Bestellung erklärst du dich mit den Allgemeinen Geschäftsbedingungen einverstanden.', small: true, muted: true }
    ] }
  ]], w: '1fr 34%' }
], { tab: 'Kasse – Amazon.de' });

// ---------- Bank ----------
const bankLogin = () => pcBrowser('banking.meinebank.at/login', [
  { bar: { theme: 'bank' } },
  { center: [
    { h: 'Anmelden im Internetbanking', size: 'l' },
    { field: 'Verfügernummer oder Benutzername', value: '47110815' },
    { field: 'Passwort', type: 'password', value: 'xxxxxxxxxxxx' },
    { btn: 'Anmelden', id: 'login', full: true },
    { link: 'Zugangsdaten vergessen?', id: 'bank-forgot' }
  ] }
], { tab: 'Meine Bank – Anmelden', favs: [{ text: 'Meine Bank', id: 'fav-bank' }, { text: 'ORF', id: 'fav-orf' }, { text: 'Wetter', id: 'fav-wetter' }] });

const bankOverview = () => bankPC([
  { cols: [[
    { card: [
      { p: 'Girokonto · AT61 1904 3002 3457 3201', small: true, muted: true },
      { h: '2.841,37 €', size: 'price', id: 'balance' },
      { p: 'Verfügbar', small: true, muted: true }
    ] }
  ], [
    { h: 'Letzte Umsätze' },
    { row: 'Pension PVA', sub: '1. September · Gutschrift', meta: '+1.920,00 €', icon: 'bank', color: '#15803d', id: 'tx-pension', dense: true },
    { row: 'Billa Linz', sub: '3. September · Kartenzahlung', meta: '−34,80 €', icon: 'cart', id: 'tx-billa', dense: true },
    { row: 'Streamdienst Plus', sub: '3. September · Lastschrift', meta: '−49,90 €', icon: 'file', id: 'tx-stream', dense: true },
    { row: 'Linz AG Strom', sub: '15. September · Lastschrift', meta: '−78,00 €', icon: 'file', id: 'tx-strom', dense: true }
  ]], w: '38% 1fr' }
]);

const bankHome = () => phoneApp('bank', 'Meine Bank', [
  { card: [{ p: 'Girokonto', small: true, muted: true }, { h: '2.841,37 €', size: 'price' }] },
  { grid: [
    { id: 'new-transfer', app: 'bank', text: 'Überweisen' },
    { id: 'scan', app: 'camera', text: 'Zahlschein scannen' },
    { id: 'tx', app: 'calendar', text: 'Umsätze' },
    { id: 'cards', app: 'settings', text: 'Karten' }
  ] },
  { p: 'Letzte Umsätze', small: true, muted: true },
  { row: 'Billa Linz', meta: '−34,80 €', icon: 'cart', dense: true },
  { row: 'Pension PVA', meta: '+1.920,00 €', icon: 'bank', dense: true }
], { noBack: true, bottomTabs: [{ text: 'Start', icon: 'home', active: true, id: 'bt-home' }, { text: 'Zahlen', icon: 'send', id: 'bt-pay' }, { text: 'Postfach', icon: 'mail', id: 'bt-inbox' }] });

const transferForm = (iban, banner, extra = {}) => phoneApp('bank', 'Neue Überweisung', [
  { field: 'Empfänger', value: 'Installateur Berger GmbH' },
  { field: 'IBAN', id: 'iban', value: iban },
  ...(banner ? [banner] : []),
  { field: 'Betrag', value: '286,40 €' },
  { field: 'Zahlungsreferenz', value: 'RE-2026-0917' },
  { btn: 'Weiter', id: 'continue', full: true }
], extra);

const invoice = () => ({ device: 'none', body: [{ card: [
  { h: 'Installateur Berger GmbH', size: 'm' },
  { p: 'Rechnung Nr. RE-2026-0917 · Tausch Thermostat Badezimmer', small: true, muted: true },
  { kv: [['Empfänger', 'Installateur Berger GmbH'], ['IBAN', 'AT61 1904 3002 3457 3201'], ['BIC', 'BKAUATWW'], ['Betrag', '**286,40 €**'], ['Zahlungsreferenz', 'RE-2026-0917'], ['Zahlbar bis', '8. Oktober 2026']] },
  { qr: 'QR-Code zum Scannen in der Bank-App' }
], tone: 'paper' }] });

export default {
  title: 'Alltag erledigen',
  goal: 'Bestellen, Online-Banking, Überweisen und FinanzOnline',
  lessons: [
    {
      id: 'amazon',
      title: 'Bei Amazon bestellen',
      goal: 'Suchen, bestellen, Lieferung verfolgen, zurückschicken',
      summary: [
        'Auf der Produktseite prüfen: **Preis**, **Bewertungen** und wer **verkauft und versendet**.',
        '**Einkaufswagen** → **Zur Kasse** → Adresse, Zahlungsart und Summe prüfen → **Jetzt kaufen**.',
        'Abo-Angebote wie **Prime** sind groß und bunt. Der Ausweg „Nein danke“ ist oft klein.',
        'Paket verfolgen und zurückschicken: **Bestellungen** oben rechts.'
      ],
      steps: [
        {
          show: 'Die Produktseite',
          text: 'Fredi hat bei Amazon nach einer Kaffeemaschine gesucht und ein Angebot geöffnet. Vor dem Kaufen lohnt ein Blick auf vier Stellen.',
          screen: productPage(),
          marks: { 'p-price': 1, 'p-rating': 2, 'p-seller': 3, 'add-cart': 4 },
          legend: [
            '**Preis:** inklusive Mehrwertsteuer. Versandkosten stehen darunter.',
            '**Bewertungen:** Was andere Käufer sagen. Viele Bewertungen sagen mehr als wenige.',
            '**Verkäufer:** „Amazon“ ist am einfachsten. Bei anderen Händlern lohnt ein Blick auf deren Bewertungen.',
            '**In den Einkaufswagen:** legt das Produkt in den Wagen. Gekauft ist damit noch nichts.'
          ]
        },
        {
          tap: 'Leg die Kaffeemaschine in den Einkaufswagen.',
          screen: productPage(),
          answer: 'add-cart',
          ok: 'Liegt im Wagen. Du kannst weitersuchen oder zur Kasse gehen.',
          wrong: { 'buy-now': '„Jetzt kaufen“ springt direkt zur Kasse. Mit dem Einkaufswagen sammelst du in Ruhe und prüfst alles vor dem Bezahlen.' }
        },
        {
          tap: 'Geh zur Kasse.',
          screen: amazon('gp/cart/view.html', [
            { h: 'Einkaufswagen', size: 'l' },
            { cols: [[
              { row: 'Filterkaffeemaschine, 1,25 Liter, Edelstahl', sub: 'Auf Lager · Menge: 1', meta: '49,99 €', icon: 'image' },
              { link: 'Löschen', id: 'del' }
            ], [
              { card: [{ p: 'Zwischensumme (1 Artikel): **49,99 €**' }, { btn: 'Zur Kasse gehen', id: 'checkout', style: 'amz', full: true }] }
            ]], w: '1fr 34%' }
          ], { tab: 'Einkaufswagen – Amazon.de' }),
          answer: 'checkout',
          ok: 'Jetzt kommt die Kasse. Gekauft ist noch immer nichts.',
          wrong: { del: 'Löschen nimmt die Kaffeemaschine wieder aus dem Wagen.' }
        },
        {
          tap: 'Amazon bietet dir etwas an. Du willst nur die Kaffeemaschine, ohne Abo. Wähle richtig.',
          screen: amazon('gp/buy/primeinterstitial', [{ center: [
            { h: 'Kostenlose Lieferung morgen mit Prime', size: 'l' },
            { p: 'Teste Prime 30 Tage gratis. Schnelle Lieferung, Filme, Serien und Musik.' },
            { btn: 'Prime 30 Tage gratis testen', id: 'prime', style: 'amz-buy', full: true },
            { link: 'Nein danke, weiter ohne Prime', id: 'no-prime' }
          ] }], { tab: 'Amazon Prime – Amazon.de' }),
          answer: 'no-prime',
          ok: 'Gut gesehen. Der gewünschte Knopf ist oft groß und bunt, der Ausweg klein und unauffällig. Lies bei jedem Angebot, was du bestätigst.',
          wrong: { prime: 'Das startet ein Probe-Abo. Wird es nicht rechtzeitig gekündigt, kostet Prime danach jeden Monat. Such den kleinen Link darunter.' },
          fredi: ['grantig', 'Des „gratis“ hat mi im Frühjahr drei Monat’ lang was kostet.']
        },
        {
          show: 'Die Bestellübersicht',
          text: 'Bevor du bestellst, zeigt Amazon alles noch einmal. Nimm dir hier Zeit.',
          screen: checkout('Alfred Knödelmayer, Hauptstraße 12, 4060 Leonding'),
          marks: { addr: 1, pay: 2, total: 3, buy: 4 },
          legend: [
            '**Lieferadresse:** Stimmt sie?',
            '**Zahlungsart:** womit bezahlt wird.',
            '**Gesamtsumme:** der Betrag, der wirklich abgebucht wird.',
            '**Jetzt kaufen:** Erst dieser Klick bestellt verbindlich.'
          ]
        },
        {
          tap: 'Fredi ist vor einem Monat umgezogen. Oben steht noch die alte Adresse. Was klickst du?',
          screen: checkout('Alfred Knödelmayer, Gartengasse 3, 4020 Linz (alte Adresse)'),
          answer: 'addr-change',
          ok: 'Richtig. Dort wählst du die neue Adresse aus oder trägst sie ein. Danach kommst du hierher zurück.',
          wrong: { buy: 'Dann geht das Paket an die alte Wohnung. Zuerst die Adresse ändern.' }
        },
        {
          tap: 'Die Adresse stimmt jetzt. Bestelle verbindlich.',
          screen: checkout('Alfred Knödelmayer, Hauptstraße 12, 4060 Leonding'),
          answer: 'buy',
          ok: 'Bestellt. Amazon zeigt eine Bestätigung und schickt dir zusätzlich eine E-Mail mit allen Details.'
        },
        {
          tap: 'Zwei Tage später: Wo ist das Paket? Öffne deine Bestellungen.',
          screen: amazon('', [
            { h: 'Hallo, Alfred', size: 'l' },
            { cols: [[{ img: 'Angebote des Tages', tone: 'product' }], [{ img: 'Zuletzt angesehen', tone: 'product' }]] }
          ], { tab: 'Amazon.de' }),
          answer: 'nav-orders',
          ok: 'Hier siehst du alle Bestellungen, die neueste oben.',
          wrong: { 'nav-cart': 'Der Einkaufswagen ist für neue Einkäufe. Bestellte Dinge findest du unter „Bestellungen“.' }
        },
        {
          tap: 'Verfolge die Lieferung.',
          screen: amazon('gp/your-account/order-history', [
            { h: 'Meine Bestellungen', size: 'l' },
            { card: [
              { p: 'Bestellt am 24. September · Summe 49,99 €', small: true, muted: true },
              { row: 'Filterkaffeemaschine, 1,25 Liter, Edelstahl', sub: 'Unterwegs · Zustellung Donnerstag', icon: 'image' },
              { btn: 'Lieferung verfolgen', id: 'track', style: 'amz', full: true },
              { btn: 'Artikel zurücksenden', id: 'return', style: 'secondary', full: true },
              { link: 'Rechnung', id: 'invoice' }
            ] }
          ], { tab: 'Meine Bestellungen – Amazon.de' }),
          answer: 'track',
          ok: 'Du siehst, wo das Paket gerade ist und wann es ungefähr kommt.',
          wrong: { return: 'Das startet eine Rücksendung. Du willst nur wissen, wo das Paket ist.', invoice: 'Das zeigt die Rechnung als PDF.' }
        },
        {
          ask: 'Die Kaffeemaschine gefällt dir doch nicht. Wie schickst du sie zurück?',
          options: [
            ['Unter „Bestellungen“ auf „Artikel zurücksenden“ klicken und den Schritten folgen.', true, 'Richtig. Amazon zeigt dir dann einen Rücksendeschein oder QR-Code für die Post. Online Gekauftes darfst du in der EU in der Regel 14 Tage lang zurückgeben, bei Amazon meist sogar 30 Tage.'],
            ['Beim Amazon-Kundendienst anrufen, die Nummer suche ich bei Google.', false, 'Über Suchergebnisse landen viele bei falschen Hotlines. Die Rücksendung startest du direkt in deinem Amazon-Konto.'],
            ['Das Paket ohne Schein zur Post bringen.', false, 'Ohne Rücksendeschein weiß niemand, wohin das Paket gehört.']
          ]
        }
      ]
    },
    {
      id: 'banking',
      title: 'Online-Banking',
      goal: 'Anmelden, Kontostand und Umsätze prüfen',
      summary: [
        'Zur Bank nur über die **Bank-App** oder die **selbst eingetippte Adresse bzw. ein Lesezeichen** – nie über Links in E-Mails oder SMS.',
        'Eine **Freigabe am Handy** bestätigst du nur, wenn du dich gerade selbst anmeldest.',
        'Umsätze regelmäßig ansehen. Unbekannte Abbuchung? **Bank anrufen** – Nummer auf der Bankkarte.',
        'Am Ende **abmelden**.'
      ],
      steps: [
        {
          show: 'Zwei Wege zur Bank',
          text: '**Die App deiner Bank** am Handy – meist am einfachsten. Du installierst sie aus dem Play Store und richtest sie einmal mit den Zugangsdaten deiner Bank ein.\n\n**Die Website** am Computer – du tippst die Adresse deiner Bank selbst ein oder verwendest ein gespeichertes Lesezeichen.\n\nIn Österreich heißen die Angebote zum Beispiel George, Mein ELBA oder BAWAG. Sie sehen verschieden aus, die Schritte sind fast gleich. Wir üben mit „Meine Bank“.'
        },
        {
          ask: 'Wie kommst du am Computer am sichersten zur Website deiner Bank?',
          options: [
            ['Die Adresse selbst eintippen oder ein gespeichertes Lesezeichen verwenden.', true, 'Richtig. So landest du garantiert auf der echten Seite.'],
            ['Den Banknamen googeln und den ersten Treffer anklicken.', false, 'Der erste Treffer ist oft eine Anzeige. Betrüger kaufen gezielt Anzeigen mit Banknamen.'],
            ['Den Link in einer E-Mail der Bank anklicken.', false, 'Links in E-Mails sind der häufigste Weg zu gefälschten Bankseiten.']
          ]
        },
        {
          tap: 'Öffne die Bank über das Lesezeichen „Meine Bank“ in der Favoritenleiste.',
          screen: googleStart({ favs: [{ text: 'Meine Bank', id: 'fav-bank', href: 'banking.meinebank.at' }, { text: 'ORF', id: 'fav-orf', href: 'orf.at' }, { text: 'Wetter', id: 'fav-wetter', href: 'wetter-und-nachrichten.at' }] }),
          answer: 'fav-bank',
          ok: 'Ein Lesezeichen legst du einmal an – mit dem Stern rechts in der Adresszeile – und kommst dann immer mit einem Klick zur richtigen Seite.',
          wrong: { 'g-search': 'Über die Google-Suche kommst du auch hin, aber vorbei an Anzeigen. Das Lesezeichen ist sicherer.' }
        },
        {
          tap: 'Verfügernummer und Passwort sind eingetragen. Melde dich an.',
          screen: bankLogin(),
          answer: 'login',
          ok: 'Jetzt schickt die Bank eine Anfrage auf dein Handy.',
          wrong: { 'bank-forgot': 'Das brauchst du nur, wenn du deine Zugangsdaten nicht mehr weißt.' }
        },
        {
          tap: 'Die Bank-App fragt nach einer Freigabe. Du meldest dich gerade selbst am Computer an.',
          screen: phoneApp('bank', 'Meine Bank', [
            { center: [{ h: 'Anmeldung bestätigen', size: 'l' }] },
            { kv: [['Wofür', 'Anmeldung im Internetbanking'], ['Gerät', 'Windows · Edge'], ['Zeit', '09:41']] },
            { btn: 'Bestätigen', id: 'approve', full: true },
            { btn: 'Ablehnen', id: 'reject', style: 'secondary', full: true }
          ], { noBack: true }),
          answer: 'approve',
          ok: 'Angemeldet. Die Bestätigung erfolgt oft zusätzlich mit Fingerabdruck oder PIN.',
          wrong: { reject: 'Du meldest dich gerade selbst an – hier darfst du bestätigen.' }
        },
        {
          show: 'Die Übersicht',
          screen: bankOverview(),
          marks: { balance: 1, 'tx-billa': 2, 'nav-transfer': 3, logout: 4 },
          legend: [
            '**Kontostand:** so viel Geld ist gerade am Konto.',
            '**Umsätze:** jede Zahlung, die hinein- oder hinausging. Minus = abgebucht.',
            '**Überweisung:** Geld an jemanden schicken.',
            '**Abmelden:** am Ende immer klicken.'
          ]
        },
        {
          tap: 'Fredi wundert sich über 49,90 €. Sieh dir diese Abbuchung genauer an.',
          screen: bankOverview(),
          answer: 'tx-stream',
          ok: 'Die Details zeigen: „Streamdienst Plus – Monatsabo“.',
          other: 'Gesucht ist die Zeile mit −49,90 €.'
        },
        {
          ask: 'Fredi hat nie ein „Streamdienst Plus“-Abo abgeschlossen. Was tut er?',
          options: [
            ['Die Bank unter der Nummer auf der Bankkarte anrufen und die Abbuchung prüfen lassen.', true, 'Richtig. Eine Lastschrift, die du nicht erlaubt hast, kann die Bank zurückholen. Ist eine Karte betroffen, lässt du sie sperren.'],
            ['Nichts tun, das löst sich von selbst.', false, 'Ein Abo bucht jeden Monat wieder ab.'],
            ['Nach „Streamdienst Plus Hotline“ googeln und dort anrufen.', false, 'Über Suchergebnisse findest du leicht falsche Hotlines. Die Nummer deiner Bank steht auf deiner Karte.']
          ]
        },
        {
          tap: 'Du bist fertig. Melde dich ab.',
          screen: bankOverview(),
          answer: 'logout',
          ok: 'Abgemeldet. Das ist besonders an fremden Computern wichtig. Die Bank meldet dich nach einigen Minuten ohne Aktivität auch selbst ab.',
          wrong: { 'win-close': 'Das Fenster schließen ist nicht dasselbe wie abmelden. Klicke zuerst auf „Abmelden“.' }
        }
      ]
    },
    {
      id: 'ueberweisen',
      title: 'Eine Rechnung überweisen',
      goal: 'IBAN eingeben, Empfänger prüfen, freigeben',
      summary: [
        'Auf der Rechnung stehen **Empfänger**, **IBAN**, **Betrag** und **Zahlungsreferenz**.',
        'Am einfachsten: den **QR-Code** der Rechnung in der Bank-App scannen.',
        'Die Bank prüft, ob **Name und IBAN zusammenpassen**. Warnung? Abbrechen und selbst beim Empfänger nachfragen.',
        'Vor dem **Freigeben** Betrag und Empfänger prüfen. Freigabe-Anfrage ohne eigene Überweisung → **ablehnen und Bank anrufen**.'
      ],
      steps: [
        {
          show: 'Was du brauchst',
          text: 'Auf jeder Rechnung stehen die Angaben für die Überweisung: **Empfänger**, **IBAN** (die Kontonummer – in Österreich beginnt sie mit AT), **Betrag** und **Zahlungsreferenz** oder Verwendungszweck.\n\nViele Rechnungen haben einen **QR-Code**. Den scannst du in der Bank-App mit der Kamera – dann ist alles automatisch ausgefüllt.',
          screen: invoice()
        },
        {
          tap: 'Starte in der Bank-App am Handy eine neue Überweisung.',
          screen: bankHome(),
          answer: ['new-transfer', 'scan'],
          ok: 'Beide Wege führen zum Ziel. Beim Scannen füllt die App alles aus dem QR-Code aus. Wir tippen hier einmal selbst, damit du jedes Feld kennst.'
        },
        {
          type: 'Tippe die IBAN von der Rechnung ein: AT61 1904 3002 3457 3201',
          screen: transferForm(''),
          field: 'iban',
          expect: 'AT61 1904 3002 3457 3201',
          loose: true,
          help: 'Leerzeichen sind egal. Nach „AT“ kommen nur Ziffern. Tippe genau ab und vergleiche danach Vierergruppe für Vierergruppe.',
          ok: 'Stimmt. Eine falsche Ziffer würde die App übrigens meistens sofort bemerken.'
        },
        {
          show: 'Die Empfängerüberprüfung',
          text: 'Seit Oktober 2025 prüfen Banken in der EU vor jeder Überweisung, ob der **Name des Empfängers zur IBAN passt**. Das Ergebnis siehst du sofort:\n\n**Passt:** alles in Ordnung.\n**Passt fast:** Die Bank zeigt den richtigen Namen. Prüfe, ob das der gewünschte Empfänger ist.\n**Passt nicht:** Vorsicht. Nicht überweisen, sondern selbst nachfragen.',
          screen: transferForm('AT61 1904 3002 3457 3201', { banner: 'Name und IBAN passen zusammen.', tone: 'ok' })
        },
        {
          tap: 'Alles stimmt. Tippe auf „Weiter“.',
          screen: transferForm('AT61 1904 3002 3457 3201', { banner: 'Name und IBAN passen zusammen.', tone: 'ok' }),
          answer: 'continue',
          ok: 'Die App zeigt jetzt eine Zusammenfassung.'
        },
        {
          tap: 'Prüfe Betrag und Empfänger – dann gib die Überweisung frei.',
          screen: phoneApp('bank', 'Überweisung freigeben', [
            { kv: [['An', 'Installateur Berger GmbH'], ['IBAN', 'AT61 1904 3002 3457 3201'], ['Betrag', '**286,40 €**'], ['Referenz', 'RE-2026-0917']] },
            { p: 'Bestätige mit Fingerabdruck oder PIN.', small: true, muted: true },
            { btn: 'Freigeben', id: 'approve', full: true },
            { btn: 'Abbrechen', id: 'cancel', style: 'secondary', full: true }
          ]),
          answer: 'approve',
          ok: 'Überwiesen. Die Freigabe ist wie deine Unterschrift. Deshalb gibst du nur frei, was du selbst gerade beauftragt hast – und nur, wenn Betrag und Empfänger stimmen.',
          wrong: { cancel: 'Hier stimmt alles mit der Rechnung überein. Du darfst freigeben.' }
        },
        {
          ask: 'Eine E-Mail vom Installateur: „Neue Bankverbindung! Bitte überweisen Sie ab sofort auf …“. Bei der Überweisung warnt die Bank: „Name passt nicht zur IBAN“. Was tust du?',
          screen: transferForm('AT02 2011 1829 4471 5577', { banner: '**Name passt nicht zur IBAN.** Wenn du trotzdem überweist, bekommst du das Geld bei einem Irrtum oder Betrug womöglich nicht zurück.', tone: 'warn' }),
          options: [
            ['Abbrechen und beim Installateur unter der Nummer von seiner alten Rechnung oder Website anrufen.', true, 'Richtig. Gefälschte Rechnungen mit geänderter Kontonummer sind eine häufige Masche. Oft wurde das E-Mail-Postfach der Firma gehackt.'],
            ['Trotzdem überweisen – die Rechnung muss ja bezahlt werden.', false, 'Wer eine Warnung übergeht, trägt das Risiko meist selbst.'],
            ['Die Telefonnummer aus der neuen E-Mail anrufen.', false, 'Wenn die E-Mail gefälscht ist, meldet sich dort auch der Betrüger.']
          ]
        },
        {
          ask: 'Am Abend erscheint am Handy: „Überweisung freigeben: 1.980,00 € an Kovac M.“ Du hast nichts überwiesen. Was tust du?',
          screen: phoneApp('bank', 'Überweisung freigeben', [
            { kv: [['An', 'Kovac M.'], ['IBAN', 'LT12 1000 0111 0100 1000'], ['Betrag', '**1.980,00 €**']] },
            { btn: 'Freigeben', full: true },
            { btn: 'Ablehnen', style: 'secondary', full: true }
          ], { noBack: true }),
          options: [
            ['Ablehnen und sofort die Bank anrufen.', true, 'Richtig. Jemand hat offenbar Zugang zu deinem Online-Banking. Die Bank kann den Zugang sperren.'],
            ['Freigeben, vielleicht ist es ein Dauerauftrag.', false, 'Daueraufträge und Lastschriften brauchen keine Freigabe am Handy. Eine Freigabe, die du nicht selbst ausgelöst hast, ist immer ein Alarmzeichen.'],
            ['Ignorieren und abwarten.', false, 'Ohne Freigabe passiert zwar nichts – aber jemand kennt deine Zugangsdaten. Die Bank muss das wissen.']
          ]
        }
      ]
    },
    {
      id: 'finanzonline',
      title: 'FinanzOnline und ID Austria',
      goal: 'Anmelden, Bescheide finden, Arbeitnehmerveranlagung starten',
      summary: [
        '**ID Austria** ist dein digitaler Ausweis für Ämter. Anmeldungen bestätigst du in der App **Digitales Amt**.',
        'FinanzOnline: **finanzonline.bmf.gv.at** selbst eintippen → **Mit ID Austria anmelden**.',
        'Bescheide findest du in der **Databox**, die Arbeitnehmerveranlagung unter **Erklärungen**.',
        'Das Finanzamt schickt **keine Links per SMS** und fragt **nie nach Kartendaten**.'
      ],
      steps: [
        {
          show: 'ID Austria und FinanzOnline',
          text: '**ID Austria** ist dein digitaler Ausweis. Damit meldest du dich bei FinanzOnline, oesterreich.gv.at, ELGA und vielen anderen Ämtern an. Einrichten kannst du sie bei vielen Gemeindeämtern, Bezirkshauptmannschaften, Magistraten und Finanzämtern. Am Handy bestätigst du jede Anmeldung in der App **Digitales Amt**.\n\n**FinanzOnline** ist das Finanzamt im Internet. Dort machst du die Arbeitnehmerveranlagung (den „Steuerausgleich“) – auch für die Pension – und findest deine Bescheide.'
        },
        {
          type: 'Tippe die Adresse von FinanzOnline in die Adresszeile: finanzonline.bmf.gv.at',
          screen: googleStart(),
          field: 'address',
          expect: ['finanzonline.bmf.gv.at', 'https://finanzonline.bmf.gv.at'],
          help: 'Zwischen den Teilen stehen Punkte, keine Leerzeichen. Tipp: Danach mit dem Stern ein Lesezeichen anlegen.',
          ok: 'Richtig. Die Endung **gv.at** zeigt: eine österreichische Behörde.'
        },
        {
          tap: 'Melde dich mit ID Austria an.',
          screen: pcBrowser('finanzonline.bmf.gv.at/fon/', [
            { bar: { theme: 'bmf' } },
            { cols: [[
              { card: [{ h: 'Anmeldung mit ID Austria' }, { p: 'Empfohlen. Mit Handy und App „Digitales Amt“.', small: true, muted: true }, { btn: 'Mit ID Austria anmelden', id: 'idaustria', full: true }] }
            ], [
              { card: [{ h: 'Anmeldung mit Zugangskennung' }, { field: 'Teilnehmer-Identifikation' }, { field: 'Benutzer-Identifikation' }, { field: 'PIN', type: 'password' }, { btn: 'Login', id: 'login-pin', style: 'secondary', full: true }] }
            ]] }
          ], { tab: 'FinanzOnline – Anmeldung' }),
          answer: 'idaustria',
          ok: 'Du wirst zur Anmeldeseite von ID Austria weitergeleitet.',
          wrong: { 'login-pin': 'Das ist die ältere Anmeldung mit eigenen FinanzOnline-Zugangscodes. Mit ID Austria brauchst du diese Codes nicht.' }
        },
        {
          tap: 'ID Austria fragt nach deinem Benutzernamen. Er ist schon eingetragen. Klicke auf „Weiter“.',
          screen: pcBrowser('eid.oesterreich.gv.at/auth/idp/profile/SAML2', [
            { bar: { theme: 'gov', logo: 'ID Austria' } },
            { center: [
              { h: 'Anmelden bei: FinanzOnline', size: 'l' },
              { field: 'Benutzername', value: 'fredi.knoedelmayer' },
              { field: 'Passwort', type: 'password', value: 'xxxxxxxxxx' },
              { btn: 'Weiter', id: 'next', full: true }
            ] }
          ], { tab: 'ID Austria' }),
          answer: 'next',
          ok: 'Jetzt kommt eine Anfrage auf dein Handy.'
        },
        {
          tap: 'Am Handy erscheint die Anfrage in der App „Digitales Amt“. Prüfe, wofür – und bestätige.',
          screen: phoneApp('amt', 'Digitales Amt', [
            { center: [{ h: 'Anmeldung bestätigen', size: 'l' }] },
            { kv: [['Anwendung', 'FinanzOnline'], ['Betreiber', 'Bundesministerium für Finanzen'], ['Zeit', '09:41']] },
            { btn: 'Bestätigen', id: 'approve', full: true },
            { btn: 'Ablehnen', id: 'reject', style: 'secondary', full: true }
          ], { noBack: true }),
          answer: 'approve',
          ok: 'Danach bestätigst du mit Fingerabdruck, Gesicht oder PIN. Auch hier gilt: nur bestätigen, was du gerade selbst am Computer machst.',
          wrong: { reject: 'Du meldest dich gerade selbst bei FinanzOnline an – das passt. Hier darfst du bestätigen.' }
        },
        {
          show: 'Die Startseite von FinanzOnline',
          screen: foPC([
            { h: 'Willkommen, Alfred Knödelmayer', size: 'l' },
            { banner: 'Sie haben **1 neue Nachricht** in Ihrer Databox.', tone: 'info' },
            { row: 'Arbeitnehmerveranlagung 2025', sub: 'Noch nicht eingereicht', icon: 'edit' },
            { row: 'Einkommensteuerbescheid 2024', sub: 'Gutschrift 312,00 €', icon: 'file' }
          ]),
          marks: { 'fo-erkl': 1, 'fo-databox': 2 },
          legend: [
            '**Erklärungen:** Hier startest du die Arbeitnehmerveranlagung.',
            '**Databox:** dein Postkasten beim Finanzamt. Bescheide kommen hierher – oft nicht mehr per Brief. Du kannst dich per E-Mail verständigen lassen, wenn etwas Neues da ist.'
          ]
        },
        {
          tap: 'Wo findest du deinen neuen Steuerbescheid?',
          screen: foPC([
            { h: 'Willkommen, Alfred Knödelmayer', size: 'l' },
            { banner: 'Sie haben **1 neue Nachricht** in Ihrer Databox.', tone: 'info' }
          ]),
          answer: 'fo-databox',
          ok: 'Richtig. In der Databox liegt der Bescheid als PDF. Du kannst ihn öffnen, speichern und drucken.',
          wrong: { 'fo-abfragen': 'Unter Abfragen siehst du zum Beispiel dein Steuerkonto. Bescheide liegen in der Databox.' }
        },
        {
          tap: 'Starte die Arbeitnehmerveranlagung für 2025.',
          screen: foPC([
            { h: 'Willkommen, Alfred Knödelmayer', size: 'l' },
            { row: 'Arbeitnehmerveranlagung 2025', sub: 'Noch nicht eingereicht', icon: 'edit' }
          ]),
          answer: 'fo-erkl',
          ok: 'Unter „Erklärungen“ wählst du „Arbeitnehmerveranlagung“ und das Jahr. Das Formular führt Schritt für Schritt durch. Spenden und Kirchenbeitrag sind meist schon automatisch übermittelt.'
        },
        {
          ask: 'SMS: „Finanzamt: Ihre Rückerstattung von 438,20 € ist bereit. Bestätigen Sie Ihre Karte: bmf-rueck.at-erstattung.com“. Was stimmt?',
          options: [
            ['Betrug. Das Finanzamt schickt keine Links per SMS und fragt nie nach Kartendaten.', true, 'Richtig. Guthaben überweist das Finanzamt auf das Konto, das in FinanzOnline hinterlegt ist. Ob du etwas bekommst, siehst du, wenn du dich selbst anmeldest.'],
            ['Echt – aber ich sollte mich beeilen.', false, 'Zeitdruck ist ein typisches Zeichen für Betrug.'],
            ['Ich antworte lieber mit meiner IBAN, das ist sicherer als die Karte.', false, 'Auch die IBAN gehört nicht in eine Antwort an Unbekannte.']
          ]
        }
      ]
    }
  ]
};
