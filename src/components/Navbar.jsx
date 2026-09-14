'use client';

import Dock from './Dock';
import {
  FaHome,
  FaUser,
  FaCode,
} from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

export default function Navbar() {
  const { language, setLanguage } = useLanguage();

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
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50">
      <Dock items={items} panelHeight={50} baseItemSize={33} magnification={44} />
      </nav>
      <div className="fixed bottom-6 left-6 z-50 flex rounded-full border-2 border-[#0000FF] bg-black p-1 shadow-[0_0_12px_#0000FF]">
        {['en', 'id'].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setLanguage(option)}
            aria-label={`Switch language to ${option.toUpperCase()}`}
            aria-pressed={language === option}
            className={`rounded-full px-2 py-1 text-[10px] font-mono font-semibold uppercase transition-colors ${
              language === option ? 'bg-[#0000FF] text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
}
