import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { parse } from 'parse5';
import { withSite } from './load-site.mjs';

const live = process.argv.includes('--live');
function nodes(root) { return [root, ...(root.childNodes || []).flatMap(nodes)]; }
const attrs = node => Object.fromEntries((node.attrs || []).map(item => [item.name, item.value]));
const text = node => node.nodeName === '#text' ? node.value : node.tagName === 'br' ? ' ' : (node.childNodes || []).map(text).join('');
const normalized = value => value.replace(/\s+/g, ' ').trim();

await withSite(async ({ getPages, getPage, SITE }) => {
    const pages = getPages();
    assert.equal(new URL(SITE.origin).hostname, (await readFile('public/CNAME', 'utf8')).trim(), 'Canonical origin must match CNAME');
    const documents = new Map();
    const resourceCache = new Map();
    async function read(path, expectedStatus = 200) {
        if (!live) return readFile('dist' + path, 'utf8');
        const response = await fetch(new URL(path, SITE.origin), { headers: { 'Cache-Control': 'no-cache' }, signal: AbortSignal.timeout(20000) });
        assert.equal(response.status, expectedStatus, `${path}: HTTP status`);
        return response.text();
    }
    async function resource(path) {
        if (!resourceCache.has(path)) resourceCache.set(path, (async () => {
            if (live) {
                const response = await fetch(new URL(path, SITE.origin), { method: 'HEAD', signal: AbortSignal.timeout(20000) });
                assert.equal(response.status, 200, `${path}: missing live asset`);
            } else {
                assert.ok((await stat('dist' + decodeURIComponent(path))).isFile(), `${path}: missing asset`);
            }
        })());
        return resourceCache.get(path);
    }
    for (const page of [...pages, getPage('/404.html')]) {
        const file = page.pathname === '/404.html' ? '/404.html' : page.pathname + 'index.html';
        const html = await read(live && page.kind !== 'notFound' ? page.pathname : file);
        const all = nodes(parse(html));
        const tagged = tag => all.filter(node => node.tagName === tag);
        const meta = (key, attr = 'name') => tagged('meta').filter(node => attrs(node)[attr] === key).map(node => attrs(node).content);
        const root = all.find(node => attrs(node).id === 'root');
        const prefix = page.pathname + ': ';
        assert.ok(root && normalized(text(root)).length > 80, prefix + 'missing static body');
        assert.equal(tagged('h1').length, 1, prefix + 'expected one H1');
        assert.equal(normalized(text(tagged('h1')[0])), normalized(page.h1), prefix + 'wrong H1');
        assert.equal(tagged('title').length, 1, prefix + 'duplicate or missing title');
        assert.equal(text(tagged('title')[0]), page.title, prefix + 'wrong title');
        assert.deepEqual(meta('description'), [page.description], prefix + 'wrong description');
        assert.ok(page.description.length > 40, prefix + 'description is empty or too short');
        const canonical = tagged('link').filter(node => attrs(node).rel === 'canonical').map(node => attrs(node).href);
        const url = new URL(page.pathname, SITE.origin).href;
        assert.deepEqual(canonical, [url], prefix + 'wrong canonical');
        assert.deepEqual(meta('og:url', 'property'), [url], prefix + 'wrong sharing URL');
        assert.deepEqual(meta('twitter:title'), [page.title], prefix + 'wrong sharing title');
        if (page.kind === 'notFound') assert.ok(meta('robots')[0].includes('noindex'), prefix + '404 must be noindex');
        else {
            assert.ok(!meta('robots')[0].includes('noindex'), prefix + 'unexpected noindex');
            const schemas = tagged('script').filter(node => attrs(node).type === 'application/ld+json');
            assert.equal(schemas.length, 1, prefix + 'missing or duplicate JSON-LD');
            const schema = JSON.parse(text(schemas[0]));
            assert.equal(schema['@context'], 'https://schema.org', prefix + 'schema context');
            const type = { home: 'ProfilePage', blog: 'CollectionPage', life: 'CollectionPage', paper: 'ScholarlyArticle', post: 'BlogPosting' }[page.kind];
            assert.ok(schema['@graph'].some(item => item['@type'] === type), prefix + 'wrong structured data type');
        }
        if (page.kind === 'paper') {
            assert.equal(meta('citation_author').length, 6, prefix + 'missing authors');
            assert.ok(normalized(text(root)).includes(meta('citation_title')[0]), prefix + 'citation title must be visible');
            assert.ok(meta('citation_pdf_url')[0].startsWith('https://arxiv.org/pdf/'), prefix + 'missing PDF');
        }
        if (page.kind === 'post') for (const date of [page.blog.date, page.blog.dateModified].filter(Boolean)) {
            assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(Date.parse(date)) && new Date(date).toISOString().slice(0, 10) === date, prefix + 'invalid article date');
        }
        const ids = all.map(node => attrs(node).id).filter(Boolean);
        assert.equal(new Set(ids).size, ids.length, prefix + 'duplicate element IDs');
        for (const image of tagged('img')) {
            const a = attrs(image);
            assert.ok(a.alt?.trim(), prefix + 'image needs alt text');
            assert.ok(Number(a.width) > 0 && Number(a.height) > 0, prefix + 'image needs dimensions: ' + a.src);
        }
        documents.set(page.pathname, { page, all, ids: new Set(ids) });
        console.log(`SEO OK ${live ? 'live ' : ''}${page.pathname}`);
    }
    const titles = pages.map(page => page.title);
    const descriptions = pages.map(page => page.description);
    assert.equal(new Set(titles).size, titles.length, 'Page titles must be unique');
    assert.equal(new Set(descriptions).size, descriptions.length, 'Page descriptions must be unique');
    // Check real links and assets from the rendered HTML, including srcset candidates.
    for (const [pathname, { all }] of documents) {
        for (const node of all) {
            const a = attrs(node);
            const references = [a.href, a.src, a.poster, ...(a.srcset || '').split(',').map(item => item.trim().split(/\s+/)[0])].filter(Boolean);
            for (const reference of references) {
                const url = new URL(reference, new URL(pathname, SITE.origin));
                if (url.origin !== SITE.origin) continue;
                const targetPath = url.pathname === '/' || /\.[^/]+$/.test(url.pathname) ? url.pathname : url.pathname.replace(/\/?$/, '/');
                const target = documents.get(targetPath);
                if (target) {
                    if (url.hash) assert.ok(target.ids.has(decodeURIComponent(url.hash.slice(1))), `${pathname}: missing anchor ${reference}`);
                } else await resource(url.pathname);
            }
        }
    }
    const sitemap = await read('/sitemap.xml');
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].replaceAll('&amp;', '&'));
    assert.deepEqual(urls.sort(), pages.map(page => new URL(page.pathname, SITE.origin).href).sort(), 'Sitemap must contain exactly the indexable pages');
    assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
    const robots = await read('/robots.txt');
    assert.ok(robots.includes(`Sitemap: ${SITE.origin}/sitemap.xml`), 'Missing sitemap discovery');
    assert.ok(!/^Disallow:\s*\/\s*$/m.test(robots), 'robots.txt blocks the whole site');
    for (const file of ['/CNAME', '/399cced8eb5c43350950649d7d1552a0.txt']) {
        assert.equal((await read(file)).trim(), (await readFile('public' + file, 'utf8')).trim(), `${file}: domain/verification file changed`);
    }
    if (live) {
        const missing = await read('/__seo_check_missing_page_404__/', 404);
        const tags = nodes(parse(missing)).filter(node => node.tagName === 'meta');
        assert.ok(tags.some(node => attrs(node).name === 'robots' && attrs(node).content.includes('noindex')), 'Missing URLs must serve the noindex 404 page');
    }
    console.log(`SEO checks passed: ${pages.length} indexable pages, 404, sitemap, assets and domain files.`);
});
