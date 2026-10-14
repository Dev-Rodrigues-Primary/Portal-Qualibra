import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AmbientCanvas } from '../common/AmbientCanvas';
import { GlobalSearchModal } from '../search/GlobalSearchModal';
import { TermoHomologacaoModal } from '../common/TermoHomologacaoModal';

export function MainLayout() {
  return (
    <div className="relative min-h-screen flex flex-col antialiased bg-slate-50/70 text-slate-900 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Background Dinâmico & Modais Globais */}
      <AmbientCanvas />
      <GlobalSearchModal />
      <TermoHomologacaoModal />

      {/* Camada Visual de Grid Sutil */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-25 z-0" />

      {/* Estrutura Principal */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 lg:py-8">
          <Outlet />
        </main>
        <Footer />
      </div>

    </div>
  );
}

export default MainLayout;