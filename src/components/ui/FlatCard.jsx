import React from 'react';

const FlatCard = ({ children, className = "", onClick }) => (
    <div
        onClick={onClick}
        className={`bg-white dark:bg-slate-900/40 border border-transparent dark:border-slate-800 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none dark:hover:bg-slate-800/60 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
        {children}
    </div>
);

export default FlatCard;
