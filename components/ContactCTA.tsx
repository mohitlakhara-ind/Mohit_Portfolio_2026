'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Instagram, Copy, Check, Codepen, Xmark, Mail } from 'iconoir-react';
import ContactForm from './ContactForm';

const ContactCTA = () => {
    const [showForm, setShowForm] = useState(false);
    const [copied, setCopied] = useState(false);
    const email = 'mohitlakhara78500@gmail.com';

    // Copy to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Social links
    const socials = [
        { icon: Github, label: 'GitHub', href: 'https://github.com/mohitlakhara-ind' },
        { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/mohitlakhara-ind' },
        { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/webdev_mohit' },
        { icon: Codepen, label: 'CodePen', href: 'https://codepen.io/mohitlakhara' },
    ];

    return (
        <section
            id="contact"
            className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-foreground flex items-center py-24"
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-action/10 blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-accent-highlight/10 blur-[100px]" />
            </div>

            <div className="container relative z-10 mx-auto max-w-6xl px-6">
                
                {/* Bento Grid */}
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 auto-rows-[200px] md:auto-rows-[280px]">
                    
                    {/* Tile 1: Hero (Spans 2x2 on desktop) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-background/40 p-8 backdrop-blur-md sm:col-span-2 md:col-span-2 md:row-span-2 shadow-xl hover:border-accent-action/30 transition-colors duration-500"
                    >
                        {/* Decorative abstract mesh inside hero */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-gradient-to-br from-accent-action/20 to-accent-highlight/20 blur-[60px] transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />
                        
                        <div>
                            <div className="mb-6 flex items-center gap-3">
                                <span className="h-px w-6 bg-accent-action"></span>
                                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-action">
                                    Next Steps
                                </p>
                            </div>
                            
                            <h2 className="text-4xl font-black leading-[1.1] tracking-tight md:text-6xl lg:text-[4rem]">
                                <span className="block text-foreground/90">Let's Build</span>
                                <span className="bg-gradient-to-r from-accent-action via-accent-highlight to-accent-action bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">
                                    Something Great
                                </span>
                            </h2>
                            <p className="mt-4 max-w-sm text-base text-foreground/50 font-light">
                                Ready to transform complex challenges into elegant digital solutions? Reach out and let's create something remarkable together.
                            </p>
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={() => setShowForm(true)}
                                className="group/btn relative inline-flex items-center gap-4 rounded-full bg-foreground px-8 py-4 text-base font-bold text-background transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_var(--accent-action)] hover:bg-accent-action"
                            >
                                <span>Start a Conversation</span>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/20 backdrop-blur-sm transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:bg-background/30">
                                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                                </div>
                            </button>
                        </div>
                    </motion.div>

                    {/* Tile 2: Email Card (Spans 2 cols, 1 row) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                        className="group relative flex flex-col justify-center overflow-hidden rounded-3xl border border-foreground/10 bg-background/40 p-8 backdrop-blur-md sm:col-span-2 md:col-span-2 md:row-span-1 shadow-xl hover:border-accent-action/30 transition-colors duration-500"
                    >
                        <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/40 mb-4">
                            Direct Email
                        </h3>
                        
                        <div className="relative flex w-full items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/5 p-4 transition-all duration-300 hover:border-accent-action/30 hover:bg-foreground/10">
                            <div className="flex items-center gap-4 overflow-hidden">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-action/10 text-accent-action transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent-action group-hover:text-white">
                                    <Mail className="h-5 w-5" strokeWidth={2} />
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-[10px] font-mono text-accent-action mb-1 hidden sm:block">mohitlakhara78500@gmail.com</span>
                                    <span className="font-sans text-sm sm:text-lg font-medium text-foreground/90 truncate">mohitlakhara78500<br className="sm:hidden"/>@gmail.com</span>
                                </div>
                            </div>
                            
                            <button
                                onClick={copyToClipboard}
                                className="ml-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background/50 text-foreground/60 backdrop-blur-sm transition-all duration-300 hover:bg-accent-action hover:text-white hover:shadow-lg"
                                aria-label="Copy email"
                            >
                                {copied ? (
                                    <Check className="h-5 w-5 text-green-400" strokeWidth={2.5} />
                                ) : (
                                    <Copy className="h-5 w-5" strokeWidth={2} />
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Tile 3: Socials (Spans 1x1) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-background/40 p-6 backdrop-blur-md col-span-1 md:col-span-1 md:row-span-1 shadow-xl hover:border-accent-action/30 transition-colors duration-500"
                    >
                        <h3 className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-foreground/40">
                            Digital Footprint
                        </h3>
                        
                        <div className="grid grid-cols-2 gap-3 h-full mt-4">
                            {socials.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border border-foreground/10 bg-foreground/5 text-foreground/50 transition-all hover:scale-105 hover:border-accent-action/50 hover:bg-accent-action/10 hover:text-accent-action hover:shadow-[0_0_15px_-5px_var(--accent-action)]"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-6 w-6" strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Tile 4: Status / Aesthetic (Spans 1x1) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                        className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-foreground/10 bg-background/40 p-6 backdrop-blur-md col-span-1 md:col-span-1 md:row-span-1 shadow-xl hover:border-accent-action/30 transition-colors duration-500"
                    >
                        {/* Radar Animation Rings */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                            <div className="absolute h-[150%] w-[150%] rounded-full border border-accent-action/20 border-dashed animate-[spin_20s_linear_infinite]" />
                            <div className="absolute h-[100%] w-[100%] rounded-full border border-accent-highlight/20 border-dashed animate-[spin_15s_linear_infinite_reverse]" />
                            <div className="absolute h-[50%] w-[50%] rounded-full border border-foreground/10 border-solid" />
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-30"></span>
                                <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]"></span>
                            </div>
                            <h3 className="text-sm font-bold text-foreground/90 uppercase tracking-widest">
                                Status
                            </h3>
                            <p className="mt-1 font-mono text-[10px] text-green-400">
                                Available for work
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Modal Override */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-background/60"
                        onClick={() => setShowForm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-foreground/10 bg-background/90 p-8 shadow-2xl backdrop-blur-3xl md:p-12 m-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight">Secure Terminal</h2>
                                    <p className="mt-1 font-mono text-xs text-accent-action">Connection established.</p>
                                </div>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-foreground/50 transition-colors hover:bg-red-500/20 hover:text-red-500"
                                    aria-label="Close form"
                                >
                                    <Xmark className="h-6 w-6" strokeWidth={2} />
                                </button>
                            </div>
                            
                            <ContactForm />
                            
                            {/* Modal subtle glow */}
                            <div className="absolute -bottom-32 -right-32 -z-10 h-64 w-64 rounded-full bg-accent-action/20 blur-[80px]" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </section>
    );
};

export default ContactCTA;