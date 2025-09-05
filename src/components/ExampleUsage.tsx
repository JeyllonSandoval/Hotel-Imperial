import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { AuthButton } from './AuthButton';
import { CommentsSection } from './CommentsSection';

// Ejemplo de cómo usar el sistema de comentarios en cualquier página
export const ExampleUsage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-text">
      {/* Header con autenticación */}
      <header className="bg-gray-dark p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Hotel Imperial</h1>
          <AuthButton />
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Nuestras Habitaciones
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-dark p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-text">
                Habitación Deluxe
              </h3>
              <p className="text-gray-medium mb-4">
                Una habitación espaciosa con vista al mar y todas las comodidades.
              </p>
              <div className="text-primary font-semibold">
                $200/noche
              </div>
            </div>
            
            <div className="bg-gray-dark p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-text">
                Suite Presidencial
              </h3>
              <p className="text-gray-medium mb-4">
                La máxima experiencia de lujo con servicio personalizado.
              </p>
              <div className="text-primary font-semibold">
                $500/noche
              </div>
            </div>
          </div>

          {/* Sistema de comentarios */}
          <AuthProvider>
            <CommentsSection hotelId="main-hotel" />
          </AuthProvider>
        </div>
      </main>
    </div>
  );
};
