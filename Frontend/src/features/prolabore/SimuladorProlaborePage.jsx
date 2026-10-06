import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateProlabore } from '../../domain/taxCalculators';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
import { Coins, ShieldAlert } from 'lucide-react';

export function SimuladorProlaborePage() {
  const [valor, setValor] = useState(3000);

  const result = useMemo(() => {
    return calculateProlabore({ valor: parseNumberInput(valor) });
  }, [valor]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Pró-Labore x Lucros' }]} />

      <div className="glass-panel p-6 rounded-2xl border border-slate-200">
        <span className="text-[10px] font-mono font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full uppercase">
          Otimização Tributária de Sócios
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Pró-Labore x Distribuição de Lucros</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Simule a retenção real de INSS (teto da previdência) e IRRF progressivo para encontrar o equilíbrio com a distribuição isenta.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Pró-Labore Bruto Mensal Desejado (R$)
            </label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-800">
            A distribuição de lucros é isenta de IR e INSS (desde que haja lucro contábil apurado e regularidade fiscal).
          </div>
        </div>

        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Retenções Oficiais na Fonte
          </h3>
          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">INSS Retido (11% com teto):</span>
              <span className="text-rose-600 font-bold">{formatCurrency(result.inss)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">IRRF Retido (Tabela Progressiva RFB):</span>
              <span className="text-rose-600 font-bold">{formatCurrency(result.irrf)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Carga Efetiva de Retenção:</span>
              <span className="text-slate-700 font-bold">{formatPercent(result.aliquotaEfetiva)}</span>
            </div>
            <div className="flex justify-between py-3 text-sm font-bold text-purple-700 border-t border-slate-200">
              <span>Pró-Labore Líquido do Sócio:</span>
              <span className="text-lg">{formatCurrency(result.prolaboreLiquido)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
