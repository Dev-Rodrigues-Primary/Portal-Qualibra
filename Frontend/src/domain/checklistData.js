// ============================================================================
// PROCEDIMENTOS OPERACIONAIS PADRÃO (POP) & ROTINAS CONTÁBEIS QUALIBRA
// ============================================================================

export const ROTINAS_OPERACIONAIS = [
  {
    id: 'abertura',
    nome: 'Constituição & Abertura de Empresa',
    categoria: 'Societário & Paralegal',
    descricao: 'Rito legal completo perante Junta Comercial, Receita Federal, SEFAZ e Prefeitura.',
    etapas: [
      { id: 'ab-1', titulo: 'Consulta Prévia de Viabilidade e Nome Empresarial', orgao: 'Junta Comercial', baseLegal: 'DREI nº 81/2020' },
      { id: 'ab-2', titulo: 'Preenchimento e Coleta do DBE no Coletor Nacional da RFB', orgao: 'Receita Federal', baseLegal: 'IN RFB nº 2.119/2022' },
      { id: 'ab-3', titulo: 'Elaboração e Assinatura do Contrato Social / Requerimento de Empresário', orgao: 'Jurídico Interno', baseLegal: 'Código Civil Art. 997' },
      { id: 'ab-4', titulo: 'Protocolo Eletrônico e Registro na Junta Comercial / Cartório', orgao: 'Junta Comercial', baseLegal: 'Lei nº 8.934/1994' },
      { id: 'ab-5', titulo: 'Emissão e Validação do Comprovante de Inscrição e Situação Cadastral (CNPJ)', orgao: 'Receita Federal', baseLegal: 'IN RFB nº 2.119/2022' },
      { id: 'ab-6', titulo: 'Emissão da Inscrição Municipal (CCM) e Enquadramento Tributário no ISS', orgao: 'Prefeitura', baseLegal: 'Código Tributário Municipal' },
      { id: 'ab-7', titulo: 'Solicitação de Inscrição Estadual (SEFAZ - Obrigatório para Comércio/Indústria)', orgao: 'SEFAZ Estadual', baseLegal: 'RICMS' },
      { id: 'ab-8', titulo: 'Licenciamento Sanitário, Ambiental e Auto de Vistoria do Corpo de Bombeiros (AVCB)', orgao: 'Órgãos Reguladores', baseLegal: 'Lei de Liberdade Econômica' },
      { id: 'ab-9', titulo: 'Emissão e Validação do Certificado Digital e-CNPJ (Padrão ICP-Brasil A1)', orgao: 'Autoridade Certificadora', baseLegal: 'MP nº 2.200-2/2001' },
      { id: 'ab-10', titulo: 'Opção pelo Regime Tributário do Simples Nacional (Prazo de até 30 dias)', orgao: 'Portal do Simples', baseLegal: 'Resolução CGSN nº 140/2018' }
    ]
  },
  {
    id: 'admissao',
    nome: 'Admissão de Colaborador CLT',
    categoria: 'Departamento Pessoal',
    descricao: 'Conformidade trabalhista de entrada e transmissão preventiva ao eSocial.',
    etapas: [
      { id: 'adm-1', titulo: 'Coleta de Documentação Completa do Colaborador (CPF, PIS, Comprovante Residência)', orgao: 'DP Interno', baseLegal: 'Portaria MTP nº 671/2021' },
      { id: 'adm-2', titulo: 'Realização e Arquivamento do Exame Médico Admissional (ASO)', orgao: 'Medicina do Trabalho', baseLegal: 'NR-7 (Portaria MTP 6.734)' },
      { id: 'adm-3', titulo: 'Assinatura do Contrato Individual de Trabalho, Termo de Vale-Transporte e Dependentes', orgao: 'DP Interno', baseLegal: 'CLT Art. 442 e 443' },
      { id: 'adm-4', titulo: 'Registro Eletrônico na Carteira de Trabalho Digital (CTPS Digital)', orgao: 'MTE / eSocial', baseLegal: 'Portaria SEPRT nº 1.065/2019' },
      { id: 'adm-5', titulo: 'Transmissão do Evento Prévio S-2190 ou Evento Definitivo S-2200 ao eSocial', orgao: 'eSocial vS-1.2', baseLegal: 'Manual de Orientação eSocial' },
      { id: 'adm-6', titulo: 'Cadastro do Empregado no Sistema de Folha de Pagamento Interno', orgao: 'Software ERP', baseLegal: 'Controle Corporativo' },
      { id: 'adm-7', titulo: 'Parametrização de Benefícios (VR, VA, Plano de Saúde, Seguro de Vida)', orgao: 'DP Interno', baseLegal: 'Convenção Coletiva (CCT)' },
      { id: 'adm-8', titulo: 'Integração e Protocolo de Recebimento de EPIs e Regimento Interno', orgao: 'Segurança do Trabalho', baseLegal: 'NR-6' }
    ]
  },
  {
    id: 'rescisao',
    nome: 'Desligamento & Homologação Rescisória',
    categoria: 'Departamento Pessoal',
    descricao: 'Rito de desligamento contratual, geração da GRRF/FGTS Digital e evento S-2299.',
    etapas: [
      { id: 'resc-1', titulo: 'Emissão e Assinatura do Termo de Notificação de Aviso Prévio (Trabalhado ou Indenizado)', orgao: 'DP Interno', baseLegal: 'Lei nº 12.506/2011' },
      { id: 'resc-2', titulo: 'Encaminhamento e Realização do Exame Médico Demissional (ASO Demissional)', orgao: 'Medicina do Trabalho', baseLegal: 'NR-7' },
      { id: 'resc-3', titulo: 'Cálculo e Apuração das Verbas Rescisórias no TRCT (Saldo, 13º, Férias + 1/3)', orgao: 'DP Interno', baseLegal: 'CLT Art. 477' },
      { id: 'resc-4', titulo: 'Geração e Transmissão do Evento de Desligamento S-2299 ao eSocial', orgao: 'eSocial vS-1.2', baseLegal: 'MOS eSocial' },
      { id: 'resc-5', titulo: 'Emissão da Guia Rescisória do FGTS Digital via Pix (Prazo de até 10 dias corridos)', orgao: 'FGTS Digital', baseLegal: 'Lei nº 14.438/2022' },
      { id: 'resc-6', titulo: 'Geração do Requerimento de Seguro-Desemprego (Se demissão sem justa causa)', orgao: 'Portal Empregador Web', baseLegal: 'Resolução CODEFAT' },
      { id: 'resc-7', titulo: 'Liquidação Financeira e Pagamento do TRCT Líquido na Conta do Colaborador', orgao: 'Tesouraria', baseLegal: 'CLT Art. 477, § 6º' },
      { id: 'resc-8', titulo: 'Colheita da Assinatura do Empregado no TRCT e Entrega do Comprovante de Quitação', orgao: 'DP Interno', baseLegal: 'CLT Art. 477, § 2º' }
    ]
  },
  {
    id: 'fechamento',
    nome: 'Fechamento Mensal Fiscal & DCTFWeb',
    categoria: 'Fiscal & Tributário',
    descricao: 'Conferência de livros, apuração de impostos e confissão de dívida na DCTFWeb.',
    etapas: [
      { id: 'fec-1', titulo: 'Importação e Validação de Todas as NF-e, NFS-e e NFC-e Emitidas e Recebidas', orgao: 'Escrituração Fiscal', baseLegal: 'SPED Fiscal' },
      { id: 'fec-2', titulo: 'Conferência de Retenções na Fonte (IRRF, CSRF, PIS, COFINS, ISS e INSS Retido)', orgao: 'Auditoria Fiscal', baseLegal: 'RIR/2018' },
      { id: 'fec-3', titulo: 'Transmissão da EFD-Reinf com Retenções de Serviços Tomados e Prestados (Até dia 15)', orgao: 'Receita Federal', baseLegal: 'IN RFB nº 2.043/2021' },
      { id: 'fec-4', titulo: 'Apuração e Transmissão do PGDAS-D com Emissão da Guia DAS do Simples Nacional', orgao: 'Portal do Simples', baseLegal: 'Resolução CGSN nº 140/2018' },
      { id: 'fec-5', titulo: 'Apuração de Impostos do Lucro Presumido/Real (IRPJ, CSLL, PIS, COFINS, IPI)', orgao: 'Receita Federal', baseLegal: 'Lei nº 9.718/1998' },
      { id: 'fec-6', titulo: 'Fechamento e Transmissão da Folha no eSocial (Evento S-1299) para a DCTFWeb', orgao: 'eSocial / DCTFWeb', baseLegal: 'IN RFB nº 2.005/2021' },
      { id: 'fec-7', titulo: 'Conferência, Transmissão e Emissão do DARF Numerado da DCTFWeb (Até dia 20)', orgao: 'DCTFWeb', baseLegal: 'IN RFB nº 2.005/2021' },
      { id: 'fec-8', titulo: 'Envio das Guias de Tributos e Relatórios Fiscais com Protocolo de Ciência ao Cliente', orgao: 'Atendimento Qualibra', baseLegal: 'Controle de Conformidade' }
    ]
  }
];