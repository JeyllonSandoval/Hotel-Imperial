# Nueva Estructura del Proyecto - Hotel Imperial

## 🏗️ Arquitectura Reorganizada

El proyecto ha sido completamente reorganizado siguiendo principios de **Domain-Driven Design** y **Clean Architecture** para mejorar la escalabilidad, mantenibilidad y experiencia del desarrollador.

## 📁 Estructura de Carpetas

```
src/
├── 📱 app/                          # Aplicación principal
│   ├── pages/                       # Páginas completas
│   │   ├── HomePage.tsx
│   │   └── index.ts
│   ├── layouts/                     # Layouts de aplicación
│   │   ├── MainLayout.tsx
│   │   └── index.ts
│   └── index.ts
│
├── 🧩 components/                   # Componentes reutilizables
│   ├── ui/                         # Componentes de interfaz base
│   │   ├── buttons/                # Botones
│   │   │   ├── Button.tsx
│   │   │   ├── AuthButton.tsx
│   │   │   └── index.ts
│   │   ├── cards/                  # Tarjetas
│   │   │   ├── RoomCard.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   └── index.ts
│   │   ├── forms/                  # Formularios
│   │   │   ├── CommentForm.tsx
│   │   │   └── index.ts
│   │   ├── feedback/               # Componentes de feedback
│   │   │   ├── PermissionError.tsx
│   │   │   └── index.ts
│   │   ├── layout/                 # Componentes de layout
│   │   │   ├── SectionHeader.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── features/                   # Componentes de funcionalidades específicas
│   │   ├── hero/                   # Sección hero
│   │   │   ├── HeroSection.tsx
│   │   │   └── index.ts
│   │   ├── rooms/                  # Gestión de habitaciones
│   │   │   ├── RoomsSection.tsx
│   │   │   └── index.ts
│   │   ├── services/               # Gestión de servicios
│   │   │   ├── ServicesSection.tsx
│   │   │   └── index.ts
│   │   ├── comments/               # Sistema de comentarios
│   │   │   ├── CommentsSection.tsx
│   │   │   ├── CommentsList.tsx
│   │   │   ├── CommentsHeader.tsx
│   │   │   ├── CommentItem.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── layout/                     # Componentes de layout
│   │   ├── Navbar.tsx
│   │   └── index.ts
│   │
│   └── index.ts
│
├── 🎯 domains/                     # Lógica de dominio
│   ├── auth/                       # Dominio de autenticación
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── comments/                   # Dominio de comentarios
│   │   ├── hooks/
│   │   │   ├── useComments.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── commentsService.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   └── index.ts
│
├── 🛠️ shared/                      # Código compartido
│   ├── types/                      # Tipos TypeScript
│   │   ├── common.ts
│   │   ├── room.ts
│   │   ├── service.ts
│   │   ├── comment.ts
│   │   └── index.ts
│   ├── utils/                      # Utilidades compartidas
│   │   ├── formatters.ts
│   │   ├── ui.tsx
│   │   └── index.ts
│   ├── constants/                  # Constantes
│   │   └── index.ts
│   ├── hooks/                      # Hooks compartidos
│   │   └── index.ts
│   └── index.ts
│
├── 📊 data/                        # Datos estáticos
│   ├── rooms.ts
│   ├── services.ts
│   └── index.ts
│
├── 🔧 lib/                         # Configuraciones externas
│   ├── firebase.ts
│   ├── firebase-config.ts
│   ├── auth.ts
│   ├── comments.ts
│   └── index.ts
│
└── 🎨 styles/                      # Estilos globales
    ├── colors.css
    └── globals.css
```

## 🎯 Principios Aplicados

### 1. **Domain-Driven Design (DDD)**
- **Separación por dominios**: Cada dominio (auth, comments) tiene su propia lógica
- **Hooks específicos**: `useAuth`, `useComments` encapsulan la lógica de dominio
- **Servicios de dominio**: Lógica de negocio separada de la presentación

### 2. **Clean Architecture**
- **app/**: Capa de presentación (páginas y layouts)
- **components/**: Componentes reutilizables organizados por tipo
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
- ✅ Fácil agregar nuevos dominios
- ✅ Componentes organizados por funcionalidad
- ✅ Estructura clara para equipos grandes

### **Mantenibilidad**
- ✅ Responsabilidades bien definidas
- ✅ Fácil localizar código relacionado
- ✅ Cambios aislados por dominio

### **Reutilización**
- ✅ Componentes UI verdaderamente reutilizables
- ✅ Hooks y servicios compartidos
- ✅ Lógica de dominio reutilizable

### **Testabilidad**
- ✅ Componentes pequeños y enfocados
- ✅ Lógica separada de presentación
- ✅ Fácil mockear dependencias

### **Developer Experience**
- ✅ Imports más claros y consistentes
- ✅ Estructura intuitiva
- ✅ Fácil onboarding para nuevos desarrolladores

## 🚀 Cómo Usar la Nueva Estructura

### Importar Componentes UI
```typescript
import { Button } from '@/components/ui/buttons/Button';
import { RoomCard } from '@/components/ui/cards/RoomCard';
import { CommentForm } from '@/components/ui/forms/CommentForm';
```

### Importar Features
```typescript
import { HeroSection } from '@/components/features/hero/HeroSection';
import { CommentsSection } from '@/components/features/comments/CommentsSection';
```

### Importar Hooks de Dominio
```typescript
import { useAuth } from '@/domains/auth/hooks/useAuth';
import { useComments } from '@/domains/comments/hooks/useComments';
```

### Importar Tipos
```typescript
import { User, Comment, Room, Service } from '@/shared/types';
```

### Importar Utilidades
```typescript
import { formatDate, formatRating } from '@/shared/utils/formatters';
import { StarRating } from '@/shared/utils/ui';
```

## 🔧 Migración Completada

- ✅ Estructura de carpetas reorganizada
- ✅ Componentes movidos a sus nuevas ubicaciones
- ✅ Imports actualizados
- ✅ Hooks reorganizados por dominio
- ✅ Tipos centralizados en shared
- ✅ Utilidades organizadas
- ✅ Archivos de índice creados

## 📝 Próximos Pasos

1. **Eliminar archivos antiguos** una vez verificado que todo funciona
2. **Agregar tests** para los nuevos hooks y componentes
3. **Documentar** cada dominio con ejemplos de uso
4. **Implementar** nuevos features siguiendo la nueva estructura
5. **Optimizar** imports y bundle size

La nueva estructura está lista para escalar y facilitar el desarrollo futuro del proyecto Hotel Imperial.
