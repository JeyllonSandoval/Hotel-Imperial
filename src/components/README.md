# Estructura de Componentes - Hotel Imperial

## 📁 Organización de Archivos

```
src/components/
├── sections/           # Componentes de secciones principales
│   ├── HeroSection.tsx
│   ├── RoomsSection.tsx
│   ├── ServicesSection.tsx
│   └── index.ts
├── ui/                 # Componentes de interfaz reutilizables
│   ├── Button.tsx
│   ├── SectionHeader.tsx
│   ├── RoomCard.tsx
│   ├── ServiceCard.tsx
│   ├── AuthButton.tsx
│   ├── PermissionError.tsx
│   └── index.ts
├── pages/              # Componentes de páginas completas
│   ├── HomePage.tsx
│   └── index.ts
├── layout/             # Componentes de layout
│   ├── Navbar.tsx
│   └── index.ts
└── features/           # Componentes de funcionalidades específicas
    ├── comments/
    ├── CommentsSection.tsx
    ├── StatsDashboard.tsx
    └── index.ts
```

## 🧩 Componentes por Categoría

### Secciones (sections/)
- **HeroSection**: Sección principal con imagen de fondo y call-to-action
- **RoomsSection**: Muestra las habitaciones disponibles
- **ServicesSection**: Lista los servicios del hotel

### UI Reutilizables (ui/)
- **Button**: Botón genérico con variantes (primary, secondary, outline)
- **SectionHeader**: Encabezado estándar para secciones
- **RoomCard**: Tarjeta individual de habitación
- **ServiceCard**: Tarjeta individual de servicio
- **AuthButton**: Botón de autenticación
- **PermissionError**: Componente de error de permisos

### Páginas (pages/)
- **HomePage**: Página principal que combina todas las secciones

### Layout (layout/)
- **Navbar**: Barra de navegación principal

## 📊 Datos (data/)
```
src/data/
├── rooms.ts           # Información de habitaciones
└── services.ts        # Información de servicios
```

## 🎯 Principios de Diseño

### 1. **Separación de Responsabilidades**
- Cada componente tiene una responsabilidad específica
- Los datos están separados de la lógica de presentación
- Los componentes UI son reutilizables

### 2. **Composición**
- Los componentes se componen entre sí
- HomePage combina HeroSection, RoomsSection y ServicesSection
- Las secciones usan componentes UI reutilizables

### 3. **Props y Interfaces**
- Todos los componentes tienen interfaces TypeScript bien definidas
- Props opcionales con valores por defecto
- Callbacks para manejar eventos

### 4. **Reutilización**
- Componentes UI genéricos (Button, SectionHeader)
- Datos centralizados en archivos separados
- Estilos consistentes con Tailwind CSS

## 🔧 Uso de Componentes

### Importar un componente:
```typescript
import { HeroSection } from '@/components/sections/HeroSection';
import { Button } from '@/components/ui/Button';
```

### Usar en Astro:
```astro
---
import { HomePage } from '@/components/pages/HomePage';
---

<HomePage client:load />
```

### Pasar props:
```typescript
<RoomCard 
  room={room} 
  onViewDetails={handleViewDetails}
/>
```

## 🎨 Estilos

- **Tailwind CSS** para estilos utilitarios
- **Variables CSS** personalizadas en `colors.css`
- **Responsive design** con breakpoints móviles
- **Animaciones** suaves con transiciones CSS
- **Tema oscuro** con colores dorados (#ECAB0F)

## 📱 Responsive

Todos los componentes están diseñados para ser responsive:
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: sm, md, lg para diferentes tamaños
- **Grid System**: CSS Grid para layouts flexibles
- **Flexbox**: Para alineación y distribución