import React, { useState } from 'react';
import { StarRating } from '../../utils/ui';
import type { User } from '../../types';

interface CommentFormProps {
  user: User;
  onSubmit: (comment: { textContent: string; rating: number }) => Promise<void>;
  submitting: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = ({ user, onSubmit, submitting }) => {
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;

    try {
      await onSubmit({
        textContent: newComment.trim(),
        rating
      });
      
      setNewComment('');
      setRating(5);
    } catch (error) {
      console.error('Error al enviar comentario:', error);
    }
  };

  return (
    <div className="bg-gray-dark rounded-lg p-6 mb-8">
      <h4 className="text-xl font-semibold text-primary mb-4">Deja tu comentario</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-text mb-2">
            Califica tu experiencia
          </label>
          <StarRating 
            rating={rating} 
            interactive 
            onRatingChange={setRating}
          />
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
  );
};
