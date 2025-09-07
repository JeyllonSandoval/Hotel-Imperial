import React from 'react';
import { Navbar } from '@/components/layout/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, title = "" }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col">
        {children}
      </main>
    </>
  );
};
