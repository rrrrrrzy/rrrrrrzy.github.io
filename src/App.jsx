import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { CONFIG } from './data/content';
import { getPage } from './data/seo.js';
import HomePage from './components/HomePage';
import BlogPage, { BlogDetail } from './components/BlogPage';
import LifePage from './components/LifePage';
import PaperPage from './components/PaperPage';

const App = ({ pathname = '/' }) => {
    const page = getPage(pathname);
    // Use the same initial state as the static HTML, then restore the user's theme.
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        if (pathname === '/' && ['#blog', '#life'].includes(window.location.hash)) {
            window.location.replace('/' + window.location.hash.slice(1) + '/');
            return;
        }
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = () => { try { return localStorage.getItem('theme'); } catch { return null; } };
        const updateTheme = () => {
            const saved = savedTheme();
            setIsDark(saved ? saved === 'dark' : mediaQuery.matches);
        };
        updateTheme();
        mediaQuery.addEventListener('change', updateTheme);
        return () => mediaQuery.removeEventListener('change', updateTheme);
    }, [pathname]);

    const toggleTheme = () => setIsDark(prev => {
        const next = !prev;
        try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch { /* Keep in-memory choice when storage is unavailable. */ }
        return next;
    });

    if (page.kind === 'paper') return <PaperPage isDark={isDark} toggleTheme={toggleTheme} />;

    const content = {
        home: <HomePage />,
        blog: <BlogPage />,
        life: <LifePage />,
        post: page.blog ? <BlogDetail blog={page.blog} /> : null,
        notFound: <div className="max-w-2xl py-12"><h1 className="text-4xl font-bold mb-6">Page not found</h1><p className="text-slate-500 dark:text-slate-400 mb-8">This page may have moved. Explore the homepage or research projects.</p><a href="/" className="text-indigo-600 dark:text-indigo-400 underline">Return to the homepage</a></div>,
    }[page.kind];

    return <div className={isDark ? 'dark' : ''}>
        <div className="min-h-screen bg-[#fcfdfe] dark:bg-[#020617] text-slate-800 dark:text-slate-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/50 transition-colors duration-500">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:bg-white dark:focus:bg-slate-900 focus:p-3">Skip to content</a>
            <div className="h-1.5 w-full flex fixed top-0 z-[60]" aria-hidden="true">
                <div className="h-full flex-1 bg-indigo-600 dark:bg-indigo-500" /><div className="h-full flex-1 bg-teal-500 dark:bg-teal-400" /><div className="h-full flex-1 bg-blue-500 dark:bg-blue-400" /><div className="h-full flex-1 bg-slate-900 dark:bg-slate-700" />
            </div>
            <nav aria-label="Primary navigation" className="fixed top-1.5 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center gap-4">
                    <a href="/" className="text-sm font-black tracking-widest hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-slate-900 dark:text-white">ZIYANG RAO</a>
                    <div className="flex items-center gap-4 sm:gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        <a href="/" aria-current={page.kind === 'home' ? 'page' : undefined} className={page.kind === 'home' ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-slate-900 dark:hover:text-slate-200'}>Home</a>
                        <a href="/blog/" aria-current={['blog', 'post'].includes(page.kind) ? 'page' : undefined} className={['blog', 'post'].includes(page.kind) ? 'text-teal-600 dark:text-teal-400' : 'hover:text-slate-900 dark:hover:text-slate-200'}>Blog</a>
                        <a href="/life/" aria-current={page.kind === 'life' ? 'page' : undefined} className={page.kind === 'life' ? 'text-blue-600 dark:text-blue-400' : 'hover:text-slate-900 dark:hover:text-slate-200'}>Life</a>
                        <div className="h-4 w-px bg-slate-100 dark:bg-slate-800 ml-2 hidden sm:block" />
                        <button onClick={toggleTheme} className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 p-1" aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}>{isDark ? <Moon size={14} /> : <Sun size={14} />}</button>
                    </div>
                </div>
            </nav>
            <main id="main-content" className="max-w-4xl mx-auto px-6 pt-32 pb-20">
                {content}
                <footer className="pt-20 mt-20 border-t border-slate-100 dark:border-slate-900 text-center">
                    <div className="flex justify-center gap-2 mb-4 text-slate-200" aria-hidden="true"><div className="w-2 h-2 rounded-full bg-indigo-400/30" /><div className="w-2 h-2 rounded-full bg-teal-400/30" /><div className="w-2 h-2 rounded-full bg-blue-400/30" /></div>
                    <p className="text-slate-400 dark:text-slate-600 text-[10px] font-black tracking-[0.2em] uppercase">How far I'll go? · {new Date().getFullYear()} · {CONFIG.profile.name}</p>
                </footer>
            </main>
        </div>
    </div>;
};

export default App;
