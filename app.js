import { chapters } from './lessons/index.js';
import { renderScreen, CHROME_INFO } from './screens.js';
import { icon, esc, rich } from './icons.js';

const lessons = chapters.flatMap((c, ci) => c.lessons.map(l => ({ ...l, chapter: ci })));
const byId = id => lessons.find(l => l.id === id);
const numberOf = l => lessons.indexOf(l) + 1;

// ---------- Speicher ----------
const storageKey = 'digital-unterwegs-v2';
let store = { done: {}, pos: {}, big: false };
let storageOk = true;
try {
  const raw = JSON.parse(localStorage.getItem(storageKey) || 'null');
  if (raw && typeof raw === 'object') {
    if (raw.done && typeof raw.done === 'object') store.done = raw.done;
    if (raw.pos && typeof raw.pos === 'object') store.pos = raw.pos;
    store.big = !!raw.big;
  }
} catch { storageOk = false; }
const save = () => { try { localStorage.setItem(storageKey, JSON.stringify(store)); } catch { storageOk = false; } };
const doneCount = () => lessons.filter(l => store.done[l.id]).length;
const nextOpen = () => lessons.find(l => !store.done[l.id]);

// ---------- Zustand der aktuellen Aufgabe ----------
const solved = new Set(); // bereits gelöste Aufgaben dieser Sitzung: "lektion:schritt"
let st = {};
let pendingClick = null;
const fresh = () => ({ done: false, wrong: 0, feedback: null, ok: null, bad: null, hint: null, picked: null, typed: '', order: null, tried: [] });

const app = document.querySelector('#app');
const fredi = (mood, cls = '') => `<img class="fredi ${cls}" src="./assets/fredi-${mood}.jpg" alt="" width="320" height="320">`;

// ---------- Routing ----------
function parse() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (parts[0] === 'l' && byId(parts[1])) {
    const lesson = byId(parts[1]);
    if (parts[2] === 'fertig') return { view: 'finish', lesson };
    const n = Math.min(Math.max(1, Number(parts[2]) || 1), lesson.steps.length);
    return { view: 'step', lesson, index: n - 1 };
  }
  if (parts[0] === 'spickzettel') return { view: 'sheet' };
  return { view: 'home' };
}
let route = parse();
const go = hash => { if (location.hash === hash) onRoute(); else location.hash = hash; };
const lessonHref = l => `#/l/${l.id}/${Math.min((store.pos[l.id] || 0) + 1, l.steps.length)}`;

function onRoute() {
  route = parse();
  st = fresh();
  if (route.view === 'step') {
    if (solved.has(`${route.lesson.id}:${route.index}`)) st.done = true;
    store.pos[route.lesson.id] = route.index;
    save();
  }
  render();
  window.scrollTo(0, 0);
  document.querySelector('#main h1')?.focus({ preventScroll: true });
}

// ---------- Seitengerüst ----------
function header() {
  return `<header class="top"><div class="top-inner"><a class="brand" href="#/"><img src="./favicon.svg" alt="" width="36" height="36"><span>Digital unterwegs</span></a><nav class="top-nav" aria-label="Hauptmenü"><a href="#/" ${route.view === 'home' ? 'aria-current="page"' : ''}>${icon('home')}<span>Übersicht</span></a><a href="#/spickzettel" ${route.view === 'sheet' ? 'aria-current="page"' : ''}>${icon('book')}<span>Spickzettel</span></a><button type="button" class="size-btn" data-act="big" aria-pressed="${store.big}">${icon('text')}<span>${store.big ? 'Schrift normal' : 'Schrift größer'}</span></button></nav></div></header>`;
}
function footer() {
  return `<footer class="foot"><button type="button" class="link-btn" data-act="about">Über diese Seite</button><button type="button" class="link-btn" data-act="reset">Fortschritt löschen</button></footer>`;
}

function render() {
  document.documentElement.classList.toggle('big', store.big);
  const view = route.view === 'step' ? stepView() : route.view === 'finish' ? finishView() : route.view === 'sheet' ? sheetView() : homeView();
  app.innerHTML = `${header()}<main id="main" tabindex="-1">${view}${storageOk ? '' : '<p class="storage-note">Der Fortschritt kann in diesem Browser nicht gespeichert werden. Die Lektionen funktionieren trotzdem.</p>'}</main>${route.view === 'step' ? '' : footer()}`;
}

// ---------- Startseite ----------
function homeView() {
  const count = doneCount(), total = lessons.length, next = nextOpen();
  const started = next && store.pos[next.id] > 0;
  const cont = next
    ? `<div class="continue-main"><span class="eyebrow">${started ? 'Weitermachen' : count ? 'Als Nächstes' : 'Hier beginnen'}</span><h2>Lektion ${numberOf(next)}: ${esc(next.title)}</h2><p>${esc(next.goal)}</p><a class="btn primary big" href="${lessonHref(next)}">${started ? `Weiter bei Schritt ${store.pos[next.id] + 1}` : 'Lektion starten'} ${icon('arrow')}</a></div>`
    : `<div class="continue-main"><span class="eyebrow">Alle Lektionen erledigt</span><h2>Du hast alle ${total} Lektionen abgeschlossen.</h2><p>Einzelne Lektionen kannst du jederzeit wiederholen. Der Spickzettel fasst alles auf wenigen Seiten zusammen.</p><a class="btn primary big" href="#/spickzettel">Spickzettel öffnen ${icon('arrow')}</a></div>`;
  return `<div class="home">
  <section class="hero"><div><h1 tabindex="-1">Computer und Handy, Schritt für Schritt</h1><p>${total} kurze Lektionen für Windows-Computer und Android-Handys. Du übst an nachgebauten Bildschirmen: klicken, tippen, lesen, entscheiden. Am Ende erledigst du E-Mails, Online-Banking, Bestellungen und FinanzOnline selbst und erkennst Betrugsversuche.</p><p class="hero-fredi">${fredi('neugierig', 'mini')}<span>Fredi Knödelmayer übt mit. Er macht dieselben Aufgaben wie du.</span></p></div></section>
  <section class="continue">${cont}<div class="continue-progress"><strong>${count} von ${total}</strong><span>Lektionen erledigt</span><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${count}" aria-label="Fortschritt"><i style="width:${(count / total) * 100}%"></i></div></div></section>
  <section class="chapters" aria-label="Alle Lektionen">${chapters.map((c, ci) => chapterBlock(c, ci)).join('')}</section>
  <p class="home-hint">${icon('info')} Du kannst jede Lektion direkt öffnen, auch in anderer Reihenfolge. Jede Lektion dauert etwa 5 bis 10 Minuten.</p>
</div>`;
}
function chapterBlock(c, ci) {
  const done = c.lessons.filter(l => store.done[l.id]).length;
  return `<section class="chapter"><div class="chapter-head"><span class="chapter-num">${ci + 1}</span><div><h2>${esc(c.title)}</h2><p>${esc(c.goal)}</p></div><span class="chapter-count">${done} / ${c.lessons.length}</span></div><ol class="lesson-list">${c.lessons.map(l0 => {
    const l = byId(l0.id), isDone = !!store.done[l.id], started = !isDone && store.pos[l.id] > 0;
    return `<li><a class="lesson-row ${isDone ? 'done' : ''}" href="${isDone ? `#/l/${l.id}/1` : lessonHref(l)}"><span class="lr-num">${isDone ? icon('check') : numberOf(l)}</span><span class="lr-text"><strong>${esc(l.title)}</strong><span>${esc(l.goal)}</span></span><span class="lr-state">${isDone ? 'Erledigt' : started ? 'Angefangen' : ''}</span>${icon('chevron', 'lr-chev')}</a></li>`;
  }).join('')}</ol></section>`;
}

// ---------- Lektion ----------
function lessonTop(l, i) {
  const total = l.steps.length;
  return `<div class="lesson-top"><a class="back-link" href="#/">${icon('back')}<span>Übersicht</span></a><div class="lt-title"><span>Lektion ${numberOf(l)} · ${esc(chapters[l.chapter].title)}</span><strong>${esc(l.title)}</strong></div><div class="lt-progress"><span>Schritt ${i + 1} von ${total}</span><div class="bar" aria-hidden="true"><i style="width:${((i + 1) / total) * 100}%"></i></div></div></div>`;
}

const kindOf = step => (step.show !== undefined ? 'show' : step.tap !== undefined ? 'tap' : step.ask !== undefined ? 'ask' : 'type');

function stepView() {
  const { lesson: l, index: i } = route, step = l.steps[i], kind = kindOf(step);
  const title = step.show ?? step.tap ?? step.ask ?? step.type;
  const isPhone = step.screen?.device === 'phone';
  const label = { show: 'Erklärung', tap: step.screen?.device === 'phone' ? 'Aufgabe · Tippe im Handy' : 'Aufgabe · Klicke im Bildschirm', ask: 'Frage', type: 'Aufgabe · Schreibe im Bildschirm' }[kind];
  const answers = [].concat(step.answer || []);
  const screen = step.screen ? renderScreen(step.screen, {
    live: kind === 'tap' && !st.done,
    marks: kind === 'show' ? step.marks : null,
    ok: st.ok, bad: st.bad, hint: st.hint, picked: st.picked,
    typeField: kind === 'type' ? step.field : null, typed: st.typed
  }) : '';
  const legend = step.legend ? `<ol class="legend">${step.legend.map((t, n) => `<li><span class="mk">${n + 1}</span><span>${rich(t)}</span></li>`).join('')}</ol>` : '';
  let action = '';
  if (kind === 'ask') {
    if (!st.order) st.order = shuffleIdx(step.options.length, step.keepOrder);
    action = `<div class="options" role="group" aria-label="Antworten">${st.order.map(n => {
      const [text, correct] = step.options[n], tried = st.tried.includes(n);
      const cls = tried ? (correct ? 'is-ok' : 'is-bad') : '';
      return `<button type="button" class="option ${cls}" data-opt="${n}" ${st.done ? 'disabled' : ''}><span class="opt-mark">${tried ? icon(correct ? 'check' : 'close') : ''}</span><span>${rich(text)}</span></button>`;
    }).join('')}</div>`;
  }
  if (kind === 'type' && !st.done) action = `<div class="type-actions"><button type="button" class="btn primary" data-act="check">Prüfen ${icon('check')}</button>${step.help ? `<p class="type-help">${icon('info')}<span>${rich(step.help)}</span></p>` : ''}</div>`;
  if (kind === 'tap' && !st.done && st.wrong > 0 && !st.hint) action = `<button type="button" class="btn quiet" data-act="hint">${icon('eye')} Zeig mir die Stelle</button>`;
  const feedback = st.feedback ? `<div class="feedback ${st.feedback.tone}" role="status" tabindex="-1">${fredi(st.feedback.tone === 'ok' ? 'aha' : st.feedback.tone === 'no' ? 'ratlos' : 'konzentriert', 'fb-fredi')}<div><strong>${esc(st.feedback.title)}</strong><p>${rich(st.feedback.text)}</p></div></div>` : '';
  const canNext = kind === 'show' || st.done;
  const last = i === l.steps.length - 1;
  const hasScreen = !!step.screen;
  return `<div class="lesson">${lessonTop(l, i)}
  <section class="step ${hasScreen ? (isPhone ? 'with-phone' : 'with-pc') : 'no-screen'} kind-${kind}">
    <div class="step-head"><span class="step-kind ${kind}">${label}</span><h1 tabindex="-1">${esc(title)}</h1>${step.text ? `<p class="step-text">${rich(step.text)}</p>` : ''}${step.fredi ? `<aside class="fredi-say">${fredi(step.fredi[0], 'say-fredi')}<p><strong>Fredi:</strong> ${rich(step.fredi[1])}</p></aside>` : ''}</div>
    ${hasScreen ? `<div class="step-screen">${screen}${step.note ? `<p class="screen-note">${rich(step.note)}</p>` : ''}</div>` : ''}
    <div class="step-act">${legend}${action}${feedback}${step.after && st.done ? `<div class="after">${rich(step.after)}</div>` : ''}</div>
  </section>
  <nav class="step-nav" aria-label="Schritte"><div class="step-nav-inner">
    ${i > 0 ? `<a class="btn secondary" href="#/l/${l.id}/${i}">${icon('back')} Zurück</a>` : '<a class="btn secondary" href="#/">' + icon('back') + ' Übersicht</a>'}
    <span class="nav-hint">${canNext ? '' : kind === 'ask' ? 'Wähle eine Antwort.' : kind === 'type' ? 'Tippe den Text und drücke „Prüfen“.' : 'Löse zuerst die Aufgabe.'}</span>
    <button type="button" class="btn primary" data-act="next" ${canNext ? '' : 'disabled'}>${last ? 'Lektion abschließen' : 'Weiter'} ${icon('arrow')}</button>
  </div></nav></div>`;
}

function shuffleIdx(n, keep) {
  const a = Array.from({ length: n }, (_, i) => i);
  if (keep) return a;
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function finishView() {
  const l = route.lesson, next = lessons[numberOf(l)] || null, open = nextOpen();
  const target = next && !store.done[next.id] ? next : open || next;
  return `<div class="finish"><div class="finish-card">${fredi('aha', 'finish-fredi')}<span class="eyebrow">Lektion ${numberOf(l)} erledigt</span><h1 tabindex="-1">${esc(l.title)}</h1><h2>Das Wichtigste</h2><ul class="summary">${l.summary.map(s => `<li>${icon('check')}<span>${rich(s)}</span></li>`).join('')}</ul><p class="finish-note">Alle Zusammenfassungen findest du auch im <a href="#/spickzettel">Spickzettel</a>.</p><div class="finish-actions">${target ? `<a class="btn primary big" href="${lessonHref(target)}">Weiter mit Lektion ${numberOf(target)}: ${esc(target.title)} ${icon('arrow')}</a>` : ''}<a class="btn secondary" href="#/">Zur Übersicht</a></div></div></div>`;
}

function sheetView() {
  return `<div class="sheet"><div class="sheet-head"><h1 tabindex="-1">Spickzettel</h1><p>Das Wichtigste aus allen Lektionen. Zum Ausdrucken und neben den Computer legen.</p><button type="button" class="btn secondary" data-act="print">${icon('print')} Drucken</button></div>
  <section class="numbers"><h2>Wichtige Nummern und Adressen in Österreich</h2><dl>
    <div><dt>Bankomat- und Kreditkarte sperren (rund um die Uhr)</dt><dd>0800 204 8800</dd></div>
    <div><dt>Polizei</dt><dd>133</dd></div>
    <div><dt>Euro-Notruf</dt><dd>112</dd></div>
    <div><dt>Betrugswarnungen und Fake-Shop-Liste</dt><dd>watchlist-internet.at</dd></div>
    <div><dt>FinanzOnline</dt><dd>finanzonline.bmf.gv.at</dd></div>
    <div><dt>Behördenwege</dt><dd>oesterreich.gv.at</dd></div>
  </dl><p class="muted">Die Nummer deiner eigenen Bank steht auf der Rückseite deiner Bankkarte. Schreib sie hier dazu: ______________________</p></section>
  ${chapters.map((c, ci) => `<section class="sheet-chapter"><h2>${ci + 1}. ${esc(c.title)}</h2>${c.lessons.map(l0 => { const l = byId(l0.id); return `<div class="sheet-lesson"><h3>${esc(l.title)}</h3><ul>${l.summary.map(s => `<li>${rich(s)}</li>`).join('')}</ul></div>`; }).join('')}</section>`).join('')}</div>`;
}

// ---------- Interaktion ----------
function keepScroll(fn) {
  const y = window.scrollY;
  fn();
  render();
  window.scrollTo(0, y);
  const fb = document.querySelector('.feedback');
  // Hinweise wie „Nur ausgewählt“ dürfen den Bildschirm nicht verschieben, sonst verrutscht der zweite Klick.
  if (fb && !fb.classList.contains('info')) {
    const r = fb.getBoundingClientRect();
    if (r.bottom > window.innerHeight - 90 || r.top < 0) fb.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
}

function markSolved() {
  st.done = true;
  solved.add(`${route.lesson.id}:${route.index}`);
}

function tap(id) {
  const step = route.lesson.steps[route.index];
  if (st.done) return;
  const answers = [].concat(step.answer);
  // Erst auswählen, dann z. B. „Öffnen“ klicken, gilt ebenfalls als gelöst.
  if (step.confirm && id === step.confirm && st.picked) {
    keepScroll(() => { markSolved(); st.ok = id; st.bad = null; st.feedback = { tone: 'ok', title: 'Richtig.', text: step.ok }; });
    return;
  }
  if (answers.includes(id)) {
    if (step.double) {
      const now = Date.now();
      if (pendingClick && pendingClick.id === id && now - pendingClick.time < 600) {
        clearTimeout(pendingClick.timer);
        pendingClick = null;
      } else {
        const timer = setTimeout(() => {
          pendingClick = null;
          keepScroll(() => { st.picked = id; st.feedback = { tone: 'info', title: 'Nur ausgewählt', text: step.single || 'Ein Klick wählt nur aus. Zum Öffnen klickst du **zweimal schnell hintereinander** mit der linken Maustaste. Halte die Maus dabei ruhig.' }; });
        }, 450);
        pendingClick = { id, time: now, timer };
        return;
      }
    }
    keepScroll(() => { markSolved(); st.ok = id; st.bad = null; st.hint = null; st.feedback = { tone: 'ok', title: 'Richtig.', text: step.ok }; });
    document.querySelector('[data-act="next"]')?.focus({ preventScroll: true });
    return;
  }
  keepScroll(() => {
    st.wrong++; st.bad = id; st.picked = null;
    const info = CHROME_INFO[id];
    const text = step.wrong?.[id] || (info ? `${info} ${step.retry || 'Das ist hier nicht gesucht.'}` : step.other || 'Das ist nicht die gesuchte Stelle. Lies die Aufgabe noch einmal und schau genau hin.');
    st.feedback = { tone: 'no', title: 'Noch nicht.', text };
  });
}

function answer(n) {
  const step = route.lesson.steps[route.index];
  if (st.done) return;
  const [, correct, explain] = step.options[n];
  keepScroll(() => {
    if (!st.tried.includes(n)) st.tried.push(n);
    if (correct) { markSolved(); st.feedback = { tone: 'ok', title: 'Richtig.', text: explain || step.ok || '' }; }
    else { st.wrong++; st.feedback = { tone: 'no', title: 'Nicht die beste Wahl.', text: `${explain || ''} Wähle eine andere Antwort.`.trim() }; }
  });
  if (correct) document.querySelector('[data-act="next"]')?.focus({ preventScroll: true });
}

const norm = (value, step) => {
  let v = String(value).trim().replace(/\s+/g, ' ');
  if (!step.caseSensitive) v = v.toLowerCase();
  if (step.loose) v = v.replace(/[\s.,!?–-]/g, '');
  return v;
};
function check() {
  const step = route.lesson.steps[route.index];
  const input = document.querySelector('#type-input');
  if (input) st.typed = input.value;
  const expected = [].concat(step.expect);
  const ok = expected.some(e => norm(e, step) === norm(st.typed, step));
  keepScroll(() => {
    if (ok) { markSolved(); st.feedback = { tone: 'ok', title: 'Richtig geschrieben.', text: step.ok }; return; }
    st.wrong++;
    let text;
    if (!st.typed.trim()) text = 'Das Feld ist noch leer. Klicke oder tippe zuerst in das weiße Feld im Bildschirm und schreibe dann.';
    else if (expected[0].includes('@') && !st.typed.includes('@')) text = 'Das @ fehlt noch. Am Computer: Taste **AltGr** gedrückt halten und dann **Q** drücken. Am Handy gibt es auf der Tastatur eine eigene @-Taste.';
    else if (/\s/.test(st.typed.trim()) && !/\s/.test(expected[0])) text = `In dieser Adresse gibt es keine Leerzeichen. Gesucht ist: **${esc(expected[0])}**`;
    else text = `Das stimmt noch nicht ganz. Vergleiche Zeichen für Zeichen mit: **${esc(expected[0])}**`;
    st.feedback = { tone: 'no', title: 'Noch nicht ganz.', text };
  });
  if (!ok) { const el = document.querySelector('#type-input'); el?.focus({ preventScroll: true }); el?.setSelectionRange(el.value.length, el.value.length); }
  else document.querySelector('[data-act="next"]')?.focus({ preventScroll: true });
}

function next() {
  const { lesson: l, index: i } = route;
  if (i < l.steps.length - 1) return go(`#/l/${l.id}/${i + 2}`);
  store.done[l.id] = true;
  store.pos[l.id] = 0;
  save();
  go(`#/l/${l.id}/fertig`);
}

function dialog(type) {
  const d = document.createElement('dialog');
  d.className = 'dialog';
  d.innerHTML = type === 'about'
    ? `<h2>Über diese Seite</h2><p>Die Bildschirme sind vereinfacht nachgebaut. Sie sehen ähnlich aus wie Windows 11, Android und bekannte Dienste, sind aber keine Originale. Je nach Gerät und Version sieht es bei dir etwas anders aus. Die Schritte sind dieselben.</p><p>Namen, Adressen und Nummern in den Übungen sind Beispiele. Gib hier keine echten Passwörter oder Kontodaten ein.</p><p>Es gibt keine Anmeldung, keine Werbung und keine Auswertung. Dein Fortschritt bleibt nur in diesem Browser gespeichert.</p><h3>Weiterführende Informationen</h3><ul><li><a href="https://www.onlinesicherheit.gv.at/" target="_blank" rel="noopener">onlinesicherheit.gv.at</a> (Bundeskanzleramt)</li><li><a href="https://www.watchlist-internet.at/" target="_blank" rel="noopener">watchlist-internet.at</a> (aktuelle Betrugswarnungen)</li><li><a href="https://www.bundeskriminalamt.at/202/Betrug_verhindern/" target="_blank" rel="noopener">Bundeskriminalamt: Betrug verhindern</a></li><li><a href="https://www.oesterreich.gv.at/id-austria" target="_blank" rel="noopener">oesterreich.gv.at: ID Austria</a></li></ul><div class="dialog-actions"><button type="button" class="btn primary" data-act="close">Schließen</button></div>`
    : `<h2>Fortschritt löschen?</h2><p>Alle Lektionen werden wieder als offen markiert. Die Lektionen selbst bleiben erhalten.</p><div class="dialog-actions"><button type="button" class="btn secondary" data-act="close">Abbrechen</button><button type="button" class="btn danger" data-act="confirm-reset">Fortschritt löschen</button></div>`;
  document.body.append(d);
  d.addEventListener('close', () => d.remove());
  d.addEventListener('click', e => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'close') d.close();
    if (act === 'confirm-reset') { store.done = {}; store.pos = {}; save(); solved.clear(); d.close(); go('#/'); }
  });
  d.showModal();
}

app.addEventListener('click', e => {
  const t = e.target.closest('.screen.live [data-t]');
  if (t) { e.preventDefault(); tap(t.dataset.t); return; }
  const opt = e.target.closest('[data-opt]');
  if (opt) { answer(Number(opt.dataset.opt)); return; }
  const act = e.target.closest('[data-act]')?.dataset.act;
  if (!act) return;
  if (act === 'next') next();
  if (act === 'hint') keepScroll(() => { st.hint = [].concat(route.lesson.steps[route.index].answer)[0]; st.feedback = { tone: 'info', title: 'Hier ist es', text: 'Die gesuchte Stelle blinkt jetzt im Bildschirm. Klicke oder tippe darauf.' }; });
  if (act === 'check') check();
  if (act === 'big') { store.big = !store.big; save(); render(); }
  if (act === 'print') window.print();
  if (act === 'about' || act === 'reset') dialog(act);
});
app.addEventListener('input', e => { if (e.target.id === 'type-input') st.typed = e.target.value; });
app.addEventListener('keydown', e => { if (e.target.id === 'type-input' && e.key === 'Enter') { e.preventDefault(); check(); } });

// Am PC zeigt Windows unten links, wohin ein Link führt, wenn die Maus darüber ist.
const showHref = (e, on) => {
  const el = e.target.closest?.('[data-href]');
  if (!el) return;
  const bar = el.closest('.win')?.querySelector('.statusbar');
  if (!bar) return;
  bar.textContent = on ? `https://${el.dataset.href.replace(/^https?:\/\//, '')}` : '';
  bar.classList.toggle('show', on);
};
app.addEventListener('mouseover', e => showHref(e, true));
app.addEventListener('mouseout', e => showHref(e, false));
app.addEventListener('focusin', e => showHref(e, true));
app.addEventListener('focusout', e => showHref(e, false));

// Der Sprunglink darf die Hash-Navigation nicht auslösen.
document.querySelector('.skip')?.addEventListener('click', e => { e.preventDefault(); document.querySelector('#main')?.focus(); });

window.addEventListener('hashchange', onRoute);
onRoute();
