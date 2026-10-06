/**
 * Motor de Cálculo: Reforma Tributária (LC 214/2025)
 */
export function calculateReforma({ rbt12 = 0, recServ = 0, recCom = 0, compras = 0, ano = 2027 }) {
  const safeServ = Math.max(0, recServ);
  const safeCom = Math.max(0, recCom);
  const safeCompras = Math.max(0, compras);

  // Alíquotas efetivas padrão do modelo Simples
  const aliqSimplesServ = 0.1101;
  const aliqSimplesCom = 0.0882;

  const dasSimplesServ = safeServ * aliqSimplesServ;
  const dasSimplesCom = safeCom * aliqSimplesCom;
  const totalSimples = dasSimplesServ + dasSimplesCom;

  // No modelo Híbrido: DAS Reduzido (IRPJ, CSLL, CPP, etc.) + IBS/CBS apurados externamente
  const dasReduzidoServ = safeServ * 0.05;
  const dasReduzidoCom = safeCom * 0.035;
  const dasReduzidoTotal = dasReduzidoServ + dasReduzidoCom;

  // Alíquota IBS/CBS por ano de transição (LC 214/2025)
  let aliqCbsIbs = 0.089;
  if (ano === 2028) aliqCbsIbs = 0.090;
  if (ano === 2029) aliqCbsIbs = 0.115;
  if (ano === 2033) aliqCbsIbs = 0.265; // Alíquota de teste plena

  const baseTributavel = Math.max(0, (safeServ + safeCom) - safeCompras);
  const cbsApurada = baseTributavel * aliqCbsIbs;
  const totalHibrido = dasReduzidoTotal + cbsApurada;

  const diferenca = totalHibrido - totalSimples;
  const simplesVantajoso = diferenca >= 0;

  return {
    totalSimples,
    totalHibrido,
    diferencaAbs: Math.abs(diferenca),
    simplesVantajoso,
    dasSimplesServ,
    dasSimplesCom,
    dasReduzidoServ,
    dasReduzidoCom,
    cbsApurada
  };
}

/**
 * Motor de Cálculo: Fator R (Art. 18, Lei Complementar 123/2006)
 */
export function calculateFatorR({ rbt12 = 0, folha12 = 0 }) {
  const safeRbt12 = Math.max(0, rbt12);
  const safeFolha12 = Math.max(0, folha12);

  if (safeRbt12 === 0) {
    return {
      fatorRPercent: 0,
      anexo: 'Indefinido',
      enquadraAnexo3: false,
      faltaAno: 0,
      faltaMes: 0
    };
  }

  const fatorRDecimal = safeFolha12 / safeRbt12;
  const fatorRPercent = fatorRDecimal * 100;
  const enquadraAnexo3 = fatorRDecimal >= 0.28;

  const folhaMetaAnual = safeRbt12 * 0.28;
  const faltaAno = Math.max(0, folhaMetaAnual - safeFolha12);
  const faltaMes = faltaAno / 12;

  return {
    fatorRPercent,
    anexo: enquadraAnexo3 ? 'Anexo III (Alíquota Menor)' : 'Anexo V (Mais Oneroso)',
    enquadraAnexo3,
    faltaAno,
    faltaMes
  };
}

/**
 * Motor de Cálculo: Simples Nacional vs Lucro Presumido
 */
export function calculateSimplesPresumido({ faturamento = 0, folha = 0, atividade = 'servico' }) {
  const fat = Math.max(0, faturamento);
  const folhaVal = Math.max(0, folha);

  let aliqSimples = atividade === 'servico' ? 0.135 : 0.085;
  if (fat > 1800000) aliqSimples += 0.035;

  let aliqPresumidoImpostosFederais = atividade === 'servico' ? 0.1133 : 0.0593;
  let impostoLocal = atividade === 'servico' ? 0.05 : 0.04; // ISS ou ICMS médio
  let encargoPrevidenciarioPatronal = folhaVal * 0.278; // INSS 20% + RAT + Terceiros no Presumido

  const totalSimples = fat * aliqSimples;
  const totalPresumido = (fat * (aliqPresumidoImpostosFederais + impostoLocal)) + encargoPrevidenciarioPatronal;

  const aliqEfetivaSimples = fat > 0 ? (totalSimples / fat) * 100 : 0;
  const aliqEfetivaPresumido = fat > 0 ? (totalPresumido / fat) * 100 : 0;

  const economiaSimples = totalPresumido - totalSimples;

  return {
    totalSimples,
    totalPresumido,
    aliqEfetivaSimples,
    aliqEfetivaPresumido,
    economiaSimples,
    simplesMelhor: economiaSimples >= 0
  };
}

/**
 * Motor de Cálculo: Rescisão CLT
 */
export function calculateRescisaoCLT({ salarioBase = 0, motivo = 'sem_justa_causa', meses = 0, saldoFgts = 0 }) {
  const sal = Math.max(0, salarioBase);
  const m = Math.min(12, Math.max(0, parseInt(meses, 10) || 0));
  const fgts = Math.max(0, saldoFgts);

  const decimoTerceiro = (sal / 12) * m;
  const feriasProporcionais = (sal / 12) * m;
  const tercoConstitucional = feriasProporcionais / 3;
  const totalFerias = feriasProporcionais + tercoConstitucional;

  let aliquotaMultaFgts = 0;
  let temDireitoMulta = false;

  if (motivo === 'sem_justa_causa') {
    aliquotaMultaFgts = 0.40;
    temDireitoMulta = true;
  } else if (motivo === 'acordo') {
    aliquotaMultaFgts = 0.20; // Art. 484-A CLT
    temDireitoMulta = true;
  } else {
    // Pedido de demissão
    aliquotaMultaFgts = 0;
    temDireitoMulta = false;
  }

  const multaFgts = fgts * aliquotaMultaFgts;
  const totalRescisao = decimoTerceiro + totalFerias + (temDireitoMulta ? multaFgts : 0);

  return {
    decimoTerceiro,
    totalFerias,
    multaFgts,
    aliquotaMultaFgts: aliquotaMultaFgts * 100,
    totalRescisao,
    temDireitoMulta
  };
}

/**
 * Motor de Cálculo: Pró-Labore x Distribuição de Lucros (Tabela Oficial IRRF + INSS)
 */
export function calculateProlabore({ valor = 0 }) {
  const pl = Math.max(0, valor);

  // Teto INSS 2025/2026 (~R$ 908,85 com base no teto salarial)
  const tetoInss = 908.85;
  const inss = Math.min(pl * 0.11, tetoInss);

  const baseCalculoIrrf = Math.max(0, pl - inss);

  // Tabela Progressiva do IRRF
  let irrf = 0;
  if (baseCalculoIrrf <= 2259.20) {
    irrf = 0;
  } else if (baseCalculoIrrf <= 2826.65) {
    irrf = (baseCalculoIrrf * 0.075) - 169.44;
  } else if (baseCalculoIrrf <= 3751.05) {
    irrf = (baseCalculoIrrf * 0.15) - 381.44;
  } else if (baseCalculoIrrf <= 4664.68) {
    irrf = (baseCalculoIrrf * 0.225) - 662.77;
  } else {
    irrf = (baseCalculoIrrf * 0.275) - 896.00;
  }

  irrf = Math.max(0, irrf);
  const liquido = Math.max(0, pl - inss - irrf);
  const aliquotaEfetiva = pl > 0 ? ((inss + irrf) / pl) * 100 : 0;

  return {
    prolaboreBruto: pl,
    inss,
    irrf,
    prolaboreLiquido: liquido,
    totalRetencoes: inss + irrf,
    aliquotaEfetiva
  };
}
