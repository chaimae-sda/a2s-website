import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Linkedin } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Only use transparent header on homepage
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const showDarkText = scrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${showDarkText ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo  */}
          <a href="/#accueil" className="flex items-center space-x-3">
            <img src="/assets/A2S Logo w border.png" alt="A2S Logo" className="w-20 h-20" />
            <div>
              <h2 className={`font-bold text-xl ${showDarkText ? 'text-gray-900' : 'text-white'}`}>A2S</h2>
              <p className={`text-sm ${showDarkText ? 'text-gray-600' : 'text-blue-100'}`}>Junior Entreprise</p>
            </div>
          </a>

          {/* Desktop Menu  */}
          <div className="hidden nav:flex items-center space-x-8 text-base">
            <a
              href="https://www.linkedin.com/company/a2s-junior-entreprise/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors mr-2 ${showDarkText ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'}`}
              aria-label="LinkedIn A2S"
            >
              <Linkedin size={22} />
            </a>
            <a
            href="/#accueil"
            className={`transition-colors text-base font-semibold tracking-wide ${showDarkText ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-black'}`}>
              Accueil
            </a>
            
            <a
            href="/#apropos"
            className={`transition-colors text-base font-semibold tracking-wide ${showDarkText ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-black'}`}>
              À Propos
            </a>
            
            <a href="/#services" className={`transition-colors text-base font-semibold tracking-wide ${showDarkText ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-black'}`}>
              Services
            </a>
            
            <Link 
              to="/projects" 
              className={`transition-colors text-base font-semibold tracking-wide ${showDarkText ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-black'}`}>
              Projets
            </Link>

            <Link 
              to="/events" 
              className={`transition-colors text-base font-semibold tracking-wide ${showDarkText ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-black'}`}>
              Événements
            </Link>

            <Link 
              to="/actualites" 
              className={`transition-colors text-base font-semibold tracking-wide ${showDarkText ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-black'}`}>
              Actualités
            </Link>

            <Link 
              to="/upcoming-events" 
              className={`transition-colors text-base font-semibold tracking-wide ${showDarkText ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-black'}`}>
              À Venir
            </Link>
 <Link
              to="/Contact"
              className={`text-base px-6 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-w-[160px] min-h-[36px] whitespace-nowrap ${
                isHomePage && !scrolled
                  ? 'bg-[#00B6FF] text-white shadow-[0_2px_8px_0_rgba(0,0,0,0.08)] hover:bg-blue-600 hover:shadow-[0_4px_16px_0_rgba(0,182,255,0.24)]'
                  : 'border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700'
              }`}
            >
              Avoir un Devis
            </Link>
            <Link
              to="/join-us"
              className={`text-base px-6 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-w-[160px] min-h-[36px] whitespace-nowrap ${
                isHomePage && !scrolled
                  ? 'bg-[#00B6FF] text-white shadow-[0_2px_8px_0_rgba(0,0,0,0.08)] hover:bg-blue-600 hover:shadow-[0_4px_16px_0_rgba(0,182,255,0.24)]'
                  : 'border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700'
              }`}
            >
              Rejoindre A2S
            </Link>
          </div>
          {/* Mobile Menu Button – Animated Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className={`nav:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 focus:outline-none ${
              isMenuOpen
                ? showDarkText ? 'bg-gray-100' : 'bg-white/20'
                : showDarkText ? 'hover:bg-gray-100' : 'hover:bg-white/20'
            }`}
          >
            <div className="w-5 h-[18px] flex flex-col justify-between">
              <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${
                showDarkText ? 'bg-gray-900' : 'bg-white'
              } ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
              <span className={`block h-0.5 rounded-full transition-all duration-200 ${
                showDarkText ? 'bg-gray-900' : 'bg-white'
              } ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${
                showDarkText ? 'bg-gray-900' : 'bg-white'
              } ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`nav:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t shadow-lg ${
        isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-5 py-3">
          <div className="space-y-0.5">
            {[
              { href: '/#accueil', label: 'Accueil', isAnchor: true },
              { href: '/#apropos', label: 'À Propos', isAnchor: true },
              { href: '/#services', label: 'Services', isAnchor: true },
              { href: '/projects', label: 'Projets', isAnchor: false },
              { href: '/events', label: 'Événements', isAnchor: false },
              { href: '/actualites', label: 'Actualités', isAnchor: false },
              { href: '/upcoming-events', label: 'À Venir', isAnchor: false },
            ].map(({ href, label, isAnchor }) =>
              isAnchor ? (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center w-full px-3 py-2.5 rounded-lg text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center w-full px-3 py-2.5 rounded-lg text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  {label}
                </Link>
              )
            )}
          </div>
          <div className="pt-3 mt-3 border-t border-gray-100 space-y-2 pb-2">
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-5 py-2.5 rounded-full hover:shadow-md transition-all"
            >
              Avoir un Devis
            </Link>
            <Link
              to="/join-us"
              onClick={() => setIsMenuOpen(false)}
              className="block text-center border-2 border-blue-600 text-blue-600 font-bold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-all"
            >
              Rejoindre A2S
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}