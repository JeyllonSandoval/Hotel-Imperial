# Nueva Arquitectura de Componentes - Hotel Imperial

## 🏗️ Estructura Propuesta

```
src/
├── 📱 app/                          # Aplicación principal
│   ├── pages/                       # Páginas completas
│   │   ├── HomePage.tsx
│   │   └── index.ts
│   └── layouts/                     # Layouts de aplicación
│       ├── MainLayout.tsx
│       └── index.ts
│
├── 🧩 components/                   # Componentes reutilizables
│   ├── ui/                         # Componentes de interfaz base
│   │   ├── buttons/
│   │   │   ├── Button.tsx
│   │   │   ├── AuthButton.tsx
│   │   │   └── index.ts
│   │   ├── cards/
│   │   │   ├── RoomCard.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   └── index.ts
│   │   ├── forms/
│   │   │   ├── CommentForm.tsx
│   │   │   └── index.ts
│   │   ├── feedback/
│   │   │   ├── PermissionError.tsx
│   │   │   └── index.ts
│   │   ├── layout/
│   │   │   ├── SectionHeader.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── features/                   # Componentes de funcionalidades específicas
│   │   ├── auth/
│   │   │   ├── AuthProvider.tsx
│   │   │   ├── AuthButton.tsx
│   │   │   └── index.ts
│   │   ├── comments/
│   │   │   ├── CommentsSection.tsx
│   │   │   ├── CommentsList.tsx
│   │   │   ├── CommentsHeader.tsx
│   │   │   ├── CommentItem.tsx
│   │   │   └── index.ts
│   │   ├── rooms/
│   │   │   ├── RoomsSection.tsx
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── ServicesSection.tsx
│   │   │   └── index.ts
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   └── layout/                     # Componentes de layout
│       ├── Navbar.tsx
│       └── index.ts
│
├── 🎯 domains/                     # Lógica de dominio
│   ├── auth/
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   └── index.ts
│   ├── comments/
│   │   ├── hooks/
│   │   │   └── useComments.ts
│   │   ├── services/
│   │   │   └── commentsService.ts
│   │   └── index.ts
│   └── index.ts
│
├── 🛠️ shared/                      # Código compartido
│   ├── hooks/                      # Hooks compartidos
│   │   └── index.ts
│   ├── utils/                      # Utilidades compartidas
│   │   ├── formatters.ts
│   │   ├── ui.tsx
│   │   └── index.ts
│   ├── constants/                  # Constantes
│   │   └── index.ts
│   └── types/                      # Tipos compartidos
│       ├── common.ts
│       ├── room.ts
│       ├── service.ts
│       ├── comment.ts
│       └── index.ts
│
├── 📊 data/                        # Datos estáticos
│   ├── rooms.ts
│   ├── services.ts
│   └── index.ts
│
├── 🔧 lib/                         # Configuraciones externas
│   ├── firebase.ts
│   ├── firebase-config.ts
│   └── index.ts
│
└── 🎨 styles/                      # Estilos globales
    ├── colors.css
    └── globals.css
```

## 🎯 Principios Aplicados

### 1. **Domain-Driven Design (DDD)**
- Separación por dominios de negocio (auth, comments, rooms, services)
- Cada dominio tiene su propia lógica, hooks y servicios
- Componentes de features organizados por dominio

### 2. **Clean Architecture**
- **app/**: Capa de presentación (páginas y layouts)
- **components/**: Componentes reutilizables
- **domains/**: Lógica de negocio y estado
- **shared/**: Código compartido entre dominios
- **lib/**: Configuraciones externas

### 3. **Atomic Design**
- **UI Components**: Átomos y moléculas reutilizables
- **Feature Components**: Organismos específicos de funcionalidad
- **Page Components**: Templates completos

### 4. **Separation of Concerns**
- **Presentación**: Solo UI y interacciones
- **Lógica**: Hooks y servicios en dominios
- **Datos**: Servicios y utilidades separados
- **Estado**: Contextos y hooks específicos

## 🔄 Flujo de Datos Mejorado

```
📄 index.astro
    ↓
🏠 HomePage (app/pages)
    ├── 🧩 HeroSection (components/features/hero)
    │   └── 🎨 Button (components/ui/buttons)
    ├── 🧩 RoomsSection (components/features/rooms)
    │   ├── 🎨 SectionHeader (components/ui/layout)
    │   └── 🎨 RoomCard (components/ui/cards) ← 📊 rooms.ts
    ├── 🧩 ServicesSection (components/features/services)
    │   ├── 🎨 SectionHeader (components/ui/layout)
    │   └── 🎨 ServiceCard (components/ui/cards) ← 📊 services.ts
    └── 🧩 CommentsSection (components/features/comments)
        ├── 🎯 useComments (domains/comments/hooks)
        ├── 🎨 CommentForm (components/ui/forms)
        └── 🎨 CommentItem (components/features/comments)
```

## ✅ Ventajas de la Nueva Estructura

### **Escalabilidad**
- Fácil agregar nuevos dominios
- Componentes organizados por funcionalidad
- Estructura clara para equipos grandes

### **Mantenibilidad**
- Responsabilidades bien definidas
- Fácil localizar código relacionado
- Cambios aislados por dominio

### **Reutilización**
- Componentes UI verdaderamente reutilizables
- Hooks y servicios compartidos
- Lógica de dominio reutilizable

### **Testabilidad**
- Componentes pequeños y enfocados
- Lógica separada de presentación
- Fácil mockear dependencias

### **Developer Experience**
- Imports más claros y consistentes
- Estructura intuitiva
- Fácil onboarding para nuevos desarrolladores

## 🚀 Plan de Migración

1. **Crear nueva estructura de carpetas**
2. **Mover componentes por categorías**
3. **Actualizar imports y exports**
4. **Reorganizar hooks y servicios**
5. **Actualizar documentación**
6. **Verificar funcionamiento**
