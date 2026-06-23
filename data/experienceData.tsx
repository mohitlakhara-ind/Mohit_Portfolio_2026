
import React from 'react';
import { Calendar, Star as Award, Code, Globe, Flash as Zap, Suitcase as Briefcase } from 'iconoir-react';

export interface TimelineItem {
    id: number;
    date: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    borderColor: string;
    bgColor: string;
    details: { label: string; value: string }[];
}

export const timelineData: TimelineItem[] = [
    {
        id: 1,
        date: '2021 - 2024',
        title: 'BCA Graduate',
        subtitle: 'Lachoo Memorial College',
        description: 'Built a strong foundation in software engineering, algorithms, and system design. My academic journey fueled a deep passion for solving complex problems with code.',
        icon: <Code width={16} height={16} />,
        color: 'text-accent-action',
        borderColor: 'border-accent-action',
        bgColor: 'bg-accent-action',
        details: [
            { label: 'Degree', value: 'BCA' },
            { label: 'Focus', value: 'Software Engineering' }
        ]
    },
    {
        id: 2,
        date: 'Oct 2024',
        title: 'Frontend Developer Intern',
        subtitle: 'TheWebsite Makers',
        description: 'Gained hands-on experience in building responsive, user-centric web interfaces. Collaborated with senior developers to implement pixel-perfect designs using React and Tailwind CSS.',
        icon: <Globe width={16} height={16} />,
        color: 'text-accent-highlight',
        borderColor: 'border-accent-highlight',
        bgColor: 'bg-accent-highlight',
        details: [
            { label: 'Key Tech', value: 'React, Tailwind' },
            { label: 'Role', value: 'Frontend Intern' }
        ]
    },
    {
        id: 3,
        date: 'Late 2024',
        title: 'Full Stack Developer',
        subtitle: 'Fudode',
        description: 'Architected scalable full-stack applications over an impactful 4-month period. Responsible for the entire development lifecycle, from database design to frontend implementation and deployment.',
        icon: <Zap width={16} height={16} />,
        color: 'text-accent-highlight',
        borderColor: 'border-accent-highlight',
        bgColor: 'bg-accent-highlight',
        details: [
            { label: 'Role', value: 'Full Stack Dev' },
            { label: 'Duration', value: '4 Months' }
        ]
    },
    {
        id: 4,
        date: 'Current',
        title: 'Freelance Developer & MCA',
        subtitle: 'JECRC University & Various Clients',
        description: 'Currently pursuing an MCA in Cloud Computing at JECRC University, Jaipur. Simultaneously delivering high-impact freelance projects across web platforms, specializing in scalable product architecture.',
        icon: <Briefcase width={16} height={16} />,
        color: 'text-accent-action',
        borderColor: 'border-accent-action',
        bgColor: 'bg-accent-action',
        details: [
            { label: 'Education', value: 'MCA Cloud Computing' },
            { label: 'Role', value: 'Freelance Developer' }
        ]
    }
];
