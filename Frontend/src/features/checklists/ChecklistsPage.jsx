import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { DEFAULT_CHECKLISTS } from '../../domain/checklistData';
import { CheckSquare, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';

export function ChecklistsPage() {
  const [checklists, setChecklists] = useState(() => {
    try {
      const saved = localStorage.getItem('qualibra_checklists');
      return saved ? JSON.parse(saved) : DEFAULT_CHECKLISTS;
    } catch {
      return DEFAULT_CHECKLISTS;
    }
  });

  const [activeChecklistId, setActiveChecklistId] = useState('abertura');

  useEffect(() => {
    localStorage.setItem('qualibra_checklists', JSON.stringify(checklists));
  }, [checklists]);

  const toggleItem = (chkId, itemId) => {
    setChecklists((prev) => {
      const target = prev[chkId];
      const updatedItems = target.items.map((i) =>
        i.id === itemId ? { ...i, done: !i.done } : i
      );
      return {
        ...prev,
        [chkId]: { ...target, items: updatedItems }
      };
    });
  };

  const resetChecklist = (chkId) => {
    if (window.confirm('Deseja reiniciar todas as etapas deste checklist?')) {
      setChecklists((prev) => {
        const target = prev[chkId];
        const resetItems = target.items.map((i) => ({ ...i, done: false }));
        return {
          ...prev,
          [chkId]: { ...target, items: resetItems }
        };
      });
    }
  };

  const current = checklists[activeChecklistId];
  const total = current.items.length;
  const completed = current.items.filter((i) => i.done).length;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Checklists Operacionais' }]} />

      <div className="glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
            Gestão de Processos & Compliance
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Checklists Operacionais</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Controle de etapas obrigatórias para Abertura, Admissão, Demissão e Fechamentos Contábeis/Fiscais.
          </p>
        </div>

        {/* Progresso Geral */}
        <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm min-w-[200px]">
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-slate-500">Progresso Atual:</span>
            <span className="font-bold text-brand-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-brand-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Abas dos Checklists */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(checklists).map((key) => {
          const chk = checklists[key];
          const isSelected = activeChecklistId === key;
          return (
            <button
              key={key}
              onClick={() => setActiveChecklistId(key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {chk.title} ({chk.departamento})
            </button>
          );
        })}
      </div>

      {/* Lista de Itens do Checklist */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-brand-600" />
            <h3 className="font-bold text-slate-900 text-base">{current.title}</h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              {completed}/{total} concluídos
            </span>
          </div>
          <button
            onClick={() => resetChecklist(activeChecklistId)}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Checklist</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {current.items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => toggleItem(activeChecklistId, item.id)}
              className="py-3 px-2 flex items-center justify-between hover:bg-slate-50 rounded-lg cursor-pointer transition"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => {}} // controlado pelo container
                  className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500 cursor-pointer"
                />
                <span
                  className={`text-sm ${
                    item.done ? 'line-through text-slate-400' : 'text-slate-800 font-medium'
                  }`}
                >
                  {index + 1}. {item.text}
                </span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  item.done
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {item.done ? 'Concluído' : 'Pendente'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}