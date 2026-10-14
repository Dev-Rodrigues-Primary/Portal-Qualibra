import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { 
  Lightbulb, 
  Mail, 
  Sparkles, 
  Building2, 
  User, 
  Tag, 
  ThumbsUp, 
  ShieldCheck, 
  Copy,
  Check,
  Server,
  Phone,
  ExternalLink,
  HelpCircle,
  FileCode2,
  CheckCircle2
} from 'lucide-react';

export function EnvioIdeiasPage() {
  const [nome, setNome] = useState('');
  const [departamento, setDepartamento] = useState('Fiscal');
  const [categoria, setCategoria] = useState('Nova Calculadora Tributária');
  const [impacto, setImpacto] = useState('Economia de Tempo Operacional');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [copiado, setCopiado] = useState(false);

  // Corpo do e-mail estruturado para envio real
  const corpoFormatado = useMemo(() => {
    return `CHAMADO DE INOVAÇÃO / SUGESTÃO - PORTAL QUALIBRA\n` +
           `===================================================\n` +
           `Solicitante: ${nome || 'Colaborador Qualibra'}\n` +
           `Departamento: ${departamento}\n` +
           `Categoria: ${categoria}\n` +
           `Impacto Estimado: ${impacto}\n\n` +
           `TÍTULO DA PROPOSTA:\n` +
           `${titulo || '[Não informado]'}\n\n` +
           `DESCRIÇÃO DA DEMANDA / FERRAMENTA DESEJADA:\n` +
           `${descricao || '[Não detalhado]'}\n\n` +
           `===================================================\n` +
           `Origem: portalqualibra.local (Servidor Ubuntu T130)\n` +
           `Data do Envio: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`;
  }, [nome, departamento, categoria, impacto, titulo, descricao]);

  // Link direto para abrir o cliente de e-mail oficial (Outlook / Webmail)
  const linkMailto = useMemo(() => {
    const subject = encodeURIComponent(`[PORTAL QUALIBRA] Sugestão: ${titulo || 'Nova Demanda'}`);
    const body = encodeURIComponent(corpoFormatado);
    return `mailto:suporte.TI@qualibra.com.br?subject=${subject}&body=${body}`;
  }, [titulo, corpoFormatado]);

  const handleCopiar = () => {
    navigator.clipboard.writeText(corpoFormatado);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in-up">
      
      {/* BREADCRUMBS */}
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Suporte & Inovação' }, { label: 'Canal de Sugestões para o Portal' }]} />
      </div>

      {/* HEADER EXECUTIVO PREMIUM */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 lg:p-8 text-white shadow-xl border border-slate-700/60">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-400/30 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Comunicação Direta com o Time de TI
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <ShieldCheck className="w-3 h-3" /> Triagem Semanal de Backlog
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Canal de Inovação & Sugestões
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Estruture sua proposta de nova calculadora, ajuste de regra tributária ou melhoria de processo. O chamado é enviado diretamente para a caixa postal da equipe de TI do Grupo Qualibra.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15 text-xs font-mono text-slate-300 text-center sm:text-right">
              <span className="text-[10px] uppercase text-amber-400 block font-bold">Destino Oficial:</span>
              <span className="font-bold text-white">suporte.TI@qualibra.com.br</span>
            </div>
          </div>
        </div>
      </div>

      {/* GRID DE TRABALHO: ESTRUTURADOR DE CHAMADO vs DIRETRIZES DA TI */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* COLUNA ESQUERDA: ESTRUTURADOR DO E-MAIL */}
        <div className="xl:col-span-7">
          <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md p-6 lg:p-8 shadow-sm space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-black text-slate-900 text-sm">Estruturação da Proposta</h2>
                  <p className="text-[11px] text-slate-400">Preencha os pontos-chave para abrir o chamado</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded border border-slate-100">
                Sem necessidade de login
              </span>
            </div>

            <div className="space-y-4">
              
              {/* NOME E SETOR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-500" /> Seu Nome
                  </label>
                  <input 
                    type="text" 
                    value={nome} 
                    onChange={e => setNome(e.target.value)} 
                    placeholder="Ex: Mariana Costa"
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 text-xs shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" /> Seu Departamento
                  </label>
                  <select 
                    value={departamento} 
                    onChange={e => setDepartamento(e.target.value)} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 text-xs shadow-inner cursor-pointer"
                  >
                    <option value="Fiscal">Setor Fiscal</option>
                    <option value="Pessoal / DP">Departamento Pessoal (DP)</option>
                    <option value="Contábil">Setor Contábil</option>
                    <option value="Societário & Paralegal">Societário & Paralegal</option>
                    <option value="Diretoria / Sócios">Diretoria / Sócios</option>
                    <option value="Atendimento / Recepção">Atendimento / Recepção</option>
                  </select>
                </div>
              </div>

              {/* CATEGORIA E IMPACTO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-slate-500" /> Tipo de Demanda
                  </label>
                  <select 
                    value={categoria} 
                    onChange={e => setCategoria(e.target.value)} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 text-xs shadow-inner cursor-pointer"
                  >
                    <option value="Nova Calculadora Tributária">Nova Calculadora Tributária</option>
                    <option value="Novo Procedimento Operacional (POP)">Novo Procedimento Operacional (POP)</option>
                    <option value="Ajuste de Regra Fiscal / Legislação">Ajuste de Regra Fiscal / Legislação</option>
                    <option value="Correção de Inconsistência (Bug)">Correção de Inconsistência (Bug)</option>
                    <option value="Sugestão de Layout & Usabilidade">Sugestão de Layout & Usabilidade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5 text-slate-500" /> Benefício Principal
                  </label>
                  <select 
                    value={impacto} 
                    onChange={e => setImpacto(e.target.value)} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 text-xs shadow-inner cursor-pointer"
                  >
                    <option value="Economia de Tempo Operacional">Economia de Tempo Operacional</option>
                    <option value="Mitigação de Risco / Erro Fiscal">Mitigação de Risco / Erro Fiscal</option>
                    <option value="Apresentação de Alto Valor ao Cliente">Apresentação de Alto Valor ao Cliente</option>
                    <option value="Padronização de Equipe">Padronização de Equipe</option>
                  </select>
                </div>
              </div>

              {/* TÍTULO */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                  Assunto / Título Resumido *
                </label>
                <input 
                  type="text" 
                  value={titulo} 
                  onChange={e => setTitulo(e.target.value)} 
                  placeholder="Ex: Simulador de DIFAL Não-Contribuinte (Emenda 87/15)"
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 text-xs shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              {/* DETALHAMENTO */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                  Detalhamento da Ideia ou Regra Desejada *
                </label>
                <textarea 
                  rows="5"
                  value={descricao} 
                  onChange={e => setDescricao(e.target.value)} 
                  placeholder="Explique quais seriam os dados de entrada necessários, a base legal que devemos seguir e o que o sistema deve calcular ou exibir como resultado final..."
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none leading-relaxed"
                />
              </div>

              {/* BOTÕES DE ENVIO REAL */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={linkMailto}
                  className="w-full sm:flex-1 py-3.5 px-4 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Abrir no E-mail (Outlook / Webmail)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <button
                  type="button"
                  onClick={handleCopiar}
                  className="w-full sm:w-auto py-3.5 px-5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  title="Copiar texto estruturado para colar no Teams ou chat"
                >
                  {copiado ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                  <span>{copiado ? 'Texto Copiado!' : 'Copiar Texto'}</span>
                </button>
              </div>

              <p className="text-[10px] text-slate-400 font-mono text-center">
                * O clique abrirá seu cliente corporativo com o e-mail pré-formatado pronto para disparo para suporte.TI@qualibra.com.br
              </p>

            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: DIRETRIZES DA TI & CONTATO REAL */}
        <div className="xl:col-span-5 space-y-5">
          
          {/* DIRETRIZES DE APROVAÇÃO DE DEMANDAS */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileCode2 className="w-4 h-4 text-indigo-600" />
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Como a TI Avalia as Sugestões?
              </h3>
            </div>

            <div className="space-y-3 text-xs font-sans text-slate-600 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <b className="text-slate-800">Embasamento Normativo:</b>
                  <p className="text-[11px] text-slate-500">Calculadoras devem ter fundamentação legal clara (ex: LC 123, LC 214, CLT, IN RFB).</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <b className="text-slate-800">Recorrência Operacional:</b>
                  <p className="text-[11px] text-slate-500">Priorizamos ferramentas que economizam tempo semanal de múltiplos analistas do escritório.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <b className="text-slate-800">Segurança de Dados:</b>
                  <p className="text-[11px] text-slate-500">O portal opera em rede local blindada. Nenhuma informação de cliente é trafegada para servidores externos.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CANAL DE SUPORTE DIRETO */}
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Server className="w-4 h-4 text-indigo-600" />
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Canais Oficiais de Suporte
              </h3>
            </div>

            <div className="space-y-2 font-mono text-xs text-slate-700">
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-white border border-slate-200/80">
                <span className="text-slate-400">Caixa de TI:</span>
                <span className="font-bold text-indigo-700">suporte.TI@qualibra.com.br</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-white border border-slate-200/80">
                <span className="text-slate-400">Telefonia / Ramal:</span>
                <span className="font-bold text-slate-800">(11) 2897-4595</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-white border border-slate-200/80">
                <span className="text-slate-400">Host do Servidor:</span>
                <span className="font-bold text-slate-800">portalqualibra.local (T130)</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default EnvioIdeiasPage;