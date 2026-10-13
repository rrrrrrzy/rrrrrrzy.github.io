import { CONFIG } from './content.jsx';
import { FM_PAPER as paper } from './fmGeometry.js';
import { SITE, normalizePathname } from './site.js';
import images from './imageManifest.json';

const absolute = path => new URL(path, `${SITE.origin}/`).href;
const profile = CONFIG.profile;
const name = profile.nameEnglish;
const personId = `${SITE.origin}/#person`;
const websiteId = `${SITE.origin}/#website`;
const profileImage = images[profile.avatar]?.variants.at(-1)?.src || profile.avatar;
const author = { '@type': 'Person', '@id': personId, name };
const graph = items => ({ '@context': 'https://schema.org', '@graph': items });
const person = () => ({
    ...author, alternateName: profile.nameChinese, url: absolute('/'), image: absolute(profileImage),
    jobTitle: profile.title,
    affiliation: { '@type': 'Organization', name: CONFIG.education[0].school },
    knowsAbout: CONFIG.researchInterests.map(item => item.name),
    sameAs: [profile.github, profile.googleScholar].filter(Boolean),
});
const breadcrumb = (pathname, title) => ({
    '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absolute('/') },
        { '@type': 'ListItem', position: 2, name: title, item: absolute(pathname) },
    ],
});

function articleSchema() {
    return {
        '@type': 'ScholarlyArticle', '@id': `${paper.url}#article`, name: paper.citationTitle,
        headline: paper.citationTitle, alternativeHeadline: paper.title, description: paper.description,
        url: paper.url, mainEntityOfPage: { '@type': 'WebPage', '@id': paper.url },
        sameAs: paper.abstractUrl, datePublished: paper.datePublished, inLanguage: SITE.language,
        isAccessibleForFree: true, image: `${paper.url}media/overview.jpg`,
        author: paper.authors.map(item => ({ '@type': 'Person', name: item.name, ...(item.href ? { '@id': personId, url: absolute(item.href) } : {}) })),
        identifier: { '@type': 'PropertyValue', propertyID: 'arXiv', value: paper.arxivId },
        encoding: { '@type': 'MediaObject', contentUrl: paper.paper, encodingFormat: 'application/pdf' },
        about: ['Flow matching uncertainty', 'Denoising acceleration', 'Vision-language-action failure detection'].map(item => ({ '@type': 'Thing', name: item })),
    };
}

// Every indexable route is registered here; the build generates its HTML and sitemap entry.
export function getPages() {
    const description = `${name} (${profile.nameChinese}), ${profile.title.replace(' @ ', ' at ')}, researches embodied AI, flow matching, VLA uncertainty and mechanistic interpretability.`;
    const pages = [
        {
            pathname: '/', kind: 'home', h1: profile.name,
            title: `${name} (${profile.nameChinese}) | Embodied AI & Flow Matching`, description,
            image: profileImage, imageAlt: `Portrait of ${name} (${profile.nameChinese})`, card: 'summary',
            schema: graph([
                person(),
                { '@type': 'WebSite', '@id': websiteId, url: absolute('/'), name: `${name} — Academic Homepage`, inLanguage: SITE.language, publisher: author },
                { '@type': 'ProfilePage', '@id': absolute('/'), url: absolute('/'), name: `${name} (${profile.nameChinese})`, description, mainEntity: { '@id': personId }, isPartOf: { '@id': websiteId } },
                {
                    '@type': 'ItemList', '@id': `${SITE.origin}/#publications`, name: 'Selected Publications',
                    itemListElement: CONFIG.publications.map((pub, index) => ({
                        '@type': 'ListItem', position: index + 1, item: {
                            '@type': 'ScholarlyArticle', name: pub.title, url: absolute(pub.links.project || pub.links.doi || pub.links.pdf),
                            author: pub.authors.replaceAll('**', '').split(', ').map(item => item === name ? author : { '@type': 'Person', name: item }),
                        },
                    })),
                },
            ]),
        },
        {
            pathname: '/blog/', kind: 'blog', h1: 'Research Notes & Projects', title: `Research Notes & Projects | ${name}`,
            description: `${name}'s research notes and paper projects on embodied AI, flow matching, uncertainty quantification and vision-language-action models.`,
            image: profileImage, imageAlt: `Portrait of ${name}`, card: 'summary',
            schema: graph([
                { '@type': 'CollectionPage', '@id': absolute('/blog/'), url: absolute('/blog/'), name: 'Research Notes & Projects', author, isPartOf: { '@id': websiteId }, mainEntity: {
                    '@type': 'ItemList', itemListElement: CONFIG.blogs.map((blog, index) => ({ '@type': 'ListItem', position: index + 1, name: blog.title, url: absolute(blog.href || `/blog/${blog.id}/`) })),
                } }, breadcrumb('/blog/', 'Research Notes & Projects'),
            ]),
        },
        {
            pathname: '/life/', kind: 'life', h1: 'Life & Perspective', title: `Life & Perspective | ${name}`,
            description: `Personal photographs and everyday perspectives from ${name} (${profile.nameChinese}), an embodied AI researcher at HKUST (Guangzhou).`,
            image: profileImage, imageAlt: `Portrait of ${name}`, card: 'summary',
            schema: graph([
                { '@type': 'CollectionPage', '@id': absolute('/life/'), url: absolute('/life/'), name: 'Life & Perspective', author, isPartOf: { '@id': websiteId } }, breadcrumb('/life/', 'Life & Perspective'),
            ]),
        },
        {
            pathname: '/fm-geometry/', kind: 'paper', h1: paper.title,
            title: 'Flow Matching Uncertainty & VLA Failure Detection | FM Geometry', description: paper.description,
            image: '/fm-geometry/media/overview.jpg', imageAlt: 'Denoising acceleration for flow matching uncertainty and VLA failure detection', card: 'summary_large_image',
            schema: graph([articleSchema(), breadcrumb('/fm-geometry/', paper.title)]),
        },
    ];
    for (const blog of CONFIG.blogs.filter(item => !item.href)) {
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(blog.id) || !blog.content) throw new Error(`Blog ${blog.id} needs a stable lowercase slug and content`);
        const pathname = `/blog/${blog.id}/`;
        pages.push({
            pathname, kind: 'post', blog, h1: blog.title, title: `${blog.title} | ${name}`, description: blog.excerpt,
            image: blog.image, imageAlt: blog.imageAlt || blog.title, card: 'summary_large_image', modified: blog.dateModified,
            schema: graph([
                { '@type': 'BlogPosting', '@id': absolute(pathname), url: absolute(pathname), headline: blog.title, description: blog.excerpt, author, datePublished: blog.date, ...(blog.dateModified ? { dateModified: blog.dateModified } : {}), image: absolute(blog.image), mainEntityOfPage: absolute(pathname), inLanguage: SITE.language }, breadcrumb(pathname, blog.title),
            ]),
        });
    }
    return pages;
}

export function getPage(pathname) {
    return getPages().find(page => page.pathname === normalizePathname(pathname)) || {
        pathname: '/404.html', kind: 'notFound', h1: 'Page not found', title: `Page not found | ${name}`,
        description: `The requested page could not be found. Return to the academic homepage of ${name}.`,
        image: profileImage, imageAlt: `Portrait of ${name}`, card: 'summary', robots: 'noindex, follow',
    };
}

export { SITE };
