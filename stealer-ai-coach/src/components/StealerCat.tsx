import React from 'react';

interface StealerCatProps {
  expression?: 'normal' | 'happy' | 'sad';
  className?: string;
  size?: number | string;
}

export default function StealerCat({ expression = 'normal', className = '', size = '100%' }: StealerCatProps) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_4px_8px_rgba(55,51,43,0.15)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* --- PENCIL / STYLUS BEHIND HEAD --- */}
        {/* Renders diagonally from top-left to bottom-right precisely matching the brand artwork */}
        <g transform="rotate(-30, 50, 50)">
          {/* Pencil eraser */}
          <rect x="1" y="44" width="6" height="12" rx="2" fill="#ffaabc" />
          {/* Eraser metal band */}
          <rect x="7" y="44" width="4" height="12" fill="#e4e3d4" />
          {/* Pencil body */}
          <rect x="11" y="44" width="58" height="12" fill="#ffb40f" />
          {/* Pencil stripe details */}
          <line x1="11" y1="47" x2="69" y2="47" stroke="#ff9191" strokeWidth="0.75" />
          <line x1="11" y1="53" x2="69" y2="53" stroke="#ff9191" strokeWidth="0.75" />
          {/* Wood tip collar */}
          <polygon points="69,44 83,50 69,56" fill="#fdfcef" stroke="#37332b" strokeWidth="1" strokeLinejoin="miter" />
          {/* Dark graphite lead tip */}
          <polygon points="76,46.5 83,50 76,53.5" fill="#37332b" />
        </g>

        {/* --- CAT POINTY EARS --- */}
        {/* Left ear */}
        <path d="M 21,43 L 13,11 Q 25,18 38,28 Z" fill="#37332b" stroke="#37332b" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Left inner ear (pink contrast) */}
        <path d="M 23,39 L 17,17 Q 25,22 33,29 Z" fill="#ffaabc" />

        {/* Right ear */}
        <path d="M 62,28 Q 75,18 87,11 L 79,43 Z" fill="#37332b" stroke="#37332b" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Right inner ear (pink contrast) */}
        <path d="M 67,29 Q 75,22 83,17 L 77,39 Z" fill="#ffaabc" />

        {/* --- CHUBBY CHEEK FACE BASE (Charcoal color #37332b) --- */}
        <ellipse cx="50" cy="55" rx="34" ry="29" fill="#37332b" stroke="#37332b" strokeWidth="1" />

        {/* Cheek fur fluff details left & right to make the kitty look chubby and hand-illustrated */}
        <path d="M 17,55 Q 11,54 16,61" fill="#37332b" stroke="#37332b" strokeWidth="1" />
        <path d="M 83,55 Q 89,54 84,61" fill="#37332b" stroke="#37332b" strokeWidth="1" />

        {/* --- FOREHEAD SPARKLE STAR (Gold logo center) --- */}
        <path d="M 50,31 Q 50,38 43,38 Q 50,38 50,45 Q 50,38 57,38 Q 50,38 50,31 Z" fill="#fdfcef" />
        <path d="M 50,32 Q 50,38 44.5,38 Q 50,38 50,44 Q 50,38 55.5,38 Q 50,38 50,32 Z" fill="#f8e473" />

        {/* --- EXPRESSION DEFINITIONS (White contrasts on charcoal base) --- */}
        {expression === 'normal' && (
          <>
            {/* Left Eye: Big cute sparkle pupil circle */}
            <circle cx="34" cy="51" r="4.5" fill="#fdfcef" />
            <circle cx="35.5" cy="49" r="1.5" fill="#37332b" />
            <circle cx="32.5" cy="52" r="1" fill="#ffffff" />
            <circle cx="35" cy="50" r="0.6" fill="#ffffff" />

            {/* Right Eye: winking arc */}
            <path d="M 61,50 Q 66,56 71,50" fill="none" stroke="#fdfcef" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Cute double smile mouth "w" */}
            <path d="M 45,59 Q 47.5,62 50,59 Q 52.5,62 55,59" fill="none" stroke="#fdfcef" strokeWidth="2.2" strokeLinecap="round" />
            {/* Little pink nose */}
            <polygon points="48.5,56 51.5,56 50,58" fill="#ffaabc" />
          </>
        )}

        {expression === 'happy' && (
          <>
            {/* Both eyes closed in joy (happy upward arches) */}
            <path d="M 28,52 Q 33.5,45 39,52" fill="none" stroke="#fdfcef" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 61,52 Q 66.5,45 72,52" fill="none" stroke="#fdfcef" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Open laughing cat mouth */}
            <path d="M 44.5,58 Q 50,66 55.5,58 Z" fill="#ffaabc" stroke="#fdfcef" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Tiny pink nose */}
            <polygon points="48.5,55.5 51.5,55.5 50,57" fill="#ff9191" />

            {/* Floating sparkle joy markers */}
            <circle cx="21" cy="27" r="1.5" fill="#f8e473" className="animate-pulse" />
            <circle cx="79" cy="27" r="1.5" fill="#f8e473" className="animate-pulse" />
          </>
        )}

        {expression === 'sad' && (
          <>
            {/* Downward curves for worried eyes */}
            <path d="M 29,49 Q 34.5,56 40,49" fill="none" stroke="#fdfcef" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 60,49 Q 65.5,56 71,49" fill="none" stroke="#fdfcef" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Drooping cute light blue tear on left eye */}
            <path d="M 30,53 Q 32.5,58 30,60 Q 27.5,58 30,53 Z" fill="#96c1dd" />

            {/* Downward tiny sad mouth curve */}
            <path d="M 47,60 Q 50,57 53,60" fill="none" stroke="#fdfcef" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Mini nose */}
            <polygon points="48.5,56 51.5,56 50,57.5" fill="#ffaabc" />
          </>
        )}

        {/* --- ROSY BLUSH CHEEKS (Perfect coral-pink circles) --- */}
        <ellipse cx="23" cy="58" rx="5.5" ry="3.5" fill="#ff9191" opacity="0.8" />
        <ellipse cx="77" cy="58" rx="5.5" ry="3.5" fill="#ff9191" opacity="0.8" />
      </svg>
    </div>
  );
}
