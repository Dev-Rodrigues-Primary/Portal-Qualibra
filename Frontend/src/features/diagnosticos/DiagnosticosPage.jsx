import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { 
  formatCurrency, 
  formatPercent, 
  parseNumberInput 
} from '../../utils/formatters';
import { 
  calcularAliquotaSimples, 
  TABELA_ANEXO_III, 
  TABELA_ANEXO_V 
} from '../../domain/taxCalculators';
import { 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Printer, 
  Building2, 
  DollarSign, 
  Scale, 
  ArrowRight,
  Info
} from 'lucide-react';

export function DiagnosticosPage() {
  const [faturamento, setFaturamento] = useState(1800000);
  const [folha, setFolha] = useState(360000);
  const [custosOperacionais, setCustosOperacionais] = useState(900000);
  const [regime, setRegime] = useState('simples_v');
  const [contabilidadeRegular, setContabilidadeRegular] = useState(true);

  const fatNum = parseNumberInput(faturamento);
  const folhaNum = parseNumberInput(folha);
  const custosNum = parseNumberInput(custosOperacionais);

  // 1. Apuração Oficial do Fator R
  const fatorR = fatNum > 0 ? (folhaNum / fatNum) * 100 : 0;
  const enquadraAnexo3 = fatorR >= 28.0;

  // 2. Cálculo do GAP (Falta na Folha para bater 28%)
  const folhaAlvoAnual = fatNum * 0.28;
  const gapAnual = Math.max(0, folhaAlvoAnual - folhaNum);
  const gapMensalProlabore = gapAnual / 12;

  // 3. Simulação Tributária Oficial (Anexo V vs Anexo III pela LC 123/2006)
  const { aliqEfetiva: aliqAnexo5 } = calcularAliquotaSimples(fatNum, TABELA_ANEXO_V);
  const { aliqEfetiva: aliqAnexo3 } = calcularAliquotaSimples(fatNum, TABELA_ANEXO_III);

  const dasAnexo5Anual = fatNum * aliqAnexo5;
  const dasAnexo3Anual = fatNum * aliqAnexo3;
  const economiaTributariaAnual = Math.max(0, dasAnexo5Anual - dasAnexo3Anual);
  const economiaTributariaMensal = economiaTributariaAnual / 12;

  // 4. Lucro Líquido Real Distribuível (Receita - Custos - Folha - Tributos)
  const impostoApuradoAno = regime === 'simples_v' ? (enquadraAnexo3 ? dasAnexo3Anual : dasAnexo5Anual) : (fatNum * 0.16);
  const lucroRealDistribuivel = Math.max(0, fatNum - custosNum - folhaNum - impostoApuradoAno);

  return (
    <div className="space-y-6 pb-12 animate-fade-in-up">
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Diagnóstico Estratégico Corporativo' }]} />
      </div>

      <div className="glass-panel p-6 lg:p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full uppercase flex items-center gap-1.5 w-fit">
            <Building2 className="w-3.5 h-3.5" /> Auditoria Tributária & Compliance Societário
          </span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Diagnóstico de Fator R & Governança Fiscal
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl">
            Auditoria analítica com explicitação dos valores em reais, identificação do GAP de folha para atingir 28% e mensuração da economia líquida de impostos.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="no-print bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition shadow-xs flex-shrink-0"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Imprimir Diagnóstico</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* ================= LADO ESQUERDO: PARÂMETROS AUDITÁVEIS ================= */}
        <div className="no-print xl:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 bg-white">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-600" /> Parâmetros de Entrada da Auditoria
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Enquadramento Tributário / CNAE
                </label>
                <select
                  value={regime}
                  onChange={(e) => setRegime(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-800 bg-white"
                >
                  <option value="simples_v">Simples Nacional - Anexo V (Sujeito a Fator R)</option>
                  <option value="simples_iii">Simples Nacional - Anexo III (Serviços sem trava)</option>
                  <option value="presumido">Lucro Presumido</option>
                  <option value="real">Lucro Real</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Faturamento Bruto Acumulado 12 Meses - RBT12 (R$)
                </label>
                <CurrencyInput value={faturamento} onChange={setFaturamento}
                  className="w-full p-3 rounded-lg border border-brand-300 bg-brand-50/20 text-brand-950 font-bold text-base shadow-sm focus:border-brand-500 transition font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Folha Salarial + Pró-Labore Acumulada 12 Meses - FS12 (R$)
                </label>
                <CurrencyInput value={folha} onChange={setFolha}
                  className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold text-base shadow-sm focus:border-brand-500 transition font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Custos Operacionais Anuais (Despesas + Insumos) (R$)
                </label>
                <CurrencyInput value={custosOperacionais} onChange={setCustosOperacionais}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-mono shadow-sm"
                />
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition shadow-xs">
                  <input
                    type="checkbox"
                    checked={contabilidadeRegular}
                    onChange={(e) => setContabilidadeRegular(e.target.checked)}
                    className="w-5 h-5 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Escrituração Contábil Regular (Livro Diário)</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">
                      Permite isenção total de IR sobre o lucro distribuído acima dos limites de presunção.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* ================= LADO DIREITO: FICHA ANALÍTICA AUDITÁVEL ================= */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* PAINEL 1: VALORES ABSOLUTOS (R$) AUDITADOS */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 shadow-sm bg-white">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-brand-600" />
              1. Bases Absolutas da Operação (Auditadas)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 font-mono">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-sans font-bold block">Faturamento (RBT12)</span>
                <span className="text-lg font-black text-slate-900 block mt-1">{formatCurrency(fatNum)}</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-sans font-bold block">Folha Atual (FS12)</span>
                <span className="text-lg font-black text-slate-900 block mt-1">{formatCurrency(folhaNum)}</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-sans font-bold block">Folha Meta (28%)</span>
                <span className="text-lg font-black text-brand-700 block mt-1">{formatCurrency(folhaAlvoAnual)}</span>
              </div>
            </div>

            {/* STATUS DO ENQUADRAMENTO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase font-sans block">Fator R Apurado</span>
                  <span className={`text-3xl font-black font-mono mt-1 block ${enquadraAnexo3 ? 'text-emerald-600' : 'text-amber-500'}`}>
                    {formatPercent(fatorR)}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md font-mono">
                  Meta: 28,00%
                </span>
              </div>

              <div className={`p-4 rounded-xl border flex flex-col justify-center ${enquadraAnexo3 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
                <div className="flex items-center gap-2">
                  {enquadraAnexo3 ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertTriangle className="w-5 h-5 text-amber-600" />}
                  <span className="font-extrabold text-sm uppercase">
                    {enquadraAnexo3 ? 'Enquadrado no Anexo III' : 'Retido no Anexo V (Oneroso)'}
                  </span>
                </div>
                <span className="text-xs mt-1 opacity-80 font-mono">
                  Alíquota DAS: <b>{formatPercent(enquadraAnexo3 ? aliqAnexo3 * 100 : aliqAnexo5 * 100)}</b>
                </span>
              </div>
            </div>
          </div>

          {/* PAINEL 2: INDICADOR DE GAP E PLANO DE AÇÃO EM REAIS (R$) */}
          {regime === 'simples_v' && !enquadraAnexo3 && (
            <div className="glass-panel p-6 rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200/60 pb-3">
                <TrendingUp className="w-5 h-5 text-amber-700" />
                <h3 className="font-bold text-amber-950 text-sm uppercase tracking-wider">
                  2. GAP para Migração ao Anexo III (O que precisa ser ajustado)
                </h3>
              </div>

              <p className="text-xs text-amber-900 leading-relaxed">
                A folha de pagamento atual representa <b>{formatPercent(fatorR)}</b> do faturamento, gerando tributação pela alíquota inicial majorada de 15,5%. Para desbloquear o Anexo III (alíquotas a partir de 6%), execute o seguinte ajuste:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-2xs">
                  <span className="text-slate-500 uppercase font-sans font-bold text-[10px] block mb-1">
                    Falta na Folha Anual (GAP Acumulado):
                  </span>
                  <span className="text-xl font-black text-rose-600 block">{formatCurrency(gapAnual)}</span>
                  <span className="text-[10px] text-slate-400 font-sans mt-0.5 block">Diferença para completar 28% no FS12</span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-2xs">
                  <span className="text-slate-500 uppercase font-sans font-bold text-[10px] block mb-1">
                    Ajuste Sugerido no Pró-Labore / Mês:
                  </span>
                  <span className="text-xl font-black text-amber-700 block">+{formatCurrency(gapMensalProlabore)} / mês</span>
                  <span className="text-[10px] text-slate-400 font-sans mt-0.5 block">Incremento mensal necessário na retirada</span>
                </div>
              </div>

              {/* ECONOMIA TRIBUTÁRIA POTENCIAL */}
              <div className="p-4 bg-white border border-emerald-200 rounded-xl space-y-2 mt-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-600">DAS Anual no Anexo V:</span>
                  <span className="font-bold text-rose-600">{formatCurrency(dasAnexo5Anual)}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-600">DAS Anual no Anexo III:</span>
                  <span className="font-bold text-emerald-600">{formatCurrency(dasAnexo3Anual)}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 font-mono text-sm font-bold text-emerald-800">
                  <span>Economia Bruta Anual com o Ajuste:</span>
                  <span className="text-base font-black">{formatCurrency(economiaTributariaAnual)}</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-sans flex items-center gap-1.5 pt-1">
                  <span>Equivale a uma redução tributária de <b>{formatCurrency(economiaTributariaMensal)}</b> por mês na guia DAS.</span>
                </div>
              </div>
            </div>
          )}

          {/* PAINEL 3: GOVERNANÇA DO LUCRO DISTRIBUÍVEL */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 shadow-sm bg-white space-y-3">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-purple-600" />
              3. Auditoria do Lucro Líquido Distribuível
            </h3>

            <div className="flex items-center justify-between p-4 bg-purple-50/50 border border-purple-200 rounded-xl font-mono">
              <div>
                <span className="text-[10px] font-bold text-purple-800 uppercase font-sans block">
                  Lucro Contábil Efetivo (Receita - Custos - Folha - Tributos)
                </span>
                <span className="text-xl font-black text-purple-950 block mt-0.5">
                  {formatCurrency(lucroRealDistribuivel)}
                </span>
              </div>
              <span className="text-xs font-bold text-purple-800 bg-white border border-purple-200 px-3 py-1.5 rounded-lg">
                Margem Líquida: {formatPercent(fatNum > 0 ? (lucroRealDistribuivel / fatNum) * 100 : 0)}
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2 font-mono">
              <Info className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
              <span>
                {contabilidadeRegular
                  ? '✓ Escrituração Contábil Regular Ativa: Todo o lucro líquido de ' + formatCurrency(lucroRealDistribuivel) + ' pode ser distribuído aos sócios com 100% de isenção de IRPF e INSS (Art. 10 da Lei nº 9.249/95).'
                  : '⚠️ Sem Contabilidade Regular: A distribuição isenta fica limitada ao percentual de presunção (Art. 15 da Lei 9.249/95 deduzido dos tributos). O saldo excedente deve ser tributado na tabela progressiva do IRPF.'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}