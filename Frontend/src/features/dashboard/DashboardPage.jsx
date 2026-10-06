import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Calculator, PieChart, Scale, Users, Coins, 
  CalendarDays, Shapes, ArrowRight, CornerDownLeft 
} from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tools = [
    {
      id: 'reforma-tributaria',
      title: 'Simulador da Reforma Tributária',
      category: 'tributario',
      categoryLabel: 'Tributário',
      desc: 'Comparativo oficial de transição entre Simples Tradicional e Regime Híbrido IBS/CBS (LC 214/2025).',
      Icon: Calculator,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'fator-r',
      title: 'Análise do Fator R',
      category: 'tributario',
      categoryLabel: 'Tributário',
      desc: 'Verificação instantânea de enquadramento Anexo III vs Anexo V e projeção de folha necessária.',
      Icon: PieChart,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'simples-presumido',
      title: 'Simples vs Lucro Presumido',
      category: 'tributario',
      categoryLabel: 'Tributário',
      desc: 'Comparativo detalhado de carga tributária e alíquotas efetivas corporativas.',
      Icon: Scale,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'rescisao',
      title: 'Simulador de Rescisão CLT',
      category: 'trabalhista',
      categoryLabel: 'Trabalhista',
      desc: 'Cálculo preciso de verbas rescisórias, saldo de salário, 13º, férias e multa do FGTS.',
      Icon: Users,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'pro-labore',
      title: 'Pró-Labore x Lucros',
      category: 'contabil',
      categoryLabel: 'Contábil',
      desc: 'Otimização societária com projeção de tributação IRRF/INSS vs Distribuição Isenta.',
      Icon: Coins,
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'calendario-fiscal',
      title: 'Calendário Fiscal & Vencimentos',
      category: 'obrigacoes',
      categoryLabel: 'Obrigações',
      desc: 'Mapeamento de obrigações tributárias do mês (DAS, DARF, eSocial, DCTFWeb).',
      Icon: CalendarDays,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    }
  ];

  // Atalho global '/' para pesquisa
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredTools = tools.filter((tool) => {
    const matchesCat = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesQuery =
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Search & Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl p-8 lg:p-10 border border-slate-200 glass-panel">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-mono tracking-widest text-brand-700 font-semibold uppercase bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
            Acesso Operacional Rápido
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            O que você precisa calcular ou consultar hoje?
          </h2>

          {/* Campo de Busca */}
          <div className="relative pt-2">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-slate-400 w-5 h-5 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar ferramenta, calculadora ou atalho... (Pressione '/' para focar)"
                className="w-full pl-12 pr-24 py-4 rounded-xl glass-input text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-500 shadow-sm"
              />
              <span className="absolute right-4 font-mono text-xs text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md">
                /
              </span>
            </div>
          </div>

          {/* Atalhos Rápidos */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="text-slate-500 font-medium">Atalhos:</span>
            <button
              onClick={() => navigate('/ferramentas/reforma-tributaria')}
              className="bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-700 px-2.5 py-1 rounded-lg transition shadow-sm"
            >
              Reforma Tributária
            </button>
            <button
              onClick={() => navigate('/ferramentas/fator-r')}
              className="bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-700 px-2.5 py-1 rounded-lg transition shadow-sm"
            >
              Fator R
            </button>
            <button
              onClick={() => navigate('/ferramentas/simples-presumido')}
              className="bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-700 px-2.5 py-1 rounded-lg transition shadow-sm"
            >
              Simples vs Presumido
            </button>
            <button
              onClick={() => navigate('/ferramentas/calendario-fiscal')}
              className="bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-700 px-2.5 py-1 rounded-lg transition shadow-sm"
            >
              Calendário Fiscal
            </button>
          </div>
        </div>
      </div>

      {/* Categorias & Cabeçalho da Lista */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Shapes className="w-5 h-5 text-brand-600" />
            Sistemas & Calculadoras
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Selecione uma ferramenta abaixo para iniciar os cálculos instantâneos
          </p>
        </div>

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'tributario', label: 'Tributário' },
            { id: 'trabalhista', label: 'Trabalhista' },
            { id: 'contabil', label: 'Contábil' },
            { id: 'obrigacoes', label: 'Obrigações' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`font-medium text-xs px-3 py-1.5 rounded-lg transition ${
                selectedCategory === cat.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Ferramentas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => {
            const IconComp = tool.Icon;
            return (
              <div
                key={tool.id}
                onClick={() => navigate(`/ferramentas/${tool.id}`)}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md border uppercase tracking-wider ${tool.badgeColor}`}
                    >
                      {tool.categoryLabel}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {tool.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{tool.desc}</p>
                  </div>
                </div>
                <div className="pt-6 flex items-center justify-between border-t border-slate-100 mt-4 text-xs font-semibold text-brand-600">
                  <span>Abrir ferramenta</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500 text-sm">
            Nenhuma ferramenta encontrada para a busca "{searchTerm}".
          </div>
        )}
      </div>
    </div>
  );
}
