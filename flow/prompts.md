# Prompts para Flow

Una imagen por ejercicio, con la postura de inicio (panel izquierdo) y la final (panel derecho).
Las imágenes se guardan en `img/ejercicios/<id>.png` y la app las usa en lugar de los muñecos animados.

## Pasos

1. Abre tu proyecto en Flow y elige crear **imagen**, formato **1:1** (cuadrado).
2. Para cada ejercicio de abajo, pega su prompt completo y genera. Elige la versión donde la postura se vea correcta; si ninguna lo es, vuelve a generar.
3. Descarga la imagen y ponle el nombre indicado (por ejemplo `swing.png`).
4. Sube los archivos a la carpeta `img/ejercicios/` del repo (en GitHub: *Add file → Upload files*, rama `claude/eager-curie-5yq85p`).
5. Si descargas en .jpg o .webp, cambia `IMG_EXT` en `js/data.js` (todas deben tener la misma extensión).

Si un ejercicio no tiene imagen, la app sigue mostrando el muñeco animado.

## Estilo común

Ya viene incluido al inicio de cada prompt, para que las 77 imágenes se vean parecidas:

> Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form.

## Ejercicios (77)

### brazos · Círculos de brazos
Archivo: `brazos.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Arm circles. Equipment: none. Camera: front view. LEFT panel (START position): standing tall, arms extended straight out to the sides at shoulder height. RIGHT panel (END position): arms raised straight overhead, palms facing forward.
```

### cadera · Círculos de cadera
Archivo: `cadera.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Standing hip circles. Equipment: none. Camera: front view. LEFT panel (START position): hands on hips, hips pushed to the left, chest tilted slightly to the right. RIGHT panel (END position): hips pushed to the right, chest tilted slightly to the left.
```

### marcha · Marcha en el sitio
Archivo: `marcha.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Marching in place. Equipment: none. Camera: side view. LEFT panel (START position): standing, left knee lifted to hip height, right arm swung forward. RIGHT panel (END position): right knee lifted to hip height, left arm swung forward.
```

### aire · Sentadilla de aire
Archivo: `aire.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Bodyweight squat. Equipment: none. Camera: side view. LEFT panel (START position): standing tall, arms relaxed at the sides. RIGHT panel (END position): deep squat, hips back, thighs parallel to the floor, arms extended forward, chest up.
```

### torso · Rotación de torso
Archivo: `torso.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Standing torso rotation. Equipment: none. Camera: front view. LEFT panel (START position): arms extended out to the sides at shoulder height, facing forward. RIGHT panel (END position): upper body twisted to one side, arms still extended, hips still facing forward.
```

### bisagra · Bisagra de cadera
Archivo: `bisagra.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Hip hinge. Equipment: none. Camera: side view. LEFT panel (START position): standing tall, arms at the sides. RIGHT panel (END position): hips pushed back, torso hinged forward about 70 degrees, back flat, knees softly bent, arms hanging down.
```

### halo · Halo con pesa
Archivo: `halo.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell halo. Equipment: one kettlebell held upside down by the horns with both hands. Camera: front view. LEFT panel (START position): kettlebell held at chest height close to the chin, elbows bent down. RIGHT panel (END position): kettlebell circling around the head, arms raised, elbows close to the head.
```

### quad · Estiramiento de cuádriceps
Archivo: `quad.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Standing quad stretch. Equipment: none. Camera: side view. LEFT panel (START position): standing tall, arms at the sides. RIGHT panel (END position): standing on one leg, other foot pulled up to the glute with the same-side hand, knees together, torso upright.
```

### isquios · Estiramiento de isquios
Archivo: `isquios.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Standing hamstring stretch. Equipment: none. Camera: side view. LEFT panel (START position): standing tall, arms at the sides. RIGHT panel (END position): one leg extended forward with the heel on the floor and toes up, torso hinged forward with a flat back, hands reaching toward the front foot.
```

### pecho · Apertura de pecho
Archivo: `pecho.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Chest opener. Equipment: none. Camera: side view. LEFT panel (START position): standing tall, arms at the sides. RIGHT panel (END position): arms stretched back behind the body, chest lifted, head up.
```

### triest · Estiramiento de tríceps
Archivo: `triest.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Triceps stretch. Equipment: none. Camera: side view. LEFT panel (START position): standing tall, arms at the sides. RIGHT panel (END position): one arm overhead with the elbow bent and the hand behind the neck, the other hand gently pushing the raised elbow.
```

### lateral · Inclinación lateral
Archivo: `lateral.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Standing side bend. Equipment: none. Camera: front view. LEFT panel (START position): standing tall, one arm raised overhead, the other arm down. RIGHT panel (END position): torso bent sideways away from the raised arm, the arm overhead following the curve.
```

### jacks · Jumping jacks
Archivo: `jacks.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Jumping jacks. Equipment: none. Camera: front view. LEFT panel (START position): feet together, arms down at the sides. RIGHT panel (END position): mid-jump with feet wide apart and arms raised overhead.
```

### rodillas · Rodillas arriba
Archivo: `rodillas.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: High knees. Equipment: none. Camera: side view. LEFT panel (START position): right knee driven up to hip height, left arm swung forward. RIGHT panel (END position): left knee driven up to hip height, right arm swung forward.
```

### patinador · Patinador
Archivo: `patinador.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Skater hops. Equipment: none. Camera: front view. LEFT panel (START position): leaning to the right on a bent right leg, left leg crossed behind, arms swinging. RIGHT panel (END position): mirrored: leaning to the left on a bent left leg, right leg crossed behind.
```

### sqjump · Sentadilla con salto
Archivo: `sqjump.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Squat jump. Equipment: none. Camera: side view. LEFT panel (START position): deep squat with the arms swung back. RIGHT panel (END position): jumping straight up with legs extended, arms overhead, feet off the floor.
```

### boxeo · Boxeo en sombra
Archivo: `boxeo.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Shadow boxing. Equipment: none. Camera: side view. LEFT panel (START position): staggered boxing stance, rear fist punching straight forward, other fist guarding the chin. RIGHT panel (END position): the other fist punching straight forward, the first fist back guarding the chin.
```

### kneecrunch · Rodilla al codo
Archivo: `kneecrunch.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Standing knee-to-elbow crunch. Equipment: none. Camera: side view. LEFT panel (START position): standing tall with hands behind the head, elbows wide. RIGHT panel (END position): torso crunched forward, one knee lifted up to meet the opposite elbow.
```

### highjump · Saltos altos
Archivo: `highjump.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: High jump. Equipment: none. Camera: side view. LEFT panel (START position): quarter squat with the arms swung back. RIGHT panel (END position): jumping straight up with legs extended and arms overhead, feet off the floor.
```

### deepsq · Sentadilla profunda
Archivo: `deepsq.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Deep squat. Equipment: none. Camera: side view. LEFT panel (START position): standing tall with the arms extended forward. RIGHT panel (END position): deep squat with the thighs below parallel, back straight, arms extended forward.
```

### run · Correr
Archivo: `run.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Running. Equipment: none. Camera: side view. LEFT panel (START position): mid-stride, right leg forward and left leg kicked back, arms swinging in opposition. RIGHT panel (END position): mid-stride, left leg forward and right leg kicked back, arms swinging in opposition.
```

### burpee · Burpee
Archivo: `burpee.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Burpee. Equipment: none. Camera: side view. LEFT panel (START position): standing tall, then crouching with both hands on the floor in front of the feet. RIGHT panel (END position): in a high plank position with arms straight and the body in a straight line (the next move is jumping up with arms overhead).
```

### pushup · Flexiones
Archivo: `pushup.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Push-up. Equipment: none. Camera: side view. LEFT panel (START position): high plank with arms straight and the body in a straight line from head to heels. RIGHT panel (END position): lowest point of the push-up, chest an inch above the floor, elbows bent about 90 degrees, body still straight.
```

### pullup · Dominadas
Archivo: `pullup.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Pull-up. Equipment: a pull-up bar. Camera: side view. LEFT panel (START position): hanging from the bar with arms fully straight, knees slightly bent. RIGHT panel (END position): chin above the bar, elbows bent and pulled down, body steady.
```

### situp · Abdominales
Archivo: `situp.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Sit-up. Equipment: none. Camera: side view. LEFT panel (START position): lying on the back with knees bent and feet flat on the floor, hands behind the head. RIGHT panel (END position): sitting up with the torso upright and arms reaching forward.
```

### leglever · Elevación de piernas
Archivo: `leglever.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Lying leg raise. Equipment: none. Camera: side view. LEFT panel (START position): lying on the back with legs straight on the floor, arms along the body. RIGHT panel (END position): legs raised straight up to vertical, lower back flat on the floor.
```

### jackknife · Jackknife (V-up)
Archivo: `jackknife.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Jackknife V-up. Equipment: none. Camera: side view. LEFT panel (START position): lying on the back with arms overhead and legs straight, a few inches off the floor. RIGHT panel (END position): torso and legs lifted at the same time into a V shape, hands reaching toward the toes.
```

### climbers · Escaladores
Archivo: `climbers.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Mountain climbers. Equipment: none. Camera: side view. LEFT panel (START position): high plank with one knee driven toward the chest. RIGHT panel (END position): high plank with the other knee driven toward the chest.
```

### swing · Swing con pesa rusa
Archivo: `swing.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell swing. Equipment: one kettlebell held with both hands. Camera: side view. LEFT panel (START position): hinged forward with hips back and a flat back, kettlebell swung back between the legs. RIGHT panel (END position): hips fully extended, standing tall, arms straight out in front at chest height holding the kettlebell.
```

### swing1 · Swing a una mano
Archivo: `swing1.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: One-arm kettlebell swing. Equipment: one kettlebell held in one hand. Camera: side view. LEFT panel (START position): hinged forward with a flat back, kettlebell in the right hand swung back between the legs, left arm out to the side for balance. RIGHT panel (END position): standing tall, right arm straight out in front at chest height holding the kettlebell, left arm out to the side.
```

### goblet · Sentadilla goblet
Archivo: `goblet.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell goblet squat. Equipment: one kettlebell held by the horns at the chest. Camera: side view. LEFT panel (START position): standing tall holding the kettlebell against the chest. RIGHT panel (END position): deep squat with elbows inside the knees, kettlebell at the chest, chest up.
```

### cleanpress · Clean y press
Archivo: `cleanpress.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell clean and press. Equipment: one kettlebell held in one hand. Camera: side view. LEFT panel (START position): kettlebell racked at the shoulder, arm bent, standing tall. RIGHT panel (END position): kettlebell pressed overhead with the arm locked out, torso upright.
```

### woodchop · Leñador con pesa
Archivo: `woodchop.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell woodchop. Equipment: one kettlebell held with both hands. Camera: front view. LEFT panel (START position): knees slightly bent, kettlebell held low near the left hip, torso turned to the left. RIGHT panel (END position): standing tall and rotated to the right, kettlebell pulled diagonally up above the right shoulder.
```

### thruster · Thruster con pesa
Archivo: `thruster.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell thruster. Equipment: one kettlebell held with both hands. Camera: side view. LEFT panel (START position): deep squat holding the kettlebell at the chest. RIGHT panel (END position): standing tall with the kettlebell pressed straight overhead.
```

### highpull · High pull
Archivo: `highpull.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell high pull. Equipment: one kettlebell held with both hands. Camera: side view. LEFT panel (START position): slight hip hinge, kettlebell hanging in front of the thighs. RIGHT panel (END position): standing tall, kettlebell pulled up to chest height with the elbows high and out.
```

### curl · Curl con pesa rusa
Archivo: `curl.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell biceps curl. Equipment: one kettlebell held with both hands. Camera: side view. LEFT panel (START position): standing tall, arms straight down holding the kettlebell in front of the thighs. RIGHT panel (END position): elbows still at the sides, forearms curled up bringing the kettlebell to chest height.
```

### triext · Extensión de tríceps
Archivo: `triext.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell overhead triceps extension. Equipment: one kettlebell held by the horns with both hands. Camera: side view. LEFT panel (START position): kettlebell held behind the head, elbows pointing up, forearms bent. RIGHT panel (END position): arms fully extended overhead holding the kettlebell.
```

### marchapesa · Marcha con pesa al hombro
Archivo: `marchapesa.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell rack march. Equipment: one kettlebell racked on one shoulder. Camera: side view. LEFT panel (START position): kettlebell racked at the shoulder, the opposite knee lifted high. RIGHT panel (END position): the other knee lifted high, kettlebell still racked at the shoulder.
```

### ocho · Ocho entre las piernas
Archivo: `ocho.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell figure-8. Equipment: one kettlebell passed between the hands. Camera: front view. LEFT panel (START position): wide stance, hinged forward, kettlebell passing under the right thigh in the right hand. RIGHT panel (END position): kettlebell passing under the left thigh in the left hand.
```

### giro · Giro de torso con pesa
Archivo: `giro.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Standing kettlebell torso twist. Equipment: one kettlebell held by the horns at the chest. Camera: front view. LEFT panel (START position): kettlebell held at the chest, facing forward. RIGHT panel (END position): upper body twisted to one side while the hips keep facing forward.
```

### pressoh · Press de hombro con pesa
Archivo: `pressoh.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: One-arm kettlebell overhead press. Equipment: one kettlebell held in one hand. Camera: side view. LEFT panel (START position): kettlebell racked at the shoulder, standing tall. RIGHT panel (END position): arm locked out overhead holding the kettlebell, torso upright.
```

### snatch · Arranque (snatch)
Archivo: `snatch.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell snatch. Equipment: one kettlebell held in one hand. Camera: side view. LEFT panel (START position): hips hinged back, back flat, the kettlebell hanging between the legs in one hand. RIGHT panel (END position): standing tall with the arm locked straight overhead, the kettlebell resting on the back of the forearm.
```

### kbclean · Clean con pesa rusa
Archivo: `kbclean.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell clean. Equipment: one kettlebell held in one hand. Camera: side view. LEFT panel (START position): hips hinged back, the kettlebell held between the legs in one hand. RIGHT panel (END position): standing tall with the kettlebell in the rack position at the shoulder, elbow tucked to the ribs, bell resting on the forearm.
```

### pushpress · Push press
Archivo: `pushpress.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell push press. Equipment: one kettlebell held in one hand. Camera: side view. LEFT panel (START position): kettlebell in the rack position at the shoulder, knees slightly bent in a short dip. RIGHT panel (END position): legs straight and the arm locked overhead, kettlebell resting on the back of the forearm.
```

### kbdl · Peso muerto con pesa rusa
Archivo: `kbdl.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell deadlift. Equipment: one kettlebell held by the handle with both hands. Camera: side view. LEFT panel (START position): standing tall holding the kettlebell in front of the thighs with straight arms. RIGHT panel (END position): hips pushed back and knees bent, back flat, the kettlebell lowered to the floor between the feet.
```

### kbsumo · Sentadilla sumo con pesa rusa
Archivo: `kbsumo.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell sumo squat. Equipment: one kettlebell held by the handle with both hands. Camera: front view. LEFT panel (START position): wide stance with toes turned out, kettlebell hanging between the legs with straight arms. RIGHT panel (END position): deep wide squat, thighs parallel to the floor, chest up, kettlebell close to the floor.
```

### kbrow · Remo a una mano con pesa rusa
Archivo: `kbrow.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Single-arm kettlebell row. Equipment: one kettlebell held in one hand. Camera: side view. LEFT panel (START position): staggered stance, torso hinged forward, free hand on the front knee, kettlebell hanging straight down. RIGHT panel (END position): elbow pulled back to the hip with the kettlebell at the ribs, back flat.
```

### kblunge · Zancada con pesa al pecho
Archivo: `kblunge.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell goblet reverse lunge. Equipment: one kettlebell held upside down by the horns at the chest. Camera: side view. LEFT panel (START position): standing tall with the kettlebell held at the chest. RIGHT panel (END position): reverse lunge with the back knee almost touching the floor, torso upright, kettlebell still at the chest.
```

### latlunge · Zancada lateral con pesa
Archivo: `latlunge.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell lateral lunge. Equipment: one kettlebell held at the chest with both hands. Camera: front view. LEFT panel (START position): standing with feet a bit wider than the hips, kettlebell at the chest. RIGHT panel (END position): big step to the side, bending that knee with the hips back while the other leg stays straight.
```

### windmill · Molino con pesa rusa
Archivo: `windmill.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell windmill. Equipment: one kettlebell held in one hand. Camera: front view. LEFT panel (START position): standing with the kettlebell locked overhead in one hand, eyes on the kettlebell. RIGHT panel (END position): hips pushed out to the kettlebell side, torso tilted sideways, free hand sliding down to the opposite shin, arm overhead still vertical.
```

### around · Pase alrededor del cuerpo
Archivo: `around.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell around the world. Equipment: one kettlebell held in one hand. Camera: front view. LEFT panel (START position): standing tall, kettlebell held at the right hip. RIGHT panel (END position): kettlebell passed in front of the body to the other hand at the left hip, hips still.
```

### suitcase · Marcha con pesa a un lado
Archivo: `suitcase.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell suitcase march. Equipment: one kettlebell held in one hand at the side. Camera: side view. LEFT panel (START position): standing tall, kettlebell hanging at one side, one knee lifted to hip height. RIGHT panel (END position): the other knee lifted to hip height, shoulders level, kettlebell still at the side.
```

### kbfront · Elevación frontal con pesa
Archivo: `kbfront.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell front raise. Equipment: one kettlebell held by the handle with both hands. Camera: side view. LEFT panel (START position): standing tall, kettlebell hanging in front of the thighs with straight arms. RIGHT panel (END position): arms raised straight forward to shoulder height holding the kettlebell.
```

### goodmorning · Buenos días con pesa
Archivo: `goodmorning.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell good morning. Equipment: one kettlebell held upside down by the horns at the chest. Camera: side view. LEFT panel (START position): standing tall with the kettlebell held at the chest. RIGHT panel (END position): hips pushed back and torso hinged forward almost parallel to the floor, back flat, knees soft, kettlebell still at the chest.
```

### kbsl · Peso muerto a una pierna con pesa
Archivo: `kbsl.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Kettlebell single-leg deadlift. Equipment: one kettlebell held in one hand. Camera: side view. LEFT panel (START position): standing on one leg, kettlebell in the opposite hand. RIGHT panel (END position): torso hinged forward and the free leg extended straight back in a line with the torso, kettlebell lowered toward the floor.
```

### dpress · Press de hombros
Archivo: `dpress.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell shoulder press. Equipment: a pair of dumbbells. Camera: front view. LEFT panel (START position): dumbbells at shoulder height, elbows out and bent to 90 degrees. RIGHT panel (END position): arms fully extended overhead holding the dumbbells.
```

### dremo · Remo inclinado
Archivo: `dremo.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Bent-over dumbbell row. Equipment: a pair of dumbbells. Camera: side view. LEFT panel (START position): hinged forward with a flat back, arms extended down holding the dumbbells. RIGHT panel (END position): elbows pulled back toward the hips with the shoulder blades squeezed.
```

### dgoblet · Sentadilla con mancuerna
Archivo: `dgoblet.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell goblet squat. Equipment: one dumbbell held vertically at the chest. Camera: side view. LEFT panel (START position): standing tall holding one dumbbell vertically against the chest. RIGHT panel (END position): deep squat with elbows inside the knees, dumbbell at the chest, chest up.
```

### drdl · Peso muerto rumano
Archivo: `drdl.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell Romanian deadlift. Equipment: a pair of dumbbells. Camera: side view. LEFT panel (START position): standing tall with the dumbbells in front of the thighs. RIGHT panel (END position): hips pushed back, torso hinged forward about 70 degrees, dumbbells sliding down near the shins, back flat.
```

### drev · Zancada reversa
Archivo: `drev.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell reverse lunge. Equipment: a pair of dumbbells. Camera: side view. LEFT panel (START position): standing tall with the dumbbells hanging at the sides. RIGHT panel (END position): stepped far back into a lunge, rear knee close to the floor, torso upright, dumbbells at the sides.
```

### dlat · Elevaciones laterales
Archivo: `dlat.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell lateral raise. Equipment: a pair of dumbbells. Camera: front view. LEFT panel (START position): standing tall with the dumbbells at the sides. RIGHT panel (END position): arms raised out to the sides to shoulder height with a slight bend in the elbows.
```

### dfly · Pájaros inclinado
Archivo: `dfly.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Bent-over rear delt fly. Equipment: a pair of dumbbells. Camera: front view, torso leaning toward the camera. LEFT panel (START position): hinged forward, dumbbells hanging straight down. RIGHT panel (END position): arms raised wide out to the sides at shoulder height, elbows slightly bent.
```

### dhammer · Curl martillo
Archivo: `dhammer.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell hammer curl. Equipment: a pair of dumbbells. Camera: side view. LEFT panel (START position): standing tall, arms down holding the dumbbells with palms facing each other. RIGHT panel (END position): forearms curled up to shoulder height, palms still facing inward.
```

### dtri · Tríceps tras nuca
Archivo: `dtri.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell overhead triceps extension. Equipment: one dumbbell held with both hands. Camera: side view. LEFT panel (START position): dumbbell held behind the head, elbows pointing up. RIGHT panel (END position): arms fully extended overhead holding the dumbbell.
```

### dsumo · Sentadilla sumo
Archivo: `dsumo.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell sumo squat. Equipment: one dumbbell held with both hands between the legs. Camera: front view. LEFT panel (START position): wide stance with the toes turned out, standing tall, dumbbell hanging between the legs. RIGHT panel (END position): deep sumo squat with the knees out over the toes and the dumbbell hanging between the legs.
```

### dsl · Peso muerto a una pierna
Archivo: `dsl.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Single-leg Romanian deadlift. Equipment: a pair of dumbbells. Camera: side view. LEFT panel (START position): standing on one leg, dumbbells hanging down. RIGHT panel (END position): torso hinged forward until almost parallel to the floor, the free leg extended straight back, back flat.
```

### dcalf · Elevación de talones
Archivo: `dcalf.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Standing calf raise. Equipment: none. Camera: side view. LEFT panel (START position): standing with feet flat, arms at the sides. RIGHT panel (END position): raised high on the toes, torso upright.
```

### dthr · Thruster con mancuernas
Archivo: `dthr.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell thruster. Equipment: a pair of dumbbells. Camera: side view. LEFT panel (START position): deep squat with the dumbbells at the shoulders. RIGHT panel (END position): standing tall with the dumbbells pressed overhead.
```

### dchop · Leñador con mancuerna
Archivo: `dchop.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell woodchop. Equipment: one dumbbell held vertically with both hands. Camera: front view. LEFT panel (START position): knees slightly bent, dumbbell held low near the left hip, torso turned to the left. RIGHT panel (END position): standing tall and rotated to the right, dumbbell pulled diagonally up above the right shoulder.
```

### dside · Inclinación con mancuerna
Archivo: `dside.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell side bend. Equipment: one dumbbell in the right hand. Camera: front view. LEFT panel (START position): standing tall, dumbbell in the right hand at the side, left hand behind the head. RIGHT panel (END position): torso bent to the right, lowering the dumbbell toward the knee, left elbow pointing up.
```

### darnold · Press Arnold
Archivo: `darnold.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell Arnold press. Equipment: two dumbbells. Camera: front view. LEFT panel (START position): dumbbells at chin height with palms facing the body and elbows in front. RIGHT panel (END position): arms pressed overhead with the palms rotated to face forward.
```

### dfront · Elevación frontal con mancuernas
Archivo: `dfront.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell front raise. Equipment: two dumbbells. Camera: side view. LEFT panel (START position): standing tall, dumbbells in front of the thighs. RIGHT panel (END position): straight arms raised forward to shoulder height.
```

### duprow · Remo al mentón
Archivo: `duprow.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell upright row. Equipment: two dumbbells. Camera: front view. LEFT panel (START position): standing tall, dumbbells in front of the thighs. RIGHT panel (END position): elbows raised out to the sides above the hands, dumbbells pulled up to chest height close to the body.
```

### dwalk · Zancada caminando
Archivo: `dwalk.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell walking lunge. Equipment: two dumbbells. Camera: side view. LEFT panel (START position): standing tall with a dumbbell in each hand at the sides. RIGHT panel (END position): long step forward into a lunge, back knee almost touching the floor, torso upright.
```

### dfarmer · Paseo del granjero
Archivo: `dfarmer.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell farmer's march. Equipment: two heavy dumbbells. Camera: side view. LEFT panel (START position): standing tall with a heavy dumbbell in each hand, one knee lifted. RIGHT panel (END position): the other knee lifted, shoulders back, dumbbells still at the sides.
```

### dkickback · Patada de tríceps
Archivo: `dkickback.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell triceps kickback. Equipment: two dumbbells. Camera: side view. LEFT panel (START position): torso hinged forward, upper arms tight to the body, elbows bent 90 degrees. RIGHT panel (END position): forearms extended straight back, arms in a line with the torso.
```

### dcurl · Curl de bíceps
Archivo: `dcurl.png`

```text
Clean flat vector illustration for a fitness app. Square 1:1 image divided into two equal side-by-side panels by a thin vertical divider line. The same athletic person (short dark hair, fitted navy t-shirt, grey shorts, white sneakers, neutral build) appears in both panels at the same size and position, full body always visible with some margin, standing on a thin floor line. Plain pale blue-grey background (#EDF0F7). Kettlebells are orange (#E9460F), dumbbells are teal (#0A8770). No text, letters, numbers or watermark. Anatomically correct proportions and safe, textbook exercise form. Exercise: Dumbbell biceps curl. Equipment: two dumbbells. Camera: side view. LEFT panel (START position): standing tall, arms straight with the palms facing forward. RIGHT panel (END position): dumbbells curled up to the shoulders, elbows fixed at the sides.
```
