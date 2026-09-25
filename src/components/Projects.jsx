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
    description: {
      en: `ExploreNusa is an Indonesian tourism information and exploration website designed to help users discover various travel destinations, explore detailed information about places they want to visit, and gain an overview of the facilities available at each destination. The website focuses on providing an informative, responsive, and user-friendly interface, allowing users to browse and explore tourism information in a more comfortable and organized way.

          The project was developed using Laravel and PHP as the backend technologies, JavaScript for interface interactions, and PostgreSQL as the database system. ExploreNusa includes a destination and facility management system that allows tourism information to be managed and updated through the administrator interface.`,

      id: `ExploreNusa adalah website informasi dan eksplorasi pariwisata Indonesia yang dirancang untuk membantu pengguna menemukan berbagai destinasi wisata, melihat informasi lengkap mengenai tempat yang ingin dikunjungi, serta mendapatkan gambaran mengenai fasilitas yang tersedia di setiap destinasi. Website ini berfokus pada penyajian informasi yang informatif, responsif, dan mudah digunakan sehingga pengguna dapat menjelajahi berbagai informasi wisata dengan lebih nyaman dan terstruktur.
      
          Project ini dikembangkan menggunakan Laravel dan PHP sebagai teknologi backend, JavaScript untuk interaksi pada antarmuka, serta PostgreSQL sebagai sistem database. ExploreNusa memiliki sistem pengelolaan data destinasi dan fasilitas yang memungkinkan informasi pariwisata dikelola dan diperbarui melalui sisi administrator.`
    },
    tag: 'LARAVEL/PHP/JS/POSTGRESQL',
    image: en,
    url: 'https://explorenusa-lyon.vercel.app/',
    isMaintenance: false,
  },

  {
    id: 'game-site',
    title: 'Game Site',
    description: {
      en: `The Game Site is a companion website developed for The Golden Curse of Keong Mas, an indie game project inspired by Indonesian folklore and cultural storytelling. The website serves as a central information platform where visitors can explore the game's narrative, learn about the developers, read project-related articles and news, and discover available merchandise.

          The website was developed using HTML, CSS, JavaScript, and PHP. In addition to its informational pages, the project includes a merchandise section for displaying products such as apparel and other game-related items. The website also provides a comment section and additional pages that connect users with information and media related to the game.

          This project combines web development and game development into a single project ecosystem. Rather than functioning only as a promotional landing page, the website was designed to support the game project by providing information, presenting its identity, showcasing merchandise, and giving users additional ways to interact with the project.`,

      id: `Game Site merupakan website pendukung yang dikembangkan untuk project game The Golden Curse of Keong Mas, sebuah game indie yang terinspirasi dari cerita rakyat dan unsur budaya Indonesia. Website ini berfungsi sebagai pusat informasi project yang memungkinkan pengunjung mengenal cerita game, melihat informasi mengenai developer, membaca artikel dan berita terkait project, serta melihat berbagai merchandise yang tersedia.

          Website ini dikembangkan menggunakan HTML, CSS, JavaScript, dan PHP. Selain menyediakan halaman informasi, project ini memiliki bagian merchandise yang digunakan untuk menampilkan berbagai produk seperti pakaian dan item pendukung lainnya. Website juga dilengkapi dengan fitur komentar serta beberapa halaman tambahan yang menghubungkan pengguna dengan informasi dan media terkait game.

          Project ini menggabungkan pengembangan website dan game development dalam satu ekosistem project. Website tidak hanya digunakan sebagai halaman promosi, tetapi juga berperan sebagai media untuk menyampaikan informasi, membangun identitas project, menampilkan merchandise, serta memberikan ruang interaksi tambahan bagi pengguna.`
    },
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
    description: {
      en: `Escape from Edi is an indie 3D horror game project focused on exploration, environmental atmosphere, and creating a tense experience for the player. The game uses 3D environments and first-person perspectives to establish its horror atmosphere through level design, environmental details, lighting, and visual composition.

          The project was developed using Unity as the primary game engine and Blender for creating, processing, and preparing 3D assets. The development process focuses on combining environmental design and visual elements to create explorable spaces that support the overall horror experience.`,

      id: `Escape from Edi adalah project game horor 3D indie yang berfokus pada eksplorasi, atmosfer lingkungan, serta menciptakan pengalaman yang menegangkan bagi pemain. Game ini menggunakan lingkungan 3D dan perspektif first-person untuk membangun suasana horor melalui desain level, detail lingkungan, pencahayaan, serta komposisi visual.

          Project ini dikembangkan menggunakan Unity sebagai game engine utama dan Blender untuk proses pembuatan, pengolahan, serta persiapan aset 3D. Proses pengembangan berfokus pada kombinasi antara desain lingkungan dan elemen visual untuk menciptakan area yang dapat dieksplorasi sekaligus mendukung keseluruhan pengalaman horor.`
    },
    tag: 'UNITY/BLENDER',
    image: efe,
    url: 'https://remybilek.itch.io/escape-from-edi',
    isMaintenance: false,
  },

  {
    id: 'the-golden-curse-of-keong-mas',
    title: 'The Golden Curse of Keong Mas',
    description: {
      en: `The Golden Curse of Keong Mas is a 2D side-scrolling adventure game inspired by Indonesian folklore, particularly the legend of Keong Mas. The project combines storytelling, exploration, platforming mechanics, environmental interaction, and character switching to transform the traditional folktale into an interactive game experience.

          The game was developed using Unity, while Aseprite was used to create and prepare the game's 2D visual assets. Players follow the journey of the characters through different story segments, with each section introducing different objectives, mechanics, and character abilities.

          The gameplay goes beyond traditional platforming by incorporating environmental interaction, item collection, objective-based gameplay, dialogue, and narrative progression. Character switching is also used as part of the gameplay system, allowing different characters to interact with the environment based on their abilities.`,

      id: `The Golden Curse of Keong Mas adalah game petualangan side-scrolling 2D yang terinspirasi dari cerita rakyat Indonesia, khususnya legenda Keong Mas. Project ini menggabungkan storytelling, eksplorasi, mekanik platformer, interaksi dengan lingkungan, serta pergantian karakter untuk mengubah cerita rakyat tersebut menjadi pengalaman game yang interaktif.

          Game ini dikembangkan menggunakan Unity, sedangkan Aseprite digunakan untuk membuat dan mempersiapkan aset visual 2D. Pemain akan mengikuti perjalanan para karakter melalui beberapa bagian cerita yang memiliki objective, mekanik, serta kemampuan karakter yang berbeda.

          Gameplay tidak hanya berfokus pada platforming, tetapi juga memiliki berbagai elemen seperti interaksi dengan lingkungan, pengumpulan item, penyelesaian objective, dialog, serta perkembangan cerita. Sistem pergantian karakter juga menjadi bagian dari gameplay sehingga setiap karakter dapat berinteraksi dengan lingkungan berdasarkan kemampuan yang dimilikinya.`
    },
    tag: 'UNITY/ASEPRITE',
    image: tgcokm,
    url: 'https://ikmalionn.itch.io/the-golden-curse-of-keong-mas',
    isMaintenance: false,
  },

  {
    id: 'eyes-of-desperation',
    title: 'Eyes of Desperation',
    description: {
      en: `Eyes of Desperation is a psychological horror game project that explores themes of fear, pressure, uncertainty, and decision-making. The project is designed to create a horror experience that does not rely solely on jump scares, but instead uses atmosphere, environmental design, narrative elements, and situations that gradually create tension throughout the player's journey.

          The game is developed using Unity and Blender, with a focus on building 3D environments and creating an atmosphere that supports the psychological horror genre. The environments are designed as explorable spaces where visual elements, lighting, level structure, and environmental details contribute to the overall mood of the game.

          The project also focuses on creating situations where players experience uncertainty and pressure while progressing through the story. This approach allows the environment and narrative to become important parts of the gameplay experience rather than functioning only as visual backgrounds.`,

      id: `Eyes of Desperation adalah project game psychological horror yang mengeksplorasi tema ketakutan, tekanan, ketidakpastian, dan pengambilan keputusan. Project ini dirancang untuk menciptakan pengalaman horor yang tidak hanya mengandalkan jump scare, tetapi juga menggunakan atmosfer, desain lingkungan, elemen cerita, serta berbagai situasi yang secara bertahap membangun ketegangan selama perjalanan pemain.

          Game ini dikembangkan menggunakan Unity dan Blender dengan fokus pada pembuatan environment 3D serta atmosfer yang mendukung genre psychological horror. Lingkungan permainan dirancang sebagai area yang dapat dieksplorasi, dengan elemen visual, pencahayaan, struktur level, dan detail lingkungan yang digunakan untuk membangun suasana keseluruhan game.
          
          Project ini juga berfokus pada penciptaan situasi yang membuat pemain menghadapi ketidakpastian dan tekanan selama mengikuti perkembangan cerita. Dengan pendekatan tersebut, lingkungan dan narasi menjadi bagian penting dari pengalaman gameplay dan tidak hanya berfungsi sebagai latar visual.`
    },
    tag: 'UNITY/BLENDER',
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
  backgroundColor: '#000000',
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
          <div className="w-full aspect-video overflow-hidden rounded-t-[18px] relative">
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
              {description[language].slice(0, 111)}{description[language].length > 111 ? '...' : ''}
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
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') setIsOpen(true);
        }}
        className="block w-full group cursor-pointer h-full text-left"
      >
        <BorderGlow {...CARD_GLOW}>
          <div className="flex flex-col h-full transition-transform duration-300">
            <div className="w-full aspect-video overflow-hidden rounded-t-[18px] p-2">
              <img
                src={image}
                alt={title}
                className="w-full h-full rounded-[14px] object-cover transition-transform duration-500"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <div className="flex flex-col flex-1 p-4">
              <h3 className="text-sm font-mono font-semibold text-white mb-1 group-hover:text-blue-700 transition-colors duration-300">
                {title}
              </h3> 
              <p className="text-xs font-mono text-white/50 leading-relaxed whitespace-pre-line flex-1">{description[language].slice(0, 111)}{description[language].length > 111 ? '...' : ''}</p>
              <div className="flex items-center justify-between mt-1">
                <ProjectTag label={tag} />
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="text-xs font-mono text-white hover:text-blue-400 transition-colors duration-300"
                >
                  {language === 'id' ? 'Lihat' : 'View'} →
                </a>
              </div>
            </div>
          </div>
        </BorderGlow>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in duration-300"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-2xl max-h-[90vh]"
          >
            <div
              className="relative max-h-[90vh] overflow-x-hidden overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-[24px] border border-white/20 bg-white/[0.08] backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
            >
              <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />

              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover opacity-80"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label={language === 'id' ? 'Tutup' : 'Close'}
                  className="absolute right-3 top-3 border-0 bg-transparent p-1 text-xl leading-none text-white/70 hover:text-white"
                >
                  ×
                </button>

              </div>

              <div className="relative p-6">
                <h2 className="text-lg font-mono font-semibold text-white">
                  {title}
                </h2>

                <div className="mt-4 space-y-4 text-sm font-mono leading-relaxed text-white/70">
                  {description[language].split(/\n\s*\n/).map((paragraph, index) => (
                    <p key={index}>{paragraph.trim()}</p>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <ProjectTag label={tag} />

                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="text-xs font-mono text-white hover:text-blue-400 transition-colors duration-300"
                  >
                    {language === 'id' ? 'Lihat' : 'View'} →
                  </a>
                </div>
              </div>
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