import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { Scale, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export function ComparadorCltPjPage() {
  const [salarioClt, setSalarioClt] = useState(6000);
  const [valorPj, setValorPj] = useState(10000);

  // Estimativa CLT: Custo Empresa = Salário + FGTS (8%) + Provisão 13º/Férias (11,11%) + Terço Férias (2,77%)
  const custoEmpresaClt = salarioClt * 1.68;
  const inssEmpregado = Math.min(salarioClt * 0.11, 908.85);
  const irrfEmpregado = salarioClt > 2826 ? (salarioClt - inssEmpregado) * 0.15 - 381.44 : 0;
  const liquidoClt = salarioClt - inssEmpregado - Math.max(0, irrfEmpregado);

  // Estimativa PJ (Simples Nacional Anexo III ~6% imposto sobre NF)
  const impostoPj = valorPj * 0.06;
  const contadorPj = 300;
  const liquidoPj = valorPj - impostoPj - contadorPj;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Comparador CLT vs PJ' }]} />

      <div className="glass-panel p-6 rounded-2xl border border-slate-200">
        <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
          Planejamento de Contratação
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Comparativo Corporativo: CLT vs PJ</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Avalie o custo corporativo total para a empresa e a remuneração líquida estimada percebida pelo profissional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Valores de Referência
          </h3>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Salário CLT Proposto (R$)</label>
            <input
              type="number"
              value={salarioClt}
              onChange={(e) => setSalarioClt(parseFloat(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Honorário / Nota PJ Proposta (R$)</label>
            <input
              type="number"
              value={valorPj}
              onChange={(e) => setValorPj(parseFloat(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>
        </div>

        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Resultado Comparativo Lado a Lado
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase font-mono">Modelo CLT</span>
              <div className="text-xs text-slate-500">Custo Total Empresa:</div>
              <div className="text-lg font-bold font-mono text-slate-900">{formatCurrency(custoEmpresaClt)}</div>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">Líquido do Profissional:</div>
              <div className="text-lg font-bold font-mono text-emerald-600">{formatCurrency(liquidoClt)}</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-brand-700 uppercase font-mono">Modelo PJ (Prestador)</span>
              <div className="text-xs text-slate-500">Custo Total Empresa:</div>
              <div className="text-lg font-bold font-mono text-slate-900">{formatCurrency(valorPj)}</div>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">Líquido do Profissional:</div>
              <div className="text-lg font-bold font-mono text-emerald-600">{formatCurrency(liquidoPj)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}