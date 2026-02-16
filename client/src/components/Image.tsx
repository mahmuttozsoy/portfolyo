import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    className?: string;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    quality?: number;
    placeholder?: string;
    blurDataURL?: string;
    unoptimized?: boolean;
}

const Image: React.FC<ImageProps> = ({
    src,
    alt,
    width,
    height,
    className,
    fill,
    unoptimized,
    ...props
}) => {
    // Check if external URL or local
    // For Vite, local assets in public folder are referenced as /assets/...

    // Handle Next.js 'fill' prop which makes image absolute
    const style: React.CSSProperties = fill ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        inset: 0,
        objectFit: 'cover' // Default for fill
    } : {};

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={style}
            width={width}
            height={height}
            {...props}
        />
    );
};

export default Image;
