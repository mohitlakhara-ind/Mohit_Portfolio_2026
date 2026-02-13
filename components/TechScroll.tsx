'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaKey, FaWifi, FaNetworkWired, FaGitAlt, FaGithub, FaNpm, FaDocker, FaLinux, FaTools, FaCode, FaPython, FaJava, FaCogs, FaFireAlt, FaServer
} from 'react-icons/fa';
import { SiBootstrap, SiVite, SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiExpress, SiGooglecloud, SiCloudinary, SiFirebase, SiPostman, SiFigma, SiOpenai, SiTensorflow } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { HiColorSwatch } from 'react-icons/hi';
import { PiDevicesBold } from 'react-icons/pi';

// Comprehensive list of skills for the 3D Tunnel
const skills = [
    // Frontend
    { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
    { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
    { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-foreground" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: "Bootstrap", icon: <SiBootstrap className="text-[#7952B3]" /> },
    { name: "Vite", icon: <SiVite className="text-[#646CFF]" /> },

    // Backend
    { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
    { name: "Express.js", icon: <FaServer className="text-foreground" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
    { name: "MySQL", icon: <FaDatabase className="text-[#4479A1]" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
    { name: "Auth", icon: <FaKey className="text-[#FNB]" /> },
    { name: "WebSockets", icon: <FaWifi className="text-foreground" /> },
    { name: "REST APIs", icon: <FaNetworkWired className="text-foreground" /> },

    // Tools
    { name: "Git", icon: <FaGitAlt className="text-[#F05032]" /> },
    { name: "GitHub", icon: <FaGithub className="text-foreground" /> },
    { name: "NPM", icon: <FaNpm className="text-[#CB3837]" /> },
    { name: "Docker", icon: <FaDocker className="text-[#2496ED]" /> },
    { name: "Linux", icon: <FaLinux className="text-foreground" /> },
    { name: "Cloudinary", icon: <SiCloudinary className="text-[#3448C5]" /> },
    { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
    { name: "SEO", icon: <FaTools className="text-foreground" /> },
    { name: "VS Code", icon: <VscVscode className="text-[#007ACC]" /> },
    { name: "AI Tools", icon: <SiOpenai className="text-[#00A67E]" /> },
    { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
    { name: "Figma", icon: <SiFigma className="text-[#F24E1E]" /> },
    { name: "Coolors", icon: <HiColorSwatch className="text-[#0066FF]" /> },

    // Programming
    { name: "Python", icon: <FaPython className="text-[#3776AB]" /> },
    { name: "Java", icon: <FaJava className="text-[#007396]" /> },
    { name: "C / C++", icon: <FaCode className="text-foreground" /> },
    { name: "DSA", icon: <FaCode className="text-foreground" /> },
    { name: "System Design", icon: <FaCogs className="text-foreground" /> },
    { name: "Problem Solving", icon: <FaFireAlt className="text-[#FFA116]" /> },
    { name: "AI/ML Basics", icon: <SiTensorflow className="text-[#FF6F00]" /> },
];


const TechScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="h-[400vh] relative bg-background transition-colors duration-300">
            <div className="sticky top-0 h-screen overflow-hidden perspective-[1000px] flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-highlight/10 via-background to-background">

                {/* Background Grid - Top */}
                <motion.div
                    className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to bottom, transparent 0%, var(--color-accent-highlight) 100%)',
                        maskImage: 'linear-gradient(to bottom, transparent, var(--background))',
                        transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
                    }}
                />

                {/* Stars / Particles Background */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
                </div>


                {/* Title Overlay */}
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
                        scale: useTransform(scrollYProgress, [0, 0.1], [1, 1.2]),
                        y: useTransform(scrollYProgress, [0, 0.1], [0, -50])
                    }}
                    className="absolute z-50 text-center pointer-events-none w-full px-4 flex flex-col items-center justify-center h-full"
                >
                    <h2 className="text-xs md:text-sm font-bold text-accent-highlight tracking-[0.5em] uppercase mb-4 shadow-accent-highlight/50 drop-shadow-[0_0_10px_rgba(var(--color-accent-highlight),0.8)]">
                        SYSTEM CAPABILITIES
                    </h2>
                    <h3 className="text-5xl md:text-8xl font-black font-display text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground tracking-tighter">
                        TECH <br /> <span className="text-accent-action drop-shadow-[0_0_30px_rgba(var(--color-accent-action),0.6)]">WARP</span>
                    </h3>
                    <p className="mt-6 text-muted-foreground max-w-md mx-auto text-sm md:text-base">
                        Initiating sequence... Scroll to navigate the neural network of skills.
                    </p>
                </motion.div>

                {/* The Floor Grid */}
                <motion.div
                    className="absolute bottom-[-20%] w-[200%] h-[100%] bg-[linear-gradient(to_bottom,transparent_0%,var(--color-accent-action)_100%)] opacity-10 transform -translate-x-1/2 left-1/2"
                    style={{
                        rotateX: 75,
                        y: useTransform(scrollYProgress, [0, 1], [0, 200]),
                        maskImage: 'radial-gradient(circle, var(--background) 0%, transparent 70%)' // Use variable for mask
                    }}
                />

                {/* 3D Tunnel Items */}
                <div className="relative w-full h-full transform-style-3d flex items-center justify-center">
                    {skills.map((skill, index) => {
                        return (
                            <TunnelItem
                                key={index}
                                index={index}
                                total={skills.length}
                                scrollYProgress={scrollYProgress}
                                skill={skill}
                                isMobile={isMobile}
                            />
                        );
                    })}
                </div>

                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-80"></div>

            </div>
        </section>
    );
};

const TunnelItem = ({ index, total, scrollYProgress, skill, isMobile }: { index: number, total: number, scrollYProgress: MotionValue<number>, skill: { name: string, icon: React.ReactNode }, isMobile: boolean }) => {
    // Distribute items along the Z-axis (scroll progress)
    // Increased duration for better visibility
    const visibleDuration = 0.3;
    const totalScrollSpace = 1.0 - visibleDuration;
    const step = totalScrollSpace / (total - 1);

    const start = index * step;
    const end = start + visibleDuration;

    const safeStart = Math.min(start, 1.0 - visibleDuration);
    const safeEnd = Math.min(end, 1.0);

    // Z position: Moves from deep background to past camera
    // Started closer (-1000 instead of -2000) so they don't look like tiny dots for too long
    const z = useTransform(scrollYProgress, [safeStart, safeEnd], [-1000, 800]);

    // Opacity: smooth fade in/out
    // Fade in quickly, stay visible longer, fade out at the very end
    const opacity = useTransform(scrollYProgress,
        [safeStart, safeStart + 0.1, safeEnd - 0.1, safeEnd],
        [0, 1, 1, 0]
    );

    // Scale: Grow as it gets closer
    const scale = useTransform(scrollYProgress, [safeStart, safeEnd], [0.5, 1.5]);

    // Rotation: Add a slight spin as it approaches for dynamic feel
    const rotate = useTransform(scrollYProgress, [safeStart, safeEnd], [10, -10]);

    // Spiral calculation
    const radius = isMobile ? 120 : 400; // Slightly reduced radius for better center focus
    const rotations = 4; // Fewer rotations to make it less dizzying
    const angle = (index / total) * Math.PI * 2 * rotations;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * (isMobile ? radius * 1.3 : radius * 0.9);

    const jitterAmount = isMobile ? 10 : 20;
    const jitterX = Math.sin(index * 45.23) * jitterAmount;
    const jitterY = Math.cos(index * 98.12) * jitterAmount;

    return (
        <motion.div
            style={{
                z,
                opacity,
                scale,
                rotateZ: rotate,
                x: x + jitterX,
                y: y + jitterY,
                position: 'absolute'
            }}
            className="flex flex-col items-center justify-center gap-4 will-change-transform group"
        >
            <div className={`
                relative flex flex-col items-center gap-4 
                backdrop-blur-xl border border-border/50
                shadow-lg
                transition-all duration-300
                group-hover:border-accent-action/50 group-hover:shadow-[0_0_60px_rgba(var(--color-accent-action),0.4)]
                overflow-hidden
                ${isMobile ? 'p-4 rounded-xl min-w-[120px] bg-card/80' : 'p-6 rounded-2xl bg-card/60 min-w-[180px]'}
            `}>
                {/* Inner Glow Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-highlight/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className={`${isMobile ? 'text-3xl' : 'text-5xl'} mb-2 text-foreground drop-shadow-md transition-transform duration-300 group-hover:scale-110`}>
                    {skill.icon}
                </div>
                <span className={`
                    ${isMobile ? 'text-xs' : 'text-lg'} 
                    font-bold tracking-widest font-mono text-muted-foreground group-hover:text-foreground transition-colors duration-300
                    uppercase whitespace-nowrap
                `}>
                    {skill.name}
                </span>

                {/* Tech Decoration Lines */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-action/30 to-transparent opacity-50" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-action/30 to-transparent opacity-50" />
            </div>
        </motion.div>
    );
};


export default TechScroll;
