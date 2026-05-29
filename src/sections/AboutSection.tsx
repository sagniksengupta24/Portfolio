import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';
import { Moon, Sparkles, Blocks, Users } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="bg-dark about-section relative overflow-hidden">
      <FadeIn delay={0.2} y={30} className="absolute about-moon">
        <Moon 
          size={120} 
          className="about-dec-img text-primary pointer-events-none opacity-20" 
        />
      </FadeIn>
      <FadeIn delay={0.4} y={-30} className="absolute about-object">
        <Sparkles 
          size={80} 
          className="about-dec-img-small text-primary pointer-events-none opacity-20" 
        />
      </FadeIn>
      <FadeIn delay={0.3} x={-30} className="absolute about-lego">
        <Blocks 
          size={100} 
          className="about-dec-img text-primary pointer-events-none opacity-20" 
        />
      </FadeIn>
      <FadeIn delay={0.5} x={30} className="absolute about-group">
        <Users 
          size={140} 
          className="w-full text-primary pointer-events-none opacity-20" 
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
