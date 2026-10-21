# Forja

App personal de ejercicio: plan semanal, rutinas con temporizador guiado (sonido y voz), y registro de progreso. Todos los ejercicios son de pie y cada uno tiene una figura animada de referencia (postura inicial y final).

## Usar

- Abre `index.html` en el navegador, o sírvela con `npx serve`.
- En el celular: súbela a GitHub Pages (Settings → Pages → rama `main`) y usa "Agregar a pantalla de inicio". Funciona sin conexión.
- Los datos (plan e historial) se guardan solo en el dispositivo.

## Rutinas incluidas

| Categoría | Rutina |
|---|---|
| Cardio y fuerza | Cardio + Fuerza (plantilla, día por medio) |
| Pesa rusa | Cuerpo completo · Abdomen y brazos |
| Mancuernas | Tren superior · Piernas y glúteos |
| Movilidad | Movilidad de pie (días de descanso) |

Plan por defecto: Lun/Mié/Vie cardio y fuerza; Mar, Jue y Sáb pesas; Dom descanso. Se cambia desde la pestaña Rutinas.

## Editar rutinas

Todo está en `js/data.js`: ejercicios (`EX`) y rutinas (`ROUTINES`). Las figuras animadas de cada ejercicio están en `js/figures.js` (mismo `id` que en `EX`). La rutina "Cardio + Fuerza" es de ejemplo; reemplázala por la del PDF.

## Imágenes propias (Flow)

`flow/prompts.md` tiene un prompt por ejercicio. Las imágenes que generes van en `img/ejercicios/<id>.png` y la app las muestra en lugar del muñeco animado. Los ejercicios sin imagen siguen con el muñeco.
