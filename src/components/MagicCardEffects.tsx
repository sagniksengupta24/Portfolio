import { useEffect } from 'react';
import { gsap } from 'gsap';
import './MagicCardEffects.css';

const CARD_SELECTORS = [
  '.about-text-wrapper',
  '.strength-card',
  '.project-card',
  '.project-meta-panel',
  '.service-item',
  '.tech-card',
  '.contact-panel'
].join(', ');

const GLOW_COLOR = '157, 232, 215';
const PARTICLE_COUNT = 12;
const SPOTLIGHT_RADIUS = 220;

const createParticle = (x: number, y: number) => {
  const particle = document.createElement('span');
  particle.className = 'magic-card-particle';
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.setProperty('--magic-particle-color', GLOW_COLOR);
  return particle;
};

export const MagicCardEffects = () => {
  useEffect(() => {
    const coarsePointer = window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)');
    if (coarsePointer.matches) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>(CARD_SELECTORS));
    const cleanups: Array<() => void> = [];
    const spotlight = document.createElement('span');

    spotlight.className = 'magic-bento-global-spotlight';
    document.body.appendChild(spotlight);

    cards.forEach((card) => {
      const particles: HTMLElement[] = [];
      const timeouts: number[] = [];
      const glowOverlay = document.createElement('span');
      const isTransformLocked = card.classList.contains('project-card');

      card.classList.add('magic-card-effect', 'magic-bento-card');
      glowOverlay.className = 'magic-card-glow-overlay';
      card.appendChild(glowOverlay);
      card.style.setProperty('--magic-glow-color', GLOW_COLOR);
      card.style.setProperty('--magic-glow-intensity', '0');
      card.style.setProperty('--magic-glow-radius', `${SPOTLIGHT_RADIUS}px`);

      const clearParticles = () => {
        timeouts.forEach(window.clearTimeout);
        timeouts.length = 0;

        particles.splice(0).forEach((particle) => {
          gsap.to(particle, {
            opacity: 0,
            scale: 0,
            duration: 0.24,
            ease: 'power2.out',
            onComplete: () => particle.remove()
          });
        });
      };

      const updateGlow = (event: PointerEvent, intensity = 1) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty('--magic-glow-x', `${x}%`);
        card.style.setProperty('--magic-glow-y', `${y}%`);
        card.style.setProperty('--magic-glow-intensity', intensity.toString());
      };

      const releaseGlow = () => {
        gsap.to(card, {
          '--magic-glow-intensity': 0,
          duration: 0.28,
          ease: 'power2.out'
        });

        if (!isTransformLocked) {
          gsap.to(card, {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.42,
            ease: 'power2.out'
          });
        }
      };

      const spawnParticles = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const originX = event.clientX - rect.left;
        const originY = event.clientY - rect.top;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const timeout = window.setTimeout(() => {
            const particle = createParticle(originX, originY);
            card.appendChild(particle);
            particles.push(particle);

            gsap.fromTo(
              particle,
              { opacity: 0, scale: 0 },
              { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(1.7)' }
            );

            gsap.to(particle, {
              x: (Math.random() - 0.5) * 92,
              y: (Math.random() - 0.5) * 92,
              opacity: 0,
              scale: 0.35,
              duration: 1.15 + Math.random() * 0.55,
              ease: 'power2.out',
              onComplete: () => {
                particle.remove();
                const index = particles.indexOf(particle);
                if (index >= 0) particles.splice(index, 1);
              }
            });
          }, i * 38);

          timeouts.push(timeout);
        }
      };

      const handlePointerEnter = (event: PointerEvent) => {
        updateGlow(event, 1);
        spawnParticles(event);
      };

      const handlePointerMove = (event: PointerEvent) => {
        updateGlow(event, 1);

        if (!isTransformLocked) {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -5;
          const rotateY = ((x - centerX) / centerX) * 5;
          const magnetX = (x - centerX) * 0.018;
          const magnetY = (y - centerY) * 0.018;

          gsap.to(card, {
            x: magnetX,
            y: magnetY,
            rotateX,
            rotateY,
            transformPerspective: 1000,
            duration: 0.22,
            ease: 'power2.out'
          });
        }
      };

      const handleClick = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const maxDistance = Math.max(
          Math.hypot(x, y),
          Math.hypot(x - rect.width, y),
          Math.hypot(x, y - rect.height),
          Math.hypot(x - rect.width, y - rect.height)
        );
        const ripple = document.createElement('span');

        ripple.className = 'magic-bento-ripple';
        ripple.style.width = `${maxDistance * 2}px`;
        ripple.style.height = `${maxDistance * 2}px`;
        ripple.style.left = `${x - maxDistance}px`;
        ripple.style.top = `${y - maxDistance}px`;
        ripple.style.setProperty('--magic-ripple-color', GLOW_COLOR);
        card.appendChild(ripple);

        gsap.fromTo(
          ripple,
          { opacity: 1, scale: 0 },
          {
            opacity: 0,
            scale: 1,
            duration: 0.75,
            ease: 'power2.out',
            onComplete: () => ripple.remove()
          }
        );
      };

      const handlePointerLeave = () => {
        releaseGlow();
        clearParticles();
      };

      card.addEventListener('pointerenter', handlePointerEnter);
      card.addEventListener('pointermove', handlePointerMove);
      card.addEventListener('pointerleave', handlePointerLeave);
      card.addEventListener('click', handleClick);

      cleanups.push(() => {
        card.removeEventListener('pointerenter', handlePointerEnter);
        card.removeEventListener('pointermove', handlePointerMove);
        card.removeEventListener('pointerleave', handlePointerLeave);
        card.removeEventListener('click', handleClick);
        card.classList.remove('magic-card-effect', 'magic-bento-card');
        glowOverlay.remove();
        card.style.removeProperty('--magic-glow-color');
        card.style.removeProperty('--magic-glow-x');
        card.style.removeProperty('--magic-glow-y');
        card.style.removeProperty('--magic-glow-intensity');
        card.style.removeProperty('--magic-glow-radius');
        clearParticles();
      });
    });

    const handleDocumentPointerMove = (event: PointerEvent) => {
      const { proximity, fadeDistance } = {
        proximity: SPOTLIGHT_RADIUS * 0.5,
        fadeDistance: SPOTLIGHT_RADIUS * 0.75
      };
      let minDistance = Infinity;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance =
          Math.hypot(event.clientX - centerX, event.clientY - centerY) - Math.max(rect.width, rect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        if (glowIntensity > 0) {
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--magic-glow-x', `${x}%`);
          card.style.setProperty('--magic-glow-y', `${y}%`);
          card.style.setProperty('--magic-glow-intensity', Math.max(glowIntensity, Number(card.style.getPropertyValue('--magic-glow-intensity') || 0)).toString());
        }
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.38
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.38
            : 0;

      gsap.to(spotlight, {
        left: event.clientX,
        top: event.clientY,
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.18 : 0.38,
        ease: 'power2.out'
      });
    };

    const handleDocumentPointerLeave = () => {
      gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
      cards.forEach((card) => card.style.setProperty('--magic-glow-intensity', '0'));
    };

    document.addEventListener('pointermove', handleDocumentPointerMove);
    document.addEventListener('pointerleave', handleDocumentPointerLeave);

    return () => {
      document.removeEventListener('pointermove', handleDocumentPointerMove);
      document.removeEventListener('pointerleave', handleDocumentPointerLeave);
      cleanups.forEach((cleanup) => cleanup());
      spotlight.remove();
    };
  }, []);

  return null;
};
