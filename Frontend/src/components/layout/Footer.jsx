import React from 'react';
import { QualibraLogo } from '../common/QualibraLogo';
import { Phone, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-6 text-xs text-slate-500 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <QualibraLogo size="xs" showText={false} />
          <span>© 2026 GRUPO QUALIBRA CONTABILIDADE • Auditores & Consultores</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-6">
          <span className="flex items-center gap-1.5 text-slate-700 font-bold">
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            (11) 2897-4595
          </span>
          <span>IP: 192.168.191.204</span>
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Infraestrutura Homologada
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;