import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { getPage } from './data/seo.js';
import { updateSeoHead } from './lib/seo.js';

updateSeoHead(getPage(window.location.pathname));

const root = document.getElementById('root');
const app = (
    <React.StrictMode>
        <App pathname={window.location.pathname} />
    </React.StrictMode>
);

if (root.hasChildNodes()) {
    ReactDOM.hydrateRoot(root, app);
} else {
    ReactDOM.createRoot(root).render(app);
}
