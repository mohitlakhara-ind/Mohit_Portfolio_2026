'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type LayerRefs = {
    sky: React.RefObject<HTMLDivElement | null>;
    window: React.RefObject<HTMLDivElement | null>;
    desk: React.RefObject<HTMLDivElement | null>;
    monitor: React.RefObject<HTMLDivElement | null>;
    tea: React.RefObject<HTMLDivElement | null>;
    text: React.RefObject<HTMLDivElement | null>;
    office: React.RefObject<HTMLDivElement | null>;
    portal: React.RefObject<HTMLDivElement | null>;
    workflow: React.RefObject<HTMLDivElement | null>;
    playground: React.RefObject<HTMLDivElement | null>;
    contact: React.RefObject<HTMLDivElement | null>;
};

export const useScrollScene = (
    sceneRef: React.RefObject<HTMLDivElement | null>,
    layers: LayerRefs
) => {
    useLayoutEffect(() => {
        if (!sceneRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sceneRef.current,
                    start: 'top top',
                    end: '+=1500%', // Extended scroll distance for Phase 6
                    scrub: 1,
                    pin: true,
                },
            });

            const sky = layers.sky.current;
            const window = layers.window.current;
            const desk = layers.desk.current;
            const monitor = layers.monitor.current;
            const tea = layers.tea.current;
            const text = layers.text.current;
            const office = layers.office.current;
            const portal = layers.portal.current;
            const workflow = layers.workflow.current;
            const playground = layers.playground.current;
            const contact = layers.contact.current;

            // === TIMELINE ROADMAP ===
            // 0%   - 20%:  Midnight Intro
            // 20%  - 35%:  Transition to Office
            // 35%  - 50%:  Office Experience
            // 50%  - 60%:  Monitor Glitch / Portal Build up
            // 60%  - 70%:  Portal Explosion & Expansion
            // 70%  - 90%:  Projects Orbiting
            // 90%  - 92%:  Portal Clear
            // 92%  - 120%: Workflow Ritual
            // 120% - 135%: Code Playground
            // 135% - 140%: Playground Minimize
            // 140% - 160%: Contact Interface (Dawn)

            // --- PHASE 1: MIDNIGHT IMMERSION (0% - 35%) ---
            // 0% -> 15%: Slight Push-in
            tl.to([sky, window, desk], { scale: 1.1, duration: 0.15, ease: 'power1.inOut' }, 0);

            // 15% -> 30%: Parallax
            if (window) tl.to(window, { y: 50, duration: 0.15 }, 0);
            if (desk) tl.to(desk, { y: -30, duration: 0.15 }, 0);

            // Text Fade In
            if (text) {
                const title = text.querySelector('h1');
                const sub = text.querySelector('p');
                if (title && sub) {
                    tl.to(title, { opacity: 1, y: 0, duration: 0.1 }, 0.05);
                    tl.to(sub, { opacity: 1, y: 0, duration: 0.1 }, 0.1);
                }
                tl.to(text, { opacity: 0, y: -20, duration: 0.1 }, 0.25);
            }

            if (monitor) {
                tl.to(monitor, { boxShadow: '0 0 80px rgba(6,182,212,0.4)', scale: 1.02, duration: 0.1 }, 0.1);
            }

            // --- PHASE 2: OFFICE EXPERIENCE (35% - 50%) ---
            if (sky) tl.to(sky, { filter: 'brightness(0.2) blur(2px)', scale: 1.2, duration: 0.1 }, 0.25);
            if (desk) tl.to(desk, { y: 0, scale: 1, filter: 'brightness(1.2)', duration: 0.1 }, 0.3);
            if (tea) tl.to(tea, { opacity: 0, scale: 0.5, duration: 0.1 }, 0.25);

            if (office) {
                gsap.set(office, { opacity: 0, pointerEvents: 'none' });
                tl.to(office, { opacity: 1, pointerEvents: 'auto', duration: 0.05 }, 0.35);

                const cards = office.querySelectorAll('.experience-card');
                const texts = office.querySelectorAll('.experience-text');
                const floaters = office.querySelectorAll('.experience-floater');

                tl.fromTo(texts, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1, stagger: 0.02 }, 0.37);
                tl.fromTo(cards, { opacity: 0, y: 100, rotation: 10, scale: 0.8 }, { opacity: 1, y: 0, rotation: 0, scale: 1, duration: 0.1, stagger: 0.03 }, 0.38);
                tl.to(floaters, { opacity: 1, duration: 0.1 }, 0.35);

                // Hold Office for a bit... then Hide
                tl.to(office, { opacity: 0, pointerEvents: 'none', scale: 1.1, filter: 'blur(5px)', duration: 0.1 }, 0.55);
            }

            // --- PHASE 3: PROJECT PORTAL (55% - 90%) ---
            if (portal) {
                // The portal ref IS the container
                const portalContainer = portal;
                const portalGlow = portal.querySelector('.portal-glow');
                const projectItems = portal.querySelectorAll('.project-item-container');

                if (monitor) {
                    tl.to(monitor, { x: 5, filter: 'hue-rotate(90deg) contrast(1.5)', duration: 0.02, yoyo: true, repeat: 5 }, 0.52);
                    tl.to(monitor, { scale: 5, opacity: 0, filter: 'brightness(10) blur(20px)', duration: 0.1, ease: 'power4.in' }, 0.58);
                }

                if (portalContainer) tl.to(portalContainer, { opacity: 1, duration: 0.01 }, 0.59);
                if (portalGlow) tl.to(portalGlow, { width: '200vw', height: '200vh', opacity: 0.8, duration: 0.15, ease: 'expo.out' }, 0.6);

                if (projectItems.length > 0) {
                    const positions = [
                        { x: -350, y: -50, z: 100, rotate: -5 },
                        { x: 0, y: 50, z: 200, rotate: 0 },
                        { x: 350, y: -50, z: 100, rotate: 5 },
                    ];
                    projectItems.forEach((item, i) => {
                        const pos = positions[i % positions.length];
                        tl.fromTo(item,
                            { x: 0, y: 0, scale: 0, opacity: 0, rotation: 0 },
                            { x: pos.x, y: pos.y, scale: 1, opacity: 1, rotation: pos.rotate, duration: 0.2, ease: 'back.out(1.0)' },
                            0.65 + (i * 0.05)
                        );
                        tl.to(item, { y: `+=${30 + (i * 10)}`, rotation: `+=${2 + i}`, duration: 0.25, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0.75);
                    });
                }

                // --- PHASE 4 TRANSITION: CLEAR PORTAL (90% - 92%) ---
                // Fly items away
                tl.to(projectItems, { y: -800, opacity: 0, duration: 0.1, ease: 'power2.in' }, 0.88);
                // Reduce glow
                if (portalGlow) tl.to(portalGlow, { opacity: 0, duration: 0.1 }, 0.88);
                // Reset Monitor (Hidden but clean)
                if (monitor) tl.set(monitor, { scale: 1, opacity: 0 }, 0.9);
            }

            // --- PHASE 4: WORKFLOW RITUAL (92% - 120%) ---
            if (workflow) {
                const notebook = workflow.querySelector('svg');
                // const pen = workflow.querySelector('.pen-element'); // Future use

                // 1. Reveal Notebook
                tl.to(workflow, { opacity: 1, duration: 0.05 }, 0.9);
                tl.from(workflow, { y: 100, duration: 0.1, ease: 'out' }, 0.9);

                // 2. Drawing Sequence
                if (notebook) {
                    const groups = [
                        notebook.querySelector('.step-wireframe'),
                        notebook.querySelector('.step-system'),
                        notebook.querySelector('.step-deploy')
                    ];

                    // Step 1: Wireframe
                    if (groups[0]) {
                        tl.to(groups[0], { opacity: 1, duration: 0.05 }, 0.92);
                        tl.from(groups[0].querySelectorAll('path'), { strokeDasharray: '0 100', opacity: 0, stagger: 0.02, duration: 0.1 }, 0.92);
                    }

                    // Step 2: System
                    if (groups[1]) {
                        tl.to(groups[1], { opacity: 1, duration: 0.05 }, 0.98);
                        tl.from(groups[1].querySelectorAll('path, circle, rect'), { opacity: 0, scale: 0.9, stagger: 0.02, duration: 0.1 }, 0.98);
                    }

                    // Step 3: Deploy
                    if (groups[2]) {
                        tl.to(groups[2], { opacity: 1, duration: 0.05 }, 1.05);
                        tl.from(groups[2].querySelectorAll('path'), { y: 20, opacity: 0, stagger: 0.02, duration: 0.1, ease: 'back.out' }, 1.05);
                    }
                }

                // --- PHASE 5 TRANSITION: CLEANUP (120%) ---
                // Fade out notebook
                tl.to(workflow, { opacity: 0, x: -100, duration: 0.05 }, 1.20);
            }

            // --- PHASE 5: CODE PLAYGROUND (120% - 135%) ---
            if (playground) {
                // Initial State
                gsap.set(playground, { opacity: 0, scale: 0.8 });

                // 1. Activate Monitor / Zoom In effect
                if (monitor) {
                    tl.to(monitor, {
                        scale: 10, // Massive zoom into screen
                        opacity: 0,
                        duration: 0.1,
                        ease: 'power3.in'
                    }, 1.21);
                }

                // 2. Playground Appear
                tl.to(playground, {
                    opacity: 1,
                    scale: 1,
                    pointerEvents: 'auto',
                    duration: 0.1,
                    ease: 'expo.out'
                }, 1.22);

                // --- PHASE 6 TRANSITION: MINIMIZE PLAYGROUND (135%) ---
                tl.to(playground, {
                    scale: 0.9,
                    opacity: 0,
                    filter: 'blur(10px)',
                    duration: 0.1,
                    ease: 'power2.in'
                }, 1.35);
            }

            // --- PHASE 6: CONTACT INTERFACE (135% - 160%) ---
            if (contact) {
                gsap.set(contact, { opacity: 0, scale: 0.8, y: 50 });

                // Reveal
                tl.to(contact, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.1,
                    ease: 'back.out(1.2)'
                }, 1.38);

                // Optional: Dawn Effect on Sky
                if (sky) {
                    tl.to(sky, { filter: 'brightness(1.5) hue-rotate(-20deg)', duration: 0.2 }, 1.40);
                }
            }

        }, sceneRef);

        return () => ctx.revert();
    }, [sceneRef, layers]);
};
