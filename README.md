# Exercise Gym GIFs DB

API estática (solo archivos JSON + GIFs) servida directamente desde GitHub a
través del CDN gratuito de **jsDelivr**. Pensada para consumirse desde cualquier
app móvil o web sin necesidad de backend.

- **Repo:** https://github.com/JahelCuadrado/ExerciseGymGifsDB
- **Base URL (jsDelivr):** `https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0`
- **Última release estable:** `v1.1.0` · **Desarrollo activo:** rama `version-1.2.0`
- **19 grupos musculares · 1323 ejercicios**

## Endpoints

La API es **multilingüe**. Sustituye `<lang>` por `en` o `es`.

| Endpoint | Descripción |
|---|---|
| `/api/index.json` | Metadata global e idiomas disponibles |
| `/api/<lang>/index.json` | Metadata del idioma |
| `/api/<lang>/muscles.json` | Lista de grupos musculares |
| `/api/<lang>/muscles/<muscle>.json` | Ejercicios de un grupo |
| `/api/<lang>/equipment.json` | Lista de equipamientos |
| `/api/<lang>/equipment/<equipment>.json` | Ejercicios por equipamiento |
| `/api/<lang>/bodyparts.json` | Lista de partes del cuerpo |
| `/api/<lang>/bodyparts/<bodyPart>.json` | Ejercicios por parte del cuerpo |
| `/api/<lang>/categories.json` | Lista de categorías |
| `/api/<lang>/categories/<category>.json` | Ejercicios por categoría |
| `/api/<lang>/exercises.json` | Todos los ejercicios |
| `/api/<lang>/exercises/<muscle>/<slug>.json` | Detalle individual |

Valores posibles:

- **bodyPart**: `arms` · `legs` · `chest` · `back` · `core` · `shoulders` · `cardio`
- **equipment**: `barbell` · `dumbbell` · `cable` · `machine` · `bodyweight` · `band` · `kettlebell` · `smith` · `ez-bar` · `lever` · `other`
- **category**: `strength` · `stretching` · `cardio` · `plyometrics`

Ejemplos en vivo:

- https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/api/index.json
- https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/api/es/muscles/biceps.json
- https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/api/en/muscles/biceps.json
- https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/barbell-curl.gif

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

El esquema es idéntico en todos los idiomas; lo que cambia es el contenido de
`name` e `instructions`.

```json
{
  "id": "biceps/barbell-curl",
  "slug": "barbell-curl",
  "name": "Curl con barra",
  "muscle": "biceps",
  "bodyPart": "arms",
  "equipment": "barbell",
  "category": "strength",
  "secondaryMuscles": ["forearms"],
  "instructions": [
    "Carga el peso adecuado en la barra y adopta la postura inicial.",
    "Activa el biceps antes de iniciar el movimiento.",
    "..."
  ],
  "file": "biceps/barbell-curl.gif",
  "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/barbell-curl.gif"
}
```

## Consumir desde tu app

```js
const BASE = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0";
const LANG = "es"; // o "en"

// Lista de grupos musculares
const muscles = await fetch(`${BASE}/api/${LANG}/muscles.json`).then(r => r.json());

// Ejercicios de bíceps
const biceps = await fetch(`${BASE}/api/${LANG}/muscles/biceps.json`).then(r => r.json());

// Mostrar un GIF
// <img src={biceps.exercises[0].gifUrl} />
```

## Regenerar la API

Necesitas Node.js 18+.

```powershell
# Windows PowerShell
$env:API_BASE_URL = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0"
npm run build
```

```bash
# bash / zsh
export API_BASE_URL="https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0"
npm run build
```

Esto regenera completamente la carpeta `api/`.

## Añadir traducciones e instrucciones (overrides)

Los campos manuales viven en `overrides/<muscle>/<slug>.json`. Para crear las
plantillas vacías de todos los ejercicios:

```powershell
npm run init-overrides
```

Formato recomendado (multilingüe):

```json
{
  "secondaryMuscles": ["forearms"],
  "en": {
    "name": "Barbell Curl",
    "instructions": ["Step 1...", "Step 2..."]
  },
  "es": {
    "name": "Curl con barra",
    "instructions": ["Paso 1...", "Paso 2..."]
  }
}
```

Reglas:

- Cualquier campo presente y **no vacío** en el override sustituye al inferido.
- También se admite el formato legacy `{ nameEs, instructions }` para
  compatibilidad.
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

Las URLs publicadas están ancladas a un tag SemVer (`v1.1.0` actualmente). Para
liberar una nueva versión: taggea, regenera con `API_REF=vX.Y.Z` y publica.

```powershell
git tag v1.2.0
git push origin v1.2.0
```

Luego en tu app cambia `@v1.1.0` por la nueva:

```
https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.2.0/api/index.json
```

## Alternativas a jsDelivr

| Forma | URL base | Notas |
|---|---|---|
| **jsDelivr** (recomendado) | `https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0` | CDN global, rápido, gratis |
| Raw GitHub | `https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main` | Sin CDN, solo para pruebas |
| GitHub Pages | `https://jahelcuadrado.github.io/ExerciseGymGifsDB` | Requiere activar Pages |

## Licencia

Los GIFs pertenecen a sus respectivos autores. Este repositorio solo
proporciona una capa de organización y consumo en formato API estática.
