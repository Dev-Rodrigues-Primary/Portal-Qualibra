import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateInssProgressivo, calcularIrrfProgressivo } from '../../domain/taxCalculators';
import { Printer, Users, Building2, Scale, ArrowRight, CheckCircle2 } from 'lucide-react';

export function SimuladorCltPjPage() {
  const [salarioClt, setSalarioClt] = useState(6000);
  const [valorNfPj, setValorNfPj] = useState(10000);
  const [regimeEmpresa, setRegimeEmpresa] = useState('presumido'); // 'simples' ou 'presumido'
  const [anexoPj, setAnexoPj] = useState('anexo3'); // 'anexo3' (6%) ou 'anexo5' (15.5%)
  const [proLaborePerc, setProLaborePerc] = useState(28); // 28% para garantir Fator R no Anexo III

  // CÁLCULOS CLT
  const cltMetrics = useMemo(() => {
    const sal = Number(salarioClt) || 0;
    
    // Encargos Patronais sobre a Folha
    const percPatronal = regimeEmpresa === 'presumido' ? 0.283 : 0.00; // 20% CPP + RAT + Terceiros
    const fgtsMensal = sal * 0.08;
    const patronalMensal = sal * percPatronal;

    // Provisões Mensais (Com Encargos)
    const prov13 = sal / 12;
    const provFerias = (sal / 12) * 1.3333;
    const fgtsProvisoes = (prov13 + provFerias) * 0.08;
    const patronalProvisoes = (prov13 + provFerias) * percPatronal;

    const custoTotalEmpresa = sal + fgtsMensal + patronalMensal + prov13 + provFerias + fgtsProvisoes + patronalProvisoes;

    // Líquido Funcionário
    const inssFunc = calculateInssProgressivo(sal);
    const irpfFunc = calcularIrrfProgressivo(sal - inssFunc);
    const liquidoMensalDireto = sal - inssFunc - irpfFunc;
    
    // Anualizado do Funcionário (incluindo 13º, Férias + 1/3 e FGTS)
    const liquidoAnualComBeneficios = (liquidoMensalDireto * 12) + (sal - calculateInssProgressivo(sal) - calcularIrrfProgressivo(sal - calculateInssProgressivo(sal))) + (sal * 1.3333) + (fgtsMensal * 12);
    const liquidoMedioMensalEfetivo = liquidoAnualComBeneficios / 12;

    return {
      custoTotalEmpresa,
      inssFunc,
      irpfFunc,
      liquidoMensalDireto,
      liquidoMedioMensalEfetivo,
      fgtsMensal,
      patronalMensal,
      provisoesTotais: prov13 + provFerias + fgtsProvisoes + patronalProvisoes
    };
  }, [salarioClt, regimeEmpresa]);

  // CÁLCULOS PJ
  const pjMetrics = useMemo(() => {
    const nf = Number(valorNfPj) || 0;
    const aliqDas = anexoPj === 'anexo3' ? 0.06 : 0.155;
    const das = nf * aliqDas;

    // Pró-Labore
    const valorProLabore = (nf * (proLaborePerc / 100));
    const inssProLabore = Math.min(valorProLabore * 0.11, 908.85); // Teto INSS aprox
    const irpfProLabore = calcularIrrfProgressivo(valorProLabore - inssProLabore);

    const custoTributarioTotal = das + inssProLabore + irpfProLabore;
    const liquidoPj = nf - custoTributarioTotal;

    return {
      das,
      valorProLabore,
      inssProLabore,
      irpfProLabore,
      custoTributarioTotal,
      liquidoPj
    };
  }, [valorNfPj, anexoPj, proLaborePerc]);

  const pontoEquilibrioNf = cltMetrics.custoTotalEmpresa;
  const fmt = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);

  return (
    <div className="space-y-6 animate-fade-in-up pb-12">
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Comparador CLT vs PJ (Custo Corporativo)' }]} />
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Scale className="w-6 h-6 text-brand-600"/> Comparativo Corporativo: CLT vs PJ
          </h2>
          <p className="text-xs text-slate-500 mt-1">Análise de custo global para a empresa e remuneração líquida real do profissional.</p>
        </div>
        <button onClick={() => window.print()} className="no-print px-4 py-2 border rounded-xl text-xs font-semibold flex items-center gap-2 bg-white hover:bg-slate-50 shadow-sm">
          <Printer className="w-4 h-4"/> Imprimir Estudo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ENTRADAS */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Parâmetros do Estudo</h3>

            <div>
              <label className="block text-xs font-bold text-slate-700">Regime Contratante (Empresa)</label>
              <select value={regimeEmpresa} onChange={e => setRegimeEmpresa(e.target.value)} className="w-full mt-1 p-2 border border-slate-300 rounded-xl text-xs font-semibold bg-slate-50">
                <option value="presumido">Lucro Presumido / Real (CPP 28,3%)</option>
                <option value="simples">Simples Nacional (Isento CPP Patronal)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Salário CLT Bruto Mensal (R$)</label>
              <input type="number" value={salarioClt} onChange={e => setSalarioClt(e.target.value)} className="w-full mt-1 p-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-900" />
            </div>

            <div className="border-t pt-3">
              <label className="block text-xs font-bold text-slate-700">Valor Proposto Nota Fiscal PJ (R$)</label>
              <input type="number" value={valorNfPj} onChange={e => setValorNfPj(e.target.value)} className="w-full mt-1 p-2.5 border border-brand-300 rounded-xl text-sm font-bold text-brand-900 bg-brand-50" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Tributação PJ (Prestador)</label>
              <select value={anexoPj} onChange={e => setAnexoPj(e.target.value)} className="w-full mt-1 p-2 border border-slate-300 rounded-xl text-xs font-semibold bg-slate-50">
                <option value="anexo3">Simples Anexo III (Serviços - 6% Inicial)</option>
                <option value="anexo5">Simples Anexo V (Sem Fator R - 15,5% Inicial)</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-brand-200 bg-brand-50/60 space-y-2">
            <span className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-600"/> Equilíbrio Corporativo Neutro
            </span>
            <p className="text-xs text-brand-800 leading-relaxed">
              Para a empresa ter exatamente o <strong>mesmo custo total</strong> de um CLT de {fmt(salarioClt)}, o valor máximo da Nota Fiscal PJ deve ser de <strong className="text-brand-900 font-extrabold">{fmt(pontoEquilibrioNf)}</strong>.
            </p>
          </div>
        </div>

        {/* COMPARATIVO RESULTADOS */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* CARD CLT */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-600"/> Modelo CLT
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded">Salário: {fmt(salarioClt)}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Custo Total / Mês p/ Empresa:</span>
                <span className="text-2xl font-black text-rose-700 block mt-0.5">{fmt(cltMetrics.custoTotalEmpresa)}</span>
                <span className="text-[10px] text-slate-500">Inclui FGTS, Encargos e Provisões de 13º/Férias.</span>
              </div>

              <div className="space-y-1.5 pt-2 border-t text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Líquido Mensal Direto:</span>
                  <span className="font-bold text-slate-900">{fmt(cltMetrics.liquidoMensalDireto)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Média Líquida + Benefícios Anuais / 12:</span>
                  <span className="font-bold text-emerald-700">{fmt(cltMetrics.liquidoMedioMensalEfetivo)}</span>
                </div>
              </div>
            </div>

            {/* CARD PJ */}
            <div className="glass-panel p-5 rounded-2xl border border-brand-200 bg-white space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-bold text-brand-900 text-sm flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-brand-600"/> Modelo PJ
                </span>
                <span className="text-[10px] bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded">NF: {fmt(valorNfPj)}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Custo Total / Mês p/ Empresa:</span>
                <span className="text-2xl font-black text-slate-900 block mt-0.5">{fmt(valorNfPj)}</span>
                <span className="text-[10px] text-slate-500">Valor fixo da Nota Fiscal (Sem custos extras).</span>
              </div>

              <div className="space-y-1.5 pt-2 border-t text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Impostos e Enquadramento (Simples/INSS):</span>
                  <span className="font-bold text-rose-600">-{fmt(pjMetrics.custoTributarioTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Líquido Efetivo no Bolso do PJ:</span>
                  <span className="font-bold text-emerald-700">{fmt(pjMetrics.liquidoPj)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* DETALHAMENTO DAS COMPOSIÇÕES */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
            <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider border-b pb-2">Decomposição Técnica dos Custos e Impostos</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <span className="font-bold text-slate-900 block border-b border-dashed pb-1">Composição do Custo CLT (Empresa)</span>
                <div className="flex justify-between text-slate-600"><span>Salário Base:</span><span className="font-mono">{fmt(salarioClt)}</span></div>
                <div className="flex justify-between text-slate-600"><span>FGTS Mensal (8%):</span><span className="font-mono">{fmt(cltMetrics.fgtsMensal)}</span></div>
                <div className="flex justify-between text-slate-600"><span>INSS Patronal + RAT + Terceiros:</span><span className="font-mono">{fmt(cltMetrics.patronalMensal)}</span></div>
                <div className="flex justify-between text-slate-600"><span>Provisão Mensal (13º + Férias + Encargos):</span><span className="font-mono">{fmt(cltMetrics.provisoesTotais)}</span></div>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-900 block border-b border-dashed pb-1">Tributação do Prestador PJ</span>
                <div className="flex justify-between text-slate-600"><span>Imposto do Simples Nacional (DAS):</span><span className="font-mono">{fmt(pjMetrics.das)}</span></div>
                <div className="flex justify-between text-slate-600"><span>Pró-Labore Estimado:</span><span className="font-mono">{fmt(pjMetrics.valorProLabore)}</span></div>
                <div className="flex justify-between text-slate-600"><span>INSS Pró-Labore (11% Retido):</span><span className="font-mono">{fmt(pjMetrics.inssProLabore)}</span></div>
                <div className="flex justify-between text-slate-600"><span>IRPF Pró-Labore:</span><span className="font-mono">{fmt(pjMetrics.irpfProLabore)}</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}