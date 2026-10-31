# Pedro Ferreiro Rega · personal website

A personal academic website for GitHub Pages, with a custom minimal layout for research, scientific communications and professional background.

## Run locally

Requires Node.js 18+ and Python 3. No npm packages or installation needed.

```sh
npm run build
npm run check
npm run dev
```

Open http://127.0.0.1:4321. To test the project subpath exactly, serve the parent directory and open `/CV/`.

## Update content

Edit `content/profile.json`, then run `npm run build` and `npm run check`. Commit the content **and generated HTML/search files** together. `scripts/build.mjs` generates the pages directly in the repository root. Do not edit generated HTML by hand.

- `about`, `interests`: introduction and focus areas.
- `research`, `projects`: research experience and portfolio.
- `innovation`: OneHealth DataSpace project, confirmed involvement, context and public resources. The optional `contribution`, `work` and `outcomes` fields stay hidden until real content is added.
- `publications`: scientific communications; year filters are generated from the data.
- `education`, `courses`, `skills`, `languages`: printable CV.
- `url`: production origin and project path, currently `https://pedro-fr.github.io/CV`.
- `email`, `github`, `linkedin`, `orcid`: shared contact links.

Existing content was migrated from the original CV. Degree dates and status are preserved as originally written, including the expected MSc completion in 2025; confirm these when updating content. Communications are not presented as peer-reviewed articles, and there are no invented DOI or download links. The contact email comes from the original README.

The original CV text is retained at `docs/original-content.md` for comparison.

## Structure and behavior

- About, Research, Innovation, Publications and CV.
- The homepage contains the profile, About and Focus areas. Research, Innovation, Publications and CV are reached through the main navigation.
- OneHealth DataSpace has a dedicated Innovation page. Its project context links to the official website; personal responsibilities and results are not assumed.
- Responsive navigation; all content works without JavaScript.
- Research visualization with subtle motion, selectable stages and captions synchronized to the active node. Reduced-motion preferences disable the animation.
- Light theme by default, with a persistent light/dark toggle.
- Local full-site search via the search button or Ctrl/⌘ K. Escape closes it.
- Communications filtered by year.
- CV with print styling: **Print / save as PDF** opens the browser's print dialog. No pre-generated PDF is claimed.
- Skip link, visible keyboard focus, reduced-motion support, local assets, no analytics or third-party runtime requests.
- Canonicals, social metadata, favicon, sitemap, robots file and custom 404.
- Legacy `/pages/portfolio`, `/pages/portfolio/` and `/pages/portfolio.html` lead to Research.

## GitHub Pages

This is a static site. The `.nojekyll` file disables Jekyll so the committed HTML is served directly. In repository Settings → Pages, keep **Deploy from a branch**, with your published branch and **/ (root)**. No theme, Ruby, dependencies, secrets or custom build action are needed. The new design becomes live once these files are merged into the configured published branch.

Relative navigation and assets work at both `/CV/` and the domain root. For a custom domain, change `url`, regenerate and configure the domain in GitHub Pages.

The validation script checks local links/assets and anchors under `/CV/`, page metadata, active navigation, search coverage and migration of CV entries. Browser verification should also cover search, filtering, mobile navigation, both themes and print preview.

## Credits and third-party notices

- Hosting: GitHub Pages.
- Interface and diagram icons: [Feather](https://github.com/feathericons/feather), copyright © 2013–2023 Cole Bemis, under the MIT license. The official SVG paths are stored locally in `assets/icons/feather.json`; the full license is distributed in `assets/licenses/feather.txt` and linked from every page footer. Stroke width and rendered size are adapted to the site.
- The biology cell and illuminated lightbulb icons, the identifier badge, and the three-node composition are custom SVG/CSS.
- The portrait, project preview and biographical content are retained from this repository.
- Fonts use the visitor’s system font stack; no font files or third-party webfont services are bundled.
- The site uses custom HTML, CSS and JavaScript with no theme or runtime packages.
