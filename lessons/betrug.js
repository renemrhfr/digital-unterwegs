import { whatsappChat, smsChat, phoneApp, phoneBrowser, pcBrowser } from './ui.js';

const call = (caller, number, say, extra = {}) => ({ device: 'phone', view: 'call', caller, number, callState: 'Anruf · 00:48', ongoing: true, body: [{ p: 'Der Anrufer sagt:', small: true, muted: true }, { p: say }], ...extra });

const fakeShop = () => pcBrowser('kaffee-outlet-24.shop/barista-pro', [
  { bar: { theme: 'fake', logo: 'KAFFEE OUTLET 24' } },
  { cols: [[{ img: 'Kaffeevollautomat', tone: 'product' }], [
    { h: 'Kaffeevollautomat Barista Pro, Markenware', size: 'm' },
    { h: '149,00 € statt 699,00 €', size: 'price', id: 'p-price' },
    { banner: '**Nur noch 2 Stück!** Angebot endet in 09:59', tone: 'warn', id: 'hurry' },
    { kv: [['Zahlung', 'Nur Vorauskasse (Überweisung)', 'pay'], ['Lieferung', '2–3 Werktage']] },
    { btn: 'Jetzt kaufen', full: true },
    { link: 'Impressum', id: 'imprint' }
  ]], w: '38% 1fr' }
], { tab: 'Kaffee Outlet 24' });

export default {
  title: 'Betrug erkennen',
  goal: 'Falsche Nachrichten, Anrufe und Shops – und was im Notfall hilft',
  lessons: [
    {
      id: 'nachrichten',
      title: 'Falsche SMS und WhatsApp',
      goal: '„Hallo Mama“, Paket-SMS, Abstimm-Links und Kettenbriefe',
      summary: [
        'Betrugsnachrichten wollen, dass du **schnell** etwas tust: Link antippen, App installieren, Geld schicken, Code verraten.',
        'Nie über den Weg antworten, den die Nachricht vorgibt. **Selbst prüfen**: bekannte Nummer, echte App, bekannte Adresse.',
        '„Neue Nummer“ von Kind oder Enkel? **Unter der alten Nummer anrufen.**',
        'Verdächtige SMS: nicht antworten, **blockieren und löschen**.',
        'Einen **Code aus SMS oder WhatsApp** tippst du nie auf einer Seite aus einem Link ein – auch nicht fürs „Abstimmen“.'
      ],
      steps: [
        {
          show: 'Woran du Betrug erkennst',
          text: 'Betrugsnachrichten wollen, dass du **schnell** etwas tust: einen Link antippen, eine App installieren, Geld überweisen oder einen Code verraten. Typische Themen: Paket, Bank, Finanzamt, Strafe, Gewinn, ein Familienmitglied in Not.\n\n**Die wichtigste Regel:** Antworte nicht über den Weg, den die Nachricht vorgibt. Prüfe selbst – in der echten App, auf der bekannten Website oder über eine bekannte Telefonnummer.'
        },
        {
          ask: 'Eine WhatsApp von einer unbekannten Nummer. Was tust du?',
          screen: whatsappChat('+43 677 0623 1904', [
            { msg: 'Hallo Papa, das ist meine neue Nummer. Mein Handy ist ins Wasser gefallen 😩', time: '10:14' },
            { msg: 'Kannst du mir schnell helfen? Ich muss heute noch eine Rechnung zahlen, 1.450 €. Ich zahl’s dir morgen zurück!', time: '10:15' }
          ], { sub: 'Nicht in deinen Kontakten' }),
          fredi: ['misstrauisch', 'Mei Tochter schreibt mir nie „Hallo Papa“. De schreibt „Servus Papsch“.'],
          options: [
            ['Die Tochter unter ihrer alten, bekannten Nummer anrufen.', true, 'Richtig. Meist klärt sich alles in einem Anruf: Die Tochter hat gar kein neues Handy. Diese Masche heißt „Hallo Mama / Hallo Papa“-Betrug.'],
            ['Zurückschreiben und eine Kontrollfrage stellen.', false, 'Betrüger weichen geschickt aus oder finden Antworten im Internet. Ein Anruf unter der alten Nummer ist sicherer.'],
            ['Schnell überweisen, das Kind braucht Hilfe.', false, 'Genau darauf setzen die Betrüger. Das Geld ist dann meist weg.']
          ]
        },
        {
          ask: 'Eine SMS über ein Paket. Was tust du?',
          screen: smsChat('+44 7700 900823', [{ msg: 'Post: Ihre Sendung konnte nicht zugestellt werden. Planen Sie die Zustellung neu: post-at.zustellung-neu.com', time: '07:52' }], { sub: 'Unbekannte Nummer' }),
          options: [
            ['Den Link nicht antippen. Sendungen prüfe ich, wenn überhaupt, in der Post-App oder auf post.at.', true, 'Richtig. Die Adresse gehört „zustellung-neu.com“, nicht der Post. Und die Nummer ist aus Großbritannien (+44).'],
            ['Antippen und nachsehen, ob es stimmt.', false, 'Die Seite sieht aus wie die Post und fragt dann nach Kartendaten oder will eine App installieren.'],
            ['Mit „STOP“ antworten.', false, 'Eine Antwort zeigt nur, dass die Nummer aktiv ist. Einfach löschen.']
          ]
        },
        {
          tap: 'Blockiere den Absender. Öffne dafür das Menü.',
          screen: smsChat('+44 7700 900823', [{ msg: 'Post: Ihre Sendung konnte nicht zugestellt werden. Planen Sie die Zustellung neu: post-at.zustellung-neu.com', time: '07:52' }], { sub: 'Unbekannte Nummer', actions: [{ icon: 'phone', id: 'sms-call', label: 'Anrufen' }] }),
          answer: 'app-menu',
          ok: 'Im Menü findest du „Blockieren“ oder „Spam melden“. Danach kannst du die Nachricht löschen.',
          wrong: { 'sms-call': 'Nicht zurückrufen – das kann teuer werden und zeigt, dass deine Nummer aktiv ist.' },
          other: 'Gesucht sind die drei Punkte oben rechts.'
        },
        {
          ask: 'Deine Bekannte Gerti schreibt dir. Was tust du?',
          screen: whatsappChat('Gerti', [
            { msg: 'Hallo! 😊 Meine Enkelin Lena ist beim Tanzwettbewerb im Finale! Bitte stimm für sie ab, dauert nur eine Minute: tanz-voting-austria.com/lena', time: '16:40' },
            { msg: 'Danke dir!! 🙏💃', time: '16:40' }
          ], { sub: 'zuletzt online um 16:40' }),
          options: [
            ['Nicht antippen. Gerti anrufen und fragen, ob die Nachricht wirklich von ihr ist.', true, 'Richtig. Solche Nachrichten kommen oft von echten Bekannten, deren WhatsApp schon übernommen wurde. Ein Anruf klärt es.'],
            ['Antippen – Gerti kenne ich ja.', false, 'Der Absender ist echt, aber am Handy sitzt vielleicht schon ein Betrüger. Das Konto von Gerti kann übernommen sein.'],
            ['Antippen und nur schauen, was dort steht.', false, 'Die Seite ist genau dafür gebaut, dich Schritt für Schritt zum Eintippen zu bringen.']
          ]
        },
        {
          ask: 'Angenommen, du hast den Link geöffnet und deine Handynummer eingegeben. Gleich danach kommt eine SMS: „Dein WhatsApp-Code: 318-274. Gib diesen Code nicht weiter.“ Die Seite will diesen Code haben.',
          screen: phoneBrowser('tanz-voting-austria.com/lena', [
            { img: 'Lena beim Tanzen', tone: 'product' },
            { h: 'Stimme für Lena abgeben', size: 'l' },
            { field: 'Deine Handynummer', value: '+43 664 123 4567' },
            { p: 'Damit deine Stimme zählt, bestätige sie mit dem **6-stelligen Code**, den du gerade per SMS oder WhatsApp bekommen hast.' },
            { field: 'Bestätigungscode', placeholder: '000-000' },
            { btn: 'Stimme bestätigen', full: true }
          ]),
          fredi: ['misstrauisch', 'Seit wann braucht ma zum Abstimmen an WhatsApp-Code?'],
          options: [
            ['Seite schließen und den Code nicht eintippen.', true, 'Richtig. Der Code hat nichts mit einer Abstimmung zu tun. Es ist der Anmelde-Code für **dein** WhatsApp. Die Betrüger haben mit deiner Nummer WhatsApp auf ihrem eigenen Handy eingerichtet und warten nur noch auf diesen Code.'],
            ['Den Code eintippen, damit die Stimme zählt.', false, 'Damit übernimmt der Betrüger dein WhatsApp. Du fliegst hinaus, und er schreibt deinen Kontakten in deinem Namen.'],
            ['Nur die Handynummer ist schlimm, der Code ist egal.', false, 'Umgekehrt: Die Nummer allein reicht nicht. Erst mit dem Code kommt der Betrüger in dein Konto.']
          ]
        },
        {
          show: 'So wird WhatsApp gestohlen',
          text: 'Mit deinem Code meldet sich der Betrüger mit **deiner Nummer** in WhatsApp an. Auf deinem Handy steht dann, dass du abgemeldet wurdest. Der Betrüger schreibt nun deinen Kontakten – dieselbe Abstimmung oder „Kannst du mir schnell Geld überweisen?“. So war es vermutlich auch bei Gerti.\n\n**Schutz:** In WhatsApp unter **Einstellungen → Konto → Bestätigung in zwei Schritten** eine eigene 6-stellige PIN festlegen. Dann reicht der SMS-Code allein nicht mehr.\n\n**Wenn es passiert ist:** WhatsApp öffnen und dich mit deiner Nummer neu anmelden – dann fliegt der Betrüger hinaus. Familie und Freunde anrufen und warnen.',
          screen: smsChat('WhatsApp', [{ msg: 'Dein WhatsApp-Code: 318-274\nGib diesen Code nicht weiter.', time: '16:43' }], { composer: null })
        },
        {
          ask: 'In der Familiengruppe wird weitergeleitet: „Billa verschenkt zum Jubiläum 500-€-Gutscheine! Hier klicken und an 10 Freunde teilen.“ Was tust du?',
          screen: whatsappChat('Familie', [
            { msg: '↪ Weitergeleitet\n🎉 Billa verschenkt zum 70. Jubiläum 500 € Gutscheine! Nur heute: billa-jubilaeum-gutschein.top – an 10 Freunde teilen!', from: 'Gerti', time: '11:03' }
          ], { sub: 'Gerti, Anna, Lisa, Du' }),
          options: [
            ['Nicht anklicken, nicht weiterleiten. Kurz in die Gruppe schreiben, dass es Betrug ist.', true, 'Richtig. Solche Gewinnspiele sammeln Daten oder führen in Abo-Fallen. Echte Aktionen findest du auf der Website oder in der App des Geschäfts.'],
            ['An 10 Freunde weiterleiten, dann bekomme ich den Gutschein.', false, 'Damit verbreitest du den Betrug. Es gibt keinen Gutschein.'],
            ['Anklicken, aber nur schauen.', false, 'Schon das Öffnen verrät, dass du auf solche Nachrichten reagierst.']
          ]
        }
      ]
    },
    {
      id: 'anrufe',
      title: 'Falsche Anrufe',
      goal: 'Falsche Bank, falsche Polizei, falscher Support',
      summary: [
        'Die angezeigte Nummer kann **gefälscht** sein. Auch Stimmen lassen sich mit KI nachmachen.',
        'Bei Druck am Telefon: **auflegen** und **selbst zurückrufen** – über eine Nummer, die du kennst.',
        'Keine Bank und keine Polizei verlangt Überweisungen auf „sichere Konten“ oder schickt Boten für Geld.',
        'Niemals Fernwartungs-Programme wie **AnyDesk** oder **TeamViewer** für Anrufer installieren.'
      ],
      steps: [
        {
          show: 'Am Telefon wirken Betrüger besonders echt',
          text: 'Sie geben sich aus als **Bank**, **Polizei**, **Microsoft** oder als **Familienmitglied**. Die angezeigte Nummer kann gefälscht sein – sogar die echte Nummer deiner Bank kann am Display erscheinen.\n\nMit künstlicher Intelligenz lassen sich auch **Stimmen nachmachen**. Ein paar Sekunden aus einem Video reichen dafür.\n\n**Die Regel:** Auflegen. Selbst zurückrufen – über eine Nummer, die du kennst: Rückseite der Bankkarte, dein Telefonbuch, 133 für die Polizei.'
        },
        {
          tap: 'Der Anrufer will, dass du eine Überweisung „auf ein sicheres Konto“ freigibst. Was tippst du?',
          screen: call('Meine Bank', '+43 1 0500 2011', '„Hier ist die Sicherheitsabteilung Ihrer Bank. Ihr Konto wird gerade angegriffen. Wir müssen Ihr Geld sofort auf ein sicheres Konto verschieben. Bitte geben Sie gleich die Überweisung in Ihrer App frei.“'),
          answer: 'call-decline',
          ok: 'Richtig: auflegen. Keine Bank lässt dich Geld auf ein „sicheres Konto“ überweisen. Danach rufst du selbst die Nummer auf deiner Bankkarte an.',
          other: 'Gesucht ist der rote Knopf zum Auflegen.'
        },
        {
          ask: '„Microsoft Support“ ruft an: Dein Computer sende Fehlermeldungen. Du sollst ein Programm namens AnyDesk installieren, damit er helfen kann.',
          screen: call('Unbekannt', '+1 800 555 0142', '„Guten Tag, hier ist der Microsoft Windows Support. Ihr Computer sendet uns Fehlermeldungen. Bitte installieren Sie AnyDesk, dann repariere ich das für Sie.“'),
          options: [
            ['Auflegen. Microsoft ruft nie von sich aus an.', true, 'Richtig. Mit Programmen wie AnyDesk oder TeamViewer sieht und steuert der Anrufer deinen Computer – auch dein Online-Banking.'],
            ['Installieren, er ist ja vom Support.', false, 'Echter Support ruft nicht ungefragt an.'],
            ['Installieren, aber genau zuschauen, was er macht.', false, 'Der Anrufer kann in Sekunden Dinge tun, die du nicht bemerkst.']
          ]
        },
        {
          ask: 'Eine weinende Stimme, die klingt wie dein Sohn: Er hatte einen Unfall. Dann spricht eine „Polizistin“ und verlangt 20.000 € Kaution. Ein Bote würde das Geld abholen.',
          fredi: ['grantig', 'Dem Hans vom Stammtisch is des passiert. Der hat sei Sparbuch no rechtzeitig z’ruckg’legt.'],
          options: [
            ['Auflegen und den Sohn unter seiner bekannten Nummer anrufen. Ist er nicht erreichbar: Polizei 133.', true, 'Richtig. Die österreichische Polizei verlangt am Telefon keine Kaution und schickt keine Boten für Geld oder Schmuck.'],
            ['Das Geld holen – es ist ja seine Stimme.', false, 'Stimmen lassen sich heute mit KI nachmachen. Ein Rückruf unter der bekannten Nummer klärt es.'],
            ['Am Telefon bleiben, bis der Bote kommt.', false, 'Die Betrüger halten dich absichtlich am Telefon, damit du niemanden fragen kannst.']
          ]
        },
        {
          ask: 'Am Computer erscheint plötzlich eine Warnung mit Telefonnummer. Der Lautsprecher piept. Was tust du?',
          screen: pcBrowser('security-alert-win.live/warnung', [{ space: 160 }], {
            tab: 'Windows-Sicherheit',
            dialog: { tone: 'danger', icon: 'warn', title: 'Windows-Sicherheitswarnung', text: 'Ihr Computer wurde gesperrt, weil ein Virus gefunden wurde. **Rufen Sie sofort den Microsoft-Support an: 0800 000 555.** Schalten Sie den Computer nicht aus.', buttons: [{ text: 'OK', primary: true }] }
          }),
          options: [
            ['Nicht anrufen. Das Fenster schließen – wenn das nicht geht, den Computer neu starten.', true, 'Richtig. Das ist eine Internetseite, die sich als Warnung verkleidet. Echte Windows-Meldungen enthalten keine Telefonnummern. Ein Neustart schadet hier nicht.'],
            ['Die Nummer anrufen.', false, 'Dort meldet sich ein Betrüger, der Fernzugriff und Geld will.'],
            ['Auf „OK“ klicken.', false, 'Das kann weitere Fenster öffnen oder einen Download starten.']
          ]
        }
      ]
    },
    {
      id: 'fakeshop',
      title: 'Falsche Shops und Abo-Fallen',
      goal: 'Fake-Shops erkennen, Kleingedrucktes lesen',
      summary: [
        'Warnzeichen: **viel zu billig**, **Zeitdruck**, **nur Vorauskasse**, seltsame Adresse.',
        'Unbekannten Shop prüfen: **watchlist-internet.at** (Fake-Shop-Liste) und das **Impressum**.',
        'Das **Schloss-Symbol** sagt nichts darüber, ob ein Shop seriös ist.',
        '„Gratis testen“ kann ein **Abo** sein – das Kleingedruckte lesen.'
      ],
      steps: [
        {
          show: 'Ein Fake-Shop',
          text: 'Falsche Shops sehen oft sehr professionell aus. Du bezahlst, aber es kommt nie etwas. Vier Warnzeichen:',
          screen: fakeShop(),
          marks: { 'p-price': 1, hurry: 2, pay: 3, address: 4 },
          legend: [
            '**Viel zu billig:** Markenware um 70 bis 80 % billiger ist fast immer Betrug.',
            '**Zeitdruck:** Countdown und „nur noch 2 Stück“.',
            '**Nur Vorauskasse:** kein Kauf auf Rechnung, keine Kreditkarte, kein PayPal. Wenn nichts kommt, ist das Geld weg.',
            '**Seltsame Adresse:** zusammengewürfelter Name, Endungen wie .shop oder .top.'
          ]
        },
        {
          ask: 'Wie prüfst du einen unbekannten Shop am besten?',
          options: [
            ['Auf watchlist-internet.at in der Fake-Shop-Liste nachsehen und das Impressum prüfen.', true, 'Richtig. Die Watchlist Internet sammelt bekannte Fake-Shops in Österreich. Im Impressum muss eine echte Firma mit Adresse stehen.'],
            ['Schauen, ob das Schloss in der Adresszeile ist.', false, 'Das Schloss hat heute fast jede Seite, auch Fake-Shops. Es heißt nur, dass die Verbindung verschlüsselt ist.'],
            ['Die Bewertungen auf der Shop-Seite lesen.', false, 'Die kann der Shop selbst schreiben.']
          ]
        },
        {
          tap: 'Wer steht hinter dem Shop? Öffne die Angaben zum Betreiber.',
          screen: fakeShop(),
          answer: 'imprint',
          ok: 'Im Impressum steht nur eine Postfach-Adresse im Ausland, keine Telefonnummer, keine Firmenbuchnummer. Das reicht, um die Finger davon zu lassen.'
        },
        {
          ask: 'Werbung am Handy: „Gratis-Probe Faltencreme – Sie zahlen nur 4,95 € Versand“. Was tust du?',
          screen: phoneBrowser('beauty-probe-gratis.com/angebot', [
            { img: 'Faltencreme', tone: 'product' },
            { h: 'Jetzt gratis testen!', size: 'l' },
            { p: 'Sie zahlen nur **4,95 €** Versand.' },
            { btn: 'Gratis-Probe bestellen', full: true },
            { p: 'Mit der Bestellung schließen Sie ein Abonnement ab. Nach 14 Tagen erhalten Sie monatlich eine Lieferung zu 89,90 €. Kündigung nur schriftlich.', small: true, muted: true }
          ]),
          options: [
            ['Nicht bestellen: Im Kleingedruckten steht ein teures Monatsabo.', true, 'Richtig. „Gratis“ ist hier der Köder. Das Abo kostet über 1.000 € im Jahr.'],
            ['Bestellen – 4,95 € sind nicht viel.', false, 'Lies die kleine graue Schrift unter dem Knopf.'],
            ['Bestellen und nach der Probe einfach nichts mehr tun.', false, 'Dann läuft das Abo weiter und bucht jeden Monat ab.']
          ]
        },
        {
          ask: 'Du hast bei einem Fake-Shop per Überweisung bezahlt. Was tust du?',
          options: [
            ['Sofort die Bank anrufen, ob die Überweisung zurückgeholt werden kann, und Anzeige bei der Polizei erstatten.', true, 'Richtig. Je schneller, desto größer die Chance. Bei Kreditkarte oder PayPal gibt es zusätzlich einen Käuferschutz.'],
            ['Dem Shop eine böse E-Mail schreiben.', false, 'Die Betrüger antworten nicht. Wichtig sind Bank und Polizei.'],
            ['Abwarten, vielleicht kommt es doch noch.', false, 'Jeder Tag Warten macht es unwahrscheinlicher, das Geld zurückzubekommen.']
          ]
        }
      ]
    },
    {
      id: 'willhaben',
      title: 'Verkaufen auf willhaben',
      goal: 'Falsche Käufer und Zahlungslinks erkennen',
      summary: [
        'Um Geld zu **bekommen**, brauchst du **nie** Kartendaten, PIN oder Codes.',
        'Links von Käufern zu „Zahlung erhalten“ oder „Kurier“ sind Betrug.',
        'Am sichersten: **Übergabe mit Barzahlung** oder die Bezahlfunktion **direkt in der willhaben-App**.',
        'Geld erst verschicken, wenn es **wirklich auf deinem Konto** ist.'
      ],
      steps: [
        {
          show: 'Falsche Käufer',
          text: 'Wenn du etwas auf willhaben oder Facebook Marketplace verkaufst, melden sich manchmal falsche Käufer. Sie wollen nichts kaufen, sondern deine Kartendaten. Typisch: Der „Käufer“ schickt einen Link, über den du angeblich **dein Geld empfangen** sollst.\n\n**Die Regel:** Um Geld zu bekommen, musst du nie Kartendaten, PIN oder Codes eingeben.'
        },
        {
          ask: 'Ein Käufer schreibt dir über WhatsApp. Was tust du?',
          screen: whatsappChat('Thomas K.', [
            { msg: 'Hallo, ist die Kaffeemaschine noch da? Ich nehme sie!', time: '14:20' },
            { msg: 'Ich habe schon bezahlt über willhaben Kurier. Bitte bestätigen Sie hier, um das Geld zu erhalten: willhaben.at-zahlung-erhalten.com/1847', time: '14:22' }
          ], { sub: 'zuletzt online um 14:22' }),
          options: [
            ['Nicht antippen. Das ist Betrug.', true, 'Richtig. Die Adresse gehört nicht willhaben – die letzten zwei Teile sind zahlung-erhalten.com. Und echte Käufer wechseln selten gleich zu WhatsApp.'],
            ['Antippen, ich will ja mein Geld.', false, 'Die Seite fragt nach Kartendaten. Damit wird Geld von deinem Konto abgebucht, nicht darauf überwiesen.'],
            ['Antippen, aber nur meinen Namen eingeben.', false, 'Schon ein Name hilft den Betrügern weiter. Nicht antippen.']
          ]
        },
        {
          ask: 'Angenommen, du hast den Link doch geöffnet. Die Seite fragt: „Um 120 € zu empfangen, geben Sie Kartennummer, Ablaufdatum und Prüfnummer ein.“',
          screen: phoneBrowser('willhaben.at-zahlung-erhalten.com/1847', [
            { bar: { theme: 'willhaben', logo: 'willhaben' } },
            { h: 'Zahlung empfangen: 120,00 €', size: 'l' },
            { field: 'Kartennummer', placeholder: '0000 0000 0000 0000' },
            { field: 'Ablaufdatum', placeholder: 'MM/JJ' },
            { field: 'Prüfnummer (CVC)', placeholder: '123' },
            { btn: 'Geld empfangen', full: true }
          ]),
          options: [
            ['Seite schließen. Zum Empfangen braucht man diese Daten nie.', true, 'Richtig. Mit diesen Daten können Betrüger mit deiner Karte bezahlen.'],
            ['Eingeben, damit das Geld schneller kommt.', false, 'Es kommt kein Geld. Es wird Geld abgebucht.'],
            ['Nur die Kartennummer eingeben, nicht die Prüfnummer.', false, 'Auch die Kartennummer allein gehört nicht auf eine fremde Seite.']
          ]
        },
        {
          ask: 'Ein Käufer behauptet, er habe versehentlich 300 € zu viel überwiesen, und schickt einen „Zahlungsbeleg“. Du sollst den Betrag zurückschicken. Am Konto ist noch nichts.',
          options: [
            ['Nichts zurückschicken. Der Beleg ist vermutlich gefälscht.', true, 'Richtig. Zählen tut nur, was wirklich auf deinem Konto eingegangen ist – und selbst dann fragst du im Zweifel bei der Bank nach.'],
            ['Die 300 € zurücküberweisen, das ist nur fair.', false, 'Das Geld ist nie gekommen. Du würdest 300 € verschenken.'],
            ['Die Kaffeemaschine schon verschicken.', false, 'Erst verschicken, wenn das Geld wirklich am Konto ist.']
          ]
        }
      ]
    },
    {
      id: 'notfall',
      title: 'Wenn es doch passiert ist',
      goal: 'Karte sperren, Passwörter ändern, Anzeige erstatten',
      summary: [
        'Kartendaten verraten? **Sperr-Notruf 0800 204 8800** (rund um die Uhr) oder die eigene Bank.',
        'Zugang zum Online-Banking verraten? **Bank sofort anrufen.**',
        'Passwort verraten? Zuerst das **E-Mail-Passwort** ändern, dann alle Konten mit demselben Passwort.',
        '**Anzeige** bei jeder Polizeiinspektion. Nachrichten und Screenshots aufheben.'
      ],
      steps: [
        {
          show: 'Schnell handeln, Hilfe holen',
          text: 'Auch vorsichtigen Menschen passiert es. Die Betrüger sind Profis. Wichtig ist, **schnell** zu handeln und **Hilfe zu holen**. Schäm dich nicht – je früher Bank und Polizei Bescheid wissen, desto mehr lässt sich retten.',
          fredi: ['ratlos', 'Mir is’ a scho passiert. Wichtig is, dass ma’s glei sagt.']
        },
        {
          ask: 'Du hast auf einer falschen Bankseite deine Zugangsdaten eingegeben. Was tust du zuerst?',
          options: [
            ['Sofort die Bank anrufen – Nummer auf der Bankkarte – und das Online-Banking sperren lassen.', true, 'Richtig. Die Bank kann den Zugang sperren und verdächtige Überweisungen stoppen.'],
            ['Das Passwort beim nächsten Anmelden ändern.', false, 'Bis dahin haben die Betrüger vielleicht schon überwiesen. Sofort anrufen.'],
            ['Den Computer ausschalten und abwarten.', false, 'Die Betrüger arbeiten mit deinen Daten auf ihrem eigenen Computer weiter.']
          ]
        },
        {
          ask: 'Du hast deine Kartendaten auf einer falschen Seite eingegeben. Welche Nummer hilft rund um die Uhr?',
          options: [
            ['Sperr-Notruf 0800 204 8800', true, 'Richtig. Dort sperrst du Bankomat- und Kreditkarten österreichischer Banken, rund um die Uhr. Die Nummer steht auch im Spickzettel.'],
            ['133', false, 'Das ist die Polizei. Eine Anzeige ist wichtig – aber zuerst die Karte sperren.'],
            ['Die Nummer aus der Betrugsnachricht.', false, 'Dort erreichst du die Betrüger selbst.']
          ]
        },
        {
          ask: 'Ein Anrufer hatte über AnyDesk Zugriff auf deinen Computer. Was tust du?',
          options: [
            ['Internet trennen, die Bank anrufen und danach von einem anderen Gerät die wichtigen Passwörter ändern.', true, 'Richtig. Den Computer lässt du anschließend von einer Fachperson prüfen, bevor du darauf wieder Online-Banking machst.'],
            ['AnyDesk löschen, dann ist alles gut.', false, 'In der Zeit kann der Anrufer schon anderes installiert oder Daten mitgenommen haben.'],
            ['Nichts tun – er hat ja nur geschaut.', false, 'Er konnte alles sehen und steuern, auch dein Online-Banking.']
          ]
        },
        {
          ask: 'Dein E-Mail-Passwort ist bei Betrügern gelandet. Welches Passwort änderst du zuerst?',
          options: [
            ['Das E-Mail-Passwort – danach alle Konten, die dasselbe Passwort verwenden.', true, 'Richtig. Mit deinem Postfach könnten Betrüger über „Passwort vergessen?“ viele andere Konten übernehmen.'],
            ['Nur das von Amazon.', false, 'Das Postfach ist der Schlüssel zu allen anderen Konten. Zuerst das E-Mail-Passwort.'],
            ['Keines, in meinem Postfach ist nichts Wichtiges.', false, 'Über das Postfach setzt man die Passwörter anderer Konten zurück.']
          ]
        },
        {
          show: 'Checkliste für den Notfall',
          text: '1. **Bank anrufen** oder Karte sperren: **0800 204 8800**.\n2. **Passwörter ändern**, zuerst das E-Mail-Passwort.\n3. **Anzeige erstatten** bei jeder Polizeiinspektion oder unter **133**. Nimm Screenshots, Nachrichten und Kontoauszüge mit.\n4. **Familie und Freunde informieren** – vor allem, wenn dein WhatsApp- oder E-Mail-Konto übernommen wurde.\n5. **watchlist-internet.at** zeigt, ob eine Masche schon bekannt ist.\n\nDiese Liste steht auch auf dem Spickzettel zum Ausdrucken.'
        }
      ]
    }
  ]
};
