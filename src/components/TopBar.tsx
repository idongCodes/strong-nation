"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="flex items-center group"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <div className="relative inline-block px-4 py-1 flex items-center justify-center">
                {/* SVG Filter Brush stroke background layer */}
                <div className="absolute inset-0 z-0 w-full h-full text-[#8A2BE2]">
                  <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <filter id="brush-texture" x="-10%" y="-20%" width="120%" height="140%">
                        {/* Generates noise */}
                        <feTurbulence type="fractalNoise" baseFrequency="0.08 0.15" numOctaves="4" result="noise" />
                        {/* Displaces the rectangle using the noise to create jagged edges */}
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
                      </filter>
                    </defs>
                    <rect 
                      x="4%" 
                      y="15%" 
                      width="92%" 
                      height="70%" 
                      fill="currentColor" 
                      filter="url(#brush-texture)" 
                      className="origin-center -rotate-1"
                    />
                  </svg>
                </div>
                {/* Text layer */}
                <span className="relative text-white text-xl tracking-widest uppercase pt-1 z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  Strong Nation
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Toggle Button & Menu Wrapper */}
          <div className="flex items-center" ref={navRef}>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#8A2BE2] focus:outline-none p-2 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-16 right-0 w-48 bg-zinc-950 border-l border-b border-zinc-800 shadow-xl py-2 z-40 sm:right-4 sm:rounded-b-md sm:border-r">
                <Link 
                  href="/#about" 
                  className="block px-6 py-3 text-white hover:bg-black hover:text-[#8A2BE2] transition-colors duration-200 uppercase tracking-wider text-sm font-sans"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/#contact" 
                  className="block px-6 py-3 text-white hover:bg-black hover:text-[#8A2BE2] transition-colors duration-200 uppercase tracking-wider text-sm font-sans"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <Link 
                  href="/#faqs" 
                  className="block px-6 py-3 text-white hover:bg-black hover:text-[#8A2BE2] transition-colors duration-200 uppercase tracking-wider text-sm font-sans"
                  onClick={() => setIsOpen(false)}
                >
                  FAQs
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
