import type { Service } from '@/shared/types/service';

export const services: Service[] = [
  {
    id: '1',
    name: 'WiFi Gratuito',
    description: 'Internet de alta velocidad en todas las áreas',
    iconType: 'wifi',
    available: true
  },
  {
    id: '2',
    name: 'Spa & Wellness',
    description: 'Relájate en nuestro centro de bienestar',
    iconType: 'spa',
    available: true
  },
  {
    id: '3',
    name: 'Restaurante',
    description: 'Gastronomía de clase mundial',
    iconType: 'restaurant',
    available: true
  },
  {
    id: '4',
    name: 'Concierge 24/7',
    description: 'Servicio de conserjería disponible las 24 horas',
    iconType: 'concierge',
    available: true
  }
];
