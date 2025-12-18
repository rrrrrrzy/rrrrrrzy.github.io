import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { CONFIG } from './data/content';
import HomePage from './components/HomePage';
import BlogPage, { BlogDetail } from './components/BlogPage';
import LifePage from './components/LifePage';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedBlog, setSelectedBlog] = useState(null);

    // 1. 初始化深色模式 (支持 LocalStorage 和 系统偏好)
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme === 'dark';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // 2. 设置 Favicon
    useEffect(() => {
        if (CONFIG.profile.favicon) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
            }
            link.href = CONFIG.profile.favicon;
        }
    }, []);

    // 3. 监听系统深色模式变化
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e) => {
            if (!localStorage.getItem('theme')) {
                setIsDark(e.matches);
            }
        };
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    const toggleTheme = () => {
        setIsDark(prev => {
            const newTheme = !prev;
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            return newTheme;
        });
    };

    const renderContent = () => {
        if (selectedBlog) return <BlogDetail blog={selectedBlog} onBack={() => setSelectedBlog(null)} />;

        switch (currentPage) {
            case 'blog': return <BlogPage onSelectBlog={setSelectedBlog} />;
            case 'life': return <LifePage />;
            default: return <HomePage />;
        }
    };

    return (
        <div className={`${isDark ? 'dark' : ''}`}>
            <div className="min-h-screen bg-[#fcfdfe] dark:bg-[#020617] text-slate-800 dark:text-slate-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/50 transition-colors duration-500">

                {/* 顶部彩色装饰条 */}
                <div className="h-1.5 w-full flex fixed top-0 z-[60]">
                    <div className="h-full flex-1 bg-indigo-600 dark:bg-indigo-500"></div>
                    <div className="h-full flex-1 bg-teal-500 dark:bg-teal-400"></div>
                    <div className="h-full flex-1 bg-blue-500 dark:bg-blue-400"></div>
                    <div className="h-full flex-1 bg-slate-900 dark:bg-slate-700"></div>
                </div>

                {/* 导航栏 */}
                <nav className="fixed top-1.5 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-100 dark:border-slate-800">
                    <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
                        <span
                            className="text-sm font-black tracking-widest cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-slate-900 dark:text-white"
                            onClick={() => { setCurrentPage('home'); setSelectedBlog(null); }}
                        >
                            SZ / RESEARCH
                        </span>
                        <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            <button
                                onClick={() => { setCurrentPage('home'); setSelectedBlog(null); }}
                                className={`${currentPage === 'home' && !selectedBlog ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-slate-900 dark:hover:text-slate-200'} transition-colors`}
                            >Home</button>
                            <button
                                onClick={() => { setCurrentPage('blog'); setSelectedBlog(null); }}
                                className={`${currentPage === 'blog' || selectedBlog ? 'text-teal-600 dark:text-teal-400' : 'hover:text-slate-900 dark:hover:text-slate-200'} transition-colors`}
                            >Blog</button>
                            <button
                                onClick={() => { setCurrentPage('life'); setSelectedBlog(null); }}
                                className={`${currentPage === 'life' ? 'text-blue-600' : 'hover:text-slate-400'} transition-colors`}
                            >Life</button>
                            <div className="h-4 w-px bg-slate-100 dark:bg-slate-800 ml-2 hidden sm:block"></div>
                            <button
                                onClick={toggleTheme}
                                className="text-slate-300 dark:text-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer p-1"
                                title="Toggle Theme"
                            >
                                {isDark ? <Moon size={14} /> : <Sun size={14} />}
                            </button>
                        </div>
                    </div>
                </nav>

                <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
                    {renderContent()}

                    {/* Footer */}
                    <footer className="pt-20 mt-20 border-t border-slate-100 dark:border-slate-900 text-center">
                        <div className="flex justify-center gap-2 mb-4 text-slate-200">
                            <div className="w-2 h-2 rounded-full bg-indigo-400/30"></div>
                            <div className="w-2 h-2 rounded-full bg-teal-400/30"></div>
                            <div className="w-2 h-2 rounded-full bg-blue-400/30"></div>
                        </div>
                        <p className="text-slate-400 dark:text-slate-600 text-[10px] font-black tracking-[0.2em] uppercase">
                            Curiosity Drives Discovery · {new Date().getFullYear()} · {CONFIG.profile.name}
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default App;
