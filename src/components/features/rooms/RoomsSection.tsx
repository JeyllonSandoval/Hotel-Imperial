import React from 'react';
import { SectionHeader } from '@/components/ui/layout/SectionHeader';
import { RoomCard } from '@/components/ui/cards/RoomCard';
import { rooms } from '@/data/rooms';

export const RoomsSection: React.FC = () => {
  const handleViewDetails = (roomId: string) => {
    // TODO: Implement room details modal or navigation
    console.log('View details for room:', roomId);
  };

  return (
    <section id="rooms-section" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Nuestras Habitaciones"
          subtitle="Descubre nuestras elegantes habitaciones diseñadas para brindarte la máxima comodidad y lujo"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard 
              key={room.id} 
              room={room} 
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
