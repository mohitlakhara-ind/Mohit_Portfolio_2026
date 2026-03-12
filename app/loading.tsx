'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.85) {
                setGlitch(true);
                setTimeout(() => setGlitch(false), 150);
            }
        }, 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] bg-[#f3e600] text-black flex flex-col items-center justify-center overflow-hidden uppercase select-none">

            {/* Background Grid Lines representing circuitry/city infrastructure */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 flex flex-col items-start px-4 md:px-12 w-full max-w-7xl">

                {/* Aggressive Glitching Title */}
                <div className="relative group">
                    <h1 className={`text-[12vw] leading-none font-black tracking-tighter ${glitch ? 'translate-x-2' : ''}`}
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        AWAKENING
                    </h1>
                    {glitch && (
                        <h1 className="absolute top-0 left-[-10px] text-[12vw] leading-none font-black tracking-tighter text-[#0ff] mix-blend-multiply"
                            style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                            AWAKENING
                        </h1>
                    )}
                    {glitch && (
                        <h1 className="absolute top-0 right-[-10px] text-[12vw] leading-none font-black tracking-tighter text-[#f00] mix-blend-multiply"
                            style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                            AWAKENING
                        </h1>
                    )}
                </div>

                <h1 className="text-[12vw] leading-none font-black tracking-tighter text-transparent"
                    style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        WebkitTextStroke: '3px #000'
                    }}>
                    SAMURAI
                </h1>

                {/* Cyberpunk Progress Bar */}
                <div className="w-full mt-12 bg-black h-8 md:h-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-[#0ff] animate-[load_5s_ease-out_forwards]"
                        style={{ boxShadow: '0 0 20px #0ff' }} />
                    <div className="absolute inset-0 flex items-center px-4 font-mono text-xs md:text-sm text-white font-bold tracking-widest mix-blend-difference">
                        ESTABLISHING NEURAL LINK // SYSTEM BOOT
                    </div>
                </div>

                <div className="flex w-full justify-between items-end mt-4 font-mono text-sm font-bold tracking-[0.2em]">
                    <span className="bg-black text-[#f3e600] px-3 py-1">V: 2.0.77</span>
                    <span className="animate-pulse">WARNING: BREACH DETECTED</span>
                </div>
            </div>

            {/* Random HUD Elements */}
            <div className="absolute top-8 right-8 flex flex-col items-end gap-1 font-mono text-xs font-bold tracking-widest text-black/50">
                <span>RAM // OK</span>
                <span>CPU // OK</span>
                <span className="text-black bg-[#0ff] px-2 py-0.5 animate-pulse">OPTICS // CALIBRATING</span>
            </div>

            <style>{`
                @keyframes load {
                    0% { width: 0%; }
                    20% { width: 30%; }
                    40% { width: 45%; }
                    60% { width: 80%; }
                    80% { width: 95%; }
                    100% { width: 100%; }
                }
            `}</style>
        </div>
    );
}
