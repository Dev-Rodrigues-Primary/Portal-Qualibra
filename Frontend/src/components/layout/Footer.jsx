import React from 'react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 glass-panel py-4 px-6 text-center text-xs text-slate-500 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div>© 2026 GRUPO QUALIBRA — Infraestrutura Local Ativa</div>
        <div className="flex items-center gap-4">
          <span>IP Local: 192.168.191.204</span>
          <span className="text-brand-700 font-semibold flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 inline-block"></span>
            Servidor Operacional
          </span>
        </div>
      </div>
    </footer>
  );
}
