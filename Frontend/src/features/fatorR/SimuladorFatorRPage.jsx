import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateFatorR } from '../../domain/taxCalculators';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
import { PieChart, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

export function SimuladorFatorRPage() {
  const [rbt12, setRbt12] = useState(240000);
  const [folha12, setFolha12] = useState(60000);
  const [receitaMes, setReceitaMes] = useState(20000);

  const result = useMemo(() => {
    return calculateFatorR({
      rbt12: parseNumberInput(rbt12),
      folha12: parseNumberInput(folha12),
      receitaMensal: parseNumberInput(receitaMes)
    });
  }, [rbt12, folha12, receitaMes]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Análise de Fator R (LC 123/2006)' }]} />

      <div className="glass-panel p-6 rounded-2xl border border-slate-200">
        <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
          Art. 18, Lei Complementar 123/2006
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Análise do Fator R</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Verifique o enquadramento entre Anexo III (6%) e Anexo V (15,5%) e calcule a economia tributária mensal alcançável.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Dados Operacionais
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              RBT12 — Receita Bruta Acumulada 12 Meses (R$)
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
              Folha Acumulada 12 Meses c/ Pró-Labore (R$)
            </label>
            <input
              type="number"
              value={folha12}
              onChange={(e) => setFolha12(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Receita Média Mensal Atual (R$)
            </label>
            <input
              type="number"
              value={receitaMes}
              onChange={(e) => setReceitaMes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>
        </div>

        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-200 space-y-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Resultado da Apuração
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Fator R Apurado</span>
              <div className="text-3xl font-bold font-mono text-brand-600 mt-1">
                {formatPercent(result.fatorRPercent)}
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Meta para Anexo III: ≥ 28,00%</span>
            </div>

            <div
              className={`p-4 rounded-xl border shadow-xs ${
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
                <span className="text-[10px] font-mono uppercase font-bold">Enquadramento</span>
              </div>
              <div className="text-base font-bold mt-1">{result.anexo}</div>
              <span className="text-[10px] block mt-1">
                Alíquota efetiva: {formatPercent(result.enquadraAnexo3 ? result.aliqAnexo3 : result.aliqAnexo5)}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs font-mono shadow-xs">
            <div className="flex justify-between text-slate-700">
              <span>Imposto mensal no Anexo III:</span>
              <span className="font-bold text-emerald-600">{formatCurrency(result.impostoAnexo3)}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Imposto mensal no Anexo V:</span>
              <span className="font-bold text-rose-600">{formatCurrency(result.impostoAnexo5)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-100 text-brand-700 font-bold">
              <span>Economia mensal ao atingir o Fator R:</span>
              <span>{formatCurrency(result.economiaMensal)} / mês</span>
            </div>
          </div>

          {!result.enquadraAnexo3 && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1 text-xs font-mono">
              <div className="font-bold uppercase">Plano de Ajuste de Folha / Pró-Labore:</div>
              <div>Falta para atingir 28%: <b>{formatCurrency(result.faltaAno)}</b> no ano.</div>
              <div>Aumento recomendado no pró-labore: <b>{formatCurrency(result.faltaMes)}</b> por mês.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}