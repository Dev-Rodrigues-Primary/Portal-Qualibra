import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PortalProvider } from './context/PortalContext';
import { MainLayout } from './components/layout/MainLayout';

// Páginas Principais
import { IntroPage } from './features/intro/IntroPage';
import { DashboardPage } from './features/dashboard/DashboardPage';

// Calculadoras
import { SimuladorReformaPage } from './features/reforma/SimuladorReformaPage';
import { SimuladorFatorRPage } from './features/fatorR/SimuladorFatorRPage';
import { SimuladorSimplesPresumidoPage } from './features/simplesPresumido/SimuladorSimplesPresumidoPage';
import { SimuladorRescisaoPage } from './features/rescisao/SimuladorRescisaoPage';
import { SimuladorProlaborePage } from './features/prolabore/SimuladorProlaborePage';
import { ComparadorCltPjPage } from './features/comparadores/ComparadorCltPjPage';

// Obrigações, Checklists e Ferramentas
import { CalendarioFiscalPage } from './features/calendario/CalendarioFiscalPage';
import { ChecklistsPage } from './features/checklists/ChecklistsPage';
import { DocumentosPage } from './features/documentos/DocumentosPage';
import { GeradoresPage } from './features/geradores/GeradoresPage';
import { DiagnosticosPage } from './features/diagnosticos/DiagnosticosPage';
import { SistemasPage } from './features/sistemas/SistemasPage';
import { ConhecimentoPage } from './features/conhecimento/ConhecimentoPage';
import { TiInfraPage } from './features/ti/TiInfraPage';
import { EnvioIdeiasPage } from './features/ideias/EnvioIdeiasPage';

export function App() {
  return (
    <PortalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<IntroPage />} />
            <Route path="dashboard" element={<DashboardPage />} />

            {/* Calculadoras e Comparadores */}
            <Route path="ferramentas/reforma-tributaria" element={<SimuladorReformaPage />} />
            <Route path="ferramentas/fator-r" element={<SimuladorFatorRPage />} />
            <Route path="ferramentas/simples-presumido" element={<SimuladorSimplesPresumidoPage />} />
            <Route path="ferramentas/rescisao" element={<SimuladorRescisaoPage />} />
            <Route path="ferramentas/pro-labore" element={<SimuladorProlaborePage />} />
            <Route path="comparadores/clt-pj" element={<ComparadorCltPjPage />} />

            {/* Rotinas, Documentos e Geradores */}
            <Route path="obrigacoes" element={<CalendarioFiscalPage />} />
            <Route path="checklists" element={<ChecklistsPage />} />
            <Route path="documentos" element={<DocumentosPage />} />
            <Route path="geradores" element={<GeradoresPage />} />
            <Route path="diagnosticos" element={<DiagnosticosPage />} />
            <Route path="sistemas" element={<SistemasPage />} />
            <Route path="conhecimento" element={<ConhecimentoPage />} />
            <Route path="ti" element={<TiInfraPage />} />

            {/* Envio de Ideias com Notificação */}
            <Route path="ideias" element={<EnvioIdeiasPage />} />

            {/* Redirecionamento de segurança */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PortalProvider>
  );
}

export default App;