import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { Server, HardDrive, ShieldCheck, Wifi, RefreshCw, LifeBuoy, AlertCircle, Copy, Check, Activity } from 'lucide-react';

export function TiInfraPage() {
  const [copied, setCopied] = useState('');
  const [latency, setLatency] = useState(null);
  const [lastCheck, setLastCheck] = useState('');
  const [counter, setCounter] = useState(0);

  // TELEMETRIA VIVA A CADA 2 SEGUNDOS
  const checkRealPing = async () => {
    const start = performance.now();
    try {
      await fetch('/favicon.ico', { cache: 'no-store' });
      const end = performance.now();
      setLatency(Math.round(end - start));
      setLastCheck(new Date().toLocaleTimeString('pt-BR'));
      setCounter(c => c + 1);
    } catch (err) {
      setLatency(-1);
    }
  };

  useEffect(() => {
    checkRealPing();
    const interval = setInterval(checkRealPing, 2000); // 2 segundos cravados
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in-up">
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'TI & Central de Suporte de Infraestrutura' }]} />
      </div>

      {/* HEADER */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200">
            Painel Operacional de Tecnologia
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">TI, Redes & Conectividade</h2>
          <p className="text-xs text-slate-500 mt-1">Orientações de acesso à rede local, diagnóstico de conectividade e suporte.</p>
        </div>

        {/* INDICADOR VIVO DE ATUALIZAÇÃO AUTOMÁTICA */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-mono">
          <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-700">Telemetria Ativa</span>
          <span className="text-slate-400">• Atualizando a cada 2s</span>
        </div>
      </div>

      {/* DIAGNÓSTICO EM TEMPO REAL DA MÁQUINA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block font-mono">Rede Local (LAN)</span>
              <span className="text-sm font-black text-slate-800">192.168.191.204</span>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">Conectado</span>
        </div>

        {/* LATÊNCIA DINÂMICA (2s) */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block font-mono">Latência ao Servidor</span>
              <span className="text-sm font-black text-slate-800 font-mono flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${latency !== null && latency !== -1 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                {latency === null ? 'Medindo...' : latency === -1 ? 'Falha' : `${latency} ms`}
              </span>
            </div>
          </div>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded font-mono ${latency && latency < 50 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
            {latency && latency < 20 ? 'Excelente' : 'Normal'}
          </span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block font-mono">Camada de Segurança</span>
              <span className="text-sm font-black text-slate-800">Intranet Isolada</span>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 font-mono">Ativa</span>
        </div>
      </div>

      {/* GUIA DE UNIDADES DE REDE E MAPEAMENTO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-blue-600" /> Mapeamento de Pastas de Rede (NAS / Servidor)
          </h3>
          <p className="text-xs text-slate-600">
            Copie o caminho abaixo e cole no seu <b>Explorador de Arquivos (Windows + E)</b> para acessar o servidor de documentos da equipe:
          </p>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block font-mono">Pasta Geral de Clientes / Documentos</span>
                <code className="text-xs font-mono font-bold text-slate-800">\\192.168.191.250\Publico</code>
              </div>
              <button 
                onClick={() => handleCopy('\\\\192.168.191.250\\Publico', 'pub')} 
                className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
              >
                {copied === 'pub' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied === 'pub' ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block font-mono">Pasta de Backups e Domínio Contábil</span>
                <code className="text-xs font-mono font-bold text-slate-800">\\192.168.191.250\Sistemas</code>
              </div>
              <button 
                onClick={() => handleCopy('\\\\192.168.191.250\\Sistemas', 'sis')} 
                className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
              >
                {copied === 'sis' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied === 'sis' ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* SUPORTE RÁPIDO */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-2">
            <LifeBuoy className="w-4 h-4 text-purple-600" /> O que fazer se um sistema estiver fora?
          </h3>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 space-y-1">
              <span className="font-bold flex items-center gap-1 text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" /> Domínio Contábil / Banco travado?
              </span>
              <p className="text-[11px] leading-relaxed">
                Não tente reiniciar o computador do servidor. Notifique o suporte imediatamente para reinício seguro do serviço do banco de dados.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 font-mono">
              <span className="font-bold text-slate-800 block font-sans">Contato Direto do Suporte TI:</span>
              <p className="text-[11px]">E-mail: <strong>suporte.TI@qualibra.com.br</strong></p>
              <p className="text-[11px]">Ramal Interno: <strong>2004</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { TiInfraPage as TIInfraPage };
export default TiInfraPage;