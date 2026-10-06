import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLiveClock } from '../../hooks/useLiveClock';
import { Box, Clock, Sparkles, ArrowLeft, Activity } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const time = useLiveClock();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 glass-panel px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3.5 group cursor-pointer">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-emerald-500 to-teal-400 p-0.5 shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Box className="w-5 h-5 text-brand-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                GRUPO QUALIBRA
              </h1>
              <span className="bg-brand-50 text-brand-700 border border-brand-200 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Servidor Local
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">PORTAL OPERACIONAL DE FERRAMENTAS v2.5</p>
          </div>
        </Link>

        {/* Status and Controls */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Relógio em Tempo Real */}
          <div className="hidden sm:flex items-center space-x-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-700">
            <Clock className="w-3.5 h-3.5 text-brand-600" />
            <span>{time || '--:--:--'}</span>
          </div>

          {/* Indicador de Status */}
          <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden md:inline">Rede Local Ativa</span>
          </div>

          {/* Botão de Apresentação */}
          {!isHome && (
            <Link
              to="/"
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition border border-slate-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Início</span>
            </Link>
          )}

          {/* Botão Voltar ao Portal */}
          {location.pathname.startsWith('/ferramentas') && (
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Voltar ao Hub</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
