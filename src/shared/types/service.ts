export interface Service {
  id: string;
  name: string;
  description: string;
  iconType: 'wifi' | 'spa' | 'restaurant' | 'concierge';
  available: boolean;
}

export type ServiceIconType = Service['iconType'];
