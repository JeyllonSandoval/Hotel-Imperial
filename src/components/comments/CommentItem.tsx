import React from 'react';
import { StarRating } from '../../utils/ui';
import { formatDate } from '../../utils/formatters';
import type { Comment } from '../../types';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="bg-gray-dark rounded-lg p-6 hover:bg-gray-medium transition-colors duration-200">
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
                <StarRating rating={comment.rating} />
              </div>
            )}
          </div>
          <p className="text-text leading-relaxed text-base">{comment.textContent}</p>
        </div>
      </div>
    </div>
  );
};
