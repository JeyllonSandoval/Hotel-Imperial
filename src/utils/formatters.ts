// Utilidades para formateo de datos
export const formatDate = (timestamp: any): string => {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const getRatingLabel = (rating: number): string => {
  if (rating >= 4.5) return 'Excelente';
  if (rating >= 4) return 'Muy Bueno';
  if (rating >= 3) return 'Bueno';
  return 'Regular';
};
