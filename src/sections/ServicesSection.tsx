import { FadeIn } from '../components/FadeIn';

const services = [
  {
    num: '01',
    name: 'Cloud & Backend Engineering',
    desc: 'Designing and managing scalable server architectures, robust databases, and cloud infrastructure to ensure high availability and optimal performance.'
  },
  {
    num: '02',
    name: 'API Development & Integration',
    desc: 'Building secure, RESTful, and GraphQL APIs to seamlessly connect diverse systems, microservices, and third-party platforms.'
  },
  {
    num: '03',
    name: 'DevOps & Deployment',
    desc: 'Streamlining development lifecycles with continuous integration and deployment (CI/CD) pipelines, automated testing, and containerization.'
  },
  {
    num: '04',
    name: 'Web Development',
    desc: 'Creating dynamic, responsive, and accessible user interfaces utilizing modern frontend frameworks and best-in-class web standards.'
  },
  {
    num: '05',
    name: 'Full Stack Development',
    desc: 'Architecting end-to-end solutions that bridge intuitive client-side experiences with powerful, scalable server-side technologies.'
  },
  {
    num: '06',
    name: 'Artificial Intelligence & Machine Learning',
    desc: 'Developing intelligent algorithms and predictive models to automate workflows, personalize experiences, and solve complex problems.'
  },
  {
    num: '07',
    name: 'Data Science & Analytics',
    desc: 'Transforming raw data into actionable insights through advanced statistical analysis, visualization, and strategic data mining.'
  },
  {
    num: '08',
    name: 'Cross-Platform App Development',
    desc: 'Crafting versatile mobile applications for iOS and Android using unified codebases to deliver native-like performance and user experiences.'
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
