import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { gerarEventosFiscais } from '../../domain/fiscalCalendarData';
import { 
  CalendarDays, 
  ShieldCheck, 
  Filter, 
  Printer, 
  Calendar,
  MapPin,
  Sparkles
} from 'lucide-react';

export function CalendarioFiscalPage() {
  const dataHoje = new Date();
  const [mes, setMes] = useState(dataHoje.getMonth() + 1);
  const [ano, setAno] = useState(dataHoje.getFullYear());
  const [praca, setPraca] = useState('SP');
  const [filtroAmbito, setFiltroAmbito] = useState('Todos');

  const eventos = useMemo(() => {
    return gerarEventosFiscais(Number(mes), Number(ano), praca);
  }, [mes, ano, praca]);

  const filtrados = eventos.filter(e => filtroAmbito === 'Todos' || e.ambito === filtroAmbito);

  const mesesNome = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return (
    <div className="space-y-6 pb-16 animate-fade-in-up">
      
      {/* BREADCRUMBS */}
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Processos & Rotinas' }, { label: 'Agenda Fiscal & Vencimentos Oficiais' }]} />
      </div>

      {/* HEADER EXECUTIVO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 lg:p-8 text-white shadow-xl border border-slate-700/60">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-400/30 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Cálculo Perpétuo de Dias Úteis Bancários
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <ShieldCheck className="w-3 h-3" /> Feriados Nacionais + Praça Regional
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Agenda Fiscal & Obrigações Periódicas
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Vencimentos com recálculo automático de dias úteis, regras vigentes de antecipação e postergação, integrando feriados federais e regionais de São Paulo.
            </p>
          </div>

          <div className="flex items-center gap-3 no-print w-full sm:w-auto">
            <button 
              onClick={() => window.print()} 
              className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-xs rounded-xl backdrop-blur-md border border-white/20 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow"
            >
              <Printer className="w-4 h-4 text-slate-200" />
              <span>Imprimir Calendário</span>
            </button>
          </div>
        </div>
      </div>

      {/* SELETORES DE COMPETÊNCIA & PRAÇA REGIONAL */}
      <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100 flex-shrink-0">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 tracking-tight">Competência & Localidade</h2>
            <p className="text-[11px] text-slate-400">Selecione o mês, ano e a praça tributária da empresa</p>
          </div>
        </div>

        {/* COMBOS: MÊS, ANO E PRAÇA REGIONAL */}
        <div className="flex flex-wrap items-center gap-3">
          {/* SELETOR DE PRAÇA (EVOLUÇÃO ITEM 2 AUDITORIA) */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded-xl shadow-inner">
            <MapPin className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
            <select
              value={praca}
              onChange={(e) => setPraca(e.target.value)}
              className="bg-transparent font-extrabold text-slate-800 text-xs focus:outline-none cursor-pointer"
              title="Praça Fiscal: Impacta feriados estaduais e municipais"
            >
              <option value="SP">São Paulo (SP) — Matriz Qualibra (09/Julho & 25/Jan)</option>
              <option value="NACIONAL">Nacional — Regra Geral da União</option>
            </select>
          </div>

          {/* SELETOR DE MÊS */}
          <select
            value={mes}
            onChange={(e) => setMes(Number(e.target.value))}
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 text-xs shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all cursor-pointer min-w-[160px]"
          >
            {mesesNome.map((m, idx) => (
              <option key={idx + 1} value={idx + 1}>
                {m} ({String(idx + 1).padStart(2, '0')})
              </option>
            ))}
          </select>

          {/* SELETOR DE ANO PERPÉTUO */}
          <select
            value={ano}
            onChange={(e) => setAno(Number(e.target.value))}
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 text-xs shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all cursor-pointer min-w-[110px]"
          >
            {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(y => (
              <option key={y} value={y}>Ano {y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* CONTAINER PRINCIPAL */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:p-7 shadow-sm space-y-5">
        
        {/* BARRA DE FILTRO POR ÂMBITO */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 no-print">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filtrar:
            </span>
            {['Todos', 'Federal', 'Trabalhista', 'Estadual', 'Municipal'].map(amb => (
              <button
                key={amb}
                onClick={() => setFiltroAmbito(amb)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer ${
                  filtroAmbito === amb 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                    : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {amb}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-mono font-semibold text-slate-400">
            {filtrados.length} obrigações mapeadas • Praça {praca === 'SP' ? 'São Paulo' : 'Nacional'}
          </span>
        </div>

        {/* LISTA DE VENCIMENTOS */}
        <div className="space-y-3">
          {filtrados.length > 0 ? filtrados.map(ev => (
            <div
              key={ev.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 lg:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-amber-400/80 hover:shadow-md transition-all duration-200 gap-4 group"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center font-black flex-shrink-0 shadow-sm border border-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <span className="text-[9px] font-mono tracking-widest uppercase opacity-60">DIA</span>
                  <span className="text-xl font-mono leading-none tracking-tight">{ev.diaFinal}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-black text-slate-900 text-sm tracking-tight group-hover:text-amber-950 transition-colors">
                      {ev.nome}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                      {ev.diaDaSemanaExtenso}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      ({ev.regra === 'posterga' ? 'Regra: Posterga p/ útil' : 'Regra: Antecipa p/ útil'})
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl font-sans">
                    {ev.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <span className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border font-black uppercase tracking-wider ${ev.statusUrgencia.class}`}>
                  {ev.statusUrgencia.label}
                </span>

                <span className="text-xs font-mono font-black text-slate-800 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                  {ev.dataCompleta}
                </span>

                <span className={`text-[10px] px-2.5 py-1 rounded-lg border font-black uppercase tracking-wider ${ev.badgeClass}`}>
                  {ev.ambito}
                </span>
              </div>
            </div>
          )) : (
            <div className="py-12 text-center text-slate-400 font-sans space-y-2">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-semibold text-sm">Nenhuma obrigação encontrada para o âmbito selecionado nesta competência.</p>
            </div>
          )}
        </div>

        {/* NOTA DE AUDITORIA NORMATIVA */}
        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-[11px] text-slate-600 flex items-start gap-3 font-mono mt-6">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <b>Regramento de Vencimentos & Praça:</b> O FGTS Digital (Art. 15 Lei 8.036/90), a DCTFWeb (IN RFB 2.005/21) e o PIS/COFINS (Lei 11.933/09) <b>antecipam</b> caso o dia base caia em dia não útil bancário. O DAS do Simples Nacional (Res. CGSN 140/18) <b>prorroga</b>. Na Praça SP, são considerados os feriados da Revolução Constitucionalista (09/07 - Estadual) e Aniversário da Capital (25/01 - Municipal).
          </span>
        </div>

      </div>

    </div>
  );
}

export default CalendarioFiscalPage;