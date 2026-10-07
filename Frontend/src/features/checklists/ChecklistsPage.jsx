import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { CheckSquare, RotateCcw, Printer } from 'lucide-react';

const DEFAULT_CHECKLISTS = {
  abertura: {
    id: 'abertura', title: 'Abertura de Empresa', departamento: 'Societário',
    items: [
      { id: 'ab-1', text: 'Consulta Prévia de Viabilidade', done: false },
      { id: 'ab-2', text: 'Registro na Junta Comercial (DBE)', done: false },
      { id: 'ab-3', text: 'Inscrição Municipal / Estadual', done: false },
      { id: 'ab-4', text: 'Emissão do Certificado Digital', done: false },
      { id: 'ab-5', text: 'Opção pelo Simples Nacional', done: false }
    ]
  },
  admissao: {
    id: 'admissao', title: 'Admissão CLT', departamento: 'DP',
    items: [
      { id: 'ad-1', text: 'Coleta de Documentos Pessoais', done: false },
      { id: 'ad-2', text: 'Exame Admissional (ASO)', done: false },
      { id: 'ad-3', text: 'Contrato de Trabalho', done: false },
      { id: 'ad-4', text: 'Envio S-2200 ao eSocial', done: false }
    ]
  }
};

export function ChecklistsPage() {
  const [checklists, setChecklists] = useState(() => {
    try {
      const saved = localStorage.getItem('qualibra_checklists');
      return saved ? JSON.parse(saved) : DEFAULT_CHECKLISTS;
    } catch {
      return DEFAULT_CHECKLISTS;
    }
  });

  const [activeTab, setActiveTab] = useState('abertura');

  useEffect(() => {
    localStorage.setItem('qualibra_checklists', JSON.stringify(checklists));
  }, [checklists]);

  const toggleItem = (chkId, itemId) => {
    setChecklists(prev => {
      const target = prev[chkId];
      const updated = target.items.map(i => i.id === itemId ? { ...i, done: !i.done } : i);
      return { ...prev, [chkId]: { ...target, items: updated } };
    });
  };

  const resetChecklist = (chkId) => {
    if(window.confirm('Deseja zerar o progresso deste checklist?')) {
      setChecklists(prev => {
        const target = prev[chkId];
        const reset = target.items.map(i => ({ ...i, done: false }));
        return { ...prev, [chkId]: { ...target, items: reset } };
      });
    }
  };

  const current = checklists[activeTab];
  const total = current.items.length;
  const completed = current.items.filter(i => i.done).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="no-print"><Breadcrumbs items={[{ label: 'Checklists Operacionais' }]} /></div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
            Gestão de Processos
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Checklists Operacionais</h2>
          <p className="text-xs text-slate-500 mt-0.5">Progresso salvo automaticamente no navegador.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs min-w-[200px]">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-500">Progresso Geral:</span>
              <span className="font-bold text-brand-600">{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-brand-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          <button onClick={() => window.print()} className="no-print p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-xs text-slate-600"><Printer className="w-4 h-4"/></button>
        </div>
      </div>

      <div className="no-print flex gap-2">
        {Object.keys(checklists).map(key => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${activeTab === key ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
          >
            {checklists[key].title}
          </button>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-brand-600"/>
            <h3 className="font-bold text-slate-900">{current.title}</h3>
            <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">{completed}/{total} concluídos</span>
          </div>
          <button onClick={() => resetChecklist(activeTab)} className="no-print flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700">
            <RotateCcw className="w-3.5 h-3.5"/> Reiniciar
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {current.items.map((item, idx) => (
            <div key={item.id} onClick={() => toggleItem(activeTab, item.id)} className="flex items-center justify-between p-3 hover:bg-slate-50 cursor-pointer rounded-lg transition">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={item.done} readOnly className="w-4 h-4 text-brand-600 border-slate-300 rounded cursor-pointer"/>
                <span className={`text-sm ${item.done ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>{idx+1}. {item.text}</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${item.done ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{item.done ? 'Concluído' : 'Pendente'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}