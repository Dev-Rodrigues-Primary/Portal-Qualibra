/**
 * TABELAS OFICIAIS DO SIMPLES NACIONAL (LC 123/2006)
 * Anexo I (Comércio) e Anexo III (Serviços)
 */
const TABELA_ANEXO_I = [
  { limite: 180000, aliq: 0.0400, deducao: 0 },
  { limite: 360000, aliq: 0.0730, deducao: 5940 },
  { limite: 720000, aliq: 0.0950, deducao: 13860 },
  { limite: 1800000, aliq: 0.1070, deducao: 22500 },
  { limite: 3600000, aliq: 0.1430, deducao: 87300 },
  { limite: 4800000, aliq: 0.1900, deducao: 378000 }
];

const TABELA_ANEXO_III = [
  { limite: 180000, aliq: 0.0600, deducao: 0 },
  { limite: 360000, aliq: 0.1120, deducao: 9360 },
  { limite: 720000, aliq: 0.1350, deducao: 17640 },
  { limite: 1800000, aliq: 0.1600, deducao: 35640 },
  { limite: 3600000, aliq: 0.2100, deducao: 125640 },
  { limite: 4800000, aliq: 0.3300, deducao: 648000 }
];

const TABELA_ANEXO_V = [
  { limite: 180000, aliq: 0.1550, deducao: 0 },
  { limite: 360000, aliq: 0.1800, deducao: 4500 },
  { limite: 720000, aliq: 0.1950, deducao: 9900 },
  { limite: 1800000, aliq: 0.2050, deducao: 17100 },
  { limite: 3600000, aliq: 0.2300, deducao: 62100 },
  { limite: 4800000, aliq: 0.3050, deducao: 540000 }
];

function calcularAliquotaEfetivaSimples(rbt12, tabela) {
  const rbt = Math.max(1, rbt12);
  let faixa = tabela[tabela.length - 1];
  for (const f of tabela) {
    if (rbt <= f.limite) {
      faixa = f;
      break;
    }
  }
  const aliqEfetiva = ((rbt * faixa.aliq) - faixa.deducao) / rbt;
  return Math.max(0.04, Math.min(0.33, aliqEfetiva));
}

/**
 * 1. REFORMA TRIBUTÁRIA (LC 214/2025 & IBS/CBS)
 */
export function calculateReforma({ rbt12 = 0, recServ = 0, recCom = 0, compras = 0, ano = 2027 }) {
  const safeRbt = Math.max(1000, rbt12);
  const safeServ = Math.max(0, recServ);
  const safeCom = Math.max(0, recCom);
  const safeCompras = Math.max(0, compras);

  // Alíquotas efetivas progressivas reais da LC 123/2006
  const aliqSimplesServ = calcularAliquotaEfetivaSimples(safeRbt, TABELA_ANEXO_III);
  const aliqSimplesCom = calcularAliquotaEfetivaSimples(safeRbt, TABELA_ANEXO_I);

  const dasSimplesServ = safeServ * aliqSimplesServ;
  const dasSimplesCom = safeCom * aliqSimplesCom;
  const totalSimples = dasSimplesServ + dasSimplesCom;

  // Alíquota de transição IBS/CBS conforme LC 214/2025
  let aliqCbsIbs = 0.089;
  let fatorReducaoDas = 0.45; // Percentual mantido no DAS (IRPJ, CSLL, CPP)

  if (ano === 2026) {
    aliqCbsIbs = 0.010; // Teste 1% (0.9% CBS + 0.1% IBS)
    fatorReducaoDas = 0.95;
  } else if (ano === 2027 || ano === 2028) {
    aliqCbsIbs = 0.089; // CBS Plena 8.8% + IBS teste 0.1%
    fatorReducaoDas = 0.65;
  } else if (ano === 2029) {
    aliqCbsIbs = 0.125; // Início transição ICMS/ISS
    fatorReducaoDas = 0.55;
  } else if (ano === 2033) {
    aliqCbsIbs = 0.265; // Alíquota Plena definitiva estimada
    fatorReducaoDas = 0.35;
  }

  // DAS Reduzido no Regime Híbrido
  const dasReduzidoServ = safeServ * (aliqSimplesServ * fatorReducaoDas);
  const dasReduzidoCom = safeCom * (aliqSimplesCom * fatorReducaoDas);
  const dasReduzidoTotal = dasReduzidoServ + dasReduzidoCom;

  // CBS/IBS com crédito sobre compras comprovadas
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
    aliqSimplesServ: aliqSimplesServ * 100,
    aliqSimplesCom: aliqSimplesCom * 100,
    dasSimplesServ,
    dasSimplesCom,
    dasReduzidoServ,
    dasReduzidoCom,
    cbsApurada,
    aliqCbsIbs: aliqCbsIbs * 100
  };
}

/**
 * 2. ANÁLISE DE FATOR R (LC 123/2006, art. 18)
 */
export function calculateFatorR({ rbt12 = 0, folha12 = 0, receitaMensal = 0 }) {
  const safeRbt12 = Math.max(0, rbt12);
  const safeFolha12 = Math.max(0, folha12);
  const recMes = receitaMensal > 0 ? receitaMensal : (safeRbt12 / 12);

  if (safeRbt12 === 0) {
    return {
      fatorRPercent: 0,
      anexo: 'Indefinido',
      enquadraAnexo3: false,
      faltaAno: 0,
      faltaMes: 0,
      aliqAnexo3: 6,
      aliqAnexo5: 15.5,
      impostoAnexo3: 0,
      impostoAnexo5: 0,
      economiaMensal: 0
    };
  }

  const fatorRDecimal = safeFolha12 / safeRbt12;
  const fatorRPercent = fatorRDecimal * 100;
  const enquadraAnexo3 = fatorRDecimal >= 0.28;

  const folhaMetaAnual = safeRbt12 * 0.28;
  const faltaAno = Math.max(0, folhaMetaAnual - safeFolha12);
  const faltaMes = faltaAno / 12;

  const aliqAnexo3 = calcularAliquotaEfetivaSimples(safeRbt12, TABELA_ANEXO_III);
  const aliqAnexo5 = calcularAliquotaEfetivaSimples(safeRbt12, TABELA_ANEXO_V);

  const impostoAnexo3 = recMes * aliqAnexo3;
  const impostoAnexo5 = recMes * aliqAnexo5;
  const economiaMensal = impostoAnexo5 - impostoAnexo3;

  return {
    fatorRPercent,
    anexo: enquadraAnexo3 ? 'Anexo III (Alíquota Reduzida)' : 'Anexo V (Mais Oneroso)',
    enquadraAnexo3,
    faltaAno,
    faltaMes,
    aliqAnexo3: aliqAnexo3 * 100,
    aliqAnexo5: aliqAnexo5 * 100,
    impostoAnexo3,
    impostoAnexo5,
    economiaMensal
  };
}

/**
 * 3. SIMPLES NACIONAL VS LUCRO PRESUMIDO (Regras Oficiais RFB)
 */
export function calculateSimplesPresumido({ faturamento = 0, folha = 0, atividade = 'servico' }) {
  const fat = Math.max(0, faturamento);
  const folhaVal = Math.max(0, folha);

  // 1. Simples Nacional
  const tabela = atividade === 'servico' ? TABELA_ANEXO_III : TABELA_ANEXO_I;
  const aliqSimples = calcularAliquotaEfetivaSimples(fat, tabela);
  const totalSimples = fat * aliqSimples;

  // 2. Lucro Presumido
  const percPresuncaoIr = atividade === 'servico' ? 0.32 : 0.08;
  const percPresuncaoCsll = atividade === 'servico' ? 0.32 : 0.12;

  const baseIrpj = fat * percPresuncaoIr;
  const baseCsll = fat * percPresuncaoCsll;

  const irpjBasico = baseIrpj * 0.15;
  // Adicional IRPJ: 10% sobre lucro presumido que exceder R$ 240.000 ao ano (R$ 20.000/mês)
  const adicionalIrpj = Math.max(0, baseIrpj - 240000) * 0.10;
  const totalIrpj = irpjBasico + adicionalIrpj;

  const totalCsll = baseCsll * 0.09;
  const pis = fat * 0.0065;   // 0.65% cumulativo
  const cofins = fat * 0.03;  // 3.00% cumulativo
  const impostoLocal = atividade === 'servico' ? (fat * 0.035) : (fat * 0.045); // ISS médio 3.5% ou ICMS 4.5%

  // CPP no Presumido: 20% patronal + 2.5% RAT + 5.8% Terceiros = 28.3% sobre folha
  const encargosPatronais = folhaVal * 0.283;

  const totalPresumido = totalIrpj + totalCsll + pis + cofins + impostoLocal + encargosPatronais;

  const aliqEfetivaSimples = fat > 0 ? (totalSimples / fat) * 100 : 0;
  const aliqEfetivaPresumido = fat > 0 ? (totalPresumido / fat) * 100 : 0;
  const economiaSimples = totalPresumido - totalSimples;

  return {
    totalSimples,
    totalPresumido,
    aliqEfetivaSimples,
    aliqEfetivaPresumido,
    economiaSimples,
    simplesMelhor: economiaSimples >= 0,
    detalhesPresumido: {
      irpj: totalIrpj,
      csll: totalCsll,
      pis,
      cofins,
      impostoLocal,
      encargosPatronais
    }
  };
}

/**
 * 4. SIMULADOR DE RESCISÃO CLT (CLT + Lei 12.506/2011 + Tabela Oficial INSS)
 */
export function calculateRescisaoCLT({
  salarioBase = 0,
  motivo = 'sem_justa_causa',
  mesesTrabalhados = 0,
  anosCompletos = 0,
  saldoFgts = 0
}) {
  const sal = Math.max(0, salarioBase);
  const m = Math.min(12, Math.max(0, parseInt(mesesTrabalhados, 10) || 0));
  const anos = Math.max(0, parseInt(anosCompletos, 10) || 0);
  const fgts = Math.max(0, saldoFgts);

  // Aviso Prévio Proporcional (Lei 12.506/2011: 30 dias + 3 por ano completo, max 90)
  const diasAvisoPrevio = Math.min(90, 30 + (anos * 3));
  const valorAvisoPrevio = (sal / 30) * diasAvisoPrevio;

  const decimoTerceiro = (sal / 12) * m;
  const feriasProporcionais = (sal / 12) * m;
  const tercoConstitucional = feriasProporcionais / 3;
  const totalFerias = feriasProporcionais + tercoConstitucional;

  let avisoPrevioAReceber = 0;
  let multaFgts = 0;
  let percentualMulta = 0;
  let saqueFgtsPermitido = 0;

  if (motivo === 'sem_justa_causa') {
    avisoPrevioAReceber = valorAvisoPrevio;
    percentualMulta = 40;
    multaFgts = fgts * 0.40;
    saqueFgtsPermitido = fgts + multaFgts;
  } else if (motivo === 'acordo') {
    // Demissão por acordo mútuo (Art. 484-A CLT)
    avisoPrevioAReceber = valorAvisoPrevio * 0.50; // Metade do aviso
    percentualMulta = 20;
    multaFgts = fgts * 0.20;
    saqueFgtsPermitido = (fgts * 0.80) + multaFgts; // Saque de até 80% do saldo
  } else if (motivo === 'pedido') {
    // Pedido de demissão
    avisoPrevioAReceber = 0;
    percentualMulta = 0;
    multaFgts = 0;
    saqueFgtsPermitido = 0;
  } else if (motivo === 'com_justa_causa') {
    return {
      decimoTerceiro: 0,
      totalFerias: 0,
      avisoPrevio: 0,
      diasAvisoPrevio: 0,
      multaFgts: 0,
      percentualMulta: 0,
      saqueFgtsPermitido: 0,
      totalRescisaoBruto: 0,
      descontoInssEstimado: 0,
      totalLiquidoEstimado: 0
    };
  }

  const totalBruto = decimoTerceiro + totalFerias + avisoPrevioAReceber + multaFgts;

  // Desconto estimativo de INSS sobre verbas salariais (13º)
  const inssSobre13 = Math.min(decimoTerceiro * 0.09, 850);
  const totalLiquido = totalBruto - inssSobre13;

  return {
    decimoTerceiro,
    totalFerias,
    avisoPrevio: avisoPrevioAReceber,
    diasAvisoPrevio,
    multaFgts,
    percentualMulta,
    saqueFgtsPermitido,
    totalRescisaoBruto: totalBruto,
    descontoInssEstimado: inssSobre13,
    totalLiquidoEstimado: totalLiquido
  };
}

/**
 * 5. PRÓ-LABORE X LUCROS (Tabela Oficial IRRF RFB + Teto INSS 2025/2026)
 */
export function calculateProlabore({ valor = 0 }) {
  const pl = Math.max(0, valor);

  // Teto INSS 2025/2026: R$ 8.157,41 -> 11% = R$ 897,32
  const tetoInssRecolhimento = 897.32;
  const inss = Math.min(pl * 0.11, tetoInssRecolhimento);

  const baseIrrf = Math.max(0, pl - inss);

  // Tabela Progressiva Oficial RFB
  let irrf = 0;
  let aliquotaNominalIrrf = 0;

  if (baseIrrf <= 2259.20) {
    irrf = 0;
    aliquotaNominalIrrf = 0;
  } else if (baseIrrf <= 2826.65) {
    irrf = (baseIrrf * 0.075) - 169.44;
    aliquotaNominalIrrf = 7.5;
  } else if (baseIrrf <= 3751.05) {
    irrf = (baseIrrf * 0.15) - 381.44;
    aliquotaNominalIrrf = 15.0;
  } else if (baseIrrf <= 4664.68) {
    irrf = (baseIrrf * 0.225) - 662.77;
    aliquotaNominalIrrf = 22.5;
  } else {
    irrf = (baseIrrf * 0.275) - 896.00;
    aliquotaNominalIrrf = 27.5;
  }

  irrf = Math.max(0, irrf);
  const liquido = Math.max(0, pl - inss - irrf);
  const totalRetencoes = inss + irrf;
  const aliquotaEfetiva = pl > 0 ? (totalRetencoes / pl) * 100 : 0;

  return {
    prolaboreBruto: pl,
    inss,
    irrf,
    aliquotaNominalIrrf,
    prolaboreLiquido: liquido,
    totalRetencoes,
    aliquotaEfetiva
  };
}

/**
 * 6. COMPARADOR CLT VS PJ (Custo Corporativo Real vs Líquido do Profissional)
 */
export function calculateCltVsPj({ salarioClt = 0, valorPj = 0, regimeEmpresa = 'simples' }) {
  const sal = Math.max(0, salarioClt);
  const notaPj = Math.max(0, valorPj);

  // 1. Custo para a Empresa no Modelo CLT
  const fgts = sal * 0.08;
  const provisao13 = sal * 0.0833;
  const provisaoFerias = sal * 0.1111; // Férias + 1/3
  const encargosPatronais = regimeEmpresa === 'presumido' ? (sal * 0.283) : 0;
  const beneficiosMedios = 600; // VR/VT/Plano médio
  const custoEmpresaClt = sal + fgts + provisao13 + provisaoFerias + encargosPatronais + beneficiosMedios;

  // 2. Líquido do Empregado CLT
  const inssClt = Math.min(sal * 0.11, 897.32);
  const baseIrClt = Math.max(0, sal - inssClt);
  let irrfClt = 0;
  if (baseIrClt > 4664.68) irrfClt = (baseIrClt * 0.275) - 896;
  else if (baseIrClt > 3751.05) irrfClt = (baseIrClt * 0.225) - 662.77;
  else if (baseIrClt > 2826.65) irrfClt = (baseIrClt * 0.15) - 381.44;
  else if (baseIrClt > 2259.20) irrfClt = (baseIrClt * 0.075) - 169.44;
  irrfClt = Math.max(0, irrfClt);
  const liquidoClt = sal - inssClt - irrfClt + (beneficiosMedios * 0.8);

  // 3. Modelo PJ
  const impostoPj = notaPj * 0.06; // Simples Nacional Anexo III (6%)
  const contabilidadePj = 300;
  const prolaborePj = 1412; // 1 Salário Mínimo
  const inssPj = prolaborePj * 0.11;
  const liquidoPj = Math.max(0, notaPj - impostoPj - contabilidadePj - inssPj);

  // Ponto de equilíbrio estimado (PJ equivalente ao CLT)
  const pjEquivalente = custoEmpresaClt * 0.90;

  return {
    custoEmpresaClt,
    liquidoClt,
    custoEmpresaPj: notaPj,
    liquidoPj,
    diferencaLiquido: liquidoPj - liquidoClt,
    pjEquivalente,
    detalhesClt: {
      salario: sal,
      fgts,
      provisoes: provisao13 + provisaoFerias,
      encargosPatronais,
      inssClt,
      irrfClt
    }
  };
}