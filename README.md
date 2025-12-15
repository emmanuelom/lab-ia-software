# Laboratorio en Inteligencia Artificial y Desarrollo de Software

Bienvenido al repositorio del sitio web del Laboratorio de IA. Este proyecto es una página estática (SPA) diseñada para ser ligera, rápida y fácil de gestionar mediante archivos JSON.

## 1. Estructura General del Proyecto

El sitio separa claramente el **contenido**, la **presentación** y la **lógica**.

```text
/
├── content/            # ¡AQUÍ VIVE EL CONTENIDO! (JSONs)
│   ├── posts/          # Archivos individuales para cada artículo del blog
│   ├── blog_index.json # Índice/Lista de todos los posts visibles
│   ├── hero.json       # Textos de la sección principal (Hero)
│   ├── areas.json      # Tarjetas de áreas de investigación
│   └── team.json       # Miembros del equipo
├── assets/             # Imágenes, iconos y logos
├── css/                # Estilos visuales (styles.css)
├── js/                 # Lógica de la aplicación (app.js)
└── index.html          # Punto de entrada principal
```

## 2. Flujo para Subir un Nuevo Post (Blog/Proyectos)

El proceso consta de dos pasos: Crear el archivo del post y registrarlo en el índice.

### Paso 1: Crear el archivo del post
Navega a la carpeta `content/posts/` y crea un nuevo archivo JSON.
**Nombre del archivo:** Debe ser único y sin espacios. Ejemplo: `mi-nuevo-articulo.json`.

**Contenido del archivo (Plantilla):**
```json
{
  "slug": "mi-nuevo-articulo",
  "title": "Título del Artículo",
  "author": "Nombre del Autor",
  "date": "2023-12-01",
  "tags": ["IA", "Investigación"],
  "status": "Publicado",
  "image": "assets/projects/banner_opcional.png",
  "summary": "Un resumen corto que aparecerá en la tarjeta de la página principal.",
  "body": "<h2>Subtítulo</h2><p>Aquí va el contenido principal. Puedes usar HTML para formato, como <b>negritas</b> o listas.</p>"
}
```
> **Nota:** El campo `body` soporta HTML básico (`<p>`, `<h2>`, `<ul>`, `<img>`, etc.).

### Paso 2: Registrar en el Índice
Para que el post aparezca en la lista de la página principal, debes agregarlo a `content/blog_index.json`.

Abre `content/blog_index.json` y agrega un nuevo objeto al inicio de la lista:
```json
[
  {
    "slug": "mi-nuevo-articulo",
    "title": "Título del Artículo",
    "summary": "El mismo resumen corto...",
    "tags": ["IA", "Investigación"],
    "status": "Publicado",
    "date": "2023-12-01",
    "author": "Nombre del Autor",
    "image": "assets/projects/banner_opcional.png"
  },
  ...
]
```
> **Importante:** El `slug` en el índice debe coincidir **exactamente** con el nombre del archivo JSON creado en el Paso 1 (sin la extensión `.json`).

## 3. Flujo para Actualizar Contenido Existente

### Textos Generales (Hero, Misión, Visión)
Edita el archivo `content/hero.json`.
- Aquí puedes cambiar la descripción principal, misión, visión y valores.
- Los saltos de línea en el JSON usa `\n`.

### Equipo (Miembros)
Edita `content/team.json`.
- Puedes agregar nuevos objetos para nuevos miembros.
- Asegúrate de subir la foto correspondiente a `assets/team/`.

### Editar un Post
Si necesitas corregir un error ortográfico o cambiar información de un artículo:
1. Ve a `content/posts/nombre-del-post.json`.
2. Edita directamente el campo `body` o los metadatos.
3. Guarda el archivo. Los cambios se reflejarán inmediatamente (si usas un servidor local, podría requerir recargar caché).

## 4. Explicación de las Secciones del Sitio

| Sección | Archivo Fuente | Descripción |
|---------|----------------|-------------|
| **Hero (Inicio)** | `content/hero.json` | Título grande, descripción, misión y visión. |
| **Investigación** | `content/areas.json` | Tarjetas simples describiendo las líneas de investigación. |
| **Blog / Proyectos** | `content/blog_index.json` | Lista de tarjetas clicables. Al dar clic, carga el JSON individual. |
| **Detalle de Post** | `content/posts/*.json` | Vista de lectura completa. Se carga dinámicamente sin recargar la página. |
| **Equipo** | `content/team.json` | Lista de miembros con fotos y redes sociales. |

## 5. Convenciones y Buenas Prácticas

- **Formato de Fecha:** Usa siempre `AAAA-MM-DD` (ej. `2024-01-15`) para mantener consistencia.
- **Nombres de Archivos (Slugs):** Usa minúsculas y guiones. Evita tildes o caracteres especiales.
  - ✅ `vision-artificial.json`
  - ❌ `Visión Artificial.json`
- **Imágenes:**
  - Guárdalas siempre en `assets/`.
  - Intenta que no sean muy pesadas (>500KB) para no alentar el sitio.
- **JSON Válido:** Asegúrate de que tu sintaxis JSON sea correcta (comillas dobles, comas al final de líneas intermedias, sin coma en la última línea). Puedes usar validadores online como jsonlint.com.

---
**Desarrollado para la Universidad De La Salle Bajío - Laboratorio de IA**