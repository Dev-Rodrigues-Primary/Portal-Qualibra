import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateSimplesPresumidoExato } from '../../domain/taxCalculators';
import { CurrencyInput } from '../../components/common/CurrencyInput';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
import { 
  Scale, 
  Printer, 
  Calculator, 
  CheckCircle2, 
  TrendingUp, 
  Info, 
  ShieldCheck, 
  Building2, 
  Layers, 
  DollarSign, 
  Sparkles, 
  HelpCircle,
  Briefcase,
  Users,
  AlertTriangle,
  Calendar
} from 'lucide-react';

export function SimuladorSimplesPresumidoPage() {
  const [faturamento, setFaturamento] = useState(1500000);
  const [folha, setFolha] = useState(400000);
  const [anexo, setAnexo] = useState('III');
  const [iss, setIss] = useState(5.0);
  const [icms, setIcms] = useState(4.0);

  const res = useMemo(() => calculateSimplesPresumidoExato({
    faturamentoAnual: parseNumberInput(faturamento) || 0,
    folhaAnual: parseNumberInput(folha) || 0,
    anexoSimples: anexo,
    aliqIssLocal: parseFloat(iss) || 0,
    aliqIcmsLocal: parseFloat(icms) || 0
  }), [faturamento, folha, anexo, iss, icms]);

  const isServico = anexo !== 'I';
  const simplesVence = res.simplesVence;
  const economiaMensal = res.economiaAnual / 12;

  // Decomposição Oficial Trimestral (Lei 9.430/1996 - Item 1 Auditoria)
  const fatTrimestralMedio = (parseNumberInput(faturamento) || 0) / 4;
  const percPresuncao = isServico ? 0.32 : 0.08;
  const basePresumidaTrimestral = fatTrimestralMedio * percPresuncao;
  const excedenteTrimestral = Math.max(0, basePresumidaTrimestral - 60000);
  const adicionalIrpjTrimestral = excedenteTrimestral * 0.10;

  return (
    <div className="space-y-6 pb-16 animate-fade-in-up">
      
      {/* BREADCRUMBS */}
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Planejamento Tributário' }, { label: 'Simples Nacional vs Lucro Presumido' }]} />
      </div>

      {/* HEADER EXECUTIVO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 lg:p-8 text-white shadow-xl border border-slate-700/60">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Planejamento Tributário Anual & Trimestral
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <ShieldCheck className="w-3 h-3" /> Lei 9.718/98 & Lei 9.430/96
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Simples Nacional vs. Lucro Presumido
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Compare a carga tributária real projetada, detalhando presunção de IRPJ/CSLL, a regra trimestral da Lei 9.430/96 (adicional de 10% s/ excedente a R$ 60k/tri) e a CPP Patronal de ~28,3%.
            </p>
          </div>

          <div className="flex items-center gap-3 no-print w-full sm:w-auto">
            <button 
              onClick={() => window.print()} 
              className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-xs rounded-xl backdrop-blur-md border border-white/20 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow"
            >
              <Printer className="w-4 h-4 text-slate-200" />
              <span>Imprimir Estudo</span>
            </button>
          </div>
        </div>
      </div>

      {/* GRID DE TRABALHO */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* COLUNA ESQUERDA: PARÂMETROS PROJETADOS */}
        <div className="no-print xl:col-span-5 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md p-6 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Calculator className="w-4 h-4 text-indigo-600" />
                Dados Projetados da Empresa (Anual)
              </h3>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                12 Meses
              </span>
            </div>

            <div className="space-y-4">
              
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-indigo-600" />
                  Faturamento Bruto Anual (R$)
                </label>
                <CurrencyInput 
                  value={faturamento} 
                  onChange={setFaturamento} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-black text-slate-900 text-base shadow-inner focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-500" />
                  Folha Salarial + Pró-Labore Anual (R$)
                </label>
                <CurrencyInput 
                  value={folha} 
                  onChange={setFolha} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-black text-slate-900 text-base shadow-inner focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Gera <b>28,3% de CPP Patronal</b> no Lucro Presumido e no Anexo IV.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                  Enquadramento no Simples Nacional
                </label>
                <select 
                  value={anexo} 
                  onChange={e => setAnexo(e.target.value)} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 text-xs shadow-inner focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                >
                  <option value="III">Anexo III — Serviços (ISS 6% inicial • CPP Inclusa no DAS)</option>
                  <option value="I">Anexo I — Comércio (ICMS 4% inicial • CPP Inclusa no DAS)</option>
                  <option value="IV">Anexo IV — Serviços (Advocacia, Construção • CPP 20% FORA)</option>
                  <option value="V">Anexo V — Serviços (Tecnologia, Consultoria s/ Fator R)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-2xl border transition-all ${
                  isServico ? 'bg-indigo-50/40 border-indigo-200/80' : 'bg-slate-50 border-slate-200 opacity-60'
                }`}>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                    Alíquota ISS (%)
                  </label>
                  <input 
                    type="number" 
                    step="0.5" 
                    min="2" 
                    max="5"
                    value={iss} 
                    onChange={e => setIss(e.target.value)} 
                    disabled={!isServico}
                    className="w-full p-2 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white text-sm shadow-inner text-center"
                  />
                  <span className="text-[9.5px] text-slate-400 mt-1 block text-center">Município (2% a 5%)</span>
                </div>

                <div className={`p-3 rounded-2xl border transition-all ${
                  !isServico ? 'bg-indigo-50/40 border-indigo-200/80' : 'bg-slate-50 border-slate-200 opacity-60'
                }`}>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                    ICMS Efetivo (%)
                  </label>
                  <input 
                    type="number" 
                    step="0.5" 
                    min="0" 
                    max="18"
                    value={icms} 
                    onChange={e => setIcms(e.target.value)} 
                    disabled={isServico}
                    className="w-full p-2 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white text-sm shadow-inner text-center"
                  />
                  <span className="text-[9.5px] text-slate-400 mt-1 block text-center">Estado (Comércio)</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: RESULTADOS & AUDITORIA TRIMESTRAL */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* VEREDITO */}
          <div className={`relative overflow-hidden rounded-3xl border p-6 lg:p-7 shadow-sm transition-all duration-300 hover:shadow-md ${
            simplesVence 
              ? 'bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-white border-emerald-200 shadow-emerald-500/5' 
              : 'bg-gradient-to-br from-indigo-50/90 via-blue-50/40 to-white border-indigo-200 shadow-indigo-500/5'
          }`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border ${
                  simplesVence 
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-600/30' 
                    : 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-600/30'
                }`}>
                  {simplesVence ? <CheckCircle2 className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
                </div>

                <div>
                  <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 block mb-0.5">
                    Regime Mais Vantajoso Identificado
                  </span>
                  <h3 className={`text-xl lg:text-2xl font-black tracking-tight leading-none ${
                    simplesVence ? 'text-emerald-950' : 'text-indigo-950'
                  }`}>
                    {simplesVence ? 'Simples Nacional é mais vantajoso' : 'Lucro Presumido é mais vantajoso'}
                  </h3>
                </div>
              </div>

              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border self-start sm:self-auto ${
                simplesVence 
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                  : 'bg-indigo-100 text-indigo-800 border-indigo-200'
              }`}>
                Melhor Opção Fiscal
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="text-slate-600 leading-relaxed">
                A opção pelo {simplesVence ? <b>Simples Nacional</b> : <b>Lucro Presumido</b>} gera uma economia anual líquida estimada de:
              </div>

              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono font-black text-base border shadow-sm self-start sm:self-auto ${
                simplesVence 
                  ? 'bg-white text-emerald-700 border-emerald-200' 
                  : 'bg-white text-indigo-800 border-indigo-200'
              }`}>
                <span>{formatCurrency(res.economiaAnual)}</span>
                <span className="text-[11px] font-sans font-bold text-slate-400">
                  ({formatCurrency(economiaMensal)}/mês)
                </span>
              </div>
            </div>
          </div>

          {/* CARDS COMPARATIVOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className={`relative rounded-3xl border p-5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
              simplesVence ? 'border-emerald-300 ring-2 ring-emerald-500/30' : 'border-slate-200/90'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Regime Simplificado (LC 123)
                  </span>
                  <h4 className="text-sm font-black text-slate-900">Simples Nacional</h4>
                </div>
                {simplesVence && (
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Vencedor
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <div className="text-3xl font-black font-mono tracking-tight text-slate-900">
                  {formatCurrency(res.totalSimples)}
                </div>
                <p className="text-[11px] text-slate-500">
                  {anexo === 'IV' ? 'Guia DAS unificada + 20% CPP Patronal fora.' : 'Guia DAS unificada (com CPP patronal 100% inclusa).'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span>Alíquota Efetiva:</span>
                <span className="font-bold text-emerald-700">{formatPercent(res.aliqSimples)}</span>
              </div>
            </div>

            <div className={`relative rounded-3xl border p-5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
              !simplesVence ? 'border-indigo-300 ring-2 ring-indigo-500/30 shadow-indigo-500/5' : 'border-slate-200/90'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Regime Geral Presumido
                  </span>
                  <h4 className="text-sm font-black text-slate-900">Lucro Presumido</h4>
                </div>
                {!simplesVence && (
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
                    Vencedor
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <div className={`text-3xl font-black font-mono tracking-tight ${
                  !simplesVence ? 'text-indigo-900' : 'text-slate-900'
                }`}>
                  {formatCurrency(res.totalPresumido)}
                </div>
                <p className="text-[11px] text-slate-500">
                  IRPJ/CSLL trimestrais + PIS/COFINS cumulativos + CPP 28,3%.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span>Alíquota Efetiva:</span>
                <span className="font-bold text-indigo-700">{formatPercent(res.aliqPresumido)}</span>
              </div>
            </div>

          </div>

          {/* TABELA DE MEMÓRIA DE CÁLCULO */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wide">
                  Memória de Cálculo — Decomposição do Lucro Presumido
                </h4>
              </div>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded border border-slate-700">
                Base Anual
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-sans font-black uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    <th className="py-3 px-6">Tributo / Obrigação</th>
                    <th className="py-3 px-4">Base Legal & Alíquota</th>
                    <th className="py-3 px-6 text-right">Valor Anual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-6 font-semibold">
                      <span>IRPJ (Imposto de Renda PJ)</span>
                      <span className="text-[10px] text-slate-400 font-sans block">Base {isServico ? '32%' : '8%'} × 15% (+10% s/ excedente trimestral a R$ 60k)</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-bold">Lei 9.430/96</td>
                    <td className="py-3 px-6 text-right font-black text-slate-900">
                      {formatCurrency(res.detalhes?.irpjTotal || 0)}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-6 font-semibold">
                      <span>CSLL (Contribuição Social)</span>
                      <span className="text-[10px] text-slate-400 font-sans block">Base {isServico ? '32%' : '12%'} × 9%</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-bold">Lei 7.689/88</td>
                    <td className="py-3 px-6 text-right font-black text-slate-900">
                      {formatCurrency(res.detalhes?.csllTotal || 0)}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-6 font-semibold">
                      <span>PIS e COFINS</span>
                      <span className="text-[10px] text-slate-400 font-sans block">0,65% (PIS) + 3,00% (COFINS) Cumulativos</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-bold">Lei 9.718/98</td>
                    <td className="py-3 px-6 text-right font-black text-slate-900">
                      {formatCurrency((res.detalhes?.pis || 0) + (res.detalhes?.cofins || 0))}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-6 font-semibold">
                      <span>{isServico ? 'ISS Municipal' : 'ICMS Estadual'}</span>
                      <span className="text-[10px] text-slate-400 font-sans block">Tributo sobre a receita de operações</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-bold">
                      {isServico ? `${iss}% (ISS)` : `${icms}% (ICMS)`}
                    </td>
                    <td className="py-3 px-6 text-right font-black text-slate-900">
                      {formatCurrency(res.detalhes?.tributoLocal || 0)}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/80 transition-colors bg-rose-50/20">
                    <td className="py-3 px-6 font-semibold text-rose-950">
                      <span className="flex items-center gap-1.5 font-bold">
                        CPP Patronal (Previdência Folha)
                      </span>
                      <span className="text-[10px] text-rose-700/80 font-sans block">20% Patronal + RAT + Terceiros (~28,3%)</span>
                    </td>
                    <td className="py-3 px-4 text-rose-700 font-bold">Lei 8.212/91</td>
                    <td className="py-3 px-6 text-right font-black text-rose-800">
                      {formatCurrency(res.detalhes?.cppPatronalPresumido || 0)}
                    </td>
                  </tr>

                  <tr className="bg-slate-900 text-white font-extrabold">
                    <td className="py-4 px-6 uppercase text-xs">Custo Tributário Total (Presumido)</td>
                    <td className="py-4 px-4 text-indigo-300 font-bold font-mono">Total Anual</td>
                    <td className="py-4 px-6 text-right font-black text-emerald-400 text-sm">
                      {formatCurrency(res.totalPresumido)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CARD DE COMPLIANCE TRIMESTRAL (EVOLUÇÃO ITEM 1 DA AUDITORIA) */}
          <div className="rounded-3xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Regra Trimestral da Lei nº 9.430/1996 (Apuração do IRPJ & CSLL)
                </h4>
              </div>
              <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                4 Trimestres Civis
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-center text-xs">
              {['1º Tri (31/03)', '2º Tri (30/06)', '3º Tri (30/09)', '4º Tri (31/12)'].map((tri, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[10px] font-sans font-bold text-slate-400 block">{tri}</span>
                  <span className="font-black text-slate-800 text-xs mt-1 block">
                    {formatCurrency(fatTrimestralMedio)}
                  </span>
                  <span className="text-[9px] text-slate-400 font-sans block mt-0.5">
                    Cota Isenta: R$ 60k
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2 font-sans mt-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <b>Alerta de Sazonalidade Tributária:</b> O IRPJ e a CSLL são devidos por <b>trimestres civis fechados</b>. Esta simulação assume faturamento linear regular. Caso a receita da empresa seja fortemente sazonal (concentrada em um único trimestre), o valor real do adicional de 10% poderá ser ligeiramente superior no trimestre de pico de faturamento.
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default SimuladorSimplesPresumidoPage;