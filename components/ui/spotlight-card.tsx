'use client'
import * as React from 'react';
import { useEffect, useRef, ReactNode, CSSProperties } from 'react';
import { Star, Sparkles, ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';

interface GlowCardProps {
    children?: ReactNode;
    className?: string;
    glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
    size?: 'sm' | 'md' | 'lg';
    width?: string | number;
    height?: string | number;
    customSize?: boolean; // When true, ignores size prop and uses width/height or className
    showNew?: boolean; // When true, shows the "New" badge
    bottomRightImage?: string; // URL or path to the image to display in bottom right
    title?: string; // Title of the card
    description?: string; // Description of the card
}

const glowColorMap = {
    blue: { base: 220, spread: 200 },
    purple: { base: 280, spread: 300 },
    green: { base: 120, spread: 200 },
    red: { base: 0, spread: 200 },
    orange: { base: 30, spread: 200 }
};

const sizeMap = {
    sm: 'w-70 h-70',
    md: 'w-80 h-80',
    lg: 'w-96 h-96'
};

const GlowCard: React.FC<GlowCardProps> = ({
    children,
    className = '',
    glowColor = 'blue',
    size = 'sm',
    width,
    height,
    customSize = false,
    showNew = false,
    bottomRightImage,
    title,
    description
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const syncPointer = (e: PointerEvent) => {
            const { clientX: x, clientY: y } = e;

            if (cardRef.current) {
                cardRef.current.style.setProperty('--x', x.toFixed(2));
                cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
                cardRef.current.style.setProperty('--y', y.toFixed(2));
                cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
            }
        };

        document.addEventListener('pointermove', syncPointer);
        return () => document.removeEventListener('pointermove', syncPointer);
    }, []);

    const { base, spread } = glowColorMap[glowColor];

    // Determine sizing
    const getSizeClasses = () => {
        if (customSize) {
            return ''; // Let className or inline styles handle sizing
        }
        return sizeMap[size];
    };

    const getInlineStyles = (): CSSProperties & Record<string, string | number> => {
        const baseStyles: CSSProperties & Record<string, string | number> = {
            '--base': base,
            '--spread': spread,
            '--radius': '14',
            '--border': '1',
            '--backdrop': 'hsl(0 0% 60% / 0.12)',
            '--backup-border': 'var(--backdrop)',
            '--size': '200',
            '--outer': '1',
            '--border-size': 'calc(var(--border, 2) * 1px)',
            '--spotlight-size': 'calc(var(--size, 150) * 1px)',
            '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
            backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
            backgroundPosition: '50% 50%',
            backgroundAttachment: 'fixed',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative' as const,
            touchAction: 'none' as const,
        };

        // Add width and height if provided
        if (width !== undefined) {
            baseStyles.width = typeof width === 'number' ? `${width}px` : width;
        }
        if (height !== undefined) {
            baseStyles.height = typeof height === 'number' ? `${height}px` : height;
        }

        return baseStyles;
    };

    const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
    }
    
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
    }
    
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
            <div
                ref={cardRef}
                data-glow
                style={getInlineStyles()}
                className={`
          ${getSizeClasses()}
          ${!customSize ? 'aspect-[3/4]' : ''}
          rounded-2xl 
          relative 
          grid 
          grid-rows-[1fr_auto] 
          shadow-[0_1rem_2rem_-1rem_black] 
          p-4 
          gap-4 
          backdrop-blur-[5px]
          ${className}
        `}
            >
                <div ref={innerRef} data-glow></div>

                <div className="absolute top-3 right-3 flex flex-col gap-2 justify-end items-end">
                    {showNew && (
                        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 backdrop-blur-sm rounded-3xl px-3 py-1 w-20 flex items-center gap-2 shadow-sm border-none outline-none">
                            <Sparkles className="w-4 h-4 text-white" />
                            <span className="text-sm font-medium text-white">New</span>
                        </div>
                    )}
                    <div className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center">
                        <Star className="w-4 h-4  text-purple-600" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center">
                        <ArrowUpRightIcon className="w-4 h-4 text-purple-600" />
                    </div>
                </div>

                {bottomRightImage && (
                    <div className="absolute bottom-3 right-3 w-10 h-10 rounded-3xl object-cover shadow-lg">
                        <Image
                            src={bottomRightImage}
                            alt="Bottom right image"
                            className="w-full h-full rounded-3xl object-cover shadow-lg"
                            width={100}
                            height={100}
                        />
                    </div>
                )}

                {title && description ? (
                    <div className="text-white">
                        <h3 className="text-xl font-bold mb-2">{title}</h3>
                        <p className="text-gray-300 max-w-3/4">{description}</p>
                    </div>
                ) : (
                    children
                )}
            </div>
        </>
    );
};

export default GlowCard 