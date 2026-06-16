import { FadeIn } from '../components/FadeIn';
import ScrollReveal from '../components/ScrollReveal';
import { ContactButton } from '../components/ContactButton';
import { VariableHeading } from '../components/VariableHeading';
import { BrainCircuit, Code2, DatabaseZap, Sparkles } from 'lucide-react';

const strengths = [
  { icon: BrainCircuit, title: 'AI/ML & LLMs', body: 'Machine learning, LLM workflows, reinforcement learning, and intelligent interfaces.' },
  { icon: Code2, title: 'Full-Stack Web', body: 'React, Next.js, Node.js, APIs, authentication, and deployment-ready product systems.' },
  { icon: DatabaseZap, title: 'Data Science', body: 'Data analysis, prediction workflows, dashboards, and decision-support tools.' },
  { icon: Sparkles, title: 'Creative Interfaces', body: 'Cinematic motion, premium UI systems, and high-polish interactive experiences.' }
];

export const AboutSection = () => {
  return (
    <section id="about" className="bg-dark about-section relative overflow-hidden">
      <div className="about-glass-orbit" />

      <div className="about-inner">
        <div className="about-content z-10 relative">
          <span className="section-kicker">Introduction</span>
          <h2 className="hero-heading font-black uppercase text-center about-heading leading-none">
            <VariableHeading label="About" />
          </h2>

          <div className="about-text-wrapper glass-tactile">
            <div className="about-text-paragraph">
              <ScrollReveal
                baseOpacity={0.12}
                enableBlur
                baseRotation={3}
                blurStrength={6}
                textClassName="about-animated-text"
                wordAnimationEnd="center center"
              >
                I&apos;m Sagnik Sengupta, an IIT Madras BS Data Science student building at the intersection of AI, full-stack engineering, and creative web design. I work with React, Next.js, Node.js, machine learning, LLM workflows, and interactive UI systems to turn ideas into polished digital products.
              </ScrollReveal>
            </div>
            <div className="strength-grid">
              {strengths.map((item, index) => {
                const Icon = item.icon;
                return (
                  <FadeIn key={item.title} delay={index * 0.08} y={20} className="strength-card">
                    <Icon size={22} />
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </FadeIn>
                );
              })}
            </div>
            <FadeIn delay={0.2} y={20}>
              <ContactButton label="Start a Project" />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
