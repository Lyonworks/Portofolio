'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Footer from './components/Footer';
import CircularText from './components/CircularText';
import Clock from './components/Clock';
import Grainient from './components/Grainient';
import { LanguageProvider } from './LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="relative z-0 min-h-screen overflow-x-hidden">
        <Grainient />
        <Navbar />
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Footer />
        <CircularText text="Lyon" spinDuration={22} />
        <Clock showDate={false} hour12={false} />
      </div>
    </LanguageProvider>
  );
}
