/*
  Datos de Forja: ejercicios, rutinas y programa de 15 semanas.
  Para cambiar o agregar una rutina, edita ROUTINES. El programa del PDF está en PROGRAM.
*/
(function () {
  const CATS = {
    mix: { label: 'Cardio y fuerza', icon: 'bolt' },
    kb: { label: 'Pesa rusa', icon: 'kettlebell' },
    db: { label: 'Mancuernas', icon: 'dumbbell' },
    mob: { label: 'Movilidad', icon: 'stretch' }
  };

  const GOALS = { volumen: 'Volumen', cardio: 'Cardio', fuerza: 'Fuerza', core: 'Abdomen', mov: 'Movilidad' };

  /*
    n: nombre · m: músculos · c: indicación · swap: cambiar de lado a mitad de tiempo
    t: segundos por repetición (para estimar la duración) · floor: se hace en el suelo · gear: material
  */
  const EX = {
    // Calentamiento y movilidad
    brazos: { n: 'Círculos de brazos', m: ['Hombros'], c: 'Círculos amplios hacia adelante y luego hacia atrás.' },
    cadera: { n: 'Círculos de cadera', m: ['Cadera'], c: 'Pies firmes y dibuja círculos grandes con la pelvis.' },
    marcha: { n: 'Marcha en el sitio', m: ['Cardio'], c: 'Rodillas altas suaves y braceo natural.' },
    aire: { n: 'Sentadilla de aire', m: ['Piernas', 'Glúteos'], c: 'Pecho arriba y rodillas siguiendo la línea de los pies.', t: 2 },
    torso: { n: 'Rotación de torso', m: ['Core'], c: 'Gira desde la cintura con los brazos sueltos.' },
    bisagra: { n: 'Bisagra de cadera', m: ['Isquios', 'Glúteos'], c: 'Cadera hacia atrás, espalda recta, siente el estiramiento detrás del muslo.' },
    halo: { n: 'Halo con pesa', m: ['Hombros', 'Core'], c: 'Pesa alrededor de la cabeza con los codos pegados y el abdomen firme. Cambia de sentido a la mitad.', swap: true },
    quad: { n: 'Estiramiento de cuádriceps', m: ['Cuádriceps'], c: 'Talón al glúteo con las rodillas juntas. Cambia de pierna a la mitad.', swap: true },
    isquios: { n: 'Estiramiento de isquios', m: ['Isquios'], c: 'Talón adelante, espalda larga, inclínate desde la cadera. Cambia de pierna a la mitad.', swap: true },
    pecho: { n: 'Apertura de pecho', m: ['Pecho', 'Hombros'], c: 'Manos entrelazadas atrás y abre el pecho sin arquear la espalda.' },
    triest: { n: 'Estiramiento de tríceps', m: ['Tríceps'], c: 'Codo arriba, mano a la espalda. Cambia de brazo a la mitad.', swap: true },
    lateral: { n: 'Inclinación lateral', m: ['Oblicuos'], c: 'Brazo arriba e inclínate hacia un lado sin girar. Cambia de lado a la mitad.', swap: true },

    // Cardio de pie, sin pesas
    jacks: { n: 'Jumping jacks', m: ['Cardio', 'Cuerpo completo'], c: 'Aterriza suave y mantén un ritmo constante.', t: 1 },
    rodillas: { n: 'Rodillas arriba', m: ['Cardio', 'Core'], c: 'Sube las rodillas a la cadera con los brazos acompañando.' },
    patinador: { n: 'Patinador', m: ['Cardio', 'Glúteos'], c: 'Salto lateral largo, aterriza en una pierna y controla.' },
    sqjump: { n: 'Sentadilla con salto', m: ['Piernas', 'Cardio'], c: 'Baja controlado, salta explosivo y aterriza suave.' },
    boxeo: { n: 'Boxeo en sombra', m: ['Cardio', 'Brazos', 'Core'], c: 'Golpes rápidos, gira la cadera y mantén la guardia arriba.' },
    kneecrunch: { n: 'Rodilla al codo', m: ['Abdomen', 'Cardio'], c: 'Manos tras la cabeza, lleva el codo a la rodilla contraria y alterna.' },
    highjump: { n: 'Saltos altos', m: ['Piernas', 'Cardio'], c: 'Flexiona las rodillas y salta lo más alto que puedas con los brazos arriba.', t: 2.5 },
    deepsq: { n: 'Sentadilla profunda', m: ['Piernas', 'Glúteos'], c: 'Baja con la espalda recta hasta pasar la horizontal y sube empujando con los talones.', t: 2.5 },
    run: { n: 'Correr', m: ['Cardio', 'Piernas'], c: 'Ritmo constante y respiración controlada.' },

    // Calistenia del programa
    burpee: { n: 'Burpee', m: ['Cuerpo completo', 'Cardio'], c: 'Agáchate, lleva los pies atrás a plancha, baja el pecho, vuelve y salta con las manos arriba.', t: 3.5, floor: true },
    pushup: { n: 'Flexiones', m: ['Pecho', 'Tríceps', 'Core'], c: 'Cuerpo recto como una tabla: baja el pecho al suelo y empuja hasta estirar los brazos.', t: 2, floor: true },
    pullup: { n: 'Dominadas', m: ['Espalda', 'Bíceps'], c: 'Cuelga de la barra y sube hasta pasar la barbilla; baja controlado hasta estirar los brazos.', t: 3.5, gear: 'Barra de dominadas' },
    situp: { n: 'Abdominales', m: ['Abdomen'], c: 'Acostado con las rodillas dobladas, sube el torso hasta sentarte y baja controlado.', t: 2, floor: true },
    leglever: { n: 'Elevación de piernas', m: ['Abdomen', 'Cadera'], c: 'Acostado, sube las piernas rectas hasta la vertical y baja sin tocar el suelo.', t: 2.5, floor: true },
    jackknife: { n: 'Jackknife (V-up)', m: ['Abdomen'], c: 'Acostado, sube torso y piernas a la vez para tocar los pies en forma de V.', t: 3, floor: true },
    climbers: { n: 'Escaladores', m: ['Core', 'Cardio'], c: 'En plancha, lleva una rodilla al pecho y alterna rápido las piernas.', t: 1, floor: true },

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
    snatch: { n: 'Arranque (snatch)', m: ['Cuerpo completo', 'Hombros', 'Cardio'], c: 'Swing a una mano que termina con la pesa arriba y el brazo estirado. Mete la mano por dentro al final para que la pesa no golpee el antebrazo. Cambia de mano a la mitad.', swap: true },
    kbclean: { n: 'Clean con pesa rusa', m: ['Cadera', 'Brazos', 'Core'], c: 'Desde la bisagra, tira con la cadera y lleva la pesa al hombro con el codo pegado; recíbela suave sobre el antebrazo. Cambia de brazo a la mitad.', swap: true },
    pushpress: { n: 'Push press', m: ['Hombros', 'Piernas', 'Tríceps'], c: 'Pesa al hombro, flexiona un poco las rodillas y empuja con piernas y brazo a la vez hasta bloquear arriba. Cambia de brazo a la mitad.', swap: true },
    kbdl: { n: 'Peso muerto con pesa rusa', m: ['Glúteos', 'Isquios', 'Espalda baja'], c: 'Pesa entre los pies, cadera atrás y espalda recta; sube empujando el suelo y aprieta los glúteos arriba.' },
    kbsumo: { n: 'Sentadilla sumo con pesa rusa', m: ['Piernas', 'Glúteos', 'Aductores'], c: 'Pies anchos con las puntas afuera y la pesa colgando entre las piernas; baja con el pecho arriba.' },
    kbrow: { n: 'Remo a una mano con pesa rusa', m: ['Espalda', 'Bíceps'], c: 'Un pie adelante y la mano libre en la rodilla; lleva el codo hacia la cadera sin girar el torso. Cambia de brazo a la mitad.', swap: true },
    kblunge: { n: 'Zancada con pesa al pecho', m: ['Piernas', 'Glúteos', 'Core'], c: 'Pesa pegada al pecho, paso largo hacia atrás y rodilla casi al suelo. Alterna las piernas.' },
    latlunge: { n: 'Zancada lateral con pesa', m: ['Piernas', 'Glúteos', 'Aductores'], c: 'Paso al costado y baja sobre esa pierna con la otra estirada; vuelve al centro. Cambia de lado a la mitad.', swap: true },
    windmill: { n: 'Molino con pesa rusa', m: ['Oblicuos', 'Hombros', 'Cadera'], c: 'Pesa arriba con el brazo bloqueado y la mirada en ella; empuja la cadera hacia el lado y baja la otra mano por la pierna. Cambia de lado a la mitad.', swap: true },
    around: { n: 'Pase alrededor del cuerpo', m: ['Core', 'Hombros'], c: 'Pasa la pesa de una mano a la otra alrededor de la cintura sin mover la cadera. Cambia de sentido a la mitad.', swap: true },
    suitcase: { n: 'Marcha con pesa a un lado', m: ['Core', 'Oblicuos', 'Agarre'], c: 'Pesa colgando a un lado y hombros nivelados; marcha sin inclinarte. Cambia de mano a la mitad.', swap: true },
    kbfront: { n: 'Elevación frontal con pesa', m: ['Hombros'], c: 'Brazos casi rectos, sube la pesa hasta la altura de los hombros y baja lento.' },
    goodmorning: { n: 'Buenos días con pesa', m: ['Isquios', 'Glúteos', 'Espalda baja'], c: 'Pesa al pecho y rodillas suaves; inclina el torso llevando la cadera atrás con la espalda recta.' },
    kbsl: { n: 'Peso muerto a una pierna con pesa', m: ['Glúteos', 'Isquios', 'Equilibrio'], c: 'Pesa en la mano contraria a la pierna de apoyo; cadera atrás y pierna libre estirada. Cambia de lado a la mitad.', swap: true },

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
    dside: { n: 'Inclinación con mancuerna', m: ['Oblicuos'], c: 'Mancuerna en una mano, inclínate al costado sin girar y sube con el abdomen.' },
    darnold: { n: 'Press Arnold', m: ['Hombros', 'Tríceps'], c: 'Empieza con las palmas hacia ti a la altura del mentón y gíralas hacia adelante mientras empujas arriba.' },
    dfront: { n: 'Elevación frontal con mancuernas', m: ['Hombros'], c: 'Brazos casi rectos, sube al frente hasta la altura de los hombros y baja lento.' },
    duprow: { n: 'Remo al mentón', m: ['Hombros', 'Trapecio'], c: 'Mancuernas pegadas al cuerpo; sube los codos hacia los lados hasta la altura del pecho.' },
    dwalk: { n: 'Zancada caminando', m: ['Piernas', 'Glúteos'], c: 'Paso largo hacia adelante bajando la rodilla de atrás; alterna avanzando con el torso erguido.' },
    dfarmer: { n: 'Paseo del granjero', m: ['Agarre', 'Core', 'Trapecio'], c: 'Mancuernas pesadas a los lados y hombros atrás; marcha o camina con pasos cortos.' },
    dkickback: { n: 'Patada de tríceps', m: ['Tríceps'], c: 'Torso inclinado y codos pegados atrás; estira el antebrazo hacia atrás y aprieta.' },
    dcurl: { n: 'Curl de bíceps', m: ['Bíceps'], c: 'Palmas hacia arriba y codos fijos al costado; sube controlado y baja lento.' }
  };

  // Grupos de la biblioteca de ejercicios.
  const EXGROUPS = [
    { id: 'kb', label: 'Pesa rusa', cat: 'kb' },
    { id: 'db', label: 'Mancuernas', cat: 'db' },
    { id: 'bw', label: 'Peso corporal', cat: 'mix' },
    { id: 'mob', label: 'Movilidad', cat: 'mob' }
  ];
  const KB_IDS = ['halo', 'swing', 'swing1', 'goblet', 'cleanpress', 'woodchop', 'thruster', 'highpull', 'curl', 'triext', 'marchapesa', 'ocho', 'giro', 'pressoh',
    'snatch', 'kbclean', 'pushpress', 'kbdl', 'kbsumo', 'kbrow', 'kblunge', 'latlunge', 'windmill', 'around', 'suitcase', 'kbfront', 'goodmorning', 'kbsl'];
  const MOB_IDS = ['brazos', 'cadera', 'torso', 'bisagra', 'quad', 'isquios', 'pecho', 'triest', 'lateral'];
  Object.keys(EX).forEach((id) => {
    EX[id].g = KB_IDS.includes(id) ? 'kb' : MOB_IDS.includes(id) ? 'mob' : id.charAt(0) === 'd' && id !== 'deepsq' ? 'db' : 'bw';
  });

  /*
    Ítem: i('id')                              por tiempo (usa work de la sección)
          i('id', { reps: 10, per: 'por lado' }) por repeticiones, tú tocas "Listo"
          i('id', { reps: [50, 40, 30] })       repeticiones distintas en cada ronda
          i('id', { work: 100, max: true })     tiempo fijo, tantas repeticiones como puedas
    Sección: { title, rounds, work (seg), rest (seg), roundRest (seg entre rondas), pause (seg al terminar), items }
  */
  const i = (ex, o) => Object.assign({ ex }, o);
  const reps = (ex, n, per) => i(ex, { reps: n, per });

  const PDF = { cat: 'mix', src: 'pdf' };
  const ROUTINES = [
    // ---- Entrenamientos del PDF ----
    Object.assign({
      id: 'aphrodite', name: 'Aphrodite', goal: 'cardio',
      tagline: '5 rondas que bajan de 50 a 10 repeticiones: burpees, sentadillas y abdominales.',
      focus: ['Cardio', 'Resistencia', 'Sin pesas'],
      sections: [{ title: '5 rondas', rounds: 5, items: [reps('burpee', [50, 40, 30, 20, 10]), reps('aire', [50, 40, 30, 20, 10]), reps('situp', [50, 40, 30, 20, 10])] }]
    }, PDF),
    Object.assign({
      id: 'artemis', name: 'Artemis', goal: 'cardio',
      tagline: 'Una sola ronda larga: burpees, dominadas, flexiones y sentadillas.',
      focus: ['Resistencia', 'Cuerpo completo'],
      sections: [{ title: '1 ronda', rounds: 1, items: [reps('burpee', 50), reps('pullup', 50), reps('pushup', 100), reps('aire', 150), reps('burpee', 50)] }]
    }, PDF),
    Object.assign({
      id: 'hades', name: 'Hades', goal: 'cardio',
      tagline: '3 rondas de burpees, dominadas, flexiones y una carrera corta.',
      focus: ['Cardio', 'Resistencia'],
      sections: [{ title: '3 rondas', rounds: 3, items: [reps('burpee', 25), reps('pullup', 15), reps('pushup', 15), reps('burpee', 25), reps('run', 80, 'm')] }]
    }, PDF),
    Object.assign({
      id: 'iris', name: 'Iris', goal: 'cardio',
      tagline: 'Un kilómetro, 5 rondas de jumping jacks y escaladores, y otro kilómetro.',
      focus: ['Cardio', 'Correr'],
      sections: [
        { title: 'Salida', rounds: 1, items: [reps('run', 1, 'km')] },
        { title: '5 rondas', rounds: 5, items: [reps('jacks', 100), reps('climbers', 100)] },
        { title: 'Cierre', rounds: 1, items: [reps('run', 1, 'km')] }
      ]
    }, PDF),
    Object.assign({
      id: 'venus', name: 'Venus', goal: 'fuerza',
      tagline: '4 rondas de flexiones, jackknives y sentadillas profundas.',
      focus: ['Pecho', 'Abdomen', 'Piernas'],
      sections: [{ title: '4 rondas', rounds: 4, items: [reps('pushup', 50), reps('jackknife', 20), reps('deepsq', 50)] }]
    }, PDF),
    Object.assign({
      id: 'poseidon', name: 'Poseidon', goal: 'fuerza',
      tagline: 'Dominadas y flexiones en 4 rondas que bajan: 20, 15, 10 y 5.',
      focus: ['Espalda', 'Pecho'],
      sections: [{ title: '4 rondas', rounds: 4, items: [reps('pullup', [20, 15, 10, 5]), reps('pushup', [20, 15, 10, 5])] }]
    }, PDF),
    Object.assign({
      id: 'dione', name: 'Dione', goal: 'cardio',
      tagline: 'Entrenamiento de cardio: 3 rondas de saltos, burpees y abdominales.',
      focus: ['Cardio', 'Abdomen'],
      sections: [{ title: '3 rondas', rounds: 3, items: [reps('jacks', 75), reps('burpee', 25), reps('leglever', 50), reps('jacks', 75), reps('situp', 50), reps('burpee', 25)] }]
    }, PDF),
    Object.assign({
      id: 'zeus', name: 'Zeus', goal: 'fuerza',
      tagline: 'Entrenamiento de fuerza con descansos obligatorios de 2 minutos entre rondas.',
      focus: ['Fuerza', 'Cuerpo completo'],
      note: 'Necesita una barra de dominadas. El PDF no dice cuántas rondas son; se dejaron 3 y se pueden cambiar en js/data.js.',
      sections: [{ title: '3 rondas', rounds: 3, roundRest: 120, items: [reps('pullup', 15), reps('pushup', 25), reps('situp', 35), reps('aire', 45)] }]
    }, PDF),
    Object.assign({
      id: 'metis', name: 'Metis', goal: 'cardio',
      tagline: 'Muy corto y a toda velocidad, sin pausas: burpees, escaladores y saltos.',
      focus: ['Cardio', 'Velocidad'],
      sections: [{ title: '3 rondas', rounds: 3, items: [reps('burpee', [10, 25, 10]), reps('climbers', [10, 25, 10]), reps('highjump', [10, 25, 10])] }]
    }, PDF),
    Object.assign({
      id: 'pullmax', name: 'Pullup MAX', goal: 'fuerza',
      tagline: '100 segundos de dominadas, tantas como puedas.',
      focus: ['Espalda', 'Máximo'],
      sections: [{ title: 'Máximo', rounds: 1, items: [i('pullup', { work: 100, max: true })] }]
    }, PDF),
    Object.assign({
      id: 'pushmax', name: 'Push-up MAX', goal: 'fuerza',
      tagline: '100 segundos de flexiones sin pausas, tantas como puedas.',
      focus: ['Pecho', 'Máximo'],
      sections: [{ title: 'Máximo', rounds: 1, items: [i('pushup', { work: 100, max: true })] }]
    }, PDF),
    Object.assign({
      id: 'burpeemax', name: 'Burpee MAX', goal: 'cardio',
      tagline: '5 minutos de burpees, tantos como puedas.',
      focus: ['Cardio', 'Máximo'],
      sections: [{ title: 'Máximo', rounds: 1, items: [i('burpee', { work: 300, max: true })] }]
    }, PDF),
    Object.assign({
      id: 'squatmax', name: 'Squat MAX', goal: 'fuerza',
      tagline: '5 minutos de sentadillas sin pausas, tantas como puedas.',
      focus: ['Piernas', 'Máximo'],
      sections: [{ title: 'Máximo', rounds: 1, items: [i('aire', { work: 300, max: true })] }]
    }, PDF),
    Object.assign({
      id: 'situpmax', name: 'Situp MAX', goal: 'fuerza',
      tagline: '5 minutos de abdominales, tantas como puedas.',
      focus: ['Abdomen', 'Máximo'],
      sections: [{ title: 'Máximo', rounds: 1, items: [i('situp', { work: 300, max: true })] }]
    }, PDF),

    // ---- Pesa rusa ----
    {
      id: 'kb-vol', cat: 'kb', goal: 'volumen', name: 'Full body volumen',
      tagline: 'Piernas, empuje, tirón y core con una pesa rusa, en series con descanso.',
      focus: ['Volumen', 'Cuerpo completo', 'Fuerza'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 10, items: [i('brazos'), i('halo'), i('bisagra'), i('aire')] },
        { title: 'Bloque 1', rounds: 4, rest: 30, roundRest: 90, items: [reps('goblet', 12), reps('pressoh', 8, 'por lado'), reps('swing', 20)] },
        { title: 'Bloque 2', rounds: 3, rest: 30, roundRest: 90, items: [reps('highpull', 10), reps('thruster', 10), reps('curl', 12), reps('triext', 12)] },
        { title: 'Core de pie', rounds: 3, rest: 20, roundRest: 45, items: [reps('woodchop', 10, 'por lado'), reps('giro', 20)] }
      ]
    },
    {
      id: 'kb-full', cat: 'kb', goal: 'cardio', name: 'Cuerpo completo',
      tagline: 'Full body completo con una pesa rusa: piernas, empuje, tirón, cardio, brazos y abdomen.',
      focus: ['Quema grasa', 'Cardio', 'Abdomen', 'Brazos'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 10, items: [i('brazos'), i('halo'), i('bisagra'), i('aire')] },
        { title: 'Piernas y cadera', rounds: 3, work: 40, rest: 20, roundRest: 60, items: [i('swing'), i('goblet'), i('kblunge'), i('kbdl')] },
        { title: 'Empuje y tirón', rounds: 3, work: 40, rest: 20, roundRest: 60, items: [i('cleanpress'), i('kbrow'), i('pushpress'), i('highpull')] },
        { title: 'Cardio final', rounds: 3, work: 30, rest: 15, roundRest: 45, items: [i('snatch'), i('thruster'), i('marchapesa')] },
        { title: 'Brazos y abdomen', rounds: 2, work: 30, rest: 15, roundRest: 30, items: [i('curl'), i('triext'), i('woodchop'), i('windmill')] }
      ]
    },
    {
      id: 'kb-abs-arms', cat: 'kb', goal: 'core', name: 'Abdomen y brazos',
      tagline: 'Core de pie, brazos y hombros, con swings para mantener el pulso alto.',
      focus: ['Abdomen', 'Brazos', 'Cardio'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 10, items: [i('brazos'), i('torso'), i('halo'), i('bisagra')] },
        { title: 'Circuito', rounds: 4, work: 40, rest: 20, roundRest: 45, items: [i('swing1'), i('ocho'), i('pressoh'), i('giro'), i('curl'), i('woodchop')] },
        { title: 'Final', rounds: 2, work: 30, rest: 10, roundRest: 30, items: [i('highpull'), i('marchapesa')] }
      ]
    },

    {
      id: 'kb-hiit', cat: 'kb', goal: 'cardio', name: 'Quema grasa HIIT',
      tagline: 'Intervalos de 40/20 con la pesa rusa y un Tabata final de swings.',
      focus: ['Quema grasa', 'Cardio', 'Cuerpo completo'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 10, items: [i('brazos'), i('halo'), i('bisagra'), i('aire')] },
        { title: 'Circuito', rounds: 4, work: 40, rest: 20, roundRest: 60, items: [i('swing'), i('thruster'), i('snatch'), i('highpull'), i('kblunge')] },
        { title: 'Tabata de swings', rounds: 8, work: 20, roundRest: 10, items: [i('swing')] }
      ]
    },
    {
      id: 'kb-complex', cat: 'kb', goal: 'fuerza', name: 'Complejo full body',
      tagline: 'Cinco movimientos seguidos sin soltar la pesa, en 5 rondas.',
      focus: ['Fuerza', 'Cuerpo completo', 'Resistencia'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 10, items: [i('brazos'), i('halo'), i('goodmorning'), i('aire')] },
        { title: 'Complejo', rounds: 5, rest: 0, roundRest: 90, items: [reps('kbclean', 5, 'por lado'), reps('pushpress', 5, 'por lado'), reps('goblet', 8), reps('kblunge', 5, 'por lado'), reps('swing', 10)] },
        { title: 'Core de pie', rounds: 2, work: 30, rest: 10, roundRest: 30, items: [i('around'), i('suitcase')] }
      ]
    },
    {
      id: 'kb-legs', cat: 'kb', goal: 'volumen', name: 'Piernas y glúteos',
      tagline: 'Sentadillas, peso muerto y zancadas con la pesa rusa.',
      focus: ['Volumen', 'Piernas', 'Glúteos'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 10, items: [i('cadera'), i('aire'), i('bisagra'), i('marcha')] },
        { title: 'Bloque 1', rounds: 4, rest: 30, roundRest: 75, items: [reps('goblet', 12), reps('kbdl', 12)] },
        { title: 'Bloque 2', rounds: 3, rest: 30, roundRest: 75, items: [reps('kblunge', 10, 'por lado'), reps('latlunge', 8, 'por lado')] },
        { title: 'Bloque 3', rounds: 3, rest: 30, roundRest: 60, items: [reps('kbsl', 8, 'por lado'), reps('kbsumo', 15)] },
        { title: 'Final', rounds: 3, work: 30, roundRest: 30, items: [i('swing')] }
      ]
    },
    {
      id: 'kb-upper', cat: 'kb', goal: 'volumen', name: 'Hombros, espalda y brazos',
      tagline: 'Empuje, tirón y brazos con una pesa rusa.',
      focus: ['Volumen', 'Hombros', 'Brazos'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 10, items: [i('brazos'), i('halo'), i('torso')] },
        { title: 'Bloque 1', rounds: 4, rest: 30, roundRest: 75, items: [reps('pressoh', 8, 'por lado'), reps('kbrow', 10, 'por lado')] },
        { title: 'Bloque 2', rounds: 3, rest: 30, roundRest: 75, items: [reps('pushpress', 8, 'por lado'), reps('highpull', 12)] },
        { title: 'Bloque 3', rounds: 3, rest: 20, roundRest: 60, items: [reps('curl', 12), reps('triext', 12), reps('kbfront', 10)] }
      ]
    },
    {
      id: 'kb-core', cat: 'kb', goal: 'core', name: 'Abdomen de pie',
      tagline: 'Oblicuos y core sin tirarte al suelo: molinos, giros y leñadores.',
      focus: ['Abdomen', 'Oblicuos', 'Core'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 10, items: [i('torso'), i('cadera'), i('halo')] },
        { title: 'Circuito', rounds: 3, work: 40, rest: 15, roundRest: 45, items: [i('windmill'), i('around'), i('woodchop'), i('suitcase'), i('giro'), i('ocho')] }
      ]
    },
    {
      id: 'kb-express', cat: 'kb', goal: 'cardio', name: 'Express full body',
      tagline: 'Unos 15 minutos para días con poco tiempo: cuatro ejercicios, tres rondas.',
      focus: ['Cardio', 'Cuerpo completo'],
      sections: [
        { title: 'Activación', rounds: 1, work: 30, rest: 10, items: [i('halo'), i('aire')] },
        { title: 'Circuito', rounds: 3, work: 40, rest: 20, roundRest: 40, items: [i('swing'), i('goblet'), i('pushpress'), i('highpull')] }
      ]
    },

    // ---- Mancuernas ----
    {
      id: 'db-vol', cat: 'db', goal: 'volumen', name: 'Full body volumen',
      tagline: 'Cuerpo completo con dos mancuernas: series de 10 a 12 repeticiones.',
      focus: ['Volumen', 'Cuerpo completo', 'Fuerza'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 5, items: [i('brazos'), i('aire'), i('bisagra')] },
        { title: 'Bloque 1', rounds: 4, rest: 30, roundRest: 90, items: [reps('dgoblet', 12), reps('dpress', 10), reps('drdl', 12)] },
        { title: 'Bloque 2', rounds: 3, rest: 30, roundRest: 90, items: [reps('dremo', 12), reps('drev', 10, 'por lado'), reps('dlat', 12)] },
        { title: 'Bloque 3', rounds: 3, rest: 30, roundRest: 75, items: [reps('dhammer', 12), reps('dtri', 12), reps('dthr', 10)] }
      ]
    },
    {
      id: 'db-arms', cat: 'db', goal: 'volumen', name: 'Brazos y hombros',
      tagline: 'Bíceps, tríceps y hombros con dos mancuernas.',
      focus: ['Volumen', 'Brazos', 'Hombros'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 5, items: [i('brazos'), i('torso')] },
        { title: 'Bloque 1', rounds: 3, rest: 30, roundRest: 60, items: [reps('darnold', 10), reps('dlat', 12)] },
        { title: 'Bloque 2', rounds: 3, rest: 30, roundRest: 60, items: [reps('dcurl', 12), reps('dkickback', 12)] },
        { title: 'Bloque 3', rounds: 3, rest: 30, roundRest: 60, items: [reps('dhammer', 10), reps('duprow', 12), reps('dfront', 10)] }
      ]
    },
    {
      id: 'db-hiit', cat: 'db', goal: 'cardio', name: 'Quema grasa con mancuernas',
      tagline: 'Circuito de 40/20 con mancuernas ligeras.',
      focus: ['Quema grasa', 'Cardio', 'Cuerpo completo'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 10, items: [i('brazos'), i('marcha'), i('aire')] },
        { title: 'Circuito', rounds: 4, work: 40, rest: 20, roundRest: 60, items: [i('dthr'), i('dwalk'), i('dremo'), i('boxeo'), i('dfarmer')] },
        { title: 'Final', rounds: 2, work: 30, rest: 15, roundRest: 30, items: [i('dchop'), i('dside')] }
      ]
    },
    {
      id: 'db-upper', cat: 'db', goal: 'fuerza', name: 'Tren superior',
      tagline: 'Hombros, espalda y brazos en superseries.',
      focus: ['Hombros', 'Espalda', 'Brazos'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 5, items: [i('brazos'), i('torso')] },
        { title: 'Bloque 1', rounds: 3, rest: 30, roundRest: 60, items: [reps('dpress', 10), reps('dremo', 12)] },
        { title: 'Bloque 2', rounds: 3, rest: 30, roundRest: 60, items: [reps('dlat', 12), reps('dfly', 12)] },
        { title: 'Bloque 3', rounds: 3, rest: 30, roundRest: 60, items: [reps('dhammer', 12), reps('dtri', 12)] },
        { title: 'Core de pie', rounds: 2, rest: 20, roundRest: 30, items: [reps('dchop', 12, 'por lado'), reps('dside', 15, 'por lado')] }
      ]
    },
    {
      id: 'db-lower', cat: 'db', goal: 'fuerza', name: 'Piernas y glúteos',
      tagline: 'Fuerza de piernas con mancuernas y un final de cardio.',
      focus: ['Piernas', 'Glúteos'],
      sections: [
        { title: 'Calentamiento', rounds: 1, work: 30, rest: 5, items: [i('aire'), i('cadera'), i('bisagra')] },
        { title: 'Bloque 1', rounds: 3, rest: 30, roundRest: 60, items: [reps('dgoblet', 12), reps('drdl', 12)] },
        { title: 'Bloque 2', rounds: 3, rest: 30, roundRest: 60, items: [reps('drev', 10, 'por lado'), reps('dsumo', 12)] },
        { title: 'Bloque 3', rounds: 3, rest: 30, roundRest: 60, items: [reps('dsl', 8, 'por lado'), reps('dcalf', 15)] },
        { title: 'Final', rounds: 2, work: 40, rest: 20, roundRest: 30, items: [i('dthr')] }
      ]
    },

    // ---- Movilidad ----
    {
      id: 'mov', cat: 'mob', goal: 'mov', name: 'Movilidad de pie',
      tagline: 'Estiramientos suaves para un día de descanso.',
      focus: ['Movilidad', 'Recuperación'],
      sections: [
        { title: 'Movilidad', rounds: 1, work: 40, rest: 5, items: [i('torso'), i('brazos'), i('cadera'), i('quad'), i('isquios'), i('pecho'), i('triest'), i('lateral')] }
      ]
    }
  ];

  /*
    Programa de 15 semanas del PDF. Cada semana es una lista de sesiones.
    'id'            un entrenamiento
    ['id', 7, 'id'] entrenamientos con pausas en minutos entre ellos
    { n, p }        sesión con nombre (p = lista de entrenamientos seguidos, con 1 min entre ellos)
    { n, o }        sesión con opciones: o = [[…], […]]
    { n, rest }     días de descanso
  */
  const PROGRAM = [
    ['venus', 'burpeemax', 'aphrodite', 'squatmax', 'dione'],
    ['artemis', 'metis', 'aphrodite', 'burpeemax', 'artemis'],
    ['aphrodite', 'hades', 'artemis', ['hades', 7, 'situpmax']],
    ['aphrodite', 'aphrodite', ['pushmax', 3, 'pullmax', 3, 'pushmax', 3, 'pullmax', 3, 'pushmax', 3, 'pullmax'], 'aphrodite'],
    ['hades', 'artemis', ['situpmax', 3, 'burpeemax', 4, 'situpmax'], 'iris', 'hades'],
    ['zeus', 'burpeemax', 'artemis', 'aphrodite', 'zeus'],
    [{ n: 'Hell day 1', p: ['dione', 'poseidon', 'venus'] }, { n: 'Hell day 2', p: ['artemis', 'metis', 'aphrodite'] }, { n: 'Hell day 3', p: ['poseidon', 'zeus', 'iris'] }],
    ['hades', ['squatmax', 5, 'situpmax'], 'hades', 'zeus', 'hades'],
    ['zeus', ['iris', 7, 'situpmax'], 'artemis', ['iris', 7, 'situpmax']],
    ['zeus', 'iris', 'hades', 'aphrodite'],
    ['artemis', ['pushmax', 3, 'pushmax', 3, 'pushmax', 3, 'burpeemax'], 'dione', ['pullmax', 4, 'pullmax', 4, 'pullmax', 2, 'burpeemax'], 'venus'],
    ['aphrodite', ['hades', 7, 'squatmax'], ['burpeemax', 3, 'burpeemax', 5, 'burpeemax'], ['hades', 7, 'situpmax']],
    ['dione', ['pushmax', 3, 'pullmax', 3, 'burpeemax', 4, 'pullmax', 3, 'pushmax'], 'venus', ['pushmax', 3, 'pullmax', 3, 'burpeemax', 4, 'pullmax', 3, 'pushmax'], 'dione'],
    [['poseidon', 5, 'metis'], ['iris', 7, 'situpmax'], ['poseidon', 5, 'metis'], ['iris', 7, 'situpmax']],
    [
      { n: 'Día 1', o: [['dione'], ['zeus']] },
      { n: 'Día 2', p: ['squatmax', 'pushmax', 'metis'] },
      { n: 'Día 3', p: ['dione'] },
      { n: 'Día 4', p: ['aphrodite'] },
      { n: 'Día 5', o: [['dione'], ['zeus']] },
      { n: 'Día 6', p: ['aphrodite'] },
      { n: 'Día 7', o: [['dione', 'metis', 'squatmax'], ['zeus', 'metis', 'squatmax']] },
      { n: 'Días 8, 9 y 10', rest: true }
    ]
  ];
  const PROGRAM_NAMES = ['', '', '', '', '', '', 'Semana del infierno', '', '', '', '', '', '', '', 'Hellweek'];

  // Lunes a domingo. 'prog' = siguiente sesión del programa del PDF.
  const DEFAULT_PLAN = ['prog', 'kb-vol', 'prog', 'db-vol', 'prog', 'kb-full', 'rest'];

  // Extensión de las imágenes de referencia en img/ejercicios/<id>.<ext> (png, jpg o webp).
  const IMG_EXT = 'png';

  window.FORJA = { CATS, GOALS, EX, EXGROUPS, ROUTINES, PROGRAM, PROGRAM_NAMES, DEFAULT_PLAN, IMG_EXT };
})();
