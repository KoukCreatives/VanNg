# Van Ng: celebrant website (Kouk Creatives)

This folder holds the Round 1 design concepts for KC-575. Nothing here is client-approved. The copy is the KC-576 draft. The Chinese text is a type-testing draft that needs the agreed translator and a fluent reviewer.

**Live concepts:** https://koukcreatives.github.io/VanNg/ (GitHub Pages, noindex). Start at the overview board, then read `TYPOGRAPHY.md` (also at `typography.html`).

## Layout

```
index.html            overview: links + live previews of the 8 homepage designs
Home-01.html … Home-08.html   eight distinct homepage designs, each with an EN / 繁體 / 简体 (test) switch
privacy.html          shared draft privacy notice (EN / 繁體 / 简体)
typography.html       TYPOGRAPHY.md rendered for the live site
TYPOGRAPHY.md         shared bilingual type system and decisions
concepts/
  NN-name-en.html       home page, English
  NN-name-zh-hant.html  home page, Traditional Chinese (draft)
  NN-name-zh-hans.html  home page, Simplified Chinese (auto-converted test)
  NN-name-type.html     type system, both scripts, contrast table
assets/
  base.css              shared system (stacks, scale, components)
  NN-name.css           concept tokens and layout (generated)
  type.css              type-sheet styles
screens/                Playwright renders, 390px and 1440px, EN and 中文
screens/fallback/       Concept 1 with all web fonts blocked
build/                  generator scripts (Node 22)
```

The files are flat so they can be browsed on GitHub. The real site would use `/zh-hant/` or `/zh-hans/` URL prefixes once the script is decided.

## Rebuilding

```
npm i @fontsource/{cormorant-garamond,source-sans-3,noto-serif-tc,noto-sans-tc,noto-serif-sc,noto-sans-sc,literata,fraunces,noto-serif,source-serif-4,lxgw-wenkai-tc,lxgw-wenkai} opencc-js playwright
node build/build.mjs     # pages + concept CSS
node build/homes.mjs     # Home-01.html … Home-08.html
node build/board.mjs     # index.html
node build/shoot.mjs     # screenshots (serves fonts from node_modules)
ARTIFACT=1 node build/build.mjs && node build/artifact.mjs   # dist/ for claude.ai hosting (Google Fonts) + typography.html
```

Pages load fonts from jsDelivr (Fontsource, pinned versions). Production should self-host the same WOFF2 files in the WordPress child theme.

## Image and content rules

* Photos on the Home pages are generic Unsplash sample images (Unsplash License), hotlinked from images.unsplash.com and marked “Sample image”. IDs are listed in `build/homes-core.mjs` (IMG). None shows Van; replace them with her authorised photos before launch.
* `privacy.html` is a generic draft privacy notice for layout. It needs review against the real enquiry setup before any form goes live.
* The testimonial on KC-576 is not used (permission pending).
* There are no fees, availability promises, tea-ceremony or MC services, or legal-advice claims.
