import React from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { Server, Activity, Shield, HardDrive, Wifi, Lock } from 'lucide-react';

export function TiInfraPage() {
  const servidores = [
    {
      nome: 'Servidor Operacional Primário (Portal)',
      ip: '192.168.191.204',
      porta: '5173',
      status: 'Online',
      uptime: '99.98%'
    },
    {
      nome: 'Servidor de Banco de Dados Contábil',
      ip: '192.168.191.210',
      porta: '5432',
      status: 'Online',
      uptime: '100%'
    },
    {
      nome: 'Servidor de Armazenamento & Backups (NAS)',
      ip: '192.168.191.250',
      porta: '445',
      status: 'Online',
      uptime: '99.90%'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'TI & Infraestrutura Local' }]} />

      <div className="glass-panel p-6 rounded-2xl border border-slate-200">
        <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
          Infraestrutura Local Ativa
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-2">TI & Infraestrutura de Rede</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Monitoramento do ambiente interno de servidores, status de conectividade e políticas de segurança.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {servidores.map((srv, idx) => (
          <div key={idx} className="glass-card p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {srv.status}
              </span>
              <Server className="w-5 h-5 text-slate-400" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm">{srv.nome}</h3>
              <div className="font-mono text-xs text-slate-500 mt-1">IP: {srv.ip}:{srv.porta}</div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-600">
              <span>Disponibilidade:</span>
              <span className="font-bold text-emerald-600">{srv.uptime}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <Lock className="w-4 h-4 text-brand-600" />
          <span>Políticas de Segurança e Acesso</span>
        </div>
        <p>
          Este servidor opera na rede interna restrita. Nenhuma credencial administrativa ou segredo de banco de dados é exposto no cliente frontend.
        </p>
      </div>
    </div>
  );
}