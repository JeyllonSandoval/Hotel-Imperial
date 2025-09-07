import React from 'react';
import { WifiIcon, SpaIcon, RestaurantIcon, ConciergeIcon } from '@/components/icons';
import type { Service } from '@/shared/types/service';

interface ServiceCardProps {
  service: Service;
}

const getServiceIcon = (iconType: Service['iconType']) => {
  switch (iconType) {
    case 'wifi':
      return <WifiIcon />;
    case 'spa':
      return <SpaIcon />;
    case 'restaurant':
      return <RestaurantIcon />;
    case 'concierge':
      return <ConciergeIcon />;
    default:
      return <WifiIcon />;
  }
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
        {getServiceIcon(service.iconType)}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
      <p className="text-gray-300">{service.description}</p>
    </div>
  );
};
