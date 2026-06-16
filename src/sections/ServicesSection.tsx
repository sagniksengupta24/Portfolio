import { FadeIn } from '../components/FadeIn';
import { VariableHeading } from '../components/VariableHeading';

const services = [
  {
    num: '01',
    name: 'AI Web Applications',
    desc: 'Full-stack AI tools, LLM workflows, smart dashboards, and automation interfaces that feel polished from prompt to output.'
  },
  {
    num: '02',
    name: 'Full-Stack Development',
    desc: 'React, Next.js, Node.js, APIs, authentication, databases, and deployment-ready systems built with product discipline.'
  },
  {
    num: '03',
    name: 'Data & ML Systems',
    desc: 'Data analysis, ML models, prediction workflows, dashboards, and intelligent decision systems for real-world use cases.'
  },
  {
    num: '04',
    name: 'Creative Web Interfaces',
    desc: 'Animated landing pages, scroll experiences, premium UI systems, and conversion-focused websites with cinematic restraint.'
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="services-section z-10 relative">
      <span className="section-kicker services-kicker">Capabilities</span>
      <h2 className="hero-heading font-black uppercase text-center services-heading leading-none">
        <VariableHeading label="Services" />
      </h2>
      
      <div className="services-list">
        {services.map((service, i) => (
          <FadeIn key={service.num} delay={i * 0.1} y={30} className="service-item glass-tactile">
            <span className="font-black service-num leading-none shrink-0">
              {service.num}
            </span>
            <div className="service-content">
              <h3 className="font-medium uppercase service-title leading-none">
                {service.name}
              </h3>
              <p className="font-light leading-relaxed service-desc">
                {service.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
