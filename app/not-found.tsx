'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NotFound() {
    const [glitchFactor, setGlitchFactor] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Glitch gets more intense as you move the mouse faster
            setGlitchFactor(Math.min(Math.abs(e.movementX) + Math.abs(e.movementY), 50));
            setTimeout(() => setGlitchFactor(0), 100);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Random auto-glitches
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                setGlitchFactor(Math.random() * 40);
                setTimeout(() => setGlitchFactor(0), 150);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#f3e600] text-black select-none uppercase">

            {/* Background Texture/Grid */}
            <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(#000 2px, transparent 2px),
                        linear-gradient(90deg, #000 2px, transparent 2px)
                    `,
                    backgroundSize: '100px 100px',
                    transform: `perspective(500px) rotateX(60deg) translateY(${Date.now() % 100}px)`,
                    transformOrigin: 'bottom'
                }}
            />

            {/* Warning Tape Borders */}
            <div className="absolute top-0 inset-x-0 h-4 bg-black pointer-events-none z-50 flex items-center overflow-hidden">
                <div className="w-[200%] h-full bg-[repeating-linear-gradient(45deg,#f3e600,#f3e600_20px,#000_20px,#000_40px)] animate-[pan-left_10s_linear_infinite]" />
            </div>
            <div className="absolute bottom-0 inset-x-0 h-4 bg-black pointer-events-none z-50 flex items-center overflow-hidden">
                <div className="w-[200%] h-full bg-[repeating-linear-gradient(-45deg,#f3e600,#f3e600_20px,#000_20px,#000_40px)] animate-[pan-right_10s_linear_infinite]" />
            </div>

            <div className="relative z-10 w-full max-w-[800px] flex flex-col items-start px-6 md:px-12">

                <div className="bg-black text-[#f3e600] px-4 py-2 font-mono text-xl md:text-2xl font-black tracking-widest mb-8 inline-block"
                    style={{ transform: `translateX(${glitchFactor > 20 ? 10 : 0}px)` }}>
                    FATAL_ERROR
                </div>

                {/* Glitched 404 */}
                <div className="relative group w-full border-b-[8px] border-black pb-4 mb-8">
                    <h1 className="text-[150px] md:text-[220px] leading-none font-black tracking-tighter"
                        style={{
                            fontFamily: 'var(--font-space-grotesk)',
                            transform: `translate(${Math.random() * glitchFactor - glitchFactor / 2}px, ${Math.random() * glitchFactor - glitchFactor / 2}px)`
                        }}>
                        404
                    </h1>
                    {/* Red Split */}
                    <h1 className="absolute top-0 left-0 text-[150px] md:text-[220px] leading-none font-black tracking-tighter text-[#f00] mix-blend-multiply opacity-80 pointer-events-none"
                        style={{
                            fontFamily: 'var(--font-space-grotesk)',
                            transform: `translate(${glitchFactor * 0.5}px, 0)`
                        }}>
                        404
                    </h1>
                    {/* Cyan Split */}
                    <h1 className="absolute top-0 left-0 text-[150px] md:text-[220px] leading-none font-black tracking-tighter text-[#0ff] mix-blend-multiply opacity-80 pointer-events-none"
                        style={{
                            fontFamily: 'var(--font-space-grotesk)',
                            transform: `translate(${-glitchFactor * 0.5}px, 0)`
                        }}>
                        404
                    </h1>
                </div>

                <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-4"
                    style={{ fontFamily: 'var(--font-outfit)' }}>
                    PAGE NOT FOUND
                </h2>

                <p className="font-mono text-sm md:text-base text-black/80 max-w-lg mb-12 font-bold leading-relaxed tracking-wider">
                    TARGET DIRECTORY IS UNREACHABLE. CORRUPTION DETECTED IN THE SECTOR MAP. RECOMMEND IMMEDIATE JACK-OUT.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                    <Link href="/"
                        className="group relative flex-1 bg-black text-[#f3e600] text-center font-bold tracking-widest py-4 md:py-6 overflow-hidden"
                    >
                        <span className="relative z-10 group-hover:text-black transition-colors duration-200">RETURN TO BASE</span>
                        {/* Hover Fill */}
                        <div className="absolute inset-0 bg-[#0ff] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />

                        {/* Cyber Deco Corners */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </div>

            </div>

            {/* Dynamic Glitch Scanline overlapping everything */}
            <div
                className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none z-50 h-[10px] w-full"
                style={{
                    top: `${Math.random() * 100}%`,
                    display: glitchFactor > 30 ? 'block' : 'none',
                    transform: `scaleY(${Math.random() * 5 + 1})`
                }}
            />

            <style>{`
                @keyframes pan-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                @keyframes pan-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
                ::selection { background: #0ff; color: #000; }
            `}</style>
        </main>
    );
}
