import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { calculateReformaIntegral } from '../../domain/taxCalculators';
import { CurrencyInput } from '../../components/common/CurrencyInput';
import { formatCurrency, formatPercent, parseNumberInput } from '../../utils/formatters';
import { Calculator, Sliders, CheckCircle, TrendingDown, Printer, Layers, Info, ArrowRight } from 'lucide-react';

export function SimuladorReformaPage() {
  const [rbt12, setRbt12] = useState(1200000);
  const [recServ, setRecServ] = useState(80000);
  const [recCom, setRecCom] = useState(20000);
  const [compras, setCompras] = useState(15000);
  const [ano, setAno] = useState(2027);
  const [publicoAlvo, setPublicoAlvo] = useState('B2B');
  const [reducaoSetorial, setReducaoSetorial] = useState(0);

  const result = useMemo(() => calculateReformaIntegral({
    rbt12: parseNumberInput(rbt12), recServ: parseNumberInput(recServ), recCom: parseNumberInput(recCom),
    compras: parseNumberInput(compras), ano: parseInt(ano, 10), publicoAlvo, reducaoSetorial: parseFloat(reducaoSetorial) || 0
  }), [rbt12, recServ, recCom, compras, ano, publicoAlvo, reducaoSetorial]);

  return (
    <div className="space-y-6 animate-fade-in-up pb-12">
      <div className="no-print"><Breadcrumbs items={[{ label: 'Simulador da Reforma Tributária' }]} /></div>

      <div className="glass-panel p-6 lg:p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full uppercase flex items-center gap-1.5 w-fit">
            <Layers className="w-3.5 h-3.5" /> Lei Complementar nº 214/2025
          </span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">Simulador de Transição IBS/CBS</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Projete o impacto financeiro da migração do Simples Nacional tradicional para o Regime Híbrido, considerando o direito a crédito das compras e a redução progressiva de ICMS/ISS.
          </p>
        </div>
        <button onClick={() => window.print()} className="no-print bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition shadow-sm">
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Imprimir Relatório</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="no-print xl:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sliders className="w-5 h-5 text-brand-600" />
              <h3 className="font-bold text-slate-900">Parâmetros da Empresa</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Faturamento 12 Meses (RBT12)</label>
                  <CurrencyInput value={rbt12} onChange={setRbt12} className="w-full px-3 py-2 rounded-lg glass-input text-sm font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Receita Serviços</label>
                    <CurrencyInput value={recServ} onChange={setRecServ} className="w-full px-3 py-2 rounded-lg glass-input text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Receita Comércio</label>
                    <CurrencyInput value={recCom} onChange={setRecCom} className="w-full px-3 py-2 rounded-lg glass-input text-sm font-mono" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ano de Transição</label>
                    <select value={ano} onChange={(e) => setAno(e.target.value)} className="w-full px-3 py-2 rounded-lg glass-input text-sm font-semibold text-brand-700">
                      <option value="2026">2026 (Teste 1%)</option>
                      <option value="2027">2027 (CBS 8,8%)</option>
                      <option value="2028">2028 (CBS 8,8%+IBS)</option>
                      <option value="2029">2029 (Início ICMS/ISS)</option>
                      <option value="2033">2033 (Plena 26,5%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Compras Creditáveis</label>
                    <CurrencyInput value={compras} onChange={setCompras} className="w-full px-3 py-2 rounded-lg glass-input text-sm font-mono" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Redução Setorial (Lei Específica)</label>
                  <select value={reducaoSetorial} onChange={(e) => setReducaoSetorial(e.target.value)} className="w-full px-3 py-2 rounded-lg glass-input text-sm">
                    <option value="0">Tributação Padrão (Sem redução)</option>
                    <option value="30">Redução de 30% (Prof. Regulamentadas)</option>
                    <option value="60">Redução de 60% (Saúde, Educação, etc.)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-8 space-y-6">
          <div className="glass-panel p-6 lg:p-8 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Apuração Comparativa Mensal</h3>

            <div className={`p-5 rounded-2xl flex items-center justify-between border ${result.simplesVantajoso ? 'bg-emerald-50 border-emerald-200' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex items-start gap-4">
                {result.simplesVantajoso ? <CheckCircle className="w-8 h-8 text-emerald-600" /> : <TrendingDown className="w-8 h-8 text-blue-600" />}
                <div>
                  <div className={`text-sm font-bold uppercase tracking-wider ${result.simplesVantajoso ? 'text-emerald-800' : 'text-blue-800'}`}>
                    {result.simplesVantajoso ? 'Manter Simples Tradicional' : 'Migrar para Regime Híbrido'}
                  </div>
                  <div className={`text-sm mt-1 ${result.simplesVantajoso ? 'text-emerald-700' : 'text-blue-700'}`}>
                    A opção sugerida gera uma economia mensal de <b>{formatCurrency(result.diferencaAbs)}</b>.
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-400"></div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Simples Tradicional</span>
                <div className="text-3xl font-black text-slate-800 mt-2 font-mono">{formatCurrency(result.totalSimples)}</div>
                <div className="mt-2 text-[11px] text-slate-500">Guia única unificada baseada no RBT12.</div>
              </div>
              <div className="p-5 rounded-xl border border-brand-200 bg-brand-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">Regime Híbrido (IBS/CBS)</span>
                <div className="text-3xl font-black text-brand-700 mt-2 font-mono">{formatCurrency(result.totalHibrido)}</div>
                <div className="mt-2 text-[11px] text-brand-600/80">Guia DAS Reduzida + Apuração Não-Cumulativa.</div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-400" /> Memória de Cálculo Detalhada (Regime Híbrido)
              </h4>
              
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Componente a Recolher</th>
                      <th className="py-3 px-4">Alíquota Efetiva</th>
                      <th className="py-3 px-4 text-right">Valor Parcial</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4">DAS Mantido (Serviços)</td>
                      <td className="py-3 px-4 font-mono text-xs">{formatPercent(result.aliqSimplesServ)} (Parcial)</td>
                      <td className="py-3 px-4 text-right font-mono font-medium">{formatCurrency(result.dasReduzidoServ)}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">DAS Mantido (Comércio)</td>
                      <td className="py-3 px-4 font-mono text-xs">{formatPercent(result.aliqSimplesCom)} (Parcial)</td>
                      <td className="py-3 px-4 text-right font-mono font-medium">{formatCurrency(result.dasReduzidoCom)}</td>
                    </tr>
                    <tr className="bg-brand-50">
                      <td className="py-3 px-4 font-bold text-brand-900">CBS/IBS Apurado (Não-Cumulativo)</td>
                      <td className="py-3 px-4 font-mono text-xs text-brand-700 font-bold">{formatPercent(result.aliqConjuntaIbsCbs)} (Ano {ano})</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-brand-900">{formatCurrency(result.cbsApurada)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ===== NOVA CAIXA EXPLÍCITA DE DÉBITO X CRÉDITO ===== */}
              <div className="mt-4 p-5 bg-white border border-slate-200 rounded-xl space-y-2.5 text-xs font-mono shadow-sm">
                <div className="text-slate-500 uppercase tracking-widest font-bold font-sans border-b border-slate-100 pb-2 mb-3">
                  Lógica de Apuração CBS/IBS
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>Débito Bruto sobre Receita (R$ {formatCurrency(parseNumberInput(recServ) + parseNumberInput(recCom))} × {formatPercent(result.aliqConjuntaIbsCbs)}):</span>
                  <span className="font-bold">{formatCurrency(result.debitoBrutoIbsCbs)}</span>
                </div>
                <div className="flex justify-between items-center text-emerald-600">
                  <span>Crédito sobre Compras (R$ {formatCurrency(parseNumberInput(compras))} × {formatPercent(result.aliqConjuntaIbsCbs)}):</span>
                  <span className="font-bold">- {formatCurrency(result.creditoFornecedores)}</span>
                </div>
                <div className="flex justify-between items-center font-bold border-t border-slate-100 pt-3 mt-1 text-sm text-brand-800">
                  <span>CBS/IBS Líquido a Pagar:</span>
                  <span>{formatCurrency(result.cbsApurada)}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}