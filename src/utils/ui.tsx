import React from 'react';

// Componente reutilizable para mostrar estrellas
interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  interactive = false, 
  onRatingChange,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex space-x-1 ${interactive ? 'cursor-pointer' : ''}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } ${interactive ? 'hover:text-yellow-400' : ''}`}
          onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// Hook para manejar notificaciones
export const useNotification = () => {
  const [notifications, setNotifications] = React.useState<Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
  }>>([]);

  const addNotification = (
    type: 'success' | 'error' | 'warning' | 'info',
    message: string,
    duration?: number
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, type, message, duration }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const NotificationContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          duration={notification.duration}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );

  return {
    addNotification,
    removeNotification,
    NotificationContainer
  };
};

// Componente de notificación individual
interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({ 
  type, 
  message, 
  duration = 5000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-900/20 border-green-500/50 text-green-300';
      case 'error':
        return 'bg-red-900/20 border-red-500/50 text-red-300';
      case 'warning':
        return 'bg-yellow-900/20 border-yellow-500/50 text-yellow-300';
      case 'info':
        return 'bg-blue-900/20 border-blue-500/50 text-blue-300';
      default:
        return 'bg-gray-900/20 border-gray-500/50 text-gray-300';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg border ${getStyles()} shadow-lg`}>
      <div className="flex items-start space-x-3">
        <span className="text-xl flex-shrink-0">{getIcon()}</span>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-200 transition-colors"
        >
          <span className="sr-only">Cerrar</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
