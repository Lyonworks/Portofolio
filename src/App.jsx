import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div
      className="min-h-screen flex flex-col relative transition-colors duration-300"
      style={{
        background: darkMode ? '#fff' : '#000',
        color: darkMode ? '#000' : '#fff',
      }}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <About />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;