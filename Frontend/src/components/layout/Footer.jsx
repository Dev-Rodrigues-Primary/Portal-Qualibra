import React from 'react';
import { QualibraLogo } from '../common/QualibraLogo';
import { Phone, ShieldCheck, Server, Lock, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200">
      {/* Linha prismática sutil no topo do footer */}
      <div className="h-[2px] w-full bg-gradient-to-r from-emerald-500 via-amber-500 via-rose-500 via-purple-600 to-cyan-500 opacity-60"></div>

      <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8 text-xs text-slate-500 font-mono">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo e Titularidade */}
          <div className="flex items-center gap-3">
            <QualibraLogo size="xs" showText={false} />
            <span className="font-semibold text-slate-700">
              © 2026 GRUPO QUALIBRA CONTABILIDADE • Auditores & Consultores
            </span>
          </div>
          
          {/* Informações de Infra e Contato */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a 
              href="tel:1128974595" 
              className="flex items-center gap-1.5 text-slate-700 hover:text-amber-600 font-bold transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>(11) 2897-4595</span>
            </a>

            <span className="hidden sm:inline text-slate-300">|</span>

            <span className="flex items-center gap-1.5 text-slate-600">
              <Server className="w-3.5 h-3.5 text-blue-500" />
              <span>portalqualibra.local</span>
            </span>

            <span className="hidden sm:inline text-slate-300">|</span>

            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Rede Operacional Segura</span>
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;