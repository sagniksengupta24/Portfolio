import { useEffect, useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';
import FlowingMenu from './FlowingMenu';

import menuAboutImage from '../assets/pic1.webp';
import menuPriceImage from '../assets/pic4.webp';
import menuProjectsImage from '../assets/pic8.webp';
import menuContactImage from '../assets/pic13.png';
import './HeroMenu.css';

export const HeroMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = useMemo(
    () => [
      { link: '#about', text: 'About', image: menuAboutImage },
      { link: '#services', text: 'Price', image: menuPriceImage },
      { link: '#projects', text: 'Projects', image: menuProjectsImage },
      { link: '#contact', text: 'Contact', image: menuContactImage }
    ],
    []
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="hero-menu-button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className={`hero-flowing-menu ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
        <button
          type="button"
          className="hero-flowing-menu-close"
          aria-label="Close navigation menu"
          onClick={() => setIsOpen(false)}
        >
          <X size={24} />
        </button>
        <FlowingMenu
          items={menuItems}
          speed={13}
          textColor="rgba(243, 248, 251, 0.88)"
          bgColor="rgba(5, 6, 7, 0.96)"
          marqueeBgColor="#9DE8D7"
          marqueeTextColor="#050607"
          borderColor="rgba(229, 244, 248, 0.16)"
          onNavigate={() => setIsOpen(false)}
        />
      </div>
    </>
  );
};
