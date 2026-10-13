import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateReformaIntegral } from '../../domain/taxCalculators';
import { CurrencyInput } from '../../components/common/CurrencyInput';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
import { 
  Calculator, 
  Printer, 
  Landmark, 
  TrendingUp, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Receipt, 
  ShoppingBag, 
  Calendar,
  Layers
} from 'lucide-react';

export function SimuladorReformaPage() {
  const [rbt12, setRbt12] = useState(360000);
  const [recServ, setRecServ] = useState(20000);
  const [recCom, setRecCom] = useState(0);
  const [compras, setCompras] = useState(5000);
  const [ano, setAno] = useState('2027');
  const [reducao, setReducao] = useState('0');

  const res = useMemo(() => calculateReformaIntegral({
    rbt12: parseNumberInput(rbt12),
    recServ: parseNumberInput(recServ),
    recCom: parseNumberInput(recCom),
    compras: parseNumberInput(compras),
    ano: parseInt(ano, 10),
    reducaoSetorial: parseInt(reducao, 10)
  }), [rbt12, recServ, recCom, compras, ano, reducao]);

  // Veredito Visual Dinâmico
  const isTradicional = res.simplesVantajoso;
  const isEmpate = res.diferencaAbs === 0;

  return (
    <div className="space-y-6 pb-16 animate-fade-in-up">
      
      {/* NAVEGAÇÃO & BREADCRUMBS */}
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Tributário' }, { label: 'Reforma Tributária (LC 214/2025)' }]} />
      </div>

      {/* HEADER PRINCIPAL */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 lg:p-8 text-white shadow-xl border border-slate-700/60">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Lei Complementar nº 214/2025
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <ShieldCheck className="w-3 h-3" /> Transição Oficial IBS/CBS
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Simulador de Transição: Simples Puro vs. Híbrido
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Compare a carga tributária da empresa na guia unificada do Simples versus a apuração segregada do IBS/CBS com direito ao aproveitamento de créditos sobre compras e insumos B2B.
            </p>
          </div>

          <div className="flex items-center gap-3 no-print w-full sm:w-auto">
            <button 
              onClick={() => window.print()} 
              className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-xs rounded-xl backdrop-blur-md border border-white/20 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow"
            >
              <Printer className="w-4 h-4 text-slate-200" />
              <span>Imprimir Relatório</span>
            </button>
          </div>
        </div>
      </div>

      {/* GRID DE TRABALHO: INPUTS vs RESULTADOS */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* COLUNA ESQUERDA: PARÂMETROS OPERACIONAIS */}
        <div className="no-print xl:col-span-5 space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md p-6 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-extrabold text-sm text-slate-900 tracking-tight">Parâmetros da Empresa</h2>
                  <p className="text-[11px] text-slate-400">Dados cadastrais e apuração mensal</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                LC 123 / LC 214
              </span>
            </div>

            <div className="space-y-4">
              
              {/* RBT12 */}
              <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 transition-all hover:bg-slate-50">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-wide text-slate-700 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    Faturamento 12 Meses (RBT12)
                  </label>
                  <span className="text-[10px] text-slate-400">Enquadramento de Faixa</span>
                </div>
                <CurrencyInput 
                  value={rbt12} 
                  onChange={setRbt12} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-black text-slate-900 bg-white text-base shadow-inner focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                />
              </div>

              {/* RECEITAS MENSAL (SERVIÇOS / COMÉRCIO) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 transition-all">
                  <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1">
                    <Receipt className="w-3.5 h-3.5 text-indigo-500" /> Serviços (Mês)
                  </label>
                  <CurrencyInput 
                    value={recServ} 
                    onChange={setRecServ} 
                    className="w-full p-2 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white text-sm shadow-inner focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                  />
                  <span className="text-[9.5px] text-slate-400 mt-1 block">Anexo III (LC 123)</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 transition-all">
                  <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1">
                    <Receipt className="w-3.5 h-3.5 text-slate-500" /> Comércio (Mês)
                  </label>
                  <CurrencyInput 
                    value={recCom} 
                    onChange={setRecCom} 
                    className="w-full p-2 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white text-sm shadow-inner focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                  />
                  <span className="text-[9.5px] text-slate-400 mt-1 block">Anexo I (LC 123)</span>
                </div>
              </div>

              {/* COMPRAS CREDITÁVEIS */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-200/70 hover:bg-emerald-50/60 transition-all">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-wide text-emerald-950 flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                    Compras Creditáveis (Mês)
                  </label>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                    Gera Crédito IBS/CBS
                  </span>
                </div>
                <div className="relative flex items-center">
                  <CurrencyInput 
                    value={compras} 
                    onChange={setCompras} 
                    className="w-full p-2.5 rounded-xl border border-emerald-300 bg-white font-black text-emerald-900 text-base shadow-inner focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 pl-10 transition-all" 
                  />
                  <div className="absolute left-3.5 pointer-events-none text-emerald-600">
                    <Landmark className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-[10px] text-emerald-800/80 mt-1.5 leading-relaxed">
                  Insumos tributáveis, aluguel PJ, serviços tomados e energia de produção. Folha de salários não gera crédito.
                </p>
              </div>

              {/* ANO DA TRANSIÇÃO */}
              <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 transition-all">
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  Ano de Referência da Transição
                </label>
                <select 
                  value={ano} 
                  onChange={e => setAno(e.target.value)} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 text-xs shadow-inner focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                >
                  <option value="2026">2026 — Fase Teste Simbólica (CBS 0,9% + IBS 0,1%)</option>
                  <option value="2027">2027 a 2028 — Entrada CBS Integral (~8,8% a 8,9%)</option>
                  <option value="2029">2029 a 2032 — Transição Gradual ICMS/ISS para IBS</option>
                  <option value="2033">2033+ — Modelo Definitivo do IVA Dual (~26,5%)</option>
                </select>
              </div>

              {/* REDUTOR SETORIAL */}
              <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 transition-all">
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  Tratamento Tributário Diferenciado
                </label>
                <select 
                  value={reducao} 
                  onChange={e => setReducao(e.target.value)} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 text-xs shadow-inner focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                >
                  <option value="0">Tributação Geral Padrão (Sem redução na alíquota)</option>
                  <option value="30">Redução de 30% — Profissões Regulamentadas (Art. 138 LC 214)</option>
                  <option value="60">Redução de 60% — Saúde, Educação e Agropecuária</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: RESULTADOS EXECUTIVOS */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* CARD DE DECISÃO & VEREDITO ESTRATÉGICO */}
          <div className={`relative overflow-hidden rounded-3xl border p-6 lg:p-7 shadow-sm transition-all duration-300 hover:shadow-md ${
            isEmpate 
              ? 'bg-gradient-to-br from-slate-50 to-slate-100/60 border-slate-200' 
              : isTradicional 
                ? 'bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-white border-emerald-200 shadow-emerald-500/5' 
                : 'bg-gradient-to-br from-indigo-50/90 via-blue-50/40 to-white border-indigo-200 shadow-indigo-500/5'
          }`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border ${
                  isEmpate 
                    ? 'bg-slate-200 text-slate-700 border-slate-300' 
                    : isTradicional 
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-600/30' 
                      : 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-600/30'
                }`}>
                  {isEmpate ? <TrendingUp className="w-6 h-6" /> : isTradicional ? <CheckCircle2 className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
                </div>

                <div>
                  <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 block mb-0.5">
                    Diagnóstico Estratégico Sugerido
                  </span>
                  <h3 className={`text-xl lg:text-2xl font-black tracking-tight leading-none ${
                    isEmpate ? 'text-slate-800' : isTradicional ? 'text-emerald-900' : 'text-indigo-950'
                  }`}>
                    {isEmpate ? 'Custos Tributários Equivalentes' : isTradicional ? 'Manter Simples Tradicional' : 'Migrar para o Regime Híbrido'}
                  </h3>
                </div>
              </div>

              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border self-start sm:self-auto ${
                isEmpate 
                  ? 'bg-slate-200 text-slate-700 border-slate-300' 
                  : isTradicional 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                    : 'bg-indigo-100 text-indigo-800 border-indigo-200'
              }`}>
                {isEmpate ? 'Neutro' : isTradicional ? 'Decisão Segura' : 'Oportunidade de Ganho'}
              </div>
            </div>

            {/* IMPACTO FINANCEIRO RESUMIDO */}
            <div className="mt-5 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="text-slate-600 leading-relaxed">
                {isEmpate ? (
                  <span>Ambos os regimes representam o mesmo desembolso mensal projetado.</span>
                ) : isTradicional ? (
                  <span>
                    A opção pelo Regime Híbrido representaria um <strong className="text-rose-600 font-extrabold uppercase">custo adicional</strong> de:
                  </span>
                ) : (
                  <span>
                    A migração para o Regime Híbrido representa uma <strong className="text-indigo-700 font-extrabold uppercase">economia líquida</strong> de:
                  </span>
                )}
              </div>

              {!isEmpate && (
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono font-black text-base border shadow-sm self-start sm:self-auto ${
                  isTradicional 
                    ? 'bg-white text-rose-700 border-rose-200' 
                    : 'bg-white text-indigo-800 border-indigo-200'
                }`}>
                  <span>{formatCurrency(res.diferencaAbs)}</span>
                  <span className="text-[10px] font-sans font-bold text-slate-400">/ mês</span>
                </div>
              )}
            </div>
          </div>

          {/* CARDS COMPARATIVOS LADO A LADO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* CARD 1: SIMPLES TRADICIONAL */}
            <div className={`relative rounded-3xl border p-5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
              isTradicional 
                ? 'border-emerald-300 ring-2 ring-emerald-500/30' 
                : 'border-slate-200/90'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Cenário Vigente
                  </span>
                  <h4 className="text-sm font-black text-slate-900">Simples Tradicional</h4>
                </div>
                {isTradicional && (
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Mais Vantajoso
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <div className="text-3xl font-black font-mono tracking-tight text-slate-900">
                  {formatCurrency(res.totalSimples)}
                </div>
                <p className="text-[11px] text-slate-500">
                  Guia única DAS unificada (alíquota efetiva incidente sobre a receita bruta total).
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span>Alíquota Efetiva:</span>
                <span className="font-bold">{formatPercent(res.aliqSimplesServ)}</span>
              </div>
            </div>

            {/* CARD 2: REGIME HÍBRIDO */}
            <div className={`relative rounded-3xl border p-5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
              !isTradicional && !isEmpate 
                ? 'border-indigo-300 ring-2 ring-indigo-500/30 shadow-indigo-500/5' 
                : 'border-slate-200/90'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Novo Modelo (LC 214)
                  </span>
                  <h4 className="text-sm font-black text-slate-900">Regime Híbrido (IBS/CBS)</h4>
                </div>
                {!isTradicional && !isEmpate && (
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
                    Mais Vantajoso
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <div className={`text-3xl font-black font-mono tracking-tight ${
                  !isTradicional && !isEmpate ? 'text-indigo-900' : 'text-slate-900'
                }`}>
                  {formatCurrency(res.totalHibrido)}
                </div>
                <p className="text-[11px] text-slate-500">
                  DAS Reduzido no Simples + Apuração Não-Cumulativa dos novos tributos por fora.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span>DAS Reduzido + CBS/IBS:</span>
                <span className="font-bold">{formatCurrency(res.dasReduzidoTotal)} + {formatCurrency(res.cbsApurada)}</span>
              </div>
            </div>

          </div>

          {/* TABELA DE MEMÓRIA DE CÁLCULO */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wide">
                  Memória de Cálculo Detalhada — Regime Híbrido
                </h4>
              </div>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                Ano {ano}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-sans font-black uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    <th className="py-3 px-6">Componente Tributário</th>
                    <th className="py-3 px-4">Alíquota Aplicada</th>
                    <th className="py-3 px-6 text-right">Valor Apurado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold">
                      <span>DAS Reduzido (Serviços)</span>
                      <span className="text-[10px] text-slate-400 font-sans block">Sem parcelas de PIS/COFINS e fração do ISS</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-600">
                      {res.aliqSimplesServ ? formatPercent(res.aliqSimplesServ) : '0,00%'}
                    </td>
                    <td className="py-3.5 px-6 text-right font-black text-slate-900">
                      {formatCurrency(res.dasReduzidoServ)}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold">
                      <span>DAS Reduzido (Comércio)</span>
                      <span className="text-[10px] text-slate-400 font-sans block">Sem parcelas de PIS/COFINS e fração do ICMS</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-600">
                      {res.aliqSimplesCom ? formatPercent(res.aliqSimplesCom) : '0,00%'}
                    </td>
                    <td className="py-3.5 px-6 text-right font-black text-slate-900">
                      {formatCurrency(res.dasReduzidoCom)}
                    </td>
                  </tr>

                  <tr className="bg-indigo-50/40 hover:bg-indigo-50/60 transition-colors">
                    <td className="py-3.5 px-6 font-extrabold text-indigo-950">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        CBS/IBS Líquido (Regime Regular)
                      </span>
                      <span className="text-[10px] text-indigo-700/80 font-sans block">
                        Débito sobre faturamento menos créditos de insumos
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-black text-indigo-700">
                      {formatPercent(res.aliqConjuntaIbsCbs)}
                    </td>
                    <td className="py-3.5 px-6 text-right font-black text-indigo-950 text-sm">
                      +{formatCurrency(res.cbsApurada)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FLUXO EXPLICATIVO NÃO-CUMULATIVO */}
          <div className="rounded-3xl border border-indigo-200/70 bg-gradient-to-br from-indigo-50/40 via-white to-slate-50 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-indigo-100">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                Trilha de Não-Cumulatividade (Demonstração do IVA Dual)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <span className="text-[10px] font-sans font-extrabold uppercase text-slate-400 block mb-1">
                  1. Débito Bruto
                </span>
                <span className="text-base font-black text-rose-600 block">
                  {formatCurrency(res.debitoBrutoIbsCbs)}
                </span>
                <span className="text-[10px] text-slate-500 font-sans mt-0.5 block">
                  Sobre receita apurada
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <span className="text-[10px] font-sans font-extrabold uppercase text-slate-400 block mb-1">
                  2. Crédito Insumos
                </span>
                <span className="text-base font-black text-emerald-600 block">
                  - {formatCurrency(res.creditoFornecedores)}
                </span>
                <span className="text-[10px] text-slate-500 font-sans mt-0.5 block">
                  Compras comprovadas
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-sm">
                <span className="text-[10px] font-sans font-extrabold uppercase text-slate-400 block mb-1">
                  3. Saldo a Recolher
                </span>
                <span className="text-base font-black text-indigo-300 block">
                  = {formatCurrency(res.cbsApurada)}
                </span>
                <span className="text-[10px] text-slate-400 font-sans mt-0.5 block">
                  Guia CBS/IBS fora do DAS
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-sans">
              <span>* Base legal: Art. 47 da LC 214/2025 e LC 123/2006.</span>
              <span className="font-mono font-semibold">Portal Qualibra • Inteligência Tributária</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}