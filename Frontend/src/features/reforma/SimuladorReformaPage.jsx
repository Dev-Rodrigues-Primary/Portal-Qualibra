import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateReformaIntegral } from '../../domain/taxCalculators';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
import { Printer } from 'lucide-react';
export function SimuladorReformaPage() {
  const [rbt12, setRbt12] = useState(1200000); const [recServ, setRecServ] = useState(80000); const [recCom, setRecCom] = useState(20000); const [compras, setCompras] = useState(15000); const [ano, setAno] = useState(2027); const [reducao, setReducao] = useState(0);
  const result = useMemo(() => calculateReformaIntegral({ rbt12: parseNumberInput(rbt12), recServ: parseNumberInput(recServ), recCom: parseNumberInput(recCom), compras: parseNumberInput(compras), ano: parseInt(ano, 10), reducaoSetorial: parseFloat(reducao)||0 }), [rbt12, recServ, recCom, compras, ano, reducao]);
  return (
    <div className="space-y-6">
      <div className="no-print"><Breadcrumbs items={[{ label: 'Reforma Tributária LC 214/2025' }]} /></div>
      <div className="glass-panel p-6 rounded-2xl flex justify-between items-center border border-slate-200">
        <div><h2 className="text-2xl font-extrabold text-slate-900">Simulador da Reforma Tributária</h2><p className="text-xs text-slate-500">Comparativo Simples vs Híbrido</p></div>
        <button onClick={() => window.print()} className="no-print border px-4 py-2 rounded-xl text-xs flex gap-2"><Printer className="w-4 h-4"/> Imprimir</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4 no-print">
          <label className="block text-xs font-medium">RBT12<input type="number" value={rbt12} onChange={e=>setRbt12(e.target.value)} className="w-full p-2 border rounded mt-1"/></label>
          <div className="flex gap-2">
            <label className="w-full text-xs font-medium">Rec. Serviços<input type="number" value={recServ} onChange={e=>setRecServ(e.target.value)} className="w-full p-2 border rounded mt-1"/></label>
            <label className="w-full text-xs font-medium">Rec. Comércio<input type="number" value={recCom} onChange={e=>setRecCom(e.target.value)} className="w-full p-2 border rounded mt-1"/></label>
          </div>
          <div className="flex gap-2">
            <label className="w-full text-xs font-medium">Compras (Crédito)<input type="number" value={compras} onChange={e=>setCompras(e.target.value)} className="w-full p-2 border rounded mt-1"/></label>
            <label className="w-full text-xs font-medium">Ano<select value={ano} onChange={e=>setAno(e.target.value)} className="w-full p-2 border rounded mt-1"><option value="2026">2026 (Teste)</option><option value="2027">2027 (CBS)</option><option value="2029">2029 (Transição)</option><option value="2033">2033 (Plena)</option></select></label>
          </div>
          <label className="block text-xs font-medium">Redução Setorial (Saúde/Educação)<select value={reducao} onChange={e=>setReducao(e.target.value)} className="w-full p-2 border rounded mt-1"><option value="0">Padrão</option><option value="30">30% (Profissões)</option><option value="60">60% (Saúde/Ed)</option></select></label>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="p-4 border rounded-xl bg-slate-50 text-sm font-bold text-center">
            {result.simplesVantajoso ? `SIMPLES VENCE: Economia de ${formatCurrency(result.diferencaAbs)}` : `HÍBRIDO VENCE: Economia de ${formatCurrency(result.diferencaAbs)}`}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-xl"><span className="text-xs text-slate-500">Simples Tradicional</span><div className="text-xl font-bold">{formatCurrency(result.totalSimples)}</div></div>
            <div className="p-4 border rounded-xl bg-brand-50"><span className="text-xs text-brand-700">Regime Híbrido</span><div className="text-xl font-bold text-brand-700">{formatCurrency(result.totalHibrido)}</div></div>
          </div>
          <table className="w-full text-left text-xs mt-4">
            <thead className="border-b"><tr><th>Tributo</th><th>Base</th><th>Líquido</th></tr></thead>
            <tbody>
              <tr><td className="py-2">DAS Mantido</td><td>-</td><td>{formatCurrency(result.dasReduzidoTotal)}</td></tr>
              <tr><td className="py-2">CBS/IBS {formatPercent(result.aliqConjuntaIbsCbs)}</td><td>{formatCurrency(result.debitoBrutoIbsCbs)}</td><td>{formatCurrency(result.valorLiquidoIbsCbs)}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}