import React from 'react';
import { SectionHeader } from '@/components/ui/layout/SectionHeader';
import { ServiceCard } from '@/components/ui/cards/ServiceCard';
import { services } from '@/data/services';

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Nuestros Servicios"
          subtitle="Disfruta de una amplia gama de servicios diseñados para hacer tu estancia inolvidable"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
