import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export function GlobalBetaToast() {
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem('qualibra_beta_minimized');
      if (isDismissed === 'true') {
        setMinimized(true);
      }
    } catch (e) {}
  }, []);

  const handleDismiss = () => {
    setMinimized(true);
    try {
      sessionStorage.setItem('qualibra_beta_minimized', 'true');
    } catch (e) {}
  };

  const handleExpand = () => {
    setMinimized(false);
    try {
      sessionStorage.removeItem('qualibra_beta_minimized');
    } catch (e) {}
  };

  if (minimized) {
    return (
      <div className="no-print fixed bottom-5 right-5 z-50 animate-fade-in-up">
        <button
          onClick={handleExpand}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3.5 py-2 rounded-full shadow-lg text-xs transition-all hover:scale-105 cursor-pointer border border-amber-300"
          title="Clique para ver o aviso de homologação"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-slate-950" />
          <span>Modo Homologação</span>
        </button>
      </div>
    );
  }

  return (
    <div className="no-print fixed bottom-5 right-5 z-50 max-w-sm w-full animate-fade-in-up">
      <div className="bg-white/95 backdrop-blur-md border border-amber-300 rounded-2xl shadow-2xl p-4 border-l-4 border-l-amber-500 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 animate-pulse" />
        </div>
        <div className="flex-grow pr-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Ambiente em Homologação
            </span>
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition cursor-pointer"
              title="Minimizar aviso"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Portal em fase de validação interna. As simulações têm caráter orientativo. <b>Sempre confira e valide os dados</b> antes do fechamento oficial!
          </p>
        </div>
      </div>
    </div>
  );
}