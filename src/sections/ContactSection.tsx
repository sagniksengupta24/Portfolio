import { Briefcase, Camera, GitBranch } from 'lucide-react';
import { ContactButton } from '../components/ContactButton';
import { FadeIn } from '../components/FadeIn';
import { VariableHeading } from '../components/VariableHeading';

const links = [
  { label: 'GitHub', href: 'https://github.com/sagniksengupta24', icon: GitBranch },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sagnik-sengupta-3286681b6/', icon: Briefcase },
  { label: 'Instagram', href: 'https://www.instagram.com/sagnik.24/', icon: Camera }
];

export const ContactSection = () => {
  return (
    <section id="contact" className="contact-section bg-dark relative">
      <FadeIn y={30} className="contact-panel glass-tactile">
        <span className="section-kicker">Contact</span>
        <h2 className="hero-heading font-black uppercase contact-heading leading-none">
          <VariableHeading label="Have an idea worth building?" radius={190} />
        </h2>
        <p>Let&apos;s turn it into a polished product with sharp engineering, useful AI, and a memorable interface.</p>
        <div className="contact-actions">
          <ContactButton label="Email Me" href="mailto:sagniksengupta24@gmail.com" />
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.label} className="contact-link" href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                <Icon size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
};
