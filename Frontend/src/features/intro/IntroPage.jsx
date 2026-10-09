import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QualibraLogo } from '../../components/common/QualibraLogo';
import { 
  Calculator, PieChart, Users, Coins, ArrowRight, Layers, 
  Sparkles, ShieldCheck, Zap, Scale, Cpu, Search
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export function IntroPage() {
  const navigate = useNavigate();
  const { setIsSearchOpen } = usePortal();
  const [hoveredCard, setHoveredCard] = useState(null);

  const highlightCards = [
    {
      id: 'reforma',
      title: 'Reforma Tributária',
      sub: 'LC 214/2025 & IBS/CBS',
      category: 'Tributário',
      desc: 'Simulação comparativa entre Simples Nacional e o Regime Híbrido com apropriação de créditos de insumos.',
      metric: 'Transição 2026 a 2033',
      route: '/ferramentas/reforma-tributaria',
      borderColor: 'hover:border-emerald-500',
      tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      iconBg: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
      glowColor: 'group-hover:shadow-emerald-500/15',
      Icon: Calculator
    },
    {
      id: 'fator-r',
      title: 'Análise de Fator R',
      sub: 'LC 123/2006 • Art. 18',
      category: 'Planejamento',
      desc: 'Verificação da proporção de folha (28%) com cálculo do GAP em reais e custo marginal do pró-labore.',
      metric: 'Economia Anexo III vs V',
      route: '/ferramentas/fator-r',
      borderColor: 'hover:border-amber-500',
      tagColor: 'text-amber-800 bg-amber-50 border-amber-200',
      iconBg: 'bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white',
      glowColor: 'group-hover:shadow-amber-500/15',
      Icon: PieChart
    },
    {
      id: 'rescisao',
      title: 'Rescisão CLT',
      sub: 'Padrão eSocial / DCTFWeb',
      category: 'Departamento Pessoal',
      desc: 'Apuração com aviso prévio proporcional da Lei 12.506/11 e segregação das bases de incidência tributária.',
      metric: 'Acordo Mútuo 484-A',
      route: '/ferramentas/rescisao',
      borderColor: 'hover:border-blue-500',
      tagColor: 'text-blue-700 bg-blue-50 border-blue-200',
      iconBg: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
      glowColor: 'group-hover:shadow-blue-500/15',
      Icon: Users
    },
    {
      id: 'prolabore',
      title: 'Pró-Labore x Lucros',
      sub: 'Otimização Societária',
      category: 'Controladoria',
      desc: 'Simulação com trava do teto do RGPS e aplicação automática do desconto simplificado da Receita Federal.',
      metric: 'Isenção Lei 9.249/95',
      route: '/ferramentas/pro-labore',
      borderColor: 'hover:border-purple-500',
      tagColor: 'text-purple-700 bg-purple-50 border-purple-200',
      iconBg: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
      glowColor: 'group-hover:shadow-purple-500/15',
      Icon: Coins
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in-up py-4">
      
      {/* ================= HERO PRINCIPAL COM ANIMAÇÃO FLUTUANTE ================= */}
      <div className="text-center max-w-4xl mx-auto space-y-6 pt-2">
        
        {/* LOGO QUALIBRA COM LEVITAÇÃO SUAVE */}
        <div className="flex justify-center mb-3">
          <div className="animate-float-slow p-3 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/80 shadow-xs hover:scale-105 transition-transform duration-300">
            <QualibraLogo size="xl" showText={true} layout="vertical" />
          </div>
        </div>

        {/* PÍLULAS INTERATIVAS DE STATUS */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-900 bg-amber-50 border border-amber-300/80 px-3.5 py-1 rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            Homologação Interna 2026
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-700 bg-white/80 border border-slate-200 px-3 py-1 rounded-full shadow-2xs hover:border-brand-400 transition cursor-default">
            <Zap className="w-3.5 h-3.5 text-brand-600" /> 0ms Latência Local
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-700 bg-white/80 border border-slate-200 px-3 py-1 rounded-full shadow-2xs hover:border-purple-400 transition cursor-default">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Intranet Blindada
          </span>
        </div>

        {/* TÍTULO PRINCIPAL DE IMPACTO */}
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
          Inteligência Tributária, Fiscal e Trabalhista do{' '}
          <span className="text-slate-900 underline decoration-amber-400 decoration-wavy decoration-2">Grupo Qualibra</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
          Plataforma corporativa de simulações em tempo real. Selecione um dos módulos de alta precisão abaixo para iniciar suas análises ou explore o hub completo de rotinas.
        </p>

        {/* BOTÕES DE AÇÃO INTERATIVOS */}
        <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="group relative inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.02] text-sm cursor-pointer qualibra-shine"
          >
            <span>Acessar Painel Operacional</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-4 rounded-2xl border border-slate-200 shadow-xs transition-all hover:scale-[1.02] text-sm cursor-pointer"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span>Buscar Ferramenta</span>
            <kbd className="font-mono text-[10px] bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded text-slate-500 ml-1">
              /
            </kbd>
          </button>
        </div>
      </div>

      {/* ================= 4 CARDS INTERATIVOS COM MICRO-ESTATÍSTICAS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
        {highlightCards.map((card) => {
          const IconComponent = card.Icon;
          return (
            <div
              key={card.id}
              onClick={() => navigate(card.route)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`glass-card rounded-3xl p-6 cursor-pointer group flex flex-col justify-between border-2 border-slate-100 ${card.borderColor} ${card.glowColor} hover:shadow-xl transition-all duration-300`}
            >
              <div className="space-y-4">
                {/* Header do Card com Ícone e Categoria */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 ${card.iconBg}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full border ${card.tagColor}`}>
                    {card.category}
                  </span>
                </div>

                {/* Título e Descrição */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors tracking-tight">
                    {card.title}
                  </h3>
                  <div className="text-[11px] font-mono font-bold text-slate-400 mt-0.5">
                    {card.sub}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* Rodapé do Card com Mini-Métrica Dinâmica */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60 group-hover:bg-amber-50 group-hover:text-amber-900 group-hover:border-amber-200 transition-colors">
                  {card.metric}
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-amber-400 transition-all duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= FAIXA INFERIOR DE INDICADORES RÁPIDOS ================= */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="space-y-1">
          <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">6+</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Motores Fiscais</div>
          <div className="text-[10px] text-slate-400 font-mono">Apuração Dinâmica</div>
        </div>

        <div className="space-y-1 border-l border-slate-100">
          <div className="text-2xl font-black text-brand-600 font-mono tracking-tight">2026</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Legislação Ativa</div>
          <div className="text-[10px] text-slate-400 font-mono">LC 214/25 & eSocial</div>
        </div>

        <div className="space-y-1 border-l border-slate-100">
          <div className="text-2xl font-black text-amber-500 font-mono tracking-tight">R$ 897,32</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Teto RGPS Oficial</div>
          <div className="text-[10px] text-slate-400 font-mono">Dedução Automática</div>
        </div>

        <div className="space-y-1 border-l border-slate-100">
          <div className="text-2xl font-black text-blue-600 font-mono tracking-tight">100%</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Intranet Local</div>
          <div className="text-[10px] text-slate-400 font-mono">Servidor T130 Ativo</div>
        </div>
      </div>

    </div>
  );
}