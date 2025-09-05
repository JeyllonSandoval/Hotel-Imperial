// Tipos principales de la aplicación
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Comment {
  id?: string;
  textContent: string;
  authorName: string;
  authorEmail: string;
  authorPhoto?: string;
  timestamp: any; // Firebase Timestamp
  hotelId?: string;
  rating?: number;
  status?: boolean;
}

export interface NotificationData {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface Stats {
  totalComments: number;
  averageRating: number;
  ratingDistribution: { 5: number; 4: number; 3: number; 2: number; 1: number };
  recentComments: number;
}

export type SortOption = 'newest' | 'oldest' | 'rating';
export type FilterRating = number | null;
