import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub, FaGitAlt } from 'react-icons/fa';
import { SiTailwindcss, SiPhp, SiMysql, SiVisualstudiocode, SiVercel, SiUnity } from 'react-icons/si';

const techs = [
  { icon: <FaHtml5 />, name: 'HTML5', color: '#E34C26' },
  { icon: <FaCss3Alt />, name: 'CSS3', color: '#1572B6' },
  { icon: <FaJs />, name: 'JavaScript', color: '#F7DF1E' },
  { icon: <FaReact />, name: 'React', color: '#61DBFB' },
  { icon: <SiTailwindcss />, name: 'Tailwind', color: '#38B2AC' },
  { icon: <SiPhp />, name: 'PHP', color: '#8993BE' },
  { icon: <FaNodeJs />, name: 'Node.js', color: '#339933' },
  { icon: <SiMysql />, name: 'MySQL', color: '#4479A1' },
  { icon: <SiVisualstudiocode />, name: 'VS Code', color: '#007ACC' },
  { icon: <FaGithub />, name: 'GitHub', color: '#ffffff' },
  { icon: <FaGitAlt />, name: 'Git', color: '#F1502F' },
  { icon: <SiVercel />, name: 'Vercel', color: '#ffffff' },
  { icon: <SiUnity />, name: 'Unity', color: '#ffffff' },
];


export default function TechStack() {
  return (
    <section className="w-full h-screen py-24 flex flex-col items-center justify-center bg-black">
      <h2 className="text-3xl font-bold mb-12 text-[#F5F5F5]">Tech Stack</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-8 px-6">
        {techs.map((tech, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0a0a0a] shadow-lg hover:scale-110 transition duration-500"
            style={{
              animation: 'float 4s ease-in-out infinite',
              border: `2px solid ${tech.color}`,
              boxShadow: `0 0 20px ${tech.color}50`,
            }}
          >
            <div
              className="text-5xl mb-2 transition-transform duration-300 group-hover:rotate-6"
              style={{ color: tech.color }}
            >
              {tech.icon}
            </div>
            <span className="text-[#F5F5F5] text-sm mt-1">{tech.name}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
}
