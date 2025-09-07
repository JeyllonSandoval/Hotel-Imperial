# Arquitectura de Componentes - Hotel Imperial

## 🏗️ Estructura de Componentes

```
📦 Hotel Imperial Components
├── 🏠 pages/
│   └── HomePage.tsx          # Página principal que orquesta todo
├── 🧩 sections/
│   ├── HeroSection.tsx       # Sección hero con imagen de fondo
│   ├── RoomsSection.tsx      # Sección de habitaciones
│   ├── ServicesSection.tsx   # Sección de servicios
│   └── index.ts             # Exports centralizados
├── 🎨 ui/
│   ├── Button.tsx           # Botón reutilizable con variantes
│   ├── SectionHeader.tsx    # Encabezado de sección
│   ├── RoomCard.tsx         # Tarjeta de habitación
│   ├── ServiceCard.tsx      # Tarjeta de servicio
│   ├── AuthButton.tsx       # Botón de autenticación
│   ├── PermissionError.tsx  # Error de permisos
│   └── index.ts            # Exports centralizados
├── 📊 data/
│   ├── rooms.ts            # Datos de habitaciones
│   └── services.ts         # Datos de servicios
└── 🧭 layout/
    ├── Navbar.tsx          # Barra de navegación
    └── index.ts           # Exports centralizados
```

## 🔄 Flujo de Datos

```
📄 index.astro
    ↓
🏠 HomePage.tsx
    ├── 🧩 HeroSection.tsx
    │   └── 🎨 Button.tsx (2x)
    ├── 🧩 RoomsSection.tsx
    │   ├── 🎨 SectionHeader.tsx
    │   └── 🎨 RoomCard.tsx (3x) ← 📊 rooms.ts
    └── 🧩 ServicesSection.tsx
        ├── 🎨 SectionHeader.tsx
        └── 🎨 ServiceCard.tsx (4x) ← 📊 services.ts
```

## 🎯 Principios Aplicados

### 1. **Single Responsibility Principle**
- Cada componente tiene una responsabilidad específica
- `HeroSection` solo maneja el hero
- `RoomCard` solo muestra una habitación
- `Button` solo maneja interacciones de botón

### 2. **Composition over Inheritance**
- `HomePage` compone `HeroSection`, `RoomsSection`, `ServicesSection`
- `RoomsSection` compone múltiples `RoomCard`
- `ServicesSection` compone múltiples `ServiceCard`

### 3. **Data Separation**
- Datos en archivos separados (`rooms.ts`, `services.ts`)
- Componentes solo manejan presentación
- Fácil modificación de datos sin tocar componentes

### 4. **Reusability**
- `Button` con variantes (primary, secondary, outline)
- `SectionHeader` reutilizable en todas las secciones
- `RoomCard` y `ServiceCard` genéricos

## 🎨 Patrones de Diseño

### Container/Presentational Pattern
```
Container (Sections)     Presentational (UI)
├── RoomsSection.tsx  →  ├── RoomCard.tsx
├── ServicesSection.tsx → ├── ServiceCard.tsx
└── HeroSection.tsx   →  └── Button.tsx
```

### Props Interface Pattern
```typescript
interface RoomCardProps {
  room: Room;
  onViewDetails?: (roomId: string) => void;
}
```

### Data-Driven Pattern
```typescript
// Datos centralizados
const rooms: Room[] = [...];

// Componente consume datos
{rooms.map(room => <RoomCard key={room.id} room={room} />)}
```

## 🔧 Ventajas de esta Estructura

### ✅ **Mantenibilidad**
- Fácil encontrar y modificar componentes
- Cambios aislados en componentes específicos
- Datos centralizados y fáciles de actualizar

### ✅ **Escalabilidad**
- Fácil agregar nuevas secciones
- Componentes reutilizables para nuevas páginas
- Estructura clara para nuevos desarrolladores

### ✅ **Testabilidad**
- Componentes pequeños y enfocados
- Props bien definidas
- Lógica separada de presentación

### ✅ **Reutilización**
- Componentes UI genéricos
- Patrones consistentes
- Código DRY (Don't Repeat Yourself)

## 🚀 Próximos Pasos

1. **Agregar más secciones**: About, Contact, Gallery
2. **Implementar modales**: Para detalles de habitaciones
3. **Agregar animaciones**: Con Framer Motion
4. **Implementar routing**: Para páginas adicionales
5. **Agregar tests**: Unit tests para componentes
6. **Optimizar performance**: Lazy loading, memoización
