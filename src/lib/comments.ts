import { getFirestore, collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import type { Comment } from '@/shared/types';

// Funciones de Firestore para comentarios
export const addComment = async (db: any, comment: Omit<Comment, 'id' | 'timestamp'>) => {
  if (!db) {
    throw new Error('Firebase Firestore no está disponible. Asegúrate de que estés en el cliente.');
  }

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

export const getComments = async (db: any, hotelId?: string) => {
  if (!db) {
    console.warn('Firebase Firestore no está disponible. Devolviendo array vacío.');
    return [];
  }

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
