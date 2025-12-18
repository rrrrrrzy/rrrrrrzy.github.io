import React from 'react';

const SectionTitle = ({ title, accentColor = "bg-indigo-600" }) => (
    <div className="flex items-center gap-4 mb-10 mt-16 first:mt-0">
        <div className={`w-1.5 h-8 ${accentColor}`}></div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight uppercase">
            {title}
        </h2>
        <div className="flex-1 h-[1px] bg-slate-100 dark:bg-slate-800"></div>
    </div>
);

export default SectionTitle;
