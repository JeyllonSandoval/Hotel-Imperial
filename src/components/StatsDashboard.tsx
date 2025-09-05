import React, { useState, useEffect } from 'react';
import { getComments } from '../lib/firebase';
import type { Comment } from '../lib/firebase';

interface StatsDashboardProps {
  hotelId?: string;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ hotelId }) => {
  const [stats, setStats] = useState({
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
      const comments = await getComments(hotelId);
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

      setStats({
        totalComments,
        averageRating,
        ratingDistribution,
        recentComments
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const getRatingPercentage = (rating: number) => {
    if (stats.totalComments === 0) return 0;
    return Math.round((stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution] / stats.totalComments) * 100);
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
          <div className="text-3xl font-bold text-primary mb-2">{stats.averageRating.toFixed(1)}</div>
          <div className="text-sm text-gray-medium">Calificación Promedio</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">{stats.recentComments}</div>
          <div className="text-sm text-gray-medium">Últimas 24h</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {stats.averageRating >= 4.5 ? 'Excelente' : 
             stats.averageRating >= 4 ? 'Muy Bueno' : 
             stats.averageRating >= 3 ? 'Bueno' : 'Regular'}
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
                  style={{ width: `${getRatingPercentage(rating)}%` }}
                ></div>
              </div>
              <div className="w-12 text-sm text-gray-medium text-right">
                {getRatingPercentage(rating)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
