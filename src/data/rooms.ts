import type { Room } from '@/shared/types/room';

export const rooms: Room[] = [
  {
    id: '1',
    name: 'Suite Imperial',
    description: 'Una suite de lujo con vista panorámica, jacuzzi privado y todas las comodidades modernas.',
    price: '$299/noche',
    iconType: 'suite',
    features: ['Jacuzzi privado', 'Vista panorámica', 'Minibar premium', 'Servicio de habitaciones 24/7'],
    size: '85 m²',
    capacity: '2-4 personas'
  },
  {
    id: '2',
    name: 'Habitación Deluxe',
    description: 'Amplia habitación con cama king size, minibar y balcón privado con vista a la ciudad.',
    price: '$199/noche',
    iconType: 'deluxe',
    features: ['Balcón privado', 'Cama king size', 'Minibar', 'WiFi de alta velocidad'],
    size: '45 m²',
    capacity: '2 personas'
  },
  {
    id: '3',
    name: 'Habitación Estándar',
    description: 'Cómoda habitación con todas las comodidades necesarias para una estancia placentera.',
    price: '$149/noche',
    iconType: 'standard',
    features: ['TV de pantalla plana', 'Aire acondicionado', 'Baño privado', 'WiFi gratuito'],
    size: '30 m²',
    capacity: '1-2 personas'
  }
];
