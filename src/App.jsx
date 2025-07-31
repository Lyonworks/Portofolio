'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import CircularText from './components/CircularText';
import Clock from './components/Clock';
import DarkVeil from './components/DarkVeil';

export default function App() {
  return (
    <div className="relative z-0 min-h-screen overflow-x-hidden">
      <DarkVeil />
      <Navbar />
      <Hero />
      <TechStack />
      <Footer />
      <CircularText text="Lyon" spinDuration={22} />
      <Clock showDate={false} hour12={false} />
    </div>
  );
}
