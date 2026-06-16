import { useEffect, useRef, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import './App.css';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { TechStackSection } from './sections/TechStackSection';
import { ContactSection } from './sections/ContactSection';
import { SiteGradualBlur } from './components/SiteGradualBlur';
import { MagicCardEffects } from './components/MagicCardEffects';
import { LoadingScreen } from './components/LoadingScreen';
import { CursorEffects } from './components/CursorEffects';

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const [showLoader, setShowLoader] = useState(true);
  const [isLoaderExiting, setIsLoaderExiting] = useState(false);

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

  useEffect(() => {
    let exitTimer: number;
    let removeTimer: number;

    const finishLoading = () => {
      exitTimer = window.setTimeout(() => {
        setIsLoaderExiting(true);
        removeTimer = window.setTimeout(() => setShowLoader(false), 280);
      }, 300);
    };

    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading, { once: true });
    }

    return () => {
      window.removeEventListener('load', finishLoading);
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <main className="app-wrapper" ref={appRef} style={{ opacity: 0 }}>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <TechStackSection />
        <ContactSection />
        <MagicCardEffects />
        <SiteGradualBlur />
        <CursorEffects />
      </main>
      {showLoader && <LoadingScreen isExiting={isLoaderExiting} />}
    </ReactLenis>
  );
}

export default App;
