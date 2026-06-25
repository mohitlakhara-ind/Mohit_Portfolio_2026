'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, OpenNewWindow, ArrowRight, Download, LayoutLeft } from 'iconoir-react';
import { featuredProjects, FeaturedProject } from '@/data/featuredProjectsData';

const getThemeAccentColor = (accentColor: string, isDarkMode: boolean) => {
    if (!accentColor) return 'var(--gold-primary)';
    
    if (accentColor.toLowerCase() === '#ffffff' || accentColor.toLowerCase() === '#fff') {
        return isDarkMode ? '#ffffff' : 'var(--gold-primary)';
    }
    if (accentColor.toLowerCase() === '#000000' || accentColor.toLowerCase() === '#000') {
        return isDarkMode ? 'var(--gold-primary)' : 'var(--foreground)';
    }
    
    if (accentColor.startsWith('var(')) return accentColor;
    
    const hex = accentColor.replace('#', '');
    if (hex.length === 6 || hex.length === 3) {
        const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16);
        const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16);
        const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16);
        
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        
        if (isDarkMode) {
            if (brightness < 60) {
                return 'var(--gold-primary)';
            }
            return accentColor;
        } else {
            if (brightness > 170) {
                if (g > r && g > b) {
                    return '#0D9488';
                }
                if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20) {
                    return 'var(--gold-primary)';
                }
                return 'var(--gold-primary)';
            }
            return accentColor;
        }
    }
    
    return accentColor;
};

// ── Mobile Projects List Component ──────────────────────────────────────────
const MobileProjects = ({ isDark }: { isDark: boolean }) => {
    const displayProjects = featuredProjects.slice(0, 5);

    return (
        <div className="w-full bg-background px-4 py-16 space-y-12 z-10 relative">
            {/* Mobile Header */}
            <div className="text-center space-y-4 mb-16">
                <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-foreground/70">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    Featured Works
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground">
                    Selected <br />
                    <span className="bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold-light)] bg-clip-text text-transparent">
                        Projects
                    </span>
                </h2>
                <p className="max-w-md mx-auto text-sm text-text-secondary leading-relaxed font-sans">
                    A curated collection of my most impactful work.
                </p>
            </div>

            {/* Mobile Project Cards Stack */}
            <div className="space-y-8">
                {displayProjects.map((project, i) => {
                    const accent = getThemeAccentColor(project.accentColor, isDark);
                    const formattedIndex = (i + 1).toString().padStart(2, '0');

                    return (
                        <div
                            key={project.id}
                            className="card-metallic flex flex-col p-5 border-t-2"
                            style={{ borderTopColor: accent }}
                        >
                            {/* Project Image Frame */}
                            <div className="relative w-full aspect-video rounded overflow-hidden mb-5 bg-primary-bg">
                                <Image
                                    src={project.coverImage}
                                    alt={project.title}
                                    fill
                                    className="object-cover object-top"
                                    sizes="100vw"
                                />
                                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 border border-white/10 rounded font-mono text-[10px] font-bold text-[var(--gold-light)]">
                                    #{formattedIndex}
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-3 mb-5">
                                <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider text-text-secondary">
                                    {project.category}
                                </span>
                                <h3 className="text-2xl font-display font-bold text-foreground tracking-tight">
                                    {project.title}
                                </h3>
                                <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest leading-none">
                                    {project.subtitle}
                                </p>
                                <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
                                    {project.description}
                                </p>
                            </div>

                            {/* Tech Stack */}
                            <div className="mb-6 flex flex-wrap gap-1.5">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="rounded bg-foreground/5 border border-foreground/10 px-2.5 py-1 text-[9px] font-mono font-bold text-foreground/80 uppercase tracking-wider">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex items-center gap-3">
                                {project.liveLink && (
                                    <Link href={project.liveLink} target="_blank" className="group/btn btn-metallic flex items-center justify-center gap-2 px-5 py-3 text-[10px] w-full">
                                        <span>Visit Live</span>
                                        <OpenNewWindow width={14} height={14} />
                                    </Link>
                                )}
                                {project.githubLink && (
                                    <Link href={project.githubLink} target="_blank" className="flex items-center justify-center p-3 rounded bg-foreground/5 text-foreground border border-foreground/10 hover:bg-foreground/10">
                                        <Github width={18} height={18} />
                                    </Link>
                                )}
                                {project.apkLink && project.apkLink !== '#' && (
                                    <Link href={project.apkLink} target="_blank" className="flex items-center justify-center p-3 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                        <Download width={18} height={18} />
                                    </Link>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Mobile Finale Card */}
                <div className="card-metallic p-6 text-center space-y-6 flex flex-col items-center justify-center border-t-2 border-[#8A2BE2]">
                    <LayoutLeft className="h-14 w-14 text-[var(--gold-primary)] opacity-80" />
                    <h3 className="text-2xl font-display font-bold text-foreground tracking-tight">
                        Explore the <br />
                        <span className="text-[var(--gold-primary)] italic">Archives</span>
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-sans font-light max-w-sm">
                        Dive deeper into 20+ more full-stack projects, experimental UI designs, and open‑source contributions.
                    </p>
                    <Link href="/projects" className="group/btn btn-metallic flex items-center justify-center gap-2 px-6 py-3.5 text-[10px] w-full max-w-xs">
                        <span>View All Projects</span>
                        <ArrowRight width={16} height={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

// ── Main Sticky Deck Component (Desktop) ────────────────────────────────────
const Projects = () => {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const { theme } = useTheme();
    const [isDark, setIsDark] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDark(systemTheme);
        } else {
            setIsDark(theme === 'dark');
        }
    }, [theme]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const [activeIndex, setActiveIndex] = useState(0);
    const displayProjects = featuredProjects.slice(0, 5);
    const totalCards = displayProjects.length + 1;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.floor(latest * totalCards);
        const visibleCardIndex = Math.max(0, index - 1);
        setActiveIndex(Math.min(visibleCardIndex, displayProjects.length));
    });

    const activeColor = activeIndex < displayProjects.length
        ? getThemeAccentColor(displayProjects[activeIndex].accentColor, isDark)
        : '#8A2BE2';

    const glowColor = activeColor;

    if (isMobile) {
        return <MobileProjects isDark={isDark} />;
    }

    return (
        <section ref={container} id="projects" className="relative w-full bg-transparent transition-colors duration-500">
            {/* Ambient Background Base */}
            <div 
                className="fixed inset-0 pointer-events-none z-0 transition-colors duration-1000 ease-in-out" 
                style={{ backgroundColor: `color-mix(in srgb, ${glowColor} 2%, transparent)` }}
            />

            {/* Header */}
            <div className="h-screen w-full flex flex-col items-center justify-center sticky top-0 z-0 pointer-events-none">
                <HeaderContent progress={scrollYProgress} totalCards={totalCards} />
            </div>

            {/* Cards Deck */}
            <div className="relative z-10 w-full">
                {displayProjects.map((project, i) => {
                    const targetScale = 1 - ((totalCards - i) * 0.03);
                    return (
                        <Card
                            key={project.id}
                            i={i}
                            project={project}
                            progress={scrollYProgress}
                            range={[(i + 1) / totalCards, 1]}
                            targetScale={targetScale}
                            isDark={isDark}
                        />
                    )
                })}

                <FinaleCard
                    i={displayProjects.length}
                    progress={scrollYProgress}
                    range={[1, 1]}
                />
            </div>
        </section>
    );
};

const HeaderContent = ({ progress, totalCards }: { progress: MotionValue<number>, totalCards: number }) => {
    const opacity = useTransform(progress, [0, 0.8 / totalCards], [1, 0]);

    return (
        <motion.div style={{ transform: 'translateZ(0)' }} className="w-full flex flex-col items-center justify-center px-4 relative z-10 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 font-mono text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider text-foreground/70">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Featured Works
            </div>

            <h2 className="mb-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Selected <br />
                <span className="bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold-light)] bg-clip-text text-transparent">
                    Projects
                </span>
            </h2>

            <p className="max-w-md mx-auto text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
                A curated collection of my most impactful work. Scroll to explore the deck.
            </p>

            <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="mt-16 flex flex-col items-center gap-3 text-[var(--gold-light)]"
            >
                <span className="font-mono text-xs uppercase tracking-wider font-bold">
                    Scroll
                </span>
                <div className="rotate-90">
                    <ArrowRight width={24} height={24} />
                </div>
            </motion.div>
        </motion.div>
    );
}

const Card = ({
    i,
    project,
    progress,
    range,
    targetScale,
    isDark,
}: {
    i: number,
    project: FeaturedProject,
    progress: MotionValue<number>,
    range: number[],
    targetScale: number,
    isDark: boolean,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'start start']
    });

    const scale = useTransform(progress, range, [1, targetScale]);
    const overlayOpacity = useTransform(progress, range, [0, 0.6]);

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
    const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "0%"]);

    const accent = getThemeAccentColor(project.accentColor, isDark);
    const formattedIndex = (i + 1).toString().padStart(2, '0');

    return (
        <div ref={cardRef} className="h-screen w-full flex items-center justify-center sticky top-0">
            <motion.div
                style={{
                    scale,
                    top: `calc(10vh + ${i * 25}px)`
                }}
                className="card-metallic absolute w-[92vw] h-[80vh] md:w-[75vw] md:h-[75vh] flex flex-col-reverse md:flex-row origin-top shadow-2xl group transition-colors duration-500"
            >
                <motion.div
                    style={{ opacity: overlayOpacity }}
                    className="absolute inset-0 bg-background z-50 pointer-events-none"
                />

                {/* Left/Foreground Content - 45% */}
                <div className="w-full h-1/2 md:h-full md:w-[45%] p-6 md:p-12 flex flex-col justify-end md:justify-center relative z-10 bg-transparent">
                    {/* Background Watermark Index */}
                    <div className="absolute top-4 left-4 md:-top-10 md:-left-10 text-[8rem] md:text-[14rem] lg:text-[18rem] font-black text-foreground/[0.03] select-none pointer-events-none leading-none z-0 transition-colors">
                        {formattedIndex}
                    </div>

                    <div className="relative z-10 flex flex-col h-full justify-center">
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                            <span
                                className="w-8 h-[2px] rounded-full"
                                style={{ backgroundColor: accent, boxShadow: `0 0 10px color-mix(in srgb, ${accent} 50%, transparent)` }}
                            />
                            <span className="rounded-full bg-foreground/5 px-2.5 py-1 text-[9px] sm:text-[10px] md:text-xs font-mono font-bold text-foreground/85 border border-foreground/10 backdrop-blur-md uppercase tracking-wider">
                                {project.category}
                            </span>
                        </div>

                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3 tracking-tight">
                            {project.title}
                        </h3>
                        <p className="text-[9px] sm:text-[10px] md:text-xs font-mono text-foreground/50 mb-4 uppercase tracking-widest font-bold">
                            {project.subtitle}
                        </p>

                        <div className="mb-5 h-px w-12 rounded-full" style={{ background: `linear-gradient(to right, ${accent}, transparent)` }} />

                        <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8 line-clamp-4 md:line-clamp-none font-sans font-light">
                            {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="mb-8 flex flex-wrap gap-2">
                            {project.techStack.map(tech => (
                                <span key={tech} className="rounded-full bg-foreground/5 border border-foreground/10 px-3 py-1.5 text-[9px] sm:text-[10px] md:text-xs font-mono font-bold text-foreground/80 tracking-wider uppercase">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-4 mt-auto md:mt-0">
                            {project.liveLink && (
                                <Link href={project.liveLink} target="_blank" className="group/btn btn-metallic flex items-center gap-3 px-6 py-3.5 pointer-events-auto text-[9px] sm:text-[10px] md:text-xs">
                                    <span>Visit Live</span>
                                    <OpenNewWindow className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" width={16} height={16} />
                                </Link>
                            )}
                            {project.githubLink && (
                                <Link href={project.githubLink} target="_blank" className="flex items-center justify-center p-3 rounded-full bg-foreground/5 text-foreground border border-foreground/10 transition-all hover:bg-foreground/10 hover:scale-105 pointer-events-auto">
                                    <Github width={20} height={20} />
                                </Link>
                            )}
                            {project.apkLink && project.apkLink !== '#' && (
                                <Link href={project.apkLink} target="_blank" className="flex items-center justify-center p-3 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 transition-all hover:bg-emerald-500/20 hover:scale-105 pointer-events-auto">
                                    <Download width={20} height={20} />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right/Background Image - 55% Inset */}
                <div className="relative w-full h-1/2 md:h-full md:w-[55%] p-4 md:p-6 lg:p-8 z-0 flex items-center justify-center">
                    <motion.div
                        style={{ scale: imageScale, y: imageY }}
                        className="w-full h-full relative flex items-center justify-center pointer-events-none"
                    >
                        <div
                            className={`absolute ${project.mobileImage ? 'top-[8%] md:top-[12%] -right-[15%] md:-right-[5%] w-[110%] h-[75%] md:w-[100%] md:h-[70%]' : 'w-full h-[85%] max-h-[600px]'} rounded-xl border border-foreground/20 bg-background shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col pointer-events-auto transition-all duration-700 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] origin-center z-10 overflow-hidden group-hover:scale-[1.02]`}
                            style={project.mobileImage ? { transform: 'perspective(1200px) rotateY(-4deg) rotateX(2deg)' } : {}}
                        >
                            {/* Browser Chrome */}
                            <div className="h-8 md:h-10 w-full bg-foreground/5 border-b border-foreground/10 flex items-center px-4 gap-2 shrink-0 backdrop-blur-md relative z-20">
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80 shadow-sm" />
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80 shadow-sm" />
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80 shadow-sm" />
                                <div className="mx-auto h-4 w-1/3 rounded bg-foreground/10 hidden md:block" />
                            </div>

                            <div className="relative flex-1 bg-primary-bg overflow-hidden group/desktop">
                                <Image
                                    src={project.coverImage}
                                    alt={`${project.title} Desktop Interface`}
                                    fill
                                    className="object-cover object-top transition-transform duration-[1.5s] group-hover/desktop:scale-[1.03]"
                                    sizes="55vw"
                                />
                                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </div>

                        {/* Mobile Mockup */}
                        {project.mobileImage && (
                            <div
                                className="absolute bottom-[2%] md:bottom-[5%] left-[2%] md:left-[5%] w-[32%] md:w-[30%] lg:w-[26%] h-[60%] md:h-[65%] max-h-[500px] pointer-events-auto transition-all duration-700 group-hover:scale-[1.08] group-hover:-translate-y-4 origin-bottom-left z-20"
                                style={{ transform: 'perspective(1000px) rotateY(6deg) rotateX(2deg) rotateZ(-1deg)' }}
                            >
                                <div className="absolute top-12 md:top-16 -left-[2px] md:-left-[3px] w-[2px] md:w-[3px] h-6 md:h-8 bg-foreground/20 rounded-l-md z-10" />
                                <div className="absolute top-20 md:top-28 -left-[2px] md:-left-[3px] w-[2px] md:w-[3px] h-6 md:h-8 bg-foreground/20 rounded-l-md z-10" />
                                <div className="absolute top-16 md:top-24 -right-[2px] md:-right-[3px] w-[2px] md:w-[3px] h-10 md:h-12 bg-foreground/20 rounded-r-md z-10" />

                                <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2rem] border-[4px] md:border-[6px] border-foreground/20 bg-background shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
                                    <div className="relative w-full h-full bg-primary-bg overflow-hidden group/mobile">
                                        <Image
                                            src={project.mobileImage}
                                            alt={`${project.title} Mobile Interface`}
                                            fill
                                            className="object-cover transition-transform duration-[1.5s] group-hover/mobile:scale-[1.05]"
                                            sizes="25vw"
                                        />
                                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

const FinaleCard = ({
    i,
    progress,
    range
}: {
    i: number,
    progress: MotionValue<number>,
    range: number[]
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const scale = useTransform(progress, range, [1, 1]);

    return (
        <div ref={cardRef} className="h-screen w-full flex items-center justify-center sticky top-0">
            <motion.div
                style={{
                    scale,
                    top: `calc(10vh + ${i * 25}px)`
                }}
                className="card-metallic absolute w-[92vw] h-[80vh] md:w-[75vw] md:h-[75vh] flex flex-col items-center justify-center origin-top shadow-2xl text-center p-6 md:p-12 group transition-colors duration-500"
            >
                <div className="relative w-full h-full flex flex-col items-center justify-center rounded-2xl md:rounded-[2rem] overflow-hidden border border-foreground/5 bg-primary-bg/50 px-4">
                    <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,var(--gold-primary)_360deg)] blur-[100px]" />
                    </div>

                    <LayoutLeft className="mb-8 h-20 w-20 md:h-24 md:w-24 text-[var(--gold-primary)] relative z-10 opacity-80 transition-transform duration-700 group-hover:scale-110" />

                    <h3 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground relative z-10 tracking-tight">
                        Explore the <span className="text-[var(--gold-primary)] italic">Archives</span>
                    </h3>

                    <p className="mb-10 md:mb-12 max-w-lg text-sm sm:text-base text-text-secondary relative z-10 font-sans leading-relaxed">
                        Dive deeper into 20+ more full-stack projects, experimental UI designs, and open‑source contributions.
                    </p>

                    <Link href="/projects" className="relative z-10 group/btn btn-metallic flex items-center gap-3 px-8 py-4 pointer-events-auto text-[9px] sm:text-[10px] md:text-xs">
                        <span>View All Projects</span>
                        <ArrowRight className="transition-transform group-hover/btn:translate-x-1" width={16} height={16} />
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default Projects;