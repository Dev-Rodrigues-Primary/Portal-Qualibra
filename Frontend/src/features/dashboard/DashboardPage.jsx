import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PORTAL_REGISTRY } from '../../domain/portalRegistry';
import { usePortal } from '../../context/PortalContext';
import {
  Search, Star, ArrowRight, Calculator, CheckSquare,
  FileText, CalendarDays, BarChart3, ExternalLink, BookOpen, Server,
  Sparkles, Layers, Scale, Coins, Printer, Lightbulb, LayoutList, LayoutGrid, Check
} from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const { favorites, isFavorite, toggleFavorite, registerAccess } = usePortal();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' ou 'grid'

  const handleOpenTool = (item) => {
    registerAccess(item);
    navigate(item.route);
  };

  // Ícones dinâmicos
  const getIcon = (id) => {
    switch (id) {
      case 'reforma-tributaria':
      case 'fator-r':
        return <Calculator className="w-4 h-4 text-emerald-600" />;
      case 'simples-presumido':
      case 'clt-vs-pj':
        return <Scale className="w-4 h-4 text-blue-600" />;
      case 'rescisao':
        return <Calculator className="w-4 h-4 text-indigo-600" />;
      case 'pro-labore':
        return <Coins className="w-4 h-4 text-amber-600" />;
      case 'diagnostico-tributario':
        return <BarChart3 className="w-4 h-4 text-teal-600" />;
      case 'geradores-hub':
        return <Printer className="w-4 h-4 text-purple-600" />;
      case 'checklists-hub':
        return <CheckSquare className="w-4 h-4 text-emerald-600" />;
      case 'calendario-fiscal':
        return <CalendarDays className="w-4 h-4 text-amber-600" />;
      case 'sistemas-externos':
        return <ExternalLink className="w-4 h-4 text-blue-600" />;
      case 'documentos-hub':
        return <FileText className="w-4 h-4 text-slate-600" />;
      case 'base-conhecimento':
        return <BookOpen className="w-4 h-4 text-brand-600" />;
      case 'ti-infra':
        return <Server className="w-4 h-4 text-slate-700" />;
      default:
        return <Sparkles className="w-4 h-4 text-brand-600" />;
    }
  };

  // Agrupamento temático corporativo
  const sections = [
    {
      title: 'Tributário & Fiscal',
      subtitle: 'Simulações e conformidade de impostos',
      badge: 'Fiscal',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      ids: ['reforma-tributaria', 'fator-r', 'simples-presumido', 'calendario-fiscal']
    },
    {
      title: 'Trabalhista & Sócios',
      subtitle: 'Cálculos de rescisão, pro-labore e planejamento PJ',
      badge: 'DP & Sócios',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      ids: ['rescisao', 'clt-vs-pj', 'pro-labore']
    },
    {
      title: 'Auditoria & Ferramentas',
      subtitle: 'Diagnósticos analíticos e geradores de documentos',
      badge: 'Produtividade',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      ids: ['diagnostico-tributario', 'geradores-hub', 'checklists-hub']
    },
    {
      title: 'Recursos, Sistemas & TI',
      subtitle: 'Acessos governamentais, procedimentos e suporte',
      badge: 'Acessos',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
      ids: ['sistemas-externos', 'documentos-hub', 'base-conhecimento', 'ti-infra']
    }
  ];

  // Filtro de pesquisa em tempo real
  const filteredToolsMap = useMemo(() => {
    const q = searchTerm.toLowerCase();
    const map = {};
    PORTAL_REGISTRY.forEach(t => {
      const match = t.title.toLowerCase().includes(q) ||
                    t.desc.toLowerCase().includes(q) ||
                    t.subCategory.toLowerCase().includes(q);
      if (match) map[t.id] = t;
    });
    return map;
  }, [searchTerm]);

  const favoriteTools = PORTAL_REGISTRY.filter((t) => favorites.includes(t.id));

  return (
    <div className="space-y-6 animate-fade-in-up">
      
      {/* ================= BARRA SUPERIOR COMPACTA ================= */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-full uppercase">
              Central Operacional
            </span>
            <span className="text-xs text-slate-400 font-mono">• {PORTAL_REGISTRY.length} módulos disponíveis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Painel Geral de Ferramentas & Rotinas
          </h2>
        </div>

        {/* Campo de Busca Rápida Instantânea */}
        <div className="flex items-center gap-2 max-w-md w-full">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtrar ferramenta instantaneamente..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl glass-input placeholder-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-mono"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Alternador de Modo de Visualização */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 flex-shrink-0">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'list'
                  ? 'bg-white text-brand-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Visualização em Linhas Compactas"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid'
                  ? 'bg-white text-brand-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Visualização em Cards"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= FAVORITOS EM PILLS COMPACTAS (SEM OCUPAR ESPAÇO) ================= */}
      {favoriteTools.length > 0 && !searchTerm && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mr-1 font-mono uppercase">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>Acesso Rápido:</span>
          </div>
          {favoriteTools.map((fav) => (
            <button
              key={fav.id}
              onClick={() => handleOpenTool(fav)}
              className="group flex items-center gap-2 bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-800 px-3 py-1.5 rounded-lg text-xs font-medium transition shadow-xs"
            >
              <span>{fav.title}</span>
              <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-brand-600 transition" />
            </button>
          ))}
        </div>
      )}

      {/* ================= LISTA COMPACTA POR DEPARTAMENTO (NOVO FORMATO) ================= */}
      {viewMode === 'list' ? (
        <div className="space-y-6">
          {sections.map((section, sIdx) => {
            // Filtra os itens desta seção que coincidem com a pesquisa
            const sectionTools = section.ids
              .map((id) => filteredToolsMap[id])
              .filter(Boolean);

            if (sectionTools.length === 0) return null;

            return (
              <div key={sIdx} className="glass-panel rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                
                {/* Cabeçalho da Seção */}
                <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${section.badgeColor}`}>
                      {section.badge}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">{section.title}</h3>
                    <span className="text-slate-400 text-xs hidden sm:inline">• {section.subtitle}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{sectionTools.length} itens</span>
                </div>

                {/* Linhas da Tabela/Lista */}
                <div className="divide-y divide-slate-100 bg-white">
                  {sectionTools.map((tool) => (
                    <div
                      key={tool.id}
                      onClick={() => handleOpenTool(tool)}
                      className="group px-5 py-3.5 flex items-center justify-between hover:bg-brand-50/40 cursor-pointer transition"
                    >
                      {/* Lado Esquerdo: Ícone + Título + Descrição */}
                      <div className="flex items-center space-x-3.5 pr-4 flex-grow min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-white group-hover:shadow-xs flex items-center justify-center flex-shrink-0 transition border border-slate-200">
                          {getIcon(tool.id)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-brand-700 transition truncate">
                              {tool.title}
                            </span>
                            <span className="hidden md:inline text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                              {tool.type}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{tool.desc}</p>
                        </div>
                      </div>

                      {/* Lado Direito: Favoritar + Botão Abrir */}
                      <div className="flex items-center space-x-3 flex-shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(tool.id);
                          }}
                          className="p-1.5 text-slate-300 hover:text-amber-500 transition"
                          title="Favoritar ferramenta"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              isFavorite(tool.id) ? 'fill-amber-400 text-amber-500' : ''
                            }`}
                          />
                        </button>
                        
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 bg-brand-50 group-hover:bg-brand-600 group-hover:text-white px-3 py-1.5 rounded-lg transition">
                          <span>Acessar</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* ================= MODO CARDS (PARA QUEM AINDA QUISER VER EM GRID) ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(filteredToolsMap).map((tool) => (
            <div
              key={tool.id}
              onClick={() => handleOpenTool(tool)}
              className="glass-card rounded-2xl p-5 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                    {getIcon(tool.id)}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(tool.id);
                    }}
                    className="p-1 text-slate-300 hover:text-amber-500 transition"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        isFavorite(tool.id) ? 'fill-amber-400 text-amber-500' : ''
                      }`}
                    />
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{tool.desc}</p>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-600">
                <span>Abrir ferramenta</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      )}

      {Object.keys(filteredToolsMap).length === 0 && (
        <div className="p-12 text-center text-slate-400 text-sm glass-panel rounded-2xl">
          Nenhuma ferramenta encontrada para a busca "{searchTerm}".
        </div>
      )}

    </div>
  );
}