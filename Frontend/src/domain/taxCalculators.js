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
    dasSimplesServ, dasSimplesCom, 
    dasReduzidoServ: dasMantidoServ, // <-- AQUI FOI ONDE ESTAVA O FURO! (Faltava declarar no return)
    dasReduzidoCom: dasMantidoCom,   // <-- AQUI FOI ONDE ESTAVA O FURO!
    cbsApurada: valorLiquido,        // <-- AQUI FOI ONDE ESTAVA O FURO!
    dasReduzidoTotal, debitoBrutoIbsCbs: debito, creditoFornecedores: credito,
    valorLiquidoIbsCbs: valorLiquido, aliqConjuntaIbsCbs: aliqConjunta * 100, anoTesteCompensavel: anoTeste
  };
}

export function calculateFatorRCompleto({ rbt12 = 0, folha12 = 0, receitaMes = 0, socioNoTetoInss = false }) {
  const safeRbt = Math.max(0, rbt12);
  const safeFolha = Math.max(0, folha12);
  const rec = receitaMes > 0 ? receitaMes : (safeRbt / 12);
  
  if (safeRbt === 0) return { fatorR: 0, anexo: 'Indefinido', enquadraAnexo3: false, economiaLiquidaReal: 0 };

  // Fator R Histórico Oficial
  const fatorR = (safeFolha / safeRbt) * 100;
  const enquadraAnexo3 = fatorR >= 28.0;

  const { aliqEfetiva: aliqAnexo3 } = calcularAliquotaSimples(safeRbt, TABELA_ANEXO_III);
  const { aliqEfetiva: aliqAnexo5 } = calcularAliquotaSimples(safeRbt, TABELA_ANEXO_V);

  // Economia Bruta da Empresa no DAS
  const dasAnexo3 = rec * aliqAnexo3;
  const dasAnexo5 = rec * aliqAnexo5;
  const diferencaDasBruta = Math.max(0, dasAnexo5 - dasAnexo3);

  // === CÁLCULO MARGINAL DO SÓCIO (O Segredo da Contabilidade) ===
  const proLaboreMedioAtual = safeFolha / 12;
  const proLaboreIdeal = rec * 0.28; // Para a receita do mês, a folha deve ser 28%
  
  const faltaMesProlabore = Math.max(0, proLaboreIdeal - proLaboreMedioAtual);

  // Cenário Atual (Como o sócio paga hoje)
  const inssAtual = socioNoTetoInss ? 0 : Math.min(proLaboreMedioAtual * 0.11, 897.32);
  const irpfAtual = calcularIrrfProgressivo(Math.max(0, proLaboreMedioAtual - inssAtual));

  // Cenário Ideal (Como o sócio passaria a pagar se subisse o pró-labore)
  const inssIdeal = socioNoTetoInss ? 0 : Math.min(proLaboreIdeal * 0.11, 897.32);
  const irpfIdeal = calcularIrrfProgressivo(Math.max(0, proLaboreIdeal - inssIdeal));

  // O verdadeiro custo out-of-pocket (Tributação Marginal)
  const inssSocioIncremental = inssIdeal - inssAtual;
  const irpfSocioIncremental = irpfIdeal - irpfAtual;
  const custoTotalCpfIncremental = inssSocioIncremental + irpfSocioIncremental;

  const economiaLiquidaReal = diferencaDasBruta - custoTotalCpfIncremental;

  return {
    fatorR, 
    enquadraAnexo3, 
    anexo: enquadraAnexo3 ? 'Anexo III (Alíquota Reduzida)' : 'Anexo V (Mais Oneroso)',
    aliqAnexo3: aliqAnexo3 * 100, 
    aliqAnexo5: aliqAnexo5 * 100, 
    dasAnexo3, 
    dasAnexo5, 
    diferencaDasBruta, 
    proLaboreMedioAtual,
    proLaboreIdeal,
    faltaMesProlabore,
    inssSocioIncremental, 
    irpfSocioIncremental, 
    custoTotalCpfIncremental, 
    economiaLiquidaReal
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

export function calculateRescisaoCLTCompleto({
  salarioBase = 0,
  diasTrabalhadosMes = 30,
  motivo = 'sem_justa_causa',
  meses13 = 0,
  feriasVencidasPeriodos = 0,
  mesesFeriasProporcionais = 0,
  anosCompletosCasa = 0,
  saldoFgts = 0
}) {
  const sal = Math.max(0, salarioBase);
  const salDia = sal / 30;
  const salMes = sal / 12;
  const diasMes = Math.min(30, Math.max(0, diasTrabalhadosMes));
  const anos = Math.max(0, anosCompletosCasa);

  // 1. Proventos: Saldo de Salário e Férias Vencidas
  const saldoSalario = salDia * diasMes;
  const feriasVencidas = feriasVencidasPeriodos * sal;

  // 2. Proventos: Aviso Prévio Proporcional
  const diasAviso = Math.min(90, 30 + (anos * 3));
  let valorAvisoIndenizado = 0;
  
  let multaPerc = 0;
  let fgtsLiberadoStatus = true;

  if (motivo === 'sem_justa_causa') {
    valorAvisoIndenizado = salDia * diasAviso;
    multaPerc = 0.40;
  } else if (motivo === 'acordo') {
    valorAvisoIndenizado = (salDia * diasAviso) * 0.50; // Lei 13.467 (Art 484-A): Metade do aviso
    multaPerc = 0.20; // Metade da multa do FGTS
  } else if (motivo === 'pedido') {
    fgtsLiberadoStatus = false;
  } else if (motivo === 'justa_causa') {
    // Justa causa recebe apenas o vencido (saldo salário + férias vencidas c/ 1/3)
    const baseFVenJusta = feriasVencidas;
    const tercoFVenJusta = baseFVenJusta / 3;
    const proventosGeraisJusta = saldoSalario + baseFVenJusta + tercoFVenJusta;
    const inssSalJusta = calcularInssProgressivo(saldoSalario);
    const irpfSalJusta = calcularIrrfProgressivo(saldoSalario - inssSalJusta);
    return {
      saldoSalario, avisoPrevio: 0, diasAviso: 0, decimoTerceiroTotal: 0, 
      totalFeriasLiquido: baseFVenJusta + tercoFVenJusta, multaFgts: 0, percentualMulta: 0,
      totalProventosTrct: proventosGeraisJusta, totalDescontos: inssSalJusta + irpfSalJusta,
      liquidoRescisorioTrct: Math.max(0, proventosGeraisJusta - inssSalJusta - irpfSalJusta),
      bases: { 
        inssMensal: saldoSalario, valInssMensal: inssSalJusta, irpfMensal: Math.max(0, saldoSalario-inssSalJusta), valIrrfMensal: irpfSalJusta,
        inss13: 0, valInss13: 0, irpf13: 0, valIrrf13: 0
      },
      guiaGRRF: 0,
      saldoLiberadoCaixaFgts: 0
    };
  }

  // 3. Proventos: Projeção de Avos (Aviso Prévio soma avos de férias e 13º se for indenizado)
  // Independente se paga 50% em dinheiro (acordo), a jurisprudencia determina 100% de projecao nos avos.
  const avosProjecao = Math.floor(diasAviso / 30);
  const meses13Total = Math.min(12, parseInt(meses13, 10) + (motivo !== 'pedido' ? avosProjecao : 0));
  const mesesFeriasTotal = Math.min(12, parseInt(mesesFeriasProporcionais, 10) + (motivo !== 'pedido' ? avosProjecao : 0));

  // Décimo Terceiro (Segregação Tributária Importante)
  const decimoTerceiroDireito = (sal / 12) * parseInt(meses13, 10);
  const decimoTerceiroAviso = (motivo !== 'pedido' && avosProjecao > 0) ? ((sal / 12) * avosProjecao) : 0;
  const decimoTerceiroTotal = decimoTerceiroDireito + decimoTerceiroAviso;

  // Férias (Totalmente isentas de IR/INSS em TRCT)
  const feriasProporcionaisDireito = (sal / 12) * parseInt(mesesFeriasProporcionais, 10);
  const feriasProporcionaisAviso = (motivo !== 'pedido' && avosProjecao > 0) ? ((sal / 12) * avosProjecao) : 0;
  
  const baseTotalFerias = feriasVencidas + feriasProporcionaisDireito + feriasProporcionaisAviso;
  const tercoTotalFerias = baseTotalFerias / 3;
  const totalFeriasLiquido = baseTotalFerias + tercoTotalFerias;

  // ==============================================================
  // MOTOR DE BASES DP: SEGREGANDO INSS E IRPF OFICIAL
  // ==============================================================
  // A - Competência Mensal normal
  const baseInssMensal = saldoSalario; // O Aviso Indenizado NÃO sofre INSS, nem férias em TRCT
  const inssMensalCalculado = calcularInssProgressivo(baseInssMensal);
  const baseIrrfMensal = Math.max(0, baseInssMensal - inssMensalCalculado);
  const irpfMensalCalculado = calcularIrrfProgressivo(baseIrrfMensal);

  // B - Tributação Exclusiva (13º Salário Rescisório)
  const baseInss13 = decimoTerceiroTotal;
  const inss13Calculado = calcularInssProgressivo(baseInss13);
  const baseIrrf13 = Math.max(0, baseInss13 - inss13Calculado);
  const irpf13Calculado = calcularIrrfProgressivo(baseIrrf13);

  const totalDescontosFuncionario = inssMensalCalculado + irpfMensalCalculado + inss13Calculado + irpf13Calculado;

  const totalProventosTrct = saldoSalario + valorAvisoIndenizado + decimoTerceiroTotal + totalFeriasLiquido;
  const liquidoRescisorioTrct = Math.max(0, totalProventosTrct - totalDescontosFuncionario);

  // ==============================================================
  // FGTS (Base da GRRF Empresa x Direito de Saque Sócio/Membro)
  // ==============================================================
  // Apenas Saldo de Salário e 13º têm incidência geral, porém sobre o Aviso Indenizado INCIDE APENAS O FGTS
  const fgtsMensalApurado = (saldoSalario + valorAvisoIndenizado) * 0.08;
  const fgts13Apurado = decimoTerceiroTotal * 0.08;
  const baseRealDaMulta = saldoFgts + fgtsMensalApurado + fgts13Apurado; // Base Total Acumulada

  const valorMulta = baseRealDaMulta * multaPerc;

  let saldoLiberadoCaixaFgts = 0;
  if (motivo === 'sem_justa_causa') {
    saldoLiberadoCaixaFgts = baseRealDaMulta + valorMulta; // Trabalhador pega 100% lá na Caixa
  } else if (motivo === 'acordo') {
    saldoLiberadoCaixaFgts = (baseRealDaMulta * 0.80) + valorMulta; // Art. 484-A limita a saque de 80% do saldo original + a multa.
  }

  // O Total que a empresa PAGA DA GRRF Mês: os depositos pendentes daquele TRCT + Multa Acumulada
  const guiaGRRF_EmpresaPagar = fgtsMensalApurado + fgts13Apurado + valorMulta;

  return {
    // Info Cadastral Exibição
    saldoSalario, avisoPrevio: valorAvisoIndenizado, diasAviso,
    decimoTerceiroTotal, feriasVencidas, feriasProporcionais: baseTotalFerias + tercoTotalFerias - (feriasVencidas + (feriasVencidas/3)),
    totalFeriasLiquido,

    // TRCT LÍQUIDO E BRUTO EMPRESA/FUNCIONARIO
    totalProventosTrct,
    totalDescontos: totalDescontosFuncionario,
    liquidoRescisorioTrct,

    // MATRIZ DE DECOMPOSIÇÃO / DP
    bases: {
      inssMensal: baseInssMensal,
      valInssMensal: inssMensalCalculado,
      irpfMensal: baseIrrfMensal,
      valIrrfMensal: irpfMensalCalculado,
      inss13: baseInss13,
      valInss13: inss13Calculado,
      irpf13: baseIrrf13,
      valIrrf13: irpf13Calculado
    },

    // INFORMAÇÕES EXTRAS EXTRA-TRCT
    multaFgts: valorMulta,
    percentualMulta: multaPerc * 100,
    saldoFgtsAcumuladoBaseDaMulta: baseRealDaMulta, // Devolve esse numero para que faça logica a multa pro analista
    guiaGRRF: guiaGRRF_EmpresaPagar,
    saldoLiberadoCaixaFgts
  };
}

export function calculateProlabore({ valor = 0, dependentes = 0 }) {
  const plBruto = Math.max(0, valor);

  // Teto Oficial RGPS 2026: R$ 8.157,41 x 11% = R$ 897,32
  const tetoRgps2026 = 8157.41;
  const tetoInssMaximo = 897.32;

  const inssCalculado11 = plBruto * 0.11;
  const atingiuTeto = plBruto >= tetoRgps2026;
  const inssRetido = Math.min(inssCalculado11, tetoInssMaximo);

  const labelInss = atingiuTeto 
    ? "INSS (Teto RGPS 2026: R$ 897,32)" 
    : "INSS (11% Contribuição Individual)";

  // === REGRA DA MAIOR DEDUÇÃO DO IRPF (LEI 14.663 / RFB) ===
  const deducaoLegalInssDep = inssRetido + (dependentes * 189.59);
  const descontoSimplificado = 564.80; // Desconto simplificado mensal da RFB

  const usouSimplificado = descontoSimplificado > deducaoLegalInssDep;
  const maiorDeducaoAplicada = Math.max(descontoSimplificado, deducaoLegalInssDep);

  const baseCalculoIrrf = Math.max(0, plBruto - maiorDeducaoAplicada);

  // Tabela Progressiva do IRPF (RFB 2026)
  let irrf = 0;
  let aliqNominal = 0;
  let parcelaDeducao = 0;

  if (baseCalculoIrrf <= 2259.20) {
    irrf = 0;
    aliqNominal = 0;
    parcelaDeducao = 0;
  } else if (baseCalculoIrrf <= 2826.65) {
    aliqNominal = 7.5;
    parcelaDeducao = 169.44;
    irrf = (baseCalculoIrrf * 0.075) - parcelaDeducao;
  } else if (baseCalculoIrrf <= 3751.05) {
    aliqNominal = 15.0;
    parcelaDeducao = 381.44;
    irrf = (baseCalculoIrrf * 0.15) - parcelaDeducao;
  } else if (baseCalculoIrrf <= 4664.68) {
    aliqNominal = 22.5;
    parcelaDeducao = 659.44; // Parcela oficial correspondente ao enquadramento
    irrf = (baseCalculoIrrf * 0.225) - parcelaDeducao;
  } else {
    aliqNominal = 27.5;
    parcelaDeducao = 896.00;
    irrf = (baseCalculoIrrf * 0.275) - parcelaDeducao;
  }

  irrf = Math.max(0, irrf);
  const liquidoReceber = Math.max(0, plBruto - inssRetido - irrf);
  const totalRetencoes = inssRetido + irrf;
  const aliquotaEfetivaRetencao = plBruto > 0 ? (totalRetencoes / plBruto) * 100 : 0;

  return {
    prolaboreBruto: plBruto,
    inss: inssRetido,
    atingiuTeto,
    labelInss,
    baseCalculoIrrf,
    maiorDeducaoAplicada,
    usouSimplificado,
    nomeMetodoDeducao: usouSimplificado 
      ? `Desconto Simplificado RFB (R$ 564,80)` 
      : `Dedução Legal do INSS (R$ ${inssRetido.toFixed(2)})`,
    irrf,
    aliqNominalIrrf: aliqNominal,
    parcelaDeducao,
    prolaboreLiquido: liquidoReceber,
    totalRetencoes,
    aliquotaEfetiva: aliquotaEfetivaRetencao
  };
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