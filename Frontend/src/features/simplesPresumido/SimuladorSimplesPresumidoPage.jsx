import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateSimplesPresumidoExato } from '../../domain/taxCalculators';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
export function SimuladorSimplesPresumidoPage() {
  const [fat, setFat] = useState(1500000); const [folha, setFolha] = useState(400000); const [anexo, setAnexo] = useState('III');
  const res = useMemo(() => calculateSimplesPresumidoExato({ faturamentoAnual: parseNumberInput(fat), folhaAnual: parseNumberInput(folha), anexoSimples: anexo }), [fat, folha, anexo]);
  return (
    <div className="space-y-6">
      <div className="no-print"><Breadcrumbs items={[{ label: 'Simples vs Presumido' }]} /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 border rounded-2xl space-y-4 no-print">
          <label className="block text-xs font-medium">Faturamento Anual<input type="number" value={fat} onChange={e=>setFat(e.target.value)} className="w-full p-2 border rounded mt-1"/></label>
          <label className="block text-xs font-medium">Folha Anual<input type="number" value={folha} onChange={e=>setFolha(e.target.value)} className="w-full p-2 border rounded mt-1"/></label>
          <label className="block text-xs font-medium">Anexo<select value={anexo} onChange={e=>setAnexo(e.target.value)} className="w-full p-2 border rounded mt-1"><option value="I">I (Comércio)</option><option value="III">III (Serviço)</option><option value="IV">IV (INSS por fora)</option></select></label>
        </div>
        <div className="glass-panel p-6 border rounded-2xl space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl text-center font-bold text-sm">
            {res.simplesVence ? `Simples vence por ${formatCurrency(res.economiaAnual)}` : `Presumido vence por ${formatCurrency(res.economiaAnual)}`}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border p-4 rounded-xl text-center"><div className="text-xs text-slate-500">Simples Nacional</div><div className="text-lg font-bold">{formatCurrency(res.totalSimples)}</div></div>
            <div className="border p-4 rounded-xl text-center"><div className="text-xs text-slate-500">Lucro Presumido (+CPP 28.3%)</div><div className="text-lg font-bold text-brand-600">{formatCurrency(res.totalPresumido)}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}