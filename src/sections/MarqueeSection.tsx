import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const imagesRow1 = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif"
];

const imagesRow2 = [
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
];

const Row = ({ images, x }: { images: string[], x: any }) => {
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
          className="marquee-img shrink-0 pointer-events-none object-cover"
          loading="lazy"
        />
      ))}
    </motion.div>
  );
};

export const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
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
