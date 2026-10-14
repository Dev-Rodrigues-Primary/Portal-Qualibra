import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLiveClock } from '../../hooks/useLiveClock';
import { usePortal } from '../../context/PortalContext';
import { QualibraLogo } from '../common/QualibraLogo';
import {
  Clock, Search, Menu, X, LayoutGrid,
  Calculator, CheckSquare, CalendarDays, FileText, Printer,
  BarChart3, ExternalLink, BookOpen, Server, Scale, Coins, 
  Lightbulb, Phone, Wifi, ShieldCheck, Sparkles, ChevronRight
} from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const time = useLiveClock();
  const { setIsSearchOpen } = usePortal();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isHome = location.pathname === '/' || location.pathname === '/dashboard';

  // TELEMETRIA VIVA: Mede latência real a cada 2 segundos
  const [latency, setLatency] = useState(null);

  useEffect(() => {
    let active = true;
    const pingServer = async () => {
      const start = performance.now();
      try {
        await fetch('/favicon.ico', { cache: 'no-store' });
        if (active) {
          const diff = Math.round(performance.now() - start);
          setLatency(diff);
        }
      } catch (e) {
        if (active) setLatency(-1);
      }
    };

    pingServer();
    const interval = setInterval(pingServer, 2000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const menuSections = [
    {
      title: 'Cálculos & Motores Fiscais',
      items: [
        { label: 'Reforma Tributária (LC 214)', path: '/ferramentas/reforma-tributaria', icon: Calculator, badge: '2026-2033' },
        { label: 'Planejamento Fator R', path: '/ferramentas/fator-r', icon: Calculator },
        { label: 'Simples vs Presumido', path: '/ferramentas/simples-presumido', icon: Scale },
        { label: 'Rescisão CLT (eSocial)', path: '/ferramentas/rescisao', icon: Calculator, badge: 'S-1.2' },
        { label: 'Comparador CLT vs PJ', path: '/comparadores/clt-pj', icon: Scale },
        { label: 'Pró-Labore x Lucros', path: '/ferramentas/pro-labore', icon: Coins },
      ]
    },
    {
      title: 'Auditoria & Diagnósticos',
      items: [
        { label: 'Diagnóstico Tributário', path: '/diagnosticos', icon: BarChart3 },
        { label: 'Gerador de Recibos & Termos', path: '/geradores', icon: Printer },
      ]
    },
    {
      title: 'Processos & Conformidade (POP)',
      items: [
        { label: 'Protocolos & Checklists (POP)', path: '/checklists', icon: CheckSquare, badge: 'Laudos A4' },
        { label: 'Calendário Fiscal & Vencimentos', path: '/obrigacoes', icon: CalendarDays, badge: 'Perpétuo' },
      ]
    },
    {
      title: 'Ecossistema & Conhecimento',
      items: [
        { label: 'Enviar Sugestão / Ideia', path: '/ideias', icon: Lightbulb },
        { label: 'Sistemas Governamentais', path: '/sistemas', icon: ExternalLink },
        { label: 'Modelos de Documentos', path: '/documentos', icon: FileText },
        { label: 'Base de Conhecimento (Wiki)', path: '/conhecimento', icon: BookOpen },
        { label: 'TI & Infraestrutura Local', path: '/ti', icon: Server },
      ]
    }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/70 shadow-xs transition-all">
        {/* Linha prismática sutil */}
        <div className="h-[2.5px] w-full bg-gradient-to-r from-emerald-500 via-amber-400 via-rose-500 via-purple-600 to-cyan-500 opacity-80 shadow-xs"></div>

        <div className="px-4 lg:px-8 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* LADO ESQUERDO */}
            <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
              <button
                onClick={() => setDrawerOpen(true)}
                className="group p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 hover:border-slate-300 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
                title="Abrir Menu Operacional"
              >
                <Menu className="w-4 h-4 text-slate-600 group-hover:text-amber-600 transition-colors" />
                <span className="hidden sm:inline text-xs font-black tracking-wide uppercase text-slate-700 group-hover:text-slate-900">
                  Menu
                </span>
              </button>

              <Link to="/dashboard" className="group flex items-center transition-transform duration-200 hover:scale-[1.01] active:scale-95">
                <QualibraLogo size="md" showText={true} />
              </Link>
            </div>

            {/* CENTRO: Barra de Busca Spotlight */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center justify-between bg-slate-50/90 hover:bg-slate-100/90 border border-slate-200 hover:border-slate-300/80 text-slate-400 hover:text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 shadow-2xs group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                  <span className="text-slate-500 group-hover:text-slate-700">Buscar ferramentas, POPs, leis...</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="font-mono text-[10px] font-bold bg-white border border-slate-200 shadow-2xs px-1.5 py-0.5 rounded text-slate-500">
                    /
                  </kbd>
                </div>
              </button>
            </div>

            {/* LADO DIREITO */}
            <div className="flex items-center space-x-2 sm:space-x-2.5 flex-shrink-0">
              
              <a 
                href="tel:1128974595" 
                className="hidden xl:flex items-center gap-1.5 bg-slate-50 hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300/70 px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold text-slate-700 hover:text-amber-900 transition-all duration-200 shadow-2xs"
                title="Central Telefônica Qualibra"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>(11) 2897-4595</span>
              </a>

              <div 
                className="hidden sm:flex items-center gap-1.5 bg-slate-50/90 border border-slate-200/90 px-2.5 py-1.5 rounded-xl text-xs font-mono shadow-2xs"
                title="Latência com o servidor T130"
              >
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    latency !== null && latency !== -1 && latency < 50 ? 'bg-emerald-400' : 'bg-rose-400'
                  }`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${
                    latency !== null && latency !== -1 && latency < 50 ? 'bg-emerald-500' : 'bg-rose-500'
                  }`} />
                </span>
                <span className="font-bold text-slate-700">
                  {latency === null ? '-- ms' : latency === -1 ? 'Off' : `${latency}ms`}
                </span>
              </div>

              <Link
                to="/ideias"
                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200/90 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95"
                title="Enviar sugestão de melhoria"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 fill-amber-400" />
                <span className="hidden sm:inline">Ideias</span>
              </Link>

              <div className="hidden lg:flex items-center space-x-1.5 bg-slate-100/90 border border-slate-200/90 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-slate-700 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{time || '--:--:--'}</span>
              </div>

              {!isHome && (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 shadow-xs hover:shadow active:scale-95"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-slate-300" />
                  <span className="hidden sm:inline">Hub Geral</span>
                </Link>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* DRAWER LATERAL EXECUTIVO */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl border-r border-slate-200 flex flex-col z-10 animate-fade-in-up">
            
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <QualibraLogo size="sm" showText={true} />
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 space-y-6 flex-grow">
              <Link
                to="/dashboard"
                onClick={() => setDrawerOpen(false)}
                className={`flex items-center justify-between p-3 rounded-2xl font-black text-xs transition-all shadow-2xs ${
                  isHome 
                    ? 'bg-amber-500 text-slate-950 border border-amber-400' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutGrid className="w-4 h-4" />
                  <span>Painel Operacional Completo</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </Link>

              {menuSections.map((sec, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h4 className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-slate-400 px-3">
                    {sec.title}
                  </h4>
                  <div className="space-y-0.5">
                    {sec.items.map((item, itemIdx) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={itemIdx}
                          to={item.path}
                          onClick={() => setDrawerOpen(false)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                            isActive
                              ? 'bg-amber-50 text-amber-950 border border-amber-200 font-bold'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 border-t border-slate-200 bg-slate-50 text-[11px] font-mono text-slate-500 flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Intranet T130</span>
              </span>
              <span className="font-bold text-slate-700">v3.4-prod</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;