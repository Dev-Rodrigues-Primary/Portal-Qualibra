import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { ShieldAlert, ShieldCheck, Calculator, ArrowUpRight, Printer, AlertTriangle } from 'lucide-react';

export function AuditoriaFatorRPage() {
  const [faturamento12m, setFaturamento12m] = useState(120000);
  const [folha12m, setFolha12m] = useState(24000);

  const fat = Number(faturamento12m) || 0;
  const folha = Number(folha12m) || 0;

  const resultado = useMemo(() => {
    const fatorRRatio = fat > 0 ? (folha / fat) : 0;
    const fatorRPerc = fatorRRatio * 100;
    const enquadraAnexo3 = fatorRPerc >= 28;

    // Meta exata de 28% sobre a Receita Bruta acumulada
    const folhaNecessariaAnexo3 = fat * 0.28;
    const diferencaFolhaNecessaria = Math.max(0, folhaNecessariaAnexo3 - folha);
    const proLaboreMensalAdicionalNecessario = diferencaFolhaNecessaria / 12;

    // Estimativa de Impostos (1ª Faixa)
    const dasAnexo5 = fat * 0.155; // 15.5% inicial
    const dasAnexo3 = fat * 0.06;  // 6.0% inicial
    const economiaEstimadaAno = Math.max(0, dasAnexo5 - dasAnexo3);

    return {
      fatorRPerc,
      enquadraAnexo3,
      folhaNecessariaAnexo3,
      diferencaFolhaNecessaria,
      proLaboreMensalAdicionalNecessario,
      dasAnexo5,
      dasAnexo3,
      economiaEstimadaAno
    };
  }, [fat, folha]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in-up">
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Auditoria e Planejamento Fator R' }]} />
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full border border-brand-200">
            Simples Nacional • LC 123/2006
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Auditoria do Fator R</h2>
          <p className="text-xs text-slate-500 mt-1">Verifique se sua empresa tributa pelo Anexo III (6%) ou Anexo V (15,5%).</p>
        </div>
        <button onClick={() => window.print()} className="no-print px-4 py-2 border rounded-xl text-xs font-semibold flex items-center gap-2 bg-white hover:bg-slate-50">
          <Printer className="w-4 h-4 text-slate-500" /> Relatório Fator R
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* PARÂMETROS */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-brand-600" /> Bases dos Últimos 12 Meses
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700">Faturamento Acumulado (RBT12)</label>
              <input
                type="number"
                value={faturamento12m}
                onChange={e => setFaturamento12m(e.target.value)}
                className="w-full mt-1 p-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-900"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Soma das NFs emitidas nos últimos 12 meses.</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Folha + Pró-Labore Acumulados (12 Meses)</label>
              <input
                type="number"
                value={folha12m}
                onChange={e => setFolha12m(e.target.value)}
                className="w-full mt-1 p-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-900"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Inclui Pró-Labore, Salários, FGTS e CPP.</span>
            </div>
          </div>
        </div>

        {/* PAINEL DE RESULTADOS */}
        <div className="lg:col-span-7 space-y-4">
          {/* CARD DE STATUS */}
          <div className={`p-6 rounded-2xl border ${resultado.enquadraAnexo3 ? 'bg-emerald-50/80 border-emerald-200' : 'bg-amber-50/80 border-amber-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {resultado.enquadraAnexo3 ? (
                  <ShieldCheck className="w-8 h-8 text-emerald-600" />
                ) : (
                  <ShieldAlert className="w-8 h-8 text-amber-600" />
                )}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider block text-slate-600">Enquadramento Atual</span>
                  <h3 className={`text-xl font-black ${resultado.enquadraAnexo3 ? 'text-emerald-900' : 'text-amber-900'}`}>
                    {resultado.enquadraAnexo3 ? 'Anexo III (Alíquota Reduzida ~ 6%)' : 'Anexo V (Alíquota Majorada ~ 15,5%)'}
                  </h3>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-500 block">Fator R Atual</span>
                <span className={`text-2xl font-black ${resultado.enquadraAnexo3 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {formatPercent(resultado.fatorRPerc)}
                </span>
              </div>
            </div>

            {/* BARRA DE PROGRESSO */}
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                <span>Indicador Atual: {formatPercent(resultado.fatorRPerc)}</span>
                <span>Meta Anexo III: 28,00%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${resultado.enquadraAnexo3 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${Math.min(100, (resultado.fatorRPerc / 28) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* PLANO DE AÇÃO / METAS */}
          {!resultado.enquadraAnexo3 && (
            <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Como Migrar para o Anexo III e Reduzir Impostos
              </h4>
              <p className="text-xs text-slate-600">
                Sua empresa está pagando tributos pelo <strong>Anexo V</strong>. Para atingir os <strong>28%</strong> e enquadrar no Anexo III, você precisa ajustar o Pró-Labore:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Complemento de Folha Anual</span>
                  <span className="text-lg font-black text-slate-900">{formatCurrency(resultado.diferencaFolhaNecessaria)}</span>
                </div>

                <div className="p-3 bg-brand-50 rounded-xl border border-brand-200">
                  <span className="text-[10px] text-brand-800 font-bold uppercase block">Aumento Mensal no Pró-Labore</span>
                  <span className="text-lg font-black text-brand-900">{formatCurrency(resultado.proLaboreMensalAdicionalNecessario)}/mês</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}