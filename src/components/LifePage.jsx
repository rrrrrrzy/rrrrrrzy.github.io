import React from 'react';
import { CONFIG } from '../data/content';
import SectionTitle from './ui/SectionTitle';

const LifePage = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionTitle title="Life & Perspective" accentColor="bg-blue-500" />
        <div className="space-y-24">
            {CONFIG.galleries.map((gallery, gIdx) => (
                <div key={gIdx} className="space-y-8">
                    <div className="flex items-baseline gap-4">
                        <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter italic">{gallery.title}</h3>
                        <p className="text-slate-400 dark:text-slate-500 text-sm">{gallery.description}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {gallery.photos.map((url, pIdx) => (
                            <div key={pIdx} className={`overflow-hidden bg-slate-100 dark:bg-slate-800 ${pIdx === 0 ? 'col-span-2 row-span-2' : ''}`}>
                                <img
                                    src={url}
                                    alt="Gallery"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110 cursor-zoom-in"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default LifePage;
