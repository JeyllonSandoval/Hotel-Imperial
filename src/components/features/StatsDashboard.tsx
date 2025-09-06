import React, { useState, useEffect } from 'react';
import { getComments } from '../lib/comments';
import { calculateStats, getRatingPercentage } from '../utils/comments';
import { formatRating, getRatingLabel } from '../utils/formatters';
import { StarRating } from '../utils/ui';
import type { Comment, Stats } from '../types';
import { db } from '../lib/firebase';

interface StatsDashboardProps {
  hotelId?: string;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ hotelId }) => {
  const [stats, setStats] = useState<Stats>({
    totalComments: 0,
    averageRating: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    recentComments: 0
  });

  useEffect(() => {
    loadStats();
  }, [hotelId]);

  const loadStats = async () => {
    try {
      const comments = await getComments(db, hotelId);
      const calculatedStats = calculateStats(comments);
      setStats(calculatedStats);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  return (
    <div className="bg-gray-dark rounded-lg p-6">
      <h3 className="text-2xl font-bold text-primary mb-6">Estadísticas en Tiempo Real</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">{stats.totalComments}</div>
          <div className="text-sm text-gray-medium">Total Comentarios</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">{formatRating(stats.averageRating)}</div>
          <div className="text-sm text-gray-medium">Calificación Promedio</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">{stats.recentComments}</div>
          <div className="text-sm text-gray-medium">Últimas 24h</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {getRatingLabel(stats.averageRating)}
          </div>
          <div className="text-sm text-gray-medium">Estado General</div>
        </div>
      </div>

      {/* Distribución de calificaciones */}
      <div>
        <h4 className="text-lg font-semibold text-text mb-4">Distribución de Calificaciones</h4>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-3">
              <div className="w-8 text-sm font-medium text-text">{rating}★</div>
              <div className="flex-1 bg-gray-medium rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getRatingPercentage(stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution], stats.totalComments)}%` }}
                ></div>
              </div>
              <div className="w-12 text-sm text-gray-medium text-right">
                {getRatingPercentage(stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution], stats.totalComments)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
