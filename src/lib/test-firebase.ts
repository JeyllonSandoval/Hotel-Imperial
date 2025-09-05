// Script para probar la conexión con Firebase
import { auth, db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';

export const testFirebaseConnection = async () => {
  try {
    console.log('🔥 Probando conexión con Firebase...');
    
    // Probar autenticación
    console.log('📝 Probando autenticación...');
    const userCredential = await signInAnonymously(auth);
    console.log('✅ Autenticación exitosa:', userCredential.user.uid);
    
    // Probar Firestore
    console.log('🗄️ Probando Firestore...');
    const testCollection = collection(db, 'Comments');
    const snapshot = await getDocs(testCollection);
    console.log('✅ Firestore conectado. Documentos encontrados:', snapshot.size);
    
    // Mostrar documentos existentes
    if (snapshot.size > 0) {
      console.log('📄 Documentos en la colección Comments:');
      snapshot.forEach((doc) => {
        console.log('  - ID:', doc.id);
        console.log('  - Datos:', doc.data());
      });
    } else {
      console.log('📄 No hay documentos en la colección Comments');
    }
    
    console.log('🎉 ¡Conexión con Firebase exitosa!');
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con Firebase:', error);
    return false;
  }
};

// Función para agregar un comentario de prueba
export const addTestComment = async () => {
  try {
    console.log('🧪 Agregando comentario de prueba...');
    
    const testComment = {
      textContent: 'Este es un comentario de prueba desde la aplicación',
      authorName: 'Usuario de Prueba',
      authorEmail: 'test@example.com',
      authorPhoto: '',
      hotelId: 'test-hotel',
      rating: 5,
      status: true,
      timestamp: new Date()
    };
    
    const docRef = await addDoc(collection(db, 'Comments'), testComment);
    console.log('✅ Comentario de prueba agregado con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error al agregar comentario de prueba:', error);
    throw error;
  }
};
