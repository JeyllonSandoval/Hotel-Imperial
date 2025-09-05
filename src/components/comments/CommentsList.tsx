import React from 'react';
import { CommentItem } from './CommentItem';
import type { Comment } from '../../types';

interface CommentsListProps {
  comments: Comment[];
  loading: boolean;
  filterRating: number | null;
}

export const CommentsList: React.FC<CommentsListProps> = ({ 
  comments, 
  loading, 
  filterRating 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 text-text">Cargando comentarios...</span>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">💬</div>
        <p className="text-gray-medium text-lg">
          {filterRating ? `No hay comentarios con ${filterRating} estrellas` : 'No hay comentarios aún. ¡Sé el primero en comentar!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
