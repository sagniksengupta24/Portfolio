import { ContactButton } from '../components/ContactButton';
import { FadeIn } from '../components/FadeIn';
import { HeroMenu } from '../components/HeroMenu';
import { Magnet } from '../components/Magnet';
import { VariableHeading } from '../components/VariableHeading';
import HeroBackground from '../components/backgrounds/HeroBackground';

export const HeroSection = () => {
  return (
    <section 
      className="h-screen flex flex-col overflow-x-clip relative"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        background: '#050607'
      }}
    >
      <HeroBackground />

      <div className="relative z-10 flex flex-col h-full w-full">
        <FadeIn delay={0} y={-20} as="nav" className="flex hero-nav hero-menu-nav uppercase tracking-wider text-primary">
          <a href="#about" className="hero-nav-brand">Sagnik</a>
          <HeroMenu />
        </FadeIn>

        <div className="hero-center-wrapper">
          <FadeIn delay={0.15} y={40} className="w-full flex justify-center">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none w-full text-center hero-heading-container">
              <VariableHeading label="Hi, i'm Sagnik" radius={230} />
            </h1>
          </FadeIn>
        </div>

        <div className="flex justify-between items-end pb-7 px-6 z-20 flex-1" style={{ paddingBottom: 'clamp(1.75rem, 2.5vw, 2.5rem)', paddingInline: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          <FadeIn delay={0.35} y={20}>
            <p className="text-primary font-light uppercase tracking-wide hero-bottom-text">
              a 3d creator driven by crafting striking and unforgettable projects
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>

        <FadeIn delay={0.6} y={30} className="absolute z-10 pointer-events-none hero-portrait-container w-full h-full inset-0 pointer-events-none flex items-center justify-center">
          <div className="pointer-events-auto mt-20">
            <Magnet padding={220} strength={14} maxOffset={44} smoothing={0.09}>
              <img
                src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
                alt="Sagnik portrait"
                width="1000"
                height="1000"
                className="w-full h-auto object-contain hero-portrait-img"
              />
            </Magnet>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
