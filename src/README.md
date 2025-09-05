# Hotel Imperial - Estructura del Código

## 📁 Estructura de Directorios

```
src/
├── components/           # Componentes React
│   ├── comments/        # Componentes específicos de comentarios
│   │   ├── CommentForm.tsx
│   │   ├── CommentItem.tsx
│   │   ├── CommentsHeader.tsx
│   │   └── CommentsList.tsx
│   ├── AuthButton.tsx
│   ├── CommentsSection.tsx
│   ├── PermissionError.tsx
│   └── StatsDashboard.tsx
├── contexts/            # Contextos de React
│   └── AuthContext.tsx
├── hooks/               # Hooks personalizados
│   └── useAuth.ts
├── lib/                 # Configuración y servicios
│   ├── auth.ts          # Funciones de autenticación
│   ├── comments.ts      # Funciones de comentarios
│   ├── firebase.ts      # Configuración de Firebase
│   └── firebase-config.ts
├── types/               # Definiciones de tipos TypeScript
│   ├── index.ts
│   └── firebase.d.ts
├── utils/               # Utilidades y helpers
│   ├── comments.ts      # Lógica de comentarios
│   ├── formatters.ts    # Funciones de formateo
│   └── ui.tsx           # Componentes UI reutilizables
└── index.ts             # Exportaciones principales
```

## 🎯 Principios de Organización

### 1. **Separación de Responsabilidades**
- **`lib/`**: Lógica de negocio y servicios externos
- **`components/`**: Componentes de UI
- **`utils/`**: Funciones auxiliares y helpers
- **`types/`**: Definiciones de tipos TypeScript

### 2. **Componentes Modulares**
- Cada componente tiene una responsabilidad específica
- Componentes grandes se dividen en subcomponentes más pequeños
- Reutilización de componentes comunes

### 3. **Tipos Centralizados**
- Todos los tipos están definidos en `types/index.ts`
- Evita duplicación de definiciones
- Facilita el mantenimiento

### 4. **Utilidades Especializadas**
- **`formatters.ts`**: Formateo de fechas, números, etc.
- **`comments.ts`**: Lógica específica de comentarios
- **`ui.tsx`**: Componentes UI reutilizables

## 🔧 Componentes Principales

### CommentsSection
Componente principal que orquesta toda la funcionalidad de comentarios:
- Maneja el estado global
- Coordina los subcomponentes
- Gestiona la lógica de negocio

### Subcomponentes de Comentarios
- **CommentForm**: Formulario para crear comentarios
- **CommentItem**: Item individual de comentario
- **CommentsHeader**: Header con filtros y estadísticas
- **CommentsList**: Lista de comentarios con estados de carga

## 🚀 Beneficios de la Nueva Estructura

1. **Mantenibilidad**: Código más fácil de mantener y actualizar
2. **Escalabilidad**: Fácil agregar nuevas funcionalidades
3. **Reutilización**: Componentes y utilidades reutilizables
4. **Testabilidad**: Componentes más pequeños y enfocados
5. **Legibilidad**: Código más limpio y organizado
6. **Colaboración**: Estructura clara para trabajo en equipo

## 📝 Convenciones

- **Nombres de archivos**: PascalCase para componentes, camelCase para utilidades
- **Exports**: Usar exportaciones nombradas
- **Imports**: Agrupar por tipo (React, librerías, locales)
- **Tipos**: Definir interfaces para props de componentes
- **Comentarios**: Documentar funciones complejas y lógica de negocio
