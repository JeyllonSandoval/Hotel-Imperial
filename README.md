# 🏨 Hotel Imperial - Sistema de Comentarios

Un sistema completo de comentarios y reseñas para hoteles construido con Astro, React, Firebase y Tailwind CSS.

## ✨ Características Principales

### 🔐 Autenticación
- **Inicio de sesión con Google** - Autenticación segura y fácil
- **Gestión de sesiones** - Estado persistente del usuario
- **Perfil de usuario** - Información y foto de perfil

### 💬 Sistema de Comentarios
- **Comentarios con calificaciones** - Sistema de 5 estrellas
- **Filtros avanzados** - Por calificación y fecha
- **Ordenamiento** - Por fecha (nuevos/antiguos) y calificación
- **Interfaz intuitiva** - Diseño moderno y responsive

### 📊 Dashboard de Estadísticas
- **Estadísticas en tiempo real** - Total de comentarios y calificación promedio
- **Distribución de calificaciones** - Gráficos de barras visuales
- **Comentarios recientes** - Actividad de las últimas 24 horas
- **Estado general** - Evaluación automática del servicio

### 🎨 Diseño y UX
- **Responsive Design** - Funciona en móviles, tablets y desktop
- **Paleta de colores personalizada** - Tema dorado elegante
- **Animaciones suaves** - Transiciones y efectos visuales
- **Accesibilidad** - Diseño inclusivo y fácil de usar

## 🚀 Tecnologías Utilizadas

- **Astro** - Framework web moderno
- **React** - Biblioteca de componentes
- **TypeScript** - Tipado estático
- **Firebase** - Backend y autenticación
- **Firestore** - Base de datos NoSQL
- **Tailwind CSS** - Framework de estilos
- **Vite** - Herramienta de construcción

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── AuthButton.tsx   # Botón de autenticación
│   ├── CommentsSection.tsx  # Sistema de comentarios
│   ├── StatsDashboard.tsx   # Dashboard de estadísticas
│   └── ExampleUsage.tsx     # Ejemplo de uso
├── contexts/            # Contextos de React
│   └── AuthContext.tsx  # Contexto de autenticación
├── hooks/               # Hooks personalizados
│   └── useAuth.ts       # Hook de autenticación
├── lib/                 # Utilidades y configuración
│   ├── firebase.ts      # Configuración de Firebase
│   └── firebase-config.example.ts  # Ejemplo de configuración
├── layouts/             # Layouts de Astro
│   └── Layout.astro     # Layout principal
├── pages/               # Páginas de Astro
│   └── index.astro      # Página principal
└── styles/              # Estilos globales
    └── colors.css       # Variables de colores
```

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd hotel-imperial
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Authentication con Google
4. Configura Firestore Database
5. Obtén las credenciales de configuración

### 4. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=tu-app-id
```

### 5. Configurar reglas de Firestore
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /comments/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 6. Ejecutar el proyecto
```bash
npm run dev
```

## 📱 Funcionalidades Detalladas

### Sistema de Comentarios
- **Formulario inteligente** - Validación en tiempo real
- **Calificaciones visuales** - Estrellas interactivas
- **Filtros dinámicos** - Por calificación y ordenamiento
- **Comentarios en tiempo real** - Actualización automática

### Dashboard de Estadísticas
- **Métricas clave** - Total, promedio, actividad reciente
- **Visualizaciones** - Gráficos de distribución
- **Estado general** - Evaluación automática
- **Tiempo real** - Actualización continua

### Autenticación
- **Google OAuth** - Inicio de sesión seguro
- **Gestión de sesiones** - Persistencia automática
- **Perfil de usuario** - Información personalizada
- **Cierre de sesión** - Gestión segura

## 🎨 Personalización

### Colores
Los colores se pueden personalizar en `src/styles/colors.css`:

```css
:root {
  --color-primary: #ecab0f;        /* Dorado principal */
  --color-primary-dark: #6e4e00;   /* Dorado oscuro */
  --color-background: #1a1a1a;     /* Fondo oscuro */
  --color-text: #f5f5dc;           /* Texto claro */
  --color-gray-dark: #2a2a2a;      /* Gris oscuro */
  --color-gray-medium: #404040;    /* Gris medio */
}
```

### Componentes
Todos los componentes son modulares y reutilizables:
- `AuthButton` - Botón de autenticación
- `CommentsSection` - Sistema completo de comentarios
- `StatsDashboard` - Dashboard de estadísticas
- `AuthProvider` - Contexto de autenticación

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Netlify
1. Conecta tu repositorio a Netlify
2. Configura las variables de entorno
3. Despliega con `npm run build`

### Firebase Hosting
1. Instala Firebase CLI
2. Configura el proyecto
3. Despliega con `firebase deploy`

## 📊 Estructura de Datos

### Comentarios (Firestore)
```javascript
{
  text: string,           // Contenido del comentario
  author: string,         // Nombre del autor
  authorEmail: string,    // Email del autor
  authorPhoto: string,    // URL de la foto (opcional)
  timestamp: Timestamp,   // Fecha y hora
  hotelId: string,        // ID del hotel (opcional)
  rating: number          // Calificación 1-5
}
```

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run preview` - Vista previa de producción
- `npm run astro` - CLI de Astro

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:
1. Revisa la documentación de Firebase
2. Consulta los issues del repositorio
3. Crea un nuevo issue con detalles del problema

## 🎯 Roadmap

- [ ] Moderación de comentarios
- [ ] Notificaciones en tiempo real
- [ ] Sistema de respuestas
- [ ] Exportación de datos
- [ ] API REST
- [ ] Panel de administración
- [ ] Integración con redes sociales
- [ ] Sistema de recompensas

---

**Desarrollado con ❤️ para Hotel Imperial**