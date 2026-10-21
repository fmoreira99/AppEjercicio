/*
  Figuras animadas de referencia para cada ejercicio.
  Cada figura es un muñeco con 2 o más posturas que se interpolan.

  Ángulos: 0 = hacia abajo, 90 = hacia adelante (derecha en pantalla), 180 = hacia arriba.
  Torso `t`: 0 = vertical, positivo = inclinado hacia adelante.
  Vista `side`: de perfil mirando a la derecha. Vista `front`: de frente.
  Poses: hx/hy cadera · t torso · h cabeza · a/a2 brazo [arriba, antebrazo] · f/fy tobillos x/y · la piernas rectas por ángulo ·
         bd dirección de la pesa · tl largo de torso (de frente) · sx/ux giro de torso (de frente).
  Ritmo: d = duración relativa del paso hacia esa postura · e = curva ('io' suave, 'out' explosivo, 'in' cae)
         hold (en la figura) = pausa en cada postura, en fracción de T · tr = punto cuya trayectoria se dibuja.
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
  // Bajar controlado y subir con energía.
  const DOWN = { d: 1.25 };
  const UP = { d: 0.8, e: 'out' };
  const o = (...xs) => Object.assign({}, ...xs);

  const FIGS = {
    // Calentamiento y movilidad
    brazos: { view: 'front', loop: 'cycle', T: 0.55, hold: 0, tr: 'hand', poses: [{ a: [88, 88], f: W }, { a: [165, 165], f: W }, { a: [88, 88], f: W }, { a: [10, 10], f: W }] },
    cadera: { view: 'front', T: 0.8, hold: 0, tr: 'hip', poses: [{ hx: 44, hy: 51, t: 10, a: [35, -40], f: [58, 42] }, { hx: 50, hy: 51, t: 0, a: [35, -40], f: [58, 42] }, { hx: 56, hy: 51, t: -10, a: [35, -40], f: [58, 42] }] },
    marcha: { view: 'side', T: 0.45, hold: 0, tr: 'knee', poses: [
      { f: [58, 50], fy: [74, G], a: [-35, -10], a2: [45, 110] },
      { f: [50, 58], fy: [G, 74], a: [45, 110], a2: [-35, -10] }] },
    aire: { view: 'side', tr: 'hip', poses: [o({ a: [15, 15] }, UP), o({ hx: 38, hy: 65, t: 35, a: [90, 90] }, DOWN)] },
    torso: { view: 'front', loop: 'cycle', T: 0.6, hold: 0.05, poses: [
      { a: [85, 85], f: [57, 43] }, { a: [85, 85], f: [57, 43], sx: 0.4, ux: -4 },
      { a: [85, 85], f: [57, 43] }, { a: [85, 85], f: [57, 43], sx: 0.4, ux: 4 }] },
    bisagra: { view: 'side', T: 1.1, hold: 0.25, tr: 'head', poses: [{ a: [0, 0] }, { hx: 38, hy: 52, t: 70, a: [0, 0] }] },
    halo: { view: 'front', T: 1.0, hold: 0.05, prop: KB, poses: [{ a: [25, 210], f: W, bd: 0 }, { a: [150, 205], f: W, bd: 180 }] },
    quad: { view: 'side', T: 1.2, hold: 0.4, poses: [{ a: [0, 0] }, { a: [-12, -14], f: [44, 50], fy: [52, G] }] },
    isquios: { view: 'side', T: 1.2, hold: 0.4, poses: [{ a: [0, 0] }, { hx: 46, t: 55, a: [12, 12], f: [62, 46] }] },
    pecho: { view: 'side', T: 1.2, hold: 0.4, poses: [{ a: [0, 0] }, { t: -4, h: -8, a: [-55, -60] }] },
    triest: { view: 'side', T: 1.2, hold: 0.4, poses: [{ a: [0, 0] }, { a: [170, -20], a2: [0, 0] }] },
    lateral: { view: 'front', T: 1.2, hold: 0.4, poses: [{ a: [175, 175], a2: [-5, -5], f: W }, { t: -22, a: [205, 205], a2: [-5, -5], f: W }] },

    // Cardio de pie
    jacks: { view: 'front', T: 0.42, hold: 0.04, tr: 'hand', poses: [{ a: [12, 12], f: [53, 47], e: 'in' }, { a: [160, 165], f: [68, 32], e: 'out' }] },
    rodillas: { view: 'side', T: 0.35, hold: 0, tr: 'knee', poses: [
      { f: [62, 50], fy: [66, G], a: [-45, -10], a2: [50, 115] },
      { f: [50, 62], fy: [G, 66], a: [50, 115], a2: [-45, -10] }] },
    patinador: { view: 'front', T: 0.5, hold: 0.1, tr: 'hip', poses: [
      { hx: 58, hy: 58, t: 14, f: [60, 47], fy: [G, 78], a: [40, 30], a2: [-70, -100], e: 'out' },
      { hx: 42, hy: 58, t: -14, f: [53, 40], fy: [78, G], a: [70, 100], a2: [-40, -30], e: 'out' }] },
    sqjump: { view: 'side', T: 0.55, hold: 0.1, tr: 'hip', poses: [o({ hx: 38, hy: 66, t: 35, a: [-45, -45] }, { d: 1.1, e: 'in' }), o({ hy: 40.5, fy: [80, 80], a: [170, 170] }, { d: 0.7, e: 'out' })] },
    boxeo: { view: 'side', T: 0.32, hold: 0.08, tr: 'hand', poses: [
      { hy: 53, t: 8, f: [44, 60], a: [88, 88], a2: [45, 170], e: 'out' },
      { hy: 53, t: 8, f: [44, 60], a: [45, 170], a2: [88, 88], e: 'out' }] },
    kneecrunch: { view: 'side', T: 0.6, hold: 0.1, tr: 'knee', poses: [
      { a: [130, 254], d: 1.1 },
      o({ t: 22, a: [45, 250], f: [56, 50], fy: [70, G] }, UP)] },
    highjump: { view: 'side', T: 0.45, hold: 0.1, tr: 'hip', poses: [o({ hx: 46, hy: 56, t: 22, a: [-40, -40] }, { d: 1.1, e: 'in' }), o({ hy: 41, fy: [76, 76], a: [175, 175] }, { d: 0.7, e: 'out' })] },
    deepsq: { view: 'side', T: 1.0, tr: 'hip', poses: [o({ a: [90, 90] }, UP), o({ hx: 36, hy: 70, t: 42, a: [90, 90] }, DOWN)] },
    run: { view: 'side', T: 0.3, hold: 0, poses: [
      { t: 10, f: [62, 36], fy: [82, 76], a: [-50, -15], a2: [40, 120] },
      { t: 10, f: [36, 62], fy: [76, 82], a: [40, 120], a2: [-50, -15] }] },

    // Calistenia del programa (varios son en el suelo)
    burpee: { view: 'side', loop: 'cycle', T: 0.5, hold: 0.06, poses: [
      { a: [0, 0], d: 0.8, e: 'in' },
      { hx: 36, hy: 72, t: 55, a: [10, 5], f: [46, 46], d: 0.8 },
      { hx: 40, hy: 61.5, t: 88, h: -20, a: [0, 0], f: [10.5, 10.5], d: 0.6, e: 'out' },
      { hx: 36, hy: 72, t: 55, a: [10, 5], f: [46, 46], d: 0.6, e: 'out' },
      { hy: 40.5, fy: [80, 80], a: [175, 175], d: 0.6, e: 'out' }] },
    pushup: { view: 'side', T: 0.8, tr: 'shoulder', poses: [
      o({ hx: 40, hy: 61.5, t: 88, h: -20, a: [0, 0], f: [10.5, 10.5] }, UP),
      o({ hx: 45, hy: 76.4, t: 95, h: -20, a: [-100, 20], f: [7, 7] }, DOWN)] },
    climbers: { view: 'side', T: 0.3, hold: 0, tr: 'knee', poses: [
      { hx: 40, hy: 61.5, t: 88, h: -20, a: [0, 0], f: [54, 10.5], fy: [82, G] },
      { hx: 40, hy: 61.5, t: 88, h: -20, a: [0, 0], f: [10.5, 54], fy: [G, 82] }] },
    pullup: { view: 'side', T: 0.9, tr: 'head', prop: { k: 'bar' }, poses: [
      o({ hx: 50, hy: 58, t: 0, a: [180, 180], f: [48, 48], fy: [84, 84] }, DOWN),
      o({ hx: 50, hy: 34, t: 0, h: -10, a: [45, 180], f: [47, 47], fy: [70, 70] }, UP)] },
    situp: { view: 'side', T: 0.8, tr: 'head', poses: [
      o({ hx: 58, hy: 84, t: -88, a: [175, 175], f: [68, 68] }, { d: 1.1 }),
      o({ hx: 58, hy: 84, t: 12, a: [90, 90], f: [68, 68] }, { d: 0.9, e: 'out' })] },
    leglever: { view: 'side', T: 0.9, hold: 0.1, tr: 'ankle', poses: [
      { hx: 40, hy: 84, t: -90, a: [90, 90], la: [87, 87], d: 1.2 },
      { hx: 40, hy: 84, t: -90, a: [90, 90], la: [174, 174], kb: -1 }] },
    jackknife: { view: 'side', T: 0.8, tr: 'ankle', poses: [
      { hx: 52, hy: 84, t: -90, a: [270, 270], la: [87, 87], d: 1.1 },
      o({ hx: 52, hy: 84, t: -35, a: [70, 70], la: [135, 135], kb: -1 }, { d: 0.8, e: 'out' })] },

    // Pesa rusa
    swing: { view: 'side', T: 0.7, hold: 0.03, prop: KB, poses: [o({ hx: 36, hy: 54, t: 60, a: [-25, -25] }, { e: 'in' }), o({ t: -3, a: [88, 88] }, { d: 0.85, e: 'out' })] },
    swing1: { view: 'side', T: 0.7, hold: 0.03, prop: { k: 'kb', g: 'near' }, poses: [o({ hx: 36, hy: 54, t: 60, a: [-25, -25], a2: [40, 40] }, { e: 'in' }), o({ t: -3, a: [88, 88], a2: [40, 40] }, { d: 0.85, e: 'out' })] },
    goblet: { view: 'side', prop: KB, tr: 'hip', poses: [o({ a: [10, 200], bd: 0 }, UP), o({ hx: 38, hy: 65, t: 30, a: [30, 200], bd: 0 }, DOWN)] },
    cleanpress: { view: 'side', T: 0.75, hold: 0.12, prop: { k: 'kb', g: 'near' }, poses: [
      { hx: 42, hy: 52, t: 25, a: [2, 2], a2: [40, 40], d: 1.1 },
      { a: [10, 200], a2: [40, 40], bd: 20, d: 0.7, e: 'out' },
      { a: [178, 178], a2: [40, 40], bd: -10, d: 0.8, e: 'out' }] },
    woodchop: { view: 'front', T: 0.8, hold: 0.08, prop: KB, poses: [
      { hy: 54, t: -8, f: [62, 38], a: [-15, -30], a2: [-30, -35], d: 1.1 },
      o({ hy: 54, t: 8, f: [62, 38], a: [125, 150], a2: [140, 155] }, UP)] },
    thruster: { view: 'side', T: 0.8, prop: KB, poses: [o({ hx: 38, hy: 65, t: 30, a: [30, 200], bd: 0 }, { d: 1.1 }), o({ a: [175, 178], bd: 180 }, UP)] },
    highpull: { view: 'side', T: 0.7, prop: KB, poses: [o({ hx: 44, hy: 51, t: 25, a: [8, 8] }, { d: 1.0 }), o({ t: -3, a: [110, 20], bd: 0 }, { d: 0.7, e: 'out' })] },
    curl: { view: 'side', prop: KB, poses: [o({ a: [0, 0], bd: 0 }, DOWN), o({ a: [5, 170], bd: 0 }, UP)] },
    triext: { view: 'side', prop: KB, poses: [o({ a: [170, 345], bd: 0 }, DOWN), o({ a: [178, 178], bd: 0 }, UP)] },
    marchapesa: { view: 'side', T: 0.5, hold: 0, prop: { k: 'kb', g: 'near' }, tr: 'knee', poses: [
      { f: [60, 50], fy: [70, G], a: [10, 200], a2: [-30, -30] },
      { f: [50, 60], fy: [G, 70], a: [10, 200], a2: [-30, -30] }] },
    ocho: { view: 'front', T: 0.8, hold: 0.05, prop: KB, poses: [
      { hy: 56, tl: 0.6, f: [64, 36], a: [18, 20], a2: [30, 28] },
      { hy: 56, tl: 0.6, f: [64, 36], a: [-30, -28], a2: [-18, -20] }] },
    giro: { view: 'front', loop: 'cycle', T: 0.6, hold: 0.1, prop: KB, poses: [
      { a: [25, 210], f: W, bd: 0 }, { a: [25, 210], f: W, bd: 0, sx: 0.45, ux: -5 },
      { a: [25, 210], f: W, bd: 0 }, { a: [25, 210], f: W, bd: 0, sx: 0.45, ux: 5 }] },
    pressoh: { view: 'side', T: 0.8, prop: { k: 'kb', g: 'near' }, poses: [o({ a: [10, 200], a2: [40, 40], bd: 20 }, { d: 1.1 }), o({ a: [178, 178], a2: [40, 40], bd: -10 }, UP)] },
    snatch: { view: 'side', T: 0.75, hold: 0.06, prop: { k: 'kb', g: 'near' }, poses: [
      o({ hx: 36, hy: 54, t: 60, a: [-25, -25], a2: [40, 40], bd: -25 }, { d: 1.1, e: 'in' }),
      o({ t: -2, a: [100, 150], a2: [40, 40], bd: 60 }, { d: 0.6, e: 'out' }),
      o({ t: -3, a: [178, 178], a2: [40, 40], bd: -10 }, { d: 0.5, e: 'out' })] },
    kbclean: { view: 'side', T: 0.75, hold: 0.14, prop: { k: 'kb', g: 'near' }, poses: [
      o({ hx: 40, hy: 53, t: 40, a: [-5, -5], a2: [40, 40] }, { d: 1.1 }),
      o({ a: [10, 200], a2: [40, 40], bd: 20 }, { d: 0.7, e: 'out' })] },
    pushpress: { view: 'side', loop: 'cycle', T: 0.6, hold: 0.1, prop: { k: 'kb', g: 'near' }, poses: [
      { a: [10, 200], a2: [40, 40], bd: 20, d: 1.2 },
      { hx: 47, hy: 53.5, t: 2, a: [10, 200], a2: [40, 40], bd: 20, d: 0.7 },
      o({ a: [178, 178], a2: [40, 40], bd: -10 }, { d: 0.6, e: 'out' })] },
    kbdl: { view: 'side', prop: KB, tr: 'hip', poses: [o({ a: [3, 3], bd: 0 }, UP), o({ hx: 38, hy: 57, t: 55, a: [0, 0], bd: 0 }, DOWN)] },
    kbsumo: { view: 'front', prop: KB, tr: 'hip', poses: [o({ f: [70, 30], a: [-10, -10], bd: 0 }, UP), o({ hy: 66, f: [70, 30], a: [-10, -10], bd: 0 }, DOWN)] },
    kbrow: { view: 'side', prop: { k: 'kb', g: 'near' }, poses: [
      o({ hx: 42, hy: 54, t: 55, f: [62, 34], a: [0, 0], a2: [70, 20], bd: 0 }, { d: 1.1 }),
      o({ hx: 42, hy: 54, t: 55, f: [62, 34], a: [-85, 0], a2: [70, 20], bd: 0 }, UP)] },
    kblunge: { view: 'side', prop: KB, tr: 'hip', poses: [o({ a: [10, 200], bd: 0 }, UP), o({ hx: 47, hy: 64, t: 5, f: [58, 28], fy: [G, 84], a: [10, 200], bd: 0 }, DOWN)] },
    latlunge: { view: 'front', T: 1.0, prop: KB, tr: 'hip', poses: [
      o({ f: [60, 40], a: [25, 210], bd: 0 }, UP),
      o({ hx: 60, hy: 62, tl: 0.85, f: [66, 27], a: [25, 210], bd: 0 }, DOWN)] },
    windmill: { view: 'front', T: 1.2, hold: 0.25, prop: { k: 'kb', g: 'near' }, poses: [
      { a: [178, 178], a2: [-8, -8], f: [62, 40], bd: -10 },
      { hx: 55, t: -45, tl: 0.9, a: [180, 180], a2: [0, 0], f: [62, 40], bd: -10, d: 1.3 }] },
    around: { view: 'front', T: 0.6, hold: 0.04, prop: KB, poses: [
      { a: [12, 6], a2: [28, 22], f: W, bd: 0 },
      { a: [-16, -24], a2: [16, 24], f: W, bd: 0 },
      { a: [-28, -22], a2: [-12, -6], f: W, bd: 0 }] },
    suitcase: { view: 'side', T: 0.5, hold: 0, prop: { k: 'kb', g: 'near' }, tr: 'knee', poses: [
      { f: [60, 50], fy: [70, G], a: [2, 2], a2: [40, 100], bd: 0 },
      { f: [50, 60], fy: [G, 70], a: [2, 2], a2: [-30, -10], bd: 0 }] },
    kbfront: { view: 'side', prop: KB, poses: [o({ a: [0, 0], bd: 0 }, DOWN), o({ a: [88, 88], bd: 0 }, UP)] },
    goodmorning: { view: 'side', T: 1.0, hold: 0.2, prop: KB, tr: 'head', poses: [
      o({ a: [10, 200], bd: 0 }, UP),
      o({ hx: 40, hy: 50, t: 65, a: [-55, 135], bd: 0 }, DOWN)] },
    kbsl: { view: 'side', T: 1.0, hold: 0.2, prop: { k: 'kb', g: 'near' }, poses: [
      { hx: 62, f: [62, 62], a: [3, 3], a2: [10, 10], bd: 0 },
      { hx: 56, hy: 56, t: 75, f: [62, 18], fy: [G, 58], a: [0, 0], a2: [-60, -60], bd: 0, d: 1.2 }] },

    // Mancuernas
    dpress: { view: 'front', T: 0.8, prop: DB2, poses: [o({ a: [70, 180], f: W }, { d: 1.1 }), o({ a: [172, 178], f: W }, UP)] },
    dremo: { view: 'side', prop: DB2, poses: [o({ hx: 40, hy: 52, t: 65, a: [0, 0] }, { d: 1.1 }), o({ hx: 40, hy: 52, t: 65, a: [-80, 0] }, UP)] },
    dgoblet: { view: 'side', prop: { k: 'db1', g: 'both' }, tr: 'hip', poses: [o({ a: [10, 200], bd: 0 }, UP), o({ hx: 38, hy: 65, t: 30, a: [30, 200], bd: 0 }, DOWN)] },
    drdl: { view: 'side', prop: DB2, poses: [o({ a: [3, 3] }, { d: 0.9 }), o({ hx: 40, hy: 52, t: 70, a: [0, 0] }, DOWN)] },
    drev: { view: 'side', prop: DB2, tr: 'hip', poses: [o({ a: [3, 3] }, UP), o({ hx: 47, hy: 64, t: 5, f: [58, 28], fy: [G, 84], a: [0, 0] }, DOWN)] },
    dlat: { view: 'front', prop: DB2, poses: [o({ a: [10, 10], f: W }, DOWN), o({ a: [86, 88], f: W }, UP)] },
    dfly: { view: 'front', prop: DB2, poses: [o({ hy: 56, tl: 0.45, a: [0, 0], f: W }, DOWN), o({ hy: 56, tl: 0.45, a: [86, 86], f: W }, UP)] },
    dhammer: { view: 'side', prop: DB2, dbx: true, poses: [o({ a: [0, 0] }, DOWN), o({ a: [5, 170] }, UP)] },
    dtri: { view: 'side', prop: { k: 'db1', g: 'both' }, poses: [o({ a: [170, 345], bd: 0 }, DOWN), o({ a: [178, 178], bd: 0 }, UP)] },
    dsumo: { view: 'front', prop: { k: 'db1', g: 'both' }, tr: 'hip', poses: [o({ f: [68, 32], a: [-10, -10], bd: 0 }, UP), o({ hy: 64, f: [68, 32], a: [-10, -10], bd: 0 }, DOWN)] },
    dsl: { view: 'side', T: 1.0, hold: 0.2, prop: DB2, poses: [{ hx: 62, f: [62, 62], a: [3, 3] }, { hx: 56, hy: 56, t: 75, f: [62, 18], fy: [G, 58], a: [0, 0], d: 1.2 }] },
    dcalf: { view: 'side', T: 0.7, hold: 0.2, tr: 'head', poses: [{ a: [0, 0] }, o({ hy: 44.5, fy: [84, 84], a: [0, 0] }, UP)] },
    dthr: { view: 'side', T: 0.8, prop: DB2, poses: [o({ hx: 38, hy: 65, t: 30, a: [30, 200] }, { d: 1.1 }), o({ a: [175, 178] }, UP)] },
    dchop: { view: 'front', T: 0.8, hold: 0.08, prop: { k: 'db1', g: 'both' }, poses: [
      { hy: 54, t: -8, f: [62, 38], a: [-15, -30], a2: [-30, -35], bd: 0, d: 1.1 },
      o({ hy: 54, t: 8, f: [62, 38], a: [125, 150], a2: [140, 155], bd: 0 }, UP)] },
    dside: { view: 'front', T: 0.9, hold: 0.2, prop: { k: 'db2', g: 'near' }, poses: [
      { a: [0, 0], a2: [-130, -170], f: W },
      { t: 20, a: [0, 0], a2: [-130, -170], f: W, d: 1.2 }] },
    darnold: { view: 'front', T: 0.8, prop: DB2, poses: [
      o({ a: [-8, 176], f: W }, { d: 1.1 }),
      { a: [70, 180], f: W, d: 0.6 },
      o({ a: [172, 178], f: W }, { d: 0.6, e: 'out' })] },
    dfront: { view: 'side', prop: DB2, poses: [o({ a: [0, 0] }, DOWN), o({ a: [88, 88] }, UP)] },
    duprow: { view: 'front', prop: DB2, poses: [o({ a: [-6, -6], f: W }, DOWN), o({ a: [78, -115], f: W }, UP)] },
    dwalk: { view: 'side', loop: 'cycle', T: 0.75, hold: 0.08, prop: DB2, tr: 'hip', poses: [
      { a: [3, 3] },
      o({ hx: 46, hy: 64, t: 4, f: [60, 26], fy: [G, 84], a: [2, 2] }, DOWN),
      o({ a: [3, 3] }, UP),
      o({ hx: 46, hy: 64, t: 4, f: [26, 60], fy: [84, G], a: [2, 2] }, DOWN)] },
    dfarmer: { view: 'side', T: 0.45, hold: 0, prop: DB2, tr: 'knee', poses: [
      { f: [58, 50], fy: [74, G], a: [2, 2] },
      { f: [50, 58], fy: [G, 74], a: [2, 2] }] },
    dkickback: { view: 'side', prop: DB2, poses: [
      o({ hx: 40, hy: 52, t: 55, a: [-70, 0] }, DOWN),
      o({ hx: 40, hy: 52, t: 55, a: [-70, -75] }, UP)] },
    dcurl: { view: 'side', prop: DB2, poses: [o({ a: [0, 0] }, DOWN), o({ a: [5, 165] }, UP)] }
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
    delete q.d;
    delete q.e;
    if (!q.a2) q.a2 = view === 'front' ? [-q.a[0], -q.a[1]] : q.a.slice();
    if (q.bd == null) q.bd = q.a[1];
    if (q.hy == null) q.hy = autoHy(q, view === 'front');
    return q;
  }

  function lerp(p, q, k) {
    const out = {};
    Object.keys(p).forEach((key) => {
      const x = p[key];
      const y = q[key];
      if (Array.isArray(x)) out[key] = x.map((v, i) => mix(v, y[i], k));
      else out[key] = typeof x === 'number' ? mix(x, y, k) : x;
    });
    return out;
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
    // la: piernas rectas definidas por ángulo, para que giren en arco alrededor de la cadera.
    const ank = (hp, i) => (q.la ? [hp[0] + dir(q.la[i])[0] * 39.6, hp[1] + dir(q.la[i])[1] * 39.6] : [q.f[i], q.fy[i]]);
    const l1 = leg(hip1, ank(hip1, 0), q.kb);
    const l2 = leg(hip2, ank(hip2, 1), front ? -q.kb : q.kb);
    const toe = (l, side) => {
      const a = l.ank;
      return front ? [a[0] + 4 * side, a[1]] : [a[0] + 6, Math.min(G, a[1] + 4)];
    };
    return {
      hip: [q.hx, q.hy], hip1, hip2, neck, head, headRot: q.t + q.h, sh1, sh2,
      arm1: arm(sh1, q.a), arm2: arm(sh2, q.a2),
      leg1: [hip1, l1.knee, l1.ank, toe(l1, 1)],
      leg2: [hip2, l2.knee, l2.ank, toe(l2, -1)]
    };
  }

  // Centro de la pesa (o la mano) para dibujar su trayectoria.
  function propPoint(fig, s, bd) {
    const p = fig.prop;
    const h1 = s.arm1[2];
    if (!p || p.k === 'bar' || p.k === 'db2' || p.g === 'near') {
      if (p && p.k === 'kb' && p.g === 'near') { const d = dir(bd); return [h1[0] + d[0] * 8, h1[1] + d[1] * 8]; }
      return h1;
    }
    const h2 = s.arm2[2];
    const d = dir(bd);
    const along = p.k === 'db1' ? 9 : 8;
    return [(h1[0] + h2[0]) / 2 + d[0] * along, (h1[1] + h2[1]) / 2 + d[1] * along];
  }
  function tracePoint(fig, s, q) {
    switch (fig.tr) {
      case 'hip': return s.hip;
      case 'head': return s.head;
      case 'knee': return s.leg1[1];
      case 'ankle': return s.leg1[2];
      case 'shoulder': return s.sh1;
      case 'hand': return s.arm1[2];
      default: return fig.prop && fig.prop.k !== 'bar' ? propPoint(fig, s, q.bd) : null;
    }
  }

  /* ---------- DOM ---------- */
  const el = (tag, attrs, parent) => {
    const n = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach((k) => n.setAttribute(k, attrs[k]));
    if (parent) parent.appendChild(n);
    return n;
  };
  const pts = (arr) => arr.map((p) => `${r1(p[0])},${r1(p[1])}`).join(' ');
  const seg = (n, a, b) => {
    n.setAttribute('x1', r1(a[0])); n.setAttribute('y1', r1(a[1]));
    n.setAttribute('x2', r1(b[0])); n.setAttribute('y2', r1(b[1]));
  };

  function dumbbell(parent, horizontal) {
    const g = el('g', {}, parent);
    if (horizontal) {
      el('line', { x1: -4.5, y1: 0, x2: 4.5, y2: 0, class: 'db-bar', 'stroke-width': 1.8 }, g);
      el('rect', { x: -7.4, y: -3.2, width: 3.4, height: 6.4, rx: 1.2, class: 'db-plate' }, g);
      el('rect', { x: 4, y: -3.2, width: 3.4, height: 6.4, rx: 1.2, class: 'db-plate' }, g);
    } else {
      el('circle', { cx: 0, cy: 0, r: 4.2, class: 'db-plate' }, g);
      el('circle', { cx: 0, cy: 0, r: 1.5, class: 'db-hub' }, g);
    }
    return g;
  }
  function dumbbellAxis(parent) {
    const g = el('g', {}, parent);
    el('line', { x1: 0, y1: 0, x2: 0, y2: 12, class: 'db-bar', 'stroke-width': 1.8 }, g);
    el('rect', { x: -3.8, y: -0.8, width: 7.6, height: 3.8, rx: 1.2, class: 'db-plate' }, g);
    el('rect', { x: -3.8, y: 9, width: 7.6, height: 3.8, rx: 1.2, class: 'db-plate' }, g);
    return g;
  }
  function kettlebell(parent) {
    const g = el('g', {}, parent);
    el('path', { d: 'M-3.4,3.4V0.6a3.4,3.4 0 0 1 6.8,0V3.4', class: 'kb-handle', 'stroke-width': 2 }, g);
    el('circle', { cx: 0, cy: 8, r: 5.4, class: 'kb-body' }, g);
    el('circle', { cx: -1.9, cy: 6.4, r: 1.3, class: 'kb-shine' }, g);
    return g;
  }

  function limbs(parent) {
    return {
      leg: el('polyline', { class: 'pants', 'stroke-width': 6.2 }, parent),
      foot: el('line', { class: 'shoe', 'stroke-width': 3.8 }, parent),
      up: el('line', { class: 'shirt', 'stroke-width': 5.4 }, parent),
      fore: el('line', { class: 'skin', 'stroke-width': 4.3 }, parent),
      hand: el('circle', { class: 'hand', r: 2.5 }, parent)
    };
  }

  function build(fig, view) {
    const front = view === 'front';
    const svg = el('svg', { viewBox: '0 0 100 100', class: 'fig-svg ' + (front ? 'is-front' : 'is-side'), 'aria-hidden': 'true', focusable: 'false' });
    const shadow = el('ellipse', { class: 'shadow', cx: 50, cy: 91.5, rx: 25, ry: 2.8 }, svg);
    const trace = el('path', { class: 'trace', d: '' }, svg);
    const prop = fig.prop;
    if (prop && prop.k === 'bar') {
      el('line', { class: 'bar-post', x1: 18, y1: 10, x2: 18, y2: 90, 'stroke-width': 1.6 }, svg);
      el('line', { class: 'bar-post', x1: 82, y1: 10, x2: 82, y2: 90, 'stroke-width': 1.6 }, svg);
      el('line', { class: 'bar-top', x1: 16, y1: 10, x2: 84, y2: 10, 'stroke-width': 2.8 }, svg);
    }
    const far = el('g', { class: 'far' }, svg);
    const L2 = limbs(far);
    let farProp = null;
    if (prop && prop.k === 'db2' && prop.g === 'both') farProp = dumbbell(far, front || fig.dbx);
    const body = el('g', { class: 'body' }, svg);
    const L1 = limbs(body);
    // El torso va sobre las piernas pero bajo el brazo cercano.
    const torso = el('line', { class: 'shirt', 'stroke-width': front ? 10 : 8.6 });
    body.insertBefore(torso, L1.up);
    let hipBar = null;
    let shBar = null;
    if (front) {
      hipBar = el('line', { class: 'pants', 'stroke-width': 6.6 });
      body.insertBefore(hipBar, torso);
      shBar = el('line', { class: 'shirt', 'stroke-width': 5.8 });
      body.insertBefore(shBar, L1.up);
    }
    const head = el('circle', { class: 'head', r: 5.9 }, body);
    const hair = el('path', { class: 'hair', d: 'M-6,0.6 A6,6 0 0 1 6,0.6 Q2.4,-2.4 -6,0.6Z' }, body);
    const eyes = front ? [el('circle', { class: 'eye', r: 0.85 }, body), el('circle', { class: 'eye', r: 0.85 }, body)] : [el('circle', { class: 'eye', r: 0.9 }, body)];
    let main = null;
    if (prop) {
      if (prop.k === 'kb') main = kettlebell(body);
      else if (prop.k === 'db1') main = dumbbellAxis(body);
      else if (prop.k === 'db2') main = dumbbell(body, front || fig.dbx);
    }
    return { svg, shadow, trace, L1, L2, torso, hipBar, shBar, head, hair, eyes, farProp, main, prop, front, fig };
  }

  function drawLimbs(L, lg, arm) {
    L.leg.setAttribute('points', pts(lg.slice(0, 3)));
    seg(L.foot, lg[2], lg[3]);
    seg(L.up, arm[0], arm[1]);
    seg(L.fore, arm[1], arm[2]);
    L.hand.setAttribute('cx', r1(arm[2][0]));
    L.hand.setAttribute('cy', r1(arm[2][1]));
  }

  function draw(c, q, bdOverride) {
    const s = solve(q, c.fig.view);
    seg(c.torso, s.hip, s.neck);
    if (c.front) { seg(c.hipBar, s.hip2, s.hip1); seg(c.shBar, s.sh2, s.sh1); }
    drawLimbs(c.L1, s.leg1, s.arm1);
    drawLimbs(c.L2, s.leg2, s.arm2);
    c.head.setAttribute('cx', r1(s.head[0])); c.head.setAttribute('cy', r1(s.head[1]));
    c.hair.setAttribute('transform', `translate(${r1(s.head[0])} ${r1(s.head[1])}) rotate(${r1(s.headRot)})`);

    // Ojos: miran hacia donde apunta la cara.
    const rot = rad(s.headRot);
    if (c.front) {
      c.eyes[0].setAttribute('cx', r1(s.head[0] - 2.1)); c.eyes[0].setAttribute('cy', r1(s.head[1] + 0.6));
      c.eyes[1].setAttribute('cx', r1(s.head[0] + 2.1)); c.eyes[1].setAttribute('cy', r1(s.head[1] + 0.6));
    } else {
      const fw = [Math.cos(rot), Math.sin(rot)];
      const up = [Math.sin(rot), -Math.cos(rot)];
      c.eyes[0].setAttribute('cx', r1(s.head[0] + fw[0] * 3 + up[0] * 0.4));
      c.eyes[0].setAttribute('cy', r1(s.head[1] + fw[1] * 3 + up[1] * 0.4));
    }

    // Sombra: sigue al cuerpo y se achica cuando los pies despegan.
    const xs = [s.leg1[2][0], s.leg2[2][0], s.leg1[3][0], s.hip[0], s.head[0], s.arm1[2][0]];
    const lowY = Math.max(s.leg1[2][1], s.leg2[2][1], s.hip[1], s.head[1]);
    const lift = Math.max(0, G - lowY);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const k = Math.max(0.45, 1 - lift * 0.022);
    c.shadow.setAttribute('cx', r1((minX + maxX) / 2));
    c.shadow.setAttribute('rx', r1(Math.max(12, Math.min(44, (maxX - minX) / 2 + 8)) * k));
    c.shadow.setAttribute('opacity', r1(k));

    const p = c.prop;
    if (p && c.main) {
      const bd = bdOverride == null ? q.bd : bdOverride;
      const h1 = s.arm1[2];
      const h2 = s.arm2[2];
      const at = (pt) => `translate(${r1(pt[0])} ${r1(pt[1])})`;
      if (p.k === 'db2') {
        c.main.setAttribute('transform', at(h1));
        if (c.farProp) c.farProp.setAttribute('transform', at(h2));
      } else {
        const pos = p.g === 'near' ? h1 : [(h1[0] + h2[0]) / 2, (h1[1] + h2[1]) / 2];
        const along = p.k === 'db1' ? 3 : 0;
        const d = dir(bd);
        c.main.setAttribute('transform', `translate(${r1(pos[0] + d[0] * along)} ${r1(pos[1] + d[1] * along)}) rotate(${r1(-bd)})`);
      }
    }
  }

  /* ---------- Línea de tiempo ---------- */
  const EASE = {
    io: (k) => 0.5 - 0.5 * Math.cos(Math.PI * k),
    out: (k) => 1 - Math.pow(1 - k, 3),
    in: (k) => k * k * k
  };

  function timeline(fig, n) {
    const seq = [];
    for (let i = 0; i < n; i++) seq.push(i);
    if (fig.loop !== 'cycle') for (let i = n - 2; i >= 1; i--) seq.push(i);
    const T = fig.T || 0.9;
    const hold = (fig.hold == null ? 0.18 : fig.hold) * T;
    const segs = [];
    let acc = 0;
    seq.forEach((from, k) => {
      const to = seq[(k + 1) % seq.length];
      const tp = fig.poses[to];
      const move = T * (tp.d || 1);
      segs.push({ from, to, start: acc, hold, move, e: EASE[tp.e] || EASE.io });
      acc += hold + move;
    });
    return { segs, total: acc };
  }
  function poseAt(c, time) {
    const tl = c.tl;
    const t = ((time % tl.total) + tl.total) % tl.total;
    let sg = tl.segs[tl.segs.length - 1];
    for (let i = 0; i < tl.segs.length; i++) {
      if (t < tl.segs[i].start + tl.segs[i].hold + tl.segs[i].move) { sg = tl.segs[i]; break; }
    }
    const local = t - sg.start;
    if (local <= sg.hold) return c.poses[sg.from];
    const k = Math.min(1, (local - sg.hold) / sg.move);
    return lerp(c.poses[sg.from], c.poses[sg.to], sg.e(k));
  }

  function drawTrace(c) {
    if (!c.fig.tr && !(c.fig.prop && c.fig.prop.k !== 'bar')) return;
    const N = 64;
    const path = [];
    for (let i = 0; i <= N; i++) {
      const q = poseAt(c, (c.tl.total * i) / N);
      const p = tracePoint(c.fig, solve(q, c.fig.view), q);
      if (p) path.push(`${i ? 'L' : 'M'}${r1(p[0])} ${r1(p[1])}`);
    }
    c.trace.setAttribute('d', path.join(''));
  }

  /* ---------- Animación ---------- */
  const live = new Set();
  let raf = 0;
  const reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function tickAll(now) {
    raf = 0;
    live.forEach((c) => {
      if (!c.svg.isConnected) { live.delete(c); return; }
      const q = poseAt(c, Math.max(0, now - c.t0) / 1000);
      // La pesa se balancea con algo de inercia (resorte amortiguado).
      let bd = null;
      if (c.prop && (c.prop.k === 'kb' || c.prop.k === 'db1')) {
        const dt = Math.min(0.05, Math.max(0.001, (now - (c.last || now)) / 1000)) || 0.016;
        if (c.bdA == null) { c.bdA = q.bd; c.bdV = 0; }
        const acc = 160 * (q.bd - c.bdA) - 15 * c.bdV;
        c.bdV += acc * dt;
        c.bdA += c.bdV * dt;
        bd = c.bdA;
      }
      c.last = now;
      draw(c, q, bd);
    });
    if (live.size) raf = requestAnimationFrame(tickAll);
  }
  function play(c) {
    if (!c.t0) c.t0 = performance.now();
    live.add(c);
    if (!raf) raf = requestAnimationFrame(tickAll);
  }

  // Las figuras de las tarjetas solo se animan mientras se ven en pantalla.
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          const c = en.target._fig;
          if (!c || !c.lazy) return;
          if (en.isIntersecting) play(c); else live.delete(c);
        });
      }, { rootMargin: '80px' })
    : null;

  /* Si existe img/ejercicios/<id>.<ext> se muestra en lugar del muñeco. */
  const photos = {};
  function findPhoto(id) {
    if (!photos[id]) {
      const ext = (window.FORJA && window.FORJA.IMG_EXT) || 'png';
      const url = `img/ejercicios/${id}.${ext}`;
      photos[id] = new Promise((res) => {
        const im = new Image();
        im.onload = () => res(url);
        im.onerror = () => res(null);
        im.src = url;
      });
    }
    return photos[id];
  }

  /* Postura "final" de cada ejercicio: la más representativa para una miniatura. */
  const endFrame = (fig) => (fig.loop === 'cycle' ? 1 : fig.poses.length - 1);

  /*
    opts: animate · lazy (solo en pantalla) · frame (0, 1… o 'end') · at (segundos de la animación)
          trace (dibuja la trayectoria) · photo (false: ignora la imagen propia)
  */
  function mount(host, id, opts) {
    opts = opts || {};
    if (!host) return;
    if (host._fig) { live.delete(host._fig); if (io) io.unobserve(host); }
    host.classList.remove('has-photo');
    host.textContent = '';
    const fig = FIGS[id];
    if (!fig) return;
    const c = build(fig, fig.view);
    c.poses = fig.poses.map((p) => norm(p, fig.view));
    c.tl = timeline(fig, c.poses.length);
    host.appendChild(c.svg);
    host._fig = c;
    if (opts.trace) drawTrace(c);
    if (opts.at != null) draw(c, poseAt(c, opts.at));
    else {
      let frame = opts.frame == null || opts.frame === 'end' ? endFrame(fig) : opts.frame;
      frame = Math.max(0, Math.min(frame, c.poses.length - 1));
      draw(c, c.poses[frame]);
    }
    if (opts.animate && !reduced()) {
      if (opts.lazy && io) { c.lazy = true; io.observe(host); } else play(c);
    }
    if (opts.photo !== false) {
      findPhoto(id).then((url) => {
        if (!url || host._fig !== c) return;
        live.delete(c);
        host.textContent = '';
        const img = document.createElement('img');
        img.className = 'fig-img';
        img.src = url;
        img.alt = '';
        img.decoding = 'async';
        host.appendChild(img);
        host.classList.add('has-photo');
      });
    }
  }

  function unmount(host) {
    if (host && host._fig) { live.delete(host._fig); if (io) io.unobserve(host); host._fig = null; host.textContent = ''; }
  }

  /*
    Rellena los [data-fig] de un contenedor.
    data-animate: animada siempre · data-live: animada solo mientras se ve · data-trace: con trayectoria
    data-frame: 0, 1… o "end" (por defecto) · data-nophoto: ignora la imagen propia
  */
  function hydrate(root) {
    (root || document).querySelectorAll('[data-fig]').forEach((h) => {
      if (h._fig) return;
      const f = h.dataset.frame;
      mount(h, h.dataset.fig, {
        animate: h.hasAttribute('data-animate') || h.hasAttribute('data-live'),
        lazy: h.hasAttribute('data-live'),
        trace: h.hasAttribute('data-trace'),
        frame: f == null ? 'end' : (f === 'end' ? 'end' : Number(f)),
        photo: !h.hasAttribute('data-nophoto')
      });
    });
  }

  window.FIG = {
    mount, unmount, hydrate,
    has: (id) => !!FIGS[id],
    ids: () => Object.keys(FIGS),
    total: (id) => (FIGS[id] ? timeline(FIGS[id], FIGS[id].poses.length).total : 0)
  };
})();
