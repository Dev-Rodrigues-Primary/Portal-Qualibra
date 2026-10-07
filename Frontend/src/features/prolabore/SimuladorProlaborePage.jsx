import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateProlabore } from '../../domain/taxCalculators';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
export function SimuladorProlaborePage() {
  const [val, setVal] = useState(5000);
  const res = useMemo(() => calculateProlabore({ valor: parseNumberInput(val) }), [val]);
  return (
    <div className="space-y-6">
      <div className="no-print"><Breadcrumbs items={[{ label: 'Pró-Labore (INSS e IRPF)' }]} /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 border rounded-2xl no-print">
          <label className="block text-xs font-medium">Pró-Labore Bruto<input type="number" value={val} onChange={e=>setVal(e.target.value)} className="w-full p-2 border rounded mt-1"/></label>
        </div>
        <div className="glass-panel p-6 border rounded-2xl space-y-2 text-xs font-mono">
          <div className="flex justify-between text-rose-600"><span>INSS (Teto 2026):</span><span>{formatCurrency(res.inss)}</span></div>
          <div className="flex justify-between text-rose-600"><span>IRPF (Desc. Simplificado):</span><span>{formatCurrency(res.irrf)}</span></div>
          <div className="flex justify-between font-bold text-sm text-brand-700 border-t pt-2"><span>Líquido:</span><span>{formatCurrency(res.prolaboreLiquido)}</span></div>
        </div>
      </div>
    </div>
  );
}