import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { FISCAL_EVENTS } from '../../domain/fiscalCalendarData';
import { CalendarDays, Filter } from 'lucide-react';

export function CalendarioFiscalPage() {
  const [filterCat, setFilterCat] = useState('all');

  const filtered = FISCAL_EVENTS.filter(
    (ev) => filterCat === 'all' || ev.categoria === filterCat
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Calendário Fiscal & Vencimentos' }]} />

      <div className="glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase">
            Agenda Fiscal Unificada
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Calendário Fiscal & Impostos</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Datas de vencimento de declarações acessórias e guias tributárias federais, estaduais e municipais.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-500 ml-2 mr-1" />
          <button
            onClick={() => setFilterCat('all')}
            className={`px-2.5 py-1 rounded-lg transition ${
              filterCat === 'all' ? 'bg-amber-600 text-white font-medium' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterCat('tributario')}
            className={`px-2.5 py-1 rounded-lg transition ${
              filterCat === 'tributario' ? 'bg-amber-600 text-white font-medium' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tributário
          </button>
          <button
            onClick={() => setFilterCat('trabalhista')}
            className={`px-2.5 py-1 rounded-lg transition ${
              filterCat === 'trabalhista' ? 'bg-amber-600 text-white font-medium' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Trabalhista
          </button>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3 font-mono text-xs">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-brand-300 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex flex-col items-center justify-center font-bold text-brand-700 border border-slate-200">
                  <span className="text-[9px] text-slate-400 font-sans">DIA</span>
                  <span className="text-base leading-none">{item.dia}</span>
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm font-sans">{item.nome}</div>
                  <div className="text-xs text-slate-500 font-sans mt-0.5">{item.desc}</div>
                </div>
              </div>
              <span
                className={`text-[10px] px-2.5 py-1 rounded-md border font-semibold ${
                  item.tipo === 'alerta'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
