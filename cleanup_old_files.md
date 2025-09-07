# Archivos a Eliminar Después de Verificar la Nueva Estructura

## Archivos que ya no se necesitan (una vez verificado que todo funciona):

### Tipos antiguos
- `src/types/index.ts`
- `src/types/room.ts`
- `src/types/service.ts`
- `src/types/firebase.d.ts`

### Utilidades antiguas
- `src/utils/formatters.ts`
- `src/utils/ui.tsx`
- `src/utils/comments.ts`

### Hooks antiguos
- `src/hooks/useAuth.ts`

### Contextos antiguos
- `src/contexts/AuthContext.tsx`

### Componentes antiguos
- `src/components/pages/HomePage.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/RoomsSection.tsx`
- `src/components/sections/ServicesSection.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/AuthButton.tsx`
- `src/components/ui/RoomCard.tsx`
- `src/components/ui/ServiceCard.tsx`
- `src/components/ui/SectionHeader.tsx`
- `src/components/ui/PermissionError.tsx`
- `src/components/features/CommentsSection.tsx`
- `src/components/features/comments/CommentForm.tsx`
- `src/components/features/comments/CommentItem.tsx`
- `src/components/features/comments/CommentsHeader.tsx`
- `src/components/features/comments/CommentsList.tsx`

### Carpetas vacías a eliminar
- `src/components/pages/`
- `src/components/sections/`
- `src/components/features/comments/` (si está vacía)
- `src/hooks/`
- `src/contexts/`
- `src/types/` (si está vacía)
- `src/utils/` (si está vacía)

## Comandos para limpiar (ejecutar solo después de verificar que todo funciona):

```bash
# Eliminar archivos de tipos antiguos
rm -rf src/types/
rm -rf src/utils/
rm -rf src/hooks/
rm -rf src/contexts/

# Eliminar componentes antiguos
rm -rf src/components/pages/
rm -rf src/components/sections/
rm -rf src/components/features/comments/

# Eliminar archivos individuales
rm src/components/ui/Button.tsx
rm src/components/ui/AuthButton.tsx
rm src/components/ui/RoomCard.tsx
rm src/components/ui/ServiceCard.tsx
rm src/components/ui/SectionHeader.tsx
rm src/components/ui/PermissionError.tsx
rm src/components/features/CommentsSection.tsx
```

## Verificación antes de limpiar:

1. ✅ Verificar que la aplicación compila sin errores
2. ✅ Verificar que todos los imports funcionan correctamente
3. ✅ Verificar que la funcionalidad de autenticación funciona
4. ✅ Verificar que los comentarios se cargan correctamente
5. ✅ Verificar que las habitaciones y servicios se muestran
6. ✅ Verificar que el navbar funciona correctamente

## Nota importante:
**NO ejecutar estos comandos hasta que se haya verificado completamente que la nueva estructura funciona correctamente.**
