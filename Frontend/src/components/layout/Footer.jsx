import React from 'react';
import { QualibraLogo } from '../common/QualibraLogo';
import { Phone, ShieldCheck, Server, Lock, CheckCircle2, FileCode } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto bg-white/90 backdrop-blur-md border-t border-slate-200/80 shadow-xs">
      {/* Linha prismática de precisão */}
      <div className="h-[2px] w-full bg-gradient-to-r from-emerald-500 via-amber-400 via-rose-500 via-purple-600 to-cyan-500 opacity-70"></div>

      {/* TIER 1: BADGES DE COMPLIANCE & LEGISLAÇÃO ATIVA */}
      <div className="border-b border-slate-100 bg-slate-50/50 py-2.5 px-4 lg:px-8 text-[11px] font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-extrabold uppercase text-[10px] text-slate-400 tracking-wider">
              Conformidade Operacional:
            </span>
            <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700 font-semibold shadow-2xs">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> LC 214/2025 (CBS/IBS)
            </span>
            <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700 font-semibold shadow-2xs">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> eSocial vS-1.2 & DCTFWeb
            </span>
            <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700 font-semibold shadow-2xs">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Teto RGPS 2026
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              LGPD Art. 7º • Armazenamento Local Seguro
            </span>
          </div>
        </div>
      </div>

      {/* TIER 2: ASSINATURA CORPORATIVA & INFRA */}
      <div className="max-w-7xl mx-auto py-5 px-4 lg:px-8 text-xs font-mono text-slate-500">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo e Titularidade */}
          <div className="flex items-center gap-3">
            <QualibraLogo size="xs" showText={false} />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-[11px]">
              <span className="font-bold text-slate-800">
                © 2026 GRUPO QUALIBRA CONTABILIDADE
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="text-slate-500">Auditores & Consultores Tributários</span>
            </div>
          </div>
          
          {/* Contato & Telemetria do Servidor */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[11px]">
            <a 
              href="tel:1128974595" 
              className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-amber-600 transition"
              title="Central Telefônica"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>(11) 2897-4595</span>
            </a>

            <span className="text-slate-200 hidden sm:inline">|</span>

            <span className="flex items-center gap-1.5 text-slate-600">
              <Server className="w-3.5 h-3.5 text-indigo-500" />
              <span>portalqualibra.local</span>
            </span>

            <span className="text-slate-200 hidden sm:inline">|</span>

            <span className="flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Rede Operacional Blindada</span>
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;