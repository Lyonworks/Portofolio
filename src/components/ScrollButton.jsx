'use client';

import { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function ScrollButton({ className = "" }) {
  const [scrolled, setScrolled] = useState(false);

  const handleClick = () => {
    if (!scrolled) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.getElementById('techstack') || document.getElementById('about');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY < 100);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`
        ${scrolled
          ? 'absolute bottom-10 left-1/2 transform -translate-x-1/2'
          : 'fixed bottom-6 right-6'
        }
        z-50 transition-all duration-500 ease-in-out
      `}
    >
      <button 
        onClick={handleClick}  
        className={`group inline-flex items-center justify-center rounded-full border-2 p-2 bg-black text-[#F5F5F5] border-[#0000FF] shadow-[0_0_12px_#0000FF] transition-colors duration-300
          ${className}
        `}
      >
        {scrolled ? (
          <IoIosArrowDown className="h-5 w-5" />
        ) : (
          <IoIosArrowUp className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}