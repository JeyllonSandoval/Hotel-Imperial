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
