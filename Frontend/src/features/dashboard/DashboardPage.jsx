import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PORTAL_REGISTRY } from '../../domain/portalRegistry';
import { usePortal } from '../../context/PortalContext';
import { QualibraLogo } from '../../components/common/QualibraLogo';
import {
  Search, Star, ArrowRight, Calculator, CheckSquare,
  FileText, CalendarDays, BarChart3, ExternalLink, BookOpen, Server,
  Sparkles, Layers, Scale, Coins, Printer, LayoutList, LayoutGrid
} from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const { favorites, isFavorite, toggleFavorite, registerAccess } = usePortal();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list');

  const handleOpenTool = (item) => { registerAccess(item); navigate(item.route); };

  const getIcon = (id) => {
    switch (id) {
      case 'reforma-tributaria': case 'fator-r': return <Calculator className="w-4 h-4 text-emerald-600" />;
      case 'simples-presumido': case 'clt-vs-pj': return <Scale className="w-4 h-4 text-blue-600" />;
      case 'rescisao': return <Calculator className="w-4 h-4 text-indigo-600" />;
      case 'pro-labore': return <Coins className="w-4 h-4 text-amber-600" />;
      case 'diagnostico-tributario': return <BarChart3 className="w-4 h-4 text-teal-600" />;
      case 'geradores-hub': return <Printer className="w-4 h-4 text-purple-600" />;
      case 'checklists-hub': return <CheckSquare className="w-4 h-4 text-emerald-600" />;
      case 'calendario-fiscal': return <CalendarDays className="w-4 h-4 text-amber-600" />;
      case 'sistemas-externos': return <ExternalLink className="w-4 h-4 text-blue-600" />;
      case 'documentos-hub': return <FileText className="w-4 h-4 text-slate-600" />;
      case 'base-conhecimento': return <BookOpen className="w-4 h-4 text-amber-600" />;
      case 'ti-infra': return <Server className="w-4 h-4 text-slate-700" />;
      default: return <Sparkles className="w-4 h-4 text-amber-500" />;
    }
  };

  const sections = [
    { title: 'Tributário & Fiscal', subtitle: 'Simulações de impostos e conformidade', badge: 'Fiscal', badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200', ids: ['reforma-tributaria', 'fator-r', 'simples-presumido', 'calendario-fiscal'] },
    { title: 'Trabalhista & Sócios', subtitle: 'Rescisões, pró-labore e comparativo PJ', badge: 'DP & Sócios', badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200', ids: ['rescisao', 'clt-vs-pj', 'pro-labore'] },
    { title: 'Auditoria & Produtividade', subtitle: 'Diagnósticos de GAP e termos com extenso', badge: 'Produtividade', badgeColor: 'bg-purple-50 text-purple-700 border border-purple-200', ids: ['diagnostico-tributario', 'geradores-hub', 'checklists-hub'] },
    { title: 'Recursos Oficiais & TI', subtitle: 'Sistemas governamentais e conectividade', badge: 'Acessos', badgeColor: 'bg-slate-100 text-slate-700 border border-slate-200', ids: ['sistemas-externos', 'documentos-hub', 'base-conhecimento', 'ti-infra'] }
  ];

  const filteredToolsMap = useMemo(() => {
    const q = (searchTerm || '').toLowerCase();
    const map = {};
    (PORTAL_REGISTRY || []).forEach(t => {
      const title = (t.title || '').toLowerCase();
      const desc = (t.desc || '').toLowerCase();
      const sub = (t.subCategory || '').toLowerCase();
      if (title.includes(q) || desc.includes(q) || sub.includes(q)) map[t.id] = t;
    });
    return map;
  }, [searchTerm]);

  const favoriteTools = (PORTAL_REGISTRY || []).filter((t) => Array.isArray(favorites) && favorites.includes(t.id));

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* HEADER BANNER COMPLETO RESTAURADO */}
      <div className="relative overflow-hidden rounded-3xl p-8 lg:p-10 border border-slate-200 bg-white shadow-xs">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Servidor Operacional Interno
              </span>
              <span className="text-xs font-mono text-slate-400">• Homologação em Andamento</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Portal de Ferramentas & Rotinas
            </h2>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Ferramenta auxiliar de apoio operacional do <b>Grupo Qualibra</b>. Resultados de simulação preliminar sujeitos a validação nos sistemas oficiais. Selecione uma ferramenta ou pesquise no catálogo unificado.
            </p>
          </div>

          <div className="hidden lg:block p-4 bg-slate-50/80 border border-slate-200 rounded-2xl flex-shrink-0 qualibra-shine">
            <QualibraLogo size="lg" showText={true} layout="vertical" />
            <div className="text-center mt-2 text-[11px] font-mono font-bold text-slate-600">
              (11) 2897-4595
            </div>
          </div>
        </div>

        {/* Barra de Pesquisa Integrada */}
        <div className="relative z-10 mt-6 flex gap-3">
          <div className="relative flex-grow max-w-xl">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar ferramentas, cálculos, rotinas..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-input text-sm shadow-2xs focus:border-amber-500"
            />
          </div>
          
          <div className="hidden sm:flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-2 rounded-xl transition cursor-pointer ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              title="Visualização em Lista Compacta"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')} 
              className={`p-2 rounded-xl transition cursor-pointer ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              title="Visualização em Cards"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* FAVORITOS COMPACTOS */}
      {favoriteTools.length > 0 && !searchTerm && (
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>Favoritos</span>
          </div>
          {favoriteTools.map((fav) => (
            <button 
              key={fav.id} 
              onClick={() => handleOpenTool(fav)} 
              className="group flex items-center gap-2 bg-white hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 text-slate-800 hover:text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <span>{fav.title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-600 transition" />
            </button>
          ))}
        </div>
      )}

      {/* LISTAGEM PRINCIPAL */}
      {viewMode === 'list' ? (
        <div className="space-y-6">
          {sections.map((sec, sIdx) => {
            const sectionTools = sec.ids.map((id) => filteredToolsMap[id]).filter(Boolean);
            if (sectionTools.length === 0) return null;

            return (
              <div key={sIdx} className="glass-panel rounded-2xl overflow-hidden shadow-xs">
                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded ${sec.badgeColor}`}>{sec.badge}</span>
                  <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">{sec.title}</h3>
                  <span className="text-xs text-slate-400 hidden sm:inline">• {sec.subtitle}</span>
                </div>
                <div className="divide-y divide-slate-100 bg-white">
                  {sectionTools.map((tool) => (
                    <div 
                      key={tool.id} 
                      onClick={() => handleOpenTool(tool)} 
                      className="group px-5 py-4 flex items-center justify-between hover:bg-amber-50/20 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-4 pr-4">
                        <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:border-amber-300 group-hover:bg-amber-50/60 transition-colors">
                          {getIcon(tool.id)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm group-hover:text-amber-600 transition-colors">{tool.title}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">{tool.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(tool.id); }} 
                          className="p-2 text-slate-300 hover:text-amber-500 transition cursor-pointer"
                        >
                          <Star className={`w-4 h-4 ${isFavorite(tool.id) ? 'fill-amber-400 text-amber-500' : ''}`} />
                        </button>
                        <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/60 group-hover:bg-amber-500 group-hover:text-white transition">
                          <span>Acessar</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.values(filteredToolsMap).map((tool) => (
            <div 
              key={tool.id} 
              onClick={() => handleOpenTool(tool)} 
              className="glass-card rounded-2xl p-6 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-amber-50 group-hover:border-amber-300 transition-colors">
                    {getIcon(tool.id)}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(tool.id); }} 
                    className="p-1.5 text-slate-300 hover:text-amber-500 transition cursor-pointer"
                  >
                    <Star className={`w-5 h-5 ${isFavorite(tool.id) ? 'fill-amber-400 text-amber-500' : ''}`} />
                  </button>
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">{tool.title}</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{tool.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}