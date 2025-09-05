import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebase-config';

// Solo inicializar Firebase en el cliente (no durante el build de Astro)
let app: any = null;
let auth: any = null;
let db: any = null;

if (typeof window !== 'undefined') {
  // Inicializar Firebase solo si no existe ya una instancia (evita el error de duplicado)
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Configurar opciones adicionales para reducir errores de CORS/COOP
  auth.useDeviceLanguage();
}

// Exportar las instancias (serán null en el servidor)
export { auth, db };