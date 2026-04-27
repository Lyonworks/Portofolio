import { useState } from 'react';
import GooeyNav from './GooeyNav';
import BorderGlow from './BorderGlow';
import tgcokm from '../assets/thumbnails/tgcokm.png';
import efe from '../assets/thumbnails/efe.jpg';

const WEB_PROJECTS = [
  {
    id: 'portfolio',
    title: 'Portfolio Site',
    description: 'Personal dev portfolio with blog and case studies.',
    tag: 'Next.js',
    image: '/assets/thumbnails/portfolio.png',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce UI',
    description: 'Full storefront with cart and checkout flow.',
    tag: 'React',
    image: '/assets/thumbnails/ecommerce.png',
  },
  {
    id: 'dashboard',
    title: 'Analytics Dashboard',
    description: 'Real-time metrics visualisation panel.',
    tag: 'Vue',
    image: '/assets/thumbnails/dashboard.png',
  },
  {
    id: 'chat',
    title: 'Chat App',
    description: 'WebSocket-based real-time messaging.',
    tag: 'Node.js',
    image: '/assets/thumbnails/chat.png',
  },
];

const GAME_PROJECTS = [
  {
    id: 'platformer',
    title: 'The Golden Curse of Keong Mas',
    description: 'Side-scrolling adventure.',
    tag: 'Unity',
    image: tgcokm,
    url: 'https://ikmalionn.itch.io/the-golden-curse-of-keong-mas',
  },
  {
    id: 'horror',
    title: 'Escape from Edi',
    description: 'An indie 3d horror game.',
    tag: 'Unity',
    image: efe,
    url: 'https://remybilek.itch.io/escape-from-edi',
  }
];

const TABS = [
  { label: 'WEB',  projects: WEB_PROJECTS },
  { label: 'GAME', projects: GAME_PROJECTS },
];

const CARD_GLOW = {
  colors: ['#0000FF'],
  glowColor: '240 100 50',
  backgroundColor: '#120F17',
  borderRadius: 20,
};

function ProjectTag({ label }) {
  return (
    <span className="mt-3 self-start text-xs px-3 py-1 rounded-full bg-white/10 text-white-300 border border-white/10">
      {label}
    </span>
  );
}

function ProjectCard({ title, description, tag, image, url }) {
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
            <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-xs text-white/50 leading-relaxed flex-1">{description}</p>
            <div className="flex items-center justify-between mt-1">
              <ProjectTag label={tag} />
              <span className="text-xs text-white/30 group-hover:text-white/60 transition-colors duration-300">
                View →
              </span>
            </div>
          </div>
        </div>
      </BorderGlow>
    </a>
  );
}

function ProjectGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {projects.slice(0, 3).map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navItems = TABS.map((tab, i) => ({
    label: tab.label,
    href: `#tab-${i}`,
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

      <ProjectGrid projects={activeProjects} />
    </section>
  );
}