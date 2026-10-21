/*
  Datos de Forja: ejercicios y rutinas.
  Todos los ejercicios se hacen DE PIE (nada en el suelo).
  Para cambiar o agregar una rutina, edita ROUTINES más abajo.
*/
(function () {
  const CATS = {
    mix: { label: 'Cardio y fuerza', icon: 'bolt' },
    kb: { label: 'Pesa rusa', icon: 'kettlebell' },
    db: { label: 'Mancuernas', icon: 'dumbbell' },
    mob: { label: 'Movilidad', icon: 'stretch' }
  };

  // n: nombre · m: músculos · c: indicación · swap: cambiar de lado a mitad de tiempo
  const EX = {
    // Calentamiento y movilidad
    brazos: { n: 'Círculos de brazos', m: ['Hombros'], c: 'Círculos amplios hacia adelante y luego hacia atrás.' },
    cadera: { n: 'Círculos de cadera', m: ['Cadera'], c: 'Pies firmes y dibuja círculos grandes con la pelvis.' },
    marcha: { n: 'Marcha en el sitio', m: ['Cardio'], c: 'Rodillas altas suaves y braceo natural.' },
    aire: { n: 'Sentadilla de aire', m: ['Piernas', 'Glúteos'], c: 'Pecho arriba y rodillas siguiendo la línea de los pies.' },
    torso: { n: 'Rotación de torso', m: ['Core'], c: 'Gira desde la cintura con los brazos sueltos.' },
    bisagra: { n: 'Bisagra de cadera', m: ['Isquios', 'Glúteos'], c: 'Cadera hacia atrás, espalda recta, siente el estiramiento detrás del muslo.' },
    halo: { n: 'Halo con pesa', m: ['Hombros', 'Core'], c: 'Pesa alrededor de la cabeza con los codos pegados y el abdomen firme. Cambia de sentido a la mitad.', swap: true },
    quad: { n: 'Estiramiento de cuádriceps', m: ['Cuádriceps'], c: 'Talón al glúteo con las rodillas juntas. Cambia de pierna a la mitad.', swap: true },
    isquios: { n: 'Estiramiento de isquios', m: ['Isquios'], c: 'Talón adelante, espalda larga, inclínate desde la cadera. Cambia de pierna a la mitad.', swap: true },
    pecho: { n: 'Apertura de pecho', m: ['Pecho', 'Hombros'], c: 'Manos entrelazadas atrás y abre el pecho sin arquear la espalda.' },
    triest: { n: 'Estiramiento de tríceps', m: ['Tríceps'], c: 'Codo arriba, mano a la espalda. Cambia de brazo a la mitad.', swap: true },
    lateral: { n: 'Inclinación lateral', m: ['Oblicuos'], c: 'Brazo arriba e inclínate hacia un lado sin girar. Cambia de lado a la mitad.', swap: true },

    // Cardio de pie, sin pesas
    jacks: { n: 'Jumping jacks', m: ['Cardio', 'Cuerpo completo'], c: 'Aterriza suave y mantén un ritmo constante.' },
    rodillas: { n: 'Rodillas arriba', m: ['Cardio', 'Core'], c: 'Sube las rodillas a la cadera con los brazos acompañando.' },
    patinador: { n: 'Patinador', m: ['Cardio', 'Glúteos'], c: 'Salto lateral largo, aterriza en una pierna y controla.' },
    sqjump: { n: 'Sentadilla con salto', m: ['Piernas', 'Cardio'], c: 'Baja controlado, salta explosivo y aterriza suave.' },
    boxeo: { n: 'Boxeo en sombra', m: ['Cardio', 'Brazos', 'Core'], c: 'Golpes rápidos, gira la cadera y mantén la guardia arriba.' },
    kneecrunch: { n: 'Rodilla al codo', m: ['Abdomen', 'Cardio'], c: 'Manos tras la cabeza, lleva el codo a la rodilla contraria y alterna.' },

    // Pesa rusa
    swing: { n: 'Swing con pesa rusa', m: ['Glúteos', 'Espalda baja', 'Cardio'], c: 'Bisagra de cadera, no sentadilla. La cadera lanza la pesa a la altura del pecho y los brazos van relajados.' },
    swing1: { n: 'Swing a una mano', m: ['Glúteos', 'Core', 'Cardio'], c: 'Mismo gesto, el core evita que el torso gire. Cambia de mano a la mitad.', swap: true },
    goblet: { n: 'Sentadilla goblet', m: ['Piernas', 'Glúteos', 'Core'], c: 'Pesa pegada al pecho, codos entre las rodillas y pecho arriba.' },
    cleanpress: { n: 'Clean y press', m: ['Hombros', 'Glúteos', 'Brazos'], c: 'Lleva la pesa al hombro y empuja arriba con las piernas. Alterna el brazo en cada repetición.' },
    woodchop: { n: 'Leñador con pesa', m: ['Abdomen', 'Oblicuos', 'Hombros'], c: 'De la cadera al hombro opuesto, girando pies y torso. Cambia de lado a la mitad.', swap: true },
    thruster: { n: 'Thruster con pesa', m: ['Piernas', 'Hombros', 'Cardio'], c: 'Sentadilla con la pesa al hombro y empuje arriba al subir, en un solo movimiento fluido.' },
    highpull: { n: 'High pull', m: ['Espalda', 'Hombros', 'Cardio'], c: 'Impulsa con la cadera y sube el codo hasta la altura del hombro.' },
    curl: { n: 'Curl con pesa rusa', m: ['Bíceps'], c: 'Codos pegados al torso, sube controlado y baja lento.' },
    triext: { n: 'Extensión de tríceps', m: ['Tríceps'], c: 'Pesa detrás de la cabeza con ambas manos, codos al frente y extiende arriba.' },
    marchapesa: { n: 'Marcha con pesa al hombro', m: ['Core', 'Cardio'], c: 'Pesa al hombro, abdomen apretado y rodillas altas sin inclinarte.' },
    ocho: { n: 'Ocho entre las piernas', m: ['Core', 'Glúteos', 'Cardio'], c: 'Piernas abiertas, pasa la pesa en forma de ocho alrededor de las piernas.' },
    giro: { n: 'Giro de torso con pesa', m: ['Oblicuos', 'Core'], c: 'Pesa al pecho y gira el torso a cada lado con la cadera firme.' },
    pressoh: { n: 'Press de hombro con pesa', m: ['Hombros', 'Tríceps'], c: 'Empuja recto hacia arriba con las costillas abajo. Cambia de brazo a la mitad.', swap: true },

    // Mancuernas
    dpress: { n: 'Press de hombros', m: ['Hombros', 'Tríceps'], c: 'Mancuernas a la altura de las orejas y empuja arriba sin arquear la espalda.' },
    dremo: { n: 'Remo inclinado', m: ['Espalda', 'Bíceps'], c: 'Cadera atrás, espalda recta, codos hacia la cadera y aprieta las escápulas.' },
    dgoblet: { n: 'Sentadilla con mancuerna', m: ['Piernas', 'Glúteos'], c: 'Mancuerna al pecho, pecho arriba y baja hasta donde la espalda siga recta.' },
    drdl: { n: 'Peso muerto rumano', m: ['Isquios', 'Glúteos', 'Espalda baja'], c: 'Rodillas suaves, baja las mancuernas pegadas a las piernas con la cadera atrás.' },
    drev: { n: 'Zancada reversa', m: ['Piernas', 'Glúteos'], c: 'Paso largo hacia atrás con el torso erguido. Alterna las piernas.' },
    dlat: { n: 'Elevaciones laterales', m: ['Hombros'], c: 'Sube hasta la altura del hombro con los codos ligeramente flexionados.' },
    dfly: { n: 'Pájaros inclinado', m: ['Espalda alta', 'Hombros'], c: 'Torso inclinado y abre los brazos como alas.' },
    dhammer: { n: 'Curl martillo', m: ['Bíceps', 'Antebrazo'], c: 'Palmas enfrentadas y codos fijos al costado.' },
    dtri: { n: 'Tríceps tras nuca', m: ['Tríceps'], c: 'Una mancuerna con ambas manos detrás de la cabeza y extiende arriba.' },
    dsumo: { n: 'Sentadilla sumo', m: ['Piernas', 'Glúteos'], c: 'Pies anchos con las puntas hacia afuera y la mancuerna colgando entre las piernas.' },
    dsl: { n: 'Peso muerto a una pierna', m: ['Glúteos', 'Isquios', 'Equilibrio'], c: 'Cadera atrás, pierna libre extendida y espalda recta. Cambia de pierna a la mitad.' },
    dcalf: { n: 'Elevación de talones', m: ['Pantorrillas'], c: 'Sube lento a puntas de pie y haz una pausa arriba.' },
    dthr: { n: 'Thruster con mancuernas', m: ['Piernas', 'Hombros', 'Cardio'], c: 'Sentadilla con las mancuernas a los hombros y empuje arriba al subir.' },
    dchop: { n: 'Leñador con mancuerna', m: ['Oblicuos', 'Core'], c: 'Diagonal de la cadera al hombro opuesto, girando pies y torso.' },
    dside: { n: 'Inclinación con mancuerna', m: ['Oblicuos'], c: 'Mancuerna en una mano, inclínate al costado sin girar y sube con el abdomen.' }
  };

  const i = (ex, o) => Object.assign({ ex }, o);

  /*
    Sección: { title, rounds, work (seg), rest (seg), roundRest (seg entre rondas), items }
    Ítem: i('id')  -> por tiempo (usa work de la sección)
          i('id', { reps: 10, per: 'por lado' }) -> por repeticiones, tú tocas "Listo"
  */
  const ROUTINES = [
    {
      id: 'pdf',
      cat: 'mix',
      name: 'Cardio + Fuerza',
      tagline: 'Circuito que intercala cardio y fuerza. Se hace día por medio, entre las rutinas con pesas.',
      focus: ['Cardio', 'Fuerza', 'Cuerpo completo'],
      template: true,
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 10, items: [i('brazos'), i('cadera'), i('marcha'), i('aire')] },
        { title: 'Circuito', rounds: 4, work: 40, rest: 20, roundRest: 60, items: [i('jacks'), i('dgoblet'), i('patinador'), i('dremo'), i('rodillas'), i('dpress')] },
        { title: 'Final', rounds: 2, work: 30, rest: 15, roundRest: 30, items: [i('boxeo'), i('kneecrunch')] }
      ]
    },
    {
      id: 'kb-full',
      cat: 'kb',
      name: 'Cuerpo completo',
      tagline: 'Quema de grasa, cardio, abdomen y brazos con una sola pesa rusa.',
      focus: ['Quema grasa', 'Cardio', 'Abdomen', 'Brazos'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 10, items: [i('brazos'), i('halo'), i('bisagra'), i('aire')] },
        { title: 'Potencia', rounds: 4, work: 40, rest: 20, roundRest: 60, items: [i('swing'), i('goblet'), i('cleanpress'), i('woodchop'), i('thruster'), i('marchapesa')] },
        { title: 'Brazos y abdomen', rounds: 2, work: 30, rest: 15, roundRest: 30, items: [i('curl'), i('triext'), i('giro')] }
      ]
    },
    {
      id: 'kb-abs-arms',
      cat: 'kb',
      name: 'Abdomen y brazos',
      tagline: 'Core de pie, brazos y hombros, con swings para mantener el pulso alto.',
      focus: ['Abdomen', 'Brazos', 'Cardio'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 10, items: [i('brazos'), i('torso'), i('halo'), i('bisagra')] },
        { title: 'Circuito', rounds: 4, work: 40, rest: 20, roundRest: 45, items: [i('swing1'), i('ocho'), i('pressoh'), i('giro'), i('curl'), i('woodchop')] },
        { title: 'Final', rounds: 2, work: 30, rest: 10, roundRest: 30, items: [i('highpull'), i('marchapesa')] }
      ]
    },
    {
      id: 'db-upper',
      cat: 'db',
      name: 'Tren superior',
      tagline: 'Hombros, espalda y brazos en superseries.',
      focus: ['Hombros', 'Espalda', 'Brazos'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 5, items: [i('brazos'), i('torso')] },
        { title: 'Bloque 1', rounds: 3, rest: 30, roundRest: 60, items: [i('dpress', { reps: 10 }), i('dremo', { reps: 12 })] },
        { title: 'Bloque 2', rounds: 3, rest: 30, roundRest: 60, items: [i('dlat', { reps: 12 }), i('dfly', { reps: 12 })] },
        { title: 'Bloque 3', rounds: 3, rest: 30, roundRest: 60, items: [i('dhammer', { reps: 12 }), i('dtri', { reps: 12 })] },
        { title: 'Core de pie', rounds: 2, rest: 20, roundRest: 30, items: [i('dchop', { reps: 12, per: 'por lado' }), i('dside', { reps: 15, per: 'por lado' })] }
      ]
    },
    {
      id: 'db-lower',
      cat: 'db',
      name: 'Piernas y glúteos',
      tagline: 'Fuerza de piernas con mancuernas y un final de cardio.',
      focus: ['Piernas', 'Glúteos'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 5, items: [i('aire'), i('cadera'), i('bisagra')] },
        { title: 'Bloque 1', rounds: 3, rest: 30, roundRest: 60, items: [i('dgoblet', { reps: 12 }), i('drdl', { reps: 12 })] },
        { title: 'Bloque 2', rounds: 3, rest: 30, roundRest: 60, items: [i('drev', { reps: 10, per: 'por lado' }), i('dsumo', { reps: 12 })] },
        { title: 'Bloque 3', rounds: 3, rest: 30, roundRest: 60, items: [i('dsl', { reps: 8, per: 'por lado' }), i('dcalf', { reps: 15 })] },
        { title: 'Final', rounds: 2, work: 40, rest: 20, roundRest: 30, items: [i('dthr')] }
      ]
    },
    {
      id: 'mov',
      cat: 'mob',
      name: 'Movilidad de pie',
      tagline: 'Estiramientos suaves para un día de descanso.',
      focus: ['Movilidad', 'Recuperación'],
      sections: [
        { title: 'Movilidad', rounds: 1, work: 40, rest: 5, items: [i('torso'), i('brazos'), i('cadera'), i('quad'), i('isquios'), i('pecho'), i('triest'), i('lateral')] }
      ]
    }
  ];

  // Lunes a domingo. Cardio + Fuerza día por medio, pesas en los días intermedios.
  const DEFAULT_PLAN = ['pdf', 'kb-full', 'pdf', 'db-upper', 'pdf', 'kb-abs-arms', 'rest'];

  // Extensión de las imágenes de referencia en img/ejercicios/<id>.<ext> (png, jpg o webp).
  const IMG_EXT = 'png';

  window.FORJA = { CATS, EX, ROUTINES, DEFAULT_PLAN, IMG_EXT };
})();
