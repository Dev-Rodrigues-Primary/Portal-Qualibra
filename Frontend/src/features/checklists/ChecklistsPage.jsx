import React, { useState, useEffect, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { ROTINAS_OPERACIONAIS } from '../../domain/checklistData';
import { 
  CheckSquare, 
  Printer, 
  ShieldCheck, 
  Building2, 
  User, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Save, 
  RotateCcw, 
  FileCheck, 
  ArrowRight, 
  History,
  FileText,
  Briefcase,
  Lock,
  Layers,
  Copy,
  Check
} from 'lucide-react';

const STORAGE_KEY = 'qualibra_protocolos_pop_v1';

export function ChecklistsPage() {
  const [rotinaId, setRotinaId] = useState('abertura');
  const [clienteNome, setClienteNome] = useState('Exemplo Serviços de Tecnologia Ltda');
  const [clienteDoc, setClienteDoc] = useState('45.123.789/0001-10');
  const [analista, setAnalista] = useState('Carlos Eduardo - Analista Responsável');
  const [dataProtocolo, setDataProtocolo] = useState(new Date().toISOString().split('T')[0]);
  const [itensChecados, setItensChecados] = useState({});
  const [protocolosSalvos, setProtocolosSalvos] = useState([]);
  const [copiado, setCopiado] = useState(false);

  // Carrega os protocolos salvos na máquina
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProtocolosSalvos(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Erro ao ler protocolos salvos', e);
    }
  }, []);

  const rotinaAtual = useMemo(() => {
    return ROTINAS_OPERACIONAIS.find(r => r.id === rotinaId) || ROTINAS_OPERACIONAIS[0];
  }, [rotinaId]);

  // Alterna o status de um item
  const toggleItem = (itemId) => {
    setItensChecados(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Estatísticas de Conclusão da Rotina
  const totalItens = rotinaAtual.etapas.length;
  const concluidosCount = rotinaAtual.etapas.filter(e => itensChecados[e.id]).length;
  const percentual = Math.round((concluidosCount / totalItens) * 100);
  const is100PorCento = percentual === 100;

  // Hash único de Protocolo
  const protocolHash = useMemo(() => {
    const cleanDoc = (clienteDoc || '').replace(/\D/g, '').substring(0, 6);
    return `POP-${rotinaId.toUpperCase()}-${cleanDoc || '000000'}-${new Date().getFullYear()}`;
  }, [rotinaId, clienteDoc]);

  // Salva no LocalStorage com chave do Cliente
  const salvarProtocolo = () => {
    const novoProtocolo = {
      id: Date.now().toString(),
      hash: protocolHash,
      rotinaId,
      rotinaNome: rotinaAtual.nome,
      clienteNome,
      clienteDoc,
      analista,
      dataProtocolo,
      itensChecados,
      concluidosCount,
      totalItens,
      percentual,
      dataSalvoEm: new Date().toLocaleString('pt-BR')
    };

    const atualizados = [novoProtocolo, ...protocolosSalvos.filter(p => p.hash !== protocolHash)].slice(0, 15);
    setProtocolosSalvos(atualizados);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados));
    alert('✅ Protocolo salvo com sucesso no terminal de auditoria!');
  };

  // Restaura um protocolo salvo
  const carregarProtocolo = (prot) => {
    setRotinaId(prot.rotinaId);
    setClienteNome(prot.clienteNome);
    setClienteDoc(prot.clienteDoc);
    setAnalista(prot.analista);
    setDataProtocolo(prot.dataProtocolo);
    setItensChecados(prot.itensChecados || {});
  };

  // Limpa o checklist da rotina atual
  const reiniciarRotina = () => {
    if (confirm('Deseja realmente limpar as marcações desta rotina?')) {
      const novos = { ...itensChecados };
      rotinaAtual.etapas.forEach(e => delete novos[e.id]);
      setItensChecados(novos);
    }
  };

  // Exclui um protocolo salvo do histórico
  const excluirProtocolo = (id, e) => {
    e.stopPropagation();
    const filtrados = protocolosSalvos.filter(p => p.id !== id);
    setProtocolosSalvos(filtrados);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in-up">
      
      {/* BREADCRUMBS */}
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Processos & Rotinas' }, { label: 'Protocolo de Conformidade Operacional (POP)' }]} />
      </div>

      {/* HEADER EXECUTIVO PREMIUM */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 lg:p-8 text-white shadow-xl border border-slate-700/60 no-print">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Auditoria de Processos & Compliance
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                <ShieldCheck className="w-3 h-3" /> Procedimento Operacional Padrão (POP)
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Laudo de Conformidade Operacional
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Vincule a execução das rotinas contábeis, trabalhistas e societárias a um cliente específico, gerando um protocolo formal assinado para comprovação técnica e auditoria interna.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={salvarProtocolo}
              className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs rounded-xl backdrop-blur-md border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              title="Salvar no terminal para reabrir futuramente"
            >
              <Save className="w-4 h-4 text-emerald-400" />
              <span>Salvar Protocolo</span>
            </button>

            <button 
              onClick={() => window.print()} 
              className="w-full sm:w-auto px-4 py-3 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>Imprimir Laudo A4</span>
            </button>
          </div>
        </div>
      </div>

      {/* GRID DE TRABALHO: SETUP DO CLIENTE vs EXECUÇÃO DA ROTINA */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* COLUNA ESQUERDA: PARÂMETROS DO CLIENTE E HISTÓRICO (NO-PRINT) */}
        <div className="no-print xl:col-span-4 space-y-5">
          
          {/* CARD 1: DADOS DO CLIENTE & ANALISTA */}
          <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                Identificação do Cliente
              </h3>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                Auditoria
              </span>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                  Razão Social / Nome do Cliente
                </label>
                <input 
                  type="text" 
                  value={clienteNome} 
                  onChange={e => setClienteNome(e.target.value)} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 text-xs shadow-inner focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                  CNPJ ou CPF do Cliente
                </label>
                <input 
                  type="text" 
                  value={clienteDoc} 
                  onChange={e => setClienteDoc(e.target.value)} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono font-bold text-slate-900 text-xs shadow-inner focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" /> Analista Responsável
                </label>
                <input 
                  type="text" 
                  value={analista} 
                  onChange={e => setAnalista(e.target.value)} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 text-xs shadow-inner"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" /> Data de Execução do Protocolo
                </label>
                <input 
                  type="date" 
                  value={dataProtocolo} 
                  onChange={e => setDataProtocolo(e.target.value)} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono text-xs shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* CARD 2: SELETOR DE ROTINA (POP) */}
          <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
              <Layers className="w-4 h-4 text-indigo-600" />
              Selecione o Procedimento (POP)
            </h3>

            <div className="space-y-2">
              {ROTINAS_OPERACIONAIS.map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRotinaId(r.id);
                  }}
                  className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 ${
                    rotinaId === r.id 
                      ? 'bg-slate-900 text-white border-slate-800 shadow-md ring-2 ring-emerald-500/30' 
                      : 'bg-slate-50 hover:bg-slate-100/80 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{r.nome}</span>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      rotinaId === r.id ? 'bg-slate-800 text-emerald-400' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {r.etapas.length} etapas
                    </span>
                  </div>
                  <span className={`text-[10px] ${rotinaId === r.id ? 'text-slate-400' : 'text-slate-500'}`}>
                    {r.categoria}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* CARD 3: HISTÓRICO DE PROTOCOLOS SALVOS NO TERMINAL */}
          {protocolosSalvos.length > 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <History className="w-4 h-4 text-amber-600" />
                  Protocolos Salvos Neste Terminal
                </h3>
                <span className="text-[10px] font-mono text-slate-400">{protocolosSalvos.length}</span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {protocolosSalvos.map(prot => (
                  <div
                    key={prot.id}
                    onClick={() => carregarProtocolo(prot)}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="space-y-0.5 max-w-[200px]">
                      <span className="font-bold text-xs text-slate-900 group-hover:text-amber-950 truncate block">
                        {prot.clienteNome}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono block">
                        {prot.rotinaNome.split(' ')[0]} • {prot.percentual}% concluído
                      </span>
                    </div>

                    <button
                      onClick={(e) => excluirProtocolo(prot.id, e)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                      title="Excluir este protocolo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* COLUNA DIREITA: CHECKLIST INTERATIVO & ESPELHO DO LAUDO A4 */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* BARRA DE PROGRESSO E CONTROLE DA ROTINA (NO-PRINT) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 no-print">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Status de Execução do Procedimento
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {rotinaAtual.nome}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-black font-mono border ${
                  is100PorCento 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}>
                  {concluidosCount} de {totalItens} concluídos ({percentual}%)
                </span>

                <button
                  onClick={reiniciarRotina}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                  title="Reiniciar esta rotina"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* BARRA DE PROGRESSO */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  is100PorCento ? 'bg-emerald-500' : 'bg-indigo-500'
                }`}
                style={{ width: `${percentual}%` }}
              />
            </div>
          </div>

          {/* ============================================================ */}
          {/* ESPELHO FORMAL DO LAUDO A4 (VISÍVEL NA TELA E NA IMPRESSÃO)   */}
          {/* ============================================================ */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 lg:p-10 space-y-7 print:shadow-none print:border-none print:p-0 print:m-0 print:rounded-none">
            
            {/* LINHA PRISMÁTICA QUALIBRA */}
            <div className="h-[3px] w-full bg-gradient-to-r from-emerald-500 via-amber-400 via-rose-500 via-purple-600 to-cyan-500 opacity-80 rounded-full"></div>

            {/* CABEÇALHO DO LAUDO */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">
                  GRUPO QUALIBRA CONTABILIDADE
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Auditoria de Procedimentos Operacionais Padrão (POP) • (11) 2897-4595
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  portalqualibra.local • Compliance & Segurança Jurídica
                </p>
              </div>

              <div className="text-right font-mono self-start sm:self-auto">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Protocolo de Auditoria
                </span>
                <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200 block mt-1">
                  {protocolHash}
                </span>
              </div>
            </div>

            {/* IDENTIFICAÇÃO FORMAL DA EMPRESA E ANALISTA */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Cliente / Razão Social:</span>
                <span className="font-black text-slate-900 text-sm">{clienteNome || '---'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">CNPJ / CPF:</span>
                <span className="font-bold text-slate-900">{clienteDoc || '---'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Procedimento Técnico:</span>
                <span className="font-bold text-indigo-700">{rotinaAtual.nome}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Responsável / Data:</span>
                <span className="font-bold text-slate-800">{analista} • {dataProtocolo}</span>
              </div>
            </div>

            {/* LISTA DE ETAPAS DA ROTINA (CHECKLIST INTERATIVO) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Relação de Etapas & Verificações Normativas
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Total: {totalItens} Etapas
                </span>
              </div>

              <div className="space-y-2">
                {rotinaAtual.etapas.map((etapa, idx) => {
                  const check = !!itensChecados[etapa.id];

                  return (
                    <div
                      key={etapa.id}
                      onClick={() => toggleItem(etapa.id)}
                      className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                        check 
                          ? 'bg-emerald-50/50 border-emerald-200 hover:bg-emerald-50/80' 
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {/* Checkbox customizado */}
                      <div className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                        check 
                          ? 'bg-emerald-600 text-white shadow-2xs' 
                          : 'border-2 border-slate-300 bg-white'
                      }`}>
                        {check && <Check className="w-3.5 h-3.5" />}
                      </div>

                      {/* Informações da Etapa */}
                      <div className="flex-grow space-y-0.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className={`text-xs font-bold leading-snug ${
                            check ? 'text-emerald-950 line-through opacity-80' : 'text-slate-900'
                          }`}>
                            {idx + 1}. {etapa.titulo}
                          </span>
                          <span className="text-[9px] font-mono font-bold uppercase bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                            {etapa.orgao}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 block">
                          Base Normativa: {etapa.baseLegal}
                        </span>
                      </div>

                      {/* Status */}
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        check 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {check ? 'Concluído' : 'Pendente'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TERMO DE ENCERRAMENTO E ASSINATURA */}
            <div className="pt-6 border-t border-slate-200 space-y-6">
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans italic text-justify bg-slate-50 p-3 rounded-xl border border-slate-100">
                Atesto para os devidos fins de controle interno e conformidade legal que as etapas indicadas como <b>CONCLUÍDAS</b> foram rigorosamente executadas e validadas perante os órgãos regulamentares pertinentes, respaldando a regularidade cadastral e fiscal do contribuinte acima qualificado.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="text-center pt-8 border-t border-slate-900">
                  <span className="font-black text-xs text-slate-900 uppercase block">{analista}</span>
                  <span className="text-[10px] font-mono text-slate-500">Responsável Técnico pela Execução</span>
                </div>

                <div className="text-center pt-8 border-t border-slate-900">
                  <span className="font-black text-xs text-slate-900 uppercase block">{clienteNome}</span>
                  <span className="text-[10px] font-mono text-slate-500">Ciência do Cliente / Representante Legal</span>
                </div>
              </div>
            </div>

            {/* RODAPÉ DO LAUDO */}
            <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-400 gap-2">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                Laudo emitido via Sistema de Auditoria Interna Qualibra
              </span>
              <span>Emissão: {new Date().toLocaleDateString('pt-BR')}</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ChecklistsPage;