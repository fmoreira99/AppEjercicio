# Forja

App personal de ejercicio: plan semanal, rutinas con temporizador guiado (sonido y voz), y registro de progreso. Cada ejercicio tiene una figura animada de referencia (postura inicial y final).

## Usar

- Abre `index.html` en el navegador, o sírvela con `npx serve`.
- En el celular: súbela a GitHub Pages (Settings → Pages → rama `main`) y usa "Agregar a pantalla de inicio". Funciona sin conexión.
- Los datos (plan e historial) se guardan solo en el dispositivo.
- Formato vertical 9:16: en el celular ocupa toda la pantalla y en el computador o la tablet se ve dentro de un marco de teléfono.

### Una sola tarjeta

**Hoy** es una tarjeta grande por día, a pantalla completa:

| Gesto | Qué hace |
|---|---|
| ← → | Cambia de día |
| ↑ | La hiciste (solo hoy o días pasados) |
| ↓ | Omitir |

En la tarjeta: **Iniciar** abre el temporizador y **Recorrer** pasa la rutina al día siguiente (las demás se corren hasta el próximo descanso). Tocar la tarjeta muestra los ejercicios como mazo. Todo se puede deshacer.

El botón flotante de la esquina abre Hoy, Rutinas, Programa y Progreso.

En el temporizador, desliza a la izquierda para pasar al siguiente ejercicio y a la derecha para volver al anterior (las flechas tenues a los lados también sirven). El botón del parlante silencia pitidos y voz; el de la burbuja apaga solo la voz.

## Programa del PDF

La pestaña **Programa** tiene las 15 semanas del PDF (Aphrodite, Artemis, Hades, Iris, Venus, Poseidon, Dione, Zeus, Metis y los entrenamientos "MAX"), con sus pausas. Cada sesión terminada se marca sola. En el plan semanal, los días con "Programa del PDF" toman la siguiente sesión pendiente de la semana que estés haciendo.

Para encontrar cualquier entrenamiento: en la tarjeta del día, **Cambiar** lista los 14 del PDF (y todas las demás rutinas) agrupados; en **Programa**, los números 1–15 saltan a esa semana; y al abrir una sesión, la primera tarjeta muestra su estructura completa (ejercicios, repeticiones y pausas).

El PDF no dice cuántas rondas tiene Zeus; se dejaron 3 (cámbialo en `js/data.js`). Varios ejercicios del PDF se hacen en el suelo (flexiones, abdominales, burpees, escaladores) y las dominadas necesitan una barra.

## Rutinas incluidas

| Categoría | Rutina |
|---|---|
| Cardio y fuerza | Los 14 entrenamientos del PDF |
| Pesa rusa | Full body volumen · Cuerpo completo (full body) · Quema grasa HIIT · Complejo full body · Piernas y glúteos · Hombros, espalda y brazos · Abdomen y brazos · Abdomen de pie · Express full body |
| Mancuernas | Full body volumen · Brazos y hombros · Quema grasa · Tren superior · Piernas y glúteos |
| Movilidad | Movilidad de pie (días de descanso) |

Cada rutina tiene un objetivo (volumen, cardio, fuerza, abdomen o movilidad) y se puede filtrar en la pestaña Rutinas. En esa pestaña, **Ejercicios** muestra los 77 ejercicios con su animación, por material.

Los días del PDF que duran menos de 25 min (por ejemplo Burpee MAX) sugieren sumar un full body con pesa rusa, en Hoy y al terminar la sesión.

Plan por defecto: Lun/Mié/Vie programa del PDF; Mar pesa rusa de volumen; Jue mancuernas de volumen; Sáb pesa rusa de cardio; Dom descanso. Se cambia desde la pestaña Rutinas.

## Editar rutinas

Todo está en `js/data.js`: ejercicios (`EX`) y rutinas (`ROUTINES`). Las figuras animadas de cada ejercicio están en `js/figures.js` (mismo `id` que en `EX`).

## Imágenes propias (Flow)

`flow/prompts.md` tiene un prompt por ejercicio. Las imágenes que generes van en `img/ejercicios/<id>.png` y la app las muestra en lugar del muñeco animado. Los ejercicios sin imagen siguen con el muñeco.
