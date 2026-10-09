import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateSimplesPresumidoExato } from '../../domain/taxCalculators';
import { CurrencyInput } from '../../components/common/CurrencyInput';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
import { Scale, CheckCircle, Info, Printer, ShieldAlert, Building2 } from 'lucide-react';

export function SimuladorSimplesPresumidoPage() {
  const [faturamento, setFaturamento] = useState(1500000);
  const [folha, setFolha] = useState(400000);
  const [anexo, setAnexo] = useState('III');
  const [iss, setIss] = useState(5.0);
  const [icms, setIcms] = useState(4.0);

  const result = useMemo(() => {
    return calculateSimplesPresumidoExato({
      faturamentoAnual: parseNumberInput(faturamento),
      folhaAnual: parseNumberInput(folha),
      anexoSimples: anexo,
      aliqIssLocal: parseFloat(iss) || 5.0,
      aliqIcmsLocal: parseFloat(icms) || 4.0
    });
  }, [faturamento, folha, anexo, iss, icms]);

  const isServico = anexo !== 'I';
  const presuncaoIr = isServico ? '32%' : '8%';
  const presuncaoCsll = isServico ? '32%' : '12%';

  return (
    <div className="space-y-6 animate-fade-in-up pb-12">
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Simples Nacional vs Lucro Presumido' }]} />
      </div>

      <div className="glass-panel p-6 lg:p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full uppercase flex items-center gap-1.5 w-fit">
            <Building2 className="w-3.5 h-3.5" /> Planejamento Tributário Corporativo
          </span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">Simples Nacional vs Lucro Presumido</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Compare a carga tributária real, detalhando bases de presunção (IRPJ/CSLL), adicional de 10% e o impacto do INSS Patronal (CPP 28,3%) sobre a folha.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="no-print bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition shadow-sm flex-shrink-0"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Imprimir Estudo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* ================= LADO ESQUERDO: PARÂMETROS ================= */}
        <div className="no-print xl:col-span-4 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-5">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-600"/> Dados Projetados (Anual)
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Faturamento Anual (R$)</label>
                  <CurrencyInput value={faturamento} onChange={setFaturamento}
                    className="w-full p-3 rounded-lg border border-brand-300 bg-white text-brand-900 font-bold text-lg shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Folha Salarial + Pró-Labore Anual (R$)</label>
                  <CurrencyInput value={folha} onChange={setFolha}
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold text-base shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Enquadramento no Simples Nacional</label>
                <select
                  value={anexo}
                  onChange={(e) => setAnexo(e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-medium shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition"
                >
                  <option value="I">Anexo I - Comércio (ICMS)</option>
                  <option value="III">Anexo III - Serviços (ISS 6% inicial)</option>
                  <option value="IV">Anexo IV - Serviços c/ INSS Patronal (Limpeza/Obras)</option>
                  <option value="V">Anexo V - Serviços sem Fator R (ISS 15,5% inicial)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alíquota ISS (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={iss}
                    onChange={(e) => setIss(e.target.value)}
                    disabled={!isServico}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-mono shadow-sm disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ICMS Efetivo (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={icms}
                    onChange={(e) => setIcms(e.target.value)}
                    disabled={isServico}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-mono shadow-sm disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= LADO DIREITO: RESULTADOS ANALÍTICOS ================= */}
        <div className="xl:col-span-8 space-y-6">
          <div className="glass-panel p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Comparativo de Tributação Efetiva Anual</h3>

            <div className={`p-5 rounded-2xl flex items-center justify-between border ${result.simplesVence ? 'bg-emerald-50 border-emerald-200' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex items-start gap-4">
                {result.simplesVence ? <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0" /> : <ShieldAlert className="w-8 h-8 text-blue-600 flex-shrink-0" />}
                <div>
                  <div className={`text-sm font-bold uppercase tracking-wider ${result.simplesVence ? 'text-emerald-800' : 'text-blue-800'}`}>
                    {result.simplesVence ? 'Simples Nacional é mais vantajoso' : 'Lucro Presumido é mais vantajoso'}
                  </div>
                  <div className={`text-sm mt-1 leading-relaxed ${result.simplesVence ? 'text-emerald-700' : 'text-blue-700'}`}>
                    A opção sugerida gera uma economia anual de <b>{formatCurrency(result.economiaAnual)}</b> ({formatCurrency(result.economiaAnual / 12)} / mês).
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-400"></div>
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Simples Nacional</span>
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">Efetiva: {formatPercent(result.aliqSimples)}</span>
                </div>
                <div className="text-3xl font-black text-slate-800 mt-3 font-mono tracking-tight">{formatCurrency(result.totalSimples)}</div>
                <div className="mt-2 text-[11px] text-slate-500">
                  {anexo === 'IV' ? 'Inclui guia DAS + CPP 20% recolhida em DARF avulso.' : 'Guia DAS Unificada (Sem CPP sobre a folha).'}
                </div>
              </div>

              <div className="p-5 rounded-xl border border-brand-200 bg-brand-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">Lucro Presumido</span>
                  <span className="text-xs font-mono font-bold text-brand-700 bg-brand-200/50 px-2 py-0.5 rounded">Efetiva: {formatPercent(result.aliqPresumido)}</span>
                </div>
                <div className="text-3xl font-black text-brand-700 mt-3 font-mono tracking-tight">{formatCurrency(result.totalPresumido)}</div>
                <div className="mt-2 text-[11px] text-brand-600/80">
                  Impostos Federais + {isServico ? 'ISS' : 'ICMS'} + INSS Patronal.
                </div>
              </div>
            </div>

            {/* ====== TABELA ANALÍTICA DE DECOMPOSIÇÃO DO LUCRO PRESUMIDO ====== */}
            <div className="mt-8">
              <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-400" /> Memória de Cálculo (Decomposição do Lucro Presumido)
              </h4>
              
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4 w-1/3">Tributo (Lucro Presumido)</th>
                      <th className="py-3 px-4 w-1/3">Base Legal / Alíquota</th>
                      <th className="py-3 px-4 text-right">Valor Anual a Pagar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-bold">IRPJ (Imposto de Renda)</td>
                      <td className="py-3 px-4 text-xs font-mono text-slate-500">Base {presuncaoIr} × 15% (+10% se &gt; R$ 240k/ano)</td>
                      <td className="py-3 px-4 text-right font-mono font-medium text-rose-600">{formatCurrency(result.detalhes.irpjTotal)}</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-bold">CSLL (Cont. Social)</td>
                      <td className="py-3 px-4 text-xs font-mono text-slate-500">Base {presuncaoCsll} × 9%</td>
                      <td className="py-3 px-4 text-right font-mono font-medium text-rose-600">{formatCurrency(result.detalhes.csllTotal)}</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-bold">PIS e COFINS</td>
                      <td className="py-3 px-4 text-xs font-mono text-slate-500">0,65% (PIS) + 3,00% (COFINS)</td>
                      <td className="py-3 px-4 text-right font-mono font-medium text-rose-600">{formatCurrency(result.detalhes.pis + result.detalhes.cofins)}</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-bold">Tributo Local ({isServico ? 'ISS' : 'ICMS'})</td>
                      <td className="py-3 px-4 text-xs font-mono text-slate-500">Alíquota parametrizada: {isServico ? iss : icms}%</td>
                      <td className="py-3 px-4 text-right font-mono font-medium text-rose-600">{formatCurrency(result.detalhes.tributoLocal)}</td>
                    </tr>
                    <tr className="bg-rose-50/50 hover:bg-rose-50 transition border-t-2 border-slate-100">
                      <td className="py-3 px-4 font-bold text-rose-900">CPP Patronal (Previdência)</td>
                      <td className="py-3 px-4 text-xs font-mono text-rose-700">20% Patronal + RAT + Terceiros (~28,3%)</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-rose-700">{formatCurrency(result.detalhes.cppPatronalPresumido)}</td>
                    </tr>
                    <tr className="bg-slate-900 text-white">
                      <td colSpan="2" className="py-3 px-4 font-bold text-right uppercase tracking-wider text-xs">Custo Tributário Total (Presumido):</td>
                      <td className="py-3 px-4 text-right font-mono font-black text-lg">{formatCurrency(result.totalPresumido)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}