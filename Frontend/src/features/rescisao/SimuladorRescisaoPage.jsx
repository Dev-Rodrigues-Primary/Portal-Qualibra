import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateRescisaoCLTCompleto } from '../../domain/taxCalculators';
import { CurrencyInput } from '../../components/common/CurrencyInput';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
import { 
  Calculator, 
  Printer, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Sparkles, 
  Layers, 
  Landmark, 
  Users, 
  Briefcase, 
  AlertTriangle, 
  ArrowRight,
  Info
} from 'lucide-react';

export function SimuladorRescisaoPage() {
  const [salario, setSalario] = useState(4500);
  const [diasMes, setDiasMes] = useState(30);
  const [motivo, setMotivo] = useState('sem_justa_causa');
  const [fgts, setFgts] = useState(12000);
  const [anosCasa, setAnosCasa] = useState(2);
  const [meses13, setMeses13] = useState(8);
  const [mesesFerias, setMesesFerias] = useState(8);
  const [feriasVencidas, setFeriasVencidas] = useState(0);

  const res = useMemo(() => calculateRescisaoCLTCompleto({
    salarioBase: parseNumberInput(salario) || 0,
    diasTrabalhadosMes: parseInt(diasMes, 10) || 0,
    motivo,
    meses13: parseInt(meses13, 10) || 0,
    feriasVencidasPeriodos: parseInt(feriasVencidas, 10) || 0,
    mesesFeriasProporcionais: parseInt(mesesFerias, 10) || 0,
    anosCompletosCasa: parseInt(anosCasa, 10) || 0,
    saldoFgts: parseNumberInput(fgts) || 0
  }), [salario, diasMes, motivo, meses13, feriasVencidas, mesesFerias, anosCasa, fgts]);

  const temDireitoFgts = motivo === 'sem_justa_causa' || motivo === 'acordo';

  return (
    <div className="space-y-6 pb-16 animate-fade-in-up">
      
      {/* BREADCRUMBS */}
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Departamento Pessoal' }, { label: 'Rescisão Contratual CLT (eSocial / TRCT)' }]} />
      </div>

      {/* HEADER EXECUTIVO PREMIUM */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 lg:p-8 text-white shadow-xl border border-slate-700/60">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Padrão Oficial eSocial & DCTFWeb
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                <ShieldCheck className="w-3 h-3" /> Lei 12.506/11 & Lei 13.467/17
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Cálculo Rescisório de DP (Espelho TRCT)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Simulação auditável com segregação de bases tributárias (Competência Mensal vs. 13º Salário Exclusivo), projeção de aviso prévio proporcional e apuração do FGTS Digital.
            </p>
          </div>

          <div className="flex items-center gap-3 no-print w-full sm:w-auto">
            <button 
              onClick={() => window.print()} 
              className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-xs rounded-xl backdrop-blur-md border border-white/20 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-200" />
              <span>Imprimir TRCT</span>
            </button>
          </div>
        </div>
      </div>

      {/* GRID DE TRABALHO: SETUP DP vs TRCT */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* COLUNA ESQUERDA: PARÂMETROS DO CONTRATO */}
        <div className="no-print xl:col-span-5 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md p-6 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-600" />
                Setup Rescisório do Colaborador
              </h3>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                Dados eSocial
              </span>
            </div>

            <div className="space-y-4">
              
              {/* SALÁRIO BASE */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  Salário Base para Fins Rescisórios (R$)
                </label>
                <CurrencyInput 
                  value={salario} 
                  onChange={setSalario} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-black text-slate-900 text-base shadow-inner focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              {/* MOTIVO DO DESLIGAMENTO */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                  Motivo / Modalidade do Desligamento
                </label>
                <select 
                  value={motivo} 
                  onChange={e => setMotivo(e.target.value)} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 text-xs shadow-inner focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                >
                  <option value="sem_justa_causa">Desligamento Sem Justa Causa (Iniciativa do Empregador)</option>
                  <option value="acordo">Demissão por Acordo Consensual (Art. 484-A da CLT)</option>
                  <option value="pedido">Pedido de Demissão (Iniciativa do Empregado)</option>
                  <option value="justa_causa">Desligamento Com Justa Causa Legal (Art. 482 CLT)</option>
                </select>
              </div>

              {/* GRID DE PARÂMETROS TEMPORAIS (2x2) */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                    Dias Trabalhados (Mês)
                  </label>
                  <input 
                    type="number" 
                    min="0" 
                    max="31" 
                    value={diasMes} 
                    onChange={e => setDiasMes(e.target.value)} 
                    className="w-full p-2 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white text-xs text-center shadow-inner"
                  />
                  <span className="text-[9px] text-slate-400 mt-0.5 block text-center">Saldo de Salário</span>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                    Anos de Casa
                  </label>
                  <input 
                    type="number" 
                    min="0" 
                    value={anosCasa} 
                    onChange={e => setAnosCasa(e.target.value)} 
                    className="w-full p-2 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white text-xs text-center shadow-inner"
                  />
                  <span className="text-[9px] text-slate-400 mt-0.5 block text-center">Lei 12.506 (+3d/ano)</span>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                    Avos de 13º Salário
                  </label>
                  <input 
                    type="number" 
                    min="0" 
                    max="12" 
                    value={meses13} 
                    onChange={e => setMeses13(e.target.value)} 
                    className="w-full p-2 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white text-xs text-center shadow-inner"
                  />
                  <span className="text-[9px] text-slate-400 mt-0.5 block text-center">Ano corrente (0 a 12)</span>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                    Avos de Férias Prop.
                  </label>
                  <input 
                    type="number" 
                    min="0" 
                    max="12" 
                    value={mesesFerias} 
                    onChange={e => setMesesFerias(e.target.value)} 
                    className="w-full p-2 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white text-xs text-center shadow-inner"
                  />
                  <span className="text-[9px] text-slate-400 mt-0.5 block text-center">Período aquisitivo</span>
                </div>
              </div>

              {/* FÉRIAS VENCIDAS */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                  Férias Vencidas Anteriores (Qtd. de Períodos Completos)
                </label>
                <input 
                  type="number" 
                  min="0" 
                  value={feriasVencidas} 
                  onChange={e => setFeriasVencidas(e.target.value)} 
                  className="w-full p-2 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white text-xs shadow-inner"
                />
                <span className="text-[9.5px] text-slate-400 mt-0.5 block">Períodos aquisitivos vencidos não gozados (acresce 1/3 CF/88)</span>
              </div>

              {/* SALDO DO FGTS NA CAIXA */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-200/80">
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-emerald-950 mb-1 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-emerald-600" />
                  Saldo Depositado na Caixa (Fins Rescisórios)
                </label>
                <CurrencyInput 
                  value={fgts} 
                  onChange={setFgts} 
                  className="w-full p-2.5 rounded-xl border border-emerald-300 bg-white font-black text-emerald-900 text-base shadow-inner focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
                <p className="text-[10px] text-emerald-800/80 mt-1 leading-relaxed">
                  Saldo da conta vinculada informado no extrato rescisório da Caixa para base de cálculo da multa de 40% ou 20%.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: ESPELHO TRCT & AUDITORIA FISCAL */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* CARD MASTER: ESPELHO DO TRCT CORPORATIVO */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            
            {/* TOPO DO TRCT */}
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <h3 className="font-black text-xs sm:text-sm uppercase tracking-wider">
                  Demonstrativo de Verbas Rescisórias (TRCT)
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded border border-slate-700">
                Espelho Simulado
              </span>
            </div>

            <div className="p-6 space-y-5">
              
              {/* I. PROVENTOS */}
              <div className="space-y-2">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5 flex justify-between">
                  <span>I. Proventos & Direitos Trabalhistas</span>
                  <span className="font-mono text-emerald-700">Créditos</span>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-slate-50 transition">
                    <span className="text-slate-700">Saldo de Salário ({diasMes} dias trabalhados)</span>
                    <span className="font-bold text-slate-900">{formatCurrency(res.saldoSalario)}</span>
                  </div>

                  {res.avisoPrevio > 0 && (
                    <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-slate-50 transition">
                      <span className="text-slate-700">
                        Aviso Prévio Indenizado ({res.diasAviso} dias pela Lei 12.506/11)
                      </span>
                      <span className="font-bold text-slate-900">{formatCurrency(res.avisoPrevio)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-slate-50 transition">
                    <span className="text-slate-700">13º Salário Rescisório Proporcional (c/ projeção de aviso)</span>
                    <span className="font-bold text-slate-900">{formatCurrency(res.decimoTerceiroTotal)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-slate-50 transition">
                    <span className="text-slate-700">
                      Férias Indenizadas + 1/3 Constitucional (Vencidas + Proporcionais)
                    </span>
                    <span className="font-bold text-slate-900">{formatCurrency(res.totalFeriasLiquido)}</span>
                  </div>

                  <div className="flex justify-between items-center bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200 font-bold text-emerald-900 mt-2">
                    <span className="text-xs uppercase tracking-wider font-sans">Total Bruto dos Proventos:</span>
                    <span className="text-sm font-black">{formatCurrency(res.totalProventosTrct)}</span>
                  </div>
                </div>
              </div>

              {/* II. DESCONTOS E DEDUÇÕES */}
              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5 flex justify-between">
                  <span>II. Descontos & Retenções Oficiais</span>
                  <span className="font-mono text-rose-600">Deduções</span>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-rose-50/40 transition text-rose-800">
                    <span>Retenções Previdenciárias e IRRF (Competência Mensal):</span>
                    <span className="font-bold">-{formatCurrency(res.bases.valInssMensal + res.bases.valIrrfMensal)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-rose-50/40 transition text-rose-800">
                    <span>Retenções de INSS e IRRF (Tributação Exclusiva 13º Salário):</span>
                    <span className="font-bold">-{formatCurrency(res.bases.valInss13 + res.bases.valIrrf13)}</span>
                  </div>

                  <div className="flex justify-between items-center bg-rose-50/60 p-2.5 rounded-xl border border-rose-200 font-bold text-rose-900 mt-2">
                    <span className="text-xs uppercase tracking-wider font-sans">Total das Deduções Legais:</span>
                    <span className="text-sm font-black">-{formatCurrency(res.totalDescontos)}</span>
                  </div>
                </div>
              </div>

              {/* BANNER RESULTADO FINAL: LÍQUIDO RESCISÓRIO */}
              <div className="p-5 lg:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl shadow-lg border border-slate-700/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-0.5">
                    Valor Líquido a Repassar em Conta
                  </span>
                  <span className="font-black text-base sm:text-lg tracking-tight">
                    Líquido Rescisório do Colaborador (TRCT):
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Depósito em conta corrente referente a verbas salariais e rescisórias apuradas.
                  </p>
                </div>

                <div className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-emerald-400 self-start sm:self-auto bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
                  {formatCurrency(res.liquidoRescisorioTrct)}
                </div>
              </div>

            </div>
          </div>

          {/* PAINEL TÉCNICO INFERIOR: ESOCIAL + FGTS DIGITAL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* BOX 1: ESOCIAL & BASES TRIBUTÁRIAS */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  Bases de Tributação (eSocial)
                </span>
                <span className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                  S-2299
                </span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                {/* Mensal */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-[10px] font-sans font-bold text-slate-600 uppercase">
                    1. Competência Mensal (Saldo de Salário)
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Base INSS / IRRF:</span>
                    <span className="font-bold">{formatCurrency(res.bases.inssMensal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>INSS Retido / IRPF Retido:</span>
                    <span className="font-semibold text-rose-700">
                      {formatCurrency(res.bases.valInssMensal)} / {formatCurrency(res.bases.valIrrfMensal)}
                    </span>
                  </div>
                </div>

                {/* 13º Salário */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-[10px] font-sans font-bold text-slate-600 uppercase">
                    2. Competência Exclusiva (13º Rescisório)
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Base Tributável 13º:</span>
                    <span className="font-bold">{formatCurrency(res.bases.inss13)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>INSS 13º / IRPF 13º:</span>
                    <span className="font-semibold text-rose-700">
                      {formatCurrency(res.bases.valInss13)} / {formatCurrency(res.bases.valIrrf13)}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 font-sans leading-tight pt-1">
                  * Férias e aviso prévio indenizado em rescisão são isentos de INSS e IRRF (Súmula STJ).
                </p>
              </div>
            </div>

            {/* BOX 2: FGTS DIGITAL & CAIXA ECONÔMICA FEDERAL */}
            <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/20 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-emerald-600" />
                  FGTS Digital & Movimentação Caixa
                </span>
                <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                  Multa {res.percentualMulta}%
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                
                {/* Obrigação Empresa (Guia Digital) */}
                <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-sans font-bold text-emerald-800 uppercase block">
                    A) Obrigação da Empresa (Guia FGTS Digital):
                  </span>
                  <div className="text-base font-black text-slate-900">
                    {formatCurrency(res.guiaGRRF)}
                  </div>
                  <p className="text-[10px] text-slate-500 font-sans leading-tight">
                    Recolhimento via Pix pelo portal do FGTS Digital (FGTS da rescisão + Multa rescisória).
                  </p>
                </div>

                {/* Saque do Colaborador */}
                <div className="p-3 rounded-xl bg-slate-900 text-white shadow-sm space-y-1">
                  <span className="text-[10px] font-sans font-bold text-slate-300 uppercase block">
                    B) Saque Disponível para o Trabalhador na Caixa:
                  </span>
                  <div className="text-base font-black text-emerald-400">
                    {formatCurrency(res.saldoLiberadoCaixaFgts)}
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans leading-tight">
                    {temDireitoFgts 
                      ? `Saldo total acumulado na Caixa (${formatCurrency(res.saldoFgtsAcumuladoBaseDaMulta)}) liberado via chave.`
                      : 'Sem liberação de saque do FGTS para a modalidade selecionada.'}
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* NOTA DE AUDITORIA NORMATIVA */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-[11px] text-slate-600 flex items-start gap-3 font-mono">
            <Info className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              <b>Auditoria de Departamento Pessoal:</b> O cálculo segrega a competência mensal (saldo de salário) da competência de tributação exclusiva do 13º salário para correta parametrização nos eventos S-2299 (Desligamento) e S-1299 (Fechamento) da DCTFWeb. Férias indenizadas com terço constitucional não sofrem retenção previdenciária nem de IRPF conforme jurisprudência pacificada do TST e STJ.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default SimuladorRescisaoPage;