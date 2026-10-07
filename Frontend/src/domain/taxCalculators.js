export const TABELA_ANEXO_I = [
  { limite: 180000, aliq: 0.0400, deducao: 0, icmsPart: 0.3400, pisPart: 0.0276, cofinsPart: 0.1274 },
  { limite: 360000, aliq: 0.0730, deducao: 5940, icmsPart: 0.3400, pisPart: 0.0276, cofinsPart: 0.1274 },
  { limite: 720000, aliq: 0.0950, deducao: 13860, icmsPart: 0.3350, pisPart: 0.0300, cofinsPart: 0.1380 },
  { limite: 1800000, aliq: 0.1070, deducao: 22500, icmsPart: 0.3350, pisPart: 0.0300, cofinsPart: 0.1380 },
  { limite: 3600000, aliq: 0.1430, deducao: 87300, icmsPart: 0.3350, pisPart: 0.0300, cofinsPart: 0.1380 },
  { limite: 4800000, aliq: 0.1900, deducao: 378000, icmsPart: 0.0000, pisPart: 0.0350, cofinsPart: 0.1600 }
];

export const TABELA_ANEXO_III = [
  { limite: 180000, aliq: 0.0600, deducao: 0, issPart: 0.3350, pisPart: 0.0276, cofinsPart: 0.1274 },
  { limite: 360000, aliq: 0.1120, deducao: 9360, issPart: 0.3350, pisPart: 0.0276, cofinsPart: 0.1274 },
  { limite: 720000, aliq: 0.1350, deducao: 17640, issPart: 0.3250, pisPart: 0.0300, cofinsPart: 0.1380 },
  { limite: 1800000, aliq: 0.1600, deducao: 35640, issPart: 0.3250, pisPart: 0.0300, cofinsPart: 0.1380 },
  { limite: 3600000, aliq: 0.2100, deducao: 125640, issPart: 0.3250, pisPart: 0.0300, cofinsPart: 0.1380 },
  { limite: 4800000, aliq: 0.3300, deducao: 648000, issPart: 0.0000, pisPart: 0.0350, cofinsPart: 0.1600 }
];

export const TABELA_ANEXO_IV = [
  { limite: 180000, aliq: 0.0450, deducao: 0, issPart: 0.4400, pisPart: 0.0350, cofinsPart: 0.1600 },
  { limite: 360000, aliq: 0.0900, deducao: 8100, issPart: 0.4400, pisPart: 0.0350, cofinsPart: 0.1600 },
  { limite: 720000, aliq: 0.1020, deducao: 12420, issPart: 0.4000, pisPart: 0.0350, cofinsPart: 0.1600 },
  { limite: 1800000, aliq: 0.1400, deducao: 39780, issPart: 0.4000, pisPart: 0.0350, cofinsPart: 0.1600 },
  { limite: 3600000, aliq: 0.2200, deducao: 183780, issPart: 0.4000, pisPart: 0.0350, cofinsPart: 0.1600 },
  { limite: 4800000, aliq: 0.3300, deducao: 579780, issPart: 0.0000, pisPart: 0.0350, cofinsPart: 0.1600 }
];

export const TABELA_ANEXO_V = [
  { limite: 180000, aliq: 0.1550, deducao: 0 },
  { limite: 360000, aliq: 0.1800, deducao: 4500 },
  { limite: 720000, aliq: 0.1950, deducao: 9900 },
  { limite: 1800000, aliq: 0.2050, deducao: 17100 },
  { limite: 3600000, aliq: 0.2300, deducao: 62100 },
  { limite: 4800000, aliq: 0.3050, deducao: 540000 }
];

export function calcularAliquotaSimples(rbt12, tabela) {
  const rbt = Math.max(1, rbt12);
  let faixa = tabela[tabela.length - 1];
  for (const f of tabela) {
    if (rbt <= f.limite) { faixa = f; break; }
  }
  const aliqEfetiva = ((rbt * faixa.aliq) - faixa.deducao) / rbt;
  return { aliqEfetiva: Math.max(0.04, Math.min(0.33, aliqEfetiva)), faixa };
}

export function calcularInssProgressivo(salarioBruto) {
  const sal = Math.max(0, salarioBruto);
  const base = Math.min(sal, 8157.41);
  let inss = 0;
  if (base <= 1518.00) inss = base * 0.075;
  else if (base <= 2793.88) inss = (1518.00 * 0.075) + ((base - 1518.00) * 0.09);
  else if (base <= 4190.83) inss = (1518.00 * 0.075) + ((2793.88 - 1518.00) * 0.09) + ((base - 2793.88) * 0.12);
  else inss = (1518.00 * 0.075) + ((2793.88 - 1518.00) * 0.09) + ((4190.83 - 2793.88) * 0.12) + ((base - 4190.83) * 0.14);
  return Math.min(inss, 951.63);
}

export function calcularIrrfProgressivo(baseCalculo, dependentes = 0) {
  const deducaoLegal = dependentes * 189.59;
  const descontoSimplificado = 564.80;
  const baseTributavel = Math.max(0, baseCalculo - Math.max(deducaoLegal, descontoSimplificado));
  let irrf = 0;
  if (baseTributavel <= 2259.20) irrf = 0;
  else if (baseTributavel <= 2826.65) irrf = (baseTributavel * 0.075) - 169.44;
  else if (baseTributavel <= 3751.05) irrf = (baseTributavel * 0.15) - 381.44;
  else if (baseTributavel <= 4664.68) irrf = (baseTributavel * 0.225) - 662.77;
  else irrf = (baseTributavel * 0.275) - 896.00;
  return Math.max(0, irrf);
}

export function calculateReformaIntegral({ rbt12 = 0, recServ = 0, recCom = 0, compras = 0, ano = 2027, publicoAlvo = 'B2B', reducaoSetorial = 0 }) {
  const safeRbt = Math.max(1000, rbt12);
  const safeServ = Math.max(0, recServ);
  const safeCom = Math.max(0, recCom);
  const safeCompras = Math.max(0, compras);

  const { aliqEfetiva: aliqSimplesServ, faixa: faixaServ } = calcularAliquotaSimples(safeRbt, TABELA_ANEXO_III);
  const { aliqEfetiva: aliqSimplesCom, faixa: faixaCom } = calcularAliquotaSimples(safeRbt, TABELA_ANEXO_I);

  const dasSimplesServ = safeServ * aliqSimplesServ;
  const dasSimplesCom = safeCom * aliqSimplesCom;
  const totalSimples = dasSimplesServ + dasSimplesCom;

  let aliqCbs = 0.088, aliqIbs = 0.001, fracaoExtincao = 0.0, anoTeste = false;

  if (ano === 2026) { aliqCbs = 0.009; aliqIbs = 0.001; anoTeste = true; }
  else if (ano === 2027) { aliqCbs = 0.088; aliqIbs = 0.000; }
  else if (ano === 2028) { aliqCbs = 0.088; aliqIbs = 0.001; }
  else if (ano >= 2029 && ano <= 2032) {
    const passos = ano - 2028;
    fracaoExtincao = passos * 0.10;
    aliqCbs = 0.088;
    aliqIbs = 0.01 + (passos * 0.035);
  } else if (ano >= 2033) {
    aliqCbs = 0.088; aliqIbs = 0.177; fracaoExtincao = 1.0;
  }

  const fatorReducaoSetorial = 1 - (reducaoSetorial / 100);
  const aliqConjunta = (aliqCbs + aliqIbs) * fatorReducaoSetorial;

  const percSubstituidoCom = faixaCom.pisPart + faixaCom.cofinsPart + (faixaCom.icmsPart * (ano >= 2029 ? fracaoExtincao : 0));
  const percSubstituidoServ = faixaServ.pisPart + faixaServ.cofinsPart + (faixaServ.issPart * (ano >= 2029 ? fracaoExtincao : 0));

  const dasMantidoCom = safeCom * (aliqSimplesCom * (1 - Math.min(0.65, percSubstituidoCom)));
  const dasMantidoServ = safeServ * (aliqSimplesServ * (1 - Math.min(0.65, percSubstituidoServ)));
  const dasReduzidoTotal = dasMantidoCom + dasMantidoServ;

  const debito = (safeServ + safeCom) * aliqConjunta;
  const credito = safeCompras * aliqConjunta;
  const valorLiquido = Math.max(0, debito - credito);
  const totalHibrido = dasReduzidoTotal + (anoTeste ? 0 : valorLiquido);
  const diferenca = totalHibrido - totalSimples;

  return {
    totalSimples, totalHibrido, diferencaAbs: Math.abs(diferenca), simplesVantajoso: diferenca >= 0,
    aliqSimplesServ: aliqSimplesServ * 100, aliqSimplesCom: aliqSimplesCom * 100,
    dasSimplesServ, dasSimplesCom, dasReduzidoTotal, debitoBrutoIbsCbs: debito, creditoFornecedores: credito,
    valorLiquidoIbsCbs: valorLiquido, aliqConjuntaIbsCbs: aliqConjunta * 100, anoTesteCompensavel: anoTeste
  };
}

export function calculateFatorRCompleto({ rbt12 = 0, folha12 = 0, receitaMes = 0, socioNoTetoInss = false }) {
  const safeRbt = Math.max(0, rbt12);
  const safeFolha = Math.max(0, folha12);
  const rec = receitaMes > 0 ? receitaMes : (safeRbt / 12);
  if (safeRbt === 0) return { fatorR: 0, anexo: 'Indefinido', enquadraAnexo3: false, economiaLiquidaReal: 0 };

  const fatorR = (safeFolha / safeRbt) * 100;
  const enquadraAnexo3 = fatorR >= 28.0;

  const { aliqEfetiva: aliqAnexo3 } = calcularAliquotaSimples(safeRbt, TABELA_ANEXO_III);
  const { aliqEfetiva: aliqAnexo5 } = calcularAliquotaSimples(safeRbt, TABELA_ANEXO_V);

  const dasAnexo3 = rec * aliqAnexo3;
  const dasAnexo5 = rec * aliqAnexo5;
  const diferencaDasBruta = Math.max(0, dasAnexo5 - dasAnexo3);

  const folhaAlvoAnual = safeRbt * 0.28;
  const faltaAno = Math.max(0, folhaAlvoAnual - safeFolha);
  const faltaMesProlabore = faltaAno / 12;

  let inssSocioIncremental = (!socioNoTetoInss && faltaMesProlabore > 0) ? Math.min(faltaMesProlabore * 0.11, 897.32) : 0;
  const irpfSocioIncremental = calcularIrrfProgressivo(Math.max(0, faltaMesProlabore - inssSocioIncremental));
  const custoTotalCpfIncremental = inssSocioIncremental + irpfSocioIncremental;

  return {
    fatorR, enquadraAnexo3, anexo: enquadraAnexo3 ? 'Anexo III (Alíquota Reduzida)' : 'Anexo V (Mais Oneroso)',
    aliqAnexo3: aliqAnexo3 * 100, aliqAnexo5: aliqAnexo5 * 100, dasAnexo3, dasAnexo5, diferencaDasBruta, faltaAno, faltaMesProlabore,
    inssSocioIncremental, irpfSocioIncremental, custoTotalCpfIncremental, economiaLiquidaReal: diferencaDasBruta - custoTotalCpfIncremental
  };
}

export function calculateSimplesPresumidoExato({ faturamentoAnual = 0, folhaAnual = 0, anexoSimples = 'III', aliqIssLocal = 5.0, aliqIcmsLocal = 4.0 }) {
  const fat = Math.max(0, faturamentoAnual);
  const folha = Math.max(0, folhaAnual);

  let tabela = TABELA_ANEXO_III;
  let inssPatronalPorFora = false;
  if (anexoSimples === 'I') tabela = TABELA_ANEXO_I;
  else if (anexoSimples === 'IV') { tabela = TABELA_ANEXO_IV; inssPatronalPorFora = true; }
  else if (anexoSimples === 'V') tabela = TABELA_ANEXO_V;

  const { aliqEfetiva: aliqSimples } = calcularAliquotaSimples(fat, tabela);
  let totalSimples = fat * aliqSimples;
  if (inssPatronalPorFora) totalSimples += (folha * 0.20);

  const isServico = anexoSimples !== 'I';
  const percIr = isServico ? 0.32 : 0.08;
  const percCsll = isServico ? 0.32 : 0.12;

  const baseIrpj = fat * percIr;
  const irpjBasico = baseIrpj * 0.15;
  const adicionalIrpj = Math.max(0, baseIrpj - 240000) * 0.10;
  const irpjTotal = irpjBasico + adicionalIrpj;

  const csllTotal = fat * percCsll * 0.09;
  const pis = fat * 0.0065;
  const cofins = fat * 0.0300;
  const tributoLocal = fat * ((isServico ? aliqIssLocal : aliqIcmsLocal) / 100);
  const cppPatronalPresumido = folha * 0.283;

  const totalPresumido = irpjTotal + csllTotal + pis + cofins + tributoLocal + cppPatronalPresumido;

  return {
    totalSimples, totalPresumido, aliqSimples: (totalSimples / (fat || 1)) * 100, aliqPresumido: (totalPresumido / (fat || 1)) * 100,
    economiaAnual: Math.abs(totalPresumido - totalSimples), simplesVence: totalSimples <= totalPresumido,
    detalhes: { irpjTotal, csllTotal, pis, cofins, tributoLocal, cppPatronalPresumido }
  };
}

export function calculateRescisaoCLTCompleto({ salarioBase = 0, diasTrabalhadosMes = 30, motivo = 'sem_justa_causa', meses13 = 0, feriasVencidasPeriodos = 0, mesesFeriasProporcionais = 0, anosCompletosCasa = 0, saldoFgts = 0 }) {
  const sal = Math.max(0, salarioBase);
  const diasMes = Math.min(30, Math.max(0, diasTrabalhadosMes));
  const anos = Math.max(0, anosCompletosCasa);

  const saldoSalario = (sal / 30) * diasMes;
  const inssSaldoSalario = calcularInssProgressivo(saldoSalario);
  const irrfSaldoSalario = calcularIrrfProgressivo(saldoSalario - inssSaldoSalario);

  const diasAviso = Math.min(90, 30 + (anos * 3));
  const valorAvisoIntegral = (sal / 30) * diasAviso;
  const avosProjecao = Math.floor(diasAviso / 30);
  const meses13Total = Math.min(12, meses13 + (motivo === 'sem_justa_causa' ? avosProjecao : 0));
  const mesesFeriasTotal = Math.min(12, mesesFeriasProporcionais + (motivo === 'sem_justa_causa' ? avosProjecao : 0));

  const decimoTerceiro = (sal / 12) * meses13Total;
  const inss13 = calcularInssProgressivo(decimoTerceiro);
  const irrf13 = calcularIrrfProgressivo(decimoTerceiro - inss13);

  const feriasVencidas = feriasVencidasPeriodos * sal * (4 / 3);
  const feriasProporcionais = ((sal / 12) * mesesFeriasTotal) * (4 / 3);
  const totalFeriasGeral = feriasVencidas + feriasProporcionais;

  let avisoPrevioAReceber = 0, multaFgts = 0, percentualMulta = 0, saqueFgtsPermitido = 0;

  if (motivo === 'sem_justa_causa') {
    avisoPrevioAReceber = valorAvisoIntegral; percentualMulta = 40; multaFgts = saldoFgts * 0.40; saqueFgtsPermitido = saldoFgts + multaFgts;
  } else if (motivo === 'acordo') {
    avisoPrevioAReceber = valorAvisoIntegral * 0.50; percentualMulta = 20; multaFgts = saldoFgts * 0.20; saqueFgtsPermitido = (saldoFgts * 0.80) + multaFgts;
  } else if (motivo === 'justa_causa') {
    return { saldoSalario, feriasVencidas, decimoTerceiro: 0, feriasProporcionais: 0, avisoPrevio: 0, diasAviso: 0, multaFgts: 0, totalLiquido: Math.max(0, saldoSalario + feriasVencidas - inssSaldoSalario - irrfSaldoSalario), saqueFgtsPermitido: 0 };
  }

  const totalBruto = saldoSalario + avisoPrevioAReceber + decimoTerceiro + totalFeriasGeral + multaFgts;
  const totalDescontos = inssSaldoSalario + irrfSaldoSalario + inss13 + irrf13;
  return { saldoSalario, avisoPrevio: avisoPrevioAReceber, diasAviso, decimoTerceiro, feriasVencidas, feriasProporcionais, multaFgts, percentualMulta, saqueFgtsPermitido, totalBruto, totalDescontos, totalLiquido: totalBruto - totalDescontos };
}

export function calculateProlabore({ valor = 0 }) {
  const pl = Math.max(0, valor);
  const inss = Math.min(pl * 0.11, 897.32);
  const baseIrrf = Math.max(0, pl - inss);
  let irrf = 0, aliq = 0;
  if (baseIrrf <= 2259.20) { irrf = 0; aliq = 0; }
  else if (baseIrrf <= 2826.65) { irrf = (baseIrrf * 0.075) - 169.44; aliq = 7.5; }
  else if (baseIrrf <= 3751.05) { irrf = (baseIrrf * 0.15) - 381.44; aliq = 15.0; }
  else if (baseIrrf <= 4664.68) { irrf = (baseIrrf * 0.225) - 662.77; aliq = 22.5; }
  else { irrf = (baseIrrf * 0.275) - 896.00; aliq = 27.5; }
  irrf = Math.max(0, irrf);
  return { prolaboreBruto: pl, inss, irrf, aliquotaNominalIrrf: aliq, prolaboreLiquido: pl - inss - irrf, totalRetencoes: inss + irrf, aliquotaEfetiva: pl > 0 ? ((inss + irrf) / pl) * 100 : 0 };
}

export function calculateCltVsPj({ salarioClt = 0, valorPj = 0, regimeEmpresa = 'simples' }) {
  const sal = Math.max(0, salarioClt);
  const notaPj = Math.max(0, valorPj);
  const custoEmpresaClt = sal + (sal * 0.08) + (sal * 0.0833) + (sal * 0.1111) + (regimeEmpresa === 'presumido' ? (sal * 0.283) : 0) + 600;
  const inssClt = Math.min(sal * 0.11, 897.32);
  let irrfClt = 0;
  const bIr = Math.max(0, sal - inssClt);
  if (bIr > 4664.68) irrfClt = (bIr * 0.275) - 896;
  else if (bIr > 3751.05) irrfClt = (bIr * 0.225) - 662.77;
  else if (bIr > 2826.65) irrfClt = (bIr * 0.15) - 381.44;
  else if (bIr > 2259.20) irrfClt = (bIr * 0.075) - 169.44;
  const liquidoClt = sal - inssClt - Math.max(0, irrfClt) + 480;
  const impostoPj = notaPj * 0.06;
  const liquidoPj = Math.max(0, notaPj - impostoPj - 300 - (1412 * 0.11));
  return { custoEmpresaClt, liquidoClt, custoEmpresaPj: notaPj, liquidoPj, pjEquivalente: custoEmpresaClt * 0.90 };
}