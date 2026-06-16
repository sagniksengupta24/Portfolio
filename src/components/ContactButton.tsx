interface ContactButtonProps {
  label?: string;
  href?: string;
  variant?: 'primary' | 'ghost';
}

export const ContactButton = ({
  label = 'Contact Me',
  href = '#contact',
  variant = 'primary'
}: ContactButtonProps) => {
  return (
    <a className={`btn-contact btn-contact-${variant}`} href={href}>
      {label}
    </a>
  );
};
