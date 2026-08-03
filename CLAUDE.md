# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The owner's personal academic homepage (Ziyang Rao) — a single-page React + Vite + Tailwind site deployed to GitHub User Pages at https://www.ziyangrao.com. Maintenance is content-driven: most requests will be "update my bio / add a publication / add photos", not feature work.

## Commands

```bash
npm install
npm run dev       # Vite dev server on the dev branch
npm run build     # -> dist/
npm run deploy    # predeploy runs build, then gh-pages pushes dist/ to master
npm run preview   # serve the built dist/ locally
```

There is no test suite, linter, or formatter configured. Don't invent one unless asked.

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
- **`src/App.jsx`** — the whole shell: nav, dark-mode state, footer, and routing. "Routing" is `useState` only (`currentPage` ∈ `home` | `blog` | `life`, plus `selectedBlog` which overrides the page to render `BlogDetail`). No react-router, no URLs per page — links to a specific section/post are not possible without adding a router.
- **`src/components/{HomePage,BlogPage,LifePage}.jsx`** — one per page; each maps over its `CONFIG` slice. `BlogPage` also exports `BlogDetail`.
- **`src/components/ui/{FlatCard,SectionTitle}.jsx`** — the only shared primitives. `SectionTitle` takes an `accentColor` Tailwind class; `FlatCard` becomes clickable when given `onClick`.

Notable conventions:

- **Dark mode** is Tailwind `darkMode: 'class'`, driven by a `dark` class on App's outermost div. State initializes from `localStorage.theme`, falling back to `prefers-color-scheme`, and follows OS changes only while no explicit choice is stored. Every new element needs paired `light dark:` classes.
- **Colors are semantic per page**: indigo = Home/About, teal = Blog, blue = Life/Education. The accent bars, nav highlights, and top decorative stripe all follow this. Match it when adding sections.
- **Style vocabulary**: flat (no rounded corners), heavy uppercase tracking-widest micro-labels, `font-black`, grayscale images that colorize on hover.
- **`aboutMe` is Markdown** rendered by `react-markdown` with `rehype-raw`, so raw HTML like `<mark>` works and is styled by the custom `components` map in `HomePage.jsx`. Blog `content`, by contrast, is rendered as a plain React child — it is *not* passed through Markdown.
- **Assets** live in `public/` and are referenced by absolute path (`/images/...`, `/documents/...`). Filenames are case-sensitive once deployed; macOS is not, so a wrong-case path works locally and 404s in production. The gallery files are lowercase `.jpg` (the git index once disagreed with the disk on this and has been corrected).
- **`index.html`** carries the real `<title>`, description, and Open Graph tags. The favicon is declared there *and* re-injected at runtime by `App.jsx` from `CONFIG.profile.favicon`; if you change the icon, update both.

## Publications and projects

`CONFIG.publications` is populated and its section in `HomePage.jsx` is live. Conventions:

- **Newest first.** Preprints use `venue: "Preprint"` with the neutral slate `venueColor`; peer-reviewed work uses its real venue and an accent color.
- **`authors`** wraps the owner's name in `**Ziyang Rao**`. `HomePage.jsx` splits on `**…**` and bolds it — this is a hand-rolled split, not Markdown, so only that one emphasis form works.
- **`links`** keys (`pdf`, `code`, `doi`) each render an icon only when present; omit rather than passing `"#"`.
- The list is maintained by hand. Google Scholar blocks automated fetching, so use the **arXiv API** and **DBLP** to enumerate papers (both worked); note DBLP lists arXiv and conference versions of the same paper separately, and a same-name author (a 2022 *Sensors* paper on drunk-driving detection) appears in DBLP/OpenAlex but is **not** the site owner — don't re-add it.

`CONFIG.projects` is still an empty array with its shape documented in a comment, and its section in `HomePage.jsx` stays commented out. Populate the array *and* un-comment the section together.
