import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import { FM_PAPER as paper } from '../src/data/fmGeometry.js';

const escapeAttribute = value => String(value)
    .replaceAll('&', '&amp;').replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const meta = (name, content) => `    <meta name="${name}" content="${escapeAttribute(content)}" />`;

function paperMetadata() {
    const article = {
        '@context': 'https://schema.org',
        '@type': 'ScholarlyArticle',
        '@id': `${paper.url}#article`,
        name: paper.citationTitle,
        headline: paper.citationTitle,
        alternativeHeadline: paper.title,
        description: paper.description,
        url: paper.url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': paper.url },
        sameAs: paper.abstractUrl,
        datePublished: paper.datePublished,
        inLanguage: 'en',
        isAccessibleForFree: true,
        image: `${paper.url}media/overview.jpg`,
        author: paper.authors.map(author => ({
            '@type': 'Person', name: author.name,
            ...(author.href ? { url: new URL(author.href, paper.url).href } : {}),
        })),
        identifier: { '@type': 'PropertyValue', propertyID: 'arXiv', value: paper.arxivId },
        encoding: { '@type': 'MediaObject', contentUrl: paper.paper, encodingFormat: 'application/pdf' },
        about: ['Flow matching uncertainty', 'Denoising acceleration', 'Vision-language-action failure detection']
            .map(name => ({ '@type': 'Thing', name })),
    };
    return [
        meta('citation_title', paper.citationTitle),
        ...paper.authors.map(author => meta('citation_author', author.name)),
        meta('citation_publication_date', paper.datePublished.replaceAll('-', '/')),
        meta('citation_pdf_url', paper.paper),
        meta('citation_arxiv_id', paper.arxivId),
        `    <script type="application/ld+json">${JSON.stringify(article).replaceAll('<', '\\u003c')}</script>`,
    ].join('\n');
}

// Use the same React components as the browser; no parallel SEO-only copy of the page.
// Do not call listen(): prerendering needs module loading, not an HTTP/HMR listener.
const server = await createServer({ server: { hmr: false, watch: null }, appType: 'custom' });
try {
    await server.pluginContainer.buildStart({});
    const { render } = await server.ssrLoadModule('/src/entry-server.jsx');
    for (const [pathname, file] of [['/', 'dist/index.html'], ['/fm-geometry/', 'dist/fm-geometry/index.html']]) {
        let html = await readFile(file, 'utf8');
        if (!html.includes('<div id="root"></div>')) throw new Error(`Missing root placeholder in ${file}`);
        const markup = render(pathname);
        html = html.replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`);
        if (pathname === '/fm-geometry/') html = html.replace('</head>', () => `${paperMetadata()}\n  </head>`);
        await writeFile(file, html);
        console.log(`Prerendered ${pathname}`);
    }
} finally {
    await server.close();
}
