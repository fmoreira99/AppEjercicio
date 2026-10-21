(() => {
  'use strict';

  const { CATS, GOALS, EX, EXGROUPS, ROUTINES, PROGRAM, PROGRAM_NAMES, DEFAULT_PLAN } = window.FORJA;
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
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const ejN = (n) => `${n} ${n === 1 ? 'ejercicio' : 'ejercicios'}`;
  const clock = (s) => (s >= 60 ? `${Math.floor(s / 60)}:${pad(s % 60)}` : String(s));

  /* ---------- Estado guardado ---------- */
  const KEY = 'forja.v1';
  const OLD_PLAN = ['pdf', 'kb-full', 'pdf', 'db-upper', 'pdf', 'kb-abs-arms', 'rest'];
  const defaults = () => ({ plan: [...DEFAULT_PLAN], over: {}, hist: [], beep: true, voice: true, week: 1, done: {} });
  function load() {
    try {
      const j = JSON.parse(localStorage.getItem(KEY));
      const s = j ? Object.assign(defaults(), j) : defaults();
      if (!Array.isArray(s.plan) || s.plan.length !== 7) s.plan = [...DEFAULT_PLAN];
      // Migración: la rutina "pdf" de ejemplo ahora es el programa del PDF.
      if (s.plan.join() === OLD_PLAN.join()) s.plan = [...DEFAULT_PLAN];
      s.plan = s.plan.map((id) => (id === 'pdf' ? 'prog' : id));
      Object.keys(s.over).forEach((k) => { if (s.over[k] === 'pdf') s.over[k] = 'prog'; });
      if (!(s.week >= 1 && s.week <= PROGRAM.length)) s.week = 1;
      if (!s.done || typeof s.done !== 'object') s.done = {};
      return s;
    } catch (e) { return defaults(); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* sin almacenamiento */ } }
  const S = load();

  const ui = { tab: 'hoy', day: today(), goal: 'todas', lib: 'rutinas', exg: 'todos', cal: { y: new Date().getFullYear(), m: new Date().getMonth() }, confirmReset: false };

  /* ---------- Programa del PDF: sesiones ---------- */
  const uniqNames = (parts) => {
    const order = [];
    const cnt = {};
    parts.forEach((p) => { if (typeof p === 'string') { if (!cnt[p]) { cnt[p] = 0; order.push(p); } cnt[p]++; } });
    return order.map((id) => RT[id].name + (cnt[id] > 1 ? ` ×${cnt[id]}` : '')).join(' + ');
  };
  const pausesOf = (parts) => [...new Set(parts.filter((p) => typeof p === 'number'))];
  const pauseText = (parts) => {
    const ps = pausesOf(parts);
    const n = parts.filter((p) => typeof p === 'number').length;
    if (!ps.length) return '';
    return n === 1 ? ` · pausa de ${ps[0]} min` : ` · pausas de ${ps.join(' y ')} min`;
  };
  const SESS = PROGRAM.map((week) => week.map((d) => {
    if (typeof d === 'string') return { options: [{ parts: [d] }] };
    if (Array.isArray(d)) return { options: [{ parts: d }] };
    if (d.rest) return { n: d.n, rest: true };
    if (d.o) return { n: d.n, options: d.o.map((parts) => ({ parts, label: uniqNames(parts) })) };
    return { n: d.n, options: [{ parts: d.p }] };
  }));

  const sessCache = {};
  function buildSession(w, idx, opt) {
    opt = opt || 0;
    const id = `s:${w}:${idx}:${opt}`;
    if (sessCache[id]) return sessCache[id];
    const def = SESS[w - 1] && SESS[w - 1][idx];
    if (!def || def.rest) return null;
    const o = def.options[opt] || def.options[0];
    const multi = o.parts.filter((p) => typeof p === 'string').length > 1;
    const sections = [];
    const notes = [];
    o.parts.forEach((p) => {
      if (typeof p === 'number') {
        if (sections.length) sections[sections.length - 1] = Object.assign({}, sections[sections.length - 1], { pause: p * 60 });
        return;
      }
      const wk = RT[p];
      if (wk.note && !notes.includes(wk.note)) notes.push(wk.note);
      wk.sections.forEach((s) => {
        const title = multi ? (s.title === 'Máximo' ? wk.name : `${wk.name} · ${s.title}`) : s.title;
        sections.push(Object.assign({}, s, { title, pause: undefined }));
      });
    });
    const names = uniqNames(o.parts);
    const single = o.parts.length === 1;
    const r = {
      id, cat: 'mix', src: 'pdf', goal: 'cardio',
      name: def.n ? `${def.n} · ${names}` : names,
      tagline: single ? RT[o.parts[0]].tagline : `Sesión ${idx + 1} de la semana ${w}${pauseText(o.parts)}`,
      focus: ['Programa PDF', `Semana ${w}`],
      note: notes.join(' '),
      sess: { w, idx, opt },
      sections
    };
    sessCache[id] = r;
    return r;
  }
  function byId(id) {
    if (!id) return null;
    if (id.startsWith('s:')) { const [, w, i, o] = id.split(':').map(Number); return buildSession(w, i, o); }
    return RT[id] || null;
  }
  const sessKey = (w, i) => `${w}:${i}`;
  function nextSession(w) {
    const list = SESS[w - 1];
    for (let i = 0; i < list.length; i++) if (!list[i].rest && !S.done[sessKey(w, i)]) return i;
    return -1;
  }
  const weekCount = (w) => SESS[w - 1].filter((d) => !d.rest).length;
  const weekDone = (w) => SESS[w - 1].filter((d, i) => !d.rest && S.done[sessKey(w, i)]).length;

  const routineFor = (ds) => (S.over[ds] !== undefined ? S.over[ds] : S.plan[dow(parse(ds))]);
  // Resuelve un id del plan ('prog', 'rest' o una rutina) a la rutina que toca.
  function resolve(id) {
    if (id === 'rest') return null;
    if (id === 'prog') { const i = nextSession(S.week); return i < 0 ? null : buildSession(S.week, i, 0); }
    return byId(id);
  }
  const progFinished = (id) => id === 'prog' && nextSession(S.week) < 0;
  const histName = (h) => h.n || (byId(h.r) && byId(h.r).name) || 'Rutina';
  const histCat = (h) => h.c || (byId(h.r) && byId(h.r).cat) || null;

  /* ---------- Iconos ---------- */
  const PATHS = {
    today: '<rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 3v3M16 3v3"/>',
    list: '<path d="M4 6h16M4 12h16M4 18h10"/>',
    chart: '<path d="M5 20v-7M12 20V5M19 20v-10"/>',
    flag: '<path d="M5 21V4M5 4h12l-2.5 4L17 12H5"/>',
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
          const isReps = it.reps != null;
          steps.push({
            type: 'work', ex: it.ex, mode: isReps ? 'reps' : 'time', dur: it.work,
            reps: Array.isArray(it.reps) ? it.reps[round - 1] : it.reps, per: it.per, max: !!it.max,
            section: s.title, round, rounds: s.rounds, idx: ii + 1, count: s.items.length
          });
          const lastItem = ii === s.items.length - 1;
          const lastRound = round === s.rounds;
          const lastSection = si === r.sections.length - 1;
          if (!lastItem) { if (it.rest) steps.push({ type: 'rest', dur: it.rest }); }
          else if (!lastRound) { if (s.roundRest) steps.push({ type: 'rest', dur: s.roundRest }); }
          else if (!lastSection) steps.push({ type: 'rest', dur: s.pause || 20 });
        });
      }
    });
    steps.forEach((st, k) => {
      if (st.type === 'rest') st.next = steps.slice(k + 1).find((x) => x.type === 'work');
    });
    stepCache[r.id] = steps;
    return steps;
  }
  const repSecs = (s) => {
    if (s.per === 'km') return s.reps * 360;
    if (s.per === 'm') return s.reps * 0.36;
    return s.reps * (EX[s.ex].t || 4) * (s.per === 'por lado' ? 2 : 1);
  };
  const secsOf = (st) => (st.type === 'rest' ? st.dur : st.mode === 'reps' ? repSecs(st) : st.dur);
  const minutesOf = (r) => Math.max(1, Math.round(stepsOf(r).reduce((a, s) => a + secsOf(s), 0) / 60));
  const countOf = (r) => new Set(stepsOf(r).filter((s) => s.type === 'work').map((s) => s.ex)).size;
  const fmtSecs = (n) => (n >= 120 ? `${Math.round(n / 60)} min` : `${n} s`);
  function repsLabel(a) {
    if (!Array.isArray(a)) return String(a);
    const d = a.every((v, k) => k === 0 || v <= a[k - 1]);
    const u = a.every((v, k) => k === 0 || v >= a[k - 1]);
    if (d || u) return `${a[0]}→${a[a.length - 1]}`;
    return a.join('·');
  }
  function specOf(it) {
    if (it.max) return `${fmtSecs(it.work)} · máx`;
    if (it.reps != null) return Array.isArray(it.reps) ? repsLabel(it.reps) : `${it.reps} ${it.per || 'reps'}`;
    return `${it.work} s`;
  }

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

  function sectionsHTML(r) {
    return r.sections.map((s) => `
      <div class="blk">
        <div class="blk-h"><h3>${s.title}</h3>${s.rounds > 1 ? `<span>${s.rounds} rondas</span>` : ''}</div>
        <ul class="exgrid">${s.items.map((it) => {
          const e = EX[it.ex];
          return `<li><button class="excard" data-act="ex" data-ex="${it.ex}" data-cat="${r.cat}">
            <span class="excard-media">
              <span class="excard-stage fig" data-fig="${it.ex}" data-live></span>
              <span class="excard-s">${specOf(it)}</span>
            </span>
            <span class="excard-t"><b>${e.n}${it.max ? ' · MÁX' : ''}</b><small>${e.m.slice(0, 2).join(' · ')}</small></span>
          </button></li>`;
        }).join('')}</ul>
      </div>`).join('');
  }

  /* Ejercicios distintos de una rutina, sin el calentamiento, para mostrarlos como vista previa. */
  function showcase(r, max) {
    const main = r.sections.filter((s, i) => !(i === 0 && /calent/i.test(s.title) && r.sections.length > 1));
    const ids = [];
    main.forEach((s) => s.items.forEach((it) => { if (!ids.includes(it.ex)) ids.push(it.ex); }));
    return ids.slice(0, max);
  }

  function rcard(r) {
    const sc = showcase(r, 2);
    return `<button class="rcard cat-${r.cat}" data-act="detail" data-id="${r.id}">
      <span class="rcard-body">
        <span class="pill">${ic(CATS[r.cat].icon)} ${minutesOf(r)} min</span>
        <b class="rcard-name">${r.name}</b>
        <span class="rcard-tag">${r.tagline}</span>
        <span class="rcard-meta">${GOALS[r.goal] || ''} · ${ejN(countOf(r))}</span>
      </span>
      <span class="rcard-art" aria-hidden="true">
        <span class="disc d1 fig" data-fig="${sc[0]}" data-live></span>
        ${sc[1] ? `<span class="disc d2 fig" data-fig="${sc[1]}" data-live></span>` : ''}
      </span>
    </button>`;
  }

  // Sesiones cortas del PDF: se sugiere sumar un full body con pesa rusa.
  const PLUS = ['kb-express', 'kb-full'];
  const isShort = (r) => !!r && r.src === 'pdf' && minutesOf(r) < 25;

  function viewHoy() {
    const t = today();
    const week = weekOf(t);
    const sel = ui.day;
    const rid = routineFor(sel);
    const r = resolve(rid);
    const doneSel = S.hist.some((h) => h.d === sel);
    const ws = weekStats();

    const strip = week.map((ds, i) => {
      const id = routineFor(ds);
      const rr = id === 'prog' ? { cat: 'mix', name: 'programa' } : resolve(id);
      const isDone = S.hist.some((h) => h.d === ds);
      const n = parse(ds).getDate();
      return `<button class="day ${ds === sel ? 'is-sel' : ''} ${ds === t ? 'is-today' : ''}" data-act="pick-day" data-day="${ds}"
        aria-pressed="${ds === sel}" aria-label="${DAYS_L[i]} ${n}: ${rr ? rr.name : 'descanso'}${isDone ? ', hecha' : ''}">
        <span class="day-l">${DAYS_S[i]}</span><span class="day-n">${n}</span>
        <span class="day-dot ${rr ? 'cat-' + rr.cat : 'is-rest'} ${isDone ? 'is-done' : ''}">${isDone ? ic('check') : ''}</span>
      </button>`;
    }).join('');

    const stage = (list) => `<div class="hero-stage">
        <div class="stage-fig fig" id="hero-fig" data-list="${list.join(',')}" role="img" aria-label="Vista previa de los ejercicios"></div>
        <span class="stage-tag" id="hero-tag"></span>
        <span class="stage-dots" id="hero-dots" aria-hidden="true">${list.map(() => '<i></i>').join('')}</span>
      </div>`;
    let hero;
    if (r) {
      const isProg = rid === 'prog';
      hero = `<section class="hero cat-${r.cat}">
        ${stage(showcase(r, 6))}
        <div class="hero-body">
          <div class="hero-top"><span class="pill">${isProg ? `Programa · semana ${S.week}` : CATS[r.cat].label}</span>${r.goal ? `<span class="pill">${GOALS[r.goal]}</span>` : ''}${doneSel ? `<span class="pill">${ic('check')} Hecha</span>` : ''}</div>
          <h1 class="h-display hero-title ${r.name.length > 22 ? 'is-long' : ''}">${r.name}</h1>
          <p class="hero-tag">${r.tagline}</p>
          <ul class="hero-meta">
            <li>${ic('clock')} ${minutesOf(r)} min</li>
            <li>${ic('list')} ${ejN(countOf(r))}</li>
          </ul>
          <button class="btn-cta" data-act="start" data-id="${r.id}">${ic('play')} ${doneSel ? 'Repetir' : 'Empezar'}</button>
        </div>
      </section>`;
    } else if (progFinished(rid)) {
      const last = S.week >= PROGRAM.length;
      hero = `<section class="hero cat-mix">
        ${stage(showcase(RT.aphrodite, 3))}
        <div class="hero-body">
          <div class="hero-top"><span class="pill">Programa · semana ${S.week}</span></div>
          <h1 class="h-display hero-title">Semana completa</h1>
          <p class="hero-tag">${last ? 'Terminaste las 15 semanas del programa.' : `Hiciste las ${weekCount(S.week)} sesiones de la semana ${S.week}. Pasa a la siguiente cuando quieras.`}</p>
          ${last ? '' : `<button class="btn-cta" data-act="week-go" data-d="1">${ic('play')} Ir a la semana ${S.week + 1}</button>`}
        </div>
      </section>`;
    } else {
      hero = `<section class="hero is-rest cat-mob">
        ${stage(showcase(RT.mov, 6))}
        <div class="hero-body">
          <div class="hero-top"><span class="pill">Descanso</span></div>
          <h1 class="h-display hero-title">Día libre</h1>
          <p class="hero-tag">Recuperar también es entrenar. Si quieres moverte, haz movilidad suave.</p>
          <button class="btn-cta" data-act="start" data-id="mov">${ic('stretch')} Movilidad · ${minutesOf(RT.mov)} min</button>
        </div>
      </section>`;
    }

    const ws2 = `<section class="stats" aria-label="Resumen">
      <div class="stat"><span class="stat-n">${streak()}</span><span class="stat-l">${ic('flame')} Racha</span></div>
      <div class="stat"><span class="stat-n">${ws.n}</span><span class="stat-l">Esta semana</span></div>
      <div class="stat"><span class="stat-n">${ws.min}</span><span class="stat-l">Minutos</span></div>
    </section>`;

    return `
      <header class="top">
        <span class="brand"><span class="brand-mark">${ic('kettlebell')}</span>Forja</span>
        <span class="top-date">${cap(longDate(new Date()))}</span>
      </header>
      <nav class="week" aria-label="Semana">${strip}</nav>
      ${hero}
      <button class="btn-ghost block" data-act="change">Cambiar rutina de este día</button>
      ${ws2}
      ${isShort(r) ? `<section class="grp"><h2 class="h-sec">Súmale full body</h2><p class="muted">La sesión del PDF de hoy dura ${minutesOf(r)} min. Complétala con pesa rusa.</p>${PLUS.map((id) => rcard(RT[id])).join('')}</section>` : ''}
      ${r ? `<section class="grp cat-${r.cat}"><h2 class="h-sec">Ejercicios de hoy</h2>${sectionsHTML(r)}</section>` : ''}`;
  }

  function libSwitch() {
    const b = (v, label) => `<button class="seg-b ${ui.lib === v ? 'is-on' : ''}" data-act="lib" data-v="${v}" aria-pressed="${ui.lib === v}">${label}</button>`;
    return `<div class="seg" role="group" aria-label="Ver">${b('rutinas', `Rutinas <i>${ROUTINES.length}</i>`)}${b('ejercicios', `Ejercicios <i>${Object.keys(EX).length}</i>`)}</div>`;
  }

  function viewEjercicios() {
    const gs = ['todos', ...EXGROUPS.map((g) => g.id)];
    const chips = gs.map((g) => `<button class="gchip ${ui.exg === g ? 'is-on' : ''}" data-act="exg" data-g="${g}" aria-pressed="${ui.exg === g}">${g === 'todos' ? 'Todos' : EXGROUPS.find((x) => x.id === g).label}</button>`).join('');
    const groups = EXGROUPS.filter((g) => ui.exg === 'todos' || ui.exg === g.id).map((g) => {
      const ids = Object.keys(EX).filter((id) => EX[id].g === g.id);
      return `<section class="grp cat-${g.cat}"><h2 class="h-sec">${g.label} <span class="h-n">${ids.length}</span></h2><ul class="exgrid">${ids.map((id) => {
        const e = EX[id];
        return `<li><button class="excard" data-act="ex" data-ex="${id}" data-cat="${g.cat}">
          <span class="excard-media">
            <span class="excard-stage fig" data-fig="${id}" data-live></span>
            ${e.floor ? '<span class="excard-s">Suelo</span>' : ''}
          </span>
          <span class="excard-t"><b>${e.n}</b><small>${e.m.slice(0, 2).join(' · ')}</small></span>
        </button></li>`;
      }).join('')}</ul></section>`;
    }).join('');
    return `
      <header class="top"><div><h1 class="h-display page-title">Ejercicios</h1><p class="page-sub">Toca uno para ver cómo se hace.</p></div></header>
      ${libSwitch()}
      <div class="gchips" role="group" aria-label="Material">${chips}</div>
      ${groups}`;
  }

  function viewRutinas() {
    if (ui.lib === 'ejercicios') return viewEjercicios();
    const goals = ['todas', 'volumen', 'cardio', 'fuerza', 'core', 'mov'];
    const chips = goals.map((g) => `<button class="gchip ${ui.goal === g ? 'is-on' : ''}" data-act="goal" data-g="${g}" aria-pressed="${ui.goal === g}">${g === 'todas' ? 'Todas' : GOALS[g]}</button>`).join('');
    const groups = Object.keys(CATS).map((c) => {
      const rs = ROUTINES.filter((r) => r.cat === c && (ui.goal === 'todas' || r.goal === ui.goal));
      if (!rs.length) return '';
      return `<section class="grp"><h2 class="h-sec">${CATS[c].label}${c === 'mix' ? ' · entrenamientos del PDF' : ''}</h2>${rs.map(rcard).join('')}</section>`;
    }).join('');

    const opt = (id, label, cur) => `<option value="${id}" ${cur === id ? 'selected' : ''}>${label}</option>`;
    const plan = DAYS_L.map((d, k) => `
      <label class="plan-row" for="plan-${k}"><span>${d}</span>
        <select id="plan-${k}" data-plan="${k}">
          ${opt('rest', 'Descanso', S.plan[k])}
          ${opt('prog', 'Programa del PDF (siguiente sesión)', S.plan[k])}
          ${Object.keys(CATS).map((c) => `<optgroup label="${CATS[c].label}">${ROUTINES.filter((r) => r.cat === c).map((r) => opt(r.id, r.name, S.plan[k])).join('')}</optgroup>`).join('')}
        </select>
      </label>`).join('');

    return `
      <header class="top"><div><h1 class="h-display page-title">Rutinas</h1><p class="page-sub">Toca una para ver cada ejercicio.</p></div></header>
      ${libSwitch()}
      <div class="gchips" role="group" aria-label="Objetivo">${chips}</div>
      ${groups || '<p class="empty">No hay rutinas con ese objetivo.</p>'}
      <section class="grp">
        <h2 class="h-sec">Plan semanal</h2>
        <p class="muted">Elige qué toca cada día. Se guarda en este dispositivo.</p>
        <div class="plan">${plan}</div>
      </section>`;
  }

  function viewPrograma() {
    const w = S.week;
    const total = weekCount(w);
    const done = weekDone(w);
    const pct = total ? Math.round((done / total) * 100) : 0;
    const rows = SESS[w - 1].map((d, i) => {
      if (d.rest) return `<li class="sess-row is-rest"><span class="sess-n">${ic('rest')}</span><span class="sess-t"><b>${d.n}</b><small>Descanso</small></span></li>`;
      const isDone = !!S.done[sessKey(w, i)];
      const r = buildSession(w, i, 0);
      const multi = d.options.length > 1;
      const pn = d.options[0].parts.filter((p) => typeof p === 'string');
      const sub = multi ? 'Elige una opción' : (pn.length === 1 ? RT[pn[0]].tagline : `${pn.length} tandas${pauseText(d.options[0].parts)}`);
      const title = multi ? `${d.n} · ${d.options.map((o) => o.label).join(' o ')}` : (d.n ? `${d.n} · ${r.name.split(' · ').slice(1).join(' · ') || r.name}` : r.name);
      const side = isDone ? `<span class="sess-s is-done">${ic('check')}</span>` : `<span class="sess-s">${multi ? '' : minutesOf(r) + ' min'}</span>`;
      const main = multi ? 'div' : 'button';
      return `<li class="sess-row ${isDone ? 'is-done' : ''}">
        <${main} class="sess-main" ${multi ? '' : `data-act="sess" data-w="${w}" data-i="${i}" data-o="0"`}>
          <span class="sess-n">${isDone ? ic('check') : i + 1}</span>
          <span class="sess-t"><b>${title}</b><small>${sub}</small></span>
          ${side}
        </${main}>
        ${multi ? `<div class="sess-opts">${d.options.map((o, k) => `<button class="gchip" data-act="sess" data-w="${w}" data-i="${i}" data-o="${k}">${o.label} · ${minutesOf(buildSession(w, i, k))} min</button>`).join('')}</div>` : ''}
      </li>`;
    }).join('');

    const complete = total && done === total;
    return `
      <header class="top"><div><h1 class="h-display page-title">Programa</h1><p class="page-sub">15 semanas, con tus entrenamientos del PDF.</p></div></header>
      <section class="wkhead cat-mix">
        <button class="wk-btn" data-act="week-go" data-d="-1" aria-label="Semana anterior" ${w <= 1 ? 'disabled' : ''}>${ic('left')}</button>
        <div class="wkhead-c">
          <span class="eyebrow">Semana</span>
          <b class="wkhead-n">${w}<small>/${PROGRAM.length}</small></b>
          ${PROGRAM_NAMES[w - 1] ? `<span class="wkhead-name">${PROGRAM_NAMES[w - 1]}</span>` : ''}
        </div>
        <button class="wk-btn" data-act="week-go" data-d="1" aria-label="Semana siguiente" ${w >= PROGRAM.length ? 'disabled' : ''}>${ic('chevron')}</button>
        <div class="wkhead-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div>
        <p class="wkhead-sub">${done} de ${total} sesiones hechas</p>
      </section>
      <section class="grp cat-mix">
        <h2 class="h-sec">Sesiones de la semana</h2>
        <ul class="sess">${rows}</ul>
        ${complete && w < PROGRAM.length ? `<button class="btn-cta solid" data-act="week-go" data-d="1">${ic('play')} Ir a la semana ${w + 1}</button>` : ''}
        <p class="muted">En el plan semanal, los días con "Programa del PDF" toman la siguiente sesión pendiente de esta semana.</p>
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
      const cats = [...new Set(S.hist.filter((h) => h.d === ds).map(histCat).filter(Boolean))];
      cells += `<span class="cal-d ${ds === t ? 'is-today' : ''} ${cats.length ? 'has' : ''}"><span>${d}</span><i class="dots">${cats.map((c) => `<b class="cat-${c}"></b>`).join('')}</i></span>`;
    }
    const recent = [...S.hist].sort((a, b) => b.t - a.t).slice(0, 12);
    const effort = ['', 'Suave', 'Bien', 'Duro'];
    const list = recent.length
      ? recent.map((h) => {
          const c = histCat(h);
          const d = parse(h.d);
          return `<li class="hist-row ${c ? 'cat-' + c : ''}"><span class="hist-ic">${ic(c ? CATS[c].icon : 'check')}</span>
            <span class="hist-t"><b>${histName(h)}</b><small>${c ? CATS[c].label : ''}</small></span>
            <span class="hist-m">${DAYS_3[dow(d)]} ${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}<small>${h.m} min${h.e ? ' · ' + effort[h.e] : ''}</small></span></li>`;
        }).join('')
      : `<li class="empty">Aún no hay sesiones. Cuando termines una rutina aparecerá aquí.</li>`;

    const wk = weekOf(t).map((ds, i) => {
      const hs = S.hist.filter((h) => h.d === ds);
      return { ds, i, m: hs.reduce((a, h) => a + h.m, 0), cat: hs.length ? histCat(hs[hs.length - 1]) : null };
    });
    const maxM = Math.max(30, ...wk.map((x) => x.m));
    const wkMin = wk.reduce((a, x) => a + x.m, 0);
    const bars = wk.map((x) => `<div class="wk-col ${x.ds === t ? 'is-today' : ''}">
        <i class="wk-bar ${x.cat ? 'cat-' + x.cat : 'is-empty'}" style="height:${x.m ? Math.max(8, Math.round((x.m / maxM) * 100)) : 0}%" title="${x.m} min"></i>
        <span class="wk-l">${DAYS_S[x.i]}</span></div>`).join('');

    return `
      <header class="top"><h1 class="h-display page-title">Progreso</h1></header>
      <section class="stats" aria-label="Totales">
        <div class="stat"><span class="stat-n">${streak()}</span><span class="stat-l">${ic('flame')} Racha</span></div>
        <div class="stat"><span class="stat-n">${S.hist.length}</span><span class="stat-l">Sesiones</span></div>
        <div class="stat"><span class="stat-n">${total}</span><span class="stat-l">Minutos</span></div>
      </section>
      <section class="wk" aria-label="Minutos de esta semana">
        <div class="wk-head"><b>Esta semana</b><small>${wkMin} min</small></div>
        <div class="wk-bars">${bars}</div>
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
        ? `<p class="muted">Se borrará todo el historial y el avance del programa en este dispositivo.</p><div class="row"><button class="btn-ghost" data-act="reset-cancel">Cancelar</button><button class="btn-danger" data-act="reset-ok">Borrar todo</button></div>`
        : `<button class="btn-ghost block" data-act="reset">Borrar historial</button>`}</section>` : ''}`;
  }

  const TABS = { hoy: ['today', 'Hoy'], rutinas: ['list', 'Rutinas'], programa: ['flag', 'Programa'], progreso: ['chart', 'Progreso'] };
  function render() {
    view.innerHTML = { hoy: viewHoy, rutinas: viewRutinas, programa: viewPrograma, progreso: viewProgreso }[ui.tab]();
    document.querySelectorAll('.tab').forEach((b) => {
      const [icon, label] = TABS[b.dataset.tab];
      const on = b.dataset.tab === ui.tab;
      b.innerHTML = `${ic(icon)}<span>${label}</span>`;
      b.classList.toggle('is-on', on);
      if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
    });
    FIG.hydrate(view);
    startRotor();
  }

  /* Vista previa de la portada: va pasando por los ejercicios de la rutina. */
  let rotor = null;
  function stopRotor() { clearInterval(rotor); rotor = null; }
  function startRotor() {
    stopRotor();
    const host = $('#hero-fig');
    if (!host || P) return;
    const list = host.dataset.list.split(',').filter(Boolean);
    if (!list.length) return;
    const tag = $('#hero-tag');
    const dots = document.querySelectorAll('#hero-dots i');
    let k = 0;
    const show = () => {
      const id = list[k % list.length];
      FIG.mount(host, id, { animate: true });
      host.style.animation = 'none';
      void host.offsetWidth;
      host.style.animation = '';
      tag.textContent = EX[id].n;
      dots.forEach((d, j) => d.classList.toggle('on', j === k % list.length));
      k++;
    };
    show();
    if (list.length > 1) rotor = setInterval(show, 3600);
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
    const r = byId(id);
    if (!r) return;
    const exs = [...new Set(r.sections.flatMap((s) => s.items.map((it) => it.ex)))];
    const floor = exs.some((e) => EX[e].floor);
    const gear = [...new Set(exs.map((e) => EX[e].gear).filter(Boolean))];
    const notes = [];
    if (r.template) notes.push('Esta es una rutina de ejemplo.');
    if (r.note) notes.push(r.note);
    if (gear.length) notes.push(`Necesitas: ${gear.join(', ').toLowerCase()}.`);
    if (floor) notes.push('Incluye ejercicios en el suelo.');
    openSheet(`
      <button class="sheet-x" data-act="close-sheet" aria-label="Cerrar">${ic('close')}</button>
      <div class="sheet-body">
        <p class="eyebrow">${r.sess ? `Programa · semana ${r.sess.w}` : CATS[r.cat].label}</p>
        <h2 class="h-display sheet-title ${r.name.length > 22 ? 'is-long' : ''}">${r.name}</h2>
        <p class="sheet-sub">${r.tagline}</p>
        <div class="chips">${r.focus.map((f) => `<span class="chip">${f}</span>`).join('')}</div>
        <ul class="hero-meta flat"><li>${ic('clock')} ${minutesOf(r)} min</li><li>${ic('list')} ${ejN(countOf(r))}</li></ul>
        ${notes.length ? `<p class="note">${notes.join(' ')}</p>` : ''}
        ${sectionsHTML(r)}
      </div>
      <div class="sheet-cta"><button class="btn-cta solid" data-act="start" data-id="${r.id}">${ic('play')} Empezar</button></div>`, r.cat);
  }
  function exSheet(id, cat) {
    const e = EX[id];
    const tags = [...e.m, ...(e.floor ? ['En el suelo'] : []), ...(e.gear ? [e.gear] : [])];
    openSheet(`
      <button class="sheet-x" data-act="close-sheet" aria-label="Cerrar">${ic('close')}</button>
      <div class="sheet-body">
        <p class="eyebrow">Ejercicio</p>
        <h2 class="h-display sheet-title">${e.n}</h2>
        <div class="xstage"><div class="xfig fig" data-fig="${id}" data-animate data-trace role="img" aria-label="Demostración de ${e.n}"></div></div>
        <div class="frames">
          <figure class="frame"><div class="frame-fig fig" data-fig="${id}" data-frame="0" data-nophoto role="img" aria-label="Postura inicial"></div><figcaption><i>1</i>Inicio</figcaption></figure>
          <figure class="frame"><div class="frame-fig fig" data-fig="${id}" data-frame="end" data-nophoto role="img" aria-label="Postura final"></div><figcaption><i>2</i>Final</figcaption></figure>
        </div>
        <div class="chips">${tags.map((x) => `<span class="chip">${x}</span>`).join('')}</div>
        <h3 class="h-sec">Cómo se hace</h3>
        <p class="sheet-cue">${e.c}</p>
      </div>`, cat);
  }
  function changeSheet() {
    const ds = ui.day;
    const cur = routineFor(ds);
    const opts = [
      { id: 'prog', name: 'Programa del PDF', cat: 'mix', sub: `Semana ${S.week} · siguiente sesión` },
      ...ROUTINES.filter((r) => !r.src).map((r) => ({ id: r.id, name: r.name, cat: r.cat, sub: `${CATS[r.cat].label} · ${GOALS[r.goal]} · ${minutesOf(r)} min` })),
      ...ROUTINES.filter((r) => r.src).map((r) => ({ id: r.id, name: r.name, cat: r.cat, sub: `Entrenamiento del PDF · ${minutesOf(r)} min` })),
      { id: 'rest', name: 'Descanso', cat: 'mob', sub: 'Sin entrenamiento' }
    ];
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
  const C = 2 * Math.PI * 96;

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
          <div class="dial">
            <svg class="dial-ring" viewBox="0 0 200 200" aria-hidden="true">
              <circle class="ring-track" cx="100" cy="100" r="96"/>
              <circle class="ring-prog" id="ring-prog" cx="100" cy="100" r="96" transform="rotate(-90 100 100)"/>
            </svg>
            <div class="dial-fig fig" id="pl-fig" role="img" aria-label="Demostración del ejercicio"></div>
            <div class="dial-time"><span class="ring-n" id="pl-time"></span><span class="ring-u" id="pl-unit"></span></div>
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
    const r = byId(id);
    if (!r) return;
    closeSheet();
    stopRotor();
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

  function setTime(secs) {
    $('#pl-time').textContent = clock(secs);
    $('#pl-unit').textContent = secs >= 60 ? 'min' : 'seg';
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
    $('#pl-phase').textContent = rest ? (s.dur >= 120 ? 'Pausa' : 'Descanso') : s.max ? 'Máximo' : reps ? 'Repeticiones' : 'Trabajo';
    $('#pl-sec').textContent = `${w.section}${w.rounds > 1 ? ` · Ronda ${w.round}/${w.rounds}` : ''} · ${w.idx}/${w.count}`;
    $('#pl-name').textContent = ex.n + (w.max ? ' · MÁX' : '');
    $('#pl-cue').textContent = w.max ? 'Tantas repeticiones como puedas, sin parar, hasta que se acabe el tiempo.' : ex.c;
    FIG.mount($('#pl-fig'), w.ex, { animate: true, trace: true });
    $('#pl-m').innerHTML = [...ex.m, ...(ex.floor ? ['En el suelo'] : []), ...(ex.gear ? [ex.gear] : [])].map((m) => `<span class="chip">${m}</span>`).join('');
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
      setTime(s.dur);
    }
    if (rest) { tone(440, 0.18); say(`${s.dur >= 120 ? 'Pausa' : 'Descanso'}. Sigue ${ex.n}`); }
    else { tone(1046, 0.14); tone(1568, 0.16, 0.12); say(reps ? `${ex.n}. ${s.reps} ${s.per === 'km' ? 'kilómetro' + (s.reps > 1 ? 's' : '') : s.per === 'm' ? 'metros' : s.per || 'repeticiones'}` : ex.n + (s.max ? '. Máximo' : '')); }
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
      setTime(secs);
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
    const r = P.r;
    const entry = { d: today(), r: r.id, n: r.name, c: r.cat, m: Math.max(1, Math.round(active / 60000)), e: 0, t: Date.now() };
    S.hist.push(entry);
    if (r.sess) S.done[sessKey(r.sess.w, r.sess.idx)] = entry.d;
    save();
    P.entry = entry;
    [523, 659, 784, 1046].forEach((f, k) => tone(f, 0.22, k * 0.14));
    say('Rutina completa. Buen trabajo');
    buzz([120, 80, 120, 80, 200]);
    const n = countOf(r);
    $('#player').innerHTML = `<div class="pl cat-${r.cat} is-final"><div class="pl-in pl-fin">
      <svg class="fin-check" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52"/><path d="M36 62l16 16 32-34"/></svg>
      <h1 class="h-display fin-title">Rutina completa</h1>
      <p class="fin-sub">${r.name}</p>
      <div class="fin-stats">
        <div><b>${entry.m}</b><span>min</span></div>
        <div><b>${n}</b><span>ejercicios</span></div>
        <div><b>${streak()}</b><span>racha</span></div>
      </div>
      <p class="fin-q">¿Cómo estuvo?</p>
      <div class="fin-eff" role="group" aria-label="Esfuerzo">
        ${[[1, 'Suave'], [2, 'Bien'], [3, 'Duro']].map(([v, l]) => `<button data-act="effort" data-v="${v}" aria-pressed="false">${l}</button>`).join('')}
      </div>
      ${isShort(r) ? `<button class="pl-more" data-act="start" data-id="${PLUS[0]}">${ic('play')} Seguir con full body · ${minutesOf(RT[PLUS[0]])} min</button>` : ''}
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
    sess(b) { detailSheet(`s:${b.dataset.w}:${b.dataset.i}:${b.dataset.o}`); },
    ex(b) { exSheet(b.dataset.ex, b.dataset.cat); },
    change() { changeSheet(); },
    goal(b) { ui.goal = b.dataset.g; render(); },
    lib(b) { ui.lib = b.dataset.v; render(); },
    exg(b) { ui.exg = b.dataset.g; render(); },
    'week-go'(b) { S.week = Math.max(1, Math.min(PROGRAM.length, S.week + Number(b.dataset.d))); save(); render(); window.scrollTo(0, 0); },
    'set-over'(b) { S.over[ui.day] = b.dataset.id; save(); closeSheet(); render(); },
    'clear-over'() { delete S.over[ui.day]; save(); closeSheet(); render(); },
    'close-sheet'() { closeSheet(); },
    'cal-prev'() { ui.cal.m--; if (ui.cal.m < 0) { ui.cal.m = 11; ui.cal.y--; } render(); },
    'cal-next'() { ui.cal.m++; if (ui.cal.m > 11) { ui.cal.m = 0; ui.cal.y++; } render(); },
    reset() { ui.confirmReset = true; render(); },
    'reset-cancel'() { ui.confirmReset = false; render(); },
    'reset-ok'() { S.hist = []; S.done = {}; S.week = 1; save(); ui.confirmReset = false; render(); toast('Historial borrado'); },

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
    if (!b || b.disabled) return;
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
