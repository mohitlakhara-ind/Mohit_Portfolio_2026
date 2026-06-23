'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
    { text: "Hello", lang: "English" },
    { text: "नमस्ते", lang: "Hindi" },
    { text: "নমস্কার", lang: "Bengali" },
    { text: "నమస్కారం", lang: "Telugu" },
    { text: "नमस्कार", lang: "Marathi" },
    { text: "வணக்கம்", lang: "Tamil" },
    { text: "آداب", lang: "Urdu" },
    { text: "નમસ્તે", lang: "Gujarati" },
    { text: "ನಮಸ್ಕಾರ", lang: "Kannada" },
    { text: "ନମସ୍କାର", lang: "Odia" },
    { text: "നമസ്കാരം", lang: "Malayalam" },
    { text: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", lang: "Punjabi" },
    { text: "নমস্কাৰ", lang: "Assamese" },
    { text: "प्रणाम", lang: "Maithili" },
    { text: "ᱡᱚᱦᱟᱨ", lang: "Santali" },
    { text: "سلام", lang: "Kashmiri" },
    { text: "नमस्ते", lang: "Nepali" },
    { text: "سلام", lang: "Sindhi" },
    { text: "नमस्कार", lang: "Konkani" },
    { text: "नमस्ते", lang: "Dogri" },
    { text: "खुलुमबाय", lang: "Bodo" },
    { text: "ꯈꯨꯔꯨꯝꯖꯔꯤ", lang: "Manipuri" },
    { text: "नमो नमः", lang: "Sanskrit" }
];

const AboutHero = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % greetings.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-[100svh] w-full flex items-center justify-center bg-background overflow-hidden select-none">
            
            {/* Elegant Modern Background */}
            <div className="absolute inset-0 z-0">
                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                     style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
                />
                
                {/* Glowing ambient orbs */}
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.15, 0.2, 0.15]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-accent-action rounded-full blur-[150px] pointer-events-none mix-blend-screen" 
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-accent-highlight rounded-full blur-[120px] pointer-events-none mix-blend-screen" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none" />
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center px-4 sm:px-6 mt-10">
                
                {/* Dynamic Greeting with Blur Transitions */}
                <div className="mb-2 md:mb-4 flex flex-col items-center z-20">
                    <div className="h-14 md:h-20 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10, filter: "blur(10px)", scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                                exit={{ opacity: 0, y: -10, filter: "blur(10px)", scale: 1.05 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                // Note: Removed wide tracking and uppercase because it breaks connected Indic scripts (like Devanagari shirorekha)
                                className="text-4xl md:text-5xl lg:text-7xl font-light text-foreground"
                            >
                                {greetings[index].text}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "3rem" }}
                        transition={{ delay: 1, duration: 1 }}
                        className="h-[1px] bg-accent-action/50 mt-2 mb-2" 
                    />
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="text-[10px] md:text-xs font-mono text-text-secondary tracking-[0.3em] uppercase bg-foreground/5 px-3 py-1 rounded-full border border-foreground/10"
                    >
                        {greetings[index].lang}
                    </motion.span>
                </div>

                {/* Massive Name Display */}
                <div className="relative w-full flex flex-col items-center justify-center py-4 md:py-6">
                    {/* Outline Background Text (Huge) */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.03 }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-black tracking-tighter select-none pointer-events-none"
                        style={{ WebkitTextStroke: '2px currentColor', color: 'transparent' }}
                    >
                        MOHIT
                    </motion.div>

                    {/* Solid Foreground Text */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                        className="relative text-[3.5rem] sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.9] flex flex-col items-center z-10"
                    >
                        <span className="text-foreground drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">I'M MOHIT</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-action to-accent-highlight mt-1 sm:mt-2">
                            LAKHARA
                        </span>
                    </motion.h1>
                </div>

                {/* Subtitle */}
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="mt-4 md:mt-6 text-base md:text-xl text-text-secondary max-w-2xl font-light tracking-wide px-4 leading-relaxed z-10"
                >
                    Crafting <span className="text-foreground font-medium italic">immersive digital experiences</span> through bleeding-edge technology and refined design.
                </motion.p>
            </div>

            {/* Scroll indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-text-secondary/30 to-transparent relative overflow-hidden">
                    <motion.div 
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-full h-1/2 bg-text-secondary absolute top-0"
                    />
                </div>
            </motion.div>

        </section>
    );
};

export default AboutHero;
