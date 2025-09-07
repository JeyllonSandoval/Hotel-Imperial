// Tipos comunes compartidos en toda la aplicación
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
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
