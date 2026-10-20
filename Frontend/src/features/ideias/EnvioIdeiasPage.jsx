import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { 
  Lightbulb, 
  Send, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
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
  Flame,
  Zap,
  Award,
  Heart,
  Smile,
  PartyPopper,
  Coffee,
  Rocket,
  CheckCheck
} from 'lucide-react';

export function EnvioIdeiasPage() {
  const [nome, setNome] = useState('');
  const [departamento, setDepartamento] = useState('Setor Fiscal');
  const [categoria, setCategoria] = useState('calculadora');
  const [impacto, setImpacto] = useState('revolucao');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [comemorando, setComemorando] = useState(false);

  const categoriasConfig = [
    { id: 'calculadora', label: 'Nova Calculadora', icon: Sparkles, cor: 'from-amber-500 to-orange-500', desc: 'Simulação tributária ou financeira' },
    { id: 'rotina', label: 'Rotina / POP', icon: Zap, cor: 'from-emerald-500 to-teal-500', desc: 'Checklist ou procedimento' },
    { id: 'ux', label: 'Visual & Usabilidade', icon: Heart, cor: 'from-rose-500 to-pink-500', desc: 'Melhorias de tela e botões' },
    { id: 'bug', label: 'Ajuste / Erro', icon: Flame, cor: 'from-purple-500 to-indigo-500', desc: 'Inconsistência identificada' }
  ];

  const impactosConfig = [
    { id: 'tempo', emoji: '☕', label: 'Economiza Minutos', desc: 'Poupa tempo no cafezinho diário' },
    { id: 'revolucao', emoji: '🚀', label: 'Muda o Jogo!', desc: 'Otimização brutal para a equipe' },
    { id: 'urgente', emoji: '🔥', label: 'Evita Erro Fiscal', desc: 'Mitiga multas e retrabalho' }
  ];

  // Texto formatado para o envio do e-mail
  const categoriaNome = categoriasConfig.find(c => c.id === categoria)?.label || categoria;
  const impactoNome = impactosConfig.find(i => i.id === impacto)?.label || impacto;

  const corpoFormatado = useMemo(() => {
    return `💡 NOVA PROPOSTA DE INOVAÇÃO - PORTAL QUALIBRA\n` +
           `=======================================================\n` +
           `Autor(a): ${nome || 'Colaborador(a) Anônimo(a) do Grupo Qualibra'}\n` +
           `Departamento: ${departamento}\n` +
           `Categoria: ${categoriaNome}\n` +
           `Impacto Esperado: ${impactoNome}\n\n` +
           `🎯 TÍTULO DA IDEIA:\n` +
           `${titulo || '[Sem título]'}\n\n` +
           `📝 DETALHAMENTO DA FERRAMENTA / PROPOSTA:\n` +
           `${descricao || '[Sem descrição]'}\n\n` +
           `=======================================================\n` +
           `Mensagem gerada pelo Portal Qualibra (portalqualibra.local)\n` +
           `Data: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`;
  }, [nome, departamento, categoriaNome, impactoNome, titulo, descricao]);

  const linkMailto = useMemo(() => {
    const subject = encodeURIComponent(`💡 [PORTAL QUALIBRA] Ideia de ${nome || departamento}: ${titulo || 'Nova Proposta'}`);
    const body = encodeURIComponent(corpoFormatado);
    return `mailto:suporte.TI@qualibra.com.br?subject=${subject}&body=${body}`;
  }, [nome, departamento, titulo, corpoFormatado]);

  const handleCopiar = () => {
    navigator.clipboard.writeText(corpoFormatado);
    setCopiado(true);
    setComemorando(true);
    setTimeout(() => setCopiado(false), 2500);
    setTimeout(() => setComemorando(false), 4000);
  };

  const handleDispararEmail = () => {
    setComemorando(true);
    setTimeout(() => setComemorando(false), 5000);
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in-up">
      
      {/* BREADCRUMBS */}
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Suporte & Inovação' }, { label: 'Caixa de Ideias do Time' }]} />
      </div>

      {/* HEADER ULTRA ACOLHEDOR COM GLOW ANIMADO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-6 lg:p-10 text-white shadow-2xl border border-amber-500/30">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute right-40 -bottom-24 w-80 h-80 rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-400/40 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                Sua Voz Constrói o Portal
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/10 text-slate-200 border border-white/15">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400 animate-pulse" /> Feito por e para Colaboradores
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              Tem uma ideia para facilitar sua rotina?
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Nenhuma ideia é pequena demais! Se tem um cálculo chato que você repete todo dia, um relatório que falta ou um detalhe que incomoda na tela, <b>a equipe de TI quer te ouvir</b>.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-center self-stretch sm:self-auto shadow-inner">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30 mb-2 animate-bounce">
              <Lightbulb className="w-6 h-6 fill-slate-950" />
            </div>
            <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">Destino Direto</span>
            <span className="font-mono text-xs font-black text-white">suporte.TI@qualibra.com.br</span>
          </div>
        </div>
      </div>

      {/* FEEDBACK CELEBRATIVO COM CONFETE (O TOQUE "BREGA" MAS DELICIOSO!) */}
      {comemorando && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-xl flex items-center justify-between gap-4 animate-bounce">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl flex-shrink-0">
              🎉
            </div>
            <div>
              <h3 className="font-black text-lg text-white flex items-center gap-2">
                VOCÊ É DEMAIS! OBRIGADO POR AJUDAR A QUALIBRA A VOAR MAIS ALTO! 🚀
              </h3>
              <p className="text-xs text-amber-100 font-medium">
                Sua proposta foi formatada com sucesso! O e-mail corporativo está pronto para envio para nossa TI.
              </p>
            </div>
          </div>
          <PartyPopper className="w-8 h-8 text-white hidden sm:block animate-pulse" />
        </div>
      )}

      {/* GRID DE TRABALHO: FORMULÁRIO AFETUOSO vs LIVE PREVIEW */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* COLUNA ESQUERDA: FORMULÁRIO INTERATIVO */}
        <div className="xl:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-md p-6 lg:p-8 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Smile className="w-5 h-5 text-amber-500" />
                Conte pra gente a sua visão:
              </h2>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                Leva só 1 minuto
              </span>
            </div>

            <div className="space-y-5">
              
              {/* QUEM É VOCÊ? */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-500" /> Seu Nome (ou deixe em branco se preferir)
                  </label>
                  <input 
                    type="text" 
                    value={nome} 
                    onChange={e => setNome(e.target.value)} 
                    placeholder="Ex: Mariana do Fiscal"
                    className="w-full p-3 rounded-2xl border border-slate-300 bg-slate-50/50 hover:bg-white font-bold text-slate-900 text-xs shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" /> Qual o seu Setor?
                  </label>
                  <select 
                    value={departamento} 
                    onChange={e => setDepartamento(e.target.value)} 
                    className="w-full p-3 rounded-2xl border border-slate-300 bg-slate-50/50 hover:bg-white font-bold text-slate-800 text-xs shadow-inner cursor-pointer transition-all"
                  >
                    <option value="Setor Fiscal">Setor Fiscal</option>
                    <option value="Departamento Pessoal">Departamento Pessoal (DP)</option>
                    <option value="Setor Contábil">Setor Contábil</option>
                    <option value="Societário & Paralegal">Societário & Paralegal</option>
                    <option value="Diretoria & Sócios">Diretoria & Sócios</option>
                    <option value="Outro Setor">Outro Setor</option>
                  </select>
                </div>
              </div>

              {/* CATEGORIAS EM CARDS VISUAIS E INTERATIVOS */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-indigo-500" /> O que você está sugerindo?
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {categoriasConfig.map(cat => {
                    const Icon = cat.icon;
                    const isSelected = categoria === cat.id;

                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setCategoria(cat.id)}
                        className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-2 cursor-pointer active:scale-95 ${
                          isSelected 
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-500/30' 
                            : 'bg-slate-50 hover:bg-slate-100/80 text-slate-700 border-slate-200'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-amber-500 text-slate-950 font-black' : 'bg-white text-slate-600 shadow-2xs'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-black leading-tight">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* IMPACTO ESTIMADO (CARDS COM EMOJI) */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-2 flex items-center gap-1.5">
                  <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" /> Qual o impacto dessa ideia no seu dia?
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {impactosConfig.map(imp => {
                    const isSelected = impacto === imp.id;

                    return (
                      <button
                        type="button"
                        key={imp.id}
                        onClick={() => setImpacto(imp.id)}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer active:scale-95 ${
                          isSelected 
                            ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-500/30 text-amber-950 shadow-2xs' 
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <span className="text-2xl">{imp.emoji}</span>
                        <div>
                          <span className="text-xs font-black block leading-tight">{imp.label}</span>
                          <span className="text-[10px] text-slate-500 leading-tight block">{imp.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TÍTULO DA PROPOSTA */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                  Dê um nome ou título para a sua ideia: *
                </label>
                <input 
                  type="text" 
                  value={titulo} 
                  onChange={e => setTitulo(e.target.value)} 
                  placeholder="Ex: Criar um simulador de parcelamento tributário do Simples"
                  className="w-full p-3 rounded-2xl border border-slate-300 bg-white font-bold text-slate-900 text-xs shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
              </div>

              {/* DESCRIÇÃO COMPLETA */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                  Explique como ela funcionaria: *
                </label>
                <textarea 
                  rows="4"
                  value={descricao} 
                  onChange={e => setDescricao(e.target.value)} 
                  placeholder="Como ela ajudaria seu setor? Quais informações o analista teria que digitar e qual o cálculo ou relatório final que você gostaria de ver na tela?"
                  className="w-full p-3.5 rounded-2xl border border-slate-300 bg-white text-slate-800 text-xs shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none leading-relaxed"
                />
              </div>

              {/* BOTÕES DE ENVIO REAL */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={linkMailto}
                  onClick={handleDispararEmail}
                  className="w-full sm:flex-1 py-4 px-6 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 hover:from-slate-900 hover:to-amber-900 active:scale-95 text-white font-black text-xs rounded-2xl shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2.5 group cursor-pointer border border-amber-500/30"
                >
                  <Rocket className="w-4 h-4 text-amber-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  <span>Enviar Chamado por E-mail</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <button
                  type="button"
                  onClick={handleCopiar}
                  className="w-full sm:w-auto py-4 px-5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-xs rounded-2xl border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  title="Copiar texto estruturado para colar no Teams ou chat"
                >
                  {copiado ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                  <span>{copiado ? 'Copiado para Envio!' : 'Copiar Texto'}</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: LIVE PREVIEW & MURAL DE CONQUISTAS */}
        <div className="xl:col-span-5 space-y-6">
          
          {/* O CARTÃO DA IDEIA GANHANDO VIDA (LIVE PREVIEW) */}
          <div className="rounded-3xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white p-6 shadow-md space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
              <span className="text-[10px] font-mono font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Sua Proposta Ganhando Vida
              </span>
              <span className="text-[10px] font-bold bg-amber-200/80 text-amber-950 px-2 py-0.5 rounded-full">
                Pré-visualização
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {impactosConfig.find(i => i.id === impacto)?.emoji || '💡'}
                </span>
                <span className="text-[10px] font-mono font-bold bg-white text-slate-700 px-2.5 py-0.5 rounded-md border border-amber-200 shadow-2xs">
                  {categoriaNome}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {departamento}
                </span>
              </div>

              <h3 className="font-black text-base text-slate-900 leading-tight">
                {titulo || 'O título da sua ideia aparecerá aqui...'}
              </h3>

              <p className="text-xs text-slate-600 font-sans leading-relaxed italic bg-white/70 p-3 rounded-xl border border-amber-200/60">
                "{descricao || 'Conforme você digita ao lado, sua proposta vai se desenhando neste espaço em tempo real...'}"
              </p>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-amber-200/60">
                <span>Por: <b>{nome || 'Colaborador Qualibra'}</b></span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> Pronto para a TI
                </span>
              </div>
            </div>
          </div>

          {/* MURAL DE CONQUISTAS: O QUE O TIME JÁ SUGERIU E FOI FEITO */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Award className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Mural da Inovação Qualibra
                </h3>
                <p className="text-[11px] text-slate-400">Ideias sugeridas pelo time que já estão no ar</p>
              </div>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <b className="text-slate-900">Grade Mensal no Calendário</b>
                  <span className="text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Entregue</span>
                </div>
                <p className="text-[11px] text-slate-500">Substituição da lista simples por calendário 7x5 com feriados de SP.</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <b className="text-slate-900">Fator R com Custo Marginal</b>
                  <span className="text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Entregue</span>
                </div>
                <p className="text-[11px] text-slate-500">Cálculo de impacto real no IRPF e INSS do sócio além do DAS.</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <b className="text-slate-900">Emissor de Recibos em A4</b>
                  <span className="text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Entregue</span>
                </div>
                <p className="text-[11px] text-slate-500">Conversão de valor por extenso automático e papel timbrado com hash.</p>
              </div>
            </div>
          </div>

          {/* NOTA DE COMPANHEIRISMO DA TI */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-[11px] text-slate-600 flex items-start gap-3 font-mono">
            <Coffee className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              <b>Compromisso da TI:</b> Toda semana nossa equipe senta com um café para ler cada uma das ideias enviadas. A gente programa, testa e coloca no ar pensando em economizar os seus cliques!
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default EnvioIdeiasPage;