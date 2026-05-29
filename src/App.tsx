import { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import './App.css';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';

function App() {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple GSAP smooth entrance transition
    const ctx = gsap.context(() => {
      gsap.fromTo(appRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1.5, ease: "power2.inOut" }
      );
    }, appRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div className="app-wrapper" ref={appRef} style={{ opacity: 0 }}>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
      </div>
    </ReactLenis>
  );
}

export default App;
