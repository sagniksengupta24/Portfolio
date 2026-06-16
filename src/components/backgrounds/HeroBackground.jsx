/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useState, useMemo } from 'react';
import DotField from './DotField';
import Hyperspeed from './Hyperspeed';
import './HeroBackground.css';

const HeroBackground = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const tabletQuery = window.matchMedia('(max-width: 1024px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMedia = () => {
      setIsMobile(mobileQuery.matches);
      setIsTablet(tabletQuery.matches && !mobileQuery.matches);
      setReducedMotion(motionQuery.matches);
    };

    updateMedia();
    mobileQuery.addEventListener('change', updateMedia);
    tabletQuery.addEventListener('change', updateMedia);
    motionQuery.addEventListener('change', updateMedia);

    return () => {
      mobileQuery.removeEventListener('change', updateMedia);
      tabletQuery.removeEventListener('change', updateMedia);
      motionQuery.removeEventListener('change', updateMedia);
    };
  }, []);

  const hyperspeedOptions = useMemo(() => ({
    distortion: 'turbulentDistortion',
    speedUp: 1.4,
    opacity: 0.34,
    colors: {
      roadColor: 0x050607,
      islandColor: 0x090c0d,
      background: 0x050607,
      shoulderLines: 0x172326,
      brokenLines: 0x172326,
      leftCars: [0x9DE8D7, 0xDDE7EC, 0x6EAFA4],
      rightCars: [0x6EAFA4, 0xDDE7EC, 0x9DE8D7],
      sticks: 0x9DE8D7,
    }
  }), []);

  const showHyperspeed = !reducedMotion;

  return (
    <div 
      className="hero-react-bits-background"
    >
      {/* 1. Base Dark Gradient */}
      <div className="hero-react-bits-layer hero-react-bits-base" />

      {/* 2. Hyperspeed */}
      {showHyperspeed && (
        <div className="hero-react-bits-layer hero-react-bits-hyperspeed">
          <Hyperspeed effectOptions={hyperspeedOptions} />
        </div>
      )}

      {/* 3. DotField */}
      <div className="hero-react-bits-layer hero-react-bits-dots">
        <DotField
          dotRadius={2.4}
          dotSpacing={13}
          cursorRadius={340}
          bulgeStrength={56}
          glowRadius={108}
          sparkle={false}
          waveAmplitude={1.8}
          gradientFrom="rgba(157, 232, 215, 0.5)"
          gradientTo="rgba(243, 248, 251, 0.2)"
          glowColor="rgba(0, 0, 0, 0.1)"
        />
      </div>

      {/* 4. Vignette / Noise / Readability Overlay */}
      <div 
        className="hero-react-bits-layer hero-react-bits-vignette" 
      />
      
      {/* Fallback glow for mobile / reduced motion */}
      {(isMobile || reducedMotion) && (
        <div className="hero-react-bits-layer hero-react-bits-fallback">
          <div className="hero-react-bits-glow hero-react-bits-glow-primary" />
          <div className="hero-react-bits-glow hero-react-bits-glow-secondary" />
        </div>
      )}
    </div>
  );
};

export default HeroBackground;
