# Pedro Ferreiro Rega · web personal

Web académica estática construida con **Astro** y un diseño propio. Conserva las páginas About, Research, Innovation, Publications y CV, el modo claro por defecto y el esquema animado de la portada.

## Empezar

Necesitas **Node.js 24 LTS** y npm. La versión está indicada en `.nvmrc`; si utilizas nvm, ejecuta `nvm install` y `nvm use` en esta carpeta.

```sh
npm ci
npm run dev
```

Abre **http://127.0.0.1:4321/CV/**. Al guardar un archivo, la vista previa se actualiza automáticamente. El prefijo `/CV/` coincide con GitHub Pages.

## Qué archivo editar

| Quiero cambiar… | Archivo |
| --- | --- |
| El título «Biology meets computation.» o la introducción de Research | `content/pages/research.json` → `heading` o `description` |
| Los encabezados y textos de otra página | `content/pages/home.json`, `innovation.json`, `publications.json` o `cv.json` |
| Biografía, experiencia, formación, publicaciones, proyectos o enlaces personales | `content/profile.json` |
| Etiquetas y explicaciones del esquema animado | `content/research-approach.json` |
| El contenido o la distribución de una página | `src/pages/index.astro`, `research.astro`, `innovation.astro`, `publications.astro` o `cv.astro` |
| Cabecera o navegación | `src/components/Header.astro` y `src/data/navigation.ts` |
| Pie de página y créditos | `src/components/Footer.astro` |
| Colores, tamaños, espacios y distribución móvil | `src/styles/global.css` |
| Movimiento del esquema o sincronización de sus textos | `src/scripts/research-approach.js` |

Por ejemplo, para cambiar el encabezado de Research, basta con editar:

```json
"heading": "Biology meets computation."
```

No tienes que editar HTML generado ni ejecutar una generación después de cada cambio durante el desarrollo. Los JSON contienen texto plano; Astro lo escapa al mostrarlo. Mantén las claves y la sintaxis JSON, y cambia los valores.

## Organización

- `content/`: datos y textos editables, separados del diseño.
- `src/pages/`: una página Astro por sección y los endpoints de búsqueda, sitemap y robots.
- `src/components/`: piezas compartidas como cabecera, pie, publicaciones, experiencia y esquema animado.
- `src/layouts/BaseLayout.astro`: estructura común, metadatos y carga de estilos/scripts.
- `src/scripts/`: módulos pequeños para búsqueda, temas, menú, filtros, CV y animación.
- `public/`: imágenes, favicon, licencias y redirecciones antiguas. Se copian a la web sin procesamiento.
- `dist/`: web generada para publicar. Está ignorada por Git y no se edita.

La portada termina tras Focus areas. Los detalles de cada sección están en sus propias páginas. Innovation admite `contribution`, `work` y `outcomes`; los apartados vacíos no se muestran. No se han supuesto responsabilidades ni resultados personales.

Se han conservado las fechas y el estado originales de la formación, incluido el máster con finalización prevista en 2025; deben revisarse en la fase de contenido. El texto original se conserva en `docs/original-content.md`.

## Comprobar y preparar una publicación

```sh
npm run validate
npm run preview
```

`validate` comprueba los componentes, genera `dist/` y revisa enlaces, recursos, metadatos, búsqueda, contenido del CV y redirecciones antiguas. `preview` permite revisar la versión de producción en `/CV/`.

Para ejecutar los pasos por separado:

```sh
npm run check
npm run build
npm run test
```

El CV usa el diálogo de impresión del navegador para guardar un PDF. Su maquetación final en impresión debe revisarse visualmente antes de dar por definitivo el documento.

## GitHub Pages

El workflow `.github/workflows/deploy.yml` valida cada pull request y publica automáticamente **solo los cambios integrados en `main`**. No necesitas generar ni subir los HTML a Git.

Al adoptar esta versión, selecciona una vez **Settings → Pages → Source → GitHub Actions**. La PR no se fusiona ni la web pública se sustituye como parte de la migración.

La URL de producción está en `content/profile.json` → `url`. `astro.config.mjs` deriva de ella el dominio y el prefijo `/CV/`; todos los enlaces internos e imágenes usan un único helper. Para un dominio propio, actualiza `url` y configura el dominio en GitHub Pages. `SITE_BASE_PATH=/` permite verificar una compilación en la raíz de un dominio.

Las rutas antiguas `/pages/portfolio`, `/pages/portfolio/` y `/pages/portfolio.html` siguen llevando a Research.

## Funcionalidades y créditos

- Menú móvil, búsqueda local con Ctrl/⌘ K, filtros por año y selector de tema persistente.
- Animación CSS con textos sincronizados y bombilla de Understanding. Respeta la preferencia de movimiento reducido.
- Contenido legible sin JavaScript, enlace para saltar al contenido y foco de teclado visible.
- Sin analítica, servicios de búsqueda externos ni fuentes remotas.
- Hosting: GitHub Pages. Generación: [Astro](https://github.com/withastro/astro), con aviso MIT en `public/assets/licenses/astro.txt`.
- Iconos: [Feather](https://github.com/feathericons/feather), copyright © 2013–2023 Cole Bemis, MIT. Los trazados están en `src/data/feather.json` y la licencia completa en `public/assets/licenses/feather.txt`, enlazada en el pie.
- LinkedIn: SVG de Material Design Icons / Pictogrammers. ORCID: SVG de Simple Icons (CC0). Las marcas conservan los derechos de sus titulares; procedencia y avisos en `public/assets/licenses/brand-icons.txt`, enlazado en el pie. Los trazados se guardan en `src/data/brand-icons.json`.
- La célula, la bombilla y la composición del esquema son SVG/CSS propios.
- Retrato, imagen del proyecto y contenido biográfico conservados del repositorio original. Tipografía del sistema.
- Diseño propio, sin tema prediseñado.
