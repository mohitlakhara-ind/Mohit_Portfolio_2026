'use client';
import React, { useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface Interest {
    title: string;
    description: string;
    emoji: string;
    accent: string;
    size: 'lg' | 'md' | 'sm';
}

const interests: Interest[] = [
    {
        title: 'Morning Ritual',
        description: 'My mornings start with normal tea or black coffee — no green tea. It\'s a ritual that sets the tone for deep work and clear thinking.',
        emoji: '☕',
        accent: '#FBBF24',
        size: 'lg',
    },
    {
        title: 'Lo-fi & Focus',
        description: 'Coding sessions powered by lo-fi hip-hop and ambient sound. The right soundtrack unlocks flow state.',
        emoji: '🎧',
        accent: '#A78BFA',
        size: 'md',
    },
    {
        title: 'Open Source',
        description: 'Believe the best code is shared. Contributing to OS projects keeps me sharp and gives back to the community.',
        emoji: '🌐',
        accent: '#60A5FA',
        size: 'md',
    },
    {
        title: 'Reading',
        description: '"The Pragmatic Programmer", "Clean Code", and anything that makes me a better thinker — not just a better coder.',
        emoji: '📚',
        accent: '#F59E0B',
        size: 'sm',
    },
    {
        title: 'UI Obsession',
        description: 'I screenshot beautiful interfaces. My camera roll is half sunsets, half Dribbble-worthy UIs.',
        emoji: '🎨',
        accent: '#F472B6',
        size: 'sm',
    },
    {
        title: 'Gaming',
        description: 'Strategy & sandbox games. Minecraft and chess both scratch the same itch — systems thinking.',
        emoji: '🎮',
        accent: '#34D399',
        size: 'md',
    },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    show: (i: number) => ({
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

const BeyondTheCode = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="relative w-full bg-background py-32 px-6 sm:px-12 overflow-hidden border-t border-white/5">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_20%,transparent_100%)] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
                    >
                        <span className="text-[10px] font-mono tracking-widest uppercase text-text-secondary">05 // The Human Element</span>
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black font-display tracking-tighter mb-6"
                    >
                        Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-action to-accent-highlight italic">the IDE</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-text-secondary text-lg max-w-2xl font-sans"
                    >
                        The rituals, obsessions, and disconnected moments that shape how I think, create, and engineer solutions.
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[180px]">
                    {interests.map((item, i) => (
                        <DataCard key={item.title} item={item} index={i} inView={inView} />
                    ))}
                </div>
            </div>

            {/* Ambient Lighting */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent-highlight/5 blur-[120px]" />
        </section>
    );
};

const DataCard = ({ item, index, inView }: { item: Interest; index: number; inView: boolean }) => {
    const [hovered, setHovered] = useState(false);

    const sizeClasses = {
        lg: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-2',
        md: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-1',
        sm: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1',
    };

    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`group relative rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md overflow-hidden cursor-default transition-all duration-500 hover:border-white/30 flex flex-col ${sizeClasses[item.size]}`}
            style={{
                boxShadow: hovered ? `0 0 30px 0 ${item.accent}15, inset 0 0 20px 0 ${item.accent}05` : 'none',
            }}
        >
            {/* Animated Gradient Background */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${item.accent}, transparent 70%)`
                }}
            />

            {/* Corner Bracket Decor */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 group-hover:border-white/60 transition-colors rounded-tl-2xl m-4 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 group-hover:border-white/60 transition-colors rounded-br-2xl m-4 pointer-events-none" />

            <div className={`relative z-10 flex flex-col h-full p-6 ${item.size === 'lg' ? 'p-10' : ''}`}>
                <div className="flex items-start justify-between mb-auto">
                    <div 
                        className={`flex items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${item.size === 'lg' ? 'w-16 h-16 text-3xl md:w-20 md:h-20 md:text-4xl' : 'w-12 h-12 text-2xl'}`}
                    >
                        {item.emoji}
                    </div>
                    {item.size === 'lg' && (
                        <div className="hidden sm:block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-text-secondary uppercase">
                            Primary.Focus
                        </div>
                    )}
                </div>

                <div className={`mt-6 ${item.size === 'sm' ? 'mt-4' : ''}`}>
                    <h3 
                        className={`font-bold font-display tracking-tight mb-2 transition-colors duration-300 ${item.size === 'lg' ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}
                        style={{ color: hovered ? item.accent : 'var(--foreground)' }}
                    >
                        {item.title}
                    </h3>
                    
                    {(item.size === 'lg' || item.size === 'md') && (
                        <p className={`text-text-secondary font-sans leading-relaxed ${item.size === 'lg' ? 'text-sm md:text-base max-w-md' : 'text-xs md:text-sm'}`}>
                            {item.description}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default BeyondTheCode;
