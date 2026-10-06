import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLiveClock } from '../../hooks/useLiveClock';
import { usePortal } from '../../context/PortalContext';
import {
  Box, Clock, Search, ArrowLeft, Menu, X, LayoutGrid,
  Calculator, CheckSquare, CalendarDays, FileText, Printer,
  BarChart3, ExternalLink, BookOpen, Server, Scale, Coins
} from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const time = useLiveClock();
  const { setIsSearchOpen } = usePortal();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isHome = location.pathname === '/' || location.pathname === '/dashboard';

  const menuSections = [
    {
      title: 'Cálculos & Comparadores',
      items: [
        { label: 'Reforma Tributária (LC 214)', path: '/ferramentas/reforma-tributaria', icon: Calculator },
        { label: 'Análise de Fator R', path: '/ferramentas/fator-r', icon: Calculator },
        { label: 'Simples vs Presumido', path: '/ferramentas/simples-presumido', icon: Scale },
        { label: 'Rescisão CLT', path: '/ferramentas/rescisao', icon: Calculator },
        { label: 'Comparador CLT vs PJ', path: '/comparadores/clt-pj', icon: Scale },
        { label: 'Pró-Labore x Lucros', path: '/ferramentas/pro-labore', icon: Coins },
      ]
    },
    {
      title: 'Auditoria & Produtividade',
      items: [
        { label: 'Diagnóstico Tributário', path: '/diagnosticos', icon: BarChart3 },
        { label: 'Gerador de Recibos/Termos', path: '/geradores', icon: Printer },
      ]
    },
    {
      title: 'Processos & Rotinas',
      items: [
        { label: 'Checklists Operacionais', path: '/checklists', icon: CheckSquare },
        { label: 'Calendário Fiscal & Vencimentos', path: '/obrigacoes', icon: CalendarDays },
      ]
    },
    {
      title: 'Suporte & Referência',
      items: [
        { label: 'Sistemas Governamentais Oficiais', path: '/sistemas', icon: ExternalLink },
        { label: 'Modelos de Documentos & Tabelas', path: '/documentos', icon: FileText },
        { label: 'Base de Conhecimento (Wiki)', path: '/conhecimento', icon: BookOpen },
        { label: 'TI & Infraestrutura Local', path: '/ti', icon: Server },
      ]
    }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 glass-panel px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Lado Esquerdo: Botão Menu Drawer + Identidade Visual */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:text-brand-700 hover:bg-slate-100 border border-slate-200 transition flex items-center gap-2"
              title="Abrir Menu de Navegação"
            >
              <Menu className="w-5 h-5 text-slate-700" />
              <span className="hidden sm:inline text-xs font-semibold">Menu</span>
            </button>

            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Box className="w-4 h-4 text-brand-600" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight group-hover:text-brand-600 transition-colors">
                    GRUPO QUALIBRA
                  </span>
                  <span className="hidden md:inline bg-brand-50 text-brand-700 border border-brand-200 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase">
                    Servidor Operacional
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono hidden sm:block">PORTAL DE FERRAMENTAS & ROTINAS</p>
              </div>
            </Link>
          </div>

          {/* Centro: Barra de Busca Minimalista */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-3 bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 text-slate-500 hover:text-slate-800 px-4 py-2 rounded-xl text-xs transition min-w-[320px] justify-between shadow-inner"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-brand-600" />
                <span>Buscar ferramentas, cálculos, checklists...</span>
              </div>
              <kbd className="font-mono text-[10px] bg-white border border-slate-300 px-1.5 py-0.5 rounded text-slate-400">
                /
              </kbd>
            </button>
          </div>

          {/* Lado Direito: Ações, Status e Relógio */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Botão de busca mobile */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Relógio em tempo real */}
            <div className="hidden sm:flex items-center space-x-1.5 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-700">
              <Clock className="w-3.5 h-3.5 text-brand-600" />
              <span>{time || '--:--:--'}</span>
            </div>

            {/* Status da Rede Local */}
            <div className="hidden lg:flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-medium text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Online Local</span>
            </div>

            {/* Botão de Voltar ao Hub */}
            {!isHome && (
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl text-xs font-medium transition shadow-sm"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Hub Geral</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Menu Drawer Lateral Suave */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Painel do Drawer */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl border-r border-slate-200 flex flex-col z-10 animate-fade-in-up">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Box className="w-5 h-5 text-brand-600" />
                <span className="font-bold text-slate-900 text-sm">Navegação Operacional</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 space-y-6 flex-grow">
              <Link
                to="/dashboard"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-brand-50 text-brand-800 font-bold text-xs border border-brand-200"
              >
                <LayoutGrid className="w-4 h-4 text-brand-600" />
                <span>Painel Principal (Hub Geral)</span>
              </Link>

              {menuSections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2">
                    {sec.title}
                  </h4>
                  <div className="space-y-1">
                    {sec.items.map((item, itemIdx) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={itemIdx}
                          to={item.path}
                          onClick={() => setDrawerOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:text-brand-700 hover:bg-slate-100 transition"
                        >
                          <Icon className="w-4 h-4 text-slate-400" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 text-[11px] font-mono text-slate-500">
              IP: 192.168.191.204 • Servidor Qualibra
            </div>
          </div>
        </div>
      )}
    </>
  );
}