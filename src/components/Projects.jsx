import { useState } from 'react';
import GooeyNav from './GooeyNav';
import BorderGlow from './BorderGlow';
import PixelCard from './PixelCard';
import efe from '../assets/thumbnails/efe.jpg';
import en from '../assets/thumbnails/en.png';
import tgcokm from '../assets/thumbnails/tgcokm.png';
import eod from '../assets/thumbnails/eod.png';
import { useLanguage } from '../LanguageContext';

const WEB_PROJECTS = [
  {
    id: 'explorenusa',
    title: 'ExploreNusa',
    description: { en: 'A travel website for exploring Indonesia.', id: 'Situs wisata untuk menjelajahi Indonesia.' },
    tag: 'LARAVEL/PHP/JS/PROSTGRESQL',
    image: en,
    url: 'https://explorenusa-lyon.vercel.app/',
    isMaintenance: false,
  },
  {
    id: 'game-site',
    title: 'Game Site',
    description: { en: 'Personal game site with blog and merchandise store.', id: 'Situs game pribadi dengan blog dan toko merchandise.' },
    tag: 'HTML/CSS/JS/PHP',
    image: tgcokm,
    url: 'https://pplgrolas.my.id/0079457224/',
    isMaintenance: true,
  },
];

const GAME_PROJECTS = [
  {
    id: 'escape-from-edi',
    title: 'Escape from Edi',
    description: { en: 'An indie 3D horror game.', id: 'Game horor 3D indie.' },
    tag: 'Unity',
    image: efe,
    url: 'https://remybilek.itch.io/escape-from-edi',
    isMaintenance: false,
  },
  {
    id: 'the-golden-curse-of-keong-mas',
    title: 'The Golden Curse of Keong Mas',
    description: { en: 'Side-scrolling adventure.', id: 'Petualangan side-scrolling.' },
    tag: 'Unity',
    image: tgcokm,
    url: 'https://ikmalionn.itch.io/the-golden-curse-of-keong-mas',
    isMaintenance: false,
  },
  {
    id: 'eyes-of-desperation',
    title: 'Eyes of Desperation',
    description: { en: 'A psychological horror experience where fear isn\'t your biggest enemy.', id: 'Pengalaman horor psikologis ketika rasa takut bukanlah musuh terbesarmu.' },
    tag: 'Unity',
    image: eod,
    url: 'https://remybilek.itch.io/eyes-of-desperation',
    isMaintenance: false,
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

function MaintenanceCard({ title, description, tag, image, language }) {
  return (
    <div className="relative w-full h-full group cursor-not-allowed select-none">
      <BorderGlow {...CARD_GLOW}>
        <div className="flex flex-col h-full transition-opacity duration-300">
          <div className="w-full h-36 overflow-hidden rounded-t-[18px] relative">
            {image && (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover opacity-80"
              />
            )}
            <div className="absolute top-3 right-3 bg-red-950/80 border border-red-500/40 px-2 py-0.5 rounded-full text-[9px] font-mono text-red-400">
              MAINTENANCE
            </div>
          </div>
          <div className="flex flex-col flex-1 p-4">
            <h3 className="text-sm font-mono font-semibold text-white/90 mb-1">
              {title}
            </h3>
            <p className="text-xs font-mono text-white/50 leading-relaxed flex-1">
              {description[language]}
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-white/10">
              <ProjectTag label={tag} />
              <span className="text-xs font-mono text-white/30 line-through">
                {language === 'id' ? 'Lihat' : 'View'} →
              </span>
            </div>
          </div>
        </div>
      </BorderGlow>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px] overflow-hidden z-20 pointer-events-auto">
        <PixelCard
          variant="default"
          speed={33}
          gap={6}
          colors="#f8fafc,#f1f5f9,#cbd5e1"
          className="!w-full !h-full !aspect-auto border-white/50 bg-[#120F17] !rounded-[20px]"
        >
          <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 pointer-events-none">
            <div className="absolute top-3 right-3 bg-red-950/80 border border-red-500/40 px-2 py-0.5 rounded-full text-[9px] font-mono text-red-400">
              MAINTENANCE
            </div>

            <div className="my-auto text-center py-3 px-2 bg-red-950/60 border border-red-500/30 rounded-xl backdrop-blur-md">
              <p className="text-xs font-mono text-red-400 font-semibold mb-0.5">
                {language === 'id' ? 'Situs Dalam Perbaikan' : 'Under Maintenance'}
              </p>
              <p className="text-[11px] font-mono text-white/70">
                {language === 'id' ? 'Tidak dapat diakses saat ini' : 'Currently unavailable'}
              </p>
            </div>

            <div className="flex items-center justify-between mt-1">
              <ProjectTag label={tag} />
              <span className="text-xs font-mono text-red-400/60">
                {language === 'id' ? 'Perbaikan' : 'Maintenance'}
              </span>
            </div>
          </div>
        </PixelCard>
      </div>
    </div>
  );
}

function ProjectCard({ title, description, tag, image, url, language, isMaintenance }) {
  const [isOpen, setIsOpen] = useState(false);

  if (isMaintenance) {
    return (
      <MaintenanceCard
        title={title}
        description={description}
        tag={tag}
        image={image}
        language={language}
      />
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="block w-full group cursor-pointer h-full text-left"
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
                  {language === 'id' ? 'Detail' : 'Details'}
                </span>
              </div>
            </div>
          </div>
        </BorderGlow>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-[20px] border border-white/10 bg-[#120F17] p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-mono font-semibold text-white">{title}</h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={language === 'id' ? 'Tutup' : 'Close'}
                className="text-xl leading-none text-white/50 hover:text-white"
              >
                ×
              </button>
            </div>
            <p className="mt-4 text-sm font-mono leading-relaxed text-white/70">{description[language]}</p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <ProjectTag label={tag} />
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-mono text-white hover:bg-blue-500"
              >
                {language === 'id' ? 'Lihat' : 'View'} →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
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