import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { gerarEventosFiscais } from '../../domain/fiscalCalendarData';
import { CalendarDays, ShieldCheck, Filter } from 'lucide-react';

export function CalendarioFiscalPage() {
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [filtroAmbito, setFiltroAmbito] = useState('Todos');

  const eventos = useMemo(() => {
    return gerarEventosFiscais(Number(mes), 2026);
  }, [mes]);

  const filtrados = eventos.filter(e => filtroAmbito === 'Todos' || e.ambito === filtroAmbito);

  const mesesNome = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Calendário Fiscal & Obrigações (2026)' }]} />
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase">
            Normativa RFB, Estados e Municípios
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Agenda Fiscal & Obrigações</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cálculo dinâmico de dias úteis. As obrigações anuais (DEFIS, ECD, ECF) aparecem no respectivo mês de vencimento.
          </p>
        </div>

        {/* Filtros de Mês */}
        <div className="flex items-center gap-2 no-print">
          <CalendarDays className="w-5 h-5 text-slate-400" />
          <select
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            className="px-4 py-2.5 rounded-xl glass-input text-sm font-semibold min-w-[200px]"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
              <option key={m} value={m}>Mês de Referência: {mesesNome[m-1]} / 2026</option>
            ))}
          </select>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-slate-200 overflow-hidden p-6 space-y-4">
        
        {/* Barra de Filtro de Âmbito */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-100 no-print">
          <Filter className="w-4 h-4 text-slate-400 mr-1" />
          {['Todos', 'Federal', 'Estadual', 'Municipal', 'Trabalhista'].map(amb => (
            <button
              key={amb}
              onClick={() => setFiltroAmbito(amb)}
              className={`px-3 py-1.5 rounded-lg text-xs transition font-medium border ${
                filtroAmbito === amb 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {amb}
            </button>
          ))}
        </div>

        {/* Lista de Vencimentos */}
        <div className="space-y-3 font-mono text-xs">
          {filtrados.length > 0 ? filtrados.map(ev => (
            <div
              key={ev.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-brand-300 transition gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex flex-col items-center justify-center font-bold text-slate-700 border border-slate-200 flex-shrink-0">
                  <span className="text-[9px] text-slate-400 font-sans">DIA</span>
                  <span className="text-base leading-none">{ev.diaFinal}</span>
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm font-sans flex items-center gap-2">
                    <span>{ev.nome}</span>
                    <span className="hidden md:inline text-[10px] text-slate-400 font-mono">({ev.regra === 'posterga' ? 'Regra: Posterga p/ útil' : 'Regra: Antecipa p/ útil'})</span>
                  </div>
                  <div className="text-xs text-slate-500 font-sans mt-0.5 leading-relaxed">{ev.desc}</div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pl-16 sm:pl-0">
                <span className="text-xs text-slate-500 font-mono font-bold bg-slate-50 px-2 py-1 rounded border border-slate-100">
                  {ev.dataCompleta}
                </span>
                <span className={`text-[10px] px-3 py-1 rounded-md border font-bold uppercase tracking-wider ${ev.badgeClass}`}>
                  {ev.ambito}
                </span>
              </div>
            </div>
          )) : (
            <div className="py-8 text-center text-slate-400 font-sans">
              Nenhuma obrigação encontrada para o âmbito selecionado neste mês.
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 flex items-start gap-2 font-mono mt-4">
          <ShieldCheck className="w-4 h-4 text-brand-600 flex-shrink-0" />
          <span>
            <b>Atenção Legislações Estaduais/Municipais:</b> Os vencimentos de ICMS e ISS estão fixados no dia 10 (regra geral adotada por grande parte do Brasil). Caso o estado/município do seu cliente possua legislação específica diferente (ex: dia 15 ou 20), o calendário oficial do ente tributante prevalece.
          </span>
        </div>
      </div>
    </div>
  );
}