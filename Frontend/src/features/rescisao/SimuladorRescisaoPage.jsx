import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateRescisaoCLT } from '../../domain/taxCalculators';
import { formatCurrency, parseNumberInput } from '../../utils/formatters';
import { Users, Info, ShieldCheck } from 'lucide-react';

export function SimuladorRescisaoPage() {
  const [salario, setSalario] = useState(4500);
  const [motivo, setMotivo] = useState('sem_justa_causa');
  const [meses, setMeses] = useState(8);
  const [anos, setAnos] = useState(2);
  const [fgts, setFgts] = useState(12000);

  const result = useMemo(() => {
    return calculateRescisaoCLT({
      salarioBase: parseNumberInput(salario),
      motivo,
      mesesTrabalhados: parseInt(meses, 10),
      anosCompletos: parseInt(anos, 10),
      saldoFgts: parseNumberInput(fgts)
    });
  }, [salario, motivo, meses, anos, fgts]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Simulador Rescisório CLT (Regras Oficiais)' }]} />

      <div className="glass-panel p-6 rounded-2xl border border-slate-200">
        <span className="text-[10px] font-mono font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full uppercase">
          Consolidação das Leis do Trabalho & Lei nº 12.506/2011
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Simulador de Rescisão Contratual CLT</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Apuração completa de 13º, férias proporcionais, aviso prévio proporcional por tempo de casa e multa rescisória do FGTS.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Salário Base Contratual (R$)</label>
            <input
              type="number"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Motivo do Desligamento</label>
            <select
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
            >
              <option value="sem_justa_causa">Demissão Sem Justa Causa (Multa 40% FGTS)</option>
              <option value="pedido">Pedido de Demissão (Sem Multa FGTS)</option>
              <option value="acordo">Demissão por Acordo Mútuo - Art. 484-A (Multa 20%)</option>
              <option value="com_justa_causa">Demissão Com Justa Causa</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Meses Trabalhados (Ano)</label>
              <input
                type="number"
                min="0"
                max="12"
                value={meses}
                onChange={(e) => setMeses(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Anos Completos na Empresa</label>
              <input
                type="number"
                min="0"
                value={anos}
                onChange={(e) => setAnos(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Saldo FGTS para Fins Rescisórios (R$)</label>
            <input
              type="number"
              value={fgts}
              onChange={(e) => setFgts(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>
        </div>

        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Verbas Rescisórias Apuradas
          </h3>

          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Aviso Prévio Indenizado ({result.diasAvisoPrevio} dias):</span>
              <span className="text-slate-900 font-bold">{formatCurrency(result.avisoPrevio)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">13º Salário Proporcional:</span>
              <span className="text-slate-900 font-bold">{formatCurrency(result.decimoTerceiro)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Férias Proporcionais + 1/3 Constitucional:</span>
              <span className="text-slate-900 font-bold">{formatCurrency(result.totalFerias)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Multa Rescisória do FGTS ({result.percentualMulta}%):</span>
              <span className="text-slate-900 font-bold">{formatCurrency(result.multaFgts)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 text-rose-600">
              <span>Desconto Estimado INSS (13º):</span>
              <span>- {formatCurrency(result.descontoInssEstimado)}</span>
            </div>
            <div className="flex justify-between py-3 text-base font-bold text-brand-700 border-t border-slate-200">
              <span>Total Líquido da Rescisão:</span>
              <span className="text-lg">{formatCurrency(result.totalLiquidoEstimado)}</span>
            </div>
            {result.saqueFgtsPermitido > 0 && (
              <div className="flex justify-between py-2 text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded-lg border border-emerald-200">
                <span>Disponível para Saque na Caixa (Saldo + Multa):</span>
                <span className="font-bold">{formatCurrency(result.saqueFgtsPermitido)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}