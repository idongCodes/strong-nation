import Link from 'next/link';

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
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
        </div>
      </div>
    </header>
  );
}
