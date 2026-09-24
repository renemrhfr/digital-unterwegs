// Vereinfachte, nachgebaute Bildschirme (Windows-PC und Android-Handy).
// Alles mit einer `id` kann in einer Klick-Aufgabe angetippt werden.
import { icon, esc, rich } from './icons.js';

// Darstellungszustand der aktuellen Aufgabe (wird von renderScreen gesetzt).
let ctx = {};

const APPS = {
  edge: { name: 'Microsoft Edge', bg: 'linear-gradient(140deg,#0b57a0,#1e9fd6 55%,#39c29a)', glyph: 'globe' },
  chrome: { name: 'Chrome', bg: 'conic-gradient(from -30deg,#ea4335 0 120deg,#fbbc04 0 240deg,#34a853 0)', glyph: 'dot' },
  explorer: { name: 'Explorer', bg: '#ffd35c', fg: '#8a5a00', glyph: 'folder' },
  outlook: { name: 'Outlook', bg: '#0f6cbd', glyph: 'mail' },
  gmail: { name: 'Gmail', bg: '#fff', fg: '#d93025', glyph: 'mail' },
  whatsapp: { name: 'WhatsApp', bg: '#25d366', glyph: 'whatsapp' },
  phone: { name: 'Telefon', bg: '#1a73e8', glyph: 'phone' },
  sms: { name: 'Nachrichten', bg: '#4f7ff0', glyph: 'chat' },
  camera: { name: 'Kamera', bg: '#3c4043', glyph: 'camera' },
  photos: { name: 'Galerie', bg: '#fff', fg: '#e8710a', glyph: 'image' },
  play: { name: 'Play Store', bg: '#fff', fg: '#01875f', glyph: 'play' },
  settings: { name: 'Einstellungen', bg: '#5f6368', glyph: 'gear' },
  bank: { name: 'Meine Bank', bg: '#17457e', glyph: 'bank' },
  amt: { name: 'Digitales Amt', bg: '#c8102e', glyph: 'shield' },
  amazon: { name: 'Amazon', bg: '#232f3e', fg: '#ff9900', glyph: 'cart' },
  maps: { name: 'Maps', bg: '#fff', fg: '#1a73e8', glyph: 'map' },
  calendar: { name: 'Kalender', bg: '#fff', fg: '#1a73e8', glyph: 'calendar' },
  calc: { name: 'Rechner', bg: '#444', glyph: 'calc' },
  store: { name: 'Microsoft Store', bg: '#2b2b2b', fg: '#7fc4ff', glyph: 'store' },
  winphotos: { name: 'Fotos', bg: '#0f6cbd', glyph: 'image' },
  winsettings: { name: 'Einstellungen', bg: '#6b6b6b', glyph: 'gear' },
  word: { name: 'Word', bg: '#185abd', glyph: 'text' },
  willhaben: { name: 'willhaben', bg: '#00a0e6', glyph: 'store' }
};

export const appName = key => APPS[key]?.name || key;

const appIcon = key => {
  const a = APPS[key] || { bg: '#888', glyph: 'info' };
  const inner = a.glyph === 'dot' ? '<span class="chrome-dot"></span>' : icon(a.glyph);
  return `<span class="appic" style="background:${a.bg};color:${a.fg || '#fff'}">${inner}</span>`;
};

// Standard-Erklärungen für Bedienelemente, die auf vielen Bildschirmen vorkommen.
export const CHROME_INFO = {
  start: 'Das ist der Startknopf. Er öffnet das Startmenü mit allen Programmen.',
  'tb-search': 'Das ist die Suche von Windows. Damit findest du Programme und Dateien auf dem Computer.',
  'tb-edge': 'Das ist Microsoft Edge, der Browser für das Internet.',
  'tb-explorer': 'Das ist der Explorer. Dort findest du deine Ordner und Dateien.',
  'tb-outlook': 'Das ist Outlook, ein Programm für E-Mails.',
  'win-min': 'Der Strich legt das Fenster unten in der Taskleiste ab. Es bleibt offen.',
  'win-max': 'Das Viereck macht das Fenster bildschirmfüllend oder wieder kleiner.',
  'win-close': 'Das X schließt das Fenster.',
  'nav-back': 'Der Pfeil nach links geht einen Schritt zurück.',
  'nav-reload': 'Der runde Pfeil lädt die Seite neu.',
  address: 'Das ist die Adresszeile. Sie zeigt, auf welcher Seite du gerade bist.',
  'tab-new': 'Das Plus öffnet einen neuen, leeren Tab.',
  'br-menu': 'Die drei Punkte öffnen das Menü des Browsers.',
  'ph-back': 'Die Zurück-Taste geht einen Schritt zurück.',
  'ph-home': 'Die Home-Taste bringt dich zum Startbildschirm.',
  'ph-recent': 'Diese Taste zeigt alle zuletzt geöffneten Apps.',
  'app-back': 'Der Pfeil oben links geht in der App einen Schritt zurück.',
  'app-menu': 'Die drei Punkte öffnen ein Menü mit weiteren Möglichkeiten.'
};

const mark = id => (id && ctx.marks?.[id] ? `<span class="mk" aria-hidden="true">${ctx.marks[id]}</span>` : '');
const state = id => (id ? [ctx.ok === id && 'is-ok', ctx.bad === id && 'is-bad', ctx.hint === id && 'is-hint', ctx.picked === id && 'is-picked', ctx.marks?.[id] && 'is-marked'].filter(Boolean).join(' ') : '');

// Ein Element, das in Klick-Aufgaben antippbar ist und sonst nur angezeigt wird.
function T(id, cls, inner, { label = '', href = '' } = {}) {
  const sr = label ? `<span class="sr-only">${esc(label)}</span>` : '';
  const hrefAttr = href ? ` data-href="${esc(href)}"` : '';
  const classes = `${cls} ${state(id)}`.trim();
  if (id && ctx.live) return `<button type="button" class="tg ${classes}" data-t="${esc(id)}"${hrefAttr}>${inner}${sr}${mark(id)}</button>`;
  return `<div class="${classes}"${hrefAttr}${href ? ' tabindex="0"' : ''}>${inner}${sr}${mark(id)}</div>`;
}

const avatar = (text, color = '#6d7a8a') => `<span class="av" style="background:${color}">${esc(String(text).trim().slice(0, 1).toUpperCase())}</span>`;
const hostSplit = address => {
  const clean = String(address || '');
  const i = clean.indexOf('/');
  return i === -1 ? `<strong>${esc(clean)}</strong>` : `<strong>${esc(clean.slice(0, i))}</strong><span>${esc(clean.slice(i))}</span>`;
};

// ---------- Inhaltsblöcke ----------
function block(b) {
  if (b.h) return T(b.id, `b-h ${b.size || ''}`, rich(b.h));
  if (b.p) return T(b.id, `b-p ${b.muted ? 'muted' : ''} ${b.small ? 'small' : ''} ${b.center ? 'center' : ''}`, rich(b.p));
  if (b.btn) return T(b.id, `b-btn ${b.style || 'primary'} ${b.full ? 'full' : ''}`, `${b.icon ? icon(b.icon) : ''}<span>${esc(b.btn)}</span>`, { href: b.href });
  if (b.link) return T(b.id, 'b-link', esc(b.link), { href: b.href });
  if (b.field !== undefined) return field(b);
  if (b.row) return row(b);
  if (b.result) return T(b.id, 'b-result', `${b.result.ad ? '<span class="ad">Gesponsert</span>' : ''}<span class="r-url">${esc(b.result.url)}</span><span class="r-title">${esc(b.result.title)}</span><span class="r-text">${esc(b.result.text)}</span>`, { href: b.result.url });
  if (b.product) return product(b);
  if (b.msg) return `<div class="b-msg ${b.out ? 'out' : ''}">${b.from ? `<span class="m-from">${esc(b.from)}</span>` : ''}${b.image ? `<span class="m-img">${icon('image')}</span>` : ''}${T(b.id, 'm-text', rich(b.msg), { href: b.href })}<span class="m-time">${esc(b.time || '09:41')}${b.out ? ' ✓✓' : ''}</span></div>`;
  if (b.mailhead) return mailhead(b);
  if (b.banner) return T(b.id, `b-banner ${b.tone || 'info'}`, `${icon(b.tone === 'warn' ? 'warn' : b.tone === 'ok' ? 'check' : 'info')}<span>${rich(b.banner)}</span>`);
  if (b.kv) return `<dl class="b-kv">${b.kv.map(([k, v, id]) => `<div class="kv-row">${`<dt>${esc(k)}</dt>`}${T(id, 'kv-v', rich(v))}</div>`).join('')}</dl>`;
  if (b.tools) return `<div class="b-tools ${b.align || ''}">${b.tools.map(t => T(t.id, `tool ${t.text ? 'with-text' : ''}`, `${icon(t.icon)}${t.text ? `<span>${esc(t.text)}</span>` : ''}`, { label: t.text ? '' : t.label })).join('')}</div>`;
  if (b.cols) return `<div class="b-cols" style="grid-template-columns:${b.w || '1fr 1fr'}">${b.cols.map(c => `<div class="col">${blocks(c)}</div>`).join('')}</div>`;
  if (b.attach) return T(b.id, 'b-attach', `${icon(b.kind === 'image' ? 'image' : 'file')}<span><strong>${esc(b.attach)}</strong>${b.size ? `<small>${esc(b.size)}</small>` : ''}</span>`);
  if (b.code) return `<div class="b-code">${esc(b.code)}</div>`;
  if (b.img) return T(b.id, `b-img ${b.tone || ''}`, `${icon('image')}<span>${esc(b.img)}</span>`);
  if (b.check) return T(b.id, `b-check ${b.on ? 'on' : ''}`, `<span class="box">${b.on ? icon('check') : ''}</span><span>${rich(b.check)}</span>`);
  if (b.toggle) return T(b.id, 'b-toggle', `${b.icon ? icon(b.icon) : ''}<span class="tg-label">${esc(b.toggle)}${b.sub ? `<small>${esc(b.sub)}</small>` : ''}</span><span class="switch ${b.on ? 'on' : ''}"></span>`);
  if (b.slider) return `<div class="b-slider">${T('font-minus', 'sl-btn small-a', 'A', { label: 'Kleiner' })}<span class="track"><span style="width:${b.slider}%"></span><i style="left:${b.slider}%"></i></span>${T('font-plus', 'sl-btn big-a', 'A', { label: 'Größer' })}</div>`;
  if (b.glogo) return '<div class="g-logo big"><b>G</b><b>o</b><b>o</b><b>g</b><b>l</b><b>e</b></div>';
  if (b.keyboard) return keyboard();
  if (b.mouse) return mouse();
  if (b.bar) return siteBar(b.bar);
  if (b.nav) return `<div class="b-nav">${b.nav.map(n => T(n.id, `nav-item ${n.active ? 'active' : ''}`, `${n.icon ? icon(n.icon) : ''}<span>${esc(n.text)}</span>${n.count ? `<small>${esc(n.count)}</small>` : ''}`)).join('')}</div>`;
  if (b.chips) return `<div class="b-chips">${b.chips.map(c => T(c.id, `chip ${c.active ? 'active' : ''}`, esc(c.text))).join('')}</div>`;
  if (b.sep) return '<hr class="b-sep">';
  if (b.space) return `<div style="height:${b.space}px"></div>`;
  if (b.stars !== undefined) return `<div class="b-stars">${'★'.repeat(Math.round(b.stars))}${'☆'.repeat(5 - Math.round(b.stars))} <span>${esc(b.count || '')}</span></div>`;
  if (b.qr) return `<div class="b-qr">${icon('qr')}<span>${esc(b.qr)}</span></div>`;
  if (b.compose) return compose(b.compose);
  if (b.sheet) return `<div class="b-sheet">${blocks(b.sheet)}</div>`;
  if (b.card) return `<div class="b-card ${b.tone || ''}">${blocks(b.card)}</div>`;
  if (b.center) return `<div class="b-center">${blocks(b.center)}</div>`;
  if (b.grid) return `<div class="b-grid">${b.grid.map(g => T(g.id, 'grid-item', `${appIcon(g.app)}<span>${esc(g.text || appName(g.app))}</span>`)).join('')}</div>`;
  return '';
}
export const blocks = list => (list || []).map(block).join('');

function field(b) {
  const typing = ctx.typeField && ctx.typeField === b.id;
  let value;
  if (typing) value = `<input class="type-input" id="type-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(ctx.typed || '')}" aria-label="${esc(b.field || 'Eingabe')}" placeholder="${esc(b.placeholder || 'Hier tippen')}">`;
  else if (b.type === 'password' && b.value) value = `<span class="f-val pw">${'•'.repeat(Math.min(14, b.value.length))}</span>`;
  else value = `<span class="f-val ${b.value ? '' : 'empty'}">${esc(b.value || b.placeholder || '')}</span>`;
  const eye = b.eye ? T(b.eye, 'f-eye', icon('eye'), { label: 'Passwort anzeigen' }) : '';
  const box = typing ? `<div class="f-box typing">${value}</div>` : T(b.id, `f-box ${b.big ? 'big' : ''}`, value);
  return `<div class="b-field ${b.inline ? 'inline' : ''}">${b.field ? `<span class="f-label">${esc(b.field)}</span>` : ''}<div class="f-wrap">${box}${eye}</div>${b.error ? `<span class="f-error">${esc(b.error)}</span>` : ''}</div>`;
}

function row(b) {
  const lead = b.app ? appIcon(b.app) : b.icon ? `<span class="r-icon" ${b.color ? `style="color:${b.color}"` : ''}>${icon(b.icon)}</span>` : b.avatar ? avatar(b.avatar, b.color) : '';
  const inner = `${lead}<span class="r-main"><span class="r-title">${rich(b.row)}</span>${b.sub ? `<span class="r-sub">${rich(b.sub)}</span>` : ''}</span>${b.meta ? `<span class="r-meta">${esc(b.meta)}</span>` : ''}${b.chev ? icon('chevron', 'r-chev') : ''}${b.clip ? icon('clip', 'r-clip') : ''}`;
  return T(b.id, `b-row ${b.bold ? 'unread' : ''} ${b.active ? 'active' : ''} ${b.dense ? 'dense' : ''}`, inner, { href: b.href });
}

function product(b) {
  const p = b.product;
  return T(b.id, `b-product ${b.wide ? 'wide' : ''}`, `<span class="p-img">${icon(p.icon || 'image')}</span><span class="p-info">${p.ad ? '<span class="ad">Gesponsert</span>' : ''}<span class="p-title">${esc(p.title)}</span>${p.stars ? `<span class="b-stars">${'★'.repeat(p.stars)}${'☆'.repeat(5 - p.stars)} <span>${esc(p.reviews || '')}</span></span>` : ''}<span class="p-price">${esc(p.price)}</span>${p.note ? `<span class="p-note">${rich(p.note)}</span>` : ''}</span>`);
}

function mailhead(b) {
  const m = b.mailhead;
  return `<div class="b-mailhead">${m.subject ? `<div class="mh-subject">${esc(m.subject)}</div>` : ''}<div class="mh-line">${avatar(m.from, m.color || '#7b6fb0')}<div class="mh-who">${T(m.fromId, 'mh-from', `<strong>${esc(m.from)}</strong> <span class="mh-addr">&lt;${esc(m.addr)}&gt;</span>`)}<span class="mh-to">an ${esc(m.to || 'mich')}</span></div><span class="mh-time">${esc(m.time || '09:41')}</span></div></div>`;
}

function compose(c) {
  return `<div class="b-compose">${blocks([
    { field: 'An', id: c.toId || 'to', value: c.to, inline: true },
    { field: 'Betreff', id: c.subjectId || 'subject', value: c.subject, inline: true }
  ])}${T(c.bodyId, 'c-body', c.body ? rich(c.body) : '<span class="empty">Nachricht schreiben …</span>')}${c.attach ? `<div class="c-att">${blocks([{ attach: c.attach, kind: 'image', size: '2,1 MB' }])}</div>` : ''}${c.bar === false ? '' : `<div class="c-bar">${T('send', 'b-btn primary', `<span>Senden</span>${icon('send')}`)}${T('attach', 'tool', icon('clip'), { label: 'Datei anhängen' })}${T('c-image', 'tool', icon('image'), { label: 'Bild einfügen' })}${T('discard', 'tool right', icon('trash'), { label: 'Entwurf verwerfen' })}</div>`}</div>`;
}

const THEMES = {
  amazon: { bg: '#131921', fg: '#fff', accent: '#febd69', logo: 'amazon<span style="color:#ff9900">.de</span>' },
  google: { bg: '#fff', fg: '#202124', logo: '<span class="g-logo"><b>G</b><b>o</b><b>o</b><b>g</b><b>l</b><b>e</b></span>' },
  bank: { bg: '#17457e', fg: '#fff', logo: 'Meine Bank' },
  bmf: { bg: '#fff', fg: '#1f1f1f', logo: '<span class="bmf-logo">FinanzOnline</span>', border: '#c8102e' },
  gmail: { bg: '#f6f8fc', fg: '#202124', logo: '<span class="gmail-logo">' + icon('mail') + ' Gmail</span>' },
  shop: { bg: '#fff', fg: '#222', logo: 'Shop' },
  fake: { bg: '#e11d48', fg: '#fff', logo: 'Shop' },
  post: { bg: '#ffdc00', fg: '#222', logo: 'Paket' },
  willhaben: { bg: '#00a0e6', fg: '#fff', logo: 'willhaben' },
  gov: { bg: '#fff', fg: '#1f1f1f', logo: 'oesterreich.gv.at', border: '#c8102e' }
};
function siteBar(bar) {
  const t = THEMES[bar.theme] || THEMES.shop;
  const logo = bar.logo ? esc(bar.logo) : t.logo;
  return `<div class="b-bar" style="background:${t.bg};color:${t.fg};${t.border ? `border-bottom:3px solid ${t.border}` : ''}">${bar.menu ? T(bar.menu, 'bar-menu', icon('menu'), { label: 'Menü' }) : ''}<span class="bar-logo">${logo}</span>${bar.search !== undefined ? T(bar.searchId, 'bar-search', `<span>${esc(bar.search || 'Suchen')}</span>${icon('search')}`) : ''}<span class="bar-links">${(bar.links || []).map(l => T(l.id, 'bar-link', `${l.icon ? icon(l.icon) : ''}<span>${esc(l.text)}</span>`)).join('')}</span></div>`;
}

// Vereinfachte deutsche Tastatur (QWERTZ).
function keyboard() {
  const k = (id, main, extra = {}) => T(`key-${id}`, `key ${extra.w || ''}`, `${extra.top ? `<small class="k-top">${esc(extra.top)}</small>` : ''}<span class="k-main">${esc(main)}</span>${extra.alt ? `<small class="k-alt">${esc(extra.alt)}</small>` : ''}`, { label: extra.label || '' });
  const letters = (s, alts = {}) => [...s].map(c => k(c, c.toUpperCase(), { alt: alts[c] }));
  const rows = [
    [k('zirkumflex', '^', { top: '°' }), k('1', '1', { top: '!' }), k('2', '2', { top: '"', alt: '²' }), k('3', '3', { top: '§' }), k('4', '4', { top: '$' }), k('5', '5', { top: '%' }), k('6', '6', { top: '&' }), k('7', '7', { top: '/', alt: '{' }), k('8', '8', { top: '(', alt: '[' }), k('9', '9', { top: ')', alt: ']' }), k('0', '0', { top: '=', alt: '}' }), k('sz', 'ß', { top: '?', alt: '\\' }), k('akut', '´', { top: '`' }), k('backspace', '⟵', { w: 'w2', label: 'Rücktaste' })],
    [k('tab', '⇥', { w: 'w15', label: 'Tabulator' }), ...letters('qwertzuiop', { q: '@', e: '€' }), k('ue', 'Ü'), k('plus', '+', { top: '*', alt: '~' }), k('enter', '↵ Enter', { w: 'w15' })],
    [k('caps', '⇩', { w: 'w18', label: 'Feststelltaste' }), ...letters('asdfghjkl'), k('oe', 'Ö'), k('ae', 'Ä'), k('raute', '#', { top: "'" }), k('enter2', '', { w: 'w12 ghost' })],
    [k('shift', '⇧', { w: 'w15', label: 'Umschalttaste' }), k('kleiner', '<', { top: '>', alt: '|' }), ...letters('yxcvbnm'), k('komma', ',', { top: ';' }), k('punkt', '.', { top: ':' }), k('minus', '-', { top: '_' }), k('shift2', '⇧', { w: 'w25', label: 'Umschalttaste' })],
    [k('strg', 'Strg', { w: 'w15' }), k('win', '⊞', { label: 'Windows-Taste' }), k('alt', 'Alt'), k('space', '', { w: 'space', label: 'Leertaste' }), k('altgr', 'AltGr', { w: 'w15' }), k('strg2', 'Strg', { w: 'w15' })]
  ];
  const side = `<div class="kb-side">${k('entf', 'Entf', { w: 'w15' })}<span class="kb-gap"></span><div class="kb-arrows"><span></span>${k('up', '↑', { label: 'Pfeil nach oben' })}<span></span>${k('left', '←', { label: 'Pfeil nach links' })}${k('down', '↓', { label: 'Pfeil nach unten' })}${k('right', '→', { label: 'Pfeil nach rechts' })}</div></div>`;
  return `<div class="b-keyboard"><div class="kb-main">${rows.map(r => `<div class="kb-row">${r.join('')}</div>`).join('')}</div>${side}</div>`;
}

function mouse() {
  return `<div class="b-mouse"><div class="mouse-body"><div class="mouse-top">${T('mouse-left', 'mouse-btn left', '', { label: 'Linke Maustaste' })}${T('mouse-wheel', 'mouse-wheel', '', { label: 'Mausrad' })}${T('mouse-right', 'mouse-btn right', '', { label: 'Rechte Maustaste' })}</div></div><span class="mouse-cable"></span></div>`;
}

// ---------- Windows-PC ----------
function winControls() {
  return `<span class="win-ctl">${T('win-min', 'wc', icon('minus'), { label: 'Minimieren' })}${T('win-max', 'wc', icon('square'), { label: 'Maximieren' })}${T('win-close', 'wc close', icon('close'), { label: 'Schließen' })}</span>`;
}

function pcWindow(w, floating = false) {
  const isBrowser = w.view === 'browser';
  const tabs = w.tabs || [w.tab || w.title || 'Neuer Tab'];
  const title = isBrowser
    ? `<div class="win-title browser">${tabs.map((t, i) => `<span class="tab ${i === (w.activeTab || 0) ? 'active' : ''}">${icon('globe')}<span>${esc(t)}</span>${T(i === 0 ? 'tab-close' : null, 'tab-x', icon('close'), { label: 'Tab schließen' })}</span>`).join('')}${T('tab-new', 'tab-plus', icon('plus'), { label: 'Neuer Tab' })}<span class="grow"></span>${winControls()}</div>`
    : `<div class="win-title">${w.app ? appIcon(w.app) : ''}<span class="win-name">${esc(w.title || appName(w.app))}</span><span class="grow"></span>${winControls()}</div>`;
  const toolbar = isBrowser
    ? `<div class="br-toolbar">${T('nav-back', 'br-btn', icon('back'), { label: 'Zurück' })}${T('nav-reload', 'br-btn', icon('refresh'), { label: 'Neu laden' })}${T('address', `address ${ctx.typeField === 'address' ? 'typing' : ''}`, ctx.typeField === 'address' ? `${icon('search')}<input class="type-input" id="type-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(ctx.typed || '')}" aria-label="Adresszeile" placeholder="Adresse eingeben">` : `${w.address ? icon('tune') : icon('search')}<span class="addr-text">${w.address ? hostSplit(w.address) : '<span class="empty">Suchen oder Webadresse eingeben</span>'}</span>`)}${T('br-fav', 'br-btn', icon('star'), { label: 'Favoriten' })}${T('br-menu', 'br-btn', icon('dots'), { label: 'Menü' })}</div>${w.favs ? `<div class="fav-bar">${w.favs.map(f => T(f.id, 'fav', `${icon('globe')}<span>${esc(f.text)}</span>`, { href: f.href })).join('')}</div>` : ''}`
    : '';
  const downloads = w.downloads ? `<div class="dl-flyout"><div class="dl-head">Downloads</div>${w.downloads.map(d => T(d.id, 'dl-item', `${icon('file')}<span><strong>${esc(d.name)}</strong><small>${esc(d.meta || 'Datei öffnen')}</small></span>`)).join('')}</div>` : '';
  const dialog = w.dialog ? dialogBox(w.dialog) : '';
  return `<div class="win ${floating ? 'floating' : ''} ${isBrowser ? 'is-browser' : ''}">${title}${toolbar}<div class="win-body ${w.pad === false ? 'nopad' : ''}">${blocks(w.body)}${downloads}${dialog}</div>${isBrowser || w.status ? '<div class="statusbar" aria-live="polite"></div>' : ''}</div>`;
}

function dialogBox(d) {
  return `<div class="dlg-layer"><div class="dlg ${d.tone || ''}">${d.icon ? `<span class="dlg-icon">${icon(d.icon)}</span>` : ''}${d.title ? `<strong class="dlg-title">${esc(d.title)}</strong>` : ''}${d.text ? `<p>${rich(d.text)}</p>` : ''}${d.body ? blocks(d.body) : ''}<div class="dlg-actions ${d.stack ? 'stack' : ''}">${(d.buttons || []).map(b => T(b.id, `b-btn ${b.style || (b.primary ? 'primary' : 'secondary')}`, `<span>${esc(b.text)}</span>`)).join('')}</div></div></div>`;
}

function taskbar(s) {
  const pinned = s.pinned || ['explorer', 'edge', 'outlook'];
  const running = s.running || (s.view === 'browser' ? ['edge'] : s.app ? [s.app] : []);
  return `<div class="taskbar"><span class="tb-center">${T('start', 'tb-start', '<span class="winlogo"><i></i><i></i><i></i><i></i></span>', { label: 'Start' })}${T('tb-search', 'tb-search', `${icon('search')}<span>Suche</span>`)}${pinned.map(p => T(`tb-${p}`, `tb-app ${running.includes(p) ? 'running' : ''}`, appIcon(p), { label: appName(p) })).join('')}</span><span class="tb-tray">${icon('wifi')}${icon('sound')}<span class="tb-clock">09:41<small>24.09.2026</small></span></span></div>`;
}

function startMenu(s) {
  const apps = s.startApps || ['edge', 'outlook', 'word', 'winphotos', 'explorer', 'winsettings', 'calc', 'store'];
  return `<div class="start-menu"><div class="sm-search">${icon('search')}<span>Nach Apps, Einstellungen und Dokumenten suchen</span></div><div class="sm-head"><strong>Angeheftet</strong>${T('sm-all', 'sm-all', `Alle ${icon('chevron')}`)}</div><div class="sm-grid">${apps.map(a => T(`sm-${a}`, 'sm-app', `${appIcon(a)}<span>${esc(appName(a))}</span>`)).join('')}</div><div class="sm-foot">${T('sm-user', 'sm-user', `${avatar('F', '#8a6d3b')}<span>Fredi</span>`)}${T('sm-power', 'sm-power', icon('power'), { label: 'Ein/Aus' })}${s.power ? `<div class="power-menu">${T('pw-sleep', 'pw-item', `${icon('moon')}<span>Energie sparen</span>`)}${T('pw-off', 'pw-item', `${icon('power')}<span>Herunterfahren</span>`)}${T('pw-restart', 'pw-item', `${icon('refresh')}<span>Neu starten</span>`)}</div>` : ''}</div></div>`;
}

function desktopIcon(d) {
  const kinds = { folder: ['folder', '#e0a800'], pdf: ['file', '#d93025'], image: ['image', '#1a73e8'], bin: ['trash', '#6b7280'], doc: ['file', '#185abd'] };
  const [ic, color] = kinds[d.kind] || kinds.folder;
  return T(d.id, 'desk-icon', `<span class="di-ic" style="color:${color}">${icon(ic)}</span><span class="di-label">${esc(d.label)}</span>`);
}

function pc(s) {
  const isDesk = s.view === 'desktop';
  const inner = isDesk
    ? `<div class="desk">${(s.icons || []).map(desktopIcon).join('')}${s.window ? pcWindow(s.window, true) : ''}${s.dialog ? dialogBox(s.dialog) : ''}${s.start ? startMenu(s) : ''}</div>`
    : `<div class="desk full">${pcWindow(s)}</div>`;
  return `<div class="pc"><div class="pc-bezel"><div class="pc-screen">${inner}${s.taskbar === false ? '' : taskbar(isDesk && s.window ? { ...s, running: s.running || [s.window.view === 'browser' ? 'edge' : s.window.app] } : s)}</div></div><div class="pc-neck"></div><div class="pc-base"></div></div>`;
}

// ---------- Android-Handy ----------
const APPBAR = {
  whatsapp: ['#075e54', '#fff'], gmail: ['#fff', '#202124'], bank: ['#17457e', '#fff'], settings: ['#f3f4f8', '#202124'],
  play: ['#fff', '#202124'], amt: ['#fff', '#202124'], sms: ['#f3f4f8', '#202124'], amazon: ['#232f3e', '#fff'], photos: ['#fff', '#202124'], default: ['#fff', '#202124'], call: ['#1f2933', '#fff'], willhaben: ['#00a0e6', '#fff']
};

function phoneBar(s) {
  return `<div class="ph-status"><span>09:41</span><span class="ph-cam"></span><span class="ph-sys">${s.mobile ? '<b>5G</b>' : icon('wifi')}${icon('signal')}${icon('battery')}</span></div>`;
}
function phoneNav() {
  return `<div class="ph-nav">${T('ph-back', 'ph-key', '<span class="k-back"></span>', { label: 'Zurück' })}${T('ph-home', 'ph-key', '<span class="k-home"></span>', { label: 'Startbildschirm' })}${T('ph-recent', 'ph-key', '<span class="k-recent"></span>', { label: 'Zuletzt verwendete Apps' })}</div>`;
}

function phoneContent(s) {
  if (s.view === 'home') {
    const apps = s.apps || ['whatsapp', 'gmail', 'photos', 'maps', 'play', 'settings', 'bank', 'amt', 'amazon', 'calendar'];
    return `<div class="ph-home"><div class="ph-clock">09:41<small>Donnerstag, 24. September</small></div><div class="ph-apps">${apps.map(a => T(`app-${a}`, 'ph-app', `${appIcon(a)}<span>${esc(appName(a))}</span>`)).join('')}</div><div class="ph-dock">${['phone', 'sms', 'chrome', 'camera'].map(a => T(`app-${a}`, 'ph-app dock', appIcon(a), { label: appName(a) })).join('')}</div><div class="ph-gsearch">${T('ph-google', 'gsearch', `<span class="g-mini">G</span><span>Suchen</span>${icon('mic')}`)}</div></div>`;
  }
  if (s.view === 'shade') {
    const tiles = s.tiles || [
      { id: 'tile-wifi', icon: 'wifi', text: 'WLAN', sub: 'Huber-Zuhause', on: true },
      { id: 'tile-bt', icon: 'bluetooth', text: 'Bluetooth', on: false },
      { id: 'tile-light', icon: 'flashlight', text: 'Taschenlampe', on: false },
      { id: 'tile-dnd', icon: 'moon', text: 'Nicht stören', on: false },
      { id: 'tile-sound', icon: 'sound', text: 'Ton', on: true },
      { id: 'tile-plane', icon: 'plane', text: 'Flugmodus', on: false }
    ];
    return `<div class="ph-shade"><div class="sh-date">Do., 24. September</div><div class="sh-tiles">${tiles.map(t => T(t.id, `sh-tile ${t.on ? 'on' : ''}`, `${icon(t.icon)}<span><strong>${esc(t.text)}</strong>${t.sub ? `<small>${esc(t.sub)}</small>` : ''}</span>`)).join('')}</div><div class="sh-notifs">${(s.notifs || []).map(n => T(n.id, 'sh-notif', `${appIcon(n.app)}<span class="n-main"><span class="n-app">${esc(appName(n.app))} · ${esc(n.time || 'jetzt')}</span><strong>${esc(n.title)}</strong><span>${rich(n.text)}</span></span>`)).join('')}${s.notifs?.length ? '<span class="sh-clear">Alle löschen</span>' : ''}</div></div>`;
  }
  if (s.view === 'call') {
    return `<div class="ph-call"><span class="call-who">${avatar(s.caller || '?', '#52606d')}</span><strong>${esc(s.caller)}</strong><span class="call-num">${esc(s.number || '')}</span><span class="call-state">${esc(s.callState || 'Eingehender Anruf')}</span>${s.body ? `<div class="call-say">${blocks(s.body)}</div>` : ''}<div class="call-actions">${T('call-decline', 'call-btn decline', icon('phone'), { label: 'Ablehnen / Auflegen' })}${s.ongoing ? '' : T('call-accept', 'call-btn accept', icon('phone'), { label: 'Annehmen' })}</div></div>`;
  }
  const [bg, fg] = APPBAR[s.theme] || APPBAR.default;
  let top;
  if (s.view === 'browser') {
    top = `<div class="ph-urlbar">${T('ph-home-btn', 'ph-ub', icon('home'), { label: 'Startseite' })}${T('address', 'ph-address', `${icon('tune')}<span class="addr-text">${hostSplit(s.address || '')}</span>`)}${T('br-tabs', 'ph-tabs', '<span>1</span>', { label: 'Tabs' })}${T('br-menu', 'ph-ub', icon('dots'), { label: 'Menü' })}</div>`;
  } else if (s.appbar !== false) {
    top = `<div class="ph-appbar" style="background:${bg};color:${fg}">${s.noBack ? '' : T('app-back', 'ab-btn', icon('back'), { label: 'Zurück' })}${s.avatar ? avatar(s.avatar, '#6b8e7f') : ''}<span class="ab-title"><strong>${esc(s.title || appName(s.app))}</strong>${s.sub ? `<small>${esc(s.sub)}</small>` : ''}</span>${(s.actions || []).map(a => T(a.id, 'ab-btn', icon(a.icon), { label: a.label })).join('')}${s.menu === false ? '' : T('app-menu', 'ab-btn', icon('dots'), { label: 'Menü' })}</div>`;
  } else top = '';
  const composer = s.composer ? `<div class="ph-composer">${T('c-emoji', 'cp-btn', icon('smile'), { label: 'Emoji' })}<span class="cp-field">${esc(s.composer.text || 'Nachricht')}</span>${T('attach', 'cp-btn', icon('clip'), { label: 'Anhängen' })}${T('c-camera', 'cp-btn', icon('camera'), { label: 'Kamera' })}${T(s.composer.text ? 'send' : 'c-mic', 'cp-send', icon(s.composer.text ? 'send' : 'mic'), { label: s.composer.text ? 'Senden' : 'Sprachnachricht' })}</div>` : '';
  const fab = s.fab ? T(s.fab.id, 'ph-fab', `${icon(s.fab.icon || 'edit')}<span>${esc(s.fab.text)}</span>`) : '';
  const tabs = s.bottomTabs ? `<div class="ph-tabs-bottom">${s.bottomTabs.map(t => T(t.id, `bt ${t.active ? 'active' : ''}`, `${icon(t.icon)}<span>${esc(t.text)}</span>`)).join('')}</div>` : '';
  return `${top}<div class="ph-body ${s.theme === 'whatsapp' ? 'wa-bg' : ''} ${s.center ? 'centered' : ''}">${blocks(s.body)}</div>${fab}${composer}${tabs}`;
}

function phone(s) {
  const sheet = s.sheet ? `<div class="ph-sheet-layer"><div class="ph-sheet">${blocks(s.sheet)}</div></div>` : '';
  return `<div class="phone"><div class="ph-screen ${s.view === 'shade' ? 'dark' : ''}">${phoneBar(s)}<div class="ph-content">${phoneContent(s)}${s.dialog ? dialogBox(s.dialog) : ''}${sheet}</div>${phoneNav()}</div></div>`;
}

export function renderScreen(s, options = {}) {
  if (!s) return '';
  ctx = options;
  const html = s.device === 'phone' ? phone(s) : s.device === 'none' ? `<div class="loose">${blocks(s.body)}</div>` : pc(s);
  ctx = {};
  const caption = s.device === 'phone' ? 'Android-Handy' : s.device === 'none' ? '' : 'Windows-Computer';
  return `<figure class="screen ${s.device === 'phone' ? 'is-phone' : s.device === 'none' ? 'is-loose' : 'is-pc'} ${options.live ? 'live' : ''}">${caption ? `<figcaption>${caption}${s.caption ? ` · ${esc(s.caption)}` : ''}</figcaption>` : ''}${html}</figure>`;
}
