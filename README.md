# Forja

App personal de ejercicio: plan semanal, rutinas con temporizador guiado (sonido y voz), y registro de progreso. Cada ejercicio tiene una figura animada de referencia (postura inicial y final).

## Usar

- Abre `index.html` en el navegador, o sírvela con `npx serve`.
- En el celular: súbela a GitHub Pages (Settings → Pages → rama `main`) y usa "Agregar a pantalla de inicio". Funciona sin conexión.
- Los datos (plan e historial) se guardan solo en el dispositivo.

## Programa del PDF

La pestaña **Programa** tiene las 15 semanas del PDF (Aphrodite, Artemis, Hades, Iris, Venus, Poseidon, Dione, Zeus, Metis y los entrenamientos "MAX"), con sus pausas. Cada sesión terminada se marca sola. En el plan semanal, los días con "Programa del PDF" toman la siguiente sesión pendiente de la semana que estés haciendo.

El PDF no dice cuántas rondas tiene Zeus; se dejaron 3 (cámbialo en `js/data.js`). Varios ejercicios del PDF se hacen en el suelo (flexiones, abdominales, burpees, escaladores) y las dominadas necesitan una barra.

## Rutinas incluidas

| Categoría | Rutina |
|---|---|
| Cardio y fuerza | Los 14 entrenamientos del PDF |
| Pesa rusa | Full body volumen · Cuerpo completo (cardio) · Abdomen y brazos |
| Mancuernas | Full body volumen · Tren superior · Piernas y glúteos |
| Movilidad | Movilidad de pie (días de descanso) |

Cada rutina tiene un objetivo (volumen, cardio o fuerza) y se puede filtrar en la pestaña Rutinas.

Plan por defecto: Lun/Mié/Vie programa del PDF; Mar pesa rusa de volumen; Jue mancuernas de volumen; Sáb pesa rusa de cardio; Dom descanso. Se cambia desde la pestaña Rutinas.

## Editar rutinas

Todo está en `js/data.js`: ejercicios (`EX`) y rutinas (`ROUTINES`). Las figuras animadas de cada ejercicio están en `js/figures.js` (mismo `id` que en `EX`).

## Imágenes propias (Flow)

`flow/prompts.md` tiene un prompt por ejercicio. Las imágenes que generes van en `img/ejercicios/<id>.png` y la app las muestra en lugar del muñeco animado. Los ejercicios sin imagen siguen con el muñeco.
