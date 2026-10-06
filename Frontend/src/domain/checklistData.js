export const DEFAULT_CHECKLISTS = {
  abertura: {
    id: 'abertura',
    title: 'Abertura de Empresa',
    departamento: 'Societário',
    items: [
      { id: 'ab-1', text: 'Consulta Prévia de Viabilidade e Nome Empresarial', done: true },
      { id: 'ab-2', text: 'Elaboração e Assinatura do Contrato Social / Requerimento', done: true },
      { id: 'ab-3', text: 'Protocolo e Registro na Junta Comercial / Cartório (DBE)', done: true },
      { id: 'ab-4', text: 'Geração do Número do CNPJ na Receita Federal', done: false },
      { id: 'ab-5', text: 'Emissão da Inscrição Municipal (CCM)', done: false },
      { id: 'ab-6', text: 'Solicitação de Inscrição Estadual (SEFAZ - se aplicável)', done: false },
      { id: 'ab-7', text: 'Alvará de Funcionamento / Licenciamento Ambiental / Bombeiros', done: false },
      { id: 'ab-8', text: 'Emissão do Certificado Digital e-CNPJ (A1 ou A3)', done: false },
      { id: 'ab-9', text: 'Cadastro e Procuração Eletrônica no e-CAC e Prefeitura', done: false },
      { id: 'ab-10', text: 'Opção pelo Regime Tributário no prazo regulamentar (ex: Simples)', done: false }
    ]
  },
  admissao: {
    id: 'admissao',
    title: 'Admissão de Colaborador CLT',
    departamento: 'Departamento Pessoal',
    items: [
      { id: 'ad-1', text: 'Coleta de Documentos Pessoais (RG, CPF, Comprovante de Residência)', done: true },
      { id: 'ad-2', text: 'Realização de Exame Médico Admissional (ASO)', done: true },
      { id: 'ad-3', text: 'Cadastro do PIS e verificação da CTPS Digital', done: false },
      { id: 'ad-4', text: 'Declaração de Dependentes para Salário-Família e IRRF', done: false },
      { id: 'ad-5', text: 'Termo de Opção de Vale-Transporte e Benefícios', done: false },
      { id: 'ad-6', text: 'Elaboração do Contrato de Trabalho e Acordo de Prorrogação', done: false },
      { id: 'ad-7', text: 'Envio do Evento S-2200 ao eSocial no prazo prévio obrigatório', done: false }
    ]
  },
  demissao: {
    id: 'demissao',
    title: 'Desligamento / Rescisão de Contrato',
    departamento: 'Departamento Pessoal',
    items: [
      { id: 'dm-1', text: 'Emissão e assinatura do Aviso Prévio (Trabalhado ou Indenizado)', done: true },
      { id: 'dm-2', text: 'Agendamento do Exame Médico Demissional', done: false },
      { id: 'dm-3', text: 'Cálculo das verbas no Simulador de Rescisão e Emissão do TRCT', done: false },
      { id: 'dm-4', text: 'Geração e pagamento da Guia FGTS Rescisório (GRRF / FGTS Digital)', done: false },
      { id: 'dm-5', text: 'Envio do Evento S-2299 (Desligamento) ao eSocial', done: false },
      { id: 'dm-6', text: 'Fornecimento da Chave de Saque e Guias de Seguro-Desemprego', done: false }
    ]
  },
  fechamento_fiscal: {
    id: 'fechamento_fiscal',
    title: 'Fechamento Mensal Fiscal',
    departamento: 'Fiscal',
    items: [
      { id: 'ff-1', text: 'Importação e validação de todas as NF-e / NFS-e / NFC-e emitidas', done: false },
      { id: 'ff-2', text: 'Verificação de CFOP e conciliação de entradas e saídas', done: false },
      { id: 'ff-3', text: 'Apuração do PGDAS-D (Simples Nacional) e geração da guia DAS', done: false },
      { id: 'ff-4', text: 'Apuração de PIS, COFINS, IRPJ e CSLL (Lucro Presumido)', done: false },
      { id: 'ff-5', text: 'Transmissão da DCTFWeb e emissão do DARF Previdenciário', done: false },
      { id: 'ff-6', text: 'Fechamento da EFD-Reinf sem inconsistências', done: false }
    ]
  }
};