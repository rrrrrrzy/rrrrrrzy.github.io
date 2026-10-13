import { FM_PAPER as paper } from '../data/fmGeometry.js';
import { SITE } from '../data/site.js';
import { CONFIG } from '../data/content.jsx';

export const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const meta = (attribute, key, value) => `<meta data-seo ${attribute}="${key}" content="${escapeHtml(value)}" />`;

export function renderSeoHead(page) {
    const url = new URL(page.pathname, SITE.origin).href;
    const image = new URL(page.image, SITE.origin).href;
    const tags = [
        `<title data-seo>${escapeHtml(page.title)}</title>`,
        meta('name', 'description', page.description),
        meta('name', 'author', page.kind === 'paper' ? paper.authors.map(item => item.name).join(', ') : CONFIG.profile.nameEnglish),
        meta('name', 'robots', page.robots || 'index, follow, max-image-preview:large'),
        `<link data-seo rel="canonical" href="${escapeHtml(url)}" />`,
        meta('property', 'og:type', ['paper', 'post'].includes(page.kind) ? 'article' : 'website'),
        meta('property', 'og:site_name', CONFIG.profile.nameEnglish),
        meta('property', 'og:title', page.title), meta('property', 'og:description', page.description),
        meta('property', 'og:url', url), meta('property', 'og:image', image), meta('property', 'og:image:alt', page.imageAlt),
        meta('name', 'twitter:card', page.card), meta('name', 'twitter:title', page.title),
        meta('name', 'twitter:description', page.description), meta('name', 'twitter:image', image), meta('name', 'twitter:image:alt', page.imageAlt),
    ];
    if (page.kind === 'paper') tags.push(
        meta('name', 'citation_title', paper.citationTitle), ...paper.authors.map(item => meta('name', 'citation_author', item.name)),
        meta('name', 'citation_publication_date', paper.datePublished.replaceAll('-', '/')),
        meta('name', 'citation_pdf_url', paper.paper), meta('name', 'citation_arxiv_id', paper.arxivId),
    );
    if (page.schema) tags.push(`<script data-seo type="application/ld+json">${JSON.stringify(page.schema).replaceAll('<', '\\u003c')}</script>`);
    return tags.join('\n    ');
}

export function updateSeoHead(page) {
    document.head.querySelectorAll('[data-seo]').forEach(node => node.remove());
    document.head.insertAdjacentHTML('beforeend', renderSeoHead(page));
}
