import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { withSite } from './load-site.mjs';

await withSite(async ({ render, getPages, getPage, renderSeoHead, SITE }) => {
    const template = await readFile('dist/index.html', 'utf8');
    const headMarker = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/;
    if (!headMarker.test(template) || !template.includes('<div id="root"></div>')) throw new Error('Missing SEO or root placeholder in index.html');
    const pages = getPages();
    if (new Set(pages.map(page => page.pathname)).size !== pages.length) throw new Error('Duplicate page URLs');
    for (const page of [...pages, getPage('/404.html')]) {
        const file = page.pathname === '/404.html' ? 'dist/404.html' : 'dist' + page.pathname + 'index.html';
        const html = template
            .replace(headMarker, () => '<!-- seo:start -->\n    ' + renderSeoHead(page) + '\n    <!-- seo:end -->')
            .replace('<div id="root"></div>', () => '<div id="root">' + render(page.pathname) + '</div>');
        await mkdir(dirname(file), { recursive: true });
        await writeFile(file, html);
        console.log('Prerendered ' + page.pathname);
    }
    const escapeXml = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    const sitemap = pages.map(page => '  <url><loc>' + escapeXml(new URL(page.pathname, SITE.origin).href) + '</loc>' + (page.modified ? '<lastmod>' + escapeXml(page.modified) + '</lastmod>' : '') + '</url>').join('\n');
    await writeFile('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + sitemap + '\n</urlset>\n');
    await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + SITE.origin + '/sitemap.xml\n');
});
