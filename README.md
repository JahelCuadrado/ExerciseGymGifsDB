# Exercise GIF API

API estática (solo archivos JSON + GIFs) servida directamente desde GitHub.
Pensada para consumirse desde cualquier app móvil o web sin necesidad de
backend.

## Estructura

```
<muscle>/*.gif          # Los GIFs originales, agrupados por músculo
api/
  index.json            # Metadata global + listado de grupos
  muscles.json          # Lista simple de grupos musculares
  exercises.json        # Todos los ejercicios en un solo array
  muscles/<muscle>.json # Ejercicios de un grupo
  exercises/<muscle>/<slug>.json # Detalle individual
```

Cada ejercicio:

```json
{
  "id": "biceps/barbell-curl",
  "slug": "barbell-curl",
  "name": "Barbell Curl",
  "muscle": "biceps",
  "file": "biceps/barbell-curl.gif",
  "gifUrl": "https://cdn.jsdelivr.net/gh/USER/REPO@main/biceps/barbell-curl.gif"
}
```

## Generar la API

Necesitas Node.js 18+.

```bash
# (Opcional) define la URL pública de tus archivos
# Windows PowerShell:
$env:API_BASE_URL = "https://cdn.jsdelivr.net/gh/TU_USUARIO/TU_REPO@main"
# bash:
export API_BASE_URL="https://cdn.jsdelivr.net/gh/TU_USUARIO/TU_REPO@main"

npm run build
```

Esto regenera la carpeta `api/` con todos los JSON.

## Publicar en GitHub

1. Crea un repo en GitHub y sube el contenido de esta carpeta.
2. Elige una de estas formas de servirlo (todas son gratis):

### Opción A — jsDelivr (recomendado, CDN rápido)

```
https://cdn.jsdelivr.net/gh/USUARIO/REPO@main/api/index.json
https://cdn.jsdelivr.net/gh/USUARIO/REPO@main/biceps/barbell-curl.gif
```

Para versionar, usa un tag: `@v1.0.0` en vez de `@main`.

### Opción B — Raw GitHub

```
https://raw.githubusercontent.com/USUARIO/REPO/main/api/index.json
https://raw.githubusercontent.com/USUARIO/REPO/main/biceps/barbell-curl.gif
```

> Raw no tiene CDN ni cache fuerte; úsalo solo para pruebas.

### Opción C — GitHub Pages

Activa Pages desde la rama `main` (carpeta `/`) y consume:

```
https://USUARIO.github.io/REPO/api/index.json
https://USUARIO.github.io/REPO/biceps/barbell-curl.gif
```

## Consumir desde tu app

```js
const base = "https://cdn.jsdelivr.net/gh/USUARIO/REPO@main";

// Lista de grupos musculares
const muscles = await fetch(`${base}/api/muscles.json`).then(r => r.json());

// Ejercicios de un grupo
const biceps = await fetch(`${base}/api/muscles/biceps.json`).then(r => r.json());

// Mostrar un GIF
// <img src={biceps.exercises[0].gifUrl} />
```

## Notas

- Vuelve a ejecutar `npm run build` cada vez que añadas o renombres un GIF.
- El `gifUrl` se calcula con `API_BASE_URL`; cámbiala antes de publicar.
- Los nombres de archivo se convierten a `name` legible (`barbell-curl` →
  `Barbell Curl`).
