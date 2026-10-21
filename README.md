# Forja

App personal de ejercicio: plan semanal, rutinas con temporizador guiado (sonido y voz), y registro de progreso. Todos los ejercicios son de pie.

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

Todo está en `js/data.js`: ejercicios (`EX`) y rutinas (`ROUTINES`). La rutina "Cardio + Fuerza" es de ejemplo; reemplázala por la del PDF.
