import React from 'react';
import { CONFIG } from '../data/content';
import SectionTitle from './ui/SectionTitle';
import ResponsiveImage from './ui/ResponsiveImage';

const LifePage = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionTitle as="h1" title="Life & Perspective" accentColor="bg-blue-500" />
        <div className="space-y-24">
            {CONFIG.galleries.map((gallery, gIdx) => (
                <div key={gIdx} className="space-y-8">
                    <div className="flex items-baseline gap-4">
                        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter italic">{gallery.title}</h2>
                        <p className="text-slate-400 dark:text-slate-500 text-sm">{gallery.description}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {gallery.photos.map((photo, pIdx) => (
                            <div key={pIdx} className={`overflow-hidden bg-slate-100 dark:bg-slate-800 ${pIdx === 0 ? 'col-span-2 row-span-2' : ''}`}>
                                <ResponsiveImage
                                    src={typeof photo === 'string' ? photo : photo.src}
                                    alt={typeof photo === 'string' ? `Photograph ${pIdx + 1} from ${CONFIG.profile.nameEnglish}'s ${gallery.title} gallery` : photo.alt}
                                    sizes={pIdx === 0 ? '(max-width: 768px) 90vw, 550px' : '(max-width: 768px) 45vw, 280px'}
                                    loading="lazy"
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
