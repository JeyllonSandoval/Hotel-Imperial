import React, { useState, useEffect } from 'react';
import { AuthButton } from '@/components/ui/buttons/AuthButton';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para cambiar el fondo del navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al hacer clic en un enlace
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Obtener la ruta actual para resaltar el enlace activo
  const getCurrentPath = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  };

  const currentPath = getCurrentPath();

  const isActive = (path: string) => {
    return currentPath === path;
  };

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/about', label: 'Reseñas' },
    { href: '/contact', label: 'Contacto' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-md' 
        : 'bg-transparent backdrop-blur-sm'
    }`}>
      <div className="w-full py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center group">
              <div className="overflow-hidden">
                <img
                  src="/src/assets/Logo Amarillo.png"
                  alt="Hotel Imperial"
                  className="h-20 w-auto p-2 transition-transform duration-300 group-hover:scale-105 transform-gpu"
                />
              </div>
            </a>
          </div>

          {/* Navegación desktop - Centrada absolutamente */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-lg font-medium transition-all duration-300 rounded-lg group ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-white hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive(item.href) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg"></div>
                  )}
                  <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Auth Button y Menú móvil */}
          <div className="flex items-center space-x-4">
            <AuthButton />
            
            {/* Botón menú móvil */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 p-2 rounded-lg transition-all duration-200"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">
                  {isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                </span>
                <svg
                  className={`h-6 w-6 transition-transform duration-300 ${
                    isMobileMenuOpen ? 'rotate-90' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md rounded-lg mt-2 border border-primary/20 shadow-xl">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-primary bg-primary/10 border-l-4 border-primary'
                    : 'text-white hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
