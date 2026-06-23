'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavArrowRight, NavArrowLeft, OpenNewWindow } from 'iconoir-react';
import { useGlobalData } from '@/context/GlobalContext';

const Certifications = () => {
    const { certifications } = useGlobalData();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const totalPages = Math.ceil(certifications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCertificates = certifications.slice(startIndex, startIndex + itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    if (!mounted) return null;

    // Card animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 1, 0.5, 1] },
        }),
    };

    const pageTransition = {
        initial: { opacity: 0, filter: 'blur(10px)' },
        animate: { opacity: 1, filter: 'blur(0px)' },
        exit: { opacity: 0, filter: 'blur(10px)' },
        transition: { duration: 0.4 },
    };

    return (
        <section
            className="relative w-full overflow-hidden bg-transparent py-24"
            id="certifications"
        >
            {/* Ambient background orbs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-10 h-96 w-96 rounded-full bg-accent-highlight/5 blur-[120px]" />
                <div className="absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-accent-action/5 blur-[120px]" />
            </div>

            <div className="container relative mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-foreground/5 pb-8">
                    <div className="max-w-xl">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-3 flex items-center gap-2"
                        >
                            <span className="h-px w-8 bg-accent-action"></span>
                            <span className="font-mono text-sm font-semibold tracking-wider text-accent-action uppercase">
                                Verified Credentials
                            </span>
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl font-bold tracking-tight text-foreground md:text-5xl"
                        >
                            Certifications <span className="text-foreground/30">& Training</span>
                        </motion.h2>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex items-center gap-2 rounded-2xl border border-foreground/10 bg-foreground/5 p-1.5 backdrop-blur-md"
                        >
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                className="flex h-11 w-11 items-center justify-center rounded-xl bg-transparent text-foreground/50 transition-all hover:bg-foreground/10 hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                aria-label="Previous page"
                            >
                                <NavArrowLeft width={22} height={22} strokeWidth={2} />
                            </button>

                            <div className="flex px-3 items-center gap-2 font-mono text-sm font-medium tracking-widest">
                                <span className="text-accent-action">{String(currentPage).padStart(2, '0')}</span>
                                <span className="text-foreground/20">/</span>
                                <span className="text-foreground/50">{String(totalPages).padStart(2, '0')}</span>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="flex h-11 w-11 items-center justify-center rounded-xl bg-transparent text-foreground/50 transition-all hover:bg-foreground/10 hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                aria-label="Next page"
                            >
                                <NavArrowRight width={22} height={22} strokeWidth={2} />
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Grid */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={pageTransition.initial}
                            animate={pageTransition.animate}
                            exit={pageTransition.exit}
                            transition={pageTransition.transition}
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {currentCertificates.map((cert, index) => (
                                <motion.a
                                    key={`${cert.title}-${index}`}
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    custom={index}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{ y: -6, scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative flex flex-col h-full rounded-[2rem] border border-foreground/10 bg-background/40 p-7 overflow-hidden backdrop-blur-xl transition-all duration-500 hover:border-accent-action/30 hover:bg-foreground/5 hover:shadow-[0_0_40px_-15px_rgba(0,0,0,0.5)]"
                                >
                                    {/* Verified Seal Glow */}
                                    <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-accent-action/20 blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none" />

                                    <div className="relative z-10 flex flex-col h-full gap-6">
                                        {/* Header: Logo and Link Icon */}
                                        <div className="flex items-start justify-between">
                                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/10 p-3 shadow-inner ring-1 ring-foreground/10 transition-transform duration-500 group-hover:scale-110 group-hover:ring-accent-action/30">
                                                <img
                                                    src={cert.logo}
                                                    alt={cert.issuer}
                                                    className="h-full w-full object-contain drop-shadow-md transition-all duration-500 group-hover:brightness-125"
                                                />
                                            </div>
                                            
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-foreground/40 backdrop-blur-sm transition-all duration-500 group-hover:bg-accent-action/20 group-hover:text-accent-action group-hover:-translate-y-1 group-hover:translate-x-1">
                                                <OpenNewWindow width={18} height={18} strokeWidth={2.5} />
                                            </div>
                                        </div>

                                        {/* Content: Title, Issuer, Date */}
                                        <div className="space-y-3 flex-grow">
                                            <h3 className="text-xl font-bold leading-tight text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
                                                {cert.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm font-medium text-foreground/50">
                                                <span className="text-accent-action">{cert.issuer}</span>
                                                {cert.date && <span className="h-1 w-1 rounded-full bg-foreground/20" />}
                                                {cert.date && <span>{cert.date}</span>}
                                            </div>
                                        </div>

                                        {/* Skills Pills */}
                                        {cert.skills && cert.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {cert.skills.slice(0, 3).map((skill, sIdx) => (
                                                    <span 
                                                        key={sIdx} 
                                                        className="rounded-lg border border-foreground/10 bg-foreground/5 px-2.5 py-1 text-xs font-medium text-foreground/60 transition-all duration-300 group-hover:border-accent-action/30 group-hover:bg-accent-action/10 group-hover:text-accent-action"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                {cert.skills.length > 3 && (
                                                    <span className="rounded-lg border border-foreground/10 bg-foreground/5 px-2.5 py-1 text-xs font-medium text-foreground/50 transition-colors duration-300 group-hover:border-foreground/20 group-hover:text-foreground/70">
                                                        +{cert.skills.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Credential ID Terminal Panel */}
                                        {cert.credential && (
                                            <div className="mt-2 w-full rounded-xl bg-black/60 px-3.5 py-2.5 border border-foreground/5 shadow-inner transition-colors duration-500 group-hover:border-accent-action/20">
                                                <p className="font-mono text-[11px] sm:text-xs text-foreground/40 truncate transition-colors duration-500 group-hover:text-foreground/70">
                                                    {cert.credential}
                                                </p>
                                            </div>
                                        )}
                                        
                                        {/* Animated Bottom Line */}
                                        <div className="absolute inset-x-8 bottom-0 h-0.5 scale-x-0 rounded-full bg-gradient-to-r from-transparent via-accent-action to-transparent opacity-50 transition-transform duration-500 group-hover:scale-x-100" />
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Empty state (if no certifications) */}
                {certifications.length === 0 && (
                    <div className="py-24 text-center text-foreground/30 font-mono">
                        System.out.println("No certifications to display");
                    </div>
                )}
            </div>
        </section>
    );
};

export default Certifications;