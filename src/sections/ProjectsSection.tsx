import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiveProjectButton } from '../components/LiveProjectButton';

const projects = [
  {
    id: '01',
    category: 'Client',
    name: 'Nextlevel Studio',
    images: {
      leftTop: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      leftBottom: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      right: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85'
    }
  },
  {
    id: '02',
    category: 'Personal',
    name: 'Aura Brand Identity',
    images: {
      leftTop: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      leftBottom: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      right: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85'
    }
  },
  {
    id: '03',
    category: 'Client',
    name: 'Solaris Digital',
    images: {
      leftTop: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      leftBottom: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      right: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85'
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
          <LiveProjectButton />
        </div>

        <div className="project-images-area overflow-hidden">
          <div className="flex flex-col img-col-left h-full">
            <img 
              src={project.images.leftTop} 
              alt={`${project.name} preview 1`}
              className="w-full object-cover img-radius img-top-left shrink-0"
            />
            <img 
              src={project.images.leftBottom} 
              alt={`${project.name} preview 2`}
              className="w-full object-cover img-radius img-bottom-left shrink-0"
            />
          </div>
          <div className="img-col-right h-full">
            <img 
              src={project.images.right} 
              alt={`${project.name} main preview`}
              className="w-full h-full object-cover img-radius"
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
