import React, { useState, useEffect } from 'react';
import { addComment, getComments } from '../lib/comments';
import { filterAndSortComments, calculateStats } from '../utils/comments';
import { formatRating } from '../utils/formatters';
import { useAuth } from '../hooks/useAuth';
import { PermissionError } from './PermissionError';
import { CommentForm } from './comments/CommentForm';
import { CommentsHeader } from './comments/CommentsHeader';
import { CommentsList } from './comments/CommentsList';
import type { Comment, SortOption, FilterRating } from '../types';
import { db } from '../lib/firebase';

interface CommentsSectionProps {
  hotelId?: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ hotelId }) => {
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


  // Si hay error de permisos, mostrar componente de error
  if (permissionError) {
    return (
      <div className="max-w-6xl mx-auto">
        <PermissionError />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <CommentsHeader
        averageRating={averageRating}
        totalComments={comments.length}
        sortBy={sortBy}
        filterRating={filterRating}
        onSortChange={setSortBy}
        onFilterChange={setFilterRating}
      />

      {user ? (
        <CommentForm
          user={user}
          onSubmit={handleSubmitComment}
          submitting={submitting}
        />
      ) : (
        <div className="bg-gray-medium rounded-lg p-6 mb-8 text-center">
          <p className="text-text mb-4">Inicia sesión con Google para dejar un comentario</p>
        </div>
      )}

      <CommentsList
        comments={filteredAndSortedComments}
        loading={loading}
        filterRating={filterRating}
      />
    </div>
  );
};
