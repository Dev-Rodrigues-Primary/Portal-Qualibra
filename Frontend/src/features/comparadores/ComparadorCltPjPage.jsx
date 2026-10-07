import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateCltVsPj } from '../../domain/taxCalculators';
import { formatCurrency, parseNumberInput } from '../../utils/formatters';
import { Scale, CheckCircle2, ArrowRight } from 'lucide-react';

export function ComparadorCltPjPage() {
  const [salarioClt, setSalarioClt] = useState(6000);
  const [valorPj, setValorPj] = useState(10000);
  const [regime, setRegime] = useState('simples');

  const result = useMemo(() => {
    return calculateCltVsPj({
      salarioClt: parseNumberInput(salarioClt),
      valorPj: parseNumberInput(valorPj),
      regimeEmpresa: regime
    });
  }, [salarioClt, valorPj, regime]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Comparador CLT vs PJ (Custo Corporativo)' }]} />

      <div className="glass-panel p-6 rounded-2xl border border-slate-200">
        <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
          Planejamento de Contratação & Folha
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Comparativo Corporativo: CLT vs PJ</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Calcule com exatidão o custo total para a empresa e o valor líquido final percebido pelo profissional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Valores Propostos
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Regime Tributário da Empresa Contratante</label>
            <select
              value={regime}
              onChange={(e) => setRegime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
            >
              <option value="simples">Simples Nacional (Sem INSS Patronal de 20%)</option>
              <option value="presumido">Lucro Presumido / Real (Encargos Patronais de 28,3%)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Salário CLT Bruto Proposto (R$)</label>
            <input
              type="number"
              value={salarioClt}
              onChange={(e) => setSalarioClt(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Valor da Nota Fiscal PJ (R$)</label>
            <input
              type="number"
              value={valorPj}
              onChange={(e) => setValorPj(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>
        </div>

        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Comparativo Lado a Lado
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase font-mono">Modelo CLT</span>
              <div className="text-xs text-slate-500">Custo Total para a Empresa:</div>
              <div className="text-xl font-bold font-mono text-slate-900">{formatCurrency(result.custoEmpresaClt)}</div>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">Líquido na Mão do Empregado:</div>
              <div className="text-xl font-bold font-mono text-emerald-600">{formatCurrency(result.liquidoClt)}</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-brand-700 uppercase font-mono">Modelo PJ</span>
              <div className="text-xs text-slate-500">Custo Total para a Empresa:</div>
              <div className="text-xl font-bold font-mono text-slate-900">{formatCurrency(result.custoEmpresaPj)}</div>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">Líquido na Mão do PJ:</div>
              <div className="text-xl font-bold font-mono text-emerald-600">{formatCurrency(result.liquidoPj)}</div>
            </div>
          </div>

          <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-xs text-brand-900">
            <b>Ponto de Equilíbrio Corporativo:</b> Uma proposta PJ de <b>{formatCurrency(result.pjEquivalente)}</b> possui custo equivalente ao salário CLT de {formatCurrency(salarioClt)}.
          </div>
        </div>
      </div>
    </div>
  );
}