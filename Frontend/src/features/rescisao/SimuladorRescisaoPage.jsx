import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateRescisaoCLTCompleto } from '../../domain/taxCalculators';
import { formatCurrency, parseNumberInput } from '../../utils/formatters';
export function SimuladorRescisaoPage() {
  const [sal, setSal] = useState(4500); const [dias, setDias] = useState(30); const [motivo, setMotivo] = useState('sem_justa_causa'); const [fgts, setFgts] = useState(12000); const [anos, setAnos] = useState(2);
  const res = useMemo(() => calculateRescisaoCLTCompleto({ salarioBase: parseNumberInput(sal), diasTrabalhadosMes: parseInt(dias,10), motivo, saldoFgts: parseNumberInput(fgts), anosCompletosCasa: parseInt(anos,10) }), [sal, dias, motivo, fgts, anos]);
  return (
    <div className="space-y-6">
      <div className="no-print"><Breadcrumbs items={[{ label: 'Simulador Rescisório (CLT + 12.506/11)' }]} /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 border rounded-2xl space-y-4 no-print">
          <label className="block text-xs font-medium">Salário<input type="number" value={sal} onChange={e=>setSal(e.target.value)} className="w-full p-2 border rounded mt-1"/></label>
          <label className="block text-xs font-medium">Motivo<select value={motivo} onChange={e=>setMotivo(e.target.value)} className="w-full p-2 border rounded mt-1"><option value="sem_justa_causa">Sem Justa Causa</option><option value="acordo">Acordo (Art. 484-A)</option><option value="pedido">Pedido Demissão</option></select></label>
          <label className="block text-xs font-medium">Anos de Casa (Aviso Proporcional)<input type="number" value={anos} onChange={e=>setAnos(e.target.value)} className="w-full p-2 border rounded mt-1"/></label>
          <label className="block text-xs font-medium">Saldo FGTS<input type="number" value={fgts} onChange={e=>setFgts(e.target.value)} className="w-full p-2 border rounded mt-1"/></label>
        </div>
        <div className="glass-panel p-6 border rounded-2xl space-y-2 text-xs font-mono">
          <div className="flex justify-between"><span>Saldo Salário:</span><span className="font-bold">{formatCurrency(res.saldoSalario)}</span></div>
          <div className="flex justify-between"><span>Aviso Prévio ({res.diasAviso}d):</span><span className="font-bold">{formatCurrency(res.avisoPrevio)}</span></div>
          <div className="flex justify-between"><span>Multa FGTS ({res.percentualMulta}%):</span><span className="font-bold">{formatCurrency(res.multaFgts)}</span></div>
          <div className="flex justify-between text-rose-600 border-b pb-2"><span>Descontos IRPF/INSS:</span><span>-{formatCurrency(res.totalDescontos)}</span></div>
          <div className="flex justify-between font-bold text-sm text-brand-700 pt-2"><span>Líquido da Rescisão:</span><span>{formatCurrency(res.totalLiquido)}</span></div>
          {res.saqueFgtsPermitido > 0 && <div className="mt-2 p-2 bg-emerald-50 text-emerald-800 rounded">Saque Caixa: {formatCurrency(res.saqueFgtsPermitido)}</div>}
        </div>
      </div>
    </div>
  );
}