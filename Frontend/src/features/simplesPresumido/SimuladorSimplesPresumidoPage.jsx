import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateSimplesPresumido } from '../../domain/taxCalculators';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
import { Scale, CheckCircle } from 'lucide-react';

export function SimuladorSimplesPresumidoPage() {
  const [faturamento, setFaturamento] = useState(1500000);
  const [folha, setFolha] = useState(400000);
  const [atividade, setAtividade] = useState('servico');

  const result = useMemo(() => {
    return calculateSimplesPresumido({
      faturamento: parseNumberInput(faturamento),
      folha: parseNumberInput(folha),
      atividade
    });
  }, [faturamento, folha, atividade]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Simples vs Lucro Presumido' }]} />

      <div className="glass-panel p-6 rounded-2xl border border-slate-200">
        <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
          Planejamento Tributário Corporativo
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Simples Nacional vs Lucro Presumido</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Compare a carga tributária anual estimada para tomada de decisão estratégica entre os dois regimes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Parâmetros de Entrada
          </h3>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Faturamento Anual Previsto (R$)
            </label>
            <input
              type="number"
              value={faturamento}
              onChange={(e) => setFaturamento(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Folha Salarial Anual + Pró-Labore (R$)
            </label>
            <input
              type="number"
              value={folha}
              onChange={(e) => setFolha(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Tipo de Atividade</label>
            <select
              value={atividade}
              onChange={(e) => setAtividade(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
            >
              <option value="servico">Prestação de Serviços (ISS)</option>
              <option value="comercio">Comércio Geral (ICMS)</option>
            </select>
          </div>
        </div>

        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-200 space-y-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Comparativo de Tributação Anual
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-mono">Simples Nacional</span>
              <div className="text-2xl font-bold font-mono text-brand-600 mt-1">
                {formatCurrency(result.totalSimples)}
              </div>
              <span className="text-[10px] text-slate-500 block mt-1 font-mono">
                Alíq. Efetiva: {formatPercent(result.aliqEfetivaSimples)}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-mono">Lucro Presumido</span>
              <div className="text-2xl font-bold font-mono text-blue-600 mt-1">
                {formatCurrency(result.totalPresumido)}
              </div>
              <span className="text-[10px] text-slate-500 block mt-1 font-mono">
                Alíq. Efetiva: {formatPercent(result.aliqEfetivaPresumido)}
              </span>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border text-xs font-medium flex items-center gap-3 ${
              result.simplesMelhor
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>
              {result.simplesMelhor
                ? `Recomendação: Mantendo o Simples Nacional a empresa economizará aproximadamente ${formatCurrency(
                    result.economiaSimples
                  )} ao ano.`
                : `Recomendação: O Lucro Presumido oferece vantagem estimada de ${formatCurrency(
                    Math.abs(result.economiaSimples)
                  )} ao ano devido à composição da folha.`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
