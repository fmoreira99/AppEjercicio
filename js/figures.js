/*
  Figuras animadas de referencia para cada ejercicio.
  Cada figura es un muñeco de líneas con 2 o más posturas que se interpolan.

  Ángulos: 0 = hacia abajo, 90 = hacia adelante (derecha en pantalla), 180 = hacia arriba.
  Torso `t`: 0 = vertical, positivo = inclinado hacia adelante.
  Vista `side`: de perfil mirando a la derecha. Vista `front`: de frente.
  Poses: hx/hy cadera · t torso · h cabeza · a/a2 brazo [arriba, antebrazo] · f/fy tobillos x/y ·
         bd dirección de la pesa · tl largo de torso (de frente) · sx/ux giro de torso (de frente).
*/
(function () {
  'use strict';

  const G = 88;
  const NS = 'http://www.w3.org/2000/svg';
  const rad = (d) => (d * Math.PI) / 180;
  const dir = (a) => [Math.sin(rad(a)), Math.cos(rad(a))];
  const mix = (a, b, k) => a + (b - a) * k;
  const r1 = (n) => Math.round(n * 10) / 10;

  const DEF = { hx: 50, hy: null, dy: 0, t: 0, h: 0, a: [0, 0], a2: null, f: [50, 50], fy: [G, G], kb: 1, tl: 1, sx: 1, ux: 0, bd: null };

  const W = [57, 43]; // pies al ancho de hombros, de frente
  const KB = { k: 'kb', g: 'both' };
  const DB2 = { k: 'db2', g: 'both' };

  const FIGS = {
    // Calentamiento y movilidad
    brazos: { view: 'front', loop: 'cycle', T: 0.55, poses: [{ a: [88, 88], f: W }, { a: [165, 165], f: W }, { a: [88, 88], f: W }, { a: [10, 10], f: W }] },
    cadera: { view: 'front', T: 0.8, poses: [{ hx: 44, hy: 51, t: 10, a: [35, -40], f: [58, 42] }, { hx: 50, hy: 51, t: 0, a: [35, -40], f: [58, 42] }, { hx: 56, hy: 51, t: -10, a: [35, -40], f: [58, 42] }] },
    marcha: { view: 'side', T: 0.45, poses: [
      { f: [58, 50], fy: [74, G], a: [-35, -10], a2: [45, 110] },
      { f: [50, 58], fy: [G, 74], a: [45, 110], a2: [-35, -10] }] },
    aire: { view: 'side', poses: [{ a: [15, 15] }, { hx: 38, hy: 65, t: 35, a: [90, 90] }] },
    torso: { view: 'front', loop: 'cycle', T: 0.6, poses: [
      { a: [85, 85], f: [57, 43] }, { a: [85, 85], f: [57, 43], sx: 0.4, ux: -4 },
      { a: [85, 85], f: [57, 43] }, { a: [85, 85], f: [57, 43], sx: 0.4, ux: 4 }] },
    bisagra: { view: 'side', poses: [{ a: [0, 0] }, { hx: 38, hy: 52, t: 70, a: [0, 0] }] },
    halo: { view: 'front', T: 1.0, prop: KB, poses: [{ a: [25, 210], f: W, bd: 0 }, { a: [150, 205], f: W, bd: 180 }] },
    quad: { view: 'side', poses: [{ a: [0, 0] }, { a: [-12, -14], f: [44, 50], fy: [52, G] }] },
    isquios: { view: 'side', poses: [{ a: [0, 0] }, { hx: 46, t: 55, a: [12, 12], f: [62, 46] }] },
    pecho: { view: 'side', poses: [{ a: [0, 0] }, { t: -4, h: -8, a: [-55, -60] }] },
    triest: { view: 'side', poses: [{ a: [0, 0] }, { a: [170, -20], a2: [0, 0] }] },
    lateral: { view: 'front', poses: [{ a: [175, 175], a2: [-5, -5], f: W }, { t: -22, a: [205, 205], a2: [-5, -5], f: W }] },

    // Cardio de pie
    jacks: { view: 'front', T: 0.45, poses: [{ a: [12, 12], f: [53, 47] }, { a: [160, 165], f: [68, 32] }] },
    rodillas: { view: 'side', T: 0.35, poses: [
      { f: [62, 50], fy: [66, G], a: [-45, -10], a2: [50, 115] },
      { f: [50, 62], fy: [G, 66], a: [50, 115], a2: [-45, -10] }] },
    patinador: { view: 'front', T: 0.5, poses: [
      { hx: 58, hy: 58, t: 14, f: [60, 47], fy: [G, 78], a: [40, 30], a2: [-70, -100] },
      { hx: 42, hy: 58, t: -14, f: [53, 40], fy: [78, G], a: [70, 100], a2: [-40, -30] }] },
    sqjump: { view: 'side', T: 0.55, poses: [{ hx: 38, hy: 66, t: 35, a: [-45, -45] }, { hy: 40.5, fy: [80, 80], a: [170, 170] }] },
    boxeo: { view: 'side', T: 0.35, poses: [
      { hy: 53, t: 8, f: [44, 60], a: [88, 88], a2: [45, 170] },
      { hy: 53, t: 8, f: [44, 60], a: [45, 170], a2: [88, 88] }] },
    kneecrunch: { view: 'side', T: 0.6, poses: [
      { a: [130, 254] },
      { t: 22, a: [45, 250], f: [56, 50], fy: [70, G] }] },

    // Pesa rusa
    swing: { view: 'side', T: 0.7, prop: KB, poses: [{ hx: 36, hy: 54, t: 60, a: [-25, -25] }, { t: -3, a: [88, 88] }] },
    swing1: { view: 'side', T: 0.7, prop: { k: 'kb', g: 'near' }, poses: [{ hx: 36, hy: 54, t: 60, a: [-25, -25], a2: [40, 40] }, { t: -3, a: [88, 88], a2: [40, 40] }] },
    goblet: { view: 'side', prop: KB, poses: [{ a: [10, 200], bd: 0 }, { hx: 38, hy: 65, t: 30, a: [30, 200], bd: 0 }] },
    cleanpress: { view: 'side', T: 0.75, prop: { k: 'kb', g: 'near' }, poses: [
      { hx: 42, hy: 52, t: 25, a: [2, 2], a2: [40, 40] },
      { a: [10, 200], a2: [40, 40] },
      { a: [178, 178], a2: [40, 40] }] },
    woodchop: { view: 'front', T: 0.8, prop: KB, poses: [
      { hy: 54, t: -8, f: [62, 38], a: [-15, -30], a2: [-30, -35] },
      { hy: 54, t: 8, f: [62, 38], a: [125, 150], a2: [140, 155] }] },
    thruster: { view: 'side', T: 0.8, prop: KB, poses: [{ hx: 38, hy: 65, t: 30, a: [30, 200], bd: 0 }, { a: [175, 178], bd: 180 }] },
    highpull: { view: 'side', T: 0.7, prop: KB, poses: [{ hx: 44, hy: 51, t: 25, a: [8, 8] }, { t: -3, a: [110, 20], bd: 0 }] },
    curl: { view: 'side', prop: KB, poses: [{ a: [0, 0], bd: 0 }, { a: [5, 170], bd: 0 }] },
    triext: { view: 'side', prop: KB, poses: [{ a: [170, -15], bd: 0 }, { a: [178, 178], bd: 0 }] },
    marchapesa: { view: 'side', T: 0.5, prop: { k: 'kb', g: 'near' }, poses: [
      { f: [60, 50], fy: [70, G], a: [10, 200], a2: [-30, -30] },
      { f: [50, 60], fy: [G, 70], a: [10, 200], a2: [-30, -30] }] },
    ocho: { view: 'front', T: 0.8, prop: KB, poses: [
      { hy: 56, tl: 0.6, f: [64, 36], a: [18, 20], a2: [30, 28] },
      { hy: 56, tl: 0.6, f: [64, 36], a: [-30, -28], a2: [-18, -20] }] },
    giro: { view: 'front', loop: 'cycle', T: 0.6, prop: KB, poses: [
      { a: [25, 210], f: W, bd: 0 }, { a: [25, 210], f: W, bd: 0, sx: 0.45, ux: -5 },
      { a: [25, 210], f: W, bd: 0 }, { a: [25, 210], f: W, bd: 0, sx: 0.45, ux: 5 }] },
    pressoh: { view: 'side', T: 0.8, prop: { k: 'kb', g: 'near' }, poses: [{ a: [10, 200], a2: [40, 40] }, { a: [178, 178], a2: [40, 40] }] },

    // Mancuernas
    dpress: { view: 'front', T: 0.8, prop: DB2, poses: [{ a: [70, 180], f: W }, { a: [172, 178], f: W }] },
    dremo: { view: 'side', prop: DB2, poses: [{ hx: 40, hy: 52, t: 65, a: [0, 0] }, { hx: 40, hy: 52, t: 65, a: [-60, -5] }] },
    dgoblet: { view: 'side', prop: { k: 'db1', g: 'both' }, poses: [{ a: [10, 200], bd: 0 }, { hx: 38, hy: 65, t: 30, a: [30, 200], bd: 0 }] },
    drdl: { view: 'side', prop: DB2, poses: [{ a: [3, 3] }, { hx: 40, hy: 52, t: 70, a: [0, 0] }] },
    drev: { view: 'side', prop: DB2, poses: [{ a: [3, 3] }, { hx: 47, hy: 64, t: 5, f: [58, 28], fy: [G, 84], a: [0, 0] }] },
    dlat: { view: 'front', prop: DB2, poses: [{ a: [10, 10], f: W }, { a: [86, 88], f: W }] },
    dfly: { view: 'front', prop: DB2, poses: [{ hy: 56, tl: 0.45, a: [0, 0], f: W }, { hy: 56, tl: 0.45, a: [86, 86], f: W }] },
    dhammer: { view: 'side', prop: DB2, dbx: true, poses: [{ a: [0, 0] }, { a: [5, 170] }] },
    dtri: { view: 'side', prop: { k: 'db1', g: 'both' }, poses: [{ a: [170, -15], bd: 0 }, { a: [178, 178], bd: 0 }] },
    dsumo: { view: 'front', prop: { k: 'db1', g: 'both' }, poses: [{ f: [68, 32], a: [-10, -10], bd: 0 }, { hy: 64, f: [68, 32], a: [-10, -10], bd: 0 }] },
    dsl: { view: 'side', T: 1.0, prop: DB2, poses: [{ hx: 62, f: [62, 62], a: [3, 3] }, { hx: 56, hy: 56, t: 75, f: [62, 18], fy: [G, 58], a: [0, 0] }] },
    dcalf: { view: 'side', T: 0.7, poses: [{ a: [0, 0] }, { hy: 44.5, fy: [84, 84], a: [0, 0] }] },
    dthr: { view: 'side', T: 0.8, prop: DB2, poses: [{ hx: 38, hy: 65, t: 30, a: [30, 200] }, { a: [175, 178] }] },
    dchop: { view: 'front', T: 0.8, prop: { k: 'db1', g: 'both' }, poses: [
      { hy: 54, t: -8, f: [62, 38], a: [-15, -30], a2: [-30, -35], bd: 0 },
      { hy: 54, t: 8, f: [62, 38], a: [125, 150], a2: [140, 155], bd: 0 }] },
    dside: { view: 'front', T: 0.9, prop: { k: 'db2', g: 'near' }, poses: [
      { a: [0, 0], a2: [-130, -170], f: W },
      { t: 20, a: [0, 0], a2: [-130, -170], f: W }] }
  };

  /* ---------- Poses ---------- */
  function autoHy(q, front) {
    const hs = front ? 3 : 0;
    const hips = [q.hx + hs, q.hx - hs];
    let best = -Infinity;
    for (let i = 0; i < 2; i++) {
      const dx = q.f[i] - hips[i];
      best = Math.max(best, q.fy[i] - Math.sqrt(Math.max(0, 39.7 * 39.7 - dx * dx)));
    }
    return best + q.dy;
  }

  function norm(p, view) {
    const q = Object.assign({}, DEF, p);
    if (!q.a2) q.a2 = view === 'front' ? [-q.a[0], -q.a[1]] : q.a.slice();
    if (q.bd == null) q.bd = q.a[1];
    if (q.hy == null) q.hy = autoHy(q, view === 'front');
    return q;
  }

  function lerp(p, q, k) {
    const o = {};
    Object.keys(p).forEach((key) => {
      const x = p[key];
      const y = q[key];
      if (Array.isArray(x)) o[key] = x.map((v, i) => mix(v, y[i], k));
      else o[key] = typeof x === 'number' ? mix(x, y, k) : x;
    });
    return o;
  }

  function leg(hip, ank, sign) {
    const L = 20;
    let dx = ank[0] - hip[0];
    let dy = ank[1] - hip[1];
    let d = Math.hypot(dx, dy);
    const max = 2 * L - 0.05;
    if (d > max) { const k = max / d; dx *= k; dy *= k; d = max; ank = [hip[0] + dx, hip[1] + dy]; }
    if (d < 1) d = 1;
    const h = Math.sqrt(Math.max(0, L * L - (d / 2) * (d / 2)));
    return { knee: [hip[0] + dx / 2 + (dy / d) * sign * h, hip[1] + dy / 2 - (dx / d) * sign * h], ank };
  }

  function solve(q, view) {
    const front = view === 'front';
    const hs = front ? 3 : 0;
    const tl = front ? q.tl : 1;
    const sx = front ? q.sx : 1;
    const ux = front ? q.ux : 0;
    const X = (x) => q.hx + (x - q.hx) * sx + ux;
    const tv = [Math.sin(rad(q.t)), -Math.cos(rad(q.t))];
    const neck = [X(q.hx + tv[0] * 24 * tl), q.hy + tv[1] * 24 * tl];
    const shc = [X(q.hx + tv[0] * 21 * tl), q.hy + tv[1] * 21 * tl];
    const off = front ? 5 * sx : 0;
    const sh1 = [shc[0] + off, shc[1]];
    const sh2 = [shc[0] - off, shc[1]];
    const arm = (s, a) => {
      const u = dir(a[0]);
      const f = dir(a[1]);
      const e = [s[0] + u[0] * 14 * sx, s[1] + u[1] * 14];
      return [s, e, [e[0] + f[0] * 13 * sx, e[1] + f[1] * 13]];
    };
    const hv = [Math.sin(rad(q.t + q.h)), -Math.cos(rad(q.t + q.h))];
    const hk = front && tl < 1 ? 0.7 : 1;
    const head = [neck[0] + hv[0] * 8 * hk, neck[1] + hv[1] * 8 * hk];
    const hip1 = [q.hx + hs, q.hy];
    const hip2 = [q.hx - hs, q.hy];
    const l1 = leg(hip1, [q.f[0], q.fy[0]], q.kb);
    const l2 = leg(hip2, [q.f[1], q.fy[1]], front ? -q.kb : q.kb);
    const toe = (l, side) => {
      const a = l.ank;
      return front ? [a[0] + 4 * side, a[1]] : [a[0] + 6, Math.min(G, a[1] + 4)];
    };
    return {
      hip: [q.hx, q.hy], hip1, hip2, neck, head, sh1, sh2,
      arm1: arm(sh1, q.a), arm2: arm(sh2, q.a2),
      leg1: [hip1, l1.knee, l1.ank, toe(l1, 1)],
      leg2: [hip2, l2.knee, l2.ank, toe(l2, -1)]
    };
  }

  /* ---------- DOM ---------- */
  const el = (tag, attrs, parent) => {
    const n = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach((k) => n.setAttribute(k, attrs[k]));
    if (parent) parent.appendChild(n);
    return n;
  };
  const pts = (arr) => arr.map((p) => `${r1(p[0])},${r1(p[1])}`).join(' ');

  function dumbbell(parent, horizontal) {
    const g = el('g', {}, parent);
    if (horizontal) {
      el('line', { x1: -4.5, y1: 0, x2: 4.5, y2: 0, class: 'p-stroke', 'stroke-width': 1.8 }, g);
      el('rect', { x: -7.2, y: -3, width: 3.2, height: 6, rx: 1, class: 'p-fill' }, g);
      el('rect', { x: 4, y: -3, width: 3.2, height: 6, rx: 1, class: 'p-fill' }, g);
    } else {
      el('circle', { cx: 0, cy: 0, r: 3.9, class: 'p-stroke', 'stroke-width': 2.4 }, g);
      el('circle', { cx: 0, cy: 0, r: 1.1, class: 'p-fill' }, g);
    }
    return g;
  }
  function dumbbellAxis(parent) {
    const g = el('g', {}, parent);
    el('line', { x1: 0, y1: 0, x2: 0, y2: 12, class: 'p-stroke', 'stroke-width': 1.8 }, g);
    el('rect', { x: -3.6, y: -0.5, width: 7.2, height: 3.4, rx: 1, class: 'p-fill' }, g);
    el('rect', { x: -3.6, y: 9.1, width: 7.2, height: 3.4, rx: 1, class: 'p-fill' }, g);
    return g;
  }
  function kettlebell(parent) {
    const g = el('g', {}, parent);
    el('path', { d: 'M-3.3,3.4V0.6a3.3,3.3 0 0 1 6.6,0V3.4', class: 'p-stroke', 'stroke-width': 1.9 }, g);
    el('circle', { cx: 0, cy: 8, r: 5.2, class: 'p-fill' }, g);
    return g;
  }

  function build(fig, view) {
    const front = view === 'front';
    const svg = el('svg', { viewBox: '0 0 100 100', class: 'fig-svg ' + (front ? 'is-front' : 'is-side'), 'aria-hidden': 'true', focusable: 'false' });
    el('line', { class: 'floor', x1: 14, y1: 90.5, x2: 86, y2: 90.5 }, svg);
    const far = el('g', { class: 'far' }, svg);
    const farLeg = el('polyline', { class: 'limb', 'stroke-width': 5.4 }, far);
    const farFoot = el('polyline', { class: 'limb', 'stroke-width': 3.4 }, far);
    const farArm = el('polyline', { class: 'limb', 'stroke-width': 4.6 }, far);
    let farProp = null;
    const prop = fig.prop;
    if (prop && prop.k === 'db2' && prop.g === 'both') farProp = dumbbell(far, front || fig.dbx);
    const body = el('g', { class: 'body' }, svg);
    const torso = el('line', { class: 'limb', 'stroke-width': 6.4 }, body);
    const hipBar = front ? el('line', { class: 'limb', 'stroke-width': 4.6 }, body) : null;
    const shBar = front ? el('line', { class: 'limb', 'stroke-width': 4.6 }, body) : null;
    const nearLeg = el('polyline', { class: 'limb', 'stroke-width': 5.4 }, body);
    const nearFoot = el('polyline', { class: 'limb', 'stroke-width': 3.4 }, body);
    const nearArm = el('polyline', { class: 'limb', 'stroke-width': 4.6 }, body);
    const head = el('circle', { class: 'head', r: 5.6 }, body);
    let main = null;
    if (prop) {
      if (prop.k === 'kb') main = kettlebell(body);
      else if (prop.k === 'db1') main = dumbbellAxis(body);
      else if (prop.k === 'db2') main = dumbbell(body, front || fig.dbx);
    }
    return { svg, farLeg, farFoot, farArm, farProp, torso, hipBar, shBar, nearLeg, nearFoot, nearArm, head, main, prop, front, fig };
  }

  function draw(c, q) {
    const s = solve(q, c.fig.view);
    c.torso.setAttribute('x1', r1(s.hip[0])); c.torso.setAttribute('y1', r1(s.hip[1]));
    c.torso.setAttribute('x2', r1(s.neck[0])); c.torso.setAttribute('y2', r1(s.neck[1]));
    if (c.front) {
      c.hipBar.setAttribute('x1', r1(s.hip2[0])); c.hipBar.setAttribute('y1', r1(s.hip2[1]));
      c.hipBar.setAttribute('x2', r1(s.hip1[0])); c.hipBar.setAttribute('y2', r1(s.hip1[1]));
      c.shBar.setAttribute('x1', r1(s.sh2[0])); c.shBar.setAttribute('y1', r1(s.sh2[1]));
      c.shBar.setAttribute('x2', r1(s.sh1[0])); c.shBar.setAttribute('y2', r1(s.sh1[1]));
    }
    c.nearLeg.setAttribute('points', pts(s.leg1.slice(0, 3)));
    c.nearFoot.setAttribute('points', pts(s.leg1.slice(2)));
    c.farLeg.setAttribute('points', pts(s.leg2.slice(0, 3)));
    c.farFoot.setAttribute('points', pts(s.leg2.slice(2)));
    c.nearArm.setAttribute('points', pts(s.arm1));
    c.farArm.setAttribute('points', pts(s.arm2));
    c.head.setAttribute('cx', r1(s.head[0])); c.head.setAttribute('cy', r1(s.head[1]));
    const p = c.prop;
    if (p && c.main) {
      const h1 = s.arm1[2];
      const h2 = s.arm2[2];
      const at = (pt) => `translate(${r1(pt[0])} ${r1(pt[1])})`;
      if (p.k === 'db2') {
        const rot = c.front || c.fig.dbx ? '' : '';
        c.main.setAttribute('transform', at(h1) + rot);
        if (c.farProp) c.farProp.setAttribute('transform', at(h2) + rot);
      } else {
        const pos = p.g === 'near' ? h1 : [(h1[0] + h2[0]) / 2, (h1[1] + h2[1]) / 2];
        const along = p.k === 'db1' ? 3 : 0;
        const d = dir(q.bd);
        c.main.setAttribute('transform', `translate(${r1(pos[0] + d[0] * along)} ${r1(pos[1] + d[1] * along)}) rotate(${r1(-q.bd)})`);
      }
    }
  }

  /* ---------- Animación ---------- */
  const live = new Set();
  let raf = 0;
  const ease = (u) => { const k = Math.min(1, Math.max(0, (u - 0.15) / 0.7)); return k * k * (3 - 2 * k); };
  const reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function tickAll(now) {
    raf = 0;
    live.forEach((c) => {
      if (!c.svg.isConnected) { live.delete(c); return; }
      const e = Math.max(0, now - c.t0) / (c.T * 1000);
      const n = Math.floor(e);
      const u = e - n;
      const i = n % c.seq.length;
      const from = c.poses[c.seq[i]];
      const to = c.poses[c.seq[(i + 1) % c.seq.length]];
      draw(c, lerp(from, to, ease(u)));
    });
    if (live.size) raf = requestAnimationFrame(tickAll);
  }

  function mount(host, id, opts) {
    opts = opts || {};
    if (!host) return;
    if (host._fig) live.delete(host._fig);
    host.textContent = '';
    const fig = FIGS[id];
    if (!fig) return;
    const c = build(fig, fig.view);
    c.poses = fig.poses.map((p) => norm(p, fig.view));
    const n = c.poses.length;
    c.seq = [];
    for (let i = 0; i < n; i++) c.seq.push(i);
    if (fig.loop !== 'cycle') for (let i = n - 2; i >= 1; i--) c.seq.push(i);
    c.T = fig.T || 0.9;
    host.appendChild(c.svg);
    host._fig = c;
    const frame = Math.min(opts.frame == null ? 1 : opts.frame, n - 1);
    draw(c, c.poses[frame]);
    if (opts.animate && !reduced()) {
      c.t0 = performance.now();
      live.add(c);
      if (!raf) raf = requestAnimationFrame(tickAll);
    }
  }

  function unmount(host) {
    if (host && host._fig) { live.delete(host._fig); host._fig = null; host.textContent = ''; }
  }

  /* Rellena todos los [data-fig] dentro de un contenedor (miniaturas estáticas). */
  function hydrate(root, animate) {
    (root || document).querySelectorAll('[data-fig]').forEach((h) => {
      if (!h._fig) mount(h, h.dataset.fig, { animate: animate || h.hasAttribute('data-animate'), frame: 1 });
    });
  }

  window.FIG = { mount, unmount, hydrate, has: (id) => !!FIGS[id], ids: () => Object.keys(FIGS) };
})();
