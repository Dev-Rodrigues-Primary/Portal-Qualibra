function getDomingoDePascoa(ano) {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(ano, mes - 1, dia);
}

function formatYYYYMMDD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getFeriadosOficiais(ano, praca = 'SP') {
  const pascoa = getDomingoDePascoa(ano);

  // Feriados Móveis Nacionais Oficiais
  const carnaval = new Date(pascoa);
  carnaval.setDate(pascoa.getDate() - 47);

  const sextaSanta = new Date(pascoa);
  sextaSanta.setDate(pascoa.getDate() - 2);

  const corpusChristi = new Date(pascoa);
  corpusChristi.setDate(pascoa.getDate() + 60);

  // Feriados Nacionais Fixos (Leis Federais nº 662/49, 10.607/02 e 14.759/23)
  const feriados = [
    `${ano}-01-01`, // Confraternização Universal
    `${ano}-04-21`, // Tiradentes
    `${ano}-05-01`, // Dia do Trabalho
    `${ano}-09-07`, // Independência
    `${ano}-10-12`, // N. Sra. Aparecida
    `${ano}-11-02`, // Finados
    `${ano}-11-15`, // Proclamação da República
    `${ano}-11-20`, // Consciência Negra (Nacional permanente)
    `${ano}-12-25`, // Natal
    formatYYYYMMDD(carnaval),
    formatYYYYMMDD(sextaSanta),
    formatYYYYMMDD(corpusChristi)
  ];

  // Feriados Regionais do Estado de São Paulo e Capital (Matriz Qualibra)
  if (praca === 'SP') {
    feriados.push(`${ano}-01-25`); // Aniversário de São Paulo (Municipal Capital)
    feriados.push(`${ano}-07-09`); // Revolução Constitucionalista (Estadual SP - Lei nº 9.497/97)
  }

  return feriados;
}

export function isDiaUtil(data, feriadosLista) {
  const ds = data.getDay();
  if (ds === 0 || ds === 6) return false;
  const iso = formatYYYYMMDD(data);
  return !feriadosLista.includes(iso);
}

export function ajustarVencimento(ano, mes, diaBase, regra, praca = 'SP') {
  const feriados = getFeriadosOficiais(ano, praca);
  let data = new Date(ano, mes - 1, diaBase);
  
  if (data.getMonth() !== mes - 1) {
    data = new Date(ano, mes, 0);
  }
  
  if (regra === 'posterga') { 
    while (!isDiaUtil(data, feriados)) {
      data.setDate(data.getDate() + 1); 
    }
  } else if (regra === 'antecipa') { 
    while (!isDiaUtil(data, feriados)) {
      data.setDate(data.getDate() - 1); 
    }
  }
  return data;
}

export function gerarEventosFiscais(mesAtual = new Date().getMonth() + 1, anoAtual = new Date().getFullYear(), praca = 'SP') {
  const eventosBase = [
    { 
      id: 'icms', 
      nome: 'ICMS (Apuração Normal / ST)', 
      diaBase: 10, 
      regra: 'posterga', 
      desc: 'Regra geral estadual dia 10 (prorroga para o dia útil seguinte considerando feriados da praça).', 
      ambito: 'Estadual',
      tipo: 'Pagamento'
    },
    { 
      id: 'iss', 
      nome: 'ISS Próprio e Retenções', 
      diaBase: 10, 
      regra: 'posterga', 
      desc: 'Regra geral municipal dia 10 (ajustado para a praça selecionada).', 
      ambito: 'Municipal',
      tipo: 'Pagamento'
    },
    { 
      id: 'esocial-reinf-envio', 
      nome: 'eSocial & EFD-Reinf (Fechamento da Folha)', 
      diaBase: 15, 
      regra: 'antecipa', 
      desc: 'Transmissão eletrônica de folhas, retenções e eventos periódicos (antecipa se cair em dia não útil).', 
      ambito: 'Trabalhista',
      tipo: 'Envio Declaratório'
    },
    { 
      id: 'fgts-digital', 
      nome: 'FGTS Digital Mensal (Pix Oficial)', 
      diaBase: 20, 
      regra: 'antecipa', 
      desc: 'Recolhimento via Pix pelo portal FGTS Digital (Art. 15 da Lei 8.036/90: antecipa se dia 20 não for dia útil).', 
      ambito: 'Trabalhista',
      tipo: 'Pagamento'
    },
    { 
      id: 'dctfweb-darf', 
      nome: 'DCTFWeb (DARF Previdenciário & IRRF Folha)', 
      diaBase: 20, 
      regra: 'antecipa', 
      desc: 'Guia unificada numerada da DCTFWeb para recolhimento de INSS e IRRF da folha (IN RFB 2.005/21).', 
      ambito: 'Federal',
      tipo: 'Pagamento'
    },
    { 
      id: 'das-simples', 
      nome: 'DAS — Simples Nacional (PGDAS-D)', 
      diaBase: 20, 
      regra: 'posterga', 
      desc: 'Guia única unificada do Simples Nacional apurada via PGDAS-D (prorroga para o 1º dia útil seguinte).', 
      ambito: 'Federal',
      tipo: 'Pagamento'
    },
    { 
      id: 'pis-cofins-ipi', 
      nome: 'DARF PIS / COFINS / IPI (Mensal)', 
      diaBase: 25, 
      regra: 'antecipa', 
      desc: 'Tributos federais do Lucro Presumido e Real (Art. 18 Lei 11.933/09: último dia útil do 2º decêndio).', 
      ambito: 'Federal',
      tipo: 'Pagamento'
    },
    { 
      id: 'informes-rendimento', 
      nome: 'Informes de Rendimentos (IRPF Sócio/CLT)', 
      diaBase: 28, 
      regra: 'antecipa', 
      desc: 'Prazo limite legal para disponibilização dos comprovantes de rendimentos pagos aos beneficiários.', 
      ambito: 'Federal', 
      mesEspecifico: 2,
      tipo: 'Envio Declaratório'
    },
    { 
      id: 'defis', 
      nome: 'DEFIS — Declaração Anual Simples Nacional', 
      diaBase: 31, 
      regra: 'antecipa', 
      desc: 'Prestação anual de contas socioeconômicas e fiscais das empresas optantes pelo Simples Nacional.', 
      ambito: 'Federal', 
      mesEspecifico: 3,
      tipo: 'Envio Declaratório'
    },
    { 
      id: 'ecd', 
      nome: 'ECD — Escrituração Contábil Digital (Sped)', 
      diaBase: 31, 
      regra: 'antecipa', 
      desc: 'Transmissão do Livro Diário, Razão e Balancetes ao SPED Contábil.', 
      ambito: 'Federal', 
      mesEspecifico: 5,
      tipo: 'Envio Declaratório'
    },
    { 
      id: 'ecf', 
      nome: 'ECF — Escrituração Contábil Fiscal (Sped)', 
      diaBase: 31, 
      regra: 'antecipa', 
      desc: 'Substituta da DIPJ com apuração anual do IRPJ e da CSLL para Lucro Real e Presumido.', 
      ambito: 'Federal', 
      mesEspecifico: 7,
      tipo: 'Envio Declaratório'
    },
  ];

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return eventosBase
    .filter(ev => !ev.mesEspecifico || ev.mesEspecifico === mesAtual)
    .map(ev => {
      const dataEfetiva = ajustarVencimento(anoAtual, mesAtual, ev.diaBase, ev.regra, praca);
      dataEfetiva.setHours(0, 0, 0, 0);

      const diffTime = dataEfetiva.getTime() - hoje.getTime();
      const diffDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let statusUrgencia = { label: 'No Prazo', class: 'bg-slate-100 text-slate-700 border-slate-200' };
      if (diffDias < 0) {
        statusUrgencia = { label: 'Vencido', class: 'bg-rose-100 text-rose-800 border-rose-300' };
      } else if (diffDias === 0) {
        statusUrgencia = { label: 'Vence Hoje!', class: 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse' };
      } else if (diffDias <= 3) {
        statusUrgencia = { label: `Vence em ${diffDias}d`, class: 'bg-orange-100 text-orange-900 border-orange-300 font-bold' };
      }

      let badgeClass = 'bg-slate-100 text-slate-700 border-slate-200';
      if (ev.ambito === 'Federal') badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      if (ev.ambito === 'Trabalhista') badgeClass = 'bg-indigo-50 text-indigo-800 border-indigo-200';
      if (ev.ambito === 'Estadual') badgeClass = 'bg-purple-50 text-purple-800 border-purple-200';
      if (ev.ambito === 'Municipal') badgeClass = 'bg-amber-50 text-amber-800 border-amber-200';

      const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
      const diaDaSemanaExtenso = diasSemana[dataEfetiva.getDay()];

      return { 
        ...ev, 
        diaFinal: String(dataEfetiva.getDate()).padStart(2, '0'), 
        dataCompleta: dataEfetiva.toLocaleDateString('pt-BR'),
        diaDaSemanaExtenso,
        diffDias,
        statusUrgencia,
        badgeClass 
      };
    })
    .sort((a, b) => Number(a.diaFinal) - Number(b.diaFinal));
}