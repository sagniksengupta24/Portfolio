import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiveProjectButton } from '../components/LiveProjectButton';

const image = import.meta.glob('../assets/*.webp', {
  eager: true,
  import: 'default'
});

const imgArray = Object.values(image) as string[];

const projects = [
  {
    id: '01',
    category: 'Game',
    name: 'Quantum Tic-Tac-Toe',
    images: {
      leftTop: imgArray[4],
      leftBottom: imgArray[5],
      right: imgArray[3]
    }
  },
  {
    id: '02',
    category: 'Personal Portfolio',
    name: 'Sagnik Sengupta 1.0',
    images: {
      leftTop: imgArray[12],
      leftBottom: imgArray[14],
      right: imgArray[14]
    }
  },
  {
    id: '03',
    category: 'Edtech',
    name: 'Nexus Dev',
    images: {
      leftTop: imgArray[1],
      leftBottom: imgArray[2],
      right: imgArray[13]
    }
  },
  {
    id: '04',
    category: 'Edtech',
    name: 'Synppet',
    images: {
      leftTop: imgArray[10],
      leftBottom: imgArray[8],
      right: imgArray[0]
    }
  }
];

const Card = ({ project, index, totalCards, progress }: any) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const range = [index * (1 / totalCards), 1];
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen flex items-center justify-center project-card-wrapper">
      <motion.div
        style={{ scale, top: `calc(6rem + ${index * 28}px)` }}
        className="relative bg-dark flex flex-col project-card"
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
          <LiveProjectButton onCustomClick={project.id} />
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
      <h2 className="hero-heading font-black uppercase text-center projects-heading leading-none">
        Project
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
