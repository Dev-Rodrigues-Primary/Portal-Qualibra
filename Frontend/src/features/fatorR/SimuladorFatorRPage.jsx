import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateFatorRCompleto } from '../../domain/taxCalculators';
import { CurrencyInput } from '../../components/common/CurrencyInput';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
import { 
  PieChart, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  DollarSign, 
  Calculator, 
  Info, 
  Printer, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  ArrowRight,
  HelpCircle,
  Briefcase,
  AlertTriangle
} from 'lucide-react';

export function SimuladorFatorRPage() {
  const [rbt12, setRbt12] = useState(1200000);
  const [folha12, setFolha12] = useState(300000);
  const [receitaMes, setReceitaMes] = useState(100000);
  const [socioNoTeto, setSocioNoTeto] = useState(false);

  const res = useMemo(() => calculateFatorRCompleto({
    rbt12: parseNumberInput(rbt12) || 0, 
    folha12: parseNumberInput(folha12) || 0, 
    receitaMes: parseNumberInput(receitaMes) || 0, 
    socioNoTetoInss: !!socioNoTeto
  }), [rbt12, folha12, receitaMes, socioNoTeto]);

  const atingiuMeta = res.enquadraAnexo3;
  const progressoBarra = Math.min(100, Math.max(0, res.fatorR || 0));

  return (
    <div className="space-y-6 pb-16 animate-fade-in-up">
      
      {/* NAVEGAÇÃO / BREADCRUMBS */}
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Planejamento Tributário' }, { label: 'Otimização de Fator R (LC 123/2006)' }]} />
      </div>

      {/* HEADER EXECUTIVO PREMIUM */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 lg:p-8 text-white shadow-xl border border-slate-700/60">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-400/30 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Lei Complementar nº 123/2006 • Art. 18
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                <ShieldCheck className="w-3 h-3" /> Corte Legal: Folha ≥ 28%
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Análise Estratégica do Fator R
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Simule o enquadramento entre o <b>Anexo III</b> (alíquota a partir de 6%) e o <b>Anexo V</b> (a partir de 15,5%), calculando o custo marginal exato no CPF do sócio para maximizar o lucro líquido.
            </p>
          </div>

          <div className="flex items-center gap-3 no-print w-full sm:w-auto">
            <button 
              onClick={() => window.print()} 
              className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-xs rounded-xl backdrop-blur-md border border-white/20 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow"
            >
              <Printer className="w-4 h-4 text-slate-200" />
              <span>Imprimir Parecer</span>
            </button>
          </div>
        </div>
      </div>

      {/* GRID DE TRABALHO */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* COLUNA ESQUERDA: PARÂMETROS DA EMPRESA */}
        <div className="no-print xl:col-span-4 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md p-6 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Calculator className="w-4 h-4 text-amber-600" />
                Dados Contábeis da Empresa
              </h3>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                12 Meses
              </span>
            </div>

            <div className="space-y-4">
              
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                  Receita Bruta 12 Meses (RBT12)
                </label>
                <CurrencyInput 
                  value={rbt12} 
                  onChange={setRbt12} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-black text-slate-900 text-base shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
                <span className="text-[9.5px] text-slate-400 mt-1 block">Faturamento acumulado para cálculo do divisor</span>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-indigo-500" />
                  Folha + Pró-Labore 12m (FS12)
                </label>
                <CurrencyInput 
                  value={folha12} 
                  onChange={setFolha12} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-black text-slate-900 text-base shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
                <span className="text-[9.5px] text-slate-400 mt-1 block">Salários, pró-labores e encargos efetivamente pagos</span>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-amber-950 mb-1 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                  Receita Projetada do Mês Atual
                </label>
                <CurrencyInput 
                  value={receitaMes} 
                  onChange={setReceitaMes} 
                  className="w-full p-2.5 rounded-xl border border-amber-300 bg-white font-black text-amber-900 text-base shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
                <p className="text-[10px] text-amber-800/80 mt-1.5 leading-relaxed">
                  Projeção da competência atual para apurar o DAS. O enquadramento definitivo do Simples Nacional utiliza a <b>média móvel acumulada dos últimos 12 meses</b> (FS12 ÷ RBT12).
                </p>
              </div>

              <label className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100/80 transition-all shadow-2xs">
                <input 
                  type="checkbox" 
                  checked={socioNoTeto} 
                  onChange={e => setSocioNoTeto(e.target.checked)} 
                  className="mt-0.5 w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block">Sócio no Teto do INSS</span>
                  <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">
                    Já recolhe pelo teto máximo (R$ 8.157,41) em outro vínculo (INSS adicional = R$ 0,00).
                  </span>
                </div>
              </label>

            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: RESULTADOS & AUDITORIA */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* CARDS TOPO: MEDIDOR 28% + STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <PieChart className="w-3.5 h-3.5 text-slate-400" />
                    Proporção da Folha (Fator R)
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    atingiuMeta ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {atingiuMeta ? 'Meta Batida' : 'Abaixo da Meta'}
                  </span>
                </div>

                <div className={`text-4xl lg:text-5xl font-black tracking-tight font-mono ${
                  atingiuMeta ? 'text-emerald-600' : 'text-amber-500'
                }`}>
                  {formatPercent(res.fatorR)}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-700 ease-out rounded-full ${
                      atingiuMeta ? 'bg-emerald-500' : 'bg-amber-400'
                    }`}
                    style={{ width: `${progressoBarra}%` }}
                  />
                  <div 
                    className="absolute top-0 bottom-0 w-[2px] bg-slate-900 z-10" 
                    style={{ left: '28%' }}
                    title="Corte Legal: 28,00%"
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-1.5">
                  <span>0%</span>
                  <span className="font-bold text-slate-700">Meta: 28,00%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <div className={`rounded-3xl border p-6 shadow-sm flex flex-col justify-between transition-all ${
              atingiuMeta 
                ? 'bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-white border-emerald-300 ring-2 ring-emerald-500/20' 
                : 'bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white border-amber-300 ring-2 ring-amber-500/20'
            }`}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {atingiuMeta ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  )}
                  <span className={`text-[10px] font-black uppercase tracking-wider ${
                    atingiuMeta ? 'text-emerald-800' : 'text-amber-800'
                  }`}>
                    Enquadramento Fiscal
                  </span>
                </div>

                <div className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                  {res.anexo}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {atingiuMeta 
                    ? 'Tributado pela tabela reduzida do Simples Nacional.' 
                    : 'Sujeito à tributação mais gravosa do Simples Nacional.'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 font-sans">Alíquota Efetiva:</span>
                <span className={`text-base font-black ${atingiuMeta ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {formatPercent(atingiuMeta ? res.aliqAnexo3 : res.aliqAnexo5)}
                </span>
              </div>
            </div>

          </div>

          {/* BALANÇO FINANCEIRO MENSAL */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:p-7 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Balanço Financeiro Mensal (Tributação Marginal)
              </h3>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                Competência Atual
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 space-y-3">
                <div className="text-[11px] font-black uppercase tracking-wider text-emerald-900 flex items-center justify-between">
                  <span>1. Economia no CNPJ (Guia DAS)</span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Empresa</span>
                </div>
                
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Imposto no Anexo V:</span>
                    <span className="font-semibold">{formatCurrency(res.dasAnexo5)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Imposto no Anexo III:</span>
                    <span className="font-semibold">{formatCurrency(res.dasAnexo3)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-emerald-200 font-bold text-emerald-800 mt-2 shadow-2xs">
                    <span className="text-[11px]">Redução Bruta na Guia:</span>
                    <span className="text-sm font-black">+{formatCurrency(res.diferencaDasBruta)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200/80 space-y-3">
                <div className="text-[11px] font-black uppercase tracking-wider text-rose-900 flex items-center justify-between">
                  <span>2. Custo Marginal no CPF (Sócio)</span>
                  <span className="text-[9px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">Pessoa Física</span>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-rose-700">
                    <span>INSS Extra Retido:</span>
                    <span className="font-semibold">-{formatCurrency(res.inssSocioIncremental)}</span>
                  </div>
                  <div className="flex justify-between text-rose-700">
                    <span>IRPF Extra Retido:</span>
                    <span className="font-semibold">-{formatCurrency(res.irpfSocioIncremental)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-rose-200 font-bold text-rose-800 mt-2 shadow-2xs">
                    <span className="text-[11px]">Custo Total Extra no CPF:</span>
                    <span className="text-sm font-black">-{formatCurrency(res.custoTotalCpfIncremental)}</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-5 lg:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl shadow-lg border border-slate-700/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-0.5">
                  Resultado Consolidado (CNPJ − CPF)
                </span>
                <span className="font-black text-base sm:text-lg tracking-tight">
                  Economia LÍQUIDA Real da Operação:
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Ganho financeiro efetivo que sobra limpo no caixa após recolher os impostos da empresa e do sócio.
                </p>
              </div>

              <div className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-emerald-400 self-start sm:self-auto bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
                {formatCurrency(res.economiaLiquidaReal)}
              </div>
            </div>

          </div>

          {/* PLANO DE AÇÃO */}
          {!atingiuMeta && (
            <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/30 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-amber-500/30">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-amber-950 text-base">
                      Plano de Ação Estratégico Sugerido
                    </h4>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Competência Atual
                    </span>
                  </div>

                  <p className="text-xs text-amber-900/90 mt-1.5 leading-relaxed">
                    Para que a receita de <b>{formatCurrency(parseNumberInput(receitaMes))}</b> seja faturada na alíquota reduzida do <b>Anexo III</b>, a retirada de Pró-Labore deste mês precisa ser ajustada:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 font-mono text-xs">
                    <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-2xs">
                      <span className="text-[10px] font-sans font-extrabold uppercase text-slate-500 block mb-1">
                        Pró-Labore Ideal Mínimo (28%):
                      </span>
                      <span className="text-base font-black text-amber-800">
                        {formatCurrency(res.proLaboreIdeal)}
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-2xs">
                      <span className="text-[10px] font-sans font-extrabold uppercase text-slate-500 block mb-1">
                        Aumento Necessário na Folha:
                      </span>
                      <span className="text-base font-black text-rose-600">
                        +{formatCurrency(res.faltaMesProlabore)}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-amber-800/80 mt-3 font-sans italic">
                    * O pró-labore deve observar o piso salarial da categoria ou o salário mínimo vigente. Alterações devem ser escrituradas na folha da competência corrente (a legislação previdenciária não admite recolhimento retroativo para enquadramento fiscal).
                  </p>
                </div>
              </div>
            </div>
          )}

          {atingiuMeta && (
            <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/30 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-emerald-600/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-emerald-950 text-base">
                    Empresa em Conformidade com o Anexo III
                  </h4>
                  <p className="text-xs text-emerald-900/90 mt-0.5 leading-relaxed">
                    Sua proporção atual de <b>{formatPercent(res.fatorR)}</b> supera o corte legal de 28,00%. A empresa já está economizando <b>{formatCurrency(res.diferencaDasBruta)}/mês</b> na guia unificada do Simples Nacional.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ALERTA DE COMPLIANCE OPERACIONAL (EVOLUÇÃO ITEM 3 DA AUDITORIA) */}
          <div className="p-4 bg-amber-50/90 border border-amber-200/90 rounded-2xl text-[11px] text-amber-950 flex items-start gap-3 shadow-2xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold uppercase tracking-wide block text-amber-900">
                Auditoria de Transmissão Prévia (Malha Digital eSocial x PGDAS-D):
              </span>
              <p className="leading-relaxed font-sans text-amber-800">
                Antes de emitir a guia DAS definitiva pelo Anexo III, o analista deve validar se <b>todas as últimas 12 competências da folha estão transmitidas e encerradas no eSocial/DCTFWeb</b>. O robô de malha da Receita Federal cruza o histórico das declarações e pode desenquadrar a empresa retroativamente se constatar omissão ou retificação pendente em meses anteriores.
              </p>
            </div>
          </div>

          {/* NOTA DE AUDITORIA & METODOLOGIA */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-[11px] text-slate-500 flex items-start gap-2.5 font-mono">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              <b>Memória Marginal Qualibra:</b> O custo de IRPF e INSS do sócio é apurado subtraindo o imposto da folha ideal (Anexo III) pelo imposto da folha atual (Anexo V), respeitando a progressividade da tabela mensal da Receita Federal e a trava do teto do RGPS.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default SimuladorFatorRPage;