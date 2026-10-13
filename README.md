# Ziyang Rao — Academic Homepage

React, Vite and Tailwind site published at https://www.ziyangrao.com.

## Source and published branches

| Branch | Purpose |
| --- | --- |
| `dev` | Source code and content; make all edits here |
| `master` | Generated GitHub Pages site; do not edit directly |

`dist/` is generated and ignored on `dev`. Publishing uses the existing
`gh-pages` command and replaces the published tree on `master`.

## Develop and verify

Use Node 22 (`.nvmrc`).

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run preview
```

The build optimizes images, runs Vite, renders every registered route into static
HTML, generates sitemap/robots, then validates SEO. Navigation and all content
remain usable without JavaScript; the browser hydrates theme, chart, demo and
citation controls. Inspect changed pages in the browser before publishing.

## Content and SEO

| File | Responsibility |
| --- | --- |
| `src/data/content.jsx` | Profile, bio, publications, education, blogs, gallery descriptions |
| `src/data/fmGeometry.js` | FM Geometry paper facts, results, links and citation |
| `src/data/seo.js` | Page registry, SEO metadata and structured data |
| `src/data/site.js` | Canonical site origin and route normalization |
| `src/components/` | Page presentation and interactive controls |
| `scripts/prerender.mjs` | Static pages, sitemap and robots generation |
| `scripts/check-seo.mjs` | Local and live SEO verification |

Pages: `/`, `/blog/`, `/life/`, `/fm-geometry/`. A blog with content and
a stable `id`, without `href`, also generates `/blog/<id>/`.
Old `/#blog` and `/#life` links redirect after client startup. The custom
`404.html` is marked noindex.

The homepage creates Person, ProfilePage, WebSite and publication-list structured
data from visible content. Paper pages retain citation metadata. Each page has a
unique title, description, canonical and sharing card. Metadata is generated
from one configuration; do not copy it into additional HTML templates or
manually maintain the sitemap.

## Images

Keep original photos in `public/images/`; after changing them run:

```bash
npm run images
```

Commit updated derivatives in `public/images/optimized/` and
`src/data/imageManifest.json`. The build also runs this task automatically.
WebP, responsive image candidates, dimensions and lazy loading reduce the
browser's image downloads. FM Geometry's compressed figures and manual video
playback are preserved.

## Publish

1. Commit the reviewed changes on `dev` and push the source branch.
2. Run `npm run deploy`. Its predeploy build must pass all SEO checks before
   publishing to `master`.
3. After GitHub Pages updates, run `npm run seo:live` to verify the public pages,
   assets, sitemap, robots and domain/verification files.

GitHub Actions runs the same build on `dev` pushes and PRs. It does not publish
automatically or require deployment credentials.

Keep these files in `public/` so every build preserves them:

- `CNAME`: custom domain.
- `399cced8eb5c43350950649d7d1552a0.txt`: existing site verification.

## Maintenance guides

- [全站 SEO 与维护手册](docs/seo-maintenance.md): adding papers/posts/pages,
  release checks, search-console setup, observation cadence, rollback and
  dependency maintenance.
- [FM Geometry SEO guide](docs/fm-geometry-seo.md): paper keywords and research
  backlinks.

Search-console accounts, indexing submissions and DNS changes are separate from
the site build. Structured data and sitemap help discovery; ranking depends on
content, competition and relevant external references.
