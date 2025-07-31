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
        className={`group relative h-12 inline-flex items-center justify-center rounded-full bg-transparent text-[#F5F5F5] border border-[#F5F5F5] hover:shadow-[0_0_12px_#F5F5F5] hover:w-32 transition-all duration-300 
          ${scrolled ? 'w-36' : 'w-12'}
          ${className}
        `}
      >
        <div className={`
          inline-flex whitespace-nowrap transition-all duration-300 z-10
          ${scrolled
            ? 'group-hover:opacity-100 group-hover:-translate-x-2 opacity-0'
            : 'group-hover:opacity-100 group-hover:-translate-x-2 opacity-0'
          }
        `}>
          {scrolled ? 'Scroll' : 'Back to Top'}
        </div>

        <div className="absolute right-3.5 z-10">
          {scrolled ? (
            <IoIosArrowDown className="h-5 w-5" />
          ) : (
            <IoIosArrowUp className="h-5 w-5" />
          )}
        </div>
      </button>
    </div>
  );
}
