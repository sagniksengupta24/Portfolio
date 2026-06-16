import { useEffect, useState } from 'react';
import GradualBlur from './GradualBlur';

export const SiteGradualBlur = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const updateActiveState = () => {
      setIsActive(window.scrollY > window.innerHeight * 0.92);
    };

    updateActiveState();
    window.addEventListener('scroll', updateActiveState, { passive: true });
    window.addEventListener('resize', updateActiveState);

    return () => {
      window.removeEventListener('scroll', updateActiveState);
      window.removeEventListener('resize', updateActiveState);
    };
  }, []);

  const sharedProps = {
    target: 'page' as const,
    strength: 2.25,
    divCount: 9,
    curve: 'bezier' as const,
    exponential: true,
    opacity: 0.88,
    zIndex: 70,
    style: {
      opacity: isActive ? 1 : 0,
      transition: 'opacity 0.35s ease'
    }
  };

  return (
    <>
      <GradualBlur
        {...sharedProps}
        position="top"
        height="7.5rem"
        className="site-gradual-blur site-gradual-blur-top"
      />
    </>
  );
};
