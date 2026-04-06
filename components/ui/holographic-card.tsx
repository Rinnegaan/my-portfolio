"use client";

import React, { useRef } from 'react';

export default function HolographicCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Tilt calculations based on mouse position relative to center
        const rotateX = (centerY - y) / 15; 
        const rotateY = (x - centerX) / 15;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.setProperty('--x', `50%`);
        card.style.setProperty('--y', `50%`);
    };

    return (
        <div 
            className={`relative group/holo transition-transform duration-200 ease-out will-change-transform ${className}`}
            style={{ transformStyle: "preserve-3d" }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {/* The holographic glow layer linked to mouse movement using theme accent color */}
            <div 
                className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 group-hover/holo:opacity-100 transition-opacity duration-500 z-10"
                style={{
                    background: 'radial-gradient(circle 250px at var(--x, 50%) var(--y, 50%), rgba(0, 229, 255, 0.15) 0%, transparent 100%)',
                    mixBlendMode: 'screen',
                }}
            />
            {/* Reflection flare */}
            <div 
               className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 group-hover/holo:opacity-50 transition-opacity duration-300 mix-blend-overlay z-20"
               style={{
                   background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.05) 25%, transparent 30%)',
                   backgroundPosition: 'calc(var(--x, 50%) * 2) calc(var(--y, 50%) * 2)',
                   backgroundSize: '200% 200%'
               }}
            />
        </div>
    );
}
