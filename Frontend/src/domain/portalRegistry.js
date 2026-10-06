export const PORTAL_REGISTRY = [
  // --- CÁLCULOS TRIBUTÁRIOS ---
  {
    id: 'reforma-tributaria',
    title: 'Simulador da Reforma Tributária',
    category: 'calculos',
    subCategory: 'Tributário',
    type: 'Calculadora',
    desc: 'Simulação comparativa entre Simples Nacional e Regime Híbrido IBS/CBS (LC 214/2025).',
    route: '/ferramentas/reforma-tributaria',
    icon: 'Calculator'
  },
  {
    id: 'fator-r',
    title: 'Análise do Fator R',
    category: 'calculos',
    subCategory: 'Tributário',
    type: 'Calculadora',
    desc: 'Enquadramento Anexo III vs V e projeção de metas na folha salarial.',
    route: '/ferramentas/fator-r',
    icon: 'PieChart'
  },
  {
    id: 'simples-presumido',
    title: 'Simples vs Lucro Presumido',
    category: 'calculos',
    subCategory: 'Tributário',
    type: 'Comparador',
    desc: 'Comparativo de carga tributária e encargos previdenciários anuais.',
    route: '/ferramentas/simples-presumido',
    icon: 'Scale'
  },

  // --- CÁLCULOS TRABALHISTAS & SOCIEDADE ---
  {
    id: 'rescisao',
    title: 'Simulador de Rescisão CLT',
    category: 'calculos',
    subCategory: 'Trabalhista',
    type: 'Calculadora',
    desc: 'Cálculo de verbas rescisórias, férias proporcionais, 13º e multa FGTS por modalidade.',
    route: '/ferramentas/rescisao',
    icon: 'Users'
  },
  {
    id: 'clt-vs-pj',
    title: 'Comparador CLT vs PJ',
    category: 'calculos',
    subCategory: 'Trabalhista',
    type: 'Comparador',
    desc: 'Custo total corporativo vs remuneração líquida estimada do profissional.',
    route: '/comparadores/clt-pj',
    icon: 'Scale'
  },
  {
    id: 'pro-labore',
    title: 'Pró-Labore x Distribuição de Lucros',
    category: 'calculos',
    subCategory: 'Contábil',
    type: 'Calculadora',
    desc: 'Retenção oficial de INSS (teto previdenciário) e IRRF progressivo da Receita Federal.',
    route: '/ferramentas/pro-labore',
    icon: 'Coins'
  },

  // --- AUDITORIA & GERAÇÃO ---
  {
    id: 'diagnostico-tributario',
    title: 'Diagnóstico Tributário Corporativo',
    category: 'auditoria',
    subCategory: 'Estratégia',
    type: 'Diagnóstico',
    desc: 'Auditoria de regime, proporção de folha e análise de riscos de sublimite.',
    route: '/diagnosticos',
    icon: 'BarChart3'
  },
  {
    id: 'geradores-hub',
    title: 'Gerador de Recibos & Termos',
    category: 'ferramentas',
    subCategory: 'Produtividade',
    type: 'Gerador',
    desc: 'Emissão rápida de recibos de pagamento de autônomos e declarações com cópia e impressão.',
    route: '/geradores',
    icon: 'Printer'
  },

  // --- PROCESSOS & CONFORMIDADE ---
  {
    id: 'checklists-hub',
    title: 'Checklists Operacionais de Processos',
    category: 'processos',
    subCategory: 'Processos',
    type: 'Checklist',
    desc: 'Abertura, Admissão, Demissão e Fechamento com progresso salvo localmente.',
    route: '/checklists',
    icon: 'CheckSquare'
  },
  {
    id: 'calendario-fiscal',
    title: 'Calendário Fiscal & Vencimentos',
    category: 'processos',
    subCategory: 'Obrigações',
    type: 'Agenda',
    desc: 'Vencimentos mensais de impostos federais, estaduais e eSocial/DCTFWeb.',
    route: '/obrigacoes',
    icon: 'CalendarDays'
  },

  // --- SUPORTE, SISTEMAS & RECURSOS ---
  {
    id: 'sistemas-externos',
    title: 'Sistemas Governamentais Oficiais',
    category: 'recursos',
    subCategory: 'Atalhos',
    type: 'Sistemas',
    desc: 'Links diretos para e-CAC, Simples Nacional, eSocial, FGTS Digital, REDESIM e SEFAZ.',
    route: '/sistemas',
    icon: 'ExternalLink'
  },
  {
    id: 'documentos-hub',
    title: 'Modelos de Documentos & Tabelas',
    category: 'recursos',
    subCategory: 'Repositório',
    type: 'Modelos',
    desc: 'Minutas contratuais, procurações e tabelas oficiais para download.',
    route: '/documentos',
    icon: 'FileText'
  },
  {
    id: 'base-conhecimento',
    title: 'Base de Conhecimento (Wiki)',
    category: 'recursos',
    subCategory: 'Procedimentos',
    type: 'Wiki',
    desc: 'Manuais com passo a passo das rotinas fiscais, contábeis e de departamento pessoal.',
    route: '/conhecimento',
    icon: 'BookOpen'
  },
  {
    id: 'ti-infra',
    title: 'TI & Infraestrutura de Rede Local',
    category: 'recursos',
    subCategory: 'Infraestrutura',
    type: 'Rede',
    desc: 'Status dos servidores operacionais, IPs internos e parâmetros de contingência.',
    route: '/ti',
    icon: 'Server'
  }
];