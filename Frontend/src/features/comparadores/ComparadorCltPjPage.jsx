import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateCltVsPj } from '../../domain/taxCalculators';
import { CurrencyInput } from '../../components/common/CurrencyInput';
import { formatCurrency, parseNumberInput } from '../../utils/formatters';
import { Scale, CheckCircle2, ArrowRight, Printer, Briefcase, Building } from 'lucide-react';

export function ComparadorCltPjPage() {
  const [salarioClt, setSalarioClt] = useState(6000);
  const [valorPj, setValorPj] = useState(10000);
  const [regime, setRegime] = useState('simples');

  const result = useMemo(() => {
    return calculateCltVsPj({
      salarioClt: parseNumberInput(salarioClt),
      valorPj: parseNumberInput(valorPj),
      regimeEmpresa: regime
    });
  }, [salarioClt, valorPj, regime]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Comparador CLT vs PJ (Custo Corporativo)' }]} />
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
            Planejamento de Contratação & Folha
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Comparativo Corporativo: CLT vs PJ</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Calcule com exatidão o custo total para a empresa e o valor líquido final percebido pelo profissional.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="no-print bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition shadow-xs"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Imprimir Relatório</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="no-print lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Valores Propostos
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Regime Tributário da Empresa Contratante</label>
            <select
              value={regime}
              onChange={(e) => setRegime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
            >
              <option value="simples">Simples Nacional (Sem INSS Patronal de 20%)</option>
              <option value="presumido">Lucro Presumido / Real (Encargos Patronais de 28,3%)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Salário CLT Bruto Mensal (R$)</label>
            <CurrencyInput value={salarioClt} onChange={setSalarioClt}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Valor da Nota Fiscal PJ (R$)</label>
            <CurrencyInput value={valorPj} onChange={setValorPj}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>
        </div>

        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Comparativo Lado a Lado
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CARD CLT */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Briefcase className="w-4 h-4"/></div>
                  <span className="text-sm font-bold text-slate-900 uppercase font-mono">Modelo CLT</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-500">Custo Total para a Empresa:</div>
                  <div className="text-xl font-bold font-mono text-slate-900">{formatCurrency(result.custoEmpresaClt)}</div>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100">
                <div className="text-xs text-slate-500">Líquido na Mão do Empregado:</div>
                <div className="text-xl font-bold font-mono text-blue-600">{formatCurrency(result.liquidoClt)}</div>
              </div>
            </div>

            {/* CARD PJ */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><Building className="w-4 h-4"/></div>
                  <span className="text-sm font-bold text-slate-900 uppercase font-mono">Modelo PJ</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-500">Custo Total para a Empresa:</div>
                  <div className="text-xl font-bold font-mono text-slate-900">{formatCurrency(result.custoEmpresaPj)}</div>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100">
                <div className="text-xs text-slate-500">Líquido na Mão do PJ:</div>
                <div className="text-xl font-bold font-mono text-emerald-600">{formatCurrency(result.liquidoPj)}</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-brand-50 border border-brand-200 rounded-xl text-sm text-brand-900 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0" />
            <span>
              <b>Ponto de Equilíbrio Corporativo:</b> Para que a empresa tenha o mesmo custo de um CLT ganhando {formatCurrency(salarioClt)}, a contratação PJ deveria ser firmada no valor de <b>{formatCurrency(result.pjEquivalente)}</b>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}