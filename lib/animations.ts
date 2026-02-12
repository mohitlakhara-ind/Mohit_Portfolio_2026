import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateCamera = (camera: any, position: [number, number, number], target: [number, number, number], duration: number = 2) => {
    // Placeholder animation function
    console.log('Animating camera to', position);
};
