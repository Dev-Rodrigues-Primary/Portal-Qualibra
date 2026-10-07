import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { gerarEventosFiscais } from '../../domain/fiscalCalendarData';
import { CalendarDays, ShieldCheck } from 'lucide-react';
export function CalendarioFiscalPage() {
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [categoria, setCategoria] = useState('all');
  const eventos = useMemo(() => gerarEventosFiscais(Number(mes), 2026), [mes]);
  const filtrados = eventos.filter(e => categoria === 'all' || e.categoria === categoria);
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="no-print"><Breadcrumbs items={[{ label: 'Calendário Fiscal 2026' }]} /></div>
      <div className="glass-panel p-6 rounded-2xl border border-slate-200">
        <h2 className="text-2xl font-extrabold text-slate-900">Calendário Fiscal & Vencimentos</h2>
        <div className="mt-4 flex gap-2 no-print">
          <select value={mes} onChange={(e) => setMes(e.target.value)} className="px-3 py-2 rounded-xl glass-input text-xs font-semibold">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => <option key={m} value={m}>Mês {String(m).padStart(2,'0')}/2026</option>)}
          </select>
        </div>
      </div>
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
        {filtrados.map(ev => (
          <div key={ev.id} className="flex justify-between p-4 rounded-xl border border-slate-200">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-bold text-brand-700 border border-slate-200">{ev.diaFinal}</div>
              <div><div className="font-bold text-slate-900 text-sm">{ev.nome} <span className="text-[10px] text-slate-400">({ev.regra})</span></div><div className="text-xs text-slate-500">{ev.desc}</div></div>
            </div>
            <span className={`text-[10px] px-3 py-1 rounded-md font-semibold h-fit ${ev.statusClass}`}>{ev.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}