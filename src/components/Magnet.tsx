import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  maxOffset?: number;
  smoothing?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet = ({
  children,
  padding = 150,
  strength = 3,
  maxOffset = 80,
  smoothing = 0.12,
  activeTransition = "none",
  inactiveTransition = "transform 0.6s ease-out",
  className = ''
}: MagnetProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isActiveRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const clamp = (value: number) => Math.max(-maxOffset, Math.min(maxOffset, value));

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      
      const distance = Math.sqrt(distX * distX + distY * distY);
      
      if (distance < (width / 2 + padding)) {
        isActiveRef.current = true;
        targetRef.current = {
          x: clamp(distX / strength),
          y: clamp(distY / strength),
        };
      } else {
        isActiveRef.current = false;
        targetRef.current = { x: 0, y: 0 };
      }
    };

    const animate = () => {
      const node = ref.current;
      const current = positionRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * smoothing;
      current.y += (target.y - current.y) * smoothing;

      if (node) {
        node.style.transition = isActiveRef.current ? activeTransition : inactiveTransition;
        node.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeTransition, inactiveTransition, maxOffset, padding, smoothing, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: 'translate3d(0, 0, 0)',
        transition: inactiveTransition,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};
