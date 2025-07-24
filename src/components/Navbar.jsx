'use client';

import Dock from './Dock';
import {
  FaHome,
  FaUser,
  FaCode,
  FaGithub,
  FaLinkedin,
  FaSun,
  FaMoon,
} from 'react-icons/fa';

export default function Navbar({ darkMode, setDarkMode }) {
  const iconColor = darkMode ? '#000' : '#fff';

  const items = [
    {
      icon: <FaHome size={22} color={iconColor} />,
      label: 'Home',
      onClick: () => (window.location.hash = '#home'),
    },
    {
      icon: <FaUser size={22} color={iconColor} />,
      label: 'About',
      onClick: () => (window.location.hash = '#about'),
    },
    {
      icon: <FaCode size={22} color={iconColor} />,
      label: 'Projects',
      onClick: () => (window.location.hash = '#projects'),
    },
    {
      icon: <FaGithub size={22} color={iconColor} />,
      label: 'Github',
      onClick: () => window.open('https://github.com/', '_blank'),
    },
    {
      icon: <FaLinkedin size={22} color={iconColor} />,
      label: 'LinkedIn',
      onClick: () => window.open('https://linkedin.com/', '_blank'),
    },
    {
      icon: darkMode ? (
        <FaSun size={22} color={iconColor} />
      ) : (
        <FaMoon size={22} color={iconColor} />
      ),
      label: 'Theme',
      onClick: () => setDarkMode(!darkMode),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50">
      <Dock
        items={items}
        panelHeight={55}
        baseItemSize={33}
        magnification={44}
      />
    </nav>
  );
}
