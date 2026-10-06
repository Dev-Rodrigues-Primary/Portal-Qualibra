import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateReforma } from '../../domain/taxCalculators';
import { formatCurrency, parseNumberInput } from '../../utils/formatters';
import { Calculator, Sliders, CheckCircle, AlertTriangle, Printer } from 'lucide-react';

export function SimuladorReformaPage() {
  const [rbt12, setRbt12] = useState(1200000);
  const [recServ, setRecServ] = useState(80000);
  const [recCom, setRecCom] = useState(20000);
  const [compras, setCompras] = useState(15000);
  const [ano, setAno] = useState(2027);

  const result = useMemo(() => {
    return calculateReforma({
      rbt12: parseNumberInput(rbt12),
      recServ: parseNumberInput(recServ),
      recCom: parseNumberInput(recCom),
      compras: parseNumberInput(compras),
      ano: parseInt(ano, 10)
    });
  }, [rbt12, recServ, recCom, compras, ano]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Simulador da Reforma Tributária' }]} />

      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
            Lei Complementar nº 214/2025
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Simulador da Reforma Tributária</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Comparativo de transição do Simples Tradicional vs Regime Híbrido (IBS/CBS)
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Imprimir Relatório</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Formulário de Parâmetros */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-600" /> Parâmetros Operacionais
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Faturamento Últimos 12 Meses (RBT12)
            </label>
            <input
              type="number"
              value={rbt12}
              onChange={(e) => setRbt12(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Receita Mês (Serviços)</label>
              <input
                type="number"
                value={recServ}
                onChange={(e) => setRecServ(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Receita Mês (Comércio)</label>
              <input
                type="number"
                value={recCom}
                onChange={(e) => setRecCom(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Ano de Transição</label>
              <select
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
              >
                <option value="2027">2027 (CBS 8.9%)</option>
                <option value="2028">2028 (CBS + IBS 9.0%)</option>
                <option value="2029">2029 (Transição 11.5%)</option>
                <option value="2033">2033 (Plena 26.5%)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Compras c/ Crédito (R$)</label>
              <input
                type="number"
                value={compras}
                onChange={(e) => setCompras(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
              />
            </div>
          </div>
        </div>

        {/* Painel de Resultados */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-200 space-y-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3 flex items-center justify-between">
            <span>Resultado da Análise Comparativa</span>
            <span className="text-xs font-normal text-slate-500">Apuração Mensal Estimada</span>
          </h3>

          {/* Vantagem Banner */}
          <div
            className={`p-4 rounded-xl flex items-center gap-3 border ${
              result.simplesVantajoso
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-teal-50 border-teal-200 text-teal-800'
            }`}
          >
            {result.simplesVantajoso ? (
              <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-teal-600 flex-shrink-0" />
            )}
            <div>
              <div className="font-bold text-sm">
                {result.simplesVantajoso ? 'SIMPLES TRADICIONAL É MAIS VANTAJOSO' : 'REGIME HÍBRIDO É MAIS VANTAJOSO'}
              </div>
              <div className="text-xs mt-0.5 opacity-90">
                {result.simplesVantajoso
                  ? `A empresa economiza ${formatCurrency(result.diferencaAbs)} por mês permanecendo no Simples Nacional.`
                  : `O Regime Híbrido gera uma economia estimada de ${formatCurrency(result.diferencaAbs)} por mês.`}
              </div>
            </div>
          </div>

          {/* Cards Comparativos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Simples Tradicional</span>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                {formatCurrency(result.totalSimples)}
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Guia DAS Integral Unificada</span>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-brand-200 shadow-sm">
              <span className="text-[10px] font-mono text-brand-700 uppercase">Regime Híbrido</span>
              <div className="text-2xl font-bold font-mono text-brand-600 mt-1">
                {formatCurrency(result.totalHibrido)}
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">DAS Reduzido + IBS/CBS apurados</span>
            </div>
          </div>

          {/* Memória de Cálculo */}
          <div>
            <span className="text-xs font-semibold text-slate-700 block mb-2">
              Memória de Cálculo Analítica (LC 123/2006 + LC 214/2025)
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2">Atividade</th>
                    <th className="py-2">Alíquota Efetiva</th>
                    <th className="py-2">DAS Integral</th>
                    <th className="py-2">DAS Mantido (Híbrido)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2 font-medium">Serviços</td>
                    <td>11,01%</td>
                    <td>{formatCurrency(result.dasSimplesServ)}</td>
                    <td>{formatCurrency(result.dasReduzidoServ)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Comércio</td>
                    <td>8,82%</td>
                    <td>{formatCurrency(result.dasSimplesCom)}</td>
                    <td>{formatCurrency(result.dasReduzidoCom)}</td>
                  </tr>
                  <tr className="bg-slate-50 font-semibold text-slate-900">
                    <td className="py-2">CBS/IBS Líquidos</td>
                    <td colSpan={2}>Base: {formatCurrency(Math.max(0, (parseNumberInput(recServ) + parseNumberInput(recCom)) - parseNumberInput(compras)))}</td>
                    <td>{formatCurrency(result.cbsApurada)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
