import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AnimatedText = ({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;

  let charIndex = 0;

  return (
    <p ref={containerRef} className={className} style={{ contentVisibility: 'auto' }}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="animated-word">
          {word.split('').map((char, charIdx) => {
            const start = charIndex / totalChars;
            const end = start + 1 / totalChars;

            charIndex++;

            const opacity = useTransform(
              scrollYProgress,
              [start, end],
              [0.15, 1]
            );

            return (
              <motion.span
                key={charIdx}
                className="animated-char"
                style={{ opacity }}
              >
                {char}
              </motion.span>
            );
          })}

          {wordIdx !== words.length - 1 && (
            <span className="word-space"> </span>
          )}
        </span>
      ))}
    </p>
  );
};