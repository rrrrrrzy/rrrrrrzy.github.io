import React from 'react';
import { Calendar, ArrowRight, ChevronLeft } from 'lucide-react';
import { CONFIG } from '../data/content';
import FlatCard from './ui/FlatCard';
import SectionTitle from './ui/SectionTitle';

export const BlogDetail = ({ blog, onBack }) => (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 font-bold text-xs uppercase tracking-widest mb-12 transition-colors">
            <ChevronLeft size={16} /> Back to Blog
        </button>
        <img src={blog.image} alt={blog.title} className="w-full h-80 object-cover mb-12 shadow-2xl" />
        <div className="mb-8">
            <div className="flex items-center gap-4 text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-4">
                <span>{blog.date}</span>
                <span className="text-teal-600 dark:text-teal-400">#{blog.category}</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight mb-8">{blog.title}</h1>
        </div>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
            {blog.content}
            <p className="mt-8 italic text-slate-400 dark:text-slate-600 text-base">感谢阅读。如果你对这个话题有任何想法，欢迎通过邮件与我讨论。</p>
        </div>
    </div>
);

const BlogPage = ({ onSelectBlog }) => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionTitle title="Latest Thoughts" accentColor="bg-teal-500" />
        <div className="space-y-8">
            {CONFIG.blogs.map(blog => blog.href ? (
                <a key={blog.id} href={blog.href} className="block group border border-teal-200 dark:border-teal-900 bg-white dark:bg-slate-900/40 p-6 hover:border-teal-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <img src={blog.image} alt="Certain and uncertain flow-matching velocity fields" className="w-full md:w-64 h-48 object-contain bg-white" />
                        <div className="flex-1">
                            <div className="text-[10px] font-black tracking-widest uppercase text-teal-600 dark:text-teal-400 mb-3">Research · Paper project</div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-teal-600 dark:group-hover:text-teal-400">{blog.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">{blog.excerpt}</p>
                            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-700 dark:text-teal-400">Explore project <ArrowRight size={14} /></span>
                        </div>
                    </div>
                </a>
            ) : (
                <FlatCard key={blog.id} onClick={() => onSelectBlog(blog)} className="group flex flex-col md:flex-row gap-8 items-stretch">
                    <div className="w-full md:w-64 h-48 flex-shrink-0 overflow-hidden">
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                    </div>
                    <div className="flex flex-col justify-center py-2 flex-1">
                        <div className="flex items-center gap-4 text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-3">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                            <span className="text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5">#{blog.category}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{blog.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 line-clamp-2 mb-6 leading-relaxed">{blog.excerpt}</p>
                        <div className="flex items-center gap-2 text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter group-hover:translate-x-2 transition-transform">
                            Read Story <ArrowRight size={14} />
                        </div>
                    </div>
                </FlatCard>
            ))}
        </div>
    </div>
);

export default BlogPage;
