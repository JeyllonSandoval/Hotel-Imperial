import React, { useEffect, useRef } from 'react';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Activar animaciones inmediatamente al montar el componente
    const timer = setTimeout(() => {
      const animatedElements = sectionRef.current?.querySelectorAll('[class*="opacity-0"]');
      animatedElements?.forEach((element) => {
        element.classList.remove('opacity-0', 'translate-y-8');
        element.classList.add('opacity-100', 'translate-y-0');
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-800"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Logo a la izquierda */}
        <div className="flex justify-center lg:justify-start opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <img 
              src="/src/assets/Logo NullBG.png" 
              alt="Hotel León Imperial Logo" 
              className="w-96 h-96 object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Texto descriptivo a la derecha */}
        <div className="text-center lg:text-left opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-300">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl text-white mb-8 leading-tight font-light">
            <span className="text-yellow-400">Nuestra Historia</span>
          </h2>
          <p className="text-2xl sm:text-3xl text-gray-300 mb-12 leading-relaxed italic">
            Donde Cada Detalle Cuenta
          </p>
          <div className="space-y-8 text-lg text-gray-400 leading-relaxed">
            <p>
              Bienvenido a una experiencia de hospitalidad excepcional en el corazón de la ciudad. 
              El Hotel León Imperial combina la elegancia clásica con las comodidades modernas 
              para ofrecerle una estadía inolvidable.
            </p>
            <p>
              Nuestro compromiso es brindar un servicio personalizado que supere sus expectativas, 
              donde cada detalle ha sido cuidadosamente pensado para su comodidad y satisfacción.
            </p>
            <p>
              Desde nuestras habitaciones de lujo hasta nuestros servicios de clase mundial, 
              cada momento en el Hotel León Imperial está diseñado para crear recuerdos duraderos.
            </p>
          </div>
          
          {/* Botón de acción */}
          <div className="mt-12">
            <button className="group px-12 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span className="flex items-center">
                Reservar Ahora
                <svg 
                  className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Efectos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};
