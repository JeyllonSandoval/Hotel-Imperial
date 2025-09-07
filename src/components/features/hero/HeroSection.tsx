import React from 'react';
import { Button } from '@/components/ui/buttons/Button';

export const HeroSection: React.FC = () => {
  const handleExploreRooms = () => {
    // Scroll to rooms section
    const roomsSection = document.getElementById('rooms-section');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewGallery = () => {
    // TODO: Implement gallery functionality
    console.log('View gallery clicked');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/background.svg" 
          alt="Hotel Imperial Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Contenido del hero */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Hotel Imperial
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Experimenta el lujo y la comodidad en el corazón de la ciudad
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleExploreRooms}
          >
            Explorar Habitaciones
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleViewGallery}
          >
            Ver Galería
          </Button>
        </div>
      </div>
    </section>
  );
};
