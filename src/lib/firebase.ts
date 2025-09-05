import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { firebaseConfig } from './firebase-config';

// Definir el tipo User localmente para evitar problemas de importación
export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

// Debug: Verificar configuración
console.log('🔥 Firebase Config:', {
  apiKey: firebaseConfig.apiKey ? '✅ Configurada' : '❌ Faltante',
  authDomain: firebaseConfig.authDomain ? '✅ Configurada' : '❌ Faltante',
  projectId: firebaseConfig.projectId ? '✅ Configurada' : '❌ Faltante',
  storageBucket: firebaseConfig.storageBucket ? '✅ Configurada' : '❌ Faltante',
  messagingSenderId: firebaseConfig.messagingSenderId ? '✅ Configurada' : '❌ Faltante',
  appId: firebaseConfig.appId ? '✅ Configurada' : '❌ Faltante'
});

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configurar opciones adicionales para reducir errores de CORS/COOP
if (typeof window !== 'undefined') {
  // Configurar opciones de autenticación para reducir errores de popup
  auth.useDeviceLanguage();
}

// Configurar proveedor de Google
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Funciones de autenticación
export const signInWithGoogle = async (): Promise<User> => {
  try {
    // Configurar opciones del popup para reducir errores de CORS/COOP
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

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

// Escuchar cambios en el estado de autenticación
export const onAuthStateChange = (callback: (user: User | null) => void) => {
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

// Interfaz para comentarios
export interface Comment {
  id?: string;
  textContent: string;
  authorName: string;
  authorEmail: string;
  authorPhoto?: string;
  timestamp: Timestamp;
  hotelId?: string;
  rating?: number;
  status?: boolean;
}

// Funciones de Firestore para comentarios
export const addComment = async (comment: Omit<Comment, 'id' | 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'Comments'), {
      textContent: comment.textContent,
      authorName: comment.authorName,
      authorEmail: comment.authorEmail,
      authorPhoto: comment.authorPhoto || '',
      hotelId: comment.hotelId || '',
      rating: comment.rating || 5,
      status: comment.status !== undefined ? comment.status : true,
      timestamp: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    throw error;
  }
};

export const getComments = async (hotelId?: string) => {
  try {
    const commentsRef = collection(db, 'Comments');
    const q = query(commentsRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const comments: Comment[] = [];
    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      if (!hotelId || data.hotelId === hotelId) {
        comments.push({
          id: doc.id,
          textContent: data.textContent || '',
          authorName: data.authorName || '',
          authorEmail: data.authorEmail || '',
          authorPhoto: data.authorPhoto || '',
          hotelId: data.hotelId || '',
          rating: data.rating || 5,
          status: data.status !== undefined ? data.status : true,
          timestamp: data.timestamp
        } as Comment);
      }
    });
    
    return comments;
  } catch (error: any) {
    console.error('Error al obtener comentarios:', error);
    
    // Si es un error de permisos, devolver array vacío en lugar de lanzar error
    if (error.code === 'permission-denied' || error.message?.includes('permissions')) {
      console.warn('⚠️ Permisos insuficientes para leer comentarios. Devolviendo array vacío.');
      return [];
    }
    
    throw error;
  }
};
