import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calculator, PieChart, Users, Coins, ArrowRight, Layers, Sparkles } from 'lucide-react';

export function IntroPage() {
  const navigate = useNavigate();

  const highlightCards = [
    {
      title: 'LC 214/2025 & IBS/CBS',
      category: 'Reforma Tributária',
      desc: 'Simulação do período de transição entre o Simples Nacional Tradicional e o modelo Híbrido.',
      route: '/ferramentas/reforma-tributaria',
      borderColor: 'border-t-emerald-500',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200 group-hover:bg-emerald-600',
      tagColor: 'text-emerald-700 bg-emerald-50',
      btnText: 'Iniciar Simulação',
      Icon: Calculator
    },
    {
      title: 'Análise de Fator R',
      category: 'Planejamento Simples',
      desc: 'Verificação instantânea do enquadramento nos Anexos III ou V com metas de folha.',
      route: '/ferramentas/fator-r',
      borderColor: 'border-t-teal-500',
      iconBg: 'bg-teal-50 text-teal-600 border-teal-200 group-hover:bg-teal-600',
      tagColor: 'text-teal-700 bg-teal-50',
      btnText: 'Verificar Enquadramento',
      Icon: PieChart
    },
    {
      title: 'Simulador Rescisório CLT',
      category: 'Cálculos Trabalhistas',
      desc: 'Apuração detalhada de saldo de salário, 13º, férias, FGTS e multa rescisória.',
      route: '/ferramentas/rescisao',
      borderColor: 'border-t-blue-500',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200 group-hover:bg-blue-600',
      tagColor: 'text-blue-700 bg-blue-50',
      btnText: 'Calcular Rescisão',
      Icon: Users
    },
    {
      title: 'Pró-Labore x Lucros',
      category: 'Otimização Societária',
      desc: 'Projeção da retenção de INSS/IRRF versus distribuição isenta aos sócios.',
      route: '/ferramentas/pro-labore',
      borderColor: 'border-t-indigo-500',
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200 group-hover:bg-indigo-600',
      tagColor: 'text-indigo-700 bg-indigo-50',
      btnText: 'Simular Pró-Labore',
      Icon: Coins
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Intro Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" /> Bem-vindo ao Servidor Operacional
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          A plataforma inteligente de simulação & cálculos do{' '}
          <span className="text-brand-600">Grupo Qualibra</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Selecione um dos módulos estratégicos abaixo para iniciar suas análises em tempo real ou acesse o hub de ferramentas corporativas.
        </p>

        <div className="pt-2 flex justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-brand-600/25 transition-all hover:scale-[1.02] text-sm"
          >
            <span>Acessar Portal Operacional Completo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
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
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl group-hover:text-white transition-colors ${card.iconBg}`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span
                    className={`text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded ${card.tagColor}`}
                  >
                    {card.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-brand-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{card.desc}</p>
                </div>
              </div>
              <div className="pt-6 flex items-center justify-between border-t border-slate-100 text-xs font-semibold text-brand-600">
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
