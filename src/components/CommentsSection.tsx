import React, { useState, useEffect } from 'react';
import { addComment, getComments } from '../lib/firebase';
import type { Comment } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import { PermissionError } from './PermissionError';

interface CommentsSectionProps {
  hotelId?: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ hotelId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    loadComments();
  }, [hotelId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      setPermissionError(false);
      const commentsData = await getComments(hotelId);
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

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !newComment.trim()) return;

    try {
      setSubmitting(true);
      await addComment({
        textContent: newComment.trim(),
        authorName: user.displayName || 'Usuario Anónimo',
        authorEmail: user.email || '',
        authorPhoto: user.photoURL || undefined,
        hotelId,
        rating,
        status: true
      });
      
      setNewComment('');
      setRating(5);
      await loadComments(); // Recargar comentarios
    } catch (error) {
      console.error('Error al enviar comentario:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAndSortedComments = comments
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

  const averageRating = comments.length > 0 
    ? (comments.reduce((sum, comment) => sum + (comment.rating || 0), 0) / comments.length).toFixed(1)
    : '0.0';

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className={`flex space-x-1 ${interactive ? 'cursor-pointer' : ''}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-2xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } ${interactive ? 'hover:text-yellow-400' : ''}`}
            onClick={interactive ? () => setRating(star) : undefined}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (timestamp: any) => {
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
      {/* Header con estadísticas */}
      <div className="bg-gray-dark rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 className="text-3xl font-bold text-primary mb-2">Comentarios de Huéspedes</h3>
            <p className="text-gray-medium">Comparte tu experiencia y ayuda a otros viajeros</p>
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end space-x-2 mb-2">
              <span className="text-3xl font-bold text-primary">{averageRating}</span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-xl ${
                      star <= parseFloat(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-medium">{comments.length} comentarios</p>
          </div>
        </div>

        {/* Filtros y ordenamiento */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text mb-2">Filtrar por calificación:</label>
            <select
              value={filterRating || ''}
              onChange={(e) => setFilterRating(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full px-3 py-2 bg-gray-medium text-text rounded-lg border border-gray-medium focus:border-primary focus:outline-none"
            >
              <option value="">Todas las calificaciones</option>
              <option value="5">5 estrellas</option>
              <option value="4">4 estrellas</option>
              <option value="3">3 estrellas</option>
              <option value="2">2 estrellas</option>
              <option value="1">1 estrella</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-text mb-2">Ordenar por:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'rating')}
              className="w-full px-3 py-2 bg-gray-medium text-text rounded-lg border border-gray-medium focus:border-primary focus:outline-none"
            >
              <option value="newest">Más recientes</option>
              <option value="oldest">Más antiguos</option>
              <option value="rating">Mejor calificados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Formulario para agregar comentario */}
      {user ? (
        <div className="bg-gray-dark rounded-lg p-6 mb-8">
          <h4 className="text-xl font-semibold text-primary mb-4">Deja tu comentario</h4>
          <form onSubmit={handleSubmitComment}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-text mb-2">
                Califica tu experiencia
              </label>
              {renderStars(rating, true)}
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-text mb-2">
                Escribe tu comentario
              </label>
              <textarea
                id="comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Comparte los detalles de tu estadía en Hotel Imperial..."
                className="w-full px-4 py-3 bg-gray-medium text-text rounded-lg border border-gray-medium focus:border-primary focus:outline-none resize-none"
                rows={4}
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="bg-primary hover:bg-primary-dark disabled:bg-gray-medium disabled:cursor-not-allowed text-background px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
              {submitting ? 'Enviando...' : 'Publicar Comentario'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-gray-medium rounded-lg p-6 mb-8 text-center">
          <p className="text-text mb-4">Inicia sesión con Google para dejar un comentario</p>
        </div>
      )}

      {/* Lista de comentarios */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-text">Cargando comentarios...</span>
        </div>
      ) : filteredAndSortedComments.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-gray-medium text-lg">
            {filterRating ? `No hay comentarios con ${filterRating} estrellas` : 'No hay comentarios aún. ¡Sé el primero en comentar!'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredAndSortedComments.map((comment) => (
            <div key={comment.id} className="bg-gray-dark rounded-lg p-6 hover:bg-gray-medium transition-colors duration-200">
              <div className="flex items-start space-x-4">
                {comment.authorPhoto ? (
                  <img
                    src={comment.authorPhoto}
                    alt={comment.authorName}
                    className="w-12 h-12 rounded-full flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-background font-semibold text-lg">
                      {comment.authorName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-text text-lg">{comment.authorName}</h4>
                      <span className="text-sm text-gray-medium">
                        {formatDate(comment.timestamp)}
                      </span>
                    </div>
                    {comment.rating && (
                      <div className="mt-2 sm:mt-0">
                        {renderStars(comment.rating)}
                      </div>
                    )}
                  </div>
                  <p className="text-text leading-relaxed text-base">{comment.textContent}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
