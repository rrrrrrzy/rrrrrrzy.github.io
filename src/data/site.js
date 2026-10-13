// Shared by route rendering, metadata, sitemap generation and verification.
export const SITE = {
    origin: 'https://www.ziyangrao.com',
    language: 'en',
    repository: 'rrrrrrzy/rrrrrrzy.github.io',
    deploymentBranch: 'master',
};

export function normalizePathname(pathname) {
    const path = pathname.replace(/\/index\.html$/, '/');
    if (path === '/404.html') return path;
    return path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
}
