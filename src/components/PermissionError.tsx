import React from 'react';

export const PermissionError: React.FC = () => {
  return (
    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center">
      <div className="text-6xl mb-4">🔒</div>
      <h3 className="text-xl font-semibold text-red-400 mb-2">
        Error de Permisos
      </h3>
      <p className="text-red-300 mb-4">
        No se pueden cargar los comentarios debido a restricciones de seguridad.
      </p>
      <div className="bg-gray-800 rounded-lg p-4 text-left">
        <h4 className="font-semibold text-text mb-2">Para solucionarlo:</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
          <li>Ve a <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Firebase Console</a></li>
          <li>Selecciona tu proyecto "hotel-imperial-c60fe"</li>
          <li>Ve a Firestore Database → Reglas</li>
          <li>Reemplaza las reglas con las del archivo "firestore.rules"</li>
          <li>Haz clic en "Publicar"</li>
          <li>Recarga esta página</li>
        </ol>
      </div>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 bg-primary hover:bg-primary-dark text-background px-4 py-2 rounded-lg transition-colors duration-200"
      >
        Recargar Página
      </button>
    </div>
  );
};
