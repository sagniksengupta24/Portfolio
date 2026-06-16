import { useEffect, useRef } from 'react';
import './SplashCursor.css';

interface SplashCursorProps {
  color?: string;
  maxSplats?: number;
  splatRadius?: number;
  dissipation?: number;
}

interface Splat {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  radius: number;
  hueShift: number;
}

const parseRgb = (color: string) => {
  const hex = color.replace('#', '');
  const value = parseInt(hex.length === 3 ? hex.split('').map((char) => char + char).join('') : hex, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
};

export const SplashCursor = ({
  color = '#9DE8D7',
  maxSplats = 90,
  splatRadius = 34,
  dissipation = 0.018
}: SplashCursorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splatsRef = useRef<Splat[]>([]);
  const lastPointerRef = useRef({ x: 0, y: 0, initialized: false });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const rgb = parseRgb(color);
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addSplat = (x: number, y: number, vx: number, vy: number, force = 1) => {
      splatsRef.current.push({
        x,
        y,
        vx,
        vy,
        age: 0,
        life: 0.74 + Math.random() * 0.28,
        radius: splatRadius * (0.6 + Math.min(force, 1.8) * 0.34),
        hueShift: Math.random() * 18 - 9
      });

      if (splatsRef.current.length > maxSplats) {
        splatsRef.current.splice(0, splatsRef.current.length - maxSplats);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const last = lastPointerRef.current;
      const x = event.clientX;
      const y = event.clientY;

      if (!last.initialized) {
        lastPointerRef.current = { x, y, initialized: true };
        addSplat(x, y, 0, 0, 0.75);
        return;
      }

      const dx = x - last.x;
      const dy = y - last.y;
      const speed = Math.min(Math.hypot(dx, dy) / 34, 2);

      addSplat(x, y, dx * 0.018, dy * 0.018, speed);
      lastPointerRef.current = { x, y, initialized: true };
    };

    const handlePointerDown = (event: PointerEvent) => {
      for (let i = 0; i < 7; i++) {
        const angle = (Math.PI * 2 * i) / 7;
        addSplat(
          event.clientX + Math.cos(angle) * 8,
          event.clientY + Math.sin(angle) * 8,
          Math.cos(angle) * 1.35,
          Math.sin(angle) * 1.35,
          1.8
        );
      }
    };

    let lastTime = performance.now();
    const draw = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';

      splatsRef.current = splatsRef.current.filter((splat) => {
        splat.age += dt;
        splat.x += splat.vx * 60 * dt;
        splat.y += splat.vy * 60 * dt;
        splat.vx *= 1 - dissipation;
        splat.vy *= 1 - dissipation;

        const progress = splat.age / splat.life;
        if (progress >= 1) return false;

        const alpha = Math.pow(1 - progress, 1.55);
        const radius = splat.radius * (1 + progress * 1.45);
        const gradient = context.createRadialGradient(splat.x, splat.y, 0, splat.x, splat.y, radius);

        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.18 * alpha})`);
        gradient.addColorStop(0.28, `rgba(${rgb.r}, ${Math.min(rgb.g + splat.hueShift, 255)}, ${rgb.b}, ${0.09 * alpha})`);
        gradient.addColorStop(0.72, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.026 * alpha})`);
        gradient.addColorStop(1, 'rgba(157, 232, 215, 0)');

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(splat.x, splat.y, radius, 0, Math.PI * 2);
        context.fill();

        return true;
      });

      context.globalCompositeOperation = 'source-over';
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [color, dissipation, maxSplats, splatRadius]);

  return <canvas ref={canvasRef} className="splash-cursor" aria-hidden="true" />;
};

export default SplashCursor;
