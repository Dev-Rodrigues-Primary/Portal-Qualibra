import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { formatCurrency, formatPercent } from '../../utils/formatters';
export function DiagnosticosPage() {
  const [fat, setFat] = useState(1800000); const [folha, setFolha] = useState(360000); const [reg, setReg] = useState('simples_v');
  const perc = fat>0 ? (folha/fat)*100 : 0;
  return (
    <div className="space-y-6">
      <div className="no-print"><Breadcrumbs items={[{ label: 'Auditoria Fator R' }]} /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 border rounded-2xl space-y-4 no-print">
          <label className="block text-xs font-medium">Regime<select value={reg} onChange={e=>setReg(e.target.value)} className="w-full p-2 border rounded mt-1"><option value="simples_v">Simples (Anexo V)</option><option value="outros">Outros</option></select></label>
          <label className="block text-xs font-medium">Faturamento<input type="number" value={fat} onChange={e=>setFat(e.target.value)} className="w-full p-2 border rounded mt-1"/></label>
          <label className="block text-xs font-medium">Folha<input type="number" value={folha} onChange={e=>setFolha(e.target.value)} className="w-full p-2 border rounded mt-1"/></label>
        </div>
        <div className="glass-panel p-6 border rounded-2xl space-y-4">
          <div className="text-2xl font-bold">{formatPercent(perc)} <span className="text-xs font-normal">Folha/Receita</span></div>
          {reg==='simples_v' && perc<28 && <div className="p-4 bg-amber-50 text-amber-800 border rounded-xl text-sm">Alerta: Sujeito ao Anexo V (Fator R menor que 28%).</div>}
        </div>
      </div>
    </div>
  );
}