import React from 'react';
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaNetworkWired, FaGitAlt, FaGithub, FaDocker, FaPython, FaJava, FaCogs, FaServer, FaCode, FaKey, FaWifi, FaLinux, FaHeart, FaRocket
} from 'react-icons/fa';
import { SiBootstrap, SiVite, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiFirebase, SiFigma, SiTensorflow, SiPostman, SiOpenai } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import Image from 'next/image';

export interface Skill {
    name: string;
    icon: React.ReactNode;
    level: number;
    angle: number;
    radius: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
}

export interface SkillCategory {
    name: string;
    color: string;
    positions: {
        mobile: { centerX: number; centerY: number };
        tablet: { centerX: number; centerY: number };
        desktop: { centerX: number; centerY: number };
    };
    skills: Skill[];
}


export const skillCategories: SkillCategory[] = [
    {
        name: "Frontend",
        color: "var(--accent-highlight, #00ffff)",
        positions: {
            mobile: { centerX: 28, centerY: 20 },
            tablet: { centerX: 25, centerY: 25 },
            desktop: { centerX: 25, centerY: 20 }
        },
        skills: [
            { name: "React", icon: <FaReact className="text-accent-highlight" />, level: 95, angle: 0, radius: { mobile: 17, tablet: 19, desktop: 15 } },
            { name: "Next.js", icon: <SiNextdotjs className="text-foreground" />, level: 90, angle: 45, radius: { mobile: 15, tablet: 16, desktop: 17 } },
            { name: "JavaScript", icon: <FaJs className="text-accent-action" />, level: 95, angle: 90, radius: { mobile: 19, tablet: 21, desktop: 23 } },
            { name: "Tailwind", icon: <SiTailwindcss className="text-accent-highlight" />, level: 90, angle: 135, radius: { mobile: 16, tablet: 18, desktop: 19 } },
            { name: "HTML5", icon: <FaHtml5 className="text-foreground" />, level: 95, angle: 180, radius: { mobile: 18, tablet: 20, desktop: 21 } },
            { name: "CSS3", icon: <FaCss3Alt className="text-accent-action" />, level: 90, angle: 225, radius: { mobile: 15, tablet: 17, desktop: 18 } },
            { name: "Bootstrap", icon: <SiBootstrap className="text-accent-highlight" />, level: 85, angle: 270, radius: { mobile: 14, tablet: 15, desktop: 16 } },
            { name: "Vite", icon: <SiVite className="text-accent-action" />, level: 80, angle: 315, radius: { mobile: 13, tablet: 14, desktop: 15 } },
        ]
    },
    {
        name: "Backend",
        color: "var(--accent-action, #a855f7)",
        positions: {
            mobile: { centerX: 75, centerY: 20 },
            tablet: { centerX: 75, centerY: 25 },
            desktop: { centerX: 65, centerY: 20 }
        },
        skills: [
            { name: "Node.js", icon: <FaNodeJs className="text-accent-action" />, level: 90, angle: 0, radius: { mobile: 18, tablet: 20, desktop: 21 } },
            { name: "Express", icon: <FaServer className="text-foreground" />, level: 85, angle: 45, radius: { mobile: 15, tablet: 17, desktop: 18 } },
            { name: "MongoDB", icon: <SiMongodb className="text-accent-highlight" />, level: 85, angle: 90, radius: { mobile: 16, tablet: 18, desktop: 19 } },
            { name: "PostgreSQL", icon: <SiPostgresql className="text-accent-action" />, level: 80, angle: 135, radius: { mobile: 15, tablet: 16, desktop: 17 } },
            { name: "MySQL", icon: <FaDatabase className="text-foreground" />, level: 80, angle: 180, radius: { mobile: 14, tablet: 15, desktop: 16 } },
            { name: "REST APIs", icon: <FaNetworkWired className="text-accent-highlight" />, level: 90, angle: 225, radius: { mobile: 17, tablet: 19, desktop: 20 } },
            { name: "Auth", icon: <FaKey className="text-accent-action" />, level: 82, angle: 270, radius: { mobile: 13, tablet: 14, desktop: 15 } },
            { name: "WebSockets", icon: <FaWifi className="text-foreground" />, level: 75, angle: 315, radius: { mobile: 19, tablet: 21, desktop: 22 } },
        ]
    },
    {
        name: "Tools",
        color: "var(--foreground, #ffffff)",
        positions: {
            mobile: { centerX: 25, centerY: 80 },
            tablet: { centerX: 25, centerY: 75 },
            desktop: { centerX: 30, centerY: 70 }
        },
        skills: [
            { name: "Git", icon: <FaGitAlt className="text-accent-action" />, level: 90, angle: 0, radius: { mobile: 17, tablet: 19, desktop: 20 } },
            { name: "GitHub", icon: <FaGithub className="text-foreground" />, level: 90, angle: 33, radius: { mobile: 16, tablet: 18, desktop: 19 } },
            { name: "VS Code", icon: <VscVscode className="text-accent-highlight" />, level: 95, angle: 65, radius: { mobile: 18, tablet: 20, desktop: 21 } },
            { name: "Docker", icon: <FaDocker className="text-accent-action" />, level: 75, angle: 98, radius: { mobile: 14, tablet: 15, desktop: 16 } },
            { name: "Firebase", icon: <SiFirebase className="text-accent-highlight" />, level: 80, angle: 131, radius: { mobile: 15, tablet: 16, desktop: 17 } },
            { name: "Figma", icon: <SiFigma className="text-foreground" />, level: 80, angle: 164, radius: { mobile: 15, tablet: 17, desktop: 18 } },
            { name: "Linux", icon: <FaLinux className="text-accent-action" />, level: 72, angle: 196, radius: { mobile: 13, tablet: 14, desktop: 15 } },
            { name: "Postman", icon: <SiPostman className="text-accent-highlight" />, level: 88, angle: 229, radius: { mobile: 19, tablet: 21, desktop: 22 } },
            { name: "Cursor", icon: <Image src="https://res.cloudinary.com/dhjkbcdfm/image/upload/v1775661875/portfolio_assets/cursor.svg" alt="Cursor" width={20} height={20} className="w-5 h-5 dark:invert" />, level: 95, angle: 262, radius: { mobile: 16, tablet: 18, desktop: 19 } },
            { name: "Lovable", icon: <Image src="https://res.cloudinary.com/dhjkbcdfm/image/upload/v1775661877/portfolio_assets/lovable.svg" alt="Lovable" width={20} height={20} className="w-5 h-5" />, level: 90, angle: 295, radius: { mobile: 15, tablet: 17, desktop: 18 } },
            { name: "Antigravity", icon: <Image src="https://res.cloudinary.com/dhjkbcdfm/image/upload/v1775661880/portfolio_assets/Google_Antigravity.svg" alt="Antigravity" width={20} height={20} className="w-5 h-5" />, level: 92, angle: 327, radius: { mobile: 17, tablet: 19, desktop: 20 } },
        ]
    },
    {
        name: "Programming",
        color: "var(--accent-action, #a855f7)",
        positions: {
            mobile: { centerX: 75, centerY: 80 },
            tablet: { centerX: 75, centerY: 75 },
            desktop: { centerX: 75, centerY: 70 }
        },
        skills: [
            { name: "Python", icon: <FaPython className="text-accent-highlight" />, level: 85, angle: 0, radius: { mobile: 16, tablet: 18, desktop: 19 } },
            { name: "Java", icon: <FaJava className="text-accent-action" />, level: 80, angle: 60, radius: { mobile: 15, tablet: 16, desktop: 17 } },
            { name: "C/C++", icon: <FaCode className="text-foreground" />, level: 75, angle: 120, radius: { mobile: 14, tablet: 15, desktop: 16 } },
            { name: "DSA", icon: <FaCogs className="text-accent-highlight" />, level: 85, angle: 180, radius: { mobile: 15, tablet: 17, desktop: 18 } },
            { name: "AI/ML", icon: <SiTensorflow className="text-accent-action" />, level: 75, angle: 240, radius: { mobile: 13, tablet: 14, desktop: 15 } },
            { name: "OpenAI", icon: <SiOpenai className="text-foreground" />, level: 90, angle: 300, radius: { mobile: 17, tablet: 19, desktop: 20 } },
        ]
    }
];
