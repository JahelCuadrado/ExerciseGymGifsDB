# Exercise Gym GIFs DB

API estática (solo archivos JSON + GIFs) servida directamente desde GitHub a
través del CDN gratuito de **jsDelivr**. Pensada para consumirse desde cualquier
app móvil o web sin necesidad de backend.

- **Repo:** https://github.com/JahelCuadrado/ExerciseGymGifsDB
- **Base URL (jsDelivr):** `https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main`
- **19 grupos musculares · 1323 ejercicios**

## Endpoints

| Endpoint | Descripción |
|---|---|
| `/api/index.json` | Metadata global + listados |
| `/api/muscles.json` | Lista de grupos musculares |
| `/api/muscles/<muscle>.json` | Ejercicios de un grupo |
| `/api/equipment.json` | Lista de equipamientos |
| `/api/equipment/<equipment>.json` | Ejercicios por equipamiento |
| `/api/bodyparts.json` | Lista de partes del cuerpo |
| `/api/bodyparts/<bodyPart>.json` | Ejercicios por parte del cuerpo |
| `/api/categories.json` | Lista de categorías |
| `/api/categories/<category>.json` | Ejercicios por categoría |
| `/api/exercises.json` | Todos los ejercicios en un solo array |
| `/api/exercises/<muscle>/<slug>.json` | Detalle individual |

Valores posibles:

- **bodyPart**: `arms` · `legs` · `chest` · `back` · `core` · `shoulders` · `cardio`
- **equipment**: `barbell` · `dumbbell` · `cable` · `machine` · `bodyweight` · `band` · `kettlebell` · `smith` · `ez-bar` · `lever` · `other`
- **category**: `strength` · `stretching` · `cardio` · `plyometrics`

Ejemplos en vivo:

- https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/api/index.json
- https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/api/muscles/biceps.json
- https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/api/equipment/dumbbell.json
- https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/barbell-curl.gif

## Estructura del repo

```
<muscle>/*.gif                       # GIFs originales, agrupados por músculo
api/                                 # API generada (no se edita a mano)
overrides/<muscle>/<slug>.json       # Datos manuales (nameEs, instructions, ...)
scripts/
  generate-api.js                    # Genera la carpeta /api
  init-overrides.js                  # Crea plantillas vacías de overrides
  enrich.js                          # Reglas para inferir equipment/bodyPart/category
```

## Formato de un ejercicio

```json
{
  "id": "biceps/barbell-curl",
  "slug": "barbell-curl",
  "name": "Barbell Curl",
  "nameEs": "Curl con barra",
  "muscle": "biceps",
  "bodyPart": "arms",
  "equipment": "barbell",
  "category": "strength",
  "secondaryMuscles": ["forearms"],
  "instructions": [
    "De pie, sujeta la barra con las palmas hacia arriba.",
    "Flexiona los codos llevando la barra hacia los hombros.",
    "Baja la barra controladamente hasta extender los brazos."
  ],
  "file": "biceps/barbell-curl.gif",
  "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/barbell-curl.gif"
}
```

Los campos `name`, `bodyPart`, `equipment`, `category`, `gifUrl` se infieren
automáticamente. Los campos `nameEs`, `secondaryMuscles` e `instructions`
se rellenan en `overrides/<muscle>/<slug>.json` (ver más abajo).

## Consumir desde tu app

```js
const BASE = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main";

// Lista de grupos musculares
const muscles = await fetch(`${BASE}/api/muscles.json`).then(r => r.json());

// Ejercicios de bíceps
const biceps = await fetch(`${BASE}/api/muscles/biceps.json`).then(r => r.json());

// Mostrar un GIF
// <img src={biceps.exercises[0].gifUrl} />
```

## Regenerar la API

Necesitas Node.js 18+.

```powershell
# Windows PowerShell
$env:API_BASE_URL = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main"
npm run build
```

```bash
# bash / zsh
export API_BASE_URL="https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main"
npm run build
```

Esto regenera completamente la carpeta `api/`.

## Añadir traducciones e instrucciones (overrides)

Los campos manuales viven en `overrides/<muscle>/<slug>.json`. Para crear las
plantillas vacías de todos los ejercicios:

```powershell
npm run init-overrides
```

Ejemplo de override (`overrides/biceps/barbell-curl.json`):

```json
{
  "nameEs": "Curl con barra",
  "secondaryMuscles": ["forearms"],
  "instructions": [
    "De pie, sujeta la barra con las palmas hacia arriba.",
    "Flexiona los codos llevando la barra hacia los hombros.",
    "Baja la barra controladamente hasta extender los brazos."
  ]
}
```

Reglas:

- Cualquier campo presente y **no vacío** en el override sustituye al inferido.
- Los campos vacíos (`""` o `[]`) se ignoran, así que puedes dejarlos como
  recordatorio de "falta rellenar".
- También puedes corregir `equipment`, `bodyPart` o `category` si la heurística
  los detecta mal: solo añádelos al JSON del override.
- Tras editar overrides, vuelve a ejecutar `npm run build`.

## Añadir nuevos GIFs

1. Copia los nuevos `.gif` en su carpeta de músculo correspondiente.
2. Regenera la API: `npm run build`.
3. Sube los cambios:
   ```powershell
   git add .
   git commit -m "Add new exercises"
   git push
   ```

## Versionado (recomendado para producción)

Para que tu app no se rompa si cambias archivos, usa tags:

```powershell
git tag v1.0.0
git push origin v1.0.0
```

Y en tu app cambia `@main` por `@v1.0.0`:

```
https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.0.0/api/index.json
```

## Alternativas a jsDelivr

| Forma | URL base | Notas |
|---|---|---|
| **jsDelivr** (recomendado) | `https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main` | CDN global, rápido, gratis |
| Raw GitHub | `https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main` | Sin CDN, solo para pruebas |
| GitHub Pages | `https://jahelcuadrado.github.io/ExerciseGymGifsDB` | Requiere activar Pages |

## Licencia

Los GIFs pertenecen a sus respectivos autores. Este repositorio solo
proporciona una capa de organización y consumo en formato API estática.
