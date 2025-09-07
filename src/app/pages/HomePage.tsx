import React from 'react';
import { HeroSection } from '@/components/features/hero/HeroSection';
import { RoomsSection } from '@/components/features/rooms/RoomsSection';
import { ServicesSection } from '@/components/features/services/ServicesSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <RoomsSection />
      <ServicesSection />
    </>
  );
};
