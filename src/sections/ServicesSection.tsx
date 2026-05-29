import { FadeIn } from '../components/FadeIn';

const services = [
  {
    num: '01',
    name: '3D Modeling',
    desc: 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.'
  },
  {
    num: '02',
    name: 'Rendering',
    desc: 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.'
  },
  {
    num: '03',
    name: 'Motion Design',
    desc: 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.'
  },
  {
    num: '04',
    name: 'Branding',
    desc: 'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.'
  },
  {
    num: '05',
    name: 'Web Design',
    desc: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.'
  }
];

export const ServicesSection = () => {
  return (
    <section className="bg-white services-section z-10 relative">
      <h2 className="text-dark font-black uppercase text-center services-heading leading-none">
        Services
      </h2>
      
      <div className="flex flex-col services-list">
        {services.map((service, i) => (
          <FadeIn key={service.num} delay={i * 0.1} y={30} className="service-item items-start">
            <span className="font-black service-num text-dark leading-none shrink-0">
              {service.num}
            </span>
            <div className="service-content">
              <h3 className="font-medium uppercase text-dark service-title leading-none">
                {service.name}
              </h3>
              <p className="font-light leading-relaxed service-desc text-dark">
                {service.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
