import { useRef } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGithub } from 'react-icons/fa';
import { SiPhp, SiMysql, SiPostgresql, SiVisualstudiocode, SiUnity } from 'react-icons/si';

export default function TechStack() {
  const techsLogos = [
    { node: <FaHtml5    className="text-[4rem]" />,  title: 'HTML5',      href: 'https://html.spec.whatwg.org' },
    { node: <FaCss3Alt  className="text-[4rem]" />,    title: 'CSS3',       href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { node: <FaJs       className="text-[4rem]" />,  title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { node: <SiPhp      className="text-[4rem]" />,  title: 'PHP',        href: 'https://www.php.net/' },
    { node: <FaReact    className="text-[4rem]" />,    title: 'React',      href: 'https://react.dev' },
    { node: <SiMysql    className="text-[4rem]" />,    title: 'MySQL',      href: 'https://www.mysql.com/' },
    { node: <SiPostgresql    className="text-[4rem]" />,    title: 'PostgreSQL',      href: 'https://www.postgresql.org/' },
    { node: <SiVisualstudiocode className="text-[4rem]" />, title: 'VS Code', href: 'https://code.visualstudio.com/' },
    { node: <FaGithub   className="text-[4rem]" />,       title: 'GitHub',     href: 'https://github.com/' },
    { node: <SiUnity    className="text-[4rem]" />,       title: 'Unity',      href: 'https://unity.com/' },
  ];

  return (
    <div className="relative w-full overflow-hidden py-6">

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {techsLogos.map((tech, i) => (
              <div key={i} className="flex items-center">
                <a
                  href={tech.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 rounded-lg px-8 py-3"
                >
                  {tech.node}
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}