'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
    Github,
    OpenNewWindow,
    ArrowRight,
    LayoutLeft,
    Download,
} from 'iconoir-react';

import { useGlobalData } from '@/context/GlobalContext';
import { featuredProjects } from '@/data/featuredProjectsData';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const projects = featuredProjects;
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    // --- GSAP Scroll & Parallax Setup ---
    useLayoutEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const progress = progressRef.current;
        if (!section || !container || !progress) return;

        const ctx = gsap.context(() => {
            // Horizontal scroll tween
            const scrollTween = gsap.to(container, {
                x: () => -(container.scrollWidth - window.innerWidth),
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${container.scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Update progress bar
                        const progressWidth = self.progress * 100;
                        gsap.set(progress, { width: `${progressWidth}%` });
                    },
                },
            });

            // Cards effects
            const cards = gsap.utils.toArray<HTMLElement>('.project-card');
            cards.forEach((card, i) => {
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: scrollTween,
                        start: 'center right',
                        end: 'center left',
                        horizontal: true,
                        scrub: true,
                        onUpdate: (self) => {
                            const p = self.progress;
                            const distFromCenter = Math.abs(p - 0.5);
                            let normalizedDist = 0;
                            if (distFromCenter > 0.1) {
                                normalizedDist = (distFromCenter - 0.1) / 0.4;
                            }
                            const scale = 1 - normalizedDist * 0.15;
                            const opacity = 1 - normalizedDist * 0.25;
                            const blur = normalizedDist * 4;

                            gsap.set(card, {
                                scale: scale,
                                opacity: opacity,
                                filter: `blur(${blur}px)`,
                                zIndex: distFromCenter < 0.1 ? 10 : 1,
                            });

                            // Parallax image
                            const image = card.querySelector('.parallax-image');
                            if (image) {
                                const parallaxX = (p - 0.5) * 60;
                                gsap.set(image, { xPercent: parallaxX });
                            }
                        },
                        onToggle: (self) => {
                            if (self.isActive) setActiveIndex(i);
                        },
                    },
                });
            });

            // Final "View All" card
            const finale = container.querySelector('.finale-card');
            if (finale) {
                gsap.from(finale, {
                    scrollTrigger: {
                        trigger: finale,
                        containerAnimation: scrollTween,
                        start: 'left right',
                        end: 'center right',
                        scrub: true,
                    },
                    rotation: -8,
                    opacity: 0,
                    scale: 0.85,
                    ease: 'back.out(1.7)',
                });
            }

            // Floating shapes continuous animation
            gsap.to('.floating-shape', {
                y: 'random(-60, 60)',
                x: 'random(-40, 40)',
                rotation: 'random(-30, 30)',
                duration: 'random(8, 16)',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: { amount: 4, from: 'random' },
            });

            // Additional floating icons
            gsap.to('.floating-icon', {
                y: 'random(-30, 30)',
                x: 'random(-20, 20)',
                rotation: 'random(-20, 20)',
                duration: 'random(6, 12)',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: { amount: 2, from: 'random' },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    // Update background shapes color on active index change
    useEffect(() => {
        const color = projects[activeIndex]?.accentColor || '#8A2BE2';
        gsap.to('.floating-shape', {
            backgroundColor: color,
            duration: 1.2,
            ease: 'power2.inOut',
        });
        gsap.to('.floating-icon', {
            stroke: color,
            fill: color,
            duration: 1.2,
            ease: 'power2.inOut',
        });
    }, [activeIndex, projects]);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="h-screen w-full relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90"
        >
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Soft gradient orbs */}
                <div className="floating-shape absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-20" />
                <div className="floating-shape absolute top-[20%] right-[-20%] w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[140px] opacity-15" />
                <div className="floating-shape absolute bottom-[-20%] left-[10%] w-[700px] h-[400px] rounded-full mix-blend-screen filter blur-[140px] opacity-20" />

                {/* Floating geometric icons */}
                <svg
                    className="floating-icon absolute top-[8%] left-[5%] w-12 h-12 opacity-30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <circle cx="12" cy="12" r="10" />
                </svg>
                <svg
                    className="floating-icon absolute bottom-[12%] right-[8%] w-16 h-16 opacity-20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                </svg>
                <svg
                    className="floating-icon absolute top-[15%] right-[10%] w-14 h-14 opacity-25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path d="M12 2L2 22h20L12 2z" />
                </svg>
                <svg
                    className="floating-icon absolute bottom-[20%] left-[5%] w-10 h-10 opacity-40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <svg
                    className="floating-icon absolute top-[30%] left-[2%] w-20 h-20 opacity-15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                >
                    <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
                </svg>
            </div>

            {/* Central ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] bg-accent-highlight/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Scroll Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-50">
                <div
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-accent-action to-accent-highlight rounded-r-full transition-all duration-300"
                    style={{ width: '0%' }}
                />
            </div>

            {/* Horizontal Container */}
            <div
                ref={containerRef}
                className="flex h-full items-center pl-10 md:pl-32 pr-20 gap-4 md:gap-16 w-max py-10"
            >
                {/* Intro Block */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="w-[80vw] md:w-[30vw] h-[60vh] flex-shrink-0 flex flex-col justify-center items-start z-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-bg/60 border border-border/30 text-xs font-mono mb-6 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-accent-action animate-pulse" />
                        FEATURED WORKS
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold font-display leading-[1.05] mb-4">
                        Selected <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-action to-accent-highlight">
                            Projects
                        </span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-sm leading-relaxed">
                        A curated collection of my most impactful work. Scroll to explore.
                    </p>
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                        className="mt-12 flex items-center gap-3 text-accent-highlight"
                    >
                        <ArrowRight width={28} height={28} />
                        <span className="text-sm font-mono tracking-widest uppercase">
                            Scroll
                        </span>
                    </motion.div>
                </motion.div>

                {/* Project Cards */}
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        className={`project-card relative w-[85vw] md:w-[55vw] h-[50vh] md:h-[70vh] flex-shrink-0 rounded-3xl overflow-hidden border border-border/30 bg-secondary-bg/40 backdrop-blur-sm shadow-2xl transition-shadow duration-500 group`}
                        style={{
                            boxShadow:
                                activeIndex === index
                                    ? `0 0 80px ${project.accentColor}30`
                                    : 'none',
                        }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        {/* Background Image with Parallax */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="parallax-image relative w-[120%] h-full left-[-10%]">
                                <Image
                                    src={project.coverImage}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 55vw"
                                    onError={() =>
                                        console.warn(
                                            `[Cover Image 404] "${project.title}" → ${project.coverImage}`
                                        )
                                    }
                                />
                                {/* Gradient overlay for better text visibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                            </div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-20">
                            {/* Floating Tags */}
                            <div className="absolute top-6 right-6 flex flex-wrap gap-2">
                                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-medium text-white">
                                    {project.category}
                                </span>
                                <span
                                    className="px-3 py-1 rounded-full backdrop-blur-md border border-white/20 text-xs font-medium text-white"
                                    style={{ backgroundColor: project.accentColor + 'CC' }}
                                >
                                    {project.mockupType}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-1 drop-shadow-lg">
                                    {project.title}
                                </h3>
                                <p className="text-lg text-white/80 font-mono mb-3 drop-shadow-md">
                                    {project.status} · {project.subtitle}
                                </p>
                                <p className="text-base text-white/70 max-w-lg mb-6 line-clamp-3 md:line-clamp-none">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-xs font-mono bg-white/10 px-3 py-1 rounded-full border border-white/20 text-white/90 backdrop-blur-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    {project.githubLink && (
                                        <motion.a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-colors text-white"
                                        >
                                            <Github width={20} height={20} />
                                        </motion.a>
                                    )}
                                    {project.liveLink && (
                                        <motion.a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 rounded-full bg-foreground text-background font-bold hover:bg-foreground/90 transition-colors flex items-center gap-2"
                                        >
                                            Visit Site <OpenNewWindow width={16} height={16} />
                                        </motion.a>
                                    )}
                                    {project.apkLink && (
                                        <motion.a
                                            href={project.apkLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 rounded-full bg-[#3DDC84] text-black font-bold hover:bg-[#3DDC84]/90 transition-colors flex items-center gap-2"
                                        >
                                            Download APK <Download width={16} height={16} />
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Final "View All" Card */}
                <div className="finale-card w-[85vw] md:w-[40vw] h-[50vh] md:h-[60vh] flex-shrink-0 relative group cursor-pointer overflow-hidden rounded-3xl border border-accent-highlight/30 bg-card/40 backdrop-blur-sm flex items-center justify-center">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 opacity-40">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,var(--color-accent-action)_360deg)] animate-[spin_6s_linear_infinite] blur-[120px]" />
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="relative z-10 text-center p-8 bg-background/40 backdrop-blur-xl rounded-2xl border border-border/20 shadow-xl"
                    >
                        <LayoutLeft className="w-16 h-16 mx-auto mb-4 text-accent-highlight" />
                        <h3 className="text-3xl font-bold text-foreground mb-2">
                            Explore the Archives
                        </h3>
                        <p className="text-text-secondary mb-6 max-w-xs mx-auto">
                            Dive deeper into 20+ more projects, experiments, and open‑source
                            contributions.
                        </p>
                        <Link href="/projects">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-full bg-accent-action text-background font-bold hover:bg-accent-action/80 transition-all flex items-center justify-center gap-2 mx-auto"
                            >
                                View All Projects <ArrowRight width={18} height={18} />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                {/* Spacer */}
                <div className="w-[10vw] flex-shrink-0" />
            </div>
        </section>
    );
};

export default Projects;