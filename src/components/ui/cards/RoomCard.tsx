import React from 'react';
import { SuiteImperialIcon, DeluxeRoomIcon, StandardRoomIcon } from '@/components/icons';
import { Room } from '@/shared/types/room';

interface RoomCardProps {
  room: Room;
  onViewDetails?: (roomId: string) => void;
}

const getRoomIcon = (iconType: Room['iconType']) => {
  switch (iconType) {
    case 'suite':
      return <SuiteImperialIcon />;
    case 'deluxe':
      return <DeluxeRoomIcon />;
    case 'standard':
      return <StandardRoomIcon />;
    default:
      return <StandardRoomIcon />;
  }
};

export const RoomCard: React.FC<RoomCardProps> = ({ room, onViewDetails }) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(room.id);
    }
  };

  return (
    <div className="bg-gray-dark rounded-xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2">
      <div className="h-64 bg-gradient-to-br from-primary/20 to-primary-dark/30 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
              {getRoomIcon(room.iconType)}
            </div>
            <h3 className="text-xl font-semibold text-white">{room.name}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{room.name}</h3>
        <p className="text-gray-300 mb-4">
          {room.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{room.price}</span>
          <button 
            onClick={handleViewDetails}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};
