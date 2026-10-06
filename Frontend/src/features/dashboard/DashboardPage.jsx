import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PORTAL_REGISTRY } from '../../domain/portalRegistry';
import { usePortal } from '../../context/PortalContext';
import {
  Search, Star, History, ArrowRight, Calculator, CheckSquare,
  FileText, CalendarDays, BarChart3, ExternalLink, BookOpen, Server,
  Sparkles, Layers
} from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const { favorites, isFavorite, toggleFavorite, recentItems, registerAccess, setIsSearchOpen } = usePortal();
  const [selectedCat, setSelectedCat] = useState('all');

  const categories = [
    { id: 'all', label: 'Todos os Recursos' },
    { id: 'calculos', label: 'Cálculos & Comparadores' },
    { id: 'auditoria', label: 'Auditoria & Diagnósticos' },
    { id: 'processos', label: 'Checklists & Obrigações' },
    { id: 'ferramentas', label: 'Geradores' },
    { id: 'recursos', label: 'Sistemas & Manuais' }
  ];

  const handleOpenTool = (item) => {
    registerAccess(item);
    navigate(item.route);
  };

  const favoriteTools = PORTAL_REGISTRY.filter((t) => favorites.includes(t.id));
  const filteredTools = PORTAL_REGISTRY.filter(
    (t) => selectedCat === 'all' || t.category === selectedCat
  );

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Banner Principal com Atalho de Busca */}
      <div className="relative overflow-hidden rounded-2xl p-8 lg:p-10 border border-slate-200 glass-panel">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-mono tracking-widest text-brand-700 font-semibold uppercase bg-brand-50 border border-brand-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Portal Operacional Qualibra
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Hub de Ferramentas, Cálculos & Rotinas Fiscais
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Selecione uma ferramenta abaixo ou utilize a busca rápida pelo teclado para navegar entre os módulos dos setores Fiscal, Contábil e Departamento Pessoal.
          </p>

          {/* Barra de Pesquisa */}
          <div className="pt-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full text-left pl-12 pr-24 py-3.5 rounded-xl glass-input text-sm text-slate-500 hover:text-slate-800 focus:ring-2 focus:ring-brand-500 shadow-sm flex items-center justify-between transition"
            >
              <div className="flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-4" />
                <span>Pressione '/' ou clique aqui para buscar em qualquer rotina...</span>
              </div>
              <span className="font-mono text-xs text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
                /
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Seção 1: Meus Favoritos */}
      {favoriteTools.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              Favoritos Fixados
            </h3>
            <span className="text-xs text-slate-400 font-mono">Salvo no navegador</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {favoriteTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => handleOpenTool(tool)}
                className="glass-card p-4 rounded-xl flex items-start justify-between cursor-pointer group border-l-4 border-l-amber-400 hover:border-l-amber-500"
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{tool.subCategory}</span>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{tool.desc}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(tool.id);
                  }}
                  className="p-1 text-amber-500 hover:scale-110 transition ml-2"
                  title="Remover dos favoritos"
                >
                  <Star className="w-4 h-4 fill-amber-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Seção 2: Últimos Acessados */}
      {recentItems.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase font-mono">
            <History className="w-3.5 h-3.5" />
            <span>Acessados Recentemente</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleOpenTool(item)}
                className="bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-700 px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5 shadow-sm"
              >
                <span>{item.title}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Seção 3: Catálogo Completo por Categoria */}
      <div className="space-y-5 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Módulos Operacionais</h3>
            <p className="text-xs text-slate-500">Ferramentas de cálculo, auditoria e rotinas diárias</p>
          </div>

          {/* Abas de Filtro */}
          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                className={`font-medium text-xs px-3 py-1.5 rounded-lg transition ${
                  selectedCat === c.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Ferramentas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => handleOpenTool(tool)}
              className="glass-card rounded-2xl p-5 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 uppercase">
                    {tool.type} • {tool.subCategory}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(tool.id);
                    }}
                    className="p-1 text-slate-300 hover:text-amber-500 transition"
                    title="Favoritar"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        isFavorite(tool.id) ? 'fill-amber-400 text-amber-500' : ''
                      }`}
                    />
                  </button>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{tool.desc}</p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4 text-xs font-semibold text-brand-600">
                <span>Abrir ferramenta</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}