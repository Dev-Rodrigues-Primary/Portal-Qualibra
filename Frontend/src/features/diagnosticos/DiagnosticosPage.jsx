import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { BarChart3, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export function DiagnosticosPage() {
  const [faturamento, setFaturamento] = useState(1800000);
  const [folha, setFolha] = useState(360000);
  const [margemLucro, setMargemLucro] = useState(25);
  const [regimeAtual, setRegimeAtual] = useState('simples');

  const proporcaoFolha = faturamento > 0 ? (folha / faturamento) * 100 : 0;
  const lucroEstimado = faturamento * (margemLucro / 100);

  // Diagnóstico Tributário Analítico
  let recomendacao = '';
  let statusCor = 'emerald';

  if (proporcaoFolha < 28 && regimeAtual === 'simples') {
    recomendacao = 'Atenção ao Fator R: Proporção de folha inferior a 28%. Caso a atividade pertença aos anexos sujeitos a trava, a empresa pode ser tributada no Anexo V (mais caro). Recomenda-se ajuste de pró-labore.';
    statusCor = 'amber';
  } else if (faturamento > 3600000 && regimeAtual === 'simples') {
    recomendacao = 'Sublimite do Simples Nacional ultrapassado: ICMS e ISS passam a ser recolhidos fora da guia unificada DAS. Recomenda-se estudo urgente de migração para Lucro Presumido ou Real.';
    statusCor = 'rose';
  } else {
    recomendacao = 'Cenário Tributário em Conformidade: A estrutura de folha e receita mantém a empresa em faixa otimizada de tributação.';
    statusCor = 'emerald';
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Diagnósticos Estratégicos' }]} />

      <div className="glass-panel p-6 rounded-2xl border border-slate-200">
        <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
          Análise Estrutural & Riscos
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Diagnóstico Tributário & Financeiro</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Auditoria preventiva de indicadores de folha, enquadramento de regime e parecer analítico gerencial.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Parâmetros */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Dados para Diagnóstico
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Regime Tributário Vigente</label>
            <select
              value={regimeAtual}
              onChange={(e) => setRegimeAtual(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
            >
              <option value="simples">Simples Nacional</option>
              <option value="presumido">Lucro Presumido</option>
              <option value="real">Lucro Real</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Faturamento Anual (R$)</label>
            <input
              type="number"
              value={faturamento}
              onChange={(e) => setFaturamento(parseFloat(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Folha Salarial + Pró-Labore Anual (R$)</label>
            <input
              type="number"
              value={folha}
              onChange={(e) => setFolha(parseFloat(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Margem de Lucro Estimada (%)</label>
            <input
              type="number"
              value={margemLucro}
              onChange={(e) => setMargemLucro(parseFloat(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>
        </div>

        {/* Parecer do Diagnóstico */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-200 space-y-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Parecer Estruturado da Auditoria
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Proporção da Folha / Faturamento</span>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                {formatPercent(proporcaoFolha)}
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Fator R de referência: 28%</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Lucro Operacional Estimado</span>
              <div className="text-2xl font-bold font-mono text-brand-600 mt-1">
                {formatCurrency(lucroEstimado)}
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Base para distribuição isenta</span>
            </div>
          </div>

          {/* Banner de Recomendação */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              statusCor === 'rose'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : statusCor === 'amber'
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            {statusCor === 'rose' ? (
              <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            ) : statusCor === 'amber' ? (
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-bold text-sm">Parecer Técnico Emitido</div>
              <div className="text-xs mt-1 leading-relaxed">{recomendacao}</div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 font-mono">
            * Este diagnóstico constitui simulação gerencial orientativa. Pareceres oficiais exigem validação cadastral completa do contador responsável.
          </div>
        </div>
      </div>
    </div>
  );
}