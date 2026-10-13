# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The owner's personal academic homepage (Ziyang Rao) — a React + Vite + Tailwind site with prerendered page URLs, deployed to GitHub User Pages at https://www.ziyangrao.com. Maintenance is content-driven: most requests will be "update my bio / add a publication / add photos", not feature work.

## Commands

```bash
npm install
npm run dev       # Vite dev server on the dev branch
npm run build     # -> dist/
npm run deploy    # predeploy runs build, then gh-pages pushes dist/ to master
npm run preview   # serve the built dist/ locally
```

The build includes scoped SEO validation via `npm run seo:check`; `npm run seo:live` verifies deployed pages. There is no general test suite, linter, or formatter. Read `AGENTS.md` and `docs/seo-maintenance.md` before maintenance work.

## Two-branch deployment model

| Branch | Role |
|--------|------|
| `dev` | Source of truth. All edits happen here. This is the default working branch. |
| `master` | Published artifact only — the contents of `dist/`. Never edit or commit to it directly. |

GitHub User Pages must serve from `master`, hence the inversion. `npm run deploy` force-replaces the whole `master` tree via `gh-pages`.

### Domain and verification files — do not delete

`gh-pages` replaces the *entire* `master` tree on every deploy, so anything that must exist at the site root has to live in `public/` and be copied in by the build. Two such files exist:

- `public/CNAME` → `www.ziyangrao.com` (the custom domain)
- `public/399cced8eb5c43350950649d7d1552a0.txt` (WeChat site-verification token)

Historically neither was in `public/`, so every deploy wiped them and the custom domain broke until `CNAME` was hand-restored on `master` — hence the alternating `Updates` / `Create CNAME` commits in `master`'s history. That is fixed; keep it fixed. **Never remove these from `public/`, and after any deploy confirm both are present at the site root.** The verification token was recovered from commit `765b163` and had already been lost from the live site before being restored.

### Repo hygiene

`.gitignore` excludes `node_modules/`, `dist/`, and `.DS_Store`. `dist/` is intentionally *not* tracked on `dev` — it only ever exists on `master`, produced by `npm run deploy`. Don't re-add it.

## Architecture

Content and presentation are deliberately separated:

- **`src/data/content.jsx`** — a single exported `CONFIG` object holding *all* site content: `profile`, `researchInterests`, `aboutMe`, `publications`, `projects`, `education`, `blogs`, `galleries`. **Content changes should be made here, not in components.**
- **`src/App.jsx`** — nav, dark-mode state, footer, and pathname-based page selection. `/`, `/blog/`, `/life/`, `/fm-geometry/` and content-backed `/blog/<id>/` have real static documents. Navigation uses ordinary anchors; legacy `/#blog` and `/#life` links are restored through a client redirect.
- **`src/data/seo.js` and `site.js`** — page registry, metadata, structured data and canonical origin. The prerender script produces every registered HTML route, sitemap and robots file from one Vite HTML template. Never maintain a second metadata copy in another HTML file.
- **`src/components/{HomePage,BlogPage,LifePage}.jsx`** — one per page; each maps over its `CONFIG` slice. `BlogPage` also exports `BlogDetail`.
- **`src/components/ui/{FlatCard,SectionTitle}.jsx`** — the only shared primitives. `SectionTitle` takes an `accentColor` Tailwind class; `FlatCard` becomes clickable when given `onClick`.

Notable conventions:

- **Dark mode** is Tailwind `darkMode: 'class'`, driven by a `dark` class on App's outermost div. State initializes from `localStorage.theme`, falling back to `prefers-color-scheme`, and follows OS changes only while no explicit choice is stored. Every new element needs paired `light dark:` classes.
- **Colors are semantic per page**: indigo = Home/About, teal = Blog, blue = Life/Education. The accent bars, nav highlights, and top decorative stripe all follow this. Match it when adding sections.
- **Style vocabulary**: flat (no rounded corners), heavy uppercase tracking-widest micro-labels, `font-black`, grayscale images that colorize on hover.
- **`aboutMe` is Markdown** rendered by `react-markdown` with `rehype-raw`. String blog `content` is rendered as Markdown; React elements remain supported. Use H2 and below inside articles because the template supplies H1. Blog IDs are stable URL slugs; `href` entries link an existing project instead of creating a duplicate article.
- **Assets** live in `public/` and are referenced by absolute path (`/images/...`, `/documents/...`). Filenames are case-sensitive once deployed; macOS is not, so a wrong-case path works locally and 404s in production. The gallery files are lowercase `.jpg` (the git index once disagreed with the disk on this and has been corrected).
- **`index.html`** is the shared skeleton with SEO markers. Metadata is generated from `src/data/seo.js`; the client uses the same generator in development. The favicon is declared in the shared template; update it there if the icon changes.
- **Images** under `public/images/` are optimized automatically by `npm run images` before dev/build. Keep originals; commit regenerated `public/images/optimized/` and `src/data/imageManifest.json`. `ResponsiveImage` reads the manifest for dimensions and srcset. Paper figures retain their already compressed files.

## Publications and projects

`CONFIG.publications` is populated and its section in `HomePage.jsx` is live. Conventions:

- **First-author papers first, then accepted papers, then other preprints; newest first within each group.** Preprints use `venue: "Preprint"` with the neutral slate `venueColor`; peer-reviewed work uses its real venue and an accent color.
- **`authors`** wraps the owner's name in `**Ziyang Rao**`. `HomePage.jsx` splits on `**…**` and bolds it — this is a hand-rolled split, not Markdown, so only that one emphasis form works.
- **`links`** keys (`pdf`, `code`, `doi`) each render an icon only when present; omit rather than passing `"#"`.
- The list is maintained by hand. Google Scholar blocks automated fetching, so use the **arXiv API** and **DBLP** to enumerate papers (both worked); note DBLP lists arXiv and conference versions of the same paper separately, and a same-name author (a 2022 *Sensors* paper on drunk-driving detection) appears in DBLP/OpenAlex but is **not** the site owner — don't re-add it.

`CONFIG.projects` is still an empty array with its shape documented in a comment, and its section in `HomePage.jsx` stays commented out. Populate the array *and* un-comment the section together.
