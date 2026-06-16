import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';


const img = import.meta.glob("../assets/*.webp", {
  eager: true,
  import: 'default'
});

const imgArray = Object.values(img) as string[];

const imagesRow1 = imgArray.slice(0, 6);

const imagesRow2 = imgArray.slice(7, 14);

const Row = ({ images, x }: { images: string[], x: MotionValue<number> }) => {
  // Triple the array for seamless scrolling
  const tripledImages = [...images, ...images, ...images];

  return (
    <motion.div
      className="marquee-row"
      style={{ x }}
    >
      {tripledImages.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Project preview ${idx}`}
          width="800"
          height="600"
          className="marquee-img shrink-0 pointer-events-none object-cover"
          loading="lazy"
        />
      ))}
    </motion.div>
  );
};

export const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollY } = useScroll();

  const offset = useTransform(scrollY, (y) => {
    if (!sectionRef.current || !windowHeight) return 0;
    const sectionTop = sectionRef.current.offsetTop;
    return (y - sectionTop + windowHeight) * 0.3;
  });

  const row1X = useTransform(offset, (v) => v - 1500); // adjusted offset for centering initial position
  const row2X = useTransform(offset, (v) => -(v - 500));

  return (
    <section ref={sectionRef} className="bg-dark marquee-wrapper overflow-hidden flex flex-col">
      <Row images={imagesRow1} x={row1X} />
      <Row images={imagesRow2} x={row2X} />
    </section>
  );
};
