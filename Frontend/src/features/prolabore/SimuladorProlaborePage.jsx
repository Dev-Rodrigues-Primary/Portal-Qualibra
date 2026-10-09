import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateProlabore } from '../../domain/taxCalculators';
import { CurrencyInput } from '../../components/common/CurrencyInput';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
import { Coins, ShieldCheck, Printer, UserCheck, Info, CheckCircle2 } from 'lucide-react';

export function SimuladorProlaborePage() {
  const [valor, setValor] = useState(5000);
  const [dependentes, setDependentes] = useState(0);
  const [contabilidadeRegular, setContabilidadeRegular] = useState(true);

  const res = useMemo(() => {
    return calculateProlabore({ 
      valor: parseNumberInput(valor), 
      dependentes: parseInt(dependentes, 10) || 0 
    });
  }, [valor, dependentes]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in-up">
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Pró-Labore x Distribuição de Lucros' }]} />
      </div>

      <div className="glass-panel p-6 lg:p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-[10px] font-mono font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full uppercase">
            Retenções Oficiais no CPF do Sócio • Teto RGPS R$ 897,32
          </span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Pró-Labore x Distribuição Isenta de Lucros
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl">
            Simulação exata com aplicação automática da regra mais vantajosa da Receita Federal (Desconto Simplificado de R$ 564,80 vs. Dedução Legal do INSS).
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="no-print bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition shadow-xs flex-shrink-0"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Imprimir Demonstrativo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* ================= LADO ESQUERDO: PARÂMETROS ================= */}
        <div className="no-print xl:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 bg-white">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Coins className="w-5 h-5 text-purple-600" /> Parâmetros de Retirada
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pró-Labore Bruto Mensal Desejado (R$)
                </label>
                <CurrencyInput value={valor} onChange={setValor}
                  className="w-full p-3 rounded-lg border border-purple-300 bg-purple-50/30 text-purple-950 font-bold text-lg shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Base contratual registrada em folha perante o eSocial.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Dependentes para Dedução no IRPF
                </label>
                <input
                  type="number"
                  min="0"
                  value={dependentes}
                  onChange={(e) => setDependentes(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-semibold shadow-sm focus:border-brand-500 transition"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Dedução legal de R$ 189,59 por dependente comprovado.
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition shadow-xs">
                  <input
                    type="checkbox"
                    checked={contabilidadeRegular}
                    onChange={(e) => setContabilidadeRegular(e.target.checked)}
                    className="w-5 h-5 text-purple-600 rounded border-slate-300 focus:ring-purple-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Escrituração Contábil Regular</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">
                      Garante 100% de isenção de IRPF e INSS sobre a distribuição de lucros excedentes.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* ================= LADO DIREITO: DEMONSTRATIVO ANALÍTICO ================= */}
        <div className="xl:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
            
            {/* Header do Demonstrativo */}
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b-2 border-slate-700">
              <span className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                Demonstrativo de Pagamento do Sócio (Recibo Oficial)
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded font-mono">
                Competência 2026
              </span>
            </div>

            <div className="p-6 space-y-5">
              
              {/* CARD DE ENTRADA EXPLICITA: PRÓ-LABORE BRUTO */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-sans">
                    Rendimento Tributável Base
                  </span>
                  <span className="text-sm font-extrabold text-slate-800">
                    Pró-Labore Bruto Registrado:
                  </span>
                </div>
                <span className="text-2xl font-black font-mono text-slate-900">
                  {formatCurrency(res.prolaboreBruto)}
                </span>
              </div>

              {/* RETENÇÕES DISCRIMINADAS */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">
                  Descontos Obrigatórios na Fonte
                </div>

                <div className="space-y-2.5 font-mono text-sm">
                  {/* INSS DINÂMICO */}
                  <div className="flex justify-between items-center p-2.5 rounded-lg hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                    <div>
                      <span className="text-slate-800 font-semibold block">{res.labelInss}</span>
                      <span className="text-[10px] text-slate-400 block font-sans">
                        {res.atingiuTeto 
                          ? 'Trava máxima aplicada sobre o limite do RGPS (R$ 8.157,41)' 
                          : 'Alíquota de 11% sobre o valor integral do Pró-Labore'}
                      </span>
                    </div>
                    <span className="font-bold text-rose-600">
                      - {formatCurrency(res.inss)}
                    </span>
                  </div>

                  {/* IRPF DINÂMICO COM MÉTODO USADO */}
                  <div className="flex justify-between items-center p-2.5 rounded-lg hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                    <div>
                      <span className="text-slate-800 font-semibold block">
                        IRPF Retido na Fonte ({res.aliqNominalIrrf > 0 ? `${res.aliqNominalIrrf}%` : 'Isento'})
                      </span>
                      <span className="text-[10px] text-emerald-700 block font-sans font-medium">
                        ✓ Base de R$ {formatCurrency(res.baseCalculoIrrf)} ({res.nomeMetodoDeducao})
                      </span>
                    </div>
                    <span className="font-bold text-rose-600">
                      - {formatCurrency(res.irrf)}
                    </span>
                  </div>
                </div>
              </div>

              {/* TOTAL LÍQUIDO */}
              <div className="bg-purple-50/60 border border-purple-200 p-5 rounded-2xl flex items-center justify-between shadow-xs mt-4">
                <div>
                  <span className="text-purple-800 text-[10px] uppercase font-bold tracking-widest block font-sans">
                    Disponível em Conta Corrente
                  </span>
                  <span className="text-purple-950 font-extrabold text-base sm:text-lg uppercase">
                    Pró-Labore Líquido do Sócio:
                  </span>
                  <span className="text-xs text-purple-700 block font-sans mt-0.5">
                    Carga Efetiva de Retenção: <b>{formatPercent(res.aliquotaEfetiva)}</b>
                  </span>
                </div>
                <span className="font-black text-purple-700 text-3xl font-mono">
                  {formatCurrency(res.prolaboreLiquido)}
                </span>
              </div>

              {/* COMPARATIVO COM DISTRIBUIÇÃO ISENTA DE LUCROS */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs font-sans text-emerald-900 mt-2">
                <div className="flex items-center gap-2 font-bold text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Otimização Societária (Distribuição Isenta de Lucros)</span>
                </div>
                <p className="leading-relaxed">
                  Para os mesmos R$ {formatCurrency(res.prolaboreBruto)}, caso fossem distribuídos como <b>Lucro Contábil</b>, a retenção de INSS e IR seria de <b>R$ 0,00</b> (economia de <b>{formatCurrency(res.totalRetencoes)}</b> no bolso do sócio), respaldado pelo Art. 10 da Lei nº 9.249/95.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}