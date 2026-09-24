import { phoneApp, phoneHome, phoneBrowser, whatsappChat, smsChat } from './ui.js';

const chatList = (extra = {}) => phoneApp('whatsapp', 'WhatsApp', [
  { chips: [{ text: 'Alle', active: true }, { text: 'Ungelesen' }, { text: 'Gruppen' }] },
  { row: 'Anna Huber', sub: 'Kommst du am Sonntag zum Essen?', meta: '09:12', avatar: 'Anna', color: '#b0578d', bold: true, id: 'chat-anna' },
  { row: 'Familie', sub: 'Gerti: Alles Gute zum Geburtstag! 🎂', meta: '08:40', avatar: 'Familie', color: '#3d8a6a', id: 'chat-familie' },
  { row: 'Stammtisch Leonding', sub: 'Hans: Donnerstag wie immer?', meta: 'Gestern', avatar: 'Stammtisch', color: '#8a6d3b', id: 'chat-stamm' },
  { row: 'Tochter Lisa', sub: 'Foto', meta: 'Mo.', avatar: 'Lisa', color: '#5b6fd6', id: 'chat-lisa' }
], { noBack: true, actions: [{ icon: 'camera', id: 'wa-cam', label: 'Kamera' }, { icon: 'search', id: 'wa-search', label: 'Suchen' }], fab: { id: 'wa-new', text: 'Neuer Chat', icon: 'plus' }, ...extra });

const annaChat = (extra = {}) => whatsappChat('Anna Huber', [
  { msg: 'Hallo Papa! Kommst du am Sonntag zum Essen?', time: '09:12' },
  { msg: 'Und schick mir bitte ein Foto vom Garten 🌻', time: '09:12' }
], extra);

const settingsList = (extra = {}) => phoneApp('settings', 'Einstellungen', [
  { field: '', id: 'set-search', placeholder: 'Einstellungen durchsuchen' },
  { row: 'Verbindungen', sub: 'WLAN · Bluetooth · Flugmodus', icon: 'wifi', color: '#1a73e8', id: 'set-conn', chev: true },
  { row: 'Töne und Vibration', sub: 'Klingelton · Lautstärke', icon: 'sound', color: '#8e44ad', id: 'set-sound', chev: true },
  { row: 'Benachrichtigungen', sub: 'Welche Apps Hinweise zeigen', icon: 'bell', color: '#e67e22', id: 'set-notif', chev: true },
  { row: 'Anzeige', sub: 'Helligkeit · Schriftgröße', icon: 'sparkle', color: '#16a085', id: 'set-display', chev: true },
  { row: 'Akku', sub: '78 %', icon: 'battery', color: '#27ae60', id: 'set-battery', chev: true },
  { row: 'Sicherheit', sub: 'Bildschirmsperre · Fingerabdruck', icon: 'lock', color: '#2c3e50', id: 'set-security', chev: true },
  { row: 'Software-Update', sub: 'Update verfügbar', icon: 'download', color: '#c0392b', id: 'set-update', chev: true }
], { noBack: true, menu: false, ...extra });

const playResults = (extra = {}) => phoneApp('play', 'whatsapp', [
  { row: 'Chat Messenger Pro', sub: '**Gesponsert** · Apps4U Ltd · 3,1 ★', app: 'sms', id: 'ps-ad' },
  { row: 'WhatsApp Messenger', sub: 'WhatsApp LLC · 4,3 ★ · 5 Mrd.+ Downloads', app: 'whatsapp', id: 'ps-wa' },
  { row: 'WhatsApp Business', sub: 'WhatsApp LLC · 4,2 ★ · für Firmen', app: 'whatsapp', id: 'ps-wab' },
  { row: 'Messenger für Chats', sub: 'Free Tools Studio · 3,8 ★', app: 'sms', id: 'ps-other' }
], { sub: 'Suchergebnisse im Play Store', ...extra });

export default {
  title: 'Das Handy',
  goal: 'Android bedienen, einstellen, Apps holen und WhatsApp nutzen',
  lessons: [
    {
      id: 'handy',
      title: 'Tippen, wischen, zurück',
      goal: 'Die Tasten und Bewegungen am Android-Handy',
      summary: [
        'Unten am Handy: **Zurück** (einen Schritt zurück), **Home** (Startbildschirm), **Übersicht** (offene Apps).',
        'Ohne Tasten: von unten nach oben wischen = Home, vom Rand zur Mitte wischen = Zurück.',
        '**Lange drücken** öffnet ein Zusatzmenü. **Zwei Finger auseinander** vergrößert.',
        'Apps musst du nicht extra schließen.'
      ],
      steps: [
        {
          show: 'Die drei Tasten unten',
          text: 'Auf vielen Android-Handys sind unten drei Tasten. Bei Samsung ist die Reihenfolge oft umgekehrt.\n\nSiehst du keine Tasten, verwendet dein Handy **Wischgesten**: Vom unteren Rand nach oben wischen bringt dich zum Startbildschirm. Vom linken oder rechten Rand zur Mitte wischen geht zurück.',
          screen: phoneHome(),
          marks: { 'ph-back': 1, 'ph-home': 2, 'ph-recent': 3 },
          legend: [
            '**Zurück:** einen Schritt zurück.',
            '**Home:** zum Startbildschirm. Die App wartet im Hintergrund.',
            '**Übersicht:** zeigt die zuletzt geöffneten Apps.'
          ]
        },
        {
          tap: 'Öffne WhatsApp.',
          text: 'Tippe kurz mit der Fingerkuppe auf das grüne Symbol.',
          screen: phoneHome(),
          answer: 'app-whatsapp',
          ok: 'WhatsApp ist offen. Ein kurzes Antippen ist am Handy dasselbe wie ein Klick am Computer.',
          other: 'Das ist eine andere App. WhatsApp ist das grüne Symbol mit der Sprechblase.'
        },
        {
          tap: 'Du bist im Chat mit Anna. Geh einen Schritt zurück zur Liste aller Chats.',
          screen: annaChat(),
          answer: ['ph-back', 'app-back'],
          ok: 'Beide Pfeile führen zurück: der unten am Handy und der oben links in der App.'
        },
        {
          tap: 'Geh direkt zum Startbildschirm.',
          screen: chatList(),
          answer: 'ph-home',
          ok: 'Egal wo du bist: Die Home-Taste bringt dich immer zum Startbildschirm.'
        },
        {
          show: 'Tippen, halten, wischen, zoomen',
          text: '**Tippen:** kurz antippen. Wie ein Klick.\n**Lange drücken:** den Finger etwa eine Sekunde liegen lassen. Es erscheint ein Zusatzmenü – wie die rechte Maustaste am Computer.\n**Wischen:** Finger auflegen und ziehen, um zu blättern.\n**Zoomen:** zwei Finger auflegen und auseinanderziehen. Zusammenziehen macht wieder kleiner.',
          fredi: ['ratlos', 'Mit meine Wurstfinger triff i oft des Falsche. Macht nix – einfach Zurück drücken.']
        },
        {
          ask: 'Auf einem Foto ist eine Schrift zu klein zum Lesen. Was tust du?',
          options: [
            ['Zwei Finger auf das Foto legen und auseinanderziehen.', true, 'Richtig. So vergrößerst du Fotos, Karten und viele Internetseiten.'],
            ['Lange auf das Foto drücken.', false, 'Das öffnet ein Menü, zum Beispiel zum Teilen oder Löschen.'],
            ['Das Foto nach links wischen.', false, 'Damit blätterst du zum nächsten Foto.']
          ]
        },
        {
          ask: 'Du hast eine App mit der Home-Taste verlassen. Ist sie jetzt geschlossen?',
          options: [
            ['Nein, sie wartet im Hintergrund. Das ist normal.', true, 'Richtig. Du musst Apps nicht schließen. Nur wenn eine App hängt: Übersichts-Taste antippen und die App nach oben wegwischen.'],
            ['Ja, sie ist ganz beendet.', false, 'Sie läuft im Hintergrund weiter. Beim nächsten Öffnen bist du wieder an derselben Stelle.'],
            ['Ja, und alles darin ist gelöscht.', false, 'Nichts wird gelöscht. Deine Chats und Fotos bleiben.']
          ]
        }
      ]
    },
    {
      id: 'leiste',
      title: 'Die obere Leiste',
      goal: 'Benachrichtigungen, WLAN und Taschenlampe',
      summary: [
        'Vom **oberen Rand nach unten wischen**: Schnellschalter und Benachrichtigungen.',
        'Schalter antippen = ein oder aus. Farbig = eingeschaltet.',
        'Zu Hause immer mit **WLAN** – das ist schneller und verbraucht kein Datenvolumen.',
        '„Virus“-Warnungen von Internetseiten sind Werbung. Nicht antippen.'
      ],
      steps: [
        {
          show: 'Von oben nach unten wischen',
          text: 'Leg den Finger an den **oberen Rand** des Bildschirms und zieh ihn nach unten. Es erscheinen Schnellschalter und deine Benachrichtigungen. Ein zweites Mal wischen zeigt alle Schalter.',
          screen: { device: 'phone', view: 'shade', notifs: [{ id: 'n-anna', app: 'whatsapp', title: 'Anna Huber', text: 'Kommst du am Sonntag zum Essen?' }, { id: 'n-post', app: 'gmail', title: 'Österreichische Post', text: 'Ihre Sendung kommt heute' }] },
          marks: { 'tile-wifi': 1, 'tile-light': 2, 'n-anna': 3 },
          legend: [
            '**WLAN:** Internet über den Router zu Hause. Farbig = eingeschaltet.',
            '**Taschenlampe:** das Licht an der Rückseite des Handys.',
            '**Benachrichtigungen:** neue Nachrichten und Hinweise. Antippen öffnet die App.'
          ]
        },
        {
          tap: 'Es ist dunkel im Stiegenhaus. Schalte die Taschenlampe ein.',
          screen: { device: 'phone', view: 'shade', notifs: [{ id: 'n-anna', app: 'whatsapp', title: 'Anna Huber', text: 'Kommst du am Sonntag zum Essen?' }] },
          answer: 'tile-light',
          ok: 'Das Licht ist an. Nochmal antippen schaltet es aus.',
          wrong: {
            'tile-dnd': '„Nicht stören“ schaltet Töne für Anrufe und Nachrichten aus.',
            'tile-plane': 'Der Flugmodus trennt alle Verbindungen. Dann kannst du nicht telefonieren.',
            'tile-bt': 'Bluetooth verbindet das Handy zum Beispiel mit Kopfhörern oder dem Auto.'
          }
        },
        {
          tap: 'Öffne die Nachricht von Anna.',
          screen: { device: 'phone', view: 'shade', notifs: [{ id: 'n-anna', app: 'whatsapp', title: 'Anna Huber', text: 'Kommst du am Sonntag zum Essen?' }, { id: 'n-post', app: 'gmail', title: 'Österreichische Post', text: 'Ihre Sendung kommt heute' }] },
          answer: 'n-anna',
          ok: 'WhatsApp öffnet sich direkt im richtigen Chat. Eine Benachrichtigung nach links oder rechts wischen blendet sie aus.'
        },
        {
          ask: 'Du bist zu Hause, aber alles lädt langsam. Oben steht „5G“, das WLAN ist grau. Was ist los?',
          screen: { device: 'phone', view: 'shade', mobile: true, tiles: [
            { id: 'tile-wifi', icon: 'wifi', text: 'WLAN', sub: 'Aus', on: false },
            { id: 'tile-bt', icon: 'bluetooth', text: 'Bluetooth', on: false },
            { id: 'tile-light', icon: 'flashlight', text: 'Taschenlampe', on: false },
            { id: 'tile-dnd', icon: 'moon', text: 'Nicht stören', on: false },
            { id: 'tile-sound', icon: 'sound', text: 'Ton', on: true },
            { id: 'tile-plane', icon: 'plane', text: 'Flugmodus', on: false }
          ] },
          options: [
            ['Das WLAN ist ausgeschaltet. Ich tippe auf den WLAN-Schalter.', true, 'Richtig. Ohne WLAN verwendet das Handy das Datenvolumen aus deinem Handytarif. Zu Hause ist WLAN meist schneller.'],
            ['Das Handy ist kaputt.', false, 'Es funktioniert. Nur das WLAN ist aus.'],
            ['Ich brauche einen neuen Handyvertrag.', false, 'Nicht nötig. Schalte das WLAN ein.']
          ]
        },
        {
          ask: 'Eine Benachrichtigung: „WARNUNG: 4 Viren gefunden! Jetzt entfernen“. Was tust du?',
          screen: { device: 'phone', view: 'shade', notifs: [{ id: 'n-virus', app: 'chrome', title: '⚠ 4 Viren gefunden!', text: 'schnellreiniger.xyz · Ihr Handy ist in Gefahr. Jetzt entfernen!' }] },
          options: [
            ['Nicht antippen. Lange darauf drücken und die Benachrichtigungen dieser Seite ausschalten.', true, 'Richtig. Das ist Werbung einer Internetseite, der irgendwann „Benachrichtigungen erlauben“ gestattet wurde. Das Handy selbst warnt nicht so.'],
            ['Antippen und die empfohlene App installieren.', false, 'Solche „Reiniger“ sind oft Abo-Fallen oder selbst Schadprogramme.'],
            ['Das Handy auf Werkseinstellungen zurücksetzen.', false, 'Nicht nötig – und dabei gehen alle Daten verloren. Es ist nur Werbung.']
          ]
        }
      ]
    },
    {
      id: 'einstellungen',
      title: 'Einstellungen',
      goal: 'Schrift vergrößern, WLAN verbinden, Updates',
      summary: [
        'Die App **Einstellungen** (Zahnrad) regelt alles am Handy. Oben gibt es eine **Suche**.',
        'Schrift größer: **Einstellungen → Anzeige → Schriftgröße**.',
        'Das **WLAN-Passwort** steht meist auf einem Aufkleber am Router.',
        '**Software-Updates** installieren – am besten abends mit Ladekabel.'
      ],
      steps: [
        {
          show: 'Die App Einstellungen',
          text: 'In der App **Einstellungen** (das graue Zahnrad) stellst du dein Handy ein. Die Namen der Menüs unterscheiden sich je nach Hersteller ein wenig. Wenn du etwas nicht findest: oben in die **Suche** tippen und ein Stichwort eingeben, zum Beispiel „Schrift“.',
          screen: settingsList()
        },
        {
          tap: 'Die Schrift auf deinem Handy soll größer werden. Wo findest du das?',
          screen: settingsList(),
          answer: ['set-display', 'set-search'],
          ok: 'Unter **Anzeige** findest du Helligkeit und Schriftgröße. Über die Suche oben kommst du ebenfalls hin.',
          other: 'Hier geht es um etwas anderes. Die Schriftgröße gehört zur Anzeige.'
        },
        {
          tap: 'Mach die Schrift größer.',
          screen: phoneApp('settings', 'Schriftgröße und -stil', [
            { card: [{ p: 'So sieht Text aus: Kommst du am Sonntag zum Essen?' }] },
            { p: 'Schriftgröße', small: true, muted: true },
            { slider: 35 },
            { toggle: 'Fette Schrift', sub: 'Text dicker darstellen', id: 'bold-text' }
          ]),
          answer: 'font-plus',
          ok: 'Jeder Tipp auf das große A macht die Schrift eine Stufe größer. Probier auch „Fette Schrift“ – das ist oft leichter zu lesen.',
          wrong: { 'font-minus': 'Das kleine A macht die Schrift kleiner.', 'bold-text': 'Das macht die Schrift dicker, aber nicht größer. Gesucht ist das große A.' }
        },
        {
          tap: 'Verbinde dich mit dem WLAN zu Hause: „Huber-Zuhause“.',
          screen: phoneApp('settings', 'WLAN', [
            { toggle: 'WLAN', on: true, id: 'wifi-toggle' },
            { p: 'Verfügbare Netzwerke', small: true, muted: true },
            { row: 'Huber-Zuhause', sub: 'Gesichert', icon: 'wifi', id: 'wlan-home' },
            { row: 'Magenta-4F2A', sub: 'Gesichert', icon: 'wifi', id: 'wlan-neighbour' },
            { row: 'Cafe-Gast', sub: 'Offen', icon: 'wifi', id: 'wlan-cafe' }
          ]),
          answer: 'wlan-home',
          ok: 'Jetzt fragt das Handy nach dem Passwort.',
          wrong: { 'wlan-neighbour': 'Das ist das WLAN der Nachbarn.', 'wlan-cafe': 'Das ist ein fremdes, offenes WLAN.', 'wifi-toggle': 'Damit schaltest du WLAN ganz aus.' }
        },
        {
          type: 'Gib das WLAN-Passwort ein: K7mp4Rt9',
          text: 'Das WLAN-Passwort steht meist auf einem Aufkleber an der Unterseite des Routers („WLAN-Schlüssel“ oder „WPA-Key“). **Groß- und Kleinschreibung ist wichtig.**',
          screen: phoneApp('settings', 'WLAN', [{ row: 'Huber-Zuhause', sub: 'Gesichert', icon: 'wifi' }], {
            dialog: { title: 'Huber-Zuhause', body: [{ field: 'Passwort', id: 'wlan-pw' }], buttons: [{ text: 'Abbrechen' }, { text: 'Verbinden', primary: true }] }
          }),
          field: 'wlan-pw',
          expect: 'K7mp4Rt9',
          caseSensitive: true,
          help: 'Am Handy: Für einen Großbuchstaben zuerst den Pfeil **⇧** links auf der Handy-Tastatur antippen. Zahlen findest du in der obersten Reihe oder hinter der Taste **?123**.',
          ok: 'Verbunden. Das Handy merkt sich das Passwort und verbindet sich zu Hause ab jetzt von selbst.'
        },
        {
          ask: 'In den Einstellungen steht: „Software-Update verfügbar“. Was tust du?',
          screen: phoneApp('settings', 'Software-Update', [
            { center: [{ h: 'Update verfügbar' }, { p: 'Android-Sicherheitsupdate · 612 MB', muted: true }, { p: 'Dein Handy startet dabei neu. Deine Daten bleiben erhalten.', small: true }] },
            { btn: 'Jetzt installieren', id: 'upd-now', full: true },
            { btn: 'Heute Nacht installieren', id: 'upd-night', style: 'secondary', full: true }
          ]),
          options: [
            ['Installieren – jetzt oder über Nacht, mit Ladekabel und WLAN.', true, 'Richtig. Updates schließen Sicherheitslücken. Fotos, Kontakte und Apps bleiben erhalten.'],
            ['Ignorieren, das Handy funktioniert ja.', false, 'Ohne Updates bleiben bekannte Lücken offen, die Betrüger ausnutzen.'],
            ['Nur installieren, wenn mich jemand anruft und dazu rät.', false, 'Updates startest du selbst in den Einstellungen. Anrufe zu Updates sind fast immer Betrug.']
          ]
        }
      ]
    },
    {
      id: 'apps',
      title: 'Apps installieren',
      goal: 'Nur aus dem Play Store, Berechtigungen prüfen',
      summary: [
        'Apps nur aus dem **Google Play Store** installieren – nie über Links aus SMS oder E-Mail.',
        'Auf den **Hersteller** achten. „Gesponsert“ ist Werbung für eine andere App.',
        'Warnung „Unbekannte App installieren?“ → **Abbrechen**.',
        'Berechtigungen nur erlauben, wenn die App sie für ihre Aufgabe braucht.'
      ],
      steps: [
        {
          show: 'Der Play Store',
          text: 'Neue Apps holst du aus dem **Google Play Store** (das bunte Dreieck). Dort werden Apps geprüft. Im Suchergebnis steht unter jeder App der **Hersteller**.',
          screen: playResults(),
          marks: { 'ps-ad': 1, 'ps-wa': 2 },
          legend: [
            '**Gesponsert:** bezahlte Werbung. Oft eine ähnlich klingende, aber andere App.',
            '**Das Original:** Name, Hersteller und sehr viele Downloads passen zusammen.'
          ]
        },
        {
          tap: 'Fredi möchte WhatsApp installieren. Tippe auf das richtige Suchergebnis.',
          screen: playResults(),
          answer: 'ps-wa',
          ok: 'Richtig. „WhatsApp Messenger“ vom Hersteller WhatsApp LLC ist das Original.',
          wrong: {
            'ps-ad': 'Das ist eine Anzeige für eine andere App. Achte auf den Hersteller: WhatsApp kommt von „WhatsApp LLC“.',
            'ps-wab': 'Das ist die Version für Firmen. Für private Chats nimmst du „WhatsApp Messenger“.',
            'ps-other': 'Das ist eine andere App von einem anderen Hersteller.'
          }
        },
        {
          tap: 'Tippe auf „Installieren“.',
          screen: phoneApp('play', 'WhatsApp Messenger', [
            { row: 'WhatsApp Messenger', sub: 'WhatsApp LLC', app: 'whatsapp' },
            { kv: [['Bewertung', '4,3 ★'], ['Downloads', '5 Mrd.+'], ['Preis', 'Kostenlos']] },
            { btn: 'Installieren', id: 'install', full: true },
            { p: 'Einfach. Zuverlässig. Privat. Nachrichten und Anrufe mit Familie und Freunden.', small: true, muted: true }
          ]),
          answer: 'install',
          ok: 'Die App wird geladen und erscheint dann auf dem Startbildschirm. Ob eine App etwas kostet, steht direkt auf dem Knopf – dort stünde dann ein Preis.'
        },
        {
          ask: 'SMS: „Ihr Paket wartet. Installieren Sie unsere Tracking-App: post-at-track.info/app.apk“. Was tust du?',
          screen: smsChat('+43 681 0204 4117', [{ msg: 'Ihr Paket wartet. Installieren Sie unsere Tracking-App: post-at-track.info/app.apk', time: '10:02' }], { sub: 'Unbekannte Nummer' }),
          options: [
            ['Nichts installieren und die SMS löschen.', true, 'Richtig. Apps aus Links sind eine der häufigsten Betrugsmaschen. Solche Apps können SMS mitlesen und Bank-Codes abfangen.'],
            ['Installieren – ich erwarte ja ein Paket.', false, 'Die echte Post-App gibt es nur im Play Store. Sendungen kannst du auch auf post.at verfolgen.'],
            ['Installieren und gleich wieder löschen.', false, 'Schon die Installation kann Schaden anrichten.']
          ]
        },
        {
          tap: 'Das Handy warnt vor einer unbekannten App. Tippe auf die sichere Wahl.',
          screen: phoneBrowser('post-at-track.info/app.apk', [{ h: 'Tracking-App herunterladen' }], {
            dialog: { title: 'Unbekannte App installieren?', text: 'Aus Sicherheitsgründen darf Chrome auf deinem Handy keine unbekannten Apps aus dieser Quelle installieren.', buttons: [{ text: 'Einstellungen', id: 'unknown-settings' }, { text: 'Abbrechen', id: 'unknown-cancel', primary: true }] }
          }),
          answer: 'unknown-cancel',
          ok: 'Richtig. Diese Sperre schützt dich. Lass sie eingeschaltet.',
          wrong: { 'unknown-settings': 'Dort würdest du die Sperre aufheben. Genau das wollen die Betrüger.' }
        },
        {
          show: 'Wenn eine App um Erlaubnis fragt',
          text: 'Nach dem Installieren fragen Apps um Erlaubnis: für **Kamera**, **Standort**, **Kontakte** oder **Benachrichtigungen**. Frag dich: **Braucht die App das für ihre Aufgabe?**\n\nWhatsApp braucht die Kontakte, um zu zeigen, wer von deinen Bekannten WhatsApp hat. Eine Taschenlampen-App braucht keine Kontakte.',
          screen: phoneApp('whatsapp', 'WhatsApp', [{ space: 200 }], {
            dialog: { title: 'WhatsApp Zugriff auf deine Kontakte erlauben?', buttons: [{ text: 'Erlauben', primary: true }, { text: 'Nicht erlauben' }], stack: true }
          })
        },
        {
          ask: 'Eine Wetter-App möchte Zugriff auf deine Kontakte und deine SMS. Was tust du?',
          options: [
            ['„Nicht erlauben“ wählen.', true, 'Richtig. Für das Wetter braucht die App höchstens deinen ungefähren Standort. Wenn eine App ohne Grund viel will: löschen.'],
            ['Erlauben, sonst funktioniert die App nicht.', false, 'Eine Wetter-App funktioniert auch ohne deine Kontakte und SMS.'],
            ['Das Handy neu starten.', false, 'Das ändert nichts an der Frage der App.']
          ]
        }
      ]
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp: Fotos und Sprachnachrichten',
      goal: 'Ein Foto schicken und die Häkchen verstehen',
      summary: [
        'Foto schicken: Chat öffnen → **Büroklammer** → **Galerie** → Foto wählen → **Senden**.',
        'Sprachnachricht: **Mikrofon** gedrückt halten, sprechen, loslassen.',
        'Ein grauer Haken = gesendet, zwei graue = angekommen, zwei **blaue** = gelesen.'
      ],
      steps: [
        {
          tap: 'Anna möchte ein Foto vom Garten. Öffne den Chat mit Anna.',
          screen: chatList(),
          answer: 'chat-anna',
          ok: 'Der Chat ist offen. Unten ist das Feld zum Schreiben.'
        },
        {
          tap: 'Tippe auf die Büroklammer, um ein Foto anzuhängen.',
          screen: annaChat(),
          answer: 'attach',
          ok: 'Jetzt siehst du, was du alles schicken kannst.',
          wrong: {
            'c-camera': 'Die Kamera macht ein neues Foto. Du willst ein vorhandenes Foto schicken – dafür nimmst du die Büroklammer.',
            'c-mic': 'Das Mikrofon nimmt eine Sprachnachricht auf, solange du den Finger darauf hältst.',
            'c-emoji': 'Das sind Emojis, kleine Bildchen für den Text.',
            'wa-call': 'Damit rufst du Anna an.'
          }
        },
        {
          tap: 'Wähle „Galerie“, um deine Fotos zu sehen.',
          screen: annaChat({ sheet: [{ grid: [
            { id: 'att-doc', app: 'word', text: 'Dokument' },
            { id: 'att-cam', app: 'camera', text: 'Kamera' },
            { id: 'att-gallery', app: 'photos', text: 'Galerie' },
            { id: 'att-loc', app: 'maps', text: 'Standort' },
            { id: 'att-contact', app: 'phone', text: 'Kontakt' },
            { id: 'att-cal', app: 'calendar', text: 'Termin' }
          ] }] }),
          answer: 'att-gallery',
          ok: 'Deine Fotos werden angezeigt. Du tippst eines an, dann erscheint eine Vorschau.',
          wrong: { 'att-cam': 'Die Kamera macht ein neues Foto. Die vorhandenen findest du in der Galerie.', 'att-doc': 'Dokument ist für PDFs und andere Dateien.' }
        },
        {
          tap: 'Das Gartenfoto ist ausgewählt. Schick es ab.',
          screen: phoneApp('whatsapp', 'Anna Huber', [{ img: 'Garten im September', tone: 'garden' }], { avatar: 'Anna', sub: 'Foto senden', composer: { text: 'Unser Garten 🌻' } }),
          answer: 'send',
          ok: 'Gesendet. Du kannst vorher auch einen kurzen Text dazuschreiben – er erscheint unter dem Foto.',
          other: 'Gesucht ist der grüne runde Knopf mit dem Papierflieger rechts unten.'
        },
        {
          ask: 'Du willst Anna etwas Längeres erzählen, aber Tippen dauert. Was geht einfacher?',
          options: [
            ['Das Mikrofon gedrückt halten, sprechen und loslassen.', true, 'Richtig. Beim Loslassen wird die Sprachnachricht gesendet. Wischst du beim Halten nach oben, rastet die Aufnahme ein und du musst nicht mehr halten.'],
            ['Die Kamera antippen.', false, 'Das macht ein Foto oder Video.'],
            ['Anna eine E-Mail schreiben.', false, 'Geht auch – aber eine Sprachnachricht ist schneller.']
          ]
        },
        {
          ask: 'Neben deiner Nachricht stehen zwei blaue Häkchen. Was heißt das?',
          screen: whatsappChat('Anna Huber', [
            { msg: 'Hallo Papa! Kommst du am Sonntag zum Essen?', time: '09:12' },
            { msg: 'Ja, gerne! Ich bring Kuchen mit.', out: true, time: '09:20' }
          ]),
          options: [
            ['Anna hat die Nachricht gelesen.', true, 'Richtig. Ein grauer Haken: gesendet. Zwei graue: auf Annas Handy angekommen. Zwei blaue: gelesen.'],
            ['Die Nachricht ist verloren gegangen.', false, 'Nein, die Häkchen zeigen, dass sie angekommen ist.'],
            ['Anna hat schon geantwortet.', false, 'Eine Antwort würde als eigene Sprechblase links erscheinen.']
          ]
        }
      ]
    }
  ]
};
