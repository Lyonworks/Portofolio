'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Footer from './components/Footer';
import CircularText from './components/CircularText';
import Clock from './components/Clock';
import Grainient from './components/Grainient';
import MusicPlayer from './components/MusicPlayer';
import GamesPage from './components/GamesPage';
import { LanguageProvider } from './LanguageContext';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [musicMounted, setMusicMounted] = useState(false);
  const [route, setRoute] = useState(() => (
    typeof window !== 'undefined'
      ? `${window.location.pathname}${window.location.search}${window.location.hash}`
      : '/'
  ));

  // Mounted on first open and kept alive afterwards: unmounting the player would
  // drop the YouTube iframe and cut playback mid-song.
  const toggleMusic = () => {
    setMusicMounted(true);
    setMusicOpen((value) => !value);
  };

  useEffect(() => {
    const syncRoute = () => {
      setRoute(`${window.location.pathname}${window.location.search}${window.location.hash}`);
    };

    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  useEffect(() => {
    const [pathname, hash] = route.split('#');
    if (pathname !== '/') return;

    window.requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(decodeURIComponent(hash))?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }, [route]);

  useEffect(() => {
    if (!hasEntered) return undefined;

    const loadingTimer = window.setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => window.clearTimeout(loadingTimer);
  }, [hasEntered]);

  const isGamesRoute = route.split(/[?#]/)[0] === '/games';

  return (
    <LanguageProvider>
      <div className="relative z-0 min-h-screen overflow-x-hidden">
        <Grainient />

        <main className={`transition-opacity duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Navbar onToggleMusic={toggleMusic} musicOpen={musicOpen} />
          {isGamesRoute ? (
            <GamesPage />
          ) : (
            <>
              <Hero />
              <About />
              <TechStack />
              <Projects />
              <Footer />
            </>
          )}
          <Clock showDate={false} hour12={false} />
          {musicMounted && <MusicPlayer visible={musicOpen} />}
        </main>

        {hasEntered && (
          <CircularText
            text="Lyon"
            spinDuration={6}
            centered={!isLoaded}
            className="z-[110]"
          />
        )}

        {!isLoaded && (
          <div className="fixed inset-0 z-[100] overflow-hidden bg-black/20 transition-opacity duration-1000 ease-out">
            <div className="preloader-grainient absolute inset-0">
              <Grainient className="preloader-grainient" />
            </div>

            {!hasEntered && (
              <button
                type="button"
                onClick={() => setHasEntered(true)}
                className="absolute inset-0 z-10 flex h-screen w-screen items-center justify-center rounded-none border-0 bg-transparent p-0 font-mono font-bold text-m uppercase tracking-[0.35em] text-[#F5F5F5] transition-colors duration-300 hover:border-0 hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F5]"
              >
                Click to enter
              </button>
            )}

          </div>
        )}
      </div>
    </LanguageProvider>
  );
}
