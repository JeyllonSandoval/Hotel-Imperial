import React from 'react';
import { StarRating } from '../../utils/ui';
import type { SortOption, FilterRating } from '../../types';

interface CommentsHeaderProps {
  averageRating: string;
  totalComments: number;
  sortBy: SortOption;
  filterRating: FilterRating;
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (rating: FilterRating) => void;
}

export const CommentsHeader: React.FC<CommentsHeaderProps> = ({
  averageRating,
  totalComments,
  sortBy,
  filterRating,
  onSortChange,
  onFilterChange
}) => {
  return (
    <div className="bg-gray-dark rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h3 className="text-3xl font-bold text-primary mb-2">Comentarios de Huéspedes</h3>
          <p className="text-gray-medium">Comparte tu experiencia y ayuda a otros viajeros</p>
        </div>
        <div className="mt-4 md:mt-0 text-center md:text-right">
          <div className="flex items-center justify-center md:justify-end space-x-2 mb-2">
            <span className="text-3xl font-bold text-primary">{averageRating}</span>
            <StarRating rating={parseFloat(averageRating)} size="lg" />
          </div>
          <p className="text-sm text-gray-medium">{totalComments} comentarios</p>
        </div>
      </div>

      {/* Filtros y ordenamiento */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-text mb-2">Filtrar por calificación:</label>
          <select
            value={filterRating || ''}
            onChange={(e) => onFilterChange(e.target.value ? parseInt(e.target.value) : null)}
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
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full px-3 py-2 bg-gray-medium text-text rounded-lg border border-gray-medium focus:border-primary focus:outline-none"
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="rating">Mejor calificados</option>
          </select>
        </div>
      </div>
    </div>
  );
};
