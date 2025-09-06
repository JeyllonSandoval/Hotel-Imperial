import React from 'react';
import { AuthButton } from '@/components/ui/AuthButton';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo a la izquierda */}
          <div className="flex-shrink-0 ">
            <a href="/" className="flex items-center">
              <img
                src="/src/assets/AMARILLO ecab0f Y BLANCO NullBG.png"
                alt="Hotel Imperial"
                className="h-20 w-auto p-2"
              />
            </a>
          </div>

          {/* Secciones en el centro */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/"
                className="text-white hover:text-primary transition-colors duration-200 px-3 py-2 text-sm font-medium"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-white hover:text-primary transition-colors duration-200 px-3 py-2 text-sm font-medium"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-white hover:text-primary transition-colors duration-200 px-3 py-2 text-sm font-medium"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Botón de autenticación a la derecha */}
          <div className="flex items-center space-x-4">
            <AuthButton />
          </div>

          {/* Menú móvil */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-sm rounded-lg mt-2">
            <a
              href="/"
              className="text-white hover:text-primary block px-3 py-2 text-base font-medium"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-white hover:text-primary block px-3 py-2 text-base font-medium"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-white hover:text-primary block px-3 py-2 text-base font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
