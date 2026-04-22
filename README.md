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
| `/api/index.json` | Metadata global + listado de grupos |
| `/api/muscles.json` | Lista simple de grupos musculares |
| `/api/exercises.json` | Todos los ejercicios en un solo array |
| `/api/muscles/<muscle>.json` | Ejercicios de un grupo |
| `/api/exercises/<muscle>/<slug>.json` | Detalle individual |

Ejemplos en vivo:

- https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/api/index.json
- https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/api/muscles/biceps.json
- https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/barbell-curl.gif

## Estructura del repo

```
<muscle>/*.gif                       # Los GIFs originales, agrupados por músculo
api/
  index.json                         # Metadata global
  muscles.json                       # Lista simple de grupos
  exercises.json                     # Todos los ejercicios
  muscles/<muscle>.json              # Ejercicios de un grupo
  exercises/<muscle>/<slug>.json     # Detalle individual
scripts/
  generate-api.js                    # Generador de la carpeta /api
```

## Formato de un ejercicio

```json
{
  "id": "biceps/barbell-curl",
  "slug": "barbell-curl",
  "name": "Barbell Curl",
  "muscle": "biceps",
  "file": "biceps/barbell-curl.gif",
  "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/barbell-curl.gif"
}
```

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
