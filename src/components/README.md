# Componentes - Hotel Imperial

Esta carpeta contiene todos los componentes reutilizables del proyecto, organizados por categorías para facilitar el mantenimiento y la navegación.

## Estructura de Carpetas

### 📁 `ui/`
Componentes de interfaz de usuario básicos y reutilizables:
- `AuthButton.tsx` - Botón de autenticación con Google
- `PermissionError.tsx` - Componente para mostrar errores de permisos

### 📁 `layout/`
Componentes relacionados con la estructura y disposición de la página:
- `Navbar.tsx` - Barra de navegación principal

### 📁 `features/`
Componentes específicos de funcionalidades del negocio:
- `CommentsSection.tsx` - Sección principal de comentarios
- `StatsDashboard.tsx` - Dashboard de estadísticas
- `comments/` - Subcomponentes del sistema de comentarios:
  - `CommentForm.tsx` - Formulario para crear comentarios
  - `CommentItem.tsx` - Item individual de comentario
  - `CommentsHeader.tsx` - Encabezado de la sección de comentarios
  - `CommentsList.tsx` - Lista de comentarios


## Convenciones

### Nomenclatura
- Los archivos de componentes usan PascalCase: `ComponentName.tsx`
- Los archivos de índice usan `index.ts` para exportaciones
- Los componentes Astro mantienen la extensión `.astro`

### Importaciones
```typescript
// Importación individual con alias @
import { AuthButton } from '@/components/ui/AuthButton';

// Importación desde el índice de categoría
import { AuthButton, PermissionError } from '@/components/ui';

// Importación desde el índice principal
import { AuthButton, Navbar, CommentsSection } from '@/components';
```

### Estructura de Componentes
- Cada componente debe tener su propio archivo
- Los componentes complejos pueden tener subcarpetas con subcomponentes
- Usar TypeScript para tipado fuerte
- Seguir las convenciones de React/Astro según corresponda

## Beneficios de esta Estructura

1. **Organización clara**: Fácil localización de componentes por función
2. **Escalabilidad**: Fácil agregar nuevos componentes sin desorden
3. **Mantenibilidad**: Separación de responsabilidades
4. **Reutilización**: Componentes bien organizados y documentados
5. **Importaciones limpias**: Sistema de índices para importaciones más claras
