export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-black border-t border-zinc-900 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p 
          className="text-zinc-300 text-xs" 
          style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
        >
          Copyright &copy; {currentYear} Strong Nation. All rights reserved. 
          <span className="block sm:inline sm:ml-2 mt-2 sm:mt-0">
            Made by <a href="https://essien.dev" target="_blank" rel="noopener noreferrer" className="text-[#8A2BE2] hover:text-white transition-colors duration-200">Idong</a>
          </span>
        </p>
      </div>
    </footer>
  );
}
