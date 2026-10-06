export const FISCAL_EVENTS = [
  {
    id: 'fgts',
    dia: '07',
    nome: 'FGTS Digital Mensal',
    desc: 'Recolhimento referente à folha de pagamento do mês anterior.',
    tag: 'Próximo',
    categoria: 'trabalhista',
    tipo: 'normal'
  },
  {
    id: 'esocial',
    dia: '15',
    nome: 'eSocial & DCTFWeb',
    desc: 'Transmissão das folhas e apuração das contribuições previdenciárias e terceiros.',
    tag: 'Normal',
    categoria: 'obrigacoes',
    tipo: 'normal'
  },
  {
    id: 'das',
    dia: '20',
    nome: 'DAS - Simples Nacional',
    desc: 'Vencimento do Documento de Arrecadação do Simples Nacional (PGDAS-D).',
    tag: 'Urgente',
    categoria: 'tributario',
    tipo: 'alerta'
  },
  {
    id: 'pis-cofins',
    dia: '25',
    nome: 'PIS / COFINS / IPI Mensais',
    desc: 'Recolhimento dos tributos federais para empresas do Lucro Presumido e Real.',
    tag: 'Normal',
    categoria: 'tributario',
    tipo: 'normal'
  },
  {
    id: 'irrf-folha',
    dia: '20',
    nome: 'DARF IRRF (Código 0561)',
    desc: 'Imposto retido na fonte referente a rendimentos do trabalho assalariado e pró-labore.',
    tag: 'Urgente',
    categoria: 'trabalhista',
    tipo: 'alerta'
  },
  {
    id: 'efd-reinf',
    dia: '15',
    nome: 'EFD-Reinf',
    desc: 'Escrituração Fiscal Digital de Retenções e Outras Informações Fiscais.',
    tag: 'Normal',
    categoria: 'obrigacoes',
    tipo: 'normal'
  }
];
