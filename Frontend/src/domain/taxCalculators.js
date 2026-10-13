// == CONTROLE RÍGIDO BANCÁRIO / BLINDAGEM DE ARREDONDAMENTOS ===
const DP = (v) => {
    if (isNaN(v) || typeof v !== 'number' || !isFinite(v) || v < 0) return 0;
    return Math.round((v + Number.EPSILON) * 100) / 100;
};

// ANEXOS DO SIMPLES (TABELAS DE REPARTIÇÃO CORRIGIDAS E INTEGRAIS)
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
  { limite: 180000, aliq: 0.1550, deducao: 0, pisPart: 0.0276, cofinsPart: 0.1274, issPart: 0.1550 },
  { limite: 360000, aliq: 0.1800, deducao: 4500, pisPart: 0.0276, cofinsPart: 0.1274, issPart: 0.1550 },
  { limite: 720000, aliq: 0.1950, deducao: 9900, pisPart: 0.0300, cofinsPart: 0.1380, issPart: 0.1700 },
  { limite: 1800000, aliq: 0.2050, deducao: 17100, pisPart: 0.0300, cofinsPart: 0.1380, issPart: 0.1700 },
  { limite: 3600000, aliq: 0.2300, deducao: 62100, pisPart: 0.0300, cofinsPart: 0.1380, issPart: 0.1700 },
  { limite: 4800000, aliq: 0.3050, deducao: 540000, pisPart: 0.0350, cofinsPart: 0.1600, issPart: 0.0000 }
];

// O NOME ORIGINAL E COMPATÍVEL! Com limitador estrito 4.8MM de teto virtual caso inserido erroneamente a maior pelo dev/usuário 
export function calcularAliquotaSimples(rbt12, tabela) {
  // Mesmo passando R bilhÃµes como RBT, fixamos 4.8m apenas no teto contÃ¡bil das variaveis SN 
  const rbtLimiterAteCapping = Math.max(1, Math.min(4800000, DP(rbt12 || 1)));
  let faixa = tabela[tabela.length - 1];
  for (const f of tabela) {
    if (rbtLimiterAteCapping <= f.limite) { faixa = f; break; }
  }
  const aliqPuraV5 = ((rbtLimiterAteCapping * faixa.aliq) - faixa.deducao) / rbtLimiterAteCapping;
  return { aliqEfetiva: Math.max(0.04, Math.min(0.33, aliqPuraV5)), faixa };
}


// --- 1. REFORMA SIMULADOR CORREÇÃO ABSOLUTA DA ASSINATURA ---
export function calculateReformaIntegral({ 
   rbt12 = 0, recServ = 0, recCom = 0, compras = 0, ano = 2027, reducaoSetorial = 0 
}) {
  // Puxar AlÃ­quotas respeitando contratos
  const reqServ = calcularAliquotaSimples(rbt12, TABELA_ANEXO_III);
  const reqCom = calcularAliquotaSimples(rbt12, TABELA_ANEXO_I);

  const aliqSimplesServ = reqServ.aliqEfetiva;
  const aliqSimplesCom = reqCom.aliqEfetiva;
  const faixaServ = reqServ.faixa;
  const faixaCom = reqCom.faixa;

  const dasSimplesServ = DP((recServ || 0) * aliqSimplesServ);
  const dasSimplesCom = DP((recCom || 0) * aliqSimplesCom);
  const totalSimples = DP(dasSimplesServ + dasSimplesCom);

  let aliqCbs = 0.088, aliqIbs = 0.001, fracaoExtincao = 0.0, anoTeste = false;

  // Engrenagem Oficial HÃ­brida CBS
  if (ano === 2026) { aliqCbs = 0.009; aliqIbs = 0.001; anoTeste = true; }
  else if (ano === 2027) { aliqCbs = 0.088; aliqIbs = 0.001; } // Emulando transição CBS base com IBs progress.
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

  const percSubstituidoCom = (faixaCom.pisPart||0) + (faixaCom.cofinsPart||0) + ((faixaCom.icmsPart||0) * (ano >= 2029 ? fracaoExtincao : 0));
  const percSubstituidoServ = (faixaServ.pisPart||0) + (faixaServ.cofinsPart||0) + ((faixaServ.issPart||0) * (ano >= 2029 ? fracaoExtincao : 0));

  // Substituicao das parcelas dedutiveis direto em relatorio B2B na Guia Das - Exata !
  const limitrManiNulicP= 0.65; 
  const dasMantidoCom = DP((recCom||0) * (aliqSimplesCom * (1 - Math.min(limitrManiNulicP, percSubstituidoCom))));
  const dasMantidoServ = DP((recServ||0) * (aliqSimplesServ * (1 - Math.min(limitrManiNulicP, percSubstituidoServ))));
  const dasReduzidoTotal = DP(dasMantidoCom + dasMantidoServ);

  // Calcula credito puro base nao-cumulatvia q cliente usaria.
  const debito = DP(((recServ||0) + (recCom||0)) * aliqConjunta);
  const credito = DP((compras||0) * aliqConjunta);
  const valorLiquido = DP(Math.max(0, debito - credito));
  
  const totalHibrido = DP(dasReduzidoTotal + (anoTeste ? 0 : valorLiquido));
  const diferenca = DP(totalHibrido - totalSimples);

  return {
    totalSimples, 
    totalHibrido, 
    diferencaAbs: Math.abs(diferenca), 
    simplesVantajoso: diferenca >= 0,
    aliqSimplesServ: aliqSimplesServ * 100, 
    aliqSimplesCom: aliqSimplesCom * 100,
    dasSimplesServ, dasSimplesCom, 
    dasReduzidoServ: dasMantidoServ, 
    dasReduzidoCom: dasMantidoCom, 
    cbsApurada: valorLiquido, 
    dasReduzidoTotal, 
    debitoBrutoIbsCbs: debito, 
    creditoFornecedores: credito,
    valorLiquidoIbsCbs: valorLiquido, 
    aliqConjuntaIbsCbs: aliqConjunta * 100, 
    anoTesteCompensavel: anoTeste
  };
}


// --- RESTAURADOS IMPOSTOS CLT E CORRUGADORES PROGRESSIVOS ===
export function calcularInssProgressivo(salarioBruto) {
  const base = DP(Math.min(Math.max(0, salarioBruto || 0), 8157.41));
  let aliqNom = 0; let deducao = 0;
  
  if (base <= 1518.00) { aliqNom = 0.075; deducao = 0; }
  else if (base <= 2793.88) { aliqNom = 0.090; deducao = 22.77; }
  else if (base <= 4190.83) { aliqNom = 0.120; deducao = 106.58; }
  else { aliqNom = 0.140; deducao = 190.40; } 
  
  return DP(Math.min((base * aliqNom) - deducao, 951.63)); 
}

export function calcularIrrfProgressivo(baseCalculo, dependentes = 0) {
  const deducaoLegal = DP((dependentes || 0) * 189.59);
  const descontoSimplificado = 564.80; 
  const baseTributavel = DP(Math.max(0, baseCalculo - Math.max(deducaoLegal, descontoSimplificado)));
  
  let irrf = 0;
  if (baseTributavel <= 2259.20) irrf = 0;
  else if (baseTributavel <= 2826.65) irrf = (baseTributavel * 0.075) - 169.44;
  else if (baseTributavel <= 3751.05) irrf = (baseTributavel * 0.150) - 381.44;
  else if (baseTributavel <= 4664.68) irrf = (baseTributavel * 0.225) - 662.77;
  else irrf = (baseTributavel * 0.275) - 896.00;
  
  return DP(Math.max(0, irrf));
}

// --------------------------------------------------------------
// TODOS COMPATIBILIZADOS RESTAURADOS SEM ROMPER VÍNCULO AO UI FRONT
export function calculateFatorRCompleto({ rbt12 = 0, folha12 = 0, receitaMes = 0, socioNoTetoInss = false }) {
  const safeRbt = DP(Math.max(0, rbt12 || 0));
  const safeFolha = DP(Math.max(0, folha12 || 0));
  const rec = receitaMes > 0 ? DP(receitaMes) : DP(safeRbt / 12);
  
  if (safeRbt === 0) return { fatorR: 0, anexo: 'Indefinido', enquadraAnexo3: false, economiaLiquidaReal: 0 };
  const fatorR = DP((safeFolha / safeRbt) * 100);
  const enquadraAnexo3 = fatorR >= 28.0;

  const aliqAnexo3 = calcularAliquotaSimples(safeRbt, TABELA_ANEXO_III).aliqEfetiva;
  const aliqAnexo5 = calcularAliquotaSimples(safeRbt, TABELA_ANEXO_V).aliqEfetiva;

  const dasAnexo3 = DP(rec * aliqAnexo3); const dasAnexo5 = DP(rec * aliqAnexo5);
  const diferencaDasBruta = DP(Math.max(0, dasAnexo5 - dasAnexo3));

  const proLaboreMedioAtual = DP(safeFolha / 12);
  const proLaboreIdeal = DP(rec * 0.28); 
  const faltaMesProlabore = DP(Math.max(0, proLaboreIdeal - proLaboreMedioAtual));

  const inssAtual = socioNoTetoInss ? 0 : DP(calcularInssProgressivo(proLaboreMedioAtual));
  const irpfAtual = calcularIrrfProgressivo(DP(proLaboreMedioAtual - inssAtual));
  
  const inssIdeal = socioNoTetoInss ? 0 : DP(calcularInssProgressivo(proLaboreIdeal));
  const irpfIdeal = calcularIrrfProgressivo(DP(proLaboreIdeal - inssIdeal));

  const inssSocioIncremental = DP(inssIdeal - inssAtual); const irpfSocioIncremental = DP(irpfIdeal - irpfAtual);
  const custoTotalCpfIncremental = DP(inssSocioIncremental + irpfSocioIncremental);

  return {
    fatorR, enquadraAnexo3, anexo: enquadraAnexo3 ? 'Anexo III (AlÃ­quota Reduzida)' : 'Anexo V (Mais Oneroso)',
    aliqAnexo3: aliqAnexo3 * 100, aliqAnexo5: aliqAnexo5 * 100, dasAnexo3, dasAnexo5, diferencaDasBruta, 
    proLaboreMedioAtual, proLaboreIdeal, faltaMesProlabore,
    inssSocioIncremental, irpfSocioIncremental, custoTotalCpfIncremental, economiaLiquidaReal: DP(diferencaDasBruta - custoTotalCpfIncremental)
  };
}

export function calculateSimplesPresumidoExato({ faturamentoAnual = 0, folhaAnual = 0, anexoSimples = 'III', aliqIssLocal = 5.0, aliqIcmsLocal = 4.0 }) {
  const fat = DP(faturamentoAnual); const folha = DP(folhaAnual);
  let tabela = TABELA_ANEXO_III; let inssPatronalPorFora = false;
  
  if (anexoSimples === 'I') tabela = TABELA_ANEXO_I;
  else if (anexoSimples === 'IV') { tabela = TABELA_ANEXO_IV; inssPatronalPorFora = true; }
  else if (anexoSimples === 'V') tabela = TABELA_ANEXO_V;

  const aliqSimples = calcularAliquotaSimples(fat, tabela).aliqEfetiva;
  let totalSimples = DP(fat * aliqSimples);
  if (inssPatronalPorFora) totalSimples = DP(totalSimples + (folha * 0.20));

  const isServico = anexoSimples !== 'I'; const percIr = isServico ? 0.32 : 0.08; const percCsll = isServico ? 0.32 : 0.12;

  const baseIrpj = DP(fat * percIr); const irpjTotal = DP((baseIrpj * 0.15) + (Math.max(0, baseIrpj - 240000) * 0.10));
  const csllTotal = DP(fat * percCsll * 0.09); const pis = DP(fat * 0.0065); const cofins = DP(fat * 0.0300);
  const tributoLocal = DP(fat * ((isServico ? aliqIssLocal : aliqIcmsLocal) / 100));
  const cppPatronalPresumido = DP(folha * 0.283);
  const totalPresumido = DP(irpjTotal + csllTotal + pis + cofins + tributoLocal + cppPatronalPresumido);

  return {
    totalSimples, totalPresumido, aliqSimples: DP((totalSimples / (fat || 1)) * 100), aliqPresumido: DP((totalPresumido / (fat || 1)) * 100),
    economiaAnual: Math.abs(DP(totalPresumido - totalSimples)), simplesVence: totalSimples <= totalPresumido,
    detalhes: { irpjTotal, csllTotal, pis, cofins, tributoLocal, cppPatronalPresumido }
  };
}

export function calculateProlabore({ valor = 0, dependentes = 0 }) {
  const plBruto = DP(Math.max(0, valor));
  const inssRetido = DP(calcularInssProgressivo(plBruto));

  const atingiuTeto = plBruto >= 8157.41;
  const labelInss = atingiuTeto ? "INSS (Teto RGPS)" : "INSS Progressivo";
  const deducaoLegalInssDep = DP(inssRetido + ((dependentes||0) * 189.59));
  
  const descontoSimplificado = 564.80; 
  const usouSimplificado = descontoSimplificado > deducaoLegalInssDep;
  const maiorDeducaoAplicada = DP(Math.max(descontoSimplificado, deducaoLegalInssDep));
  const baseCalculoIrrf = DP(Math.max(0, plBruto - maiorDeducaoAplicada));
  
  const irrfBaseP = calcularIrrfProgressivo(plBruto, dependentes);  
  
  let irrfNomRfb = 0; let cPd = 0;
  if (baseCalculoIrrf <= 2259) {} else if (baseCalculoIrrf <= 2826) {irrfNomRfb=7.5; cPd=169.44;} else if(baseCalculoIrrf<=3751.05) {irrfNomRfb=15.0; cPd=381.44} else if(baseCalculoIrrf<=4664) {irrfNomRfb=22.5; cPd=659.44}else{irrfNomRfb=27.5; cPd=896;}

  return {
    prolaboreBruto: plBruto, inss: inssRetido, atingiuTeto, labelInss,
    baseCalculoIrrf, maiorDeducaoAplicada, usouSimplificado, nomeMetodoDeducao: usouSimplificado ? "Desconto Simplifado RFB" : "DeduÃ§Ãµes Oficiais (INSS)",
    irrf: irrfBaseP, aliqNominalIrrf: irrfNomRfb, parcelaDeducao: cPd,
    prolaboreLiquido: DP(plBruto - inssRetido - irrfBaseP), totalRetencoes: DP(inssRetido + irrfBaseP), 
    aliquotaEfetiva: plBruto > 0 ? DP(((inssRetido + irrfBaseP) / plBruto) * 100) : 0
  };
}

export function calculateCltVsPj({ salarioClt = 0, valorPj = 0, regimeEmpresa = 'simples' }) {
  const sal = DP(Math.max(0, salarioClt)); const notaPj = DP(Math.max(0, valorPj));
  const custoEmpresaClt = DP(sal + (sal * 0.08) + (sal * 0.0833) + (sal * 0.1111) + (regimeEmpresa === 'presumido' ? (sal * 0.283) : 0) + 600);
  const inssClt = DP(calcularInssProgressivo(sal)); let irrfClt = calcularIrrfProgressivo(sal,0);
  const liquidoClt = DP(sal - inssClt - irrfClt + 480);
  const impostoPj = DP(notaPj * 0.06); const liquidoPj = DP(Math.max(0, notaPj - impostoPj - 300 - (1412 * 0.11)));
  return { custoEmpresaClt, liquidoClt, custoEmpresaPj: notaPj, liquidoPj, pjEquivalente: DP(custoEmpresaClt * 0.90) };
}

export function calculateRescisaoCLTCompleto({ salarioBase = 0, diasTrabalhadosMes = 30, motivo = 'sem_justa_causa', meses13 = 0, feriasVencidasPeriodos = 0, mesesFeriasProporcionais = 0, anosCompletosCasa = 0, saldoFgts = 0 }) {
  const sal = DP(Math.max(0, salarioBase || 0));
  const diasMes = Math.min(30, Math.max(0, diasTrabalhadosMes || 0));
  const anos = parseInt(Math.max(0, anosCompletosCasa || 0), 10);
  const valSaldoC = DP(Math.max(0, saldoFgts || 0));
  
  const saldoSalario = DP((sal / 30) * diasMes);
  const fVencidas = DP(sal * feriasVencidasPeriodos);
  const diasAv = Math.min(90, 30 + (anos * 3));
  let vAv= 0; let mA= 0; let plCA= 1; let just= false; let stat =true; 

  if (motivo === 'sem_justa_causa') { vAv = DP((sal/30) * diasAv); mA = 0.40;  } 
  else if (motivo === 'acordo') { vAv = DP(((sal/30) * diasAv)*0.50); mA = 0.20; plCA = 0.80; } 
  else if (motivo === 'pedido') { mA = 0; plCA = 0; stat=false} else if (motivo === 'justa_causa') { just = true; }

  if(just) { 
     let trFVJ=DP(fVencidas/3); let insj=calcularInssProgressivo(saldoSalario); let rgj= calcularIrrfProgressivo(DP(saldoSalario),0); 
     return{ saldoSalario,avisoPrevio:0,diasAviso:0,decimoTerceiroTotal:0,feriasVencidas:fVencidas,feriasProporcionais:0,totalFeriasLiquido:DP(fVencidas+trFVJ),totalProventosTrct:DP(saldoSalario+fVencidas+trFVJ), totalDescontos:DP(insj+rgj),liquidoRescisorioTrct:DP(saldoSalario+fVencidas+trFVJ-insj-rgj),bases:{inssMensal:saldoSalario,valInssMensal:insj,irpfMensal:DP(saldoSalario-insj), valIrrfMensal:rgj,inss13:0,valInss13:0,irpf13:0,valIrrf13:0},multaFgts:0,percentualMulta:0,saldoFgtsAcumuladoBaseDaMulta:0,guiaGRRF:0,saldoLiberadoCaixaFgts:0};
  }
  
  let qAvP= (motivo!=='pedido'? Math.floor(diasAv/30):0);
  const deTTo = DP((sal/12)*Math.min(12,meses13+qAvP));
  const fPTAv = DP((sal/12)*Math.min(12,mesesFeriasProporcionais+qAvP));
  const totalFLIQ = DP( (fVencidas+fPTAv)+ DP((fVencidas+fPTAv)/3));

  const iMM= calcularInssProgressivo(saldoSalario);
  const rrMM=calcularIrrfProgressivo(saldoSalario);
  const i13M= calcularInssProgressivo(deTTo);
  const rr13M=calcularIrrfProgressivo(deTTo);
  const descG=DP(iMM+rrMM+i13M+rr13M);
  const ptTRG =DP(saldoSalario+vAv+deTTo+totalFLIQ);
  
  const FGBaM1s=(saldoSalario+vAv+deTTo)*0.08;
  const VBasMTulRtbG=(valSaldoC+FGBaM1s);
  return { 
     saldoSalario, avisoPrevio:vAv,diasAviso:diasAv,decimoTerceiroTotal:deTTo, feriasVencidas:fVencidas,feriasProporcionais:DP(fPTAv+DP(fPTAv/3)), totalFeriasLiquido:totalFLIQ, totalProventosTrct:ptTRG, totalDescontos:descG,liquidoRescisorioTrct:DP(ptTRG-descG),
     bases:{ inssMensal:saldoSalario,valInssMensal:iMM,irpfMensal:DP(saldoSalario-iMM), valIrrfMensal:rrMM,inss13:deTTo,valInss13:i13M,irpf13: DP(deTTo-i13M), valIrrf13:rr13M }, multaFgts:DP(VBasMTulRtbG*mA),percentualMulta:mA*100,saldoFgtsAcumuladoBaseDaMulta:VBasMTulRtbG,guiaGRRF:DP((FGBaM1s)+DP(VBasMTulRtbG*mA)), saldoLiberadoCaixaFgts:(stat? DP(DP(VBasMTulRtbG*mA)+(VBasMTulRtbG*plCA)) : 0 )
   };
}