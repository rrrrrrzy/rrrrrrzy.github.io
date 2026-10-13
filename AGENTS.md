# Maintaining this academic site

- Edit source on `dev`. `master` contains GitHub Pages build output; never hand-edit it or track `dist/` on `dev`.
- Read `README.md` and `docs/seo-maintenance.md` for the current build and publishing workflow.
- Most content belongs in `src/data/content.jsx`; FM Geometry facts belong in `src/data/fmGeometry.js`.
- `src/data/seo.js` registers indexable pages and creates metadata from the content. `src/data/site.js` owns the canonical origin. Do not duplicate metadata in HTML templates or manually edit the generated sitemap.
- Public page URLs must be real anchors and have rendered static HTML, one H1, unique title/description, canonical and matching structured data.
- Blog posts without `href` get `/blog/<id>/` automatically. Keep existing IDs stable; Markdown content starts at H2 because the post template supplies H1.
- `npm run build` optimizes images, renders every route and runs the scoped SEO checks. Fix check failures before publishing. GitHub Actions runs the same build on `dev` pushes and PRs.
- Keep original photographs, `public/CNAME` and `public/399cced8eb5c43350950649d7d1552a0.txt`. Generated image derivatives and the image manifest are reproducible; use `npm run images` after changing originals.
- After publishing, run `npm run seo:live` to verify the actual website, assets, sitemap, robots and domain/verification files.
- Verify factual claims against the supplied content or primary sources. Do not invent affiliations, dates, venues, awards, keyword volumes or ranking promises.
- Preserve the flat layout and paired light/dark styles. Check navigation, theme persistence, legacy hash links, 404 and changed layouts in the browser.
