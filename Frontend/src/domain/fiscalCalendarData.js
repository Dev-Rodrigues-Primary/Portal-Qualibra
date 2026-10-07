// Feriados Nacionais Fixos (Base 2026)
export const FERIADOS_NACIONAIS_2026 = [
  '2026-01-01', '2026-02-17', '2026-04-03', '2026-04-21', 
  '2026-05-01', '2026-06-04', '2026-09-07', '2026-10-12', 
  '2026-11-02', '2026-11-15', '2026-11-20', '2026-12-25'
];

function isDiaUtil(data) {
  const ds = data.getDay();
  if (ds === 0 || ds === 6) return false;
  return !FERIADOS_NACIONAIS_2026.includes(data.toISOString().split('T')[0]);
}

export function ajustarVencimento(ano, mes, diaBase, regra) {
  let data = new Date(ano, mes - 1, diaBase);
  // Garante que o mês não avance acidentalmente ao criar o dia 31 em meses curtos
  if (data.getMonth() !== mes - 1) {
    data = new Date(ano, mes, 0); // Pega o último dia do mês correto
  }
  
  if (regra === 'posterga') { 
    while (!isDiaUtil(data)) data.setDate(data.getDate() + 1); 
  } else if (regra === 'antecipa') { 
    while (!isDiaUtil(data)) data.setDate(data.getDate() - 1); 
  }
  return data;
}

export function gerarEventosFiscais(mesAtual = new Date().getMonth() + 1, anoAtual = 2026) {
  const eventosBase = [
    // --- OBRIGAÇÕES MENSAIS ---
    { id: 'fgts-digital', nome: 'FGTS Digital Mensal', diaBase: 20, regra: 'posterga', desc: 'Recolhimento via Pix pelo portal do FGTS Digital.', ambito: 'Trabalhista' },
    { id: 'esocial', nome: 'eSocial & DCTFWeb', diaBase: 15, regra: 'antecipa', desc: 'Fechamento da folha e confissão de dívida previdenciária.', ambito: 'Trabalhista' },
    { id: 'efd-reinf', nome: 'EFD-Reinf', diaBase: 15, regra: 'antecipa', desc: 'Escrituração de retenções (IR, CSLL, PIS, COFINS, INSS) sem vínculo.', ambito: 'Federal' },
    { id: 'das-simples', nome: 'DAS - Simples Nacional', diaBase: 20, regra: 'posterga', desc: 'Apuração e guia unificada PGDAS-D.', ambito: 'Federal' },
    { id: 'pis-cofins', nome: 'DARF PIS / COFINS / IPI', diaBase: 25, regra: 'antecipa', desc: 'Tributos federais cumulativos/não cumulativos (Lucro Presumido/Real).', ambito: 'Federal' },
    { id: 'irrf', nome: 'DARF IRRF (0561/0588)', diaBase: 20, regra: 'antecipa', desc: 'Imposto de Renda Retido na Fonte (Assalariados e Sócios).', ambito: 'Federal' },
    { id: 'icms', nome: 'ICMS (Apuração Normal / ST)', diaBase: 10, regra: 'posterga', desc: 'Vencimento geral estadual (pode variar por UF - regra geral dia 10).', ambito: 'Estadual' },
    { id: 'iss', nome: 'ISS Próprio e Retido', diaBase: 10, regra: 'posterga', desc: 'Vencimento municipal geral (pode variar por Prefeitura).', ambito: 'Municipal' },
    
    // --- OBRIGAÇÕES ANUAIS (Só aparecem no mês correspondente) ---
    { id: 'dirf-informes', nome: 'Informes de Rendimentos', diaBase: 28, regra: 'antecipa', desc: 'Prazo limite para entrega dos informes aos colaboradores/sócios.', ambito: 'Federal', mesEspecifico: 2 },
    { id: 'defis', nome: 'DEFIS (Simples Nacional)', diaBase: 31, regra: 'antecipa', desc: 'Declaração de Informações Socioeconômicas e Fiscais.', ambito: 'Federal', mesEspecifico: 3 },
    { id: 'ecd', nome: 'ECD - Sped Contábil', diaBase: 31, regra: 'antecipa', desc: 'Escrituração Contábil Digital (Livro Diário/Razão).', ambito: 'Federal', mesEspecifico: 5 },
    { id: 'ecf', nome: 'ECF - Sped Fiscal', diaBase: 31, regra: 'antecipa', desc: 'Escrituração Contábil Fiscal (Substituta da DIPJ).', ambito: 'Federal', mesEspecifico: 7 },
  ];

  return eventosBase
    // Filtra obrigações anuais para aparecerem apenas no mês correto
    .filter(ev => !ev.mesEspecifico || ev.mesEspecifico === mesAtual)
    .map(ev => {
      const dataEfetiva = ajustarVencimento(anoAtual, mesAtual, ev.diaBase, ev.regra);
      
      // Definição de Cores por Âmbito (Substituindo o antigo Atrasado/Urgente)
      let badgeClass = 'bg-slate-100 text-slate-700 border-slate-200';
      if (ev.ambito === 'Federal') badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      if (ev.ambito === 'Trabalhista') badgeClass = 'bg-blue-50 text-blue-700 border-blue-200';
      if (ev.ambito === 'Estadual') badgeClass = 'bg-purple-50 text-purple-700 border-purple-200';
      if (ev.ambito === 'Municipal') badgeClass = 'bg-amber-50 text-amber-700 border-amber-200';

      return { 
        ...ev, 
        diaFinal: String(dataEfetiva.getDate()).padStart(2, '0'), 
        dataCompleta: dataEfetiva.toLocaleDateString('pt-BR'),
        badgeClass 
      };
    })
    .sort((a, b) => Number(a.diaFinal) - Number(b.diaFinal));
}