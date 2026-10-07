import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateRescisaoCLTCompleto } from '../../domain/taxCalculators';
import { formatCurrency, parseNumberInput } from '../../utils/formatters';
import { Users, Info, ShieldCheck, Printer, Calculator, Scale } from 'lucide-react';

export function SimuladorRescisaoPage() {
  const [salario, setSalario] = useState(4500); const [diasMes, setDiasMes] = useState(30);
  const [motivo, setMotivo] = useState('sem_justa_causa'); const [fgts, setFgts] = useState(12000);
  const [anosCasa, setAnosCasa] = useState(2); const [meses13, setMeses13] = useState(8);
  const [mesesFerias, setMesesFerias] = useState(8); const [feriasVencidas, setFeriasVencidas] = useState(0);

  const res = useMemo(() => calculateRescisaoCLTCompleto({
    salarioBase: parseNumberInput(salario), diasTrabalhadosMes: parseInt(diasMes, 10), motivo, meses13: parseInt(meses13, 10),
    feriasVencidasPeriodos: parseInt(feriasVencidas, 10), mesesFeriasProporcionais: parseInt(mesesFerias, 10), anosCompletosCasa: parseInt(anosCasa, 10), saldoFgts: parseNumberInput(fgts)
  }), [salario, diasMes, motivo, meses13, feriasVencidas, mesesFerias, anosCasa, fgts]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in-up">
      <div className="no-print"><Breadcrumbs items={[{ label: 'Simulador Rescisório (CLT)' }]} /></div>

      <div className="glass-panel p-6 lg:p-8 rounded-2xl border border-slate-200 flex justify-between items-center">
        <div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Cálculo de Rescisão Trabalhista</h2>
          <p className="text-sm text-slate-500 mt-1">Apuração detalhada de proventos, descontos e multa do FGTS com regras da CLT.</p>
        </div>
        <button onClick={() => window.print()} className="no-print p-3 bg-slate-900 text-white rounded-xl shadow-sm hover:bg-slate-800 transition"><Printer className="w-5 h-5"/></button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="no-print lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-800 text-sm mb-4 border-b pb-2">Parâmetros do Contrato</h3>
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">Salário Base (R$)<input type="number" value={salario} onChange={e=>setSalario(e.target.value)} className="w-full p-2.5 mt-1 rounded-lg glass-input text-sm font-mono"/></label>
              <label className="block text-xs font-bold text-slate-700">Motivo do Desligamento
                <select value={motivo} onChange={e=>setMotivo(e.target.value)} className="w-full p-2.5 mt-1 rounded-lg glass-input text-sm font-semibold text-slate-800 bg-slate-50">
                  <option value="sem_justa_causa">Sem Justa Causa</option>
                  <option value="acordo">Acordo Mútuo (Art. 484-A)</option>
                  <option value="pedido">Pedido de Demissão</option>
                  <option value="justa_causa">Com Justa Causa</option>
                </select>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-xs font-bold text-slate-700">Anos de Casa<input type="number" value={anosCasa} onChange={e=>setAnosCasa(e.target.value)} className="w-full p-2.5 mt-1 rounded-lg glass-input text-sm font-mono"/></label>
                <label className="block text-xs font-bold text-slate-700">Saldo FGTS (R$)<input type="number" value={fgts} onChange={e=>setFgts(e.target.value)} className="w-full p-2.5 mt-1 rounded-lg glass-input text-sm font-mono"/></label>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-5 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-800 text-sm mb-4 border-b pb-2">Dias e Avos Trabalhados</h3>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-xs font-bold text-slate-700">Dias Mês Atual<input type="number" value={diasMes} onChange={e=>setDiasMes(e.target.value)} className="w-full p-2.5 mt-1 rounded-lg glass-input text-sm font-mono"/></label>
              <label className="block text-xs font-bold text-slate-700">Avos 13º Salário<input type="number" value={meses13} onChange={e=>setMeses13(e.target.value)} className="w-full p-2.5 mt-1 rounded-lg glass-input text-sm font-mono"/></label>
              <label className="block text-xs font-bold text-slate-700">Avos Férias Prop.<input type="number" value={mesesFerias} onChange={e=>setMesesFerias(e.target.value)} className="w-full p-2.5 mt-1 rounded-lg glass-input text-sm font-mono"/></label>
              <label className="block text-xs font-bold text-slate-700">Férias Vencidas<input type="number" value={feriasVencidas} onChange={e=>setFeriasVencidas(e.target.value)} className="w-full p-2.5 mt-1 rounded-lg glass-input text-sm font-mono"/></label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
              <Calculator className="w-5 h-5 text-white" />
              <h3 className="font-bold text-white tracking-wider">Demonstrativo de Rescisão (TRCT)</h3>
            </div>
            <div className="p-6 space-y-4">
              
              {/* Proventos */}
              <div>
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2 border-b pb-1">Proventos (Recebimentos)</div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex justify-between text-slate-700"><span>Saldo de Salário ({diasMes}d):</span><span>{formatCurrency(res.saldoSalario)}</span></div>
                  <div className="flex justify-between text-slate-700"><span>Aviso Prévio Indenizado ({res.diasAviso}d):</span><span>{formatCurrency(res.avisoPrevio)}</span></div>
                  <div className="flex justify-between text-slate-700"><span>13º Salário Proporcional:</span><span>{formatCurrency(res.decimoTerceiro)}</span></div>
                  <div className="flex justify-between text-slate-700"><span>Férias Proporcionais + 1/3:</span><span>{formatCurrency(res.feriasProporcionais)}</span></div>
                  {res.feriasVencidas > 0 && <div className="flex justify-between text-slate-700"><span>Férias Vencidas + 1/3:</span><span>{formatCurrency(res.feriasVencidas)}</span></div>}
                  <div className="flex justify-between text-slate-700 bg-slate-50 p-1.5 rounded"><span>Multa Rescisória FGTS ({res.percentualMulta}%):</span><span className="font-bold">{formatCurrency(res.multaFgts)}</span></div>
                </div>
              </div>

              {/* Descontos */}
              <div className="pt-2">
                <div className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-2 border-b pb-1">Descontos Legais</div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex justify-between text-rose-600"><span>INSS e IRPF (Estimativa):</span><span>-{formatCurrency(res.totalDescontos)}</span></div>
                </div>
              </div>

              {/* Totalizador */}
              <div className="mt-6 pt-4 border-t-2 border-slate-900">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black text-slate-900 uppercase">Valor Líquido a Receber:</span>
                  <span className="text-3xl font-black font-mono text-brand-600">{formatCurrency(res.totalLiquido)}</span>
                </div>
              </div>

              {res.saqueFgtsPermitido > 0 && (
                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="text-sm font-bold text-emerald-800">Saldo Liberado para Saque (FGTS):</div>
                  <div className="text-xl font-black font-mono text-emerald-700">{formatCurrency(res.saqueFgtsPermitido)}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}