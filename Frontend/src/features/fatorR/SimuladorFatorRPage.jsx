import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateFatorR } from '../../domain/taxCalculators';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
import { PieChart, CheckCircle2, AlertCircle } from 'lucide-react';

export function SimuladorFatorRPage() {
  const [rbt12, setRbt12] = useState(200000);
  const [folha12, setFolha12] = useState(50000);

  const result = useMemo(() => {
    return calculateFatorR({
      rbt12: parseNumberInput(rbt12),
      folha12: parseNumberInput(folha12)
    });
  }, [rbt12, folha12]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Análise de Fator R' }]} />

      <div className="glass-panel p-6 rounded-2xl border border-slate-200">
        <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
          Planejamento Tributário - Simples Nacional
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Análise de Fator R</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Descubra se sua empresa se enquadra no Anexo III (alíquota inicial de 6%) ou Anexo V (15,5%) e calcule o ajuste de folha necessário.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Entradas */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            1. Dados Operacionais
          </h3>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              RBT12 — Receita Bruta 12 Meses (R$)
            </label>
            <input
              type="number"
              value={rbt12}
              onChange={(e) => setRbt12(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Folha de Pagamento 12 Meses (R$)
            </label>
            <input
              type="number"
              value={folha12}
              onChange={(e) => setFolha12(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Inclui salários, encargos patronais e pró-labore declarado dos sócios.
            </span>
          </div>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-200 space-y-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            2. Resultado da Análise
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Fator R Apurado</span>
              <div className="text-3xl font-bold font-mono text-brand-600 mt-1">
                {formatPercent(result.fatorRPercent)}
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Meta para Anexo III: ≥ 28,00%</span>
            </div>

            <div
              className={`p-4 rounded-xl border shadow-sm ${
                result.enquadraAnexo3
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}
            >
              <div className="flex items-center gap-2">
                {result.enquadraAnexo3 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                )}
                <span className="text-[10px] font-mono uppercase font-semibold">Enquadramento</span>
              </div>
              <div className="text-lg font-bold mt-1">{result.anexo}</div>
              <span className="text-[10px] block mt-1 opacity-90">
                {result.enquadraAnexo3 ? 'Tributação vantajosa reduzida' : 'Alíquota inicial mais cara (15,5%)'}
              </span>
            </div>
          </div>

          {!result.enquadraAnexo3 && (
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs font-mono shadow-sm">
              <div className="flex justify-between text-slate-700">
                <span>Falta na folha (Anual):</span>
                <span className="font-bold text-amber-600">{formatCurrency(result.faltaAno)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Equivale por mês (Aumento em Pró-Labore/Salários):</span>
                <span className="font-bold text-amber-600">{formatCurrency(result.faltaMes)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
