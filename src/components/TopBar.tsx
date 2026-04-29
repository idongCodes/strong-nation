import Link from 'next/link';

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8A2BE2" className="w-8 h-8">
                <path d="M4.5 9h-3a1.5 1.5 0 00-1.5 1.5v3A1.5 1.5 0 001.5 15h3v3a1.5 1.5 0 001.5 1.5h1.5A1.5 1.5 0 009 18v-1.5h6V18a1.5 1.5 0 001.5 1.5H18a1.5 1.5 0 001.5-1.5v-3h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 0022.5 9h-3V6A1.5 1.5 0 0018 4.5h-1.5A1.5 1.5 0 0015 6v1.5H9V6A1.5 1.5 0 007.5 4.5H6A1.5 1.5 0 004.5 6v3z"/>
              </svg>
              <span className="text-white text-2xl tracking-wider uppercase pt-1">Strong Nation</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
