'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
    const messages = [
        "ESTABLISHING SECURE CONNECTION...",
        "DECRYPTING NEURAL ASSETS...",
        "COMPILING QUANTUM ROUTINES...",
        "BYPASSING MAINFRAME FIREWALL...",
        "INITIALIZING VIRTUAL ENVIRONMENT..."
    ];
    
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % messages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030305] overflow-hidden" style={{
            fontFamily: "'Fira Code', monospace",
            backgroundImage: 'radial-gradient(circle at 50% 50%, #1a0b2e 0%, #030305 70%)'
        }}>
            {/* Scanlines Overlay */}
            <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03]" style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1) 50%, rgba(255,255,255,0))',
                backgroundSize: '100% 4px'
            }}></div>

            {/* Ambient grid background */}
            <div className="absolute inset-0 z-0 pointer-events-none perspective-grid" />

            <div className="relative z-10 flex flex-col items-center gap-16">
                {/* Advanced 3D Gyroscope Element */}
                <div className="gyroscope">
                    {/* Pulsing shockwave from center */}
                    <div className="shockwave"></div>
                    
                    {/* 4 Orbital Rings */}
                    <div className="ring ring1"></div>
                    <div className="ring ring2"></div>
                    <div className="ring ring3"></div>
                    
                    {/* Glowing Core */}
                    <div className="core">
                        <span className="neon-flicker">&lt;</span>
                        <span className="core-dot">.</span>
                        <span className="neon-flicker">&gt;</span>
                    </div>
                </div>

                {/* Status & Progress */}
                <div className="flex flex-col items-center gap-4 mt-8">
                    <div className="loading-text glitch-text" data-text={messages[messageIndex]}>
                        {messages[messageIndex]}
                    </div>
                    
                    <div className="progress-container">
                        <div className="progress-bar">
                            <div className="progress-fill"></div>
                            <div className="progress-glow"></div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .perspective-grid {
                    background-size: 50px 50px;
                    background-image: 
                        linear-gradient(to right, rgba(0, 243, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(188, 19, 254, 0.05) 1px, transparent 1px);
                    transform: perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px);
                    animation: gridMove 20s linear infinite;
                }

                @keyframes gridMove {
                    0% { background-position: 0 0; }
                    100% { background-position: 0 50px; }
                }

                .gyroscope {
                    position: relative;
                    width: 160px;
                    height: 160px;
                    transform-style: preserve-3d;
                    perspective: 1000px;
                }

                .ring {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid transparent;
                    transform-style: preserve-3d;
                }

                .ring1 {
                    border-top-color: #00f3ff;
                    border-left-color: rgba(0, 243, 255, 0.4);
                    animation: rotate1 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
                    box-shadow: inset 0 0 20px rgba(0, 243, 255, 0.3);
                }

                .ring2 {
                    border-bottom-color: #bc13fe;
                    border-right-color: rgba(188, 19, 254, 0.4);
                    animation: rotate2 4s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite reverse;
                    box-shadow: inset 0 0 20px rgba(188, 19, 254, 0.3);
                }

                .ring3 {
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-top: 2px solid #ff0055;
                    animation: rotate3 5s linear infinite;
                    box-shadow: 0 0 15px rgba(255, 0, 85, 0.2);
                    width: 120%;
                    height: 120%;
                    top: -10%;
                    left: -10%;
                }

                .shockwave {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(188,19,254,0.8) 0%, transparent 70%);
                    transform: translate(-50%, -50%);
                    animation: shockwavePulse 2s ease-out infinite;
                }

                .core {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    text-shadow: 0 0 15px #00f3ff, 0 0 30px #bc13fe;
                    z-index: 10;
                }

                .core-dot {
                    color: #ff0055;
                    animation: pulseDot 1s ease-in-out infinite;
                }

                .neon-flicker {
                    animation: flicker 4s infinite;
                }

                .loading-text {
                    color: #a0aec0;
                    font-size: 0.8rem;
                    letter-spacing: 0.4em;
                    text-transform: uppercase;
                    position: relative;
                    text-shadow: 0 0 5px rgba(0,243,255,0.5);
                }

                .loading-text::after {
                    content: '█';
                    position: absolute;
                    margin-left: 8px;
                    color: #00f3ff;
                    animation: blink 1s step-end infinite;
                    font-size: 0.8rem;
                    text-shadow: 0 0 10px #00f3ff;
                }

                /* Glitch Effect */
                .glitch-text::before, .glitch-text::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #030305;
                }
                
                .glitch-text::before {
                    left: 2px;
                    text-shadow: -1px 0 #ff0055;
                    animation: glitch-anim-1 2s infinite linear alternate-reverse;
                    clip: rect(24px, 550px, 90px, 0);
                }
                
                .glitch-text::after {
                    left: -2px;
                    text-shadow: -1px 0 #00f3ff;
                    animation: glitch-anim-2 3s infinite linear alternate-reverse;
                    clip: rect(85px, 550px, 140px, 0);
                }

                .progress-container {
                    position: relative;
                    width: 250px;
                    height: 4px;
                    padding: 2px;
                    border: 1px solid rgba(0, 243, 255, 0.2);
                    border-radius: 4px;
                    background: rgba(0,0,0,0.5);
                }

                .progress-bar {
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.05);
                    position: relative;
                    overflow: hidden;
                    border-radius: 2px;
                }

                .progress-fill {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 0%;
                    background: linear-gradient(90deg, #00f3ff, #bc13fe, #ff0055);
                    background-size: 200% 100%;
                    animation: 
                        load-progress 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite,
                        gradientShift 2s linear infinite;
                }

                @keyframes rotate1 {
                    0% { transform: rotateX(60deg) rotateY(-45deg) rotateZ(0deg); }
                    100% { transform: rotateX(60deg) rotateY(-45deg) rotateZ(360deg); }
                }

                @keyframes rotate2 {
                    0% { transform: rotateX(60deg) rotateY(45deg) rotateZ(0deg); }
                    100% { transform: rotateX(60deg) rotateY(45deg) rotateZ(360deg); }
                }

                @keyframes rotate3 {
                    0% { transform: rotateX(75deg) rotateY(0deg) rotateZ(0deg); }
                    100% { transform: rotateX(75deg) rotateY(0deg) rotateZ(360deg); }
                }

                @keyframes shockwavePulse {
                    0% { width: 20px; height: 20px; opacity: 1; border: 2px solid #bc13fe; }
                    100% { width: 200px; height: 200px; opacity: 0; border: 1px solid rgba(0, 243, 255, 0.5); }
                }

                @keyframes pulseDot {
                    0%, 100% { opacity: 0.3; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); text-shadow: 0 0 10px #ff0055; }
                }

                @keyframes flicker {
                    0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
                        opacity: 1; text-shadow: 0 0 15px #00f3ff, 0 0 30px #bc13fe;
                    }
                    20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
                        opacity: 0.4; text-shadow: none;
                    }
                }

                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }

                @keyframes load-progress {
                    0% { width: 0%; transform: translateX(-100%); }
                    50% { width: 100%; transform: translateX(0); }
                    100% { width: 100%; transform: translateX(100%); }
                }

                @keyframes gradientShift {
                    0% { background-position: 100% 0; }
                    100% { background-position: -100% 0; }
                }

                @keyframes glitch-anim-1 {
                    0% { clip: rect(10px, 9999px, 44px, 0); }
                    20% { clip: rect(40px, 9999px, 60px, 0); }
                    40% { clip: rect(80px, 9999px, 90px, 0); }
                    60% { clip: rect(15px, 9999px, 30px, 0); }
                    80% { clip: rect(65px, 9999px, 80px, 0); }
                    100% { clip: rect(25px, 9999px, 50px, 0); }
                }

                @keyframes glitch-anim-2 {
                    0% { clip: rect(65px, 9999px, 100px, 0); }
                    20% { clip: rect(10px, 9999px, 40px, 0); }
                    40% { clip: rect(50px, 9999px, 75px, 0); }
                    60% { clip: rect(85px, 9999px, 90px, 0); }
                    80% { clip: rect(35px, 9999px, 60px, 0); }
                    100% { clip: rect(15px, 9999px, 45px, 0); }
                }
            `}</style>
        </div>
    );
}
