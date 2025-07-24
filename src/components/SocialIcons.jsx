import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function SocialIcons() {
  const icons = [
    { comp: FaGithub, url: 'https://github.com/' },
    { comp: FaLinkedin, url: 'https://linkedin.com/' },
    { comp: FaTwitter, url: 'https://twitter.com/' },
  ];

  return (
    <div className="flex space-x-6 mt-6">
      {icons.map(({ comp: Icon, url }, i) => (
        <a key={i} href={url} target="_blank" rel="noopener noreferrer">
          <Icon className="text-3xl hover:text-gray-400" />
        </a>
      ))}
    </div>
  );
}
