import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { gerarEventosFiscais, getFeriadosOficiais } from '../../domain/fiscalCalendarData';
import { 
  CalendarDays, 
  ShieldCheck, 
  Filter, 
  Printer, 
  Calendar as CalendarIcon,
  MapPin,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';

export function CalendarioFiscalPage() {
  const dataHoje = new Date();
  const [mes, setMes] = useState(dataHoje.getMonth() + 1);
  const [ano, setAno] = useState(dataHoje.getFullYear());
  const [praca, setPraca] = useState('SP');
  const [filtroAmbito, setFiltroAmbito] = useState('Todos');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [diaSelecionado, setDiaSelecionado] = useState(null);

  // Gera os eventos fiscais com as datas calculadas
  const eventos = useMemo(() => {
    return gerarEventosFiscais(Number(mes), Number(ano), praca);
  }, [mes, ano, praca]);

  const filtrados = eventos.filter(e => filtroAmbito === 'Todos' || e.ambito === filtroAmbito);

  const mesesNome = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const diasSemanaNomes = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // NAVEGAÇÃO RÁPIDA DE MÊS
  const navegarMes = (direcao) => {
    if (direcao === 'prev') {
      if (mes === 1) { setMes(12); setAno(a => a - 1); }
      else { setMes(m => m - 1); }
    } else {
      if (mes === 12) { setMes(1); setAno(a => a + 1); }
      else { setMes(m => m + 1); }
    }
    setDiaSelecionado(null);
  };

  // MATEMÁTICA DA GRADE MENSAL (7 COLUNAS X 5 OU 6 LINHAS)
  const gridDias = useMemo(() => {
    const firstDay = new Date(ano, mes - 1, 1);
    const startWeekday = firstDay.getDay(); // 0 = Domingo
    const daysInMonth = new Date(ano, mes, 0).getDate();
    const daysInPrevMonth = new Date(ano, mes - 1, 0).getDate();
    const feriados = getFeriadosOficiais(ano, praca);

    const cells = [];

    // Dias do mês anterior (padding cinza)
    for (let i = startWeekday - 1; i >= 0; i--) {
      cells.push({
        numero: daysInPrevMonth - i,
        isMesAtual: false,
        isFimDeSemana: false,
        isFeriado: false,
        eventos: []
      });
    }

    // Dias do mês atual
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(ano, mes - 1, d);
      const dayOfWeek = dateObj.getDay();
      const isFimDeSemana = dayOfWeek === 0 || dayOfWeek === 6;
      
      const mm = String(mes).padStart(2, '0');
      const dd = String(d).padStart(2, '0');
      const iso = `${ano}-${mm}-${dd}`;
      const isFeriado = feriados.includes(iso);

      const eventosDoDia = filtrados.filter(ev => Number(ev.diaFinal) === d);

      const isToday = (
        d === dataHoje.getDate() &&
        mes === (dataHoje.getMonth() + 1) &&
        ano === dataHoje.getFullYear()
      );

      cells.push({
        numero: d,
        isMesAtual: true,
        isFimDeSemana,
        isFeriado,
        iso,
        eventos: eventosDoDia,
        isToday
      });
    }

    // Dias do próximo mês para fechar a grade (35 ou 42 células)
    const totalCells = cells.length > 35 ? 42 : 35;
    const remaining = totalCells - cells.length;
    for (let i = 1; i <= remaining; i++) {
      cells.push({
        numero: i,
        isMesAtual: false,
        isFimDeSemana: false,
        isFeriado: false,
        eventos: []
      });
    }

    return cells;
  }, [ano, mes, praca, filtrados]);

  // Eventos do dia selecionado no grid
  const eventosDoDiaSelecionado = useMemo(() => {
    if (!diaSelecionado) return null;
    return filtrados.filter(ev => Number(ev.diaFinal) === diaSelecionado);
  }, [diaSelecionado, filtrados]);

  return (
    <div className="space-y-6 pb-16 animate-fade-in-up">
      
      {/* BREADCRUMBS */}
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Processos & Rotinas' }, { label: 'Agenda Fiscal & Vencimentos Oficiais' }]} />
      </div>

      {/* HEADER EXECUTIVO PREMIUM */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 lg:p-8 text-white shadow-xl border border-slate-700/60">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-400/30 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Grade Mensal Perpétua (BACEN / RFB)
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <ShieldCheck className="w-3 h-3" /> Feriados Nacionais & Praça SP
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Agenda & Calendário Fiscal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Visualização integrada em grade com mapeamento de dias úteis, vencimentos de obrigações federais, estaduais, municipais e trabalhistas.
            </p>
          </div>

          <div className="flex items-center gap-3 no-print w-full sm:w-auto">
            <button 
              onClick={() => window.print()} 
              className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-xs rounded-xl backdrop-blur-md border border-white/20 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-200" />
              <span>Imprimir Agenda</span>
            </button>
          </div>
        </div>
      </div>

      {/* PAINEL DE CONTROLE: NAVEGADOR DE MÊS, PRAÇA E MODO DE VISUALIZAÇÃO */}
      <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md p-5 lg:p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 no-print">
        
        {/* NAVEGADOR DE MÊS COM BOTÕES */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button 
              onClick={() => navegarMes('prev')} 
              className="p-2 rounded-xl hover:bg-white text-slate-700 hover:shadow-2xs transition active:scale-95 cursor-pointer"
              title="Mês Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-4 py-1 font-black text-slate-900 text-sm sm:text-base font-mono min-w-[170px] text-center">
              {mesesNome[mes - 1]} / {ano}
            </div>
            <button 
              onClick={() => navegarMes('next')} 
              className="p-2 rounded-xl hover:bg-white text-slate-700 hover:shadow-2xs transition active:scale-95 cursor-pointer"
              title="Próximo Mês"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Atalho Hoje */}
          <button
            onClick={() => {
              setMes(dataHoje.getMonth() + 1);
              setAno(dataHoje.getFullYear());
              setDiaSelecionado(null);
            }}
            className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition cursor-pointer"
          >
            Mês Atual
          </button>
        </div>

        {/* COMBOS: PRAÇA REGIONAL + SELETOR RÁPIDO DE ANO + TOGGLE GRID/LISTA */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* SELETOR DE PRAÇA */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 px-3 py-2 rounded-xl shadow-inner">
            <MapPin className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
            <select
              value={praca}
              onChange={(e) => setPraca(e.target.value)}
              className="bg-transparent font-extrabold text-slate-800 text-xs focus:outline-none cursor-pointer"
            >
              <option value="SP">São Paulo (SP) — Matriz</option>
              <option value="NACIONAL">Nacional (Regra Geral)</option>
            </select>
          </div>

          {/* SELETOR DE ANO */}
          <select
            value={ano}
            onChange={(e) => setAno(Number(e.target.value))}
            className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 text-xs shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
          >
            {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(y => (
              <option key={y} value={y}>Ano {y}</option>
            ))}
          </select>

          {/* TOGGLE MODO DE VISUALIZAÇÃO: GRADE vs LISTA */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-slate-900 text-white shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Visualização em Grade de Calendário"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grade</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'list' 
                  ? 'bg-slate-900 text-white shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Visualização em Lista de Obrigações"
            >
              <List className="w-3.5 h-3.5" />
              <span>Lista</span>
            </button>
          </div>

        </div>

      </div>

      {/* CONTAINER PRINCIPAL */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 lg:p-7 shadow-sm space-y-6">
        
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
            {filtrados.length} obrigações • Praça {praca === 'SP' ? 'São Paulo' : 'Nacional'}
          </span>
        </div>

        {/* ============================================================ */}
        {/* MODO 1: GRADE MENSAL DE CALENDÁRIO REAL (CALENDAR GRID)       */}
        {/* ============================================================ */}
        {viewMode === 'grid' && (
          <div className="space-y-6">
            
            {/* TABELA DO CALENDÁRIO */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-slate-200">
              
              {/* CABEÇALHO DOS DIAS DA SEMANA */}
              <div className="grid grid-cols-7 gap-px bg-slate-200 text-center font-mono font-bold text-xs">
                {diasSemanaNomes.map((dNome, i) => (
                  <div 
                    key={i} 
                    className={`py-3 bg-slate-50 text-[11px] uppercase tracking-wider ${
                      i === 0 || i === 6 ? 'text-rose-500 font-black' : 'text-slate-600'
                    }`}
                  >
                    {dNome}
                  </div>
                ))}
              </div>

              {/* CÉLULAS DOS DIAS (GRID) */}
              <div className="grid grid-cols-7 gap-px bg-slate-200">
                {gridDias.map((celula, idx) => {
                  const hasEvents = celula.eventos && celula.eventos.length > 0;
                  const isSelected = diaSelecionado === celula.numero && celula.isMesAtual;

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (celula.isMesAtual && hasEvents) {
                          setDiaSelecionado(celula.numero === diaSelecionado ? null : celula.numero);
                        }
                      }}
                      className={`min-h-[95px] lg:min-h-[115px] p-2 flex flex-col justify-between transition-all relative ${
                        !celula.isMesAtual
                          ? 'bg-slate-50/40 text-slate-300 pointer-events-none'
                          : celula.isFeriado
                            ? 'bg-rose-50/40 text-slate-700'
                            : celula.isFimDeSemana
                              ? 'bg-slate-50/70 text-slate-400'
                              : 'bg-white hover:bg-slate-50/80 text-slate-800'
                      } ${hasEvents ? 'cursor-pointer hover:ring-2 hover:ring-amber-400/50 hover:z-10' : ''} ${
                        isSelected ? 'ring-2 ring-amber-500 bg-amber-50/30 z-20' : ''
                      }`}
                    >
                      {/* TOPO DA CÉLULA: NÚMERO DO DIA + BADGES */}
                      <div className="flex items-center justify-between">
                        <span 
                          className={`text-xs font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                            celula.isToday 
                              ? 'bg-amber-500 text-slate-950 font-black shadow-sm' 
                              : isSelected
                                ? 'bg-slate-900 text-white'
                                : celula.isFeriado 
                                  ? 'text-rose-600 font-black' 
                                  : ''
                          }`}
                        >
                          {celula.numero}
                        </span>

                        {celula.isFeriado && celula.isMesAtual && (
                          <span className="text-[9px] font-sans font-bold text-rose-600 bg-rose-100/80 px-1 rounded uppercase tracking-tighter">
                            Feriado
                          </span>
                        )}
                      </div>

                      {/* LISTA DE PÍLULAS DOS TRIBUTOS NESTE DIA */}
                      <div className="space-y-1 mt-1 flex-grow">
                        {celula.eventos?.slice(0, 3).map(ev => {
                          let pillBg = 'bg-slate-100 text-slate-800 border-slate-200';
                          if (ev.ambito === 'Federal') pillBg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                          if (ev.ambito === 'Trabalhista') pillBg = 'bg-indigo-50 text-indigo-800 border-indigo-200';
                          if (ev.ambito === 'Estadual') pillBg = 'bg-purple-50 text-purple-800 border-purple-200';
                          if (ev.ambito === 'Municipal') pillBg = 'bg-amber-50 text-amber-900 border-amber-200';

                          return (
                            <div
                              key={ev.id}
                              title={`${ev.nome} - ${ev.desc}`}
                              className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded border truncate flex items-center justify-between shadow-2xs ${pillBg}`}
                            >
                              <span className="truncate">{ev.nome.split(' ')[0]} {ev.nome.split(' ')[1] || ''}</span>
                            </div>
                          );
                        })}

                        {celula.eventos?.length > 3 && (
                          <span className="text-[9px] font-mono font-bold text-slate-400 block text-right">
                            +{celula.eventos.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DETALHES DO DIA SELECIONADO NA GRADE */}
            {diaSelecionado && eventosDoDiaSelecionado && (
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-sm space-y-3 animate-fade-in">
                <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <h4 className="font-black text-amber-950 text-sm">
                      Obrigações com Vencimento no Dia {String(diaSelecionado).padStart(2, '0')}/{String(mes).padStart(2, '0')}/{ano}
                    </h4>
                  </div>
                  <button
                    onClick={() => setDiaSelecionado(null)}
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 cursor-pointer"
                  >
                    Fechar Detalhes ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {eventosDoDiaSelecionado.map(ev => (
                    <div key={ev.id} className="p-3.5 bg-white rounded-xl border border-amber-200 shadow-2xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-slate-900">{ev.nome}</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${ev.badgeClass}`}>
                          {ev.ambito}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-sans leading-relaxed">{ev.desc}</p>
                      <span className="text-[10px] font-mono text-slate-400 block pt-1">
                        Regra: {ev.regra === 'posterga' ? 'Prorroga para dia útil' : 'Antecipa para dia útil'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LEGENDA DAS CORES */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-mono text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Federal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Trabalhista (FGTS / eSocial)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Estadual (ICMS)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Municipal (ISS)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Feriados Bancários
              </span>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* MODO 2: LISTA DE OBRIGAÇÕES (MODO AUDITORIA)                  */}
        {/* ============================================================ */}
        {viewMode === 'list' && (
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
                <CalendarIcon className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="font-semibold text-sm">Nenhuma obrigação encontrada para o âmbito selecionado nesta competência.</p>
              </div>
            )}
          </div>
        )}

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