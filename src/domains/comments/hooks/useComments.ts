import { useState, useEffect } from 'react';
import { addComment, getComments } from '@/lib/comments';
import { filterAndSortComments, calculateStats } from '../services/commentsService';
import { formatRating } from '@/shared/utils/formatters';
import { useAuth } from '@/domains/auth/hooks/useAuth';
import type { Comment, SortOption, FilterRating, User } from '@/shared/types';
import { db } from '@/lib/firebase';

interface UseCommentsProps {
  hotelId?: string;
}

export const useComments = ({ hotelId }: UseCommentsProps = {}) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterRating, setFilterRating] = useState<FilterRating>(null);
  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    loadComments();
  }, [hotelId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      setPermissionError(false);
      const commentsData = await getComments(db, hotelId);
      setComments(commentsData);
    } catch (error: any) {
      console.error('Error al cargar comentarios:', error);
      
      // Si es un error de permisos, mostrar componente de error
      if (error.code === 'permission-denied' || error.message?.includes('permissions')) {
        setPermissionError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (commentData: { textContent: string; rating: number }) => {
    if (!user) return;

    try {
      setSubmitting(true);
      await addComment(db, {
        textContent: commentData.textContent,
        authorName: user.displayName || 'Usuario Anónimo',
        authorEmail: user.email || '',
        authorPhoto: user.photoURL || undefined,
        hotelId,
        rating: commentData.rating,
        status: true
      });
      
      await loadComments(); // Recargar comentarios
    } catch (error) {
      console.error('Error al enviar comentario:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAndSortedComments = filterAndSortComments(comments, sortBy, filterRating);
  const stats = calculateStats(comments);
  const averageRating = formatRating(stats.averageRating);

  return {
    comments: filteredAndSortedComments,
    loading,
    submitting,
    permissionError,
    sortBy,
    filterRating,
    stats,
    averageRating,
    user,
    setSortBy,
    setFilterRating,
    handleSubmitComment,
    loadComments
  };
};
