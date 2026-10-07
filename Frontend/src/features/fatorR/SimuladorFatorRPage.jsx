import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateFatorRCompleto } from '../../domain/taxCalculators';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
import { PieChart, CheckCircle2, AlertCircle, TrendingUp, DollarSign, Calculator, Info } from 'lucide-react';

export function SimuladorFatorRPage() {
  const [rbt12, setRbt12] = useState(1200000);
  const [folha12, setFolha12] = useState(300000);
  const [receitaMes, setReceitaMes] = useState(100000);
  const [socioNoTeto, setSocioNoTeto] = useState(false);

  const res = useMemo(() => calculateFatorRCompleto({
    rbt12: parseNumberInput(rbt12), folha12: parseNumberInput(folha12), receitaMes: parseNumberInput(receitaMes), socioNoTetoInss: socioNoTeto
  }), [rbt12, folha12, receitaMes, socioNoTeto]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in-up">
      <div className="no-print"><Breadcrumbs items={[{ label: 'Planejamento de Fator R (LC 123/2006)' }]} /></div>

      <div className="glass-panel p-6 lg:p-8 rounded-2xl border border-slate-200 flex justify-between items-center">
        <div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Análise Estratégica do Fator R</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl">
            Validação do enquadramento (Anexo III vs Anexo V) e cálculo marginal exato da economia líquida ajustando o Pró-Labore.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* PARÂMETROS OPERACIONAIS (Lado Esquerdo) */}
        <div className="no-print xl:col-span-4 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-5">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-brand-600"/> Dados Atuais da Empresa
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Faturamento Acumulado 12m (RBT12)</label>
                <input 
                  type="number" 
                  value={rbt12} 
                  onChange={e=>setRbt12(e.target.value)} 
                  className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold text-base shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Folha + Pró-Labore 12m (FS12)</label>
                <input 
                  type="number" 
                  value={folha12} 
                  onChange={e=>setFolha12(e.target.value)} 
                  className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold text-base shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Receita Média do Mês Atual (Projeção)</label>
                <input 
                  type="number" 
                  value={receitaMes} 
                  onChange={e=>setReceitaMes(e.target.value)} 
                  className="w-full p-3 rounded-lg border border-brand-300 bg-white text-brand-900 font-bold text-lg shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition"
                />
                <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
                  Utilizada para calcular o DAS do mês e quanto de Pró-Labore será necessário HOJE para não cair no Anexo V.
                </p>
              </div>

              <label className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition shadow-sm">
                <input type="checkbox" checked={socioNoTeto} onChange={e=>setSocioNoTeto(e.target.checked)} className="w-5 h-5 text-brand-600 rounded border-slate-400"/>
                <span className="text-xs font-bold text-slate-700">Sócio já recolhe pelo Teto do INSS em outro CNPJ</span>
              </label>
            </div>
          </div>
        </div>

        {/* AUDITORIA E RESULTADOS (Lado Direito) */}
        <div className="xl:col-span-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col justify-center items-center text-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                <PieChart className="w-6 h-6 text-slate-400" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Proporção Atingida (Fator R)</span>
              <div className={`text-5xl font-black mt-2 tracking-tighter ${res.enquadraAnexo3 ? 'text-emerald-600' : 'text-amber-500'}`}>
                {formatPercent(res.fatorR)}
              </div>
              <span className="text-xs font-bold text-slate-500 mt-2 bg-slate-50 px-3 py-1 rounded-md border border-slate-100">
                Meta de Conformidade: 28,00%
              </span>
            </div>

            <div className={`p-6 rounded-2xl border shadow-sm flex flex-col justify-center ${res.enquadraAnexo3 ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex items-center gap-3 mb-3">
                {res.enquadraAnexo3 ? <CheckCircle2 className="w-6 h-6 text-emerald-600"/> : <AlertCircle className="w-6 h-6 text-amber-600"/>}
                <span className={`text-sm font-bold uppercase tracking-wider ${res.enquadraAnexo3 ? 'text-emerald-800' : 'text-amber-800'}`}>
                  Status do Enquadramento
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">{res.anexo}</div>
              <div className="mt-3 text-sm font-medium opacity-80">
                Alíquota Efetiva Aplicada: <b className="text-lg">{formatPercent(res.enquadraAnexo3 ? res.aliqAnexo3 : res.aliqAnexo5)}</b>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-lg">
              <DollarSign className="w-6 h-6 text-emerald-600" /> Balanço Financeiro Mensal
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Box de Economia do CNPJ */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-2">
                  1. Economia no CNPJ (DAS)
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Imposto no Anexo V:</span>
                    <span>{formatCurrency(res.dasAnexo5)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Imposto no Anexo III:</span>
                    <span>{formatCurrency(res.dasAnexo3)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 font-bold text-emerald-700 mt-2">
                    <span>Redução Bruta na Guia:</span>
                    <span>+{formatCurrency(res.diferencaDasBruta)}</span>
                  </div>
                </div>
              </div>

              {/* Box de Custo Extra CPF */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-2">
                  2. Custo Marginal no CPF (Sócio)
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex justify-between text-rose-600">
                    <span>INSS Extra Retido:</span>
                    <span>-{formatCurrency(res.inssSocioIncremental)}</span>
                  </div>
                  <div className="flex justify-between text-rose-600">
                    <span>IRPF Extra Retido:</span>
                    <span>-{formatCurrency(res.irpfSocioIncremental)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-rose-50 p-2.5 rounded-lg border border-rose-100 font-bold text-rose-700 mt-2">
                    <span>Custo Total Extra no CPF:</span>
                    <span>-{formatCurrency(res.custoTotalCpfIncremental)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Linha de Resultado Final */}
            <div className="flex justify-between items-center p-5 bg-slate-900 text-white rounded-xl mt-8 shadow-md">
              <span className="font-bold text-base sm:text-lg">Economia LÍQUIDA Real da Operação:</span>
              <span className={`font-black text-2xl sm:text-3xl font-mono ${res.economiaLiquidaReal >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {formatCurrency(res.economiaLiquidaReal)}
              </span>
            </div>
          </div>

          {!res.enquadraAnexo3 && (
            <div className="p-6 border border-amber-200 bg-amber-50 rounded-2xl flex flex-col sm:flex-row items-start gap-5 shadow-sm">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-amber-200 flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <div className="w-full">
                <h4 className="font-extrabold text-amber-900 text-base">Plano de Ação Sugerido</h4>
                <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                  Para que a <b>Receita de {formatCurrency(parseNumberInput(receitaMes))}</b> seja tributada no Anexo III, o Pró-Labore deste mês precisa ser ajustado.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 font-mono text-xs">
                  <div className="bg-white p-3 rounded-xl border border-amber-100">
                    <span className="text-slate-500 block mb-1 font-sans font-semibold text-[11px] uppercase">Pró-Labore Ideal Mínimo (28%):</span>
                    <span className="font-bold text-amber-700 text-base">{formatCurrency(res.proLaboreIdeal)}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-amber-100">
                    <span className="text-slate-500 block mb-1 font-sans font-semibold text-[11px] uppercase">Aumento Necessário na Folha:</span>
                    <span className="font-bold text-rose-600 text-base">+{formatCurrency(res.faltaMesProlabore)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 flex items-start gap-2 font-mono">
            <Info className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
            <span>Memória Marginal: O custo de IRPF e INSS exibido acima é calculado subtraindo o imposto da folha ideal (Anexo III) pelo imposto da folha atual (Anexo V), respeitando a progressividade e teto do INSS.</span>
          </div>

        </div>
      </div>
    </div>
  );
}