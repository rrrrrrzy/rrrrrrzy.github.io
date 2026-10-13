import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
export { getPages, getPage, SITE } from './data/seo.js';
export { renderSeoHead } from './lib/seo.js';

export function render(pathname) {
    return renderToString(<App pathname={pathname} />);
}
