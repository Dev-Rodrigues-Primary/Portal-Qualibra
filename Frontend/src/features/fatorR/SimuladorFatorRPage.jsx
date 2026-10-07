import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateFatorRCompleto } from '../../domain/taxCalculators';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
import { PieChart, CheckCircle2, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';

export function SimuladorFatorRPage() {
  const [rbt12, setRbt12] = useState(240000);
  const [folha12, setFolha12] = useState(60000);
  const [receitaMes, setReceitaMes] = useState(20000);
  const [socioNoTeto, setSocioNoTeto] = useState(false);

  const res = useMemo(() => calculateFatorRCompleto({
    rbt12: parseNumberInput(rbt12), folha12: parseNumberInput(folha12), receitaMes: parseNumberInput(receitaMes), socioNoTetoInss: socioNoTeto
  }), [rbt12, folha12, receitaMes, socioNoTeto]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in-up">
      <div className="no-print"><Breadcrumbs items={[{ label: 'Planejamento de Fator R (LC 123/2006)' }]} /></div>

      <div className="glass-panel p-6 lg:p-8 rounded-2xl border border-slate-200">
        <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Análise Estratégica do Fator R</h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          Empresas do Simples Nacional sujeitas ao Anexo V podem reduzir sua carga tributária inicial de 15,5% para 6% (Anexo III) se a folha de pagamento representar 28% ou mais do faturamento.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="no-print lg:col-span-4 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Informações da Empresa</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">RBT12 (Faturamento 12m)</label>
              <input type="number" value={rbt12} onChange={e=>setRbt12(e.target.value)} className="w-full p-2.5 rounded-lg glass-input text-sm font-mono"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Folha Salarial + Pró-Labore (12m)</label>
              <input type="number" value={folha12} onChange={e=>setFolha12(e.target.value)} className="w-full p-2.5 rounded-lg glass-input text-sm font-mono"/>
              <p className="text-[10px] text-slate-400 mt-1">Soma de todos os salários e pró-labore dos últimos 12 meses.</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Faturamento do Mês Atual</label>
              <input type="number" value={receitaMes} onChange={e=>setReceitaMes(e.target.value)} className="w-full p-2.5 rounded-lg glass-input text-sm font-mono"/>
            </div>
            <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-lg cursor-pointer hover:bg-slate-100 transition">
              <input type="checkbox" checked={socioNoTeto} onChange={e=>setSocioNoTeto(e.target.checked)} className="w-4 h-4 text-brand-600 rounded border-slate-300"/>
              <span className="text-xs font-medium text-slate-700">Sócio já recolhe Teto do INSS em outro CNPJ</span>
            </label>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                <PieChart className="w-6 h-6 text-slate-400" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Proporção Atingida</span>
              <div className={`text-5xl font-black mt-2 tracking-tighter ${res.enquadraAnexo3 ? 'text-emerald-600' : 'text-amber-500'}`}>
                {formatPercent(res.fatorR)}
              </div>
              <span className="text-xs font-medium text-slate-500 mt-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                Meta: 28,00%
              </span>
            </div>

            <div className={`p-6 rounded-2xl border flex flex-col justify-center ${res.enquadraAnexo3 ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex items-center gap-3 mb-3">
                {res.enquadraAnexo3 ? <CheckCircle2 className="w-6 h-6 text-emerald-600"/> : <AlertCircle className="w-6 h-6 text-amber-600"/>}
                <span className={`text-sm font-bold uppercase ${res.enquadraAnexo3 ? 'text-emerald-800' : 'text-amber-800'}`}>
                  Status do Enquadramento
                </span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">{res.anexo}</div>
              <div className="mt-3 text-sm font-medium opacity-80">
                Alíquota Efetiva Aplicada: <b>{formatPercent(res.enquadraAnexo3 ? res.aliqAnexo3 : res.aliqAnexo5)}</b>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" /> Retorno Financeiro Mensal (Economia)
            </h3>
            
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Redução Bruta na Guia DAS:</span>
                <span className="text-emerald-600 font-bold">+{formatCurrency(res.diferencaDasBruta)}</span>
              </div>
              <div className="flex justify-between px-3 py-1">
                <span className="text-slate-500 text-xs">Custo Extra INSS Pró-Labore Sócio:</span>
                <span className="text-rose-500 text-xs">-{formatCurrency(res.inssSocioIncremental)}</span>
              </div>
              <div className="flex justify-between px-3 py-1">
                <span className="text-slate-500 text-xs">Custo Extra IRPF Pró-Labore Sócio:</span>
                <span className="text-rose-500 text-xs">-{formatCurrency(res.irpfSocioIncremental)}</span>
              </div>
              <div className="flex justify-between p-4 bg-slate-900 text-white rounded-xl mt-4">
                <span className="font-bold">Economia LÍQUIDA Real no Bolso:</span>
                <span className={`font-bold text-lg ${res.economiaLiquidaReal >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {formatCurrency(res.economiaLiquidaReal)}
                </span>
              </div>
            </div>
          </div>

          {!res.enquadraAnexo3 && (
            <div className="p-5 border border-amber-200 bg-amber-50/50 rounded-2xl flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-amber-900 text-sm">Ação Recomendada</h4>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  Para atingir os 28% no acumulado, a empresa precisa elevar sua folha/pró-labore em <b>{formatCurrency(res.faltaAno)}</b> no ano (aumento médio recomendado de <b>{formatCurrency(res.faltaMesProlabore)}/mês</b>).
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}