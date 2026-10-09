import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QualibraLogo } from '../../components/common/QualibraLogo';
import { Calculator, PieChart, Users, Coins, ArrowRight, Layers, Phone, AlertTriangle } from 'lucide-react';

export function IntroPage() {
  const navigate = useNavigate();

  const highlightCards = [
    {
      title: 'LC 214/2025 & IBS/CBS',
      category: 'Reforma Tributária',
      desc: 'Simulação do período de transição entre o Simples Nacional Tradicional e o modelo Híbrido.',
      route: '/ferramentas/reforma-tributaria',
      borderColor: 'border-t-emerald-500',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      tagColor: 'text-emerald-700 bg-emerald-50',
      btnText: 'Simulação da Reforma',
      Icon: Calculator
    },
    {
      title: 'Análise de Fator R',
      category: 'Planejamento Simples',
      desc: 'Verificação com GAP de folha e custo tributário marginal no CPF do sócio.',
      route: '/ferramentas/fator-r',
      borderColor: 'border-t-amber-500',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
      tagColor: 'text-amber-800 bg-amber-50',
      btnText: 'Auditoria de Fator R',
      Icon: PieChart
    },
    {
      title: 'Rescisão Trabalhista CLT',
      category: 'Departamento Pessoal',
      desc: 'Cálculo com aviso prévio proporcional da Lei 12.506 e bases de incidência separadas.',
      route: '/ferramentas/rescisao',
      borderColor: 'border-t-blue-500',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
      tagColor: 'text-blue-700 bg-blue-50',
      btnText: 'Calcular Rescisão',
      Icon: Users
    },
    {
      title: 'Pró-Labore x Lucros',
      category: 'Otimização Societária',
      desc: 'Teto RGPS 2026 de R$ 897,32 e desconto simplificado automático da Receita Federal.',
      route: '/ferramentas/pro-labore',
      borderColor: 'border-t-purple-500',
      iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
      tagColor: 'text-purple-700 bg-purple-50',
      btnText: 'Simular Pró-Labore',
      Icon: Coins
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in-up py-4">
      
      {/* AVISO DE HOMOLOGAÇÃO NO CANTO SUPERIOR DIREITO */}
      

      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-5 pt-2">
        <div className="flex justify-center mb-4">
          <QualibraLogo size="xl" showText={true} layout="vertical" />
        </div>

        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-900 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-amber-600" /> Ambiente de Homologação Interna
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          A plataforma inteligente de simulação & cálculos da <span className="text-slate-900">Qualibra</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Hub de simulações preliminares para suporte às rotinas fiscais e trabalhistas. Todos os valores gerados requerem validação técnica do responsável.
        </p>

        <div className="pt-3 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl shadow-md transition-all hover:scale-102 text-sm cursor-pointer"
          >
            <span>Acessar Portal Operacional</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Grid de Destaques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {highlightCards.map((card, idx) => {
          const IconComponent = card.Icon;
          return (
            <div
              key={idx}
              onClick={() => navigate(card.route)}
              className={`glass-card rounded-2xl p-6 cursor-pointer group flex flex-col justify-between border-t-4 ${card.borderColor}`}
            >
              <div className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl transition-colors ${card.iconBg}`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className={`text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded ${card.tagColor}`}>
                    {card.category}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-2 group-hover:text-amber-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{card.desc}</p>
                </div>
              </div>
              <div className="pt-6 flex items-center justify-between border-t border-slate-100 text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                <span>{card.btnText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}