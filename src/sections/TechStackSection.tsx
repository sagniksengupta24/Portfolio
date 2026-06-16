import { FadeIn } from '../components/FadeIn';
import { VariableHeading } from '../components/VariableHeading';

const stacks = [
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion']
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Express', 'MongoDB', 'Supabase', 'REST APIs']
  },
  {
    group: 'AI/ML',
    items: ['Python', 'Machine Learning', 'LLMs', 'Reinforcement Learning', 'Data Science']
  },
  {
    group: 'Tools',
    items: ['GitHub', 'Vercel', 'GitHub Pages', 'Figma', 'Blender']
  }
];

export const TechStackSection = () => {
  return (
    <section className="tech-section bg-dark relative">
      <span className="section-kicker">Tech Stack</span>
      <h2 className="hero-heading font-black uppercase text-center tech-heading leading-none">
        <VariableHeading label="Systems" />
      </h2>

      <div className="tech-grid">
        {stacks.map((stack, index) => (
          <FadeIn key={stack.group} delay={index * 0.08} y={24} className="tech-card glass-tactile">
            <h3>{stack.group}</h3>
            <div className="tech-pills">
              {stack.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
