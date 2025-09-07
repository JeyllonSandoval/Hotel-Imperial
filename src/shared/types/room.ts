export interface Room {
  id: string;
  name: string;
  description: string;
  price: string;
  iconType: 'suite' | 'deluxe' | 'standard';
  features: string[];
  size: string;
  capacity: string;
}

export type RoomIconType = Room['iconType'];
