// Ejemplo de configuración de Firebase
// Copia este archivo como firebase-config.ts y reemplaza los valores

export const firebaseConfigExample = {
  apiKey: "AIzaSyC...", // Tu API Key de Firebase
  authDomain: "tu-proyecto.firebaseapp.com", // Tu dominio de autenticación
  projectId: "tu-proyecto-id", // Tu ID de proyecto
  storageBucket: "tu-proyecto.appspot.com", // Tu bucket de almacenamiento
  messagingSenderId: "123456789", // Tu Sender ID
  appId: "1:123456789:web:abcdef..." // Tu App ID
};

// Instrucciones:
// 1. Ve a https://console.firebase.google.com/
// 2. Selecciona tu proyecto o crea uno nuevo
// 3. Ve a Configuración del proyecto (ícono de engranaje)
// 4. En "Tus aplicaciones", selecciona "Web" (ícono </>)
// 5. Registra tu aplicación con el nombre "Hotel Imperial Web"
// 6. Copia las credenciales y reemplaza los valores arriba
// 7. Crea un archivo .env en la raíz del proyecto con:
//    VITE_FIREBASE_API_KEY=tu-api-key
//    VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
//    VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
//    VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
//    VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
//    VITE_FIREBASE_APP_ID=tu-app-id
