'use client';

import Dock from './Dock';
import {
  FaHome,
  FaUser,
  FaCode,
  FaGamepad,
} from 'react-icons/fa';
import { Music4 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const COPY = {
  en: { home: 'Home', about: 'About', projects: 'Projects', games: 'Games', music: 'Music' },
  id: { home: 'Beranda', about: 'Tentang', projects: 'Proyek', games: 'Game', music: 'Musik' },
};

export default function Navbar({ onToggleMusic, musicOpen = false }) {
  const { language, setLanguage } = useLanguage();
  const copy = COPY[language] || COPY.en;

  const navigateTo = (event, path) => {
    if (event) event.preventDefault();

    if (typeof window !== 'undefined') {
      const previousPath = window.location.pathname;
      const destination = new URL(path, window.location.origin);
      window.history.pushState({}, '', destination);
      window.dispatchEvent(new PopStateEvent('popstate'));

      if (previousPath === destination.pathname && destination.pathname === '/') {
        window.requestAnimationFrame(() => {
          if (destination.hash) {
            document
              .getElementById(decodeURIComponent(destination.hash.slice(1)))
              ?.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
      }
    }
  };

  const items = [
    {
      icon: <FaHome size={20} />,
      label: copy.home,
      href: '/',
      onClick: (event) => navigateTo(event, '/'),
    },
    {
      icon: <FaUser size={20} />,
      label: copy.about,
      href: '/#about',
      onClick: (event) => navigateTo(event, '/#about'),
    },
    {
      icon: <FaCode size={20} />,
      label: copy.projects,
      href: '/#projects',
      onClick: (event) => navigateTo(event, '/#projects'),
    },
    {
      icon: <FaGamepad size={20} />,
      label: copy.games,
      href: '/games',
      onClick: (event) => navigateTo(event, '/games'),
    },
    ...(onToggleMusic
      ? [
          {
            icon: <Music4 size={20} />,
            label: copy.music,
            onClick: onToggleMusic,
            className: musicOpen ? 'text-[#0000FF]' : '',
          },
        ]
      : []),
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-1/2 z-50">
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