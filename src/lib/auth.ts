import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import type { User } from '@/shared/types';

// Configurar proveedor de Google
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Funciones de autenticación
export const signInWithGoogle = async (auth: any): Promise<User> => {
  if (!auth) {
    throw new Error('Firebase Auth no está disponible. Asegúrate de que estés en el cliente.');
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user: User = {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL
    };
    return user;
  } catch (error: any) {
    console.error('Error al iniciar sesión con Google:', error);
    
    // Manejar errores específicos de CORS/COOP
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('El popup de autenticación fue cerrado. Intenta de nuevo.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('El popup fue bloqueado por el navegador. Permite popups para este sitio.');
    } else if (error.message?.includes('Cross-Origin-Opener-Policy')) {
      throw new Error('Error de política de seguridad. Intenta recargar la página.');
    }
    
    throw error;
  }
};

export const logout = async (auth: any) => {
  if (!auth) {
    throw new Error('Firebase Auth no está disponible. Asegúrate de que estés en el cliente.');
  }

  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

// Escuchar cambios en el estado de autenticación
export const onAuthStateChange = (auth: any, callback: (user: User | null) => void) => {
  if (!auth) {
    console.warn('Firebase Auth no está disponible. No se puede escuchar cambios de autenticación.');
    return () => {}; // Retornar función vacía para unsubscribe
  }

  return onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      const user: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL
      };
      callback(user);
    } else {
      callback(null);
    }
  });
};
