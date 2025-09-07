import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/buttons/Button';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Activar animaciones al cargar la página
    const timer = setTimeout(() => {
      const animatedElements = sectionRef.current?.querySelectorAll('[class*="opacity-0"]');
      animatedElements?.forEach((element) => {
        element.classList.remove('opacity-0', 'translate-y-8');
        element.classList.add('opacity-100', 'translate-y-0');
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollToNext = () => {
    // Scroll to about section
    const aboutSection = document.querySelector('section:nth-of-type(2)');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900"
    >
      {/* Imagen de fondo - usando una de las imágenes de habitaciones */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/Rooms 1.jpeg" 
          alt="Hotel León Imperial Background" 
          className="w-full h-full object-cover"
        />
        {/* Overlay con gradiente para mejor legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        {/* Efecto de partículas doradas */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"></div>
      </div>
      
      {/* Contenido del hero moderno y elegante */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Título principal */}
        <div className="mb-16">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl text-white leading-none tracking-wider font-light">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              Hotel León Imperial
            </span>
          </h1>
        </div>
        
        {/* Eslogan */}
        <div className="mb-24">
          <p className="text-2xl sm:text-3xl lg:text-4xl text-white/90 font-light tracking-widest uppercase italic">
            Donde Cada Detalle Cuenta
          </p>
        </div>

        {/* Botón de scroll */}
        <div>
          <button
            onClick={handleScrollToNext}
            className="group flex items-center justify-center mx-auto px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            <span className="mr-3 font-medium">Descubrir Más</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Indicador de scroll elegante */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
        <div className="elegant-scroll-indicator">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-yellow-400/60 to-transparent"></div>
          <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Efectos decorativos sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-yellow-400/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-yellow-400/2 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
};
