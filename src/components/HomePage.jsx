import React from 'react';
import { Github, Mail, Twitter, FileText, ExternalLink, GraduationCap, BookOpen, Code, Terminal, Cpu, Layers, MapPin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { CONFIG } from '../data/content';
import FlatCard from './ui/FlatCard';
import SectionTitle from './ui/SectionTitle';

const HomePage = () => (
    <div className="animate-in fade-in duration-500">
        <header className="mb-12 flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
            <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-100 to-teal-50 dark:from-indigo-500/10 dark:to-teal-500/10 rounded-full blur-2xl opacity-60"></div>
                <img src={CONFIG.profile.avatar} alt="Profile" className="relative w-36 h-36 md:w-44 md:h-44 bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-800 shadow-lg" />
            </div>
            <div className="flex-1">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-3 tracking-tighter">{CONFIG.profile.name}</h1>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-6">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-widest text-sm uppercase px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30">{CONFIG.profile.title}</span>
                    <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-sm font-medium"><MapPin size={14} /> {CONFIG.profile.location}</span>
                </div>
                {CONFIG.profile.bio && <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-2xl text-lg">{CONFIG.profile.bio}</p>}
                <div className="flex flex-wrap justify-center md:justify-start gap-6 font-bold text-slate-400 dark:text-slate-500 text-xs tracking-widest">
                    <a href={CONFIG.profile.github} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase flex items-center gap-2"><Github size={14} /> Github</a>
                    {CONFIG.profile.googleScholar && (
                        <a href={CONFIG.profile.googleScholar} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase flex items-center gap-2">
                            <GraduationCap size={14} /> Scholar
                        </a>
                    )}
                    {/* <a href={CONFIG.profile.twitter} className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors uppercase flex items-center gap-2"><Twitter size={14} /> Twitter</a> */}
                    <a href={`mailto:${CONFIG.profile.email}`} className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors uppercase flex items-center gap-2"><Mail size={14} /> Email</a>
                </div>
            </div>
        </header>

        <section className="mb-24">
            <div className="flex flex-wrap gap-3">
                {CONFIG.researchInterests.map((item, idx) => (
                    <span key={idx} className={`px-4 py-2 text-xs font-black uppercase tracking-widest shadow-sm ${item.color}`}>{item.name}</span>
                ))}
            </div>
        </section>

        <section id="about" className="mb-24">
            <SectionTitle title="About Me" accentColor="bg-indigo-600" />
            <div className="prose pro dark:prose-invert max-w-none">
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        mark: ({ node, ...props }) => <mark className="text-indigo-600 dark:text-indigo-400 bg-transparent font-black" {...props} />,
                        p: ({ node, ...props }) => <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4 text-sm md:text-base" {...props} />,
                        a: ({ node, ...props }) => <a className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-bold text-slate-700 dark:text-slate-200" {...props} />
                    }}
                >
                    {CONFIG.aboutMe}
                </ReactMarkdown>
            </div>
        </section>

        <section id="education" className="mb-24">
            <SectionTitle title="Education" accentColor="bg-blue-500" />
            <div className="space-y-1">
                {CONFIG.education.map((edu, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 hover:bg-white dark:hover:bg-slate-900/60 transition-colors">
                        <div className="flex items-center gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">{edu.school}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{edu.degree}</p>
                            </div>
                        </div>
                        <span className="text-xs font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">{edu.date}</span>
                    </div>
                ))}
            </div>
        </section>

        {/* <section id="publications" className="mb-24">
            <SectionTitle title="Selected Publications" accentColor="bg-indigo-600" />
            <div className="space-y-4">
                {CONFIG.publications.map((pub, idx) => (
                    <FlatCard key={idx} className="border-l-4 border-transparent hover:border-indigo-600 dark:hover:border-indigo-500">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`text-[10px] font-black text-white px-2 py-0.5 tracking-tighter uppercase ${pub.venueColor}`}>{pub.venue}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 leading-tight">{pub.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{pub.authors}</p>
                            </div>
                            <div className="flex gap-4 items-center text-slate-300 dark:text-slate-600">
                                <a href={pub.links.pdf} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><FileText size={20} /></a>
                                <a href={pub.links.code} className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"><Code size={20} /></a>
                            </div>
                        </div>
                    </FlatCard>
                ))}
            </div>
        </section> */}

        {/* <section id="projects" className="mb-24">
            <SectionTitle title="Selected Projects" accentColor="bg-teal-500" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CONFIG.projects.map((project, idx) => (
                    <FlatCard key={idx} className={`border-l-4 ${project.accent}`}>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg uppercase tracking-tight italic">{project.name}</h3>
                            <a href={project.link} className="text-slate-300 dark:text-slate-600 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                                <ExternalLink size={16} />
                            </a>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">{project.description}</p>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            <Terminal size={12} /> {project.tech}
                        </div>
                    </FlatCard>
                ))}
            </div>
        </section> */}


    </div>
);

export default HomePage;
