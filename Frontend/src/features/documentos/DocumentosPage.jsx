import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Search, 
  Filter, 
  ShieldCheck, 
  FileCode, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Lock, 
  Eye, 
  ArrowDownToLine,
  Building2,
  Scale
} from 'lucide-react';

const DOCUMENTOS_OFICIAIS = [
  {
    id: 'contrato-prestacao',
    nome: 'Contrato de Prestação de Serviços Contábeis',
    categoria: 'Contratos',
    formato: 'DOCX',
    tamanho: '45 KB',
    versao: 'CFC 1.590/2020',
    desc: 'Minuta contratual completa com cláusulas expressas de adequação à LGPD, responsabilidades recíprocas, honorários e obrigações do cliente.',
    conteudo: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS CONTÁBEIS E ASSESSORIA FISCAL\n\nCONTRATANTE: [Razão Social / Nome], CNPJ/CPF nº [Número], com sede em [Endereço Completo].\nCONTRATADA: GRUPO QUALIBRA CONTABILIDADE, inscrita no CNPJ sob o nº [Número], com registro regular no CRC/SP.\n\nCLÁUSULA PRIMEIRA - DO OBJETO\nO presente contrato tem por objeto a prestação de serviços técnicos de assessoria contábil, fiscal e de departamento pessoal, em conformidade com as normas emanadas pelo Conselho Federal de Contabilidade (CFC nº 1.590/2020).\n\nCLÁUSULA SEGUNDA - DA PROTEÇÃO DE DADOS (LGPD)\nAs partes comprometem-se a cumprir integralmente as disposições da Lei Federal nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais - LGPD), utilizando os dados estritamente para o cumprimento das obrigações legais e contratuais.\n\nCLÁUSULA TERCEIRA - DOS HONORÁRIOS\nPelos serviços ajustados, a CONTRATANTE pagará à CONTRATADA o valor mensal de R$ [Valor], com vencimento todo dia [Dia] de cada mês.\n\nSão Paulo, [Data Atual].\n\n___________________________________\nCONTRATANTE\n\n___________________________________\nGRUPO QUALIBRA CONTABILIDADE`
  },
  {
    id: 'procuracao-rfb',
    nome: 'Modelo de Procuração e-CAC / Receita Federal',
    categoria: 'Procurações',
    formato: 'DOCX',
    tamanho: '32 KB',
    versao: 'Padrão RFB',
    desc: 'Procuração específica para outorga de poderes de representação fiscal, envio de DCTFWeb, eSocial, parcelamentos e consultas no e-CAC.',
    conteudo: `PROCURAÇÃO ESPECÍFICA PARA REPRESENTAÇÃO PERANTE A RECEITA FEDERAL DO BRASIL\n\nOUTORGANTE: [Razão Social], inscrita no CNPJ sob o nº [Número], representada por seu administrador [Nome], CPF nº [Número].\nOUTORGADA: GRUPO QUALIBRA CONTABILIDADE, CNPJ nº [Número], CRC/SP nº [Número].\n\nPODERES:\nPor este instrumento particular de mandato, o OUTORGANTE outorga à OUTORGADA amplos poderes para representá-lo perante a Secretaria da Receita Federal do Brasil (RFB) e Procuradoria-Geral da Fazenda Nacional (PGFN), podendo requerer certidões, assinar e transmitir DCTFWeb, EFD-Reinf, eSocial, consultar situação fiscal, celebrar parcelamentos e praticar todos os atos pertinentes à gestão contábil.\n\nSão Paulo, [Data Atual].\n\n___________________________________\nOUTORGANTE`
  },
  {
    id: 'declaracao-faturamento',
    nome: 'Declaração de Faturamento dos Últimos 12 Meses',
    categoria: 'Declarações',
    formato: 'DOCX',
    tamanho: '28 KB',
    versao: 'Bancário / PJ',
    desc: 'Modelo formal timbrado com discriminação mês a mês para comprovação de renda corporativa e obtenção de crédito bancário.',
    conteudo: `DECLARAÇÃO FORMAL DE FATURAMENTO CORPORATIVO\n\nDeclaramos para os devidos fins de comprovação técnica e financeira junto a instituições bancárias que a empresa [Razão Social do Cliente], inscrita no CNPJ sob o nº [Número], auferiu nos últimos 12 (doze) meses o faturamento bruto discriminado abaixo:\n\nMês 01: R$ [Valor]\nMês 02: R$ [Valor]\nMês 03: R$ [Valor]\nMês 04: R$ [Valor]\nMês 05: R$ [Valor]\nMês 06: R$ [Valor]\nMês 07: R$ [Valor]\nMês 08: R$ [Valor]\nMês 09: R$ [Valor]\nMês 10: R$ [Valor]\nMês 11: R$ [Valor]\nMês 12: R$ [Valor]\n\nFATURAMENTO TOTAL ACUMULADO (12M): R$ [Valor Total]\n\nSão Paulo, [Data Atual].\n\n___________________________________\nGRUPO QUALIBRA CONTABILIDADE\nContador Responsável • CRC/SP`
  },
  {
    id: 'distrato-responsabilidade',
    nome: 'Termo de Transferência de Responsabilidade Técnica (Distrato)',
    categoria: 'Contratos',
    formato: 'DOCX',
    tamanho: '40 KB',
    versao: 'CFC 1.493/2015',
    desc: 'Documento obrigatório pelo Conselho de Contabilidade para formalizar a rescisão amigável de serviços e a entrega de livros e senhas.',
    conteudo: `TERMO DE RESCISÃO CONTRATUAL E TRANSFERÊNCIA DE RESPONSABILIDADE TÉCNICA (DISTRATO)\n\nEm conformidade com a Resolução CFC nº 1.493/2015, as partes:\n[Razão Social do Cliente] (CLIENTE) e GRUPO QUALIBRA CONTABILIDADE (CONTRATADA ANTERIOR), declaram rescindido o contrato de prestação de serviços a partir da competência [Mês/Ano].\n\nCLÁUSULA ÚNICA - DA ENTREGA DE DOCUMENTOS E LIVROS\nA CONTRATADA transfere ao novo responsável técnico ou ao próprio cliente todo o acervo de livros diários, certidões, comprovantes de transmissão e senhas de acesso, cessando sua responsabilidade técnica a partir desta data.\n\nSão Paulo, [Data Atual].\n\n___________________________________\nCLIENTE\n\n___________________________________\nGRUPO QUALIBRA CONTABILIDADE`
  },
  {
    id: 'declaracao-prolabore',
    nome: 'Declaração Comprobatória de Rendimentos (Pró-Labore)',
    categoria: 'Declarações',
    formato: 'DOCX',
    tamanho: '26 KB',
    versao: 'DECORE Alternativo',
    desc: 'Comprovante oficial de remuneração societária e recolhimento de INSS do sócio para comprovação de renda pessoa física.',
    conteudo: `DECLARAÇÃO DE RENDIMENTOS DE PRÓ-LABORE DE SÓCIO ADMINISTRADOR\n\nAtestamos que o Sr(a). [Nome do Sócio], portador do CPF nº [Número], na qualidade de sócio administrador da empresa [Razão Social], CNPJ nº [Número], aufere mensalmente a título de Pró-Labore a quantia bruta de R$ [Valor], sofrendo as retenções devidas de INSS e IRPF na forma da legislação vigente.\n\nSão Paulo, [Data Atual].\n\n___________________________________\nGRUPO QUALIBRA CONTABILIDADE\nDepartamento Pessoal & Controladoria`
  },
  {
    id: 'tabela-simples',
    nome: 'Tabela Completa de Anexos do Simples Nacional',
    categoria: 'Tabelas',
    formato: 'PDF',
    tamanho: '110 KB',
    versao: 'LC 123/2006 Atual',
    desc: 'Resumo com as 6 faixas de faturamento, alíquotas nominais e parcelas a deduzir dos Anexos I (Comércio), III (Serviços) e V (Oneroso).',
    conteudo: `TABELA OFICIAL DE ANEXOS DO SIMPLES NACIONAL (LC 123/2006)\n\nANEXO I - COMÉRCIO:\nFaixa 1 (até R$ 180k): 4,00% (Dedução R$ 0)\nFaixa 2 (até R$ 360k): 7,30% (Dedução R$ 5.940)\nFaixa 3 (até R$ 720k): 9,50% (Dedução R$ 13.860)\nFaixa 4 (até R$ 1.800k): 10,70% (Dedução R$ 22.500)\nFaixa 5 (até R$ 3.600k): 14,30% (Dedução R$ 87.300)\nFaixa 6 (até R$ 4.800k): 19,00% (Dedução R$ 378.000)\n\nANEXO III - SERVIÇOS GERAIS:\nFaixa 1 (até R$ 180k): 6,00% (Dedução R$ 0)\nFaixa 2 (até R$ 360k): 11,20% (Dedução R$ 9.360)\nFaixa 3 (até R$ 720k): 13,50% (Dedução R$ 17.640)\nFaixa 4 (até R$ 1.800k): 16,00% (Dedução R$ 35.640)\nFaixa 5 (até R$ 3.600k): 21,00% (Dedução R$ 125.640)\nFaixa 6 (até R$ 4.800k): 33,00% (Dedução R$ 648.000)`
  },
  {
    id: 'tabela-inss-irrf',
    nome: 'Tabela de Incidência Progressiva INSS e IRRF (2026)',
    categoria: 'Tabelas',
    formato: 'PDF',
    tamanho: '95 KB',
    versao: 'Previdência & RFB',
    desc: 'Tabela atualizada com teto de contribuição previdenciária e faixas progressivas do Imposto de Renda com desconto simplificado.',
    conteudo: `TABELA PREVIDENCIÁRIA & TRIBUTÁRIA OFICIAL 2026\n\nINSS PROGRESSIVO (RGPS):\nAté R$ 1.518,00: 7,5% (Dedução: R$ 0,00)\nDe R$ 1.518,01 até R$ 2.793,88: 9,0% (Dedução: R$ 22,77)\nDe R$ 2.793,89 até R$ 4.190,83: 12,0% (Dedução: R$ 106,58)\nDe R$ 4.190,84 até R$ 8.157,41: 14,0% (Dedução: R$ 190,40)\nTeto Máximo de Recolhimento: R$ 951,63\n\nIRRF PROGRESSIVO MENSAL:\nFaixa Isenta: até R$ 2.259,20\nFaixa 1 (7,5%): até R$ 2.826,65 (Dedução: R$ 169,44)\nFaixa 2 (15,0%): até R$ 3.751,05 (Dedução: R$ 381,44)\nFaixa 3 (22,5%): até R$ 4.664,68 (Dedução: R$ 659,44)\nFaixa 4 (27,5%): acima de R$ 4.664,68 (Dedução: R$ 896,00)\nDesconto Simplificado Mensal Permitido: R$ 564,80`
  },
  {
    id: 'termo-reforma-hibrido',
    nome: 'Termo de Ciência da Reforma Tributária (Regime Híbrido)',
    categoria: 'Procurações',
    formato: 'DOCX',
    tamanho: '38 KB',
    versao: 'LC 214/2025',
    desc: 'Termo de alinhamento com o cliente para a opção pelo regime regular de IBS/CBS fora do DAS a partir de 2027.',
    conteudo: `TERMO DE CIÊNCIA E OPÇÃO ESTRATÉGICA - REFORMA TRIBUTÁRIA (LC 214/2025)\n\nA empresa [Razão Social do Cliente], CNPJ nº [Número], por meio de seu representante legal, declara ter recebido da consultoria GRUPO QUALIBRA CONTABILIDADE a simulação do impacto da Reforma Tributária do Consumo.\n\nO cliente declara ciência de que:\n1. A opção pelo Regime Híbrido (IBS e CBS recolhidos pelo regime regular não-cumulativo) implica na apropriação de créditos sobre compras B2B e na redução das alíquotas do Simples Nacional;\n2. A decisão semestral é irretratável perante o Comitê Gestor do Simples Nacional nos prazos estipulados pela Resolução CGSN nº 194/2026.\n\nSão Paulo, [Data Atual].\n\n___________________________________\nCLIENTE REPRESENTANTE LEGAL`
  }
];

export function DocumentosPage() {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [copiadoId, setCopiadoId] = useState(null);

  const categorias = [
    { id: 'Todos', label: 'Todos os Documentos' },
    { id: 'Contratos', label: 'Minutas Contratuais' },
    { id: 'Procurações', label: 'Procurações & Termos' },
    { id: 'Declarações', label: 'Declarações Oficiais' },
    { id: 'Tabelas', label: 'Tabelas & Parâmetros Fiscais' }
  ];

  const documentosFiltrados = useMemo(() => {
    return DOCUMENTOS_OFICIAIS.filter(doc => {
      const matchCat = categoriaAtiva === 'Todos' || doc.categoria === categoriaAtiva;
      const term = busca.toLowerCase();
      const matchBusca = !term || 
        doc.nome.toLowerCase().includes(term) ||
        doc.desc.toLowerCase().includes(term) ||
        doc.categoria.toLowerCase().includes(term);
      return matchCat && matchBusca;
    });
  }, [busca, categoriaAtiva]);

  // Download REAL via Blob (.doc estruturado)
  const handleDownload = (doc) => {
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const conteudoProcessado = doc.conteudo.replace(/\[Data Atual\]/g, dataAtual);

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${doc.nome}</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 10px; margin-bottom: 25px; }
        .title { font-size: 14pt; font-weight: bold; text-transform: uppercase; }
        .subtitle { font-size: 9pt; color: #64748b; }
        .content { white-space: pre-wrap; text-align: justify; }
        .footer { margin-top: 30px; font-size: 8pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; }
      </style>
      </head>
      <body>
        <div class="header">
          <div class="title">GRUPO QUALIBRA CONTABILIDADE</div>
          <div class="subtitle">Repositório de Documentos Homologados • portalqualibra.local</div>
        </div>
        <div class="content">${conteudoProcessado}</div>
        <div class="footer">Documento gerado em ${dataAtual} • Controle Interno Qualibra</div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.id}-qualibra.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopiarTexto = (doc) => {
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const conteudoProcessado = doc.conteudo.replace(/\[Data Atual\]/g, dataAtual);
    navigator.clipboard.writeText(conteudoProcessado);
    setCopiadoId(doc.id);
    setTimeout(() => setCopiadoId(null), 2500);
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in-up">
      
      {/* BREADCRUMBS */}
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Acervo Técnico' }, { label: 'Central de Documentos & Modelos Homologados' }]} />
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
                Repositório Institucional Qualibra
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                <ShieldCheck className="w-3 h-3" /> Padrão CFC & Legislação Vigente 2026
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Central de Documentos, Minutas e Tabelas
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Modelos de contratos contábeis, procurações da Receita Federal, declarações de faturamento e tabelas oficiais com download direto para o Word ou cópia instantânea.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15 text-xs font-mono text-slate-300 text-center sm:text-right">
              <span className="text-[10px] uppercase text-emerald-400 block font-bold">Total de Modelos:</span>
              <span className="font-bold text-white">{DOCUMENTOS_OFICIAIS.length} arquivos validados</span>
            </div>
          </div>
        </div>
      </div>

      {/* PAINEL DE BUSCA & FILTROS POR CATEGORIA */}
      <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md p-5 lg:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input 
              type="text" 
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar por nome, formato ou assunto (ex: contrato, procuração, faturamento)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 text-xs shadow-inner focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
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

          <span className="text-xs font-mono text-slate-500 self-start md:self-auto">
            {documentosFiltrados.length} modelos exibidos
          </span>
        </div>

        {/* ABAS DE CATEGORIA */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Categoria:
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

      {/* GRID DE CARDS DOS DOCUMENTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {documentosFiltrados.map(doc => {
          let badgeFormato = 'bg-blue-50 text-blue-700 border-blue-200';
          if (doc.formato === 'PDF') badgeFormato = 'bg-rose-50 text-rose-700 border-rose-200';
          if (doc.formato === 'XLSX') badgeFormato = 'bg-emerald-50 text-emerald-700 border-emerald-200';

          const isCopiado = copiadoId === doc.id;

          return (
            <div
              key={doc.id}
              className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-2xs hover:shadow-md hover:border-indigo-400/60 transition-all duration-200 flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                
                {/* TOPO: FORMATO + VERSÃO */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${badgeFormato}`}>
                    {doc.formato} • {doc.tamanho}
                  </span>

                  <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    {doc.versao}
                  </span>
                </div>

                {/* TÍTULO */}
                <div>
                  <h3 className="font-black text-slate-900 text-sm tracking-tight group-hover:text-indigo-950 transition-colors">
                    {doc.nome}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-indigo-700 block mt-0.5">
                    {doc.categoria}
                  </span>
                </div>

                {/* DESCRIÇÃO */}
                <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-3">
                  {doc.desc}
                </p>
              </div>

              {/* BOTÕES DE AÇÃO: COPIAR MINUTA + BAIXAR EM DOC */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => handleCopiarTexto(doc)}
                  className="flex-1 py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Copiar texto completo da minuta"
                >
                  {isCopiado ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{isCopiado ? 'Copiado!' : 'Copiar'}</span>
                </button>

                <button
                  onClick={() => handleDownload(doc)}
                  className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  title="Baixar arquivo formatado para Word"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Baixar .doc</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* NOTA DE AUDITORIA & VALIDADE JURÍDICA */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-[11px] text-slate-600 flex items-start gap-3 font-mono">
        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          <b>Segurança Jurídica & Responsabilidade Profissional:</b> Todos os modelos de contratos e distratos deste repositório respeitam as diretrizes de ética e responsabilidade civil do Conselho Federal de Contabilidade (CFC). As minutas geradas podem ser customizadas no Microsoft Word pelo analista encarregado da escrituração.
        </span>
      </div>

    </div>
  );
}

export default DocumentosPage;