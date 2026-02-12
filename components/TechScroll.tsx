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
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="h-[500vh] relative bg-background transition-colors duration-300">
            <div className="sticky top-0 h-screen overflow-hiddenPerspective flex items-center justify-center perspective-[500px]">

                {/* Title Overlay */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                    className="absolute z-50 text-center pointer-events-none"
                >
                    <h2 className="text-sm font-bold text-accent-highlight tracking-[0.2em] uppercase mb-4">SKILLS GALLERY</h2>
                    <h3 className="text-4xl md:text-6xl font-black font-display text-foreground">
                        The Tech <br /> <span className="text-accent-action"> Arsenal</span>
                    </h3>
                </motion.div>

                {/* The Grid/Road Floor */}
                <motion.div
                    className="absolute bottom-0 w-full h-[150%] bg-[linear-gradient(to_bottom,transparent_0%,var(--color-accent-action)_100%)] opacity-20 transform origin-bottom"
                    style={{
                        rotateX: 60,
                        scaleY: useTransform(scrollYProgress, [0, 1], [1, 10])
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
                            />
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

const TunnelItem = ({ index, total, scrollYProgress, skill }: { index: number, total: number, scrollYProgress: MotionValue<number>, skill: { name: string, icon: React.ReactNode } }) => {
    // Distribute items along the Z-axis (scroll progress)
    // We want them to start far away and move towards camera (z=0) and then behind (z>0)

    // Each item has a "trigger" range in the scroll
    // To avoid offsets > 1, we ensure the last item finishes exactly at 1.0
    const visibleDuration = 0.2; // How long an item is visible on scroll (reduced for denser list)
    const totalScrollSpace = 1.0 - visibleDuration;
    const step = totalScrollSpace / (total - 1);

    // Calculate start and end for this item
    const start = index * step;
    const end = start + visibleDuration;

    // Safety check: ensure floating point issues don't push us over 1.0
    const safeStart = Math.min(start, 1.0 - visibleDuration);
    const safeEnd = Math.min(end, 1.0);

    // Z position: Moves from -1000 (far) to 500 (behind camera)
    const z = useTransform(scrollYProgress, [safeStart, safeEnd], [-1500, 500]);

    // Opacity: Fade in from distance, fade out when too close
    // We explicitly clamp the range to be within [0, 1]
    const opacity = useTransform(scrollYProgress, [safeStart, safeStart + 0.05, safeEnd - 0.05, safeEnd], [0, 1, 1, 0]);

    // Scale: Grow as it gets closer
    const scale = useTransform(scrollYProgress, [safeStart, safeEnd], [0.5, 1.5]);

    // X/Y Offset: Spiral distribution for a better tunnel effect
    const radius = 350; // Distance from center
    const rotations = 6; // More turns for more items
    const angle = (index / total) * Math.PI * 2 * rotations;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.8; // Elliptical for widescreen feel

    // Add slight random jitter so it's not a perfect line
    const jitterX = Math.sin(index * 123.45) * 30;
    const jitterY = Math.cos(index * 678.90) * 30;

    const xOffset = x + jitterX;
    const yOffset = y + jitterY;

    return (
        <motion.div
            style={{
                z,
                opacity,
                scale,
                x: xOffset,
                y: yOffset,
                position: 'absolute'
            }}
            className="flex flex-col items-center justify-center gap-4 will-change-transform"
        >
            <div className="p-6 rounded-2xl bg-secondary-bg/80 backdrop-blur-md border border-border shadow-[0_0_30px_rgba(0,0,0,0.2)] flex flex-col items-center gap-3 min-w-[160px]">
                <div className="text-5xl mb-1">
                    {skill.icon}
                </div>
                <span className="text-lg font-bold font-mono text-foreground whitespace-nowrap">{skill.name}</span>
            </div>
        </motion.div>
    );
};

export default TechScroll;
