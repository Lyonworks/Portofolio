'use client';

import Dock from './Dock';
import {
  FaHome,
  FaUser,
  FaCode,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';

export default function Navbar() {

  const items = [
    {
      icon: <FaHome size={`20`} />,
      label: 'Home',
      onClick: () => (window.location.hash = ''),
    },
    {
      icon: <FaUser size={`20`} />,
      label: 'About',
      onClick: () => (window.location.hash = '#about'),
    },
    {
      icon: <FaCode size={`20`} />,
      label: 'Projects',
      onClick: () => (window.location.hash = '#projects'),
    },
    {
      icon: <FaGithub size={`20`} />,
      label: 'Github',
      onClick: () => window.open('https://github.com/Lyonworks', '_blank'),
    },
    {
      icon: <FaLinkedin size={`20`} />,
      label: 'LinkedIn',
      onClick: () => window.open('https://www.linkedin.com/in/ikmalion', '_blank'),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50">
      <Dock
        items={items}
        panelHeight={50}
        baseItemSize={33}
        magnification={44}
      />
    </nav>
  );
}
