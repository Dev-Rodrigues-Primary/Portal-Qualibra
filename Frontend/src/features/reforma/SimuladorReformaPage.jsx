import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateReformaIntegral } from '../../domain/taxCalculators';
import { CurrencyInput } from '../../components/common/CurrencyInput';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
import { Calculator, Printer, Landmark, TrendingUp, HelpCircle } from 'lucide-react';

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

  // Variaveis Dinamicas Condicionais
  const cartaoEstilo = res.simplesVantajoso 
    ? "bg-emerald-50 border-emerald-300 shadow-emerald-100/50" 
    : "bg-indigo-50 border-indigo-300 shadow-indigo-100/50"; 

  const cartaoIcon = res.simplesVantajoso ? "text-emerald-700" : "text-indigo-700";

  return (
    <div className="space-y-6 pb-12 animate-fade-in-up">
      <div className="no-print"><Breadcrumbs items={[{ label: 'Simulador da Reforma Tributária (LC 214)' }]} /></div>

      <div className="glass-panel p-6 lg:p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
        <div className="mb-4 md:mb-0">
          <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full uppercase mb-2 inline-block">
            Lei Complementar nº 214/2025
          </span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 mt-1">
             Simulador de Transição IBS/CBS 
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
            Projete o impacto financeiro da migração do Simples Nacional tradicional para o <b>Regime Híbrido</b>, 
            considerando o direito a crédito nas compras B2B e a extinção progressiva no anexo (LC123).
          </p>
        </div>
        <button onClick={() => window.print()} className="no-print p-3 flex items-center gap-2 bg-slate-900 text-white rounded-xl shadow hover:bg-slate-800 transition text-sm font-semibold">
          <Printer className="w-4 h-4"/> Imprimir Relatório
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        <div className="no-print xl:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 bg-white">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600"/> Parâmetros da Empresa
            </h3>
            
            <div className="space-y-4">
              
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1">Faturamento 12 Meses (RBT12) Atual</label>
                <CurrencyInput value={rbt12} onChange={setRbt12} className="w-full p-2.5 rounded-lg border border-slate-300 font-bold shadow-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1">Receita Serviços(mês)</label>
                  <CurrencyInput value={recServ} onChange={setRecServ} className="w-full p-2.5 rounded-lg border border-slate-300 shadow-sm text-sm" />
                </div>
                 <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1">Receita Comércio(mês)</label>
                  <CurrencyInput value={recCom} onChange={setRecCom} className="w-full p-2.5 rounded-lg border border-slate-300 shadow-sm text-sm" />
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1">Compras Creditáveis c/ Insumo no Mês</label>
                <div className="flex relative">
                   <CurrencyInput value={compras} onChange={setCompras} className="w-full p-2.5 rounded-lg border border-emerald-300 bg-emerald-50/50 shadow-sm font-bold text-emerald-800 text-sm pl-10 focus:ring-emerald-200" />
                   <div className="absolute left-3 top-3"><Landmark className="w-4 h-4 text-emerald-600" /></div>
                </div>
              </div>
              
              <div>
                 <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1">Escolher Período Cronograma Oficial:</label>
                 <select value={ano} onChange={e => setAno(e.target.value)} className="w-full p-2.5 border rounded-lg bg-slate-50 font-semibold text-slate-800 text-sm">
                   <option value="2026">Fase 2026 (CBS 0,9% + IBS 0,1%) - Testes Simbolicos</option>
                   <option value="2027">Fase 2027 a 2028 (CBS ~8,8%) Entrada Híbrida</option>
                   <option value="2029">Fase 2029 A 2032(Transições CBS+IBS Frações)</option>
                   <option value="2033">Definitiva > 2033 (Alíquota Total Integrada Cheia ~26%)</option>
                 </select>
              </div>
              
               <div>
                 <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1 flex justify-between"> Redutor Legis. CBS  </label>
                 <select value={reducao} onChange={e => setReducao(e.target.value)} className="w-full p-2 border rounded bg-white text-xs">
                   <option value="0">Padrão Total 100% Tributos Cheios Normais </option>
                   <option value="30">(- 30%) Setor Profissões Regulamentadas</option>
                   <option value="60">(- 60%) Área Básica (Saúde, Educação...)</option>
                 </select>
              </div>

            </div>
          </div>
        </div>

        {/* LADO DIREITO */}
        <div className="xl:col-span-7 space-y-6">
          
           {/* ============ DECISÃO SUGERIDA CONDICIONAL SEMANTICA E STRATÉGICA ========== */}
          <div className={`p-6 md:p-8 rounded-2xl border flex flex-col justify-center items-center shadow transition-all ${cartaoEstilo}`}>
              <div className="mb-2"><TrendingUp className={`w-10 h-10 ${cartaoIcon}`} /></div>
              
              <h3 className={`font-black text-2xl uppercase tracking-wider mb-2 text-center leading-none mt-2 ${cartaoIcon}`}>
                {res.simplesVantajoso ? "Manter Simples Tradicional" : "Opte pelo Regime Híbrido"}
              </h3>
              
              <div className="text-center font-medium opacity-95 rounded bg-white/60 backdrop-blur px-5 py-3 mt-1 text-slate-800">
                {res.diferencaAbs === 0 ? (
                    <span>Ambos os regimes apresentam <b>impactos financeiros equivalentes.</b></span>
                ) : res.simplesVantajoso ? (
                    <>
                       A migração para o Regime Híbrido representaria um 
                       <strong className="text-rose-700 font-bold uppercase mx-1">Custo Adicional</strong>
                       estimado de: 
                       <span className="font-mono bg-white px-2 py-0.5 rounded ml-2 text-[17px] font-black border border-slate-200 shadow-sm text-rose-800 inline-block">
                          {formatCurrency(res.diferencaAbs)} / mês
                       </span>
                    </>
                ) : (
                    <>
                       A migração sugere gerar uma real
                       <strong className="text-indigo-800 font-bold uppercase mx-1">Economia</strong> 
                       estimada em:
                       <span className="font-mono bg-white px-2 py-0.5 rounded ml-2 text-[17px] font-black border border-slate-200 shadow-sm text-indigo-900 inline-block">
                          {formatCurrency(res.diferencaAbs)} / mês
                       </span>
                    </>
                )}
              </div>
          </div>

          
          {/* ============ CUSTOS COMPILADOS LADO A LADO ========= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
             <div className={`p-5 rounded-2xl border bg-white flex flex-col justify-between ${res.simplesVantajoso ? 'ring-2 ring-emerald-500 border-emerald-300' : 'border-slate-200'}`}>
                <div>
                   <span className="text-xs uppercase font-bold text-slate-500 tracking-wider flex justify-between items-start">
                      Simples Tradicional 
                      {res.simplesVantajoso && <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase text-[9px] h-fit ml-2 shadow-sm">Decisão Segura</span> } 
                   </span>
                   <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Guia única unificada (DAS clássico e restrito)</p>
                </div>
                <div className="font-mono text-3xl font-black mt-4 tracking-tighter text-slate-900">{formatCurrency(res.totalSimples)}</div>
             </div>

             <div className={`p-5 rounded-2xl border bg-white flex flex-col justify-between ${!res.simplesVantajoso ? 'ring-2 ring-indigo-500 border-indigo-300 shadow-md shadow-indigo-100/50' : 'border-slate-200'}`}>
                <div>
                   <span className="text-xs uppercase font-bold text-slate-500 tracking-wider flex justify-between items-start">
                      Regime Híbrido (LC 214) 
                      {!res.simplesVantajoso && <span className="bg-indigo-600 text-white px-2 py-0.5 rounded uppercase font-bold text-[9px] h-fit ml-2 leading-tight text-center shadow-sm">Migração<br/>Vantajosa</span> } 
                   </span>
                   <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">DAS Reduzida + Compensação (IBS/CBS)</p>
                </div>
                <div className={`font-mono text-3xl font-black mt-4 tracking-tighter ${!res.simplesVantajoso ? 'text-indigo-800' : 'text-slate-800'}`}>
                   {formatCurrency(res.totalHibrido)}
                </div>
             </div>

          </div>

          {/* ============ BOX DETALHAMENTO DE DECOMPOSIÇÕES ============ */}
           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-0 mb-4 ">
               <div className="bg-slate-900 px-6 py-4 border-b-4 border-indigo-500/80">
                  <h4 className="font-bold text-white text-sm uppercase flex gap-2">Memória de Cálculo Detalhada (Regime Híbrido)</h4>
               </div>
               
               <table className="w-full text-left font-mono text-xs text-slate-600">
                  <thead className="bg-slate-50 text-[10px] font-sans font-extrabold text-slate-500 border-b tracking-wider">
                     <tr>
                        <th className="py-3 px-6 uppercase w-[40%]">Componente a Recolher</th>
                        <th className="py-3 px-2 uppercase w-[30%]">Alíquota Efetiva</th>
                        <th className="py-3 px-6 text-right uppercase w-[30%]">Valor Parcial</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr className="border-b border-dashed hover:bg-slate-50">
                        <td className="py-3 px-6 font-semibold">DAS Mantido (Serviços)</td>
                        <td className="py-3 px-2 font-bold">{res.aliqSimplesServ ? formatPercent(res.aliqSimplesServ) : '0,00%'} (Parcial)</td>
                        <td className="py-3 px-6 text-right text-slate-800 font-bold">{formatCurrency(res.dasReduzidoServ)}</td>
                     </tr>
                      <tr className="border-b border-slate-100 hover:bg-slate-50 border-dashed">
                        <td className="py-3 px-6 font-semibold">DAS Mantido (Comércio)</td>
                        <td className="py-3 px-2 font-bold text-slate-500">{res.aliqSimplesCom ? formatPercent(res.aliqSimplesCom) : '0,00%'} (Parcial)</td>
                        <td className="py-3 px-6 text-right text-slate-800 font-bold">{formatCurrency(res.dasReduzidoCom)}</td>
                     </tr>
                     <tr className="bg-indigo-50/50 shadow-inner">
                        <td className="py-4 px-6 text-indigo-900 font-extrabold uppercase text-[11px] truncate" title="CBS/IBS Apurado Líquido a Pagar">CBS/IBS (Não-Cumulativo)</td>
                        <td className="py-4 px-2 font-bold text-indigo-700">{formatPercent(res.aliqConjuntaIbsCbs)} (Regra Ano)</td>
                        <td className="py-4 px-6 text-right font-black text-[13px] text-indigo-950">+{formatCurrency(res.cbsApurada)}</td>
                     </tr>
                  </tbody>
               </table>
           </div>


            <div className="p-5 border border-indigo-200 bg-indigo-50/50 rounded-2xl text-[12px] flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-white flex flex-shrink-0 flex items-center justify-center border border-indigo-200 shadow-sm">
                 <HelpCircle className="text-indigo-500 w-5 h-5"/>
              </div>
              <div className="w-full">
                <b className="uppercase block font-black text-slate-800 tracking-wide mb-1 border-b border-indigo-100 pb-2 w-full text-[11px]">
                   Lógica de Apuração CBS/IBS (Dinâmica de Compensação Tributária):
                </b>
                 <ul className="space-y-1 font-mono text-[11px] text-slate-700 mt-2" >
                     <li className="flex justify-between items-center pr-1 pb-1">
                        <span>Débito Bruto sobre Faturamento Mensal Informado: </span> 
                        <b className="text-rose-600/90 font-bold">{formatCurrency(res.debitoBrutoIbsCbs)}</b>
                     </li>  
                     <li className="flex justify-between border-t border-dashed border-slate-300 pt-1 text-emerald-700 opacity-90 pr-1"> 
                        <span>Crédito Tributário Permitido Adquirido pelas Compras:</span> 
                        <b className="font-bold text-[12px]"> - {formatCurrency(res.creditoFornecedores)}</b>   
                     </li>  
                     <li className="flex justify-between bg-slate-900 pl-2 rounded shadow-md mt-2 p-1.5 font-bold pb-1 text-white pr-2 border-indigo-300"> 
                        <span className="uppercase text-[10px] tracking-wider pt-0.5">Saldo IBS/CBS Definitivo Lançado Extra:</span> 
                        <b className="text-[13px] tracking-tight">{formatCurrency(res.cbsApurada)}</b>   
                     </li> 
                  </ul> 
                 <span className="text-[9.5px] mt-2 block w-full !text-right uppercase !pr-3 italic font-bold text-indigo-400">Inteligência Fiscal Parametrizada • Hub Operacional Qualibra ©</span> 
              </div>
            </div>

        </div>

      </div>
    </div>
  );
}