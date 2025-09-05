import type { Comment, SortOption, FilterRating, Stats } from '../types';

// Función para filtrar y ordenar comentarios
export const filterAndSortComments = (
  comments: Comment[],
  sortBy: SortOption,
  filterRating: FilterRating
): Comment[] => {
  return comments
    .filter(comment => !filterRating || comment.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime();
        case 'oldest':
          return a.timestamp.toDate().getTime() - b.timestamp.toDate().getTime();
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
};

// Función para calcular estadísticas de comentarios
export const calculateStats = (comments: Comment[]): Stats => {
  const now = new Date();
  const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const totalComments = comments.length;
  const averageRating = totalComments > 0 
    ? comments.reduce((sum, comment) => sum + (comment.rating || 0), 0) / totalComments
    : 0;

  const ratingDistribution = comments.reduce((dist, comment) => {
    const rating = comment.rating || 0;
    if (rating >= 1 && rating <= 5) {
      dist[rating as keyof typeof dist]++;
    }
    return dist;
  }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

  const recentComments = comments.filter(comment => {
    const commentDate = comment.timestamp.toDate();
    return commentDate >= last24Hours;
  }).length;

  return {
    totalComments,
    averageRating,
    ratingDistribution,
    recentComments
  };
};

// Función para calcular el porcentaje de una calificación
export const getRatingPercentage = (rating: number, totalComments: number): number => {
  if (totalComments === 0) return 0;
  return Math.round((rating / totalComments) * 100);
};
