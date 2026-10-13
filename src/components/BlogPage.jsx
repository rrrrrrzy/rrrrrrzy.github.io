import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Calendar, ArrowRight, ChevronLeft } from 'lucide-react';
import { CONFIG } from '../data/content';
import SectionTitle from './ui/SectionTitle';
import ResponsiveImage from './ui/ResponsiveImage';

export const BlogDetail = ({ blog }) => (
    <article className="animate-in fade-in duration-500 max-w-2xl mx-auto">
        <a href="/blog/" className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 font-bold text-xs uppercase tracking-widest mb-12"><ChevronLeft size={16} /> Back to Blog</a>
        <ResponsiveImage src={blog.image} alt={blog.imageAlt || blog.title} sizes="(max-width: 700px) 100vw, 672px" className="w-full h-80 object-cover mb-12 shadow-2xl" />
        <header className="mb-8">
            <div className="flex items-center gap-4 text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-4"><time dateTime={blog.date}>{blog.date}</time><span className="text-teal-600 dark:text-teal-400">#{blog.category}</span></div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight mb-8">{blog.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{blog.excerpt}</p>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
            {typeof blog.content === 'string' ? <ReactMarkdown>{blog.content}</ReactMarkdown> : blog.content}
            <p className="mt-8 italic text-slate-400 dark:text-slate-600 text-base">感谢阅读。如果你对这个话题有任何想法，欢迎通过邮件与我讨论。</p>
        </div>
    </article>
);

const BlogPage = () => (
    <div className="animate-in fade-in duration-500">
        <SectionTitle as="h1" title="Research Notes & Projects" accentColor="bg-teal-500" />
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10">Paper projects, experiments and research notes on embodied AI, flow matching and uncertainty in vision-language-action models.</p>
        <div className="space-y-8">
            {CONFIG.blogs.map(blog => (
                <a key={blog.id} href={blog.href || '/blog/' + blog.id + '/'} aria-label={`${blog.href ? 'Explore project' : 'Read story'}: ${blog.title}`} className="block group border border-teal-200 dark:border-teal-900 bg-white dark:bg-slate-900/40 p-6 hover:border-teal-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500">
                    <article className="flex flex-col md:flex-row gap-8 items-center">
                        <ResponsiveImage src={blog.image} alt={blog.imageAlt || blog.title} sizes="(max-width: 768px) 90vw, 256px" loading="lazy" className="w-full md:w-64 h-48 object-contain bg-white" />
                        <div className="flex-1">
                            <div className="flex gap-4 items-center text-[10px] font-black tracking-widest uppercase text-teal-600 dark:text-teal-400 mb-3"><span>#{blog.category}</span><span className="flex items-center gap-1"><Calendar size={12} /><time dateTime={blog.date}>{blog.date}</time></span></div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-teal-600 dark:group-hover:text-teal-400">{blog.title}</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">{blog.excerpt}</p>
                            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-700 dark:text-teal-400">{blog.href ? 'Explore project' : 'Read story'} <ArrowRight size={14} /></span>
                        </div>
                    </article>
                </a>
            ))}
        </div>
    </div>
);

export default BlogPage;
