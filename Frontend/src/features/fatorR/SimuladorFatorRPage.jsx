import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateFatorRCompleto } from '../../domain/taxCalculators';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
export function SimuladorFatorRPage() {
  const [rbt12, setRbt12] = useState(240000); const [folha12, setFolha12] = useState(60000); const [rec, setRec] = useState(20000); const [teto, setTeto] = useState(false);
  const res = useMemo(() => calculateFatorRCompleto({ rbt12: parseNumberInput(rbt12), folha12: parseNumberInput(folha12), receitaMes: parseNumberInput(rec), socioNoTetoInss: teto }), [rbt12, folha12, rec, teto]);
  return (
    <div className="space-y-6">
      <div className="no-print"><Breadcrumbs items={[{ label: 'Fator R (LC 123/2006)' }]} /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border space-y-4 no-print">
          <label className="block text-xs font-medium">RBT12<input type="number" value={rbt12} onChange={e=>setRbt12(e.target.value)} className="w-full p-2 border rounded mt-1"/></label>
          <label className="block text-xs font-medium">Folha Acumulada 12m<input type="number" value={folha12} onChange={e=>setFolha12(e.target.value)} className="w-full p-2 border rounded mt-1"/></label>
          <label className="block text-xs font-medium">Receita Mês<input type="number" value={rec} onChange={e=>setRec(e.target.value)} className="w-full p-2 border rounded mt-1"/></label>
          <label className="flex gap-2 text-xs"><input type="checkbox" checked={teto} onChange={e=>setTeto(e.target.checked)}/>Sócio no Teto do INSS em outro CNPJ</label>
        </div>
        <div className="glass-panel p-6 rounded-2xl border space-y-4">
          <div className="text-3xl font-bold text-brand-600">{formatPercent(res.fatorR)} <span className="text-sm font-normal text-slate-500">({res.anexo})</span></div>
          <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs font-mono">
            <div className="flex justify-between"><span>Diferença Bruta DAS:</span><span className="text-emerald-600 font-bold">+{formatCurrency(res.diferencaDasBruta)}</span></div>
            <div className="flex justify-between"><span>Custo Extra INSS Sócio:</span><span className="text-rose-600">-{formatCurrency(res.inssSocioIncremental)}</span></div>
            <div className="flex justify-between"><span>Custo Extra IRPF Sócio:</span><span className="text-rose-600">-{formatCurrency(res.irpfSocioIncremental)}</span></div>
            <div className="flex justify-between border-t pt-2 font-bold text-sm"><span>Economia LÍQUIDA Real/mês:</span><span className={res.economiaLiquidaReal>=0?'text-emerald-600':'text-rose-600'}>{formatCurrency(res.economiaLiquidaReal)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}