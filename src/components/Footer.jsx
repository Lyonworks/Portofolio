import { useLanguage } from '../LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  const socialLinks = [
    { name: "Email", href: "mailto:ikmalionn@gmail.com" },
    { name: "Instagram", href: "https://instagram.com/luxetlyon" },
    { name: "GitHub", href: "https://github.com/Lyonworks" },
    { name: "Discord", href: "https://discord.com/users/946956547257434142" },
  ];

  return (
    <footer className="w-full bg-black pt-6 pb-28 lg:pb-6 border-t border-[#0000FF] shadow-[0_-2px_10px_rgba(0,0,255,0.5)]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-6 font-mono font-medium text-xs text-[#F5F5F5]">
        <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap text-center lg:text-left">
          <span className="text-gray-400">{language === 'id' ? 'Hubungi saya:' : 'Connect with me:'}</span>
          {socialLinks.map((link, index) => (
            <span key={link.name} className="flex items-center gap-3">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-[#0000FF] transition-colors"
              >
                {link.name}
              </a>
              {index < socialLinks.length - 1 && <span className="text-gray-600">•</span>}
            </span>
          ))}
        </div>

        <div className="text-center lg:text-right">
          <span>© {year} Lyon • {language === 'id' ? 'Hak cipta dilindungi.' : 'All rights reserved.'}</span>
        </div>

      </div>
    </footer>
  );
}