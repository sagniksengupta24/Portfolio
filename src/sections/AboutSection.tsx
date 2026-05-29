import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';

export const AboutSection = () => {
  return (
    <section id="about" className="bg-dark about-section relative overflow-hidden">
      <FadeIn delay={0.2} y={30} className="absolute about-moon">
        <img
          src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_054657_fa2d75a1-9b6e-4f05-83de-eb89c7492cda.png&w=1280&q=85"
          alt="Moon decorative"
          className="about-dec-img object-contain pointer-events-none"
        />
      </FadeIn>
      <FadeIn delay={0.4} y={-30} className="absolute about-object">
        <img
          src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_054707_3bf20025-b82b-402a-921f-a5f1870ed34e.png&w=1280&q=85"
          alt="Abstract decorative"
          className="about-dec-img-small object-contain pointer-events-none"
        />
      </FadeIn>
      <FadeIn delay={0.3} x={-30} className="absolute about-lego">
        <img
          src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_054714_8ca37279-d586-4f4c-befb-2f342f7fc8e5.png&w=1280&q=85"
          alt="Lego decorative"
          className="about-dec-img object-contain pointer-events-none"
        />
      </FadeIn>
      <FadeIn delay={0.5} x={30} className="absolute about-group">
        <img
          src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_054719_3c5b9f71-2ed2-47ef-a0a9-ad7d1591f46b.png&w=1280&q=85"
          alt="Group decorative"
          className="w-full object-contain pointer-events-none"
        />
      </FadeIn>

      <div className="about-inner">
        <div className="about-content z-10 relative">
          <h2 className="hero-heading font-black uppercase text-center about-heading leading-none">
            About
          </h2>

          <div className="about-text-wrapper">
            <div className="about-text-paragraph">
              <AnimatedText
                text="I'm Sagnik, an IIT Madras student and multidisciplinary developer passionate 
                about building immersive digital experiences through AI, machine learning, data science,
                 and modern web technologies. With strong expertise in React, JavaScript, Node.js, and 
                 full-stack development, i blend creativity with engineering to craft visually striking,
                  intelligent, and high-performance products that feel both modern and meaningful."
                className="about-animated-text"
              />
            </div>
            <FadeIn delay={0.2} y={20}>
              <ContactButton />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
