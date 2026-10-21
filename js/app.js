(() => {
  'use strict';

  const { CATS, EX, ROUTINES, DEFAULT_PLAN } = window.FORJA;
  const RT = Object.fromEntries(ROUTINES.map((r) => [r.id, r]));
  const $ = (s, el = document) => el.querySelector(s);

  // Cada ítem hereda tiempo y descanso de su sección.
  ROUTINES.forEach((r) =>
    r.sections.forEach((s) => {
      s.items = s.items.map((it) => Object.assign({ work: s.work, rest: s.rest || 0 }, it));
    })
  );

  /* ---------- Fechas ---------- */
  const DAYS_S = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const DAYS_L = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const DAYS_3 = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];
  const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const pad = (n) => String(n).padStart(2, '0');
  const dstr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const dow = (d) => (d.getDay() + 6) % 7;
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const today = () => dstr(new Date());
  const weekOf = (s) => { const d = parse(s); const mon = addDays(d, -dow(d)); return Array.from({ length: 7 }, (_, i) => dstr(addDays(mon, i))); };
  const longDate = (d) => `${DAYS_L[dow(d)]} ${d.getDate()} de ${MONTHS[d.getMonth()]}`;

  /* ---------- Estado guardado ---------- */
  const KEY = 'forja.v1';
  const defaults = () => ({ plan: [...DEFAULT_PLAN], over: {}, hist: [], beep: true, voice: true });
  function load() {
    try {
      const j = JSON.parse(localStorage.getItem(KEY));
      const s = j ? Object.assign(defaults(), j) : defaults();
      if (!Array.isArray(s.plan) || s.plan.length !== 7) s.plan = [...DEFAULT_PLAN];
      return s;
    } catch (e) { return defaults(); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* sin almacenamiento */ } }
  const S = load();

  const ui = { tab: 'hoy', day: today(), cal: { y: new Date().getFullYear(), m: new Date().getMonth() }, confirmReset: false };

  const routineFor = (ds) => (S.over[ds] !== undefined ? S.over[ds] : S.plan[dow(parse(ds))]);

  /* ---------- Iconos ---------- */
  const PATHS = {
    today: '<rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 3v3M16 3v3"/>',
    list: '<path d="M4 6h16M4 12h16M4 18h10"/>',
    chart: '<path d="M5 20v-7M12 20V5M19 20v-10"/>',
    play: '<path d="M7 4.5v15l13-7.5z" fill="currentColor"/>',
    pause: '<rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/>',
    next: '<path d="M5 5l10 7-10 7z" fill="currentColor"/><path d="M19 5v14"/>',
    prev: '<path d="M19 5l-10 7 10 7z" fill="currentColor"/><path d="M5 5v14"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    sound: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11"/>',
    mute: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
    voice: '<path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2h-7l-5 4v-4H5a2 2 0 01-2-2V7a2 2 0 012-2z"/><path d="M8 10h8M8 13h5"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    left: '<path d="M15 6l-6 6 6 6"/>',
    flame: '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 .3 1.5 1 2 2 2-1-3-.5-5 1-8z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    kettlebell: '<path d="M8.5 9.5V7.5a3.5 3.5 0 017 0v2"/><circle cx="12" cy="15" r="6"/>',
    dumbbell: '<path d="M6.5 7v10M17.5 7v10M3.5 9.5v5M20.5 9.5v5M6.5 12h11"/>',
    bolt: '<path d="M13 3L5 13.5h6L10 21l9-11h-6z"/>',
    stretch: '<circle cx="12" cy="5" r="2"/><path d="M12 8v6M6 11l6 1 6-1M9 21l3-7 3 7"/>',
    rest: '<path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"/>'
  };
  const ic = (name, cls = '') =>
    `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[name]}</svg>`;

  /* ---------- Rutinas: pasos y duración ---------- */
  const stepCache = {};
  function stepsOf(r) {
    if (stepCache[r.id]) return stepCache[r.id];
    const steps = [];
    r.sections.forEach((s, si) => {
      for (let round = 1; round <= s.rounds; round++) {
        s.items.forEach((it, ii) => {
          const reps = !!it.reps;
          steps.push({
            type: 'work', ex: it.ex, mode: reps ? 'reps' : 'time', dur: it.work, reps: it.reps, per: it.per,
            section: s.title, round, rounds: s.rounds, idx: ii + 1, count: s.items.length
          });
          const lastItem = ii === s.items.length - 1;
          const lastRound = round === s.rounds;
          const lastSection = si === r.sections.length - 1;
          if (!lastItem) { if (it.rest) steps.push({ type: 'rest', dur: it.rest }); }
          else if (!lastRound) { if (s.roundRest) steps.push({ type: 'rest', dur: s.roundRest }); }
          else if (!lastSection) steps.push({ type: 'rest', dur: 20 });
        });
      }
    });
    steps.forEach((st, k) => {
      if (st.type === 'rest') st.next = steps.slice(k + 1).find((x) => x.type === 'work');
    });
    stepCache[r.id] = steps;
    return steps;
  }
  const minutesOf = (r) => Math.max(1, Math.round(stepsOf(r).reduce((a, s) => a + (s.type === 'work' && s.mode === 'reps' ? 45 : s.dur), 0) / 60));
  const countOf = (r) => new Set(stepsOf(r).filter((s) => s.type === 'work').map((s) => s.ex)).size;
  const specOf = (it) => (it.reps ? `${it.reps} ${it.per || 'reps'}` : `${it.work} s`);

  /* ---------- Estadísticas ---------- */
  function streak() {
    if (!S.hist.length) return 0;
    const done = new Set(S.hist.map((h) => h.d));
    const first = S.hist.reduce((a, h) => (h.d < a ? h.d : a), S.hist[0].d);
    let d = parse(today());
    let n = 0;
    if (!done.has(dstr(d))) d = addDays(d, -1);
    for (let k = 0; k < 400; k++) {
      const s = dstr(d);
      if (s < first) break;
      if (done.has(s)) n++;
      else if (routineFor(s) !== 'rest') break;
      d = addDays(d, -1);
    }
    return n;
  }
  function weekStats() {
    const w = new Set(weekOf(today()));
    const hs = S.hist.filter((h) => w.has(h.d));
    return { n: hs.length, min: hs.reduce((a, h) => a + h.m, 0) };
  }

  /* ---------- Vistas ---------- */
  const view = $('#view');
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  function sectionsHTML(r) {
    return r.sections.map((s) => `
      <div class="blk">
        <div class="blk-h"><h3>${s.title}</h3><span>${s.rounds > 1 ? s.rounds + ' rondas' : ''}</span></div>
        <ol class="exlist">${s.items.map((it) => {
          const e = EX[it.ex];
          return `<li><button class="exrow" data-act="ex" data-ex="${it.ex}" data-cat="${r.cat}">
            <span class="exrow-fig fig" data-fig="${it.ex}"></span>
            <span class="exrow-t"><b>${e.n}</b><small>${e.m.join(' · ')}</small></span>
            <span class="exrow-s">${specOf(it)}</span>
          </button></li>`;
        }).join('')}</ol>
      </div>`).join('');
  }

  function viewHoy() {
    const t = today();
    const week = weekOf(t);
    const sel = ui.day;
    const rid = routineFor(sel);
    const r = RT[rid];
    const doneSel = S.hist.some((h) => h.d === sel);
    const ws = weekStats();

    const strip = week.map((ds, i) => {
      const rr = RT[routineFor(ds)];
      const isDone = S.hist.some((h) => h.d === ds);
      const n = parse(ds).getDate();
      return `<button class="day ${ds === sel ? 'is-sel' : ''} ${ds === t ? 'is-today' : ''}" data-act="pick-day" data-day="${ds}"
        aria-pressed="${ds === sel}" aria-label="${DAYS_L[i]} ${n}: ${rr ? rr.name : 'descanso'}${isDone ? ', hecha' : ''}">
        <span class="day-l">${DAYS_S[i]}</span><span class="day-n">${n}</span>
        <span class="day-dot ${rr ? 'cat-' + rr.cat : 'is-rest'} ${isDone ? 'is-done' : ''}">${isDone ? ic('check') : ''}</span>
      </button>`;
    }).join('');

    let hero;
    if (r) {
      hero = `<section class="hero cat-${r.cat}">
        ${ic(CATS[r.cat].icon, 'hero-art')}
        <div class="hero-top"><span class="pill">${CATS[r.cat].label}</span>${doneSel ? `<span class="pill">${ic('check')} Hecha</span>` : ''}</div>
        <h1 class="h-display hero-title">${r.name}</h1>
        <p class="hero-tag">${r.tagline}</p>
        <ul class="hero-meta">
          <li>${ic('clock')} ${minutesOf(r)} min</li>
          <li>${ic('list')} ${countOf(r)} ejercicios</li>
        </ul>
        <button class="btn-cta" data-act="start" data-id="${r.id}">${ic('play')} ${doneSel ? 'Repetir' : 'Empezar'}</button>
      </section>`;
    } else {
      hero = `<section class="hero cat-mob">
        ${ic('rest', 'hero-art')}
        <div class="hero-top"><span class="pill">Descanso</span></div>
        <h1 class="h-display hero-title">Día libre</h1>
        <p class="hero-tag">Recuperar también es entrenar. Si quieres moverte, haz movilidad suave.</p>
        <button class="btn-cta" data-act="start" data-id="mov">${ic('stretch')} Movilidad · ${minutesOf(RT.mov)} min</button>
      </section>`;
    }

    const ws2 = `<section class="stats" aria-label="Resumen">
      <div class="stat"><span class="stat-n">${streak()}</span><span class="stat-l">${ic('flame')} Racha</span></div>
      <div class="stat"><span class="stat-n">${ws.n}</span><span class="stat-l">Esta semana</span></div>
      <div class="stat"><span class="stat-n">${ws.min}</span><span class="stat-l">Minutos</span></div>
    </section>`;

    return `
      <header class="top">
        <span class="brand">${ic('kettlebell')} Forja</span>
        <span class="top-date">${cap(longDate(new Date()))}</span>
      </header>
      <nav class="week" aria-label="Semana">${strip}</nav>
      ${hero}
      <button class="btn-ghost block" data-act="change">Cambiar rutina de este día</button>
      ${ws2}
      ${r ? `<section class="grp cat-${r.cat}"><h2 class="h-sec">Incluye</h2>${sectionsHTML(r)}</section>` : ''}`;
  }

  function viewRutinas() {
    const groups = Object.keys(CATS).map((c) => {
      const rs = ROUTINES.filter((r) => r.cat === c);
      if (!rs.length) return '';
      return `<section class="grp"><h2 class="h-sec">${CATS[c].label}</h2>${rs.map((r) => `
        <button class="rcard cat-${r.cat}" data-act="detail" data-id="${r.id}">
          <span class="rcard-ic">${ic(CATS[r.cat].icon)}</span>
          <span class="rcard-t"><b>${r.name}</b><small>${r.tagline}</small><em>${minutesOf(r)} min · ${countOf(r)} ejercicios</em></span>
          ${ic('chevron', 'rcard-go')}
        </button>`).join('')}</section>`;
    }).join('');

    const plan = DAYS_L.map((d, k) => `
      <label class="plan-row" for="plan-${k}"><span>${d}</span>
        <select id="plan-${k}" data-plan="${k}">
          <option value="rest" ${S.plan[k] === 'rest' ? 'selected' : ''}>Descanso</option>
          ${ROUTINES.map((r) => `<option value="${r.id}" ${S.plan[k] === r.id ? 'selected' : ''}>${CATS[r.cat].label} · ${r.name}</option>`).join('')}
        </select>
      </label>`).join('');

    return `
      <header class="top"><h1 class="h-display page-title">Rutinas</h1></header>
      ${groups}
      <section class="grp">
        <h2 class="h-sec">Plan semanal</h2>
        <p class="muted">Elige qué toca cada día. Se guarda en este dispositivo.</p>
        <div class="plan">${plan}</div>
      </section>`;
  }

  function viewProgreso() {
    const { y, m } = ui.cal;
    const first = new Date(y, m, 1);
    const lead = dow(first);
    const days = new Date(y, m + 1, 0).getDate();
    const t = today();
    const total = S.hist.reduce((a, h) => a + h.m, 0);
    let cells = '';
    for (let k = 0; k < lead; k++) cells += '<span class="cal-d is-empty"></span>';
    for (let d = 1; d <= days; d++) {
      const ds = `${y}-${pad(m + 1)}-${pad(d)}`;
      const cats = [...new Set(S.hist.filter((h) => h.d === ds).map((h) => RT[h.r] && RT[h.r].cat).filter(Boolean))];
      cells += `<span class="cal-d ${ds === t ? 'is-today' : ''} ${cats.length ? 'has' : ''}"><span>${d}</span><i class="dots">${cats.map((c) => `<b class="cat-${c}"></b>`).join('')}</i></span>`;
    }
    const recent = [...S.hist].sort((a, b) => b.t - a.t).slice(0, 12);
    const effort = ['', 'Suave', 'Bien', 'Duro'];
    const list = recent.length
      ? recent.map((h) => {
          const r = RT[h.r];
          const d = parse(h.d);
          return `<li class="hist-row ${r ? 'cat-' + r.cat : ''}"><i class="hist-dot"></i>
            <span class="hist-t"><b>${r ? r.name : 'Rutina'}</b><small>${r ? CATS[r.cat].label : ''}</small></span>
            <span class="hist-m">${DAYS_3[dow(d)]} ${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}<small>${h.m} min${h.e ? ' · ' + effort[h.e] : ''}</small></span></li>`;
        }).join('')
      : `<li class="empty">Aún no hay sesiones. Cuando termines una rutina aparecerá aquí.</li>`;

    return `
      <header class="top"><h1 class="h-display page-title">Progreso</h1></header>
      <section class="stats" aria-label="Totales">
        <div class="stat"><span class="stat-n">${streak()}</span><span class="stat-l">${ic('flame')} Racha</span></div>
        <div class="stat"><span class="stat-n">${S.hist.length}</span><span class="stat-l">Sesiones</span></div>
        <div class="stat"><span class="stat-n">${total}</span><span class="stat-l">Minutos</span></div>
      </section>
      <section class="grp">
        <div class="cal-head">
          <button class="icon-btn" data-act="cal-prev" aria-label="Mes anterior">${ic('left')}</button>
          <h2 class="h-sec">${cap(MONTHS[m])} ${y}</h2>
          <button class="icon-btn" data-act="cal-next" aria-label="Mes siguiente">${ic('chevron')}</button>
        </div>
        <div class="cal">
          ${DAYS_S.map((d) => `<span class="cal-w">${d}</span>`).join('')}${cells}
        </div>
      </section>
      <section class="grp"><h2 class="h-sec">Últimas sesiones</h2><ul class="hist">${list}</ul></section>
      ${S.hist.length ? `<section class="grp">${ui.confirmReset
        ? `<p class="muted">Se borrará todo el historial de este dispositivo.</p><div class="row"><button class="btn-ghost" data-act="reset-cancel">Cancelar</button><button class="btn-danger" data-act="reset-ok">Borrar historial</button></div>`
        : `<button class="btn-ghost block" data-act="reset">Borrar historial</button>`}</section>` : ''}`;
  }

  const TABS = { hoy: ['today', 'Hoy'], rutinas: ['list', 'Rutinas'], progreso: ['chart', 'Progreso'] };
  function render() {
    view.innerHTML = { hoy: viewHoy, rutinas: viewRutinas, progreso: viewProgreso }[ui.tab]();
    document.querySelectorAll('.tab').forEach((b) => {
      const [icon, label] = TABS[b.dataset.tab];
      const on = b.dataset.tab === ui.tab;
      b.innerHTML = `${ic(icon)}<span>${label}</span>`;
      b.classList.toggle('is-on', on);
      if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
    });
    FIG.hydrate(view);
  }

  /* ---------- Hojas (sheets) y aviso ---------- */
  let lastFocus = null;
  function openSheet(html, cat) {
    const sh = $('#sheet');
    lastFocus = document.activeElement;
    sh.innerHTML = `<div class="sheet-back" data-act="close-sheet"></div>
      <div class="sheet-panel ${cat ? 'cat-' + cat : ''}" role="dialog" aria-modal="true" tabindex="-1">${html}</div>`;
    sh.hidden = false;
    document.body.classList.add('no-scroll');
    FIG.hydrate(sh);
    $('.sheet-panel', sh).focus();
  }
  function closeSheet() {
    const sh = $('#sheet');
    if (sh.hidden) return;
    sh.hidden = true;
    sh.innerHTML = '';
    if (!P) {
      document.body.classList.remove('no-scroll');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
  }
  let toastT;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(() => { el.hidden = true; }, 1800);
  }

  function detailSheet(id) {
    const r = RT[id];
    openSheet(`
      <button class="sheet-x" data-act="close-sheet" aria-label="Cerrar">${ic('close')}</button>
      <div class="sheet-body">
        <p class="eyebrow">${CATS[r.cat].label}</p>
        <h2 class="h-display sheet-title">${r.name}</h2>
        <p class="sheet-sub">${r.tagline}</p>
        <div class="chips">${r.focus.map((f) => `<span class="chip">${f}</span>`).join('')}</div>
        <ul class="hero-meta flat"><li>${ic('clock')} ${minutesOf(r)} min</li><li>${ic('list')} ${countOf(r)} ejercicios</li></ul>
        ${r.template ? `<p class="note">Esta es una rutina de ejemplo. Edítala en <code>js/data.js</code> para que coincida con tu rutina de cardio y fuerza.</p>` : ''}
        ${sectionsHTML(r)}
      </div>
      <div class="sheet-cta"><button class="btn-cta solid" data-act="start" data-id="${r.id}">${ic('play')} Empezar</button></div>`, r.cat);
  }
  function exSheet(id, cat) {
    const e = EX[id];
    openSheet(`
      <button class="sheet-x" data-act="close-sheet" aria-label="Cerrar">${ic('close')}</button>
      <div class="sheet-body">
        <p class="eyebrow">Ejercicio</p>
        <h2 class="h-display sheet-title">${e.n}</h2>
        <div class="sheet-fig fig" data-fig="${id}" data-animate role="img" aria-label="Demostración de ${e.n}"></div>
        <div class="chips">${e.m.map((x) => `<span class="chip">${x}</span>`).join('')}</div>
        <p class="sheet-cue">${e.c}</p>
      </div>`, cat);
  }
  function changeSheet() {
    const ds = ui.day;
    const cur = routineFor(ds);
    const opts = [...ROUTINES.map((r) => ({ id: r.id, name: r.name, cat: r.cat, sub: `${CATS[r.cat].label} · ${minutesOf(r)} min` })),
      { id: 'rest', name: 'Descanso', cat: 'mob', sub: 'Sin entrenamiento' }];
    openSheet(`
      <button class="sheet-x" data-act="close-sheet" aria-label="Cerrar">${ic('close')}</button>
      <div class="sheet-body">
        <p class="eyebrow">${cap(longDate(parse(ds)))}</p>
        <h2 class="h-display sheet-title">¿Qué toca hoy?</h2>
        <div class="opts">${opts.map((o) => `<button class="opt cat-${o.cat} ${cur === o.id ? 'is-on' : ''}" data-act="set-over" data-id="${o.id}">
          <i class="opt-dot"></i><span><b>${o.name}</b><small>${o.sub}</small></span>${cur === o.id ? ic('check') : ''}</button>`).join('')}</div>
        ${S.over[ds] !== undefined ? `<button class="btn-ghost block" data-act="clear-over">Volver al plan semanal</button>` : ''}
      </div>`);
  }

  /* ---------- Audio, voz y pantalla ---------- */
  let AC = null;
  function ac() {
    if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { AC = null; } }
    if (AC && AC.state === 'suspended') AC.resume();
    return AC;
  }
  function tone(freq, dur = 0.12, when = 0, vol = 0.2) {
    if (!S.beep) return;
    const a = ac();
    if (!a) return;
    const o = a.createOscillator();
    const g = a.createGain();
    const t = a.currentTime + when;
    o.type = 'triangle';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(a.destination);
    o.start(t);
    o.stop(t + dur + 0.03);
  }
  function say(text) {
    if (!S.voice || !('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'es-ES';
      u.rate = 1.05;
      speechSynthesis.speak(u);
    } catch (e) { /* sin voz */ }
  }
  const buzz = (ms) => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) { /* sin vibración */ } };
  let wake = null;
  async function lockWake() { try { if ('wakeLock' in navigator) wake = await navigator.wakeLock.request('screen'); } catch (e) { wake = null; } }
  function unlockWake() { try { if (wake) wake.release(); } catch (e) { /* ya liberado */ } wake = null; }
  document.addEventListener('visibilitychange', () => { if (!document.hidden && P) lockWake(); });

  /* ---------- Reproductor ---------- */
  let P = null;
  const C = 2 * Math.PI * 88;

  function playerShell(r) {
    return `<div class="pl cat-${r.cat}" id="pl">
      <div class="pl-in">
        <header class="pl-top">
          <button class="pl-ib" data-act="pl-exit" aria-label="Salir de la rutina">${ic('close')}</button>
          <div class="pl-title"><b>${r.name}</b><span id="pl-sec"></span></div>
          <div class="pl-tg">
            <button class="pl-ib ${S.beep ? '' : 'is-off'}" id="pl-beep" data-act="pl-beep" aria-pressed="${S.beep}" aria-label="Sonido">${ic(S.beep ? 'sound' : 'mute')}</button>
            <button class="pl-ib ${S.voice ? '' : 'is-off'}" id="pl-voice" data-act="pl-voice" aria-pressed="${S.voice}" aria-label="Voz">${ic('voice')}</button>
          </div>
        </header>
        <div class="pl-bar" role="progressbar" aria-label="Progreso de la rutina"><i id="pl-fill"></i></div>
        <div class="pl-stage">
          <p class="pl-phase" id="pl-phase"></p>
          <div class="pl-row">
            <div class="ring">
              <svg viewBox="0 0 200 200" aria-hidden="true">
                <circle class="ring-track" cx="100" cy="100" r="88"/>
                <circle class="ring-prog" id="ring-prog" cx="100" cy="100" r="88" transform="rotate(-90 100 100)"/>
              </svg>
              <div class="ring-c"><span class="ring-n" id="pl-time"></span><span class="ring-u" id="pl-unit"></span></div>
            </div>
            <div class="pl-fig fig" id="pl-fig" role="img" aria-label="Demostración del ejercicio"></div>
          </div>
          <div class="pl-info">
            <p class="pl-pre">Sigue</p>
            <h2 class="pl-name" id="pl-name"></h2>
            <p class="pl-cue" id="pl-cue"></p>
            <div class="chips on-cat" id="pl-m"></div>
          </div>
          <button class="pl-plus" id="pl-plus" data-act="pl-plus">+15 s de descanso</button>
        </div>
        <footer class="pl-ctrl">
          <button class="pl-rb" data-act="pl-prev" aria-label="Anterior">${ic('prev')}</button>
          <button class="pl-main" id="pl-pause" data-act="pl-pause" aria-label="Pausar">${ic('pause')}</button>
          <button class="pl-done" id="pl-done" data-act="pl-next">${ic('check')} Listo</button>
          <button class="pl-rb" data-act="pl-next" aria-label="Siguiente">${ic('next')}</button>
        </footer>
      </div>
      <div class="pl-confirm" id="pl-confirm" hidden>
        <div class="pl-box" role="alertdialog" aria-labelledby="pl-ct">
          <h3 id="pl-ct">¿Salir de la rutina?</h3>
          <p>Esta sesión no se guardará.</p>
          <div class="row"><button class="btn-ghost" data-act="pl-stay">Seguir</button><button class="btn-danger" data-act="pl-leave">Salir</button></div>
        </div>
      </div>
    </div>`;
  }

  function startRoutine(id) {
    const r = RT[id];
    if (!r) return;
    closeSheet();
    ac();
    P = { r, steps: stepsOf(r), i: 0, paused: false, t0: Date.now(), pausedMs: 0, pauseAt: 0, remMs: 0, endAt: 0, dur: 0, lastSec: null, swapped: false, stepAt: 0, timer: null, confirm: false, wasPaused: false, done: false };
    const root = $('#player');
    root.innerHTML = playerShell(r);
    root.hidden = false;
    document.body.classList.add('no-scroll');
    lockWake();
    goStep(0);
    P.timer = setInterval(tick, 100);
  }

  function goStep(i) {
    P.i = i;
    const s = P.steps[i];
    P.paused = false;
    P.swapped = false;
    P.lastSec = null;
    P.stepAt = Date.now();
    const rest = s.type === 'rest';
    const w = rest ? s.next : s;
    const reps = !rest && s.mode === 'reps';
    const ex = EX[w.ex];
    const pl = $('#pl');
    pl.classList.toggle('is-rest', rest);
    pl.classList.toggle('is-reps', reps);
    pl.classList.remove('is-paused');
    $('#pl-pause').innerHTML = ic('pause');
    $('#pl-pause').setAttribute('aria-label', 'Pausar');
    $('#pl-phase').textContent = rest ? 'Descanso' : reps ? 'Repeticiones' : 'Trabajo';
    $('#pl-sec').textContent = `${w.section}${w.rounds > 1 ? ` · Ronda ${w.round}/${w.rounds}` : ''} · ${w.idx}/${w.count}`;
    $('#pl-name').textContent = ex.n;
    $('#pl-cue').textContent = ex.c;
    FIG.mount($('#pl-fig'), w.ex, { animate: true });
    $('#pl-m').innerHTML = ex.m.map((m) => `<span class="chip">${m}</span>`).join('');
    $('#pl-fill').style.width = `${(i / P.steps.length) * 100}%`;
    const ring = $('#ring-prog');
    ring.style.strokeDasharray = C.toFixed(2);
    if (reps) {
      P.endAt = 0;
      ring.style.strokeDashoffset = '0';
      $('#pl-time').textContent = s.reps;
      $('#pl-unit').textContent = s.per || 'repeticiones';
    } else {
      P.dur = s.dur;
      P.endAt = Date.now() + s.dur * 1000;
      ring.style.strokeDashoffset = '0';
      $('#pl-time').textContent = s.dur;
      $('#pl-unit').textContent = 'seg';
    }
    if (rest) { tone(440, 0.18); say(`Descanso. Sigue ${ex.n}`); }
    else { tone(1046, 0.14); tone(1568, 0.16, 0.12); say(ex.n); }
    buzz(rest ? 40 : 90);
  }

  function tick() {
    if (!P || P.paused || P.done || P.confirm || !P.endAt) return;
    const s = P.steps[P.i];
    const rem = P.endAt - Date.now();
    const secs = Math.max(0, Math.ceil(rem / 1000));
    const frac = Math.max(0, Math.min(1, rem / (P.dur * 1000)));
    $('#ring-prog').style.strokeDashoffset = (C * (1 - frac)).toFixed(1);
    if (secs !== P.lastSec) {
      P.lastSec = secs;
      $('#pl-time').textContent = secs;
      if (secs > 0 && secs <= 3) tone(880, 0.09);
      if (s.type === 'work' && EX[s.ex].swap && !P.swapped && secs <= Math.floor(P.dur / 2)) {
        P.swapped = true;
        tone(660, 0.1);
        tone(990, 0.14, 0.16);
        say('Cambia');
        buzz([60, 60, 60]);
      }
    }
    if (rem <= 0) next();
  }

  function next() {
    if (!P || P.done) return;
    if (P.i >= P.steps.length - 1) return finish();
    goStep(P.i + 1);
  }
  function prev() {
    if (!P || P.done) return;
    let j = P.i - 1;
    while (j > 0 && P.steps[j].type !== 'work') j--;
    if (P.steps[P.i].type === 'work' && Date.now() - P.stepAt > 3000) j = P.i;
    goStep(Math.max(0, j));
  }
  function pauseOn() {
    if (P.paused || !P.endAt) return false;
    P.paused = true;
    P.pauseAt = Date.now();
    P.remMs = P.endAt - Date.now();
    return true;
  }
  function pauseOff() {
    if (!P.paused) return;
    P.paused = false;
    P.pausedMs += Date.now() - P.pauseAt;
    P.endAt = Date.now() + P.remMs;
  }
  function togglePause() {
    if (!P || P.done || !P.endAt) return;
    const pl = $('#pl');
    if (P.paused) { pauseOff(); pl.classList.remove('is-paused'); $('#pl-pause').innerHTML = ic('pause'); $('#pl-pause').setAttribute('aria-label', 'Pausar'); }
    else { pauseOn(); pl.classList.add('is-paused'); $('#pl-pause').innerHTML = ic('play'); $('#pl-pause').setAttribute('aria-label', 'Continuar'); }
  }

  function finish() {
    clearInterval(P.timer);
    P.done = true;
    const active = Date.now() - P.t0 - P.pausedMs;
    const entry = { d: today(), r: P.r.id, m: Math.max(1, Math.round(active / 60000)), e: 0, t: Date.now() };
    S.hist.push(entry);
    save();
    P.entry = entry;
    [523, 659, 784, 1046].forEach((f, k) => tone(f, 0.22, k * 0.14));
    say('Rutina completa. Buen trabajo');
    buzz([120, 80, 120, 80, 200]);
    const n = countOf(P.r);
    $('#player').innerHTML = `<div class="pl cat-${P.r.cat} is-final"><div class="pl-in pl-fin">
      <svg class="fin-check" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52"/><path d="M36 62l16 16 32-34"/></svg>
      <h1 class="h-display fin-title">Rutina completa</h1>
      <p class="fin-sub">${P.r.name}</p>
      <div class="fin-stats">
        <div><b>${entry.m}</b><span>min</span></div>
        <div><b>${n}</b><span>ejercicios</span></div>
        <div><b>${streak()}</b><span>racha</span></div>
      </div>
      <p class="fin-q">¿Cómo estuvo?</p>
      <div class="fin-eff" role="group" aria-label="Esfuerzo">
        ${[[1, 'Suave'], [2, 'Bien'], [3, 'Duro']].map(([v, l]) => `<button data-act="effort" data-v="${v}" aria-pressed="false">${l}</button>`).join('')}
      </div>
      <button class="pl-back" data-act="pl-close">Volver al inicio</button>
    </div></div>`;
  }

  function closePlayer() {
    if (P) clearInterval(P.timer);
    try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { /* sin voz */ }
    unlockWake();
    P = null;
    const root = $('#player');
    root.hidden = true;
    root.innerHTML = '';
    document.body.classList.remove('no-scroll');
    ui.day = today();
    render();
    window.scrollTo(0, 0);
  }

  /* ---------- Acciones ---------- */
  const actions = {
    tab(b) { ui.tab = b.dataset.tab; ui.confirmReset = false; render(); window.scrollTo(0, 0); },
    'pick-day'(b) { ui.day = b.dataset.day; render(); },
    start(b) { startRoutine(b.dataset.id); },
    detail(b) { detailSheet(b.dataset.id); },
    ex(b) { exSheet(b.dataset.ex, b.dataset.cat); },
    change() { changeSheet(); },
    'set-over'(b) { S.over[ui.day] = b.dataset.id; save(); closeSheet(); render(); },
    'clear-over'() { delete S.over[ui.day]; save(); closeSheet(); render(); },
    'close-sheet'() { closeSheet(); },
    'cal-prev'() { ui.cal.m--; if (ui.cal.m < 0) { ui.cal.m = 11; ui.cal.y--; } render(); },
    'cal-next'() { ui.cal.m++; if (ui.cal.m > 11) { ui.cal.m = 0; ui.cal.y++; } render(); },
    reset() { ui.confirmReset = true; render(); },
    'reset-cancel'() { ui.confirmReset = false; render(); },
    'reset-ok'() { S.hist = []; save(); ui.confirmReset = false; render(); toast('Historial borrado'); },

    'pl-pause'() { togglePause(); },
    'pl-next'() { next(); },
    'pl-prev'() { prev(); },
    'pl-plus'() {
      if (!P || !P.endAt) return;
      P.dur += 15;
      if (P.paused) P.remMs += 15000; else P.endAt += 15000;
    },
    'pl-beep'(b) { S.beep = !S.beep; save(); b.classList.toggle('is-off', !S.beep); b.setAttribute('aria-pressed', S.beep); b.innerHTML = ic(S.beep ? 'sound' : 'mute'); },
    'pl-voice'(b) {
      S.voice = !S.voice; save();
      b.classList.toggle('is-off', !S.voice); b.setAttribute('aria-pressed', S.voice);
      if (!S.voice && 'speechSynthesis' in window) speechSynthesis.cancel();
    },
    'pl-exit'() {
      if (!P || P.done) return;
      P.wasPaused = P.paused;
      pauseOn();
      P.confirm = true;
      $('#pl-confirm').hidden = false;
      $('#pl-confirm .btn-ghost').focus();
    },
    'pl-stay'() {
      P.confirm = false;
      $('#pl-confirm').hidden = true;
      if (!P.wasPaused) pauseOff();
    },
    'pl-leave'() { closePlayer(); },
    'pl-close'() { closePlayer(); },
    effort(b) {
      if (!P || !P.entry) return;
      P.entry.e = Number(b.dataset.v);
      save();
      document.querySelectorAll('.fin-eff button').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    }
  };

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const fn = actions[b.dataset.act];
    if (fn) fn(b, e);
  });

  document.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-plan]');
    if (!sel) return;
    S.plan[Number(sel.dataset.plan)] = sel.value;
    save();
    toast('Plan guardado');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!$('#sheet').hidden) return closeSheet();
      if (P && !P.done) return P.confirm ? actions['pl-stay']() : actions['pl-exit']();
    }
    if (P && !P.done && !P.confirm) {
      if (e.key === ' ' && !e.target.closest('button')) { e.preventDefault(); P.endAt ? togglePause() : next(); }
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    }
  });

  /* ---------- Inicio ---------- */
  render();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();
