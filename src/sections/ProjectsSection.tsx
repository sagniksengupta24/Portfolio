import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { VariableHeading } from '../components/VariableHeading';
import pic1 from '../assets/pic1.webp';
import pic2 from '../assets/pic2.webp';
import pic3 from '../assets/pic3.webp';
import pic4 from '../assets/pic4.webp';
import pic5 from '../assets/pic5.webp';
import pic6 from '../assets/pic6.webp';
import pic7 from '../assets/pic7.webp';
import pic8 from '../assets/pic8.webp';
import pic9 from '../assets/pic9.webp';
import pic10 from '../assets/pic10.webp';
import pic11 from '../assets/pic11.webp';
import pic12 from '../assets/pic12.png';
import pic13 from '../assets/pic13.png';
import pic14 from '../assets/pic14.png';
import pic15 from '../assets/pic15.png';
import pic16 from '../assets/pic16.png';
import pic17 from '../assets/pic17.png';

const projects = [
  {
    id: '01',
    category: 'Design Agency',
    name: 'UV Sphere',
    description: 'A premium agency website shaped around bold visual identity, polished motion, and high-end creative positioning.',
    role: 'Creative direction / Frontend / Motion polish',
    stack: ['React', 'Vite', 'Design Systems', 'Motion'],
    highlight: 'Built a cinematic agency presence with refined visual hierarchy and immersive project framing.',
    live: 'https://sagniksengupta24.github.io/uvSphere/',
    github: 'https://github.com/sagniksengupta24',
    images: {
      leftTop: pic12,
      leftBottom: pic13,
      right: pic14
    }
  },
  {
    id: '02',
    category: 'Creator Agency',
    name: 'Nomadic Studio',
    description: 'A creator-focused studio experience built to feel editorial, modern, and conversion-ready for digital-first brands.',
    role: 'Frontend / Brand experience / UI polish',
    stack: ['React', 'Vercel', 'Creative Direction', 'Responsive UI'],
    highlight: 'Designed a premium creator-agency web presence with strong imagery, rhythm, and polished interaction flow.',
    live: 'https://thenomadstudios.vercel.app/',
    github: 'https://github.com/sagniksengupta24',
    images: {
      leftTop: pic15,
      leftBottom: pic16,
      right: pic17
    }
  },
  {
    id: '03',
    category: 'AI Game System',
    name: 'Quantum Tic-Tac-Toe',
    description: 'A strategic browser game exploring quantum-inspired move states and polished interactive play.',
    role: 'Frontend / Game logic / UI polish',
    stack: ['React', 'JavaScript', 'CSS', 'GitHub Pages'],
    highlight: 'Built the playable interface, responsive layout, and animated turn feedback from scratch.',
    live: 'https://sagniksengupta24.github.io/Quantum-TicTacToe/',
    github: 'https://github.com/sagniksengupta24/Quantum-TicTacToe',
    images: {
      leftTop: pic9,
      leftBottom: pic10,
      right: pic11
    }
  },
  {
    id: '04',
    category: '3D Web Experience',
    name: '3D Interactive Website',
    description: 'A cinematic interactive website built around 3D presentation, motion, and immersive portfolio storytelling.',
    role: 'Creative direction / Frontend',
    stack: ['React', 'Vite', 'Framer Motion', 'GSAP'],
    highlight: 'Designed a scroll-led visual identity with fast loading and strong project framing.',
    live: 'https://sagniksengupta.vercel.app',
    github: 'https://github.com/sagniksengupta24',
    images: {
      leftTop: pic4,
      leftBottom: pic5,
      right: pic5
    }
  },
  {
    id: '05',
    category: 'Edtech',
    name: 'Nexus Dev',
    description: 'A learning-focused web experience shaped for developer education and modern interface flow.',
    role: 'Frontend / Product UI',
    stack: ['React', 'JavaScript', 'CSS', 'Deployment'],
    highlight: 'Turned educational content into a sharper, more navigable product experience.',
    live: 'https://sagniksengupta24.github.io/nexusdev/',
    github: 'https://github.com/sagniksengupta24/nexusdev',
    images: {
      leftTop: pic6,
      leftBottom: pic7,
      right: pic8
    }
  },
  {
    id: '06',
    category: 'Developer Tool',
    name: 'Synppet',
    description: 'A clean product interface for managing useful snippets and developer workflows.',
    role: 'Full-stack thinking / UI systems',
    stack: ['React', 'Node.js', 'APIs', 'Product Design'],
    highlight: 'Focused the experience around quick scanning, reusable blocks, and polished interactions.',
    live: 'https://sagniksengupta.vercel.app',
    github: 'https://github.com/sagniksengupta24',
    images: {
      leftTop: pic1,
      leftBottom: pic2,
      right: pic3
    }
  }
];

interface Project {
  id: string;
  category: string;
  name: string;
  description: string;
  role: string;
  stack: string[];
  highlight: string;
  live: string;
  github: string;
  images: {
    leftTop: string;
    leftBottom: string;
    right: string;
  };
}

interface CardProps {
  project: Project;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
}

const Card = ({ project, index, totalCards, progress }: CardProps) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const range = [index * (1 / totalCards), 1];
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen flex items-center justify-center project-card-wrapper">
      <motion.div
        style={{ scale, top: `calc(6rem + ${index * 28}px)` }}
        className="relative flex flex-col project-card glass-tactile"
      >
        <div className="project-header shrink-0">
          <div className="project-title-area">
            <span className="font-black text-primary leading-none project-id">
              {project.id}
            </span>
            <div className="flex flex-col">
              <span className="uppercase text-primary project-category font-medium tracking-wider">
                {project.category}
              </span>
              <h3 className="text-primary font-medium leading-none project-name">
                {project.name}
              </h3>
            </div>
          </div>
          <div className="project-actions">
            <a className="btn-live" href={project.live} target="_blank" rel="noreferrer">Live</a>
            <a className="btn-live btn-live-ghost" href={project.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>

        <div className="project-meta-panel">
          <p>{project.description}</p>
          <div className="project-facts">
            <span>Role: {project.role}</span>
            <span>Highlight: {project.highlight}</span>
          </div>
          <div className="project-tags">
            {project.stack.map((item: string) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="project-images-area overflow-hidden">
          <div className="flex flex-col img-col-left h-full">
            <img
              src={project.images.leftTop}
              alt={`${project.name} preview 1`}
              width="600"
              height="400"
              className="w-full object-cover img-radius img-top-left shrink-0"
              loading="lazy"
            />
            <img
              src={project.images.leftBottom}
              alt={`${project.name} preview 2`}
              width="600"
              height="400"
              className="w-full object-cover img-radius img-bottom-left shrink-0"
              loading="lazy"
            />
          </div>
          <div className="img-col-right h-full">
            <img
              src={project.images.right}
              alt={`${project.name} main preview`}
              width="800"
              height="1000"
              className="w-full h-full object-cover img-radius"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section id="projects" className="bg-dark projects-section z-20 relative">
      <span className="section-kicker projects-kicker">Selected Work</span>
      <h2 className="hero-heading font-black uppercase text-center projects-heading leading-none">
        <VariableHeading label="Projects" />
      </h2>

      <div ref={containerRef} className="relative w-full projects-container" style={{ height: `${projects.length * 100}vh` }}>
        {projects.map((project, i) => (
          <Card
            key={project.id}
            project={project}
            index={i}
            totalCards={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};
