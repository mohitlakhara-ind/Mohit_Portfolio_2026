import Hero from '@/components/Hero';
import ParticleNetwork from '@/components/ParticleNetwork';
import About from '@/components/About';
import TechScroll from '@/components/TechScroll';
import ResumePulse from '@/components/ResumePulse';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <main className="w-full bg-background min-h-screen relative font-sans text-foreground transition-colors duration-300">
      <Hero />
      <ParticleNetwork />
      <About />
      <TechScroll />
      <ResumePulse />
      <Projects />
    </main>
  );
}
