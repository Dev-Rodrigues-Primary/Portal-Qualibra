import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AmbientCanvas } from '../common/AmbientCanvas';
import { GlobalSearchModal } from '../search/GlobalSearchModal';

export function MainLayout() {
  return (
    <div className="relative min-h-screen flex flex-col antialiased selection:bg-brand-500 selection:text-white">
      <AmbientCanvas />
      <GlobalSearchModal />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;