import React, { useState, useEffect, useRef } from 'react';
import { signInWithGoogle, logout } from '@/lib/auth';
import { useAuth } from '@/domains/auth/hooks/useAuth';
import { useNotification } from '@/shared/utils/ui';
import { auth } from '@/lib/firebase';
import { FaGoogle, FaUser, FaChevronDown, FaGlobe, FaSignOutAlt } from 'react-icons/fa';

export const AuthButton: React.FC = () => {
  const { user, loading } = useAuth();
  const { addNotification, NotificationContainer } = useNotification();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle(auth);
      addNotification('success', '¡Sesión iniciada correctamente!');
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      addNotification('error', error.message || 'Error al iniciar sesión. Intenta de nuevo.');
    }
  };

  const handleSignOut = async () => {
    try {
      await logout(auth);
      addNotification('success', 'Sesión cerrada correctamente');
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error);
      addNotification('error', 'Error al cerrar sesión. Intenta de nuevo.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="text-lg text-white">Cargando...</span>
      </div>
    );
  }

  if (user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="border-primary text-primary px-4 py-2 transition-all duration-200 bg-transparent flex items-center space-x-2"
        >
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'Usuario'}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <FaUser className="w-5 h-5" />
          )}
          <span className="text-lg">
            {user.displayName || user.email}
          </span>
          <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-[15rem] rounded-lg shadow-lg z-50 bg-black/50">
            <div className="py-2">
              <div className="px-4 py-2 text-sm border-b">
                <div className="text-xs">{user.email}</div>
              </div>
              
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  // Aquí puedes agregar la lógica para cambiar idioma
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-primary hover:text-black flex items-center space-x-2 transition-colors duration-200"
              >
                <FaGlobe className="w-4 h-4" />
                <span>Idioma</span>
              </button>
              
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  handleSignOut();
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-red-500 hover:text-black flex items-center space-x-2 transition-colors duration-200"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleSignIn}
        className="border-2 border-white text-white hover:border-primary hover:text-primary px-6 py-2 transition-colors duration-200 flex items-center space-x-2 bg-transparent"
      >
        <FaGoogle className="w-5 h-5" />
        <span>Iniciar Sesión</span>
      </button>
      
      <NotificationContainer />
    </>
  );
};
