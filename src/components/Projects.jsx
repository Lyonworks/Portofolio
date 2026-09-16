import { useState } from 'react';
import GooeyNav from './GooeyNav';
import BorderGlow from './BorderGlow';
import efe from '../assets/thumbnails/efe.jpg';
import en from '../assets/thumbnails/en.jpg';
import tgcokm from '../assets/thumbnails/tgcokm.png';
import eod from '../assets/thumbnails/eod.png';
import { useLanguage } from '../LanguageContext';

const WEB_PROJECTS = [
  {
    id: 'portfolio',
    title: 'ExploreNusa',
    description: { en: 'A tourism platform for exploring Indonesian destinations, attractions, facilities, and traveler reviews.', id: 'Platform wisata untuk menjelajahi destinasi Indonesia, tempat menarik, fasilitas, dan ulasan wisatawan.' },
    tag: 'LARAVEL/PHP/MYSQL',
    image: en,
    url: 'https://explorenusa-lyon.vercel.app/',
  },
  {
    id: 'portfolio',
    title: 'The Golden Curse of Keong Mas',
    description: { en: 'Personal game site with blog and merchandise store.', id: 'Situs game pribadi dengan blog dan toko merchandise.' },
    tag: 'HTML/CSS/JS/PHP',
    image: tgcokm,
    url: 'https://pplgrolas.my.id/0079457224/',
  },
];

const GAME_PROJECTS = [
  {
    id: 'horror',
    title: 'Escape from Edi',
    description: { en: 'An indie 3D horror game.', id: 'Game horor 3D indie.' },
    tag: 'Unity',
    image: efe,
    url: 'https://remybilek.itch.io/escape-from-edi',
  },
  {
    id: 'platformer',
    title: 'The Golden Curse of Keong Mas',
    description: { en: 'Side-scrolling adventure.', id: 'Petualangan side-scrolling.' },
    tag: 'Unity',
    image: tgcokm,
    url: 'https://ikmalionn.itch.io/the-golden-curse-of-keong-mas',
  },
  {
    id: 'psychological horror',
    title: 'Eyes of Desperation',
    description: { en: 'A psychological horror experience where fear isn\'t your biggest enemy.', id: 'Pengalaman horor psikologis ketika rasa takut bukanlah musuh terbesarmu.' },
    tag: 'Unity',
    image: eod,
    url: 'https://remybilek.itch.io/eyes-of-desperation',
  },
];

const TABS = [
  { label: { en: 'WEB', id: 'WEB' }, projects: WEB_PROJECTS },
  { label: { en: 'GAME', id: 'GAME' }, projects: GAME_PROJECTS },
];

const CARD_GLOW = {
  colors: ['#0000FF'],
  glowColor: '240 100 50',
  backgroundColor: '#120F17',
  borderRadius: 20,
};

function ProjectTag({ label }) {
  return (
    <span className="mt-3 self-start text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white-300 border border-white/10">
      {label}
    </span>
  );
}

function ProjectCard({ title, description, tag, image, url, language }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group cursor-pointer"
    >
      <BorderGlow {...CARD_GLOW}>
        <div className="flex flex-col h-full transition-transform duration-300">
          <div className="w-full h-36 overflow-hidden rounded-t-[18px]">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="flex flex-col flex-1 p-4">
            <h3 className="text-sm font-mono font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
              {title}
            </h3> 
            <p className="text-xs font-mono text-white/50 leading-relaxed flex-1">{description[language]}</p>
            <div className="flex items-center justify-between mt-1">
              <ProjectTag label={tag} />
              <span className="text-xs font-mono text-white/30 group-hover:text-white/60 transition-colors duration-300">
                {language === 'id' ? 'Lihat' : 'View'} →
              </span>
            </div>
          </div>
        </div>
      </BorderGlow>
    </a>
  );
}

function ProjectGrid({ projects, language }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {projects.slice(0, 3).map((project) => (
        <ProjectCard key={project.id} {...project} language={language} />
      ))}
    </div>
  );
}

export default function Projects() {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const navItems = TABS.map((tab) => ({
    label: tab.label[language],
    href: `#${tab.label.en.toLowerCase()}`,
}));

  const activeProjects = TABS[activeIndex]?.projects ?? [];

  return (
    <section id="projects" className="flex flex-col gap-8 p-8">
      <div className="flex justify-center">
        <GooeyNav
          items={navItems}
          initialActiveIndex={activeIndex}
          onActiveChange={(index) => setActiveIndex(index)}
        />
      </div>

      <ProjectGrid projects={activeProjects} language={language} />
    </section>
  );
}