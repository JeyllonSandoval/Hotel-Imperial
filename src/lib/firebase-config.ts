// Configuración de Firebase con fallback a valores por defecto
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC1A8ELUL2sppBFDO-xClUYidhIWkCK5CM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "hotel-imperial-c60fe.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "hotel-imperial-c60fe",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "hotel-imperial-c60fe.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "376963296109",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:376963296109:web:a62e95aaf6be7865ffc864"
};

// Debug: Mostrar qué configuración se está usando
if (typeof window !== 'undefined') {
  const usingEnvVars = import.meta.env.VITE_FIREBASE_API_KEY && 
                      import.meta.env.VITE_FIREBASE_AUTH_DOMAIN && 
                      import.meta.env.VITE_FIREBASE_PROJECT_ID;

  console.log('🔥 Firebase Config:', {
    source: usingEnvVars ? 'Variables de entorno' : 'Valores por defecto',
    apiKey: firebaseConfig.apiKey ? '✅ Configurada' : '❌ Faltante',
    authDomain: firebaseConfig.authDomain ? '✅ Configurada' : '❌ Faltante',
    projectId: firebaseConfig.projectId ? '✅ Configurada' : '❌ Faltante',
    storageBucket: firebaseConfig.storageBucket ? '✅ Configurada' : '❌ Faltante',
    messagingSenderId: firebaseConfig.messagingSenderId ? '✅ Configurada' : '❌ Faltante',
    appId: firebaseConfig.appId ? '✅ Configurada' : '❌ Faltante'
  });

  if (!usingEnvVars) {
    console.warn('⚠️ Usando valores por defecto de Firebase. Para producción, configura las variables de entorno.');
  }
}
