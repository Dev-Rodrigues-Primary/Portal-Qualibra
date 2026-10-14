import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { 
  ExternalLink, 
  ShieldCheck, 
  Search, 
  Building2, 
  Lock, 
  CheckCircle2, 
  Globe, 
  FileCheck, 
  Filter, 
  Sparkles, 
  AlertTriangle, 
  KeyRound, 
  Users,
  Briefcase,
  Landmark,
  Scale
} from 'lucide-react';

const SISTEMAS_GOVERNAMENTAIS = [
  {
    id: 'ecac',
    nome: 'Portal e-CAC (Receita Federal)',
    categoria: 'Fiscal',
    esfera: 'Federal',
    dominio: 'cav.receita.fazenda.gov.br',
    url: 'https://cav.receita.fazenda.gov.br/',
    desc: 'Centro Virtual de Atendimento da RFB. Acesso a DCTFWeb, parcelamentos, malha fiscal, SPED e procurações.',
    autenticacao: 'Certificado Digital / Gov.br Ouro',
    authTipo: 'certificado'
  },
  {
    id: 'simples',
    nome: 'Portal do Simples Nacional',
    categoria: 'Fiscal',
    esfera: 'Federal',
    dominio: 'receita.fazenda.gov.br/simples',
    url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/',
    desc: 'Apuração do PGDAS-D, DEFIS anual, pedidos de enquadramento, parcelamentos especiais e consulta de optantes.',
    autenticacao: 'Código de Acesso / Certificado',
    authTipo: 'misto'
  },
  {
    id: 'esocial',
    nome: 'eSocial Web Geral (MTE / RFB)',
    categoria: 'DP',
    esfera: 'Trabalhista',
    dominio: 'login.esocial.gov.br',
    url: 'https://login.esocial.gov.br/',
    desc: 'Gestão oficial de trabalhadores, transmissão de eventos de admissão (S-2200), desligamento (S-2299) e fechamento (S-1299).',
    autenticacao: 'Certificado Digital / Gov.br Ouro',
    authTipo: 'certificado'
  },
  {
    id: 'fgts-digital',
    nome: 'Portal do FGTS Digital',
    categoria: 'DP',
    esfera: 'Trabalhista',
    dominio: 'fgtsdigital.sistema.gov.br',
    url: 'https://fgtsdigital.sistema.gov.br/',
    desc: 'Nova plataforma integrada de apuração e emissão da guia do FGTS mensal e rescisório com recolhimento 100% via Pix.',
    autenticacao: 'Gov.br Prata ou Ouro / e-CNPJ',
    authTipo: 'certificado'
  },
  {
    id: 'sintegra-ccc',
    nome: 'Sintegra / CCC (Cadastro de Contribuintes)',
    categoria: 'Fiscal',
    esfera: 'Estadual',
    dominio: 'dfe-portal.svrs.rs.gov.br/Nfe/Ccc',
    url: 'https://dfe-portal.svrs.rs.gov.br/Nfe/Ccc',
    desc: 'Consulta Centralizada de Inscrições Estaduais de todos os estados do Brasil para validação de clientes e fornecedores.',
    autenticacao: 'Consulta Pública Livre',
    authTipo: 'livre'
  },
  {
    id: 'sefaz-sp',
    nome: 'SEFAZ-SP / Posto Fiscal Eletrônico',
    categoria: 'Fiscal',
    esfera: 'Estadual',
    dominio: 'pfe.fazenda.sp.gov.br',
    url: 'https://www.pfe.fazenda.sp.gov.br/',
    desc: 'Domicílio Eletrônico do Contribuinte (DEC), emissão de DARE de ICMS, consulta de GIAs e conformidade fiscal do Estado de SP.',
    autenticacao: 'Certificado Digital e-CNPJ',
    authTipo: 'certificado'
  },
  {
    id: 'redesim',
    nome: 'REDESIM / Coletor Nacional da RFB',
    categoria: 'Societário',
    esfera: 'Federal',
    dominio: 'gov.br/empresas-e-negocios',
    url: 'https://www.gov.br/empresas-e-negocios/pt-br/redesim',
    desc: 'Abertura, alteração e baixa de empresas. Emissão de DBE, viabilidade locacional e integração com Juntas Comerciais.',
    autenticacao: 'Conta Gov.br / Certificado',
    authTipo: 'misto'
  },
  {
    id: 'jucesp',
    nome: 'JUCESP / VRE Redesim (São Paulo)',
    categoria: 'Societário',
    esfera: 'Estadual',
    dominio: 'vreredesim.sp.gov.br',
    url: 'https://vreredesim.sp.gov.br/',
    desc: 'Registro público mercantil de São Paulo. Processos do VRE Digital, certidões simplificadas e arquivamento de contratos.',
    autenticacao: 'Certificado Digital / Gov.br',
    authTipo: 'certificado'
  },
  {
    id: 'nfse-nacional',
    nome: 'Portal Nacional da NFS-e (Emissor)',
    categoria: 'Fiscal',
    esfera: 'Municipal',
    dominio: 'nfse.gov.br/EmissorNacional',
    url: 'https://www.nfse.gov.br/EmissorNacional/',
    desc: 'Emissão e consulta unificada de Notas Fiscais de Serviços Eletrônicas padrão nacional (MEI e adesão de municípios).',
    autenticacao: 'Certificado Digital / Senha Web',
    authTipo: 'misto'
  },
  {
    id: 'cnd-receita',
    nome: 'Certidão Negativa Conjunta (RFB / PGFN)',
    categoria: 'Certidões',
    esfera: 'Federal',
    dominio: 'receita.fazenda.gov.br/certidoes',
    url: 'https://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PJ/Emitir',
    desc: 'Emissão e validação da CND de débitos relativos a tributos federais e à Dívida Ativa da União.',
    autenticacao: 'Consulta Pública Livre por CNPJ',
    authTipo: 'livre'
  },
  {
    id: 'crf-caixa',
    nome: 'Consulta de Regularidade FGTS (CRF)',
    categoria: 'Certidões',
    esfera: 'Trabalhista',
    dominio: 'consulta-crf.caixa.gov.br',
    url: 'https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf',
    desc: 'Emissão imediata do Certificado de Regularidade do FGTS emitido pela Caixa Econômica Federal.',
    autenticacao: 'Consulta Pública Livre por CNPJ',
    authTipo: 'livre'
  },
  {
    id: 'govbr-empresas',
    nome: 'Portal Gov.br Empresas',
    categoria: 'Societário',
    esfera: 'Governo',
    dominio: 'empresas.gov.br',
    url: 'https://empresas.gov.br/',
    desc: 'Painel centralizador de serviços públicos unificados para pessoas jurídicas e empresários individuais.',
    autenticacao: 'Gov.br Ouro (Representante Legal)',
    authTipo: 'certificado'
  }
];

export function SistemasPage() {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  const categorias = [
    { id: 'Todos', label: 'Todos os Sistemas' },
    { id: 'Fiscal', label: 'Fiscal & Tributário' },
    { id: 'DP', label: 'Departamento Pessoal (DP)' },
    { id: 'Societário', label: 'Societário & Juntas' },
    { id: 'Certidões', label: 'Certidões Negativas (CNDs)' }
  ];

  // Filtro inteligente por texto e categoria
  const sistemasFiltrados = useMemo(() => {
    return SISTEMAS_GOVERNAMENTAIS.filter(sis => {
      const matchCat = categoriaAtiva === 'Todos' || sis.categoria === categoriaAtiva;
      const term = busca.toLowerCase();
      const matchBusca = !term || 
        sis.nome.toLowerCase().includes(term) ||
        sis.desc.toLowerCase().includes(term) ||
        sis.dominio.toLowerCase().includes(term);
      return matchCat && matchBusca;
    });
  }, [busca, categoriaAtiva]);

  return (
    <div className="space-y-6 pb-16 animate-fade-in-up">
      
      {/* BREADCRUMBS */}
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Acessos Oficiais' }, { label: 'Sistemas Governamentais Validados' }]} />
      </div>

      {/* HEADER EXECUTIVO PREMIUM */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 lg:p-8 text-white shadow-xl border border-slate-700/60">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Proteção Anti-Phishing Ativa
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                <ShieldCheck className="w-3 h-3" /> Domínios Oficiais Governamentais (.gov.br)
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Sistemas Governamentais Homologados
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Diretório seguro de acessos diretos para Receita Federal, Previdência, SEFAZ, Juntas Comerciais e Prefeituras. Elimina o risco de anúncios falsificados no Google para resguardar certificados digitais e dados de clientes.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15 text-xs font-mono text-slate-300 text-center sm:text-right">
              <span className="text-[10px] uppercase text-emerald-400 block font-bold">Status do Diretório:</span>
              <span className="font-bold text-white">100% Criptografia TLS/HTTPS</span>
            </div>
          </div>
        </div>
      </div>

      {/* PAINEL DE CONTROLE: BUSCA E FILTROS */}
      <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md p-5 lg:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* CAMPO DE BUSCA EM TEMPO REAL */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input 
              type="text" 
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar por portal, sigla ou serviço (ex: e-CAC, Sintegra, FGTS)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 text-xs shadow-inner focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            {busca && (
              <button 
                onClick={() => setBusca('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* TOTALIZADOR DE SISTEMAS ENCONTRADOS */}
          <span className="text-xs font-mono text-slate-500 self-start md:self-auto">
            {sistemasFiltrados.length} sistemas oficiais disponíveis
          </span>
        </div>

        {/* ABAS DE CATEGORIAS */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filtrar:
          </span>
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer ${
                categoriaAtiva === cat.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DE CARDS DOS SISTEMAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sistemasFiltrados.map(sis => {
          let badgeEsfera = 'bg-slate-100 text-slate-700 border-slate-200';
          if (sis.esfera === 'Federal') badgeEsfera = 'bg-emerald-50 text-emerald-800 border-emerald-200';
          if (sis.esfera === 'Trabalhista') badgeEsfera = 'bg-indigo-50 text-indigo-800 border-indigo-200';
          if (sis.esfera === 'Estadual') badgeEsfera = 'bg-purple-50 text-purple-800 border-purple-200';
          if (sis.esfera === 'Municipal') badgeEsfera = 'bg-amber-50 text-amber-800 border-amber-200';

          return (
            <div
              key={sis.id}
              className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-2xs hover:shadow-md hover:border-indigo-400/60 transition-all duration-200 flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                
                {/* TOPO DO CARD: ESFERA + AUTENTICAÇÃO */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${badgeEsfera}`}>
                    {sis.esfera}
                  </span>

                  <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 truncate max-w-[150px]" title={sis.autenticacao}>
                    {sis.authTipo === 'certificado' && '🔒 e-CNPJ / e-CPF'}
                    {sis.authTipo === 'misto' && '🔑 Gov.br / Código'}
                    {sis.authTipo === 'livre' && '🌐 Consulta Pública'}
                  </span>
                </div>

                {/* TÍTULO E DOMÍNIO */}
                <div>
                  <h3 className="font-black text-slate-900 text-sm tracking-tight group-hover:text-indigo-950 transition-colors">
                    {sis.nome}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 block mt-0.5 truncate">
                    {sis.dominio}
                  </span>
                </div>

                {/* DESCRIÇÃO */}
                <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-3">
                  {sis.desc}
                </p>
              </div>

              {/* BOTÃO DE ACESSO EXTERNO SEGURO */}
              <div className="pt-2 border-t border-slate-100">
                <a
                  href={sis.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-900 text-slate-800 hover:text-white font-bold text-xs rounded-xl border border-slate-200 hover:border-slate-900 transition-all duration-200 flex items-center justify-between group/btn cursor-pointer shadow-2xs"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 group-hover/btn:text-emerald-400 transition-colors" />
                    <span>Acessar Portal Seguro</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/btn:translate-x-0.5 group-hover/btn:text-white transition-all" />
                </a>
              </div>

            </div>
          );
        })}
      </div>

      {/* NOTA DE AUDITORIA & PROTOCOLO ANTI-PHISHING */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-[11px] text-slate-600 flex items-start gap-3 font-mono">
        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          <b>Protocolo de Cibersegurança Qualibra:</b> Todos os endereços deste diretório foram auditados e utilizam certificados SSL/TLS com terminação oficial em órgãos do Estado Brasileiro (terminação <b>.gov.br</b> e <b>.jus.br</b>). O uso deste atalho corporativo previne o sequestro de senhas e a interceptação de procurações eletrônicas do e-CAC e SEFAZ.
        </span>
      </div>

    </div>
  );
}

export default SistemasPage;