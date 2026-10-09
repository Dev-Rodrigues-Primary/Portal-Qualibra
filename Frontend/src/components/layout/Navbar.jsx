import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLiveClock } from '../../hooks/useLiveClock';
import { usePortal } from '../../context/PortalContext';
import { QualibraLogo } from '../common/QualibraLogo';
import {
  Clock, Search, ArrowLeft, Menu, X, LayoutGrid,
  Calculator, CheckSquare, CalendarDays, FileText, Printer,
  BarChart3, ExternalLink, BookOpen, Server, Scale, Coins, Lightbulb, Phone, Wifi
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
    const interval = setInterval(pingServer, 2000); // 2 segundos cravados
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

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
      title: 'Suporte, Inovação & TI',
      items: [
        { label: '💡 Enviar Ideia / Sugestão', path: '/ideias', icon: Lightbulb },
        { label: 'Sistemas Governamentais Oficiais', path: '/sistemas', icon: ExternalLink },
        { label: 'Modelos de Documentos & Tabelas', path: '/documentos', icon: FileText },
        { label: 'Base de Conhecimento (Wiki)', path: '/conhecimento', icon: BookOpen },
        { label: 'TI & Infraestrutura Local', path: '/ti', icon: Server },
      ]
    }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-2xs">
        {/* Faixa Prismática Fina Qualibra no topo */}
        <div className="h-[2px] w-full bg-gradient-to-r from-emerald-500 via-amber-500 via-rose-500 via-purple-600 to-cyan-500 opacity-70"></div>

        <div className="border-b border-slate-200/80 px-4 lg:px-8 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Lado Esquerdo: Menu Drawer + Logo Oficial Qualibra */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 rounded-xl text-slate-600 hover:text-amber-600 hover:bg-amber-50/50 border border-slate-200 transition flex items-center gap-2 cursor-pointer"
                title="Abrir Menu de Navegação"
              >
                <Menu className="w-5 h-5 text-slate-700" />
                <span className="hidden sm:inline text-xs font-bold text-slate-800">Menu</span>
              </button>

              <Link to="/dashboard" className="group cursor-pointer">
                <QualibraLogo size="md" showText={true} />
              </Link>
            </div>

            {/* Centro: Barra de Busca com atalho */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 px-4 py-2 rounded-xl text-xs transition min-w-[320px] justify-between shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-amber-500" />
                  <span>Buscar ferramentas, cálculos, rotinas...</span>
                </div>
                <kbd className="font-mono text-[10px] bg-white border border-slate-300 px-1.5 py-0.5 rounded text-slate-400">
                  /
                </kbd>
              </button>
            </div>

            {/* Lado Direito: Telefone + Telemetria Viva 2s + Relógio + Ações */}
            <div className="flex items-center space-x-2 sm:space-x-2.5">
              
              {/* Telefone com discagem rápida */}
              <a 
                href="tel:1128974595" 
                className="hidden xl:flex items-center gap-1.5 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-slate-700 hover:text-amber-900 transition"
                title="Ligar para o atendimento"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>(11) 2897-4595</span>
              </a>

              {/* TELEMETRIA VIVA A CADA 2 SEGUNDOS */}
              <div 
                className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xl text-xs font-mono"
                title="Latência da conexão local atualizada a cada 2 segundos"
              >
                <span className={`w-2 h-2 rounded-full ${latency !== null && latency !== -1 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                <span className="font-bold text-slate-700">
                  {latency === null ? '-- ms' : latency === -1 ? 'Off' : `${latency}ms`}
                </span>
              </div>

              {/* Botão Enviar Ideia */}
              <Link
                to="/ideias"
                className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-2xs qualibra-shine"
                title="Enviar uma Ideia de melhoria para o Portal"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 fill-amber-400" />
                <span className="hidden sm:inline">Ideias</span>
              </Link>

              {/* Relógio em tempo real */}
              <div className="hidden lg:flex items-center space-x-1.5 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-700">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{time || '--:--:--'}</span>
              </div>

              {/* Hub Geral */}
              {!isHome && (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Hub Geral</span>
                </Link>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Drawer Lateral */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl border-r border-slate-200 flex flex-col z-10 animate-fade-in-up">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <QualibraLogo size="sm" showText={true} />
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
                className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70 text-amber-950 font-bold text-xs border border-amber-200/80"
              >
                <LayoutGrid className="w-4 h-4 text-amber-600" />
                <span>Painel Operacional Completo</span>
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
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-amber-600 hover:bg-slate-50 transition"
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

            <div className="p-4 border-t border-slate-200 bg-slate-50 text-[11px] font-mono text-slate-500 flex justify-between items-center">
              <span>(11) 2897-4595</span>
              <span>Qualibra v3.0</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;