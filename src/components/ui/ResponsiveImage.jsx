import React from 'react';
import images from '../../data/imageManifest.json';

const ResponsiveImage = ({ src, alt, sizes, ...props }) => {
    const image = images[src];
    return <img
        src={image?.variants.at(-1)?.src || src}
        srcSet={image?.variants.map(item => `${item.src} ${item.width}w`).join(', ')}
        sizes={image ? sizes : undefined}
        width={image?.width} height={image?.height}
        alt={alt} decoding="async" {...props}
    />;
};

export default ResponsiveImage;
