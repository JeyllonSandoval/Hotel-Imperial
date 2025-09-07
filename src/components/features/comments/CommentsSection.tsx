import React, { useEffect, useRef } from 'react';

export const CommentsSection: React.FC = () => {
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

  const comments = [
    {
      id: 1,
      name: "María González",
      rating: 5,
      comment: "Una experiencia excepcional. El servicio es impecable y las habitaciones son de lujo absoluto. Definitivamente regresaré.",
      date: "15 de Diciembre, 2024"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      rating: 5,
      comment: "El Hotel León Imperial superó todas mis expectativas. La atención al detalle es increíble y el personal es muy profesional.",
      date: "8 de Diciembre, 2024"
    },
    {
      id: 3,
      name: "Ana Martínez",
      rating: 5,
      comment: "Un lugar mágico donde cada detalle está pensado para la comodidad del huésped. La elegancia y el confort se sienten en cada rincón.",
      date: "2 de Diciembre, 2024"
    },
    {
      id: 4,
      name: "Roberto Silva",
      rating: 5,
      comment: "La mejor experiencia hotelera que he tenido. El nivel de servicio y la calidad de las instalaciones son excepcionales.",
      date: "25 de Noviembre, 2024"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-400'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <section 
      ref={sectionRef}
      className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-900"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Título de la sección */}
        <div className="text-center mb-16 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
            <span className="text-yellow-400">Testimonios</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 italic max-w-3xl mx-auto leading-relaxed">
            Lo que dicen nuestros huéspedes sobre su experiencia
          </p>
        </div>

        {/* Grid de comentarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {comments.map((comment, index) => (
            <div
              key={comment.id}
              className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300 hover:transform hover:scale-105">
                {/* Estrellas */}
                <div className="flex items-center mb-4">
                  {renderStars(comment.rating)}
                </div>

                {/* Comentario */}
                <blockquote className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                  "{comment.comment}"
                </blockquote>

                {/* Información del huésped */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white text-xl font-medium mb-1">
                      {comment.name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {comment.date}
                    </p>
                  </div>
                  
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-black font-semibold text-lg">
                      {comment.name.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-800">
          <p className="text-xl text-gray-300 mb-8">
            ¿Quieres ser parte de nuestra historia?
          </p>
          <button className="px-12 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Reservar Ahora
          </button>
        </div>
      </div>

      {/* Efectos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};
