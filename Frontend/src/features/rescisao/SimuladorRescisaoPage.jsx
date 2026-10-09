import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateRescisaoCLTCompleto } from '../../domain/taxCalculators';
import { CurrencyInput } from '../../components/common/CurrencyInput';
import { formatCurrency, parseNumberInput } from '../../utils/formatters';
import { Calculator, Printer, ShieldCheck, HelpCircle } from 'lucide-react';

export function SimuladorRescisaoPage() {
  const [salario, setSalario] = useState(4500); const [diasMes, setDiasMes] = useState(30);
  const [motivo, setMotivo] = useState('sem_justa_causa'); const [fgts, setFgts] = useState(12000);
  const [anosCasa, setAnosCasa] = useState(2); const [meses13, setMeses13] = useState(8);
  const [mesesFerias, setMesesFerias] = useState(8); const [feriasVencidas, setFeriasVencidas] = useState(0);

  const res = useMemo(() => calculateRescisaoCLTCompleto({
    salarioBase: parseNumberInput(salario), diasTrabalhadosMes: parseInt(diasMes, 10), motivo, 
    meses13: parseInt(meses13, 10), feriasVencidasPeriodos: parseInt(feriasVencidas, 10), 
    mesesFeriasProporcionais: parseInt(mesesFerias, 10), anosCompletosCasa: parseInt(anosCasa, 10), saldoFgts: parseNumberInput(fgts)
  }), [salario, diasMes, motivo, meses13, feriasVencidas, mesesFerias, anosCasa, fgts]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in-up">
      <div className="no-print"><Breadcrumbs items={[{ label: 'Rescisão Contratual (eSocial)' }]} /></div>

      <div className="glass-panel p-6 lg:p-8 rounded-2xl border border-slate-200 flex justify-between items-center shadow-sm">
        <div>
          <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full uppercase">
            Normativas RFB & Tabela Previdenciária Progressiva
          </span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">Cálculo Rescisório de DP (TRCT)</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl">
            Simulador profissional e seguro. Apenas verbas corporativas na Guia (Salários, 13º e Aviso), com Decomposição das Bases (Mensal vs 13º). O saque Caixa fica totalmente isolado para fins gerenciais do colaborador.
          </p>
        </div>
        <button onClick={() => window.print()} className="no-print p-3 bg-slate-900 text-white rounded-xl shadow-sm hover:bg-slate-800 transition">
          <Printer className="w-5 h-5"/>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* PARÂMETROS - DP */}
        <div className="no-print xl:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 bg-slate-50">
            <h3 className="font-bold text-slate-900 text-sm pb-1 flex items-center gap-2 border-b border-slate-200">
              <Calculator className="w-4 h-4 text-brand-600"/> Setup Rescisório Geral
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700">Salário Base p/ Fins Rescisórios (R$)</label>
                <CurrencyInput value={salario} onChange={setSalario} className="w-full p-2.5 mt-1 rounded-lg border border-slate-300 text-sm font-bold text-slate-900 shadow-sm"/>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Classificação / Motivo Desligamento</label>
                <select value={motivo} onChange={e=>setMotivo(e.target.value)} className="w-full p-2.5 mt-1 rounded-lg border border-slate-300 text-sm font-semibold text-slate-800">
                  <option value="sem_justa_causa">Desligamento Sem Justa Causa</option>
                  <option value="acordo">Demissão por Acordo Consensual (Art. 484-A)</option>
                  <option value="pedido">Pedido Voluntário de Demissão</option>
                  <option value="justa_causa">Desligamento Com Justa Causa Legal</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-3 bg-white p-4 border border-slate-200 rounded-xl">
                <div><label className="block text-[11px] font-bold text-slate-700">Dias Mês Atual<input type="number" min="0" max="31" value={diasMes} onChange={e=>setDiasMes(e.target.value)} className="w-full p-2 mt-1 border rounded text-xs font-mono bg-slate-50"/></label></div>
                <div><label className="block text-[11px] font-bold text-slate-700">Anos Completos Casa<input type="number" min="0" value={anosCasa} onChange={e=>setAnosCasa(e.target.value)} className="w-full p-2 mt-1 border rounded text-xs font-mono bg-slate-50"/></label></div>
                <div><label className="block text-[11px] font-bold text-slate-700">Direito Avos 13º<input type="number" min="0" max="12" value={meses13} onChange={e=>setMeses13(e.target.value)} className="w-full p-2 mt-1 border rounded text-xs font-mono bg-slate-50"/></label></div>
                <div><label className="block text-[11px] font-bold text-slate-700">Direito Férias Proporcionais<input type="number" min="0" max="12" value={mesesFerias} onChange={e=>setMesesFerias(e.target.value)} className="w-full p-2 mt-1 border rounded text-xs font-mono bg-slate-50"/></label></div>
              </div>
              
              <div>
                <div className="flex items-center gap-1 justify-between">
                  <label className="block text-xs font-bold text-slate-700">Férias Vencidas Anteriores (Qtd de Períodos completos não gozados)</label>
                </div>
                <input type="number" min="0" value={feriasVencidas} onChange={e=>setFeriasVencidas(e.target.value)} className="w-full p-2 mt-1 rounded-lg border border-slate-300 text-sm font-mono shadow-sm"/>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-700 mb-1">Saldo Histórico Recolhido CEF para a Multa Rescisória do FGTS (R$)</label>
                <CurrencyInput value={fgts} onChange={setFgts} className="w-full p-2.5 rounded-lg border border-brand-300 bg-brand-50 text-sm font-bold text-brand-900 shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition" />
              </div>
            </div>
          </div>
        </div>

        {/* CÁLCULOS AUDITÁVEIS TRCT + GUIAS/EFD + INFO EXTRAS CEF */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* =========== PARTE A: O COMPROVANTE/HOLERITE (TRCT CORPORATIVO PAGÁVEL) =========== */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b-2 border-slate-700">
              <span className="font-bold text-white uppercase tracking-wider text-sm">Resumo Corporativo (Liquido a Repassar Func.)</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">Espelho TRCT Simulado</span>
            </div>
            <div className="p-6">
              
              {/* BLOCO: PROVENTOS E DIREITOS CORPORATIVOS */}
              <div className="mb-5">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5 mb-2">I. Proventos</div>
                <div className="space-y-1.5 font-mono text-sm">
                  <div className="flex justify-between items-center text-slate-700 p-1.5 rounded hover:bg-slate-50">
                    <span>Saldo Salário - Comp. Final ({diasMes} dias)</span>
                    <span className="font-bold">{formatCurrency(res.saldoSalario)}</span>
                  </div>
                  {res.avisoPrevio > 0 && <div className="flex justify-between items-center text-slate-700 p-1.5 rounded hover:bg-slate-50">
                    <span>Aviso Prévio Indenizado Projeta {res.diasAviso} dias</span>
                    <span className="font-bold">{formatCurrency(res.avisoPrevio)}</span>
                  </div>}
                  <div className="flex justify-between items-center text-slate-700 p-1.5 rounded hover:bg-slate-50">
                    <span>13º Salário Rescisório Exclusivo (C/ A.P)</span>
                    <span className="font-bold">{formatCurrency(res.decimoTerceiroTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 p-1.5 rounded hover:bg-slate-50">
                    <span>Todas Férias Não Gozadas (C/ terço CF/88 e API)</span>
                    <span className="font-bold">{formatCurrency(res.totalFeriasLiquido)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 border-t pt-1 text-[11px] font-sans font-bold text-emerald-700/80">
                    <span>TOTAL DOS PROVENTOS:</span>
                    <span>{formatCurrency(res.totalProventosTrct)}</span>
                  </div>
                </div>
              </div>

              {/* BLOCO: DESCONTOS RFF E INSS */}
              <div className="mb-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5 mb-2">II. Descontos e Denduções Fixas Teto e Base Limpa</div>
                <div className="space-y-1.5 font-mono text-sm">
                  <div className="flex justify-between items-center text-rose-600/90 p-1.5 rounded hover:bg-rose-50/50">
                    <span>Tributação Inss e IRRF Mensal Retidos -</span>
                    <span className="font-bold"> {formatCurrency(res.bases.valInssMensal + res.bases.valIrrfMensal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-rose-600/90 p-1.5 rounded hover:bg-rose-50/50">
                    <span>Tributação INSS e IRRF (13º e Tributações Especiais) -</span>
                    <span className="font-bold"> {formatCurrency(res.bases.valInss13 + res.bases.valIrrf13)}</span>
                  </div>
                </div>
              </div>

              {/* RODAPÉ MASTER E BOLETA LIQUIDA FINAL A CAIR NA C/C FUNC. */}
              <div className="bg-slate-50 border border-slate-200 mt-6 p-4 rounded-xl flex items-center justify-between shadow-sm">
                 <div className="flex flex-col">
                  <span className="text-slate-800 text-[10px] uppercase font-bold tracking-widest mb-0.5 opacity-60">Resumo Fechamento Conta</span>
                  <span className="text-slate-900 font-extrabold text-sm sm:text-base leading-tight uppercase">Trct Limpo do Funcionário (Recebedor na rescisão eSocial):</span>
                 </div>
                 <span className="font-black text-brand-600 text-3xl font-mono">{formatCurrency(res.liquidoRescisorioTrct)}</span>
              </div>
            </div>
          </div>
          

          {/* =========== PARTE B:  VISÃO FISCAL (ESOCIAL), TABELA S-1299/IRPF E GERENCIAL DA CAIXA =========== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* BOX: DP Auditoria / Tabela Reinf-Esocial  */}
            <div className="glass-panel p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3 bg-white">
              <h4 className="font-bold text-[11px] text-slate-500 flex items-center gap-1.5 border-b border-slate-100 pb-2 uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4"/> E-Social & Tabelas Auditoria do Evento (MENSAL E ESPECIAL 13o)
              </h4>
              <div className="text-[10px] font-mono grid grid-cols-[1fr,80px] gap-y-2 mt-1">
                 {/* LINHA B1 (Inss) */}
                 <div className="text-slate-600 pr-1 truncate border-b border-slate-50/20" title={`Rendimento Sujeito Competencia: ${formatCurrency(res.bases.inssMensal)}`}>  Base Comp Salário-Tributavel INSS (Normal API Zero)<br /><span className="text-[8px] text-slate-400 mt-0 block">(Prog INSS 1 - IR Prog Sobre Sobra ${formatCurrency(res.bases.irpfMensal)}) </span> </div>
                 <div className="text-right text-amber-700/80 font-bold border-b border-slate-50/20">{formatCurrency(res.bases.inssMensal)} <br/><span className="text-slate-300">= {formatCurrency(res.bases.valInssMensal)}IN / {formatCurrency(res.bases.valIrrfMensal)} IR </span> </div>
                 
                 {/* LINHA B2 (EXCLUSIV 13º Inss IR ) */}
                 <div className="text-slate-600 pr-1 truncate" title={`O décimo em competência exclus e isolado base IR RFB`} > Tributo Comp Extemporan.( Base/Ganha do Dec Teto isolado 13) </div>
                 <div className="text-right font-bold text-amber-700/80">{formatCurrency(res.bases.inss13)} <br/>  <span className="text-slate-300 font-light">=  In: {formatCurrency(res.bases.valInss13)}|  Ir: {formatCurrency(res.bases.valIrrf13)} </span>  </div>
              </div>
            </div>

            {/* BOX: TOTAIS EXCLUSIVO EMPREGADOR OBRIGAÇAO PAGADORA EXTRA FUNCIO(CEF FGTS etc GRRF e Pix/GFip). A SAUDOSA PARTE QUE TAVA DANDO NO PÉ DE OUVIDO MUDOU AGORA E CÁ É A MORAL DOS CONTADOR  */}
            <div className="glass-panel p-5 rounded-2xl shadow-sm border border-emerald-200 space-y-3 bg-emerald-50">
               <div className="font-bold text-[11px] text-emerald-800 flex justify-between items-center gap-1.5 border-b border-emerald-200/50 pb-2 uppercase tracking-wide">
                 GRRF(EMPRESA) e  SALDO FINAL C.E.F.(Para Funcionário)  
                 <span className="inline-flex  text-[8px] justify-center items-center h-4 w-4 bg-emerald-100 rounded-full  font-black p-2 font-mono">?!</span>
               </div>
               
               <div className="space-y-3 font-mono mt-1 text-[11px]">
                  
                  <div className="flex flex-col  border-l-[2px] pl-2 border-emerald-300/40 bg-emerald-500/[.03]  pb-2 ">
                     <div className="text-[10px] uppercase text-emerald-800 tracking-wider">A) Total OBRIGAÇÃO GERADORA Empresa (Darf M-Multa GRRF+FGTS final) :</div>
                     <span className="font-extrabold text-sm  text-slate-800">  {formatCurrency(res.guiaGRRF)}   </span> 
                     <span className="font-sans mt-0 leading-[90%] text-emerald-800/80  opacity-60 block mt-0 text-[10px]"> Guia de pagamento empresa para lib. chave a pagar ao gevern</span>
                  </div>

                  <div className="flex flex-col  border-l-[2px] pl-2 border-brand-600/40 pb-2 ">
                     <div className="text-[10px] font-sans font-black  uppercase text-brand-700 tracking-wider " > B) Movimento Caixa do Ex-Colab Lib Saque Liberavel. (+ Fgts Guia  {res.percentualMulta} % : <span className="font-medium inline-block pr-1 ml-0 p-1 opacity-70 ml-2 rounded font-sans leading-none">{formatCurrency(res.saldoFgtsAcumuladoBaseDaMulta)} )</span> </div> 
                     <span className="text-[17px] font-extrabold text-brand-900 bg-brand-50 w-full pl-0 pt-1 pb-1 inline-flex mt-0 "> = {formatCurrency(res.saldoLiberadoCaixaFgts)} <span className="pt-[6px] block opacity-40 ml-1 font-bold pl-[2px] text-emerald-950   ">/ saque . </span></span> 
                  </div>

               </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}