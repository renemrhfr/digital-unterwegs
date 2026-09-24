// Bausteine für wiederkehrende Bildschirme in den Lektionen.

export const pcBrowser = (address, body, extra = {}) => ({ device: 'pc', view: 'browser', address, tab: extra.tab || address.split('/')[0], body, ...extra });
export const pcApp = (app, title, body, extra = {}) => ({ device: 'pc', view: 'app', app, title, body, ...extra });
export const desktop = (extra = {}) => ({
  device: 'pc', view: 'desktop',
  icons: [
    { id: 'd-bin', label: 'Papierkorb', kind: 'bin' },
    { id: 'd-fotos', label: 'Urlaubsfotos', kind: 'folder' },
    { id: 'd-rechnung', label: 'Stromrechnung.pdf', kind: 'pdf' }
  ],
  ...extra
});
export const phoneApp = (app, title, body, extra = {}) => ({ device: 'phone', view: 'app', app, theme: extra.theme || app, title, body, ...extra });
export const phoneHome = (extra = {}) => ({ device: 'phone', view: 'home', ...extra });
export const phoneBrowser = (address, body, extra = {}) => ({ device: 'phone', view: 'browser', address, body, ...extra });
export const loose = body => ({ device: 'none', body });

// ---------- Google ----------
export const googleStart = (extra = {}) => pcBrowser('', [
  { bar: { theme: 'google', logo: ' ', links: [{ text: 'Gmail' }, { text: 'Bilder' }] } },
  { space: 30 },
  { glogo: true },
  { field: '', id: 'g-search', placeholder: 'Google durchsuchen oder URL eingeben', big: true },
  { space: 40 }
], { tab: 'Neuer Tab', ...extra });

export const googleResults = (query, results, extra = {}) => pcBrowser(`google.com/search?q=${encodeURIComponent(query).replace(/%20/g, '+')}`, [
  { bar: { theme: 'google', search: query } },
  ...results.map(r => ({ result: r, id: r.id }))
], { tab: `${query} – Google Suche`, ...extra });

// ---------- Gmail ----------
const gmailNav = active => ({
  nav: [
    { text: 'Posteingang', icon: 'mail', id: 'nav-inbox', active: active === 'inbox', count: '2' },
    { text: 'Markiert', icon: 'star', id: 'nav-star' },
    { text: 'Gesendet', icon: 'send', id: 'nav-sent' },
    { text: 'Entwürfe', icon: 'file', id: 'nav-drafts' },
    { text: 'Spam', icon: 'warn', id: 'nav-spam', active: active === 'spam' },
    { text: 'Papierkorb', icon: 'trash', id: 'nav-trash' }
  ]
});
export const gmailPC = (main, extra = {}) => pcBrowser(extra.address || 'mail.google.com/mail/u/0/#inbox', [
  { bar: { theme: 'gmail', search: 'In E-Mails suchen', searchId: 'mail-search', menu: 'gm-menu' } },
  { cols: [[{ btn: 'Schreiben', id: 'compose', icon: 'edit', style: 'compose' }, gmailNav(extra.active || 'inbox')], main], w: '190px 1fr' }
], { tab: extra.tab || 'Posteingang – Gmail', ...extra });

export const INBOX = [
  { row: 'Anna Huber', sub: '**Fotos vom Sonntag** – Hallo Papa, anbei die Fotos aus dem Garten …', meta: '09:12', avatar: 'Anna', color: '#b0578d', bold: true, clip: true, id: 'mail-anna' },
  { row: 'Österreichische Post', sub: '**Ihre Sendung kommt heute** – Zustellung zwischen 10 und 14 Uhr', meta: '08:03', avatar: 'Post', color: '#c29a00', bold: true, id: 'mail-post' },
  { row: 'Gemeinde Leonding', sub: 'Einladung zum Seniorennachmittag – Liebe Gemeindebürgerinnen …', meta: 'Mo.', avatar: 'Gemeinde', color: '#2f7d4f', id: 'mail-gemeinde' },
  { row: 'Linz AG', sub: 'Ihre Rechnung für August – Die Rechnung finden Sie im Kundenportal', meta: '2. Sep.', avatar: 'Linz', color: '#1c5fa8', id: 'mail-linzag' }
];

export const gmailPhoneInbox = (rows = INBOX, extra = {}) => phoneApp('gmail', 'Gmail', [
  { bar: { theme: 'gmail', search: 'In E-Mails suchen', searchId: 'mail-search', menu: 'gm-menu', logo: ' ' } },
  { p: 'Posteingang', small: true, muted: true },
  ...rows.map(r => ({ ...r, dense: true }))
], { appbar: false, fab: { id: 'compose', text: 'Schreiben' }, ...extra });

// ---------- Amazon ----------
export const amazonBar = (search = '') => ({
  bar: {
    theme: 'amazon', search: search || 'Amazon.de durchsuchen', searchId: 'amz-search',
    links: [{ text: 'Konto', icon: 'user', id: 'nav-account' }, { text: 'Bestellungen', icon: 'list', id: 'nav-orders' }, { text: 'Einkaufswagen', icon: 'cart', id: 'nav-cart' }]
  }
});
export const amazon = (path, body, extra = {}) => pcBrowser(`www.amazon.de/${path}`, [amazonBar(extra.search), ...body], { tab: extra.tab || 'Amazon.de', ...extra });

export const amazonLogin = (extra = {}) => amazon('ap/signin', [
  { center: [
    { h: 'Anmelden', size: 'l' },
    { field: 'E-Mail-Adresse oder Handynummer', id: 'f-user', value: 'fredi.knoedelmayer@gmail.com' },
    { field: 'Passwort', id: 'f-pass', type: 'password', value: 'xxxxxxxxxx', eye: 'f-eye', error: extra.error },
    { link: 'Passwort vergessen?', id: 'forgot' },
    { btn: 'Anmelden', id: 'login', style: 'amz', full: true },
    { sep: true },
    { btn: 'Neues Amazon-Konto erstellen', id: 'new', style: 'secondary', full: true }
  ] }
], { tab: 'Amazon Anmelden', ...extra });

// ---------- Bank ----------
export const bankBar = () => ({
  bar: { theme: 'bank', links: [{ text: 'Übersicht', id: 'nav-overview' }, { text: 'Überweisung', id: 'nav-transfer' }, { text: 'Postfach', id: 'nav-inbox' }, { text: 'Abmelden', icon: 'power', id: 'logout' }] }
});
export const bankPC = (body, extra = {}) => pcBrowser(extra.address || 'banking.meinebank.at/uebersicht', [bankBar(), ...body], { tab: 'Meine Bank – Übersicht', ...extra });

// ---------- FinanzOnline ----------
export const foPC = (main, extra = {}) => pcBrowser('finanzonline.bmf.gv.at/fon/', [
  { bar: { theme: 'bmf', links: [{ text: 'Alfred Knödelmayer', icon: 'user' }, { text: 'Abmelden', icon: 'power', id: 'fo-logout' }] } },
  { cols: [[{ nav: [
    { text: 'Startseite', icon: 'home', id: 'fo-home', active: true },
    { text: 'Erklärungen', icon: 'edit', id: 'fo-erkl' },
    { text: 'Databox', icon: 'mail', id: 'fo-databox', count: '1 neu' },
    { text: 'Abfragen', icon: 'search', id: 'fo-abfragen' },
    { text: 'Eingaben', icon: 'file', id: 'fo-eingaben' },
    { text: 'Einstellungen', icon: 'gear', id: 'fo-settings' }
  ] }], main], w: '200px 1fr' }
], { tab: 'FinanzOnline', ...extra });

// ---------- Nachrichten ----------
export const whatsappChat = (name, messages, extra = {}) => phoneApp('whatsapp', name, messages, { avatar: name, sub: extra.sub || 'online', actions: [{ icon: 'phone', id: 'wa-call', label: 'Anrufen' }], composer: extra.composer || {}, ...extra });
export const smsChat = (sender, messages, extra = {}) => phoneApp('sms', sender, messages, { avatar: sender, theme: 'sms', composer: { text: '' }, ...extra });
