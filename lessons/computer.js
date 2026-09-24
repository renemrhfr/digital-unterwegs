import { loose, desktop, pcBrowser, pcApp } from './ui.js';

const news = (extra = {}) => pcBrowser('wetter-und-nachrichten.at/wochenende', [
  { bar: { theme: 'shop', logo: 'Wetter & Nachrichten' } },
  { h: 'Sonniges Wochenende in ganz Österreich', size: 'l' },
  { p: 'Nach dem Regen der letzten Tage wird es ab Samstag wieder warm. In Linz und Wien sind bis zu 24 Grad möglich …', muted: true },
  { btn: 'Weiterlesen', id: 'more' },
  { link: 'Wetter für die nächsten 14 Tage', id: 'more14' }
], { tab: 'Wetter & Nachrichten', ...extra });

const explorer = (extra = {}) => pcApp('explorer', 'Downloads', [
  { cols: [[{ nav: [
    { text: 'Start', icon: 'home', id: 'x-home' },
    { text: 'Desktop', icon: 'square', id: 'x-desk' },
    { text: 'Downloads', icon: 'download', id: 'x-dl', active: true },
    { text: 'Dokumente', icon: 'file', id: 'x-docs' },
    { text: 'Bilder', icon: 'image', id: 'x-pics' }
  ] }], [
    { p: 'Heute', small: true, muted: true },
    { row: 'Stromrechnung_August.pdf', icon: 'file', color: '#d93025', meta: '312 KB', id: 'f-strom', dense: true },
    { row: 'Lohnzettel_2025.pdf', icon: 'file', color: '#d93025', meta: '88 KB', id: 'f-lohn', dense: true },
    { p: 'Letzte Woche', small: true, muted: true },
    { row: 'Garten_September.jpg', icon: 'image', color: '#1a73e8', meta: '2,1 MB', id: 'f-garten', dense: true },
    { row: 'Fahrplan_Linz_Wien.pdf', icon: 'file', color: '#d93025', meta: '140 KB', id: 'f-fahrplan', dense: true }
  ]], w: '170px 1fr' }
], { pinned: ['explorer', 'edge', 'outlook'], running: ['explorer'], ...extra });

export default {
  title: 'Der Computer',
  goal: 'Maus, Tastatur, Fenster und Dateien unter Windows',
  lessons: [
    {
      id: 'maus',
      title: 'Die Maus',
      goal: 'Klicken, Doppelklicken und Blättern',
      summary: [
        'Klicken heißt: einmal kurz die **linke** Maustaste drücken.',
        'Blättern: am **Mausrad** drehen, am Laptop mit **zwei Fingern** über das Touchpad wischen.',
        '**Doppelklick** brauchst du nur für Ordner und Dateien auf dem Desktop und im Explorer.',
        'Aus Versehen ein Menü geöffnet? **Esc** drücken oder daneben klicken.'
      ],
      steps: [
        {
          show: 'Die Maus',
          text: 'Leg die Hand locker auf die Maus. Der Zeigefinger liegt auf der linken Taste, der Mittelfinger auf der rechten. Wenn du die Maus über den Tisch schiebst, bewegt sich am Bildschirm ein kleiner Pfeil mit: der **Mauszeiger**.',
          screen: loose([{ mouse: true }]),
          marks: { 'mouse-left': 1, 'mouse-wheel': 2, 'mouse-right': 3 },
          legend: [
            '**Linke Taste:** der normale Klick. Damit wählst du aus und öffnest.',
            '**Rad:** drehen, um eine Seite nach oben oder unten zu blättern.',
            '**Rechte Taste:** öffnet ein kleines Zusatzmenü. Brauchst du selten.'
          ]
        },
        {
          tap: 'Welche Taste drückst du für einen normalen Klick?',
          screen: loose([{ mouse: true }]),
          answer: 'mouse-left',
          ok: 'Genau. Wenn in einer Anleitung „klicken“ steht, ist immer die linke Taste gemeint.',
          wrong: {
            'mouse-right': 'Die rechte Taste öffnet ein Zusatzmenü. Für einen normalen Klick nimmst du die linke.',
            'mouse-wheel': 'Das Rad ist zum Blättern. Zum Klicken nimmst du eine der Tasten.'
          }
        },
        {
          show: 'Am Laptop: das Touchpad',
          text: 'Am Laptop ersetzt das **Touchpad** unter der Tastatur die Maus:\n\n**Ein Finger** darüber bewegen: der Zeiger bewegt sich.\n**Einmal kurz tippen** oder unten links drücken: Klick.\n**Zwei Finger** gleichzeitig nach oben oder unten ziehen: blättern.\n\nWer lieber mit Maus arbeitet, kann an jeden Laptop eine normale Maus anstecken.'
        },
        {
          tap: 'Klicke auf den Knopf „Weiterlesen“.',
          text: 'Bewege den Zeiger auf den Knopf. Drück dann einmal die linke Taste und halte die Maus dabei ruhig.',
          screen: news(),
          answer: 'more',
          ok: 'Das war ein Klick. Zeiger auf das Ziel, linke Taste einmal drücken, fertig.',
          wrong: { more14: 'Das ist ein anderer Link. Gesucht ist der dunkle Knopf „Weiterlesen“.' }
        },
        {
          ask: 'Der Artikel geht unten weiter. Wie kommst du dorthin?',
          options: [
            ['Am Mausrad drehen, zu mir hin.', true, 'Richtig. Zu dir hin blättert nach unten, von dir weg nach oben. Am Laptop ziehst du zwei Finger über das Touchpad.'],
            ['Die rechte Maustaste drücken.', false, 'Das öffnet ein Zusatzmenü, blättert aber nicht.'],
            ['Das Fenster schließen und neu öffnen.', false, 'Dann beginnst du wieder ganz oben.']
          ]
        },
        {
          show: 'Doppelklick',
          text: 'Manche Dinge öffnest du mit einem **Doppelklick**: zweimal schnell hintereinander die linke Taste drücken, ohne die Maus zu bewegen.\n\n**Doppelklick:** Ordner und Dateien auf dem Desktop und im Explorer.\n**Einfacher Klick:** alles andere – Knöpfe, Links im Internet, das Startmenü und die Taskleiste.',
          fredi: ['konzentriert', 'Des Doppelklicken hat bei mir drei Tag’ braucht. Maus ruhig halten, dann geht’s.']
        },
        {
          tap: 'Öffne den Ordner „Urlaubsfotos“ mit einem Doppelklick.',
          screen: desktop(),
          answer: 'd-fotos',
          double: true,
          ok: 'Der Ordner geht auf. Wenn es einmal nicht klappt: Maus ganz ruhig halten und etwas schneller klicken.',
          wrong: {
            'd-bin': 'Das ist der Papierkorb. Dort landen gelöschte Dateien.',
            'd-rechnung': 'Das ist eine Rechnung als PDF-Datei. Gesucht ist der gelbe Ordner „Urlaubsfotos“.'
          },
          retry: 'Gesucht ist der Ordner „Urlaubsfotos“.'
        },
        {
          ask: 'Du hast aus Versehen die rechte Maustaste gedrückt. Ein kleines Menü ist aufgegangen. Was tust du?',
          options: [
            ['Die Taste Esc drücken oder irgendwo daneben klicken.', true, 'Richtig. Das Menü geht ohne Folgen wieder zu. Esc ist die Taste ganz links oben auf der Tastatur.'],
            ['Irgendeinen Punkt im Menü anklicken, damit es weggeht.', false, 'Besser nicht. Ein Menüpunkt führt etwas aus, zum Beispiel „Löschen“.'],
            ['Den Computer ausschalten.', false, 'Nicht nötig. Ein offenes Menü richtet keinen Schaden an.']
          ]
        }
      ]
    },
    {
      id: 'tastatur',
      title: 'Die Tastatur',
      goal: 'Schreiben, Löschen, @ und Großbuchstaben',
      summary: [
        '**Rücktaste ⟵** löscht links vom blinkenden Strich, **Entf** rechts davon.',
        '**@** = AltGr gedrückt halten + Q. **€** = AltGr + E.',
        'Großbuchstabe: **Umschalttaste ⇧** halten + Buchstabe. Alles GROSS? Die **Feststelltaste ⇩** einmal drücken.',
        '**Strg + Z** macht den letzten Schritt rückgängig.'
      ],
      steps: [
        {
          show: 'Die wichtigsten Tasten',
          text: 'Wo du gerade schreibst, blinkt ein senkrechter Strich. Dort erscheint der nächste Buchstabe.',
          screen: loose([{ keyboard: true }]),
          marks: { 'key-shift': 1, 'key-backspace': 2, 'key-enter': 3, 'key-space': 4, 'key-altgr': 5 },
          legend: [
            '**Umschalttaste ⇧:** gedrückt halten für einen Großbuchstaben.',
            '**Rücktaste ⟵:** löscht das Zeichen links vom blinkenden Strich.',
            '**Enter:** bestätigt, zum Beispiel eine Suche. In einem Text beginnt eine neue Zeile.',
            '**Leertaste:** Abstand zwischen zwei Wörtern.',
            '**AltGr:** für Sonderzeichen wie @ und €.'
          ]
        },
        {
          tap: 'Du hast „Hallu“ geschrieben statt „Hallo“. Welche Taste löscht den letzten Buchstaben?',
          screen: loose([{ keyboard: true }]),
          answer: 'key-backspace',
          ok: 'Genau. Jeder Druck auf die Rücktaste löscht ein Zeichen links vom Strich. Danach tippst du das „o“.',
          wrong: {
            'key-entf': 'Entf löscht das Zeichen **rechts** vom Strich. Am Ende eines Wortes passiert damit nichts.',
            'key-enter': 'Enter bestätigt oder beginnt eine neue Zeile. Gelöscht wird damit nichts.',
            'key-space': 'Die Leertaste macht einen Abstand.'
          },
          other: 'Diese Taste schreibt etwas. Gesucht ist die Taste zum Löschen: rechts oben, mit dem Pfeil nach links.'
        },
        {
          show: 'So schreibst du @ und €',
          text: 'Manche Tasten tragen mehrere Zeichen. Das kleine Zeichen **unten rechts** bekommst du mit **AltGr**.\n\n**@** = AltGr gedrückt halten, dann Q drücken.\n**€** = AltGr gedrückt halten, dann E drücken.\n\nAn Laptops ohne AltGr: **Strg** und **Alt** gemeinsam gedrückt halten, dann Q.',
          screen: loose([{ keyboard: true }]),
          marks: { 'key-altgr': 1, 'key-q': 2, 'key-e': 3 },
          legend: ['AltGr gedrückt halten', 'dann Q für @', 'oder E für €']
        },
        {
          tap: 'Welche Taste hältst du gedrückt, um ein @ zu schreiben?',
          screen: loose([{ keyboard: true }]),
          answer: 'key-altgr',
          ok: 'Richtig. AltGr halten, dann Q. Das brauchst du für jede E-Mail-Adresse.',
          wrong: {
            'key-q': 'Q ist die zweite Taste. Zuerst hältst du eine andere Taste gedrückt – rechts neben der Leertaste.',
            'key-alt': 'Das ist Alt, links von der Leertaste. Gesucht ist AltGr rechts davon.',
            'key-shift': 'Umschalttaste und Q ergibt ein großes Q, kein @.',
            'key-shift2': 'Umschalttaste und Q ergibt ein großes Q, kein @.'
          },
          other: 'Gesucht ist die Taste rechts neben der Leertaste.'
        },
        {
          type: 'Schreibe die E-Mail-Adresse von Fredis Tochter: anna.knoedel@gmx.at',
          text: 'Klicke in das weiße Feld und tippe die Adresse. Alles klein, ohne Leerzeichen.',
          screen: pcBrowser('mail.google.com/mail/u/0/#inbox?compose=new', [
            { bar: { theme: 'gmail', search: 'In E-Mails suchen' } },
            { h: 'Neue Nachricht' },
            { field: 'An', id: 'to' },
            { field: 'Betreff', value: '' }
          ], { tab: 'Neue Nachricht – Gmail' }),
          field: 'to',
          expect: 'anna.knoedel@gmx.at',
          help: '@ = **AltGr + Q**. Der Punkt ist unten rechts, neben dem Komma.',
          ok: 'Perfekt. E-Mail-Adressen schreibt man ohne Leerzeichen und meistens klein.'
        },
        {
          ask: 'Plötzlich schreibt der Computer ALLES GROSS. Was ist passiert?',
          options: [
            ['Die Feststelltaste ⇩ ist eingeschaltet. Einmal drücken schaltet sie aus.', true, 'Richtig. Sie liegt links, über der Umschalttaste. Oft zeigt ein kleines Licht an, dass sie an ist. Das ist auch ein häufiger Grund, warum ein Passwort angeblich falsch ist.'],
            ['Der Computer hat einen Virus.', false, 'Nein. Das ist nur die Feststelltaste.'],
            ['Die Tastatur ist kaputt.', false, 'Sie funktioniert. Die Feststelltaste ist eingeschaltet.']
          ]
        },
        {
          show: 'Rückgängig, kopieren, einfügen',
          text: 'Drei Tastenkombinationen, die viel Arbeit sparen. Die erste Taste gedrückt halten, dann die zweite kurz drücken:\n\n**Strg + Z:** den letzten Schritt rückgängig machen.\n**Strg + C:** markierten Text kopieren.\n**Strg + V:** kopierten Text einfügen.\n\nText markieren: Mit gedrückter linker Maustaste über den Text ziehen. Er wird dann blau hinterlegt. So kannst du zum Beispiel eine lange IBAN kopieren, statt sie abzutippen.'
        },
        {
          ask: 'Du hast aus Versehen einen ganzen Absatz gelöscht. Was hilft sofort?',
          options: [
            ['Strg + Z drücken.', true, 'Richtig. Der Absatz ist wieder da. Mehrmals drücken geht mehrere Schritte zurück.'],
            ['Alles noch einmal abtippen.', false, 'Geht auch, aber Strg + Z holt den Text in einer Sekunde zurück.'],
            ['Strg + V drücken.', false, 'Das fügt ein, was du vorher kopiert hast – nicht den gelöschten Text.']
          ]
        }
      ]
    },
    {
      id: 'fenster',
      title: 'Startmenü und Fenster',
      goal: 'Programme öffnen, Fenster bedienen, richtig ausschalten',
      summary: [
        'Unten ist die **Taskleiste**. In ihrer Mitte: der **Startknopf** mit allen Programmen.',
        'Oben rechts in jedem Fenster: **Strich** = weglegen, **Viereck** = groß/klein, **X** = schließen.',
        'Ausschalten über **Start → Ein/Aus → Herunterfahren**.',
        'Updates nicht unterbrechen. Laptop dabei ans Ladekabel.'
      ],
      steps: [
        {
          show: 'Der Desktop',
          text: 'Der Bildschirm nach dem Einschalten heißt **Desktop**. Unten ist die **Taskleiste**. Sie ist immer zu sehen.',
          screen: desktop(),
          marks: { start: 1, 'tb-search': 2, 'tb-explorer': 3, 'tb-edge': 4 },
          legend: [
            '**Startknopf:** öffnet das Startmenü mit allen Programmen.',
            '**Suche:** findet Programme und Dateien, wenn du den Namen eintippst.',
            '**Explorer:** deine Ordner und Dateien.',
            '**Edge:** der Browser für das Internet.'
          ]
        },
        {
          tap: 'Öffne das Startmenü.',
          screen: desktop(),
          answer: 'start',
          ok: 'Das Startmenü ist offen. Hier findest du alle Programme. Ein zweiter Klick auf den Startknopf schließt es wieder.',
          retry: 'Gesucht ist das Windows-Symbol mit den vier Quadraten.'
        },
        {
          tap: 'Öffne den Browser Microsoft Edge.',
          screen: desktop({ start: true }),
          answer: ['sm-edge', 'tb-edge'],
          ok: 'Edge öffnet sich. Du kannst ihn im Startmenü oder unten in der Taskleiste öffnen – beide führen zum selben Programm.',
          wrong: {
            'sm-outlook': 'Das ist Outlook für E-Mails. Edge ist das blau-grüne Symbol.',
            'sm-word': 'Das ist Word zum Schreiben von Briefen.',
            'sm-explorer': 'Der Explorer zeigt deine Ordner. Edge ist das blau-grüne Symbol.'
          },
          other: 'Das ist ein anderes Programm. Edge ist das blau-grüne Symbol.'
        },
        {
          show: 'Die drei Knöpfe oben rechts',
          text: 'Jedes Programm öffnet sich in einem **Fenster**. Oben rechts hat jedes Fenster dieselben drei Knöpfe.',
          screen: news(),
          marks: { 'win-min': 1, 'win-max': 2, 'win-close': 3 },
          legend: [
            '**Strich:** Fenster weglegen. Es wartet unten in der Taskleiste.',
            '**Viereck:** Fenster auf den ganzen Bildschirm vergrößern oder wieder verkleinern.',
            '**X:** Fenster schließen.'
          ]
        },
        {
          tap: 'Das Fenster soll kurz aus dem Weg, aber offen bleiben.',
          screen: news(),
          answer: 'win-min',
          ok: 'Das Fenster liegt jetzt unten in der Taskleiste. Ein Klick auf das Edge-Symbol holt es zurück.',
          wrong: { 'win-close': 'Das X schließt das Fenster ganz. Gesucht ist der Knopf, der es nur weglegt.' }
        },
        {
          tap: 'Hol das Edge-Fenster zurück.',
          text: 'Unter dem Edge-Symbol in der Taskleiste zeigt ein kleiner Strich, dass es noch offen ist.',
          screen: desktop({ running: ['edge'] }),
          answer: 'tb-edge',
          ok: 'Da ist es wieder – genau so, wie du es verlassen hast.'
        },
        {
          tap: 'Du bist fertig. Öffne das Startmenü und klicke auf den Ein/Aus-Knopf.',
          screen: desktop({ start: true }),
          answer: 'sm-power',
          ok: 'Jetzt siehst du drei Möglichkeiten.',
          other: 'Der Ein/Aus-Knopf ist unten rechts im Startmenü: ein Kreis mit einem Strich oben.'
        },
        {
          tap: 'Schalte den Computer ganz aus.',
          screen: desktop({ start: true, power: true }),
          answer: 'pw-off',
          ok: 'So schaltet sich der Computer sauber aus. Nicht einfach den Stecker ziehen – außer er reagiert gar nicht mehr.',
          wrong: {
            'pw-sleep': 'Energie sparen lässt den Computer schlafen. Praktisch für kurze Pausen, aber er ist nicht ganz aus.',
            'pw-restart': 'Neu starten schaltet aus und sofort wieder ein. Das hilft, wenn etwas hängt.'
          }
        },
        {
          ask: 'Windows zeigt: „Updates werden installiert. Schalten Sie den Computer nicht aus.“ Was tust du?',
          options: [
            ['Warten, bis es fertig ist. Den Laptop ans Ladekabel hängen.', true, 'Richtig. Updates schließen Sicherheitslücken. Manchmal dauert das 10 bis 20 Minuten.'],
            ['Den Stecker ziehen, es dauert zu lange.', false, 'Ein unterbrochenes Update kann Windows beschädigen. Lieber warten.'],
            ['Updates in den Einstellungen für immer ausschalten.', false, 'Ohne Updates bleiben bekannte Lücken offen, die Betrüger ausnutzen.']
          ]
        }
      ]
    },
    {
      id: 'dateien',
      title: 'Dateien, Downloads und PDF',
      goal: 'Rechnungen finden, öffnen und drucken',
      summary: [
        'Alles Heruntergeladene landet im Ordner **Downloads**. Du findest ihn im **Explorer** (gelber Ordner in der Taskleiste).',
        '**PDF** ist ein normales Dokument, zum Beispiel eine Rechnung oder ein Bescheid.',
        'Drucken: **Strg + P** oder das Druckersymbol.',
        'Anhänge mit **.zip** oder **.exe** von Unbekannten nie öffnen.'
      ],
      steps: [
        {
          show: 'Wo sind meine Dateien?',
          text: 'Der **Explorer** zeigt alle Ordner und Dateien auf deinem Computer. Du öffnest ihn über das gelbe Ordner-Symbol in der Taskleiste.',
          screen: explorer(),
          marks: { 'x-dl': 1, 'x-docs': 2, 'x-pics': 3 },
          legend: [
            '**Downloads:** Alles, was du aus dem Internet oder aus E-Mails speicherst, landet zuerst hier.',
            '**Dokumente:** ein guter Platz für Briefe und Rechnungen, die du aufheben willst.',
            '**Bilder:** Fotos.'
          ]
        },
        {
          tap: 'Du hast deine Stromrechnung heruntergeladen. Edge zeigt sie oben rechts an. Öffne sie.',
          screen: pcBrowser('kundenportal.strom-beispiel.at/rechnungen', [
            { bar: { theme: 'shop', logo: 'Strom Beispiel · Kundenportal' } },
            { h: 'Meine Rechnungen' },
            { row: 'Rechnung August 2026', sub: '78,00 € · bezahlt', icon: 'file', id: 'r-aug' },
            { row: 'Rechnung Juli 2026', sub: '81,40 € · bezahlt', icon: 'file', id: 'r-jul' }
          ], { tab: 'Kundenportal', downloads: [{ id: 'dl-open', name: 'Stromrechnung_August.pdf', meta: 'Datei öffnen' }] }),
          answer: 'dl-open',
          ok: 'Die Rechnung öffnet sich. Die Datei liegt außerdem im Ordner Downloads, falls du sie später wieder brauchst.',
          other: 'Gesucht ist das kleine Fenster oben rechts mit dem Dateinamen.'
        },
        {
          tap: 'Die Rechnung ist offen. Drucke sie aus.',
          screen: pcBrowser('C:/Users/Fredi/Downloads/Stromrechnung_August.pdf', [
            { tools: [{ icon: 'search', label: 'Suchen', id: 'pdf-search' }, { icon: 'download', label: 'Speichern', id: 'pdf-save' }, { icon: 'print', label: 'Drucken', id: 'pdf-print' }], align: 'right' },
            { card: [
              { h: 'Rechnung August 2026' },
              { kv: [['Kunde', 'Alfred Knödelmayer'], ['Zeitraum', '1.–31. August'], ['Betrag', '**78,00 €**']] },
              { p: 'Der Betrag wird am 15. September von Ihrem Konto abgebucht.', small: true, muted: true }
            ], tone: 'paper' }
          ], { tab: 'Stromrechnung_August.pdf' }),
          answer: 'pdf-print',
          ok: 'Das Druckfenster geht auf. Dort prüfst du den Drucker und klickst auf „Drucken“. Schneller geht es mit **Strg + P** – das funktioniert in fast jedem Programm.',
          wrong: {
            'pdf-save': 'Das speichert die Datei an einem Ort deiner Wahl. Gesucht ist das Druckersymbol.',
            'pdf-search': 'Die Lupe sucht ein Wort im Dokument.'
          }
        },
        {
          tap: 'Öffne im Explorer die Datei „Lohnzettel_2025.pdf“.',
          text: 'Im Explorer öffnest du Dateien mit einem Doppelklick.',
          screen: explorer(),
          answer: 'f-lohn',
          double: true,
          ok: 'Die Datei öffnet sich. PDF-Dateien zeigt Windows meistens in Edge an.',
          other: 'Das ist eine andere Datei. Gesucht ist „Lohnzettel_2025.pdf“.'
        },
        {
          ask: 'Was ist eine PDF-Datei?',
          options: [
            ['Ein Dokument, das auf jedem Gerät gleich aussieht – zum Beispiel eine Rechnung, ein Bescheid oder ein Kontoauszug.', true, 'Genau. PDFs kannst du ansehen, drucken und speichern.'],
            ['Ein Programm, das man erst installieren muss.', false, 'Nein, ein PDF ist ein Dokument. Windows kann es ohne Zusatzprogramm öffnen.'],
            ['Immer ein Virus.', false, 'Eine PDF-Datei ist ein normales Dokument. Vorsicht ist nur bei unerwarteten Anhängen von Unbekannten angebracht.']
          ]
        },
        {
          ask: 'Eine E-Mail von einem unbekannten Absender hat den Anhang „Rechnung_4711.zip“. Was tust du?',
          fredi: ['misstrauisch', 'I hab bei dene nix bestellt. Warum schicken’s mir dann a Rechnung?'],
          options: [
            ['Nicht öffnen und die E-Mail löschen.', true, 'Richtig. Anhänge mit **.zip**, **.exe** oder **.js** von Unbekannten können Schadprogramme enthalten. Echte Firmen schicken Rechnungen als PDF oder zeigen sie im Kundenkonto.'],
            ['Öffnen – vielleicht ist es wichtig.', false, 'Genau darauf setzen Betrüger. Eine unerwartete Rechnung prüfst du im Kundenkonto der Firma.'],
            ['An Freunde weiterleiten, damit die nachsehen.', false, 'Damit bringst du auch deine Freunde in Gefahr.']
          ]
        }
      ]
    }
  ]
};
