import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { IntroPage } from './features/intro/IntroPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { SimuladorReformaPage } from './features/reforma/SimuladorReformaPage';
import { SimuladorFatorRPage } from './features/fatorR/SimuladorFatorRPage';
import { SimuladorSimplesPresumidoPage } from './features/simplesPresumido/SimuladorSimplesPresumidoPage';
import { SimuladorRescisaoPage } from './features/rescisao/SimuladorRescisaoPage';
import { SimuladorProlaborePage } from './features/prolabore/SimuladorProlaborePage';
import { CalendarioFiscalPage } from './features/calendario/CalendarioFiscalPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<IntroPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="ferramentas/reforma-tributaria" element={<SimuladorReformaPage />} />
          <Route path="ferramentas/fator-r" element={<SimuladorFatorRPage />} />
          <Route path="ferramentas/simples-presumido" element={<SimuladorSimplesPresumidoPage />} />
          <Route path="ferramentas/rescisao" element={<SimuladorRescisaoPage />} />
          <Route path="ferramentas/pro-labore" element={<SimuladorProlaborePage />} />
          <Route path="ferramentas/calendario-fiscal" element={<CalendarioFiscalPage />} />
          {/* Redirecionamento de segurança */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
