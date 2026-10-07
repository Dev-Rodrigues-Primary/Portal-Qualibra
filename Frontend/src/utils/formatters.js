export function formatCurrency(value) {
  if (value === null || value === undefined || isNaN(value)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

export function formatPercent(value, decimals = 2) {
  if (value === null || value === undefined || isNaN(value)) return '0,00%';
  return `${Number(value).toFixed(decimals).replace('.', ',')}%`;
}

export function parseNumberInput(val) {
  if (val === '' || val === null || val === undefined) return 0;
  const num = parseFloat(val);
  return isNaN(num) ? 0 : num;
}

export function valorPorExtenso(valor) {
  const v = Math.abs(Number(valor) || 0);
  if (v === 0) return 'zero reais';

  const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
  const especiais = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

  function converterCentena(n) {
    if (n === 100) return 'cem';
    let c = Math.floor(n / 100);
    let d = Math.floor((n % 100) / 10);
    let u = n % 10;
    let partes = [];
    if (c > 0) partes.push(centenas[c]);
    if (d === 1) { partes.push(especiais[u]); } else {
      if (d > 1) partes.push(dezenas[d]);
      if (u > 0) partes.push(unidades[u]);
    }
    return partes.join(' e ');
  }

  const inteiro = Math.floor(v);
  const centavos = Math.round((v - inteiro) * 100);
  let extensoPartes = [];
  const milhoes = Math.floor(inteiro / 1000000);
  const milhares = Math.floor((inteiro % 1000000) / 1000);
  const resto = inteiro % 1000;

  if (milhoes > 0) extensoPartes.push(`${converterCentena(milhoes)} ${milhoes === 1 ? 'milhão' : 'milhões'}`);
  if (milhares > 0) extensoPartes.push(`${converterCentena(milhares)} mil`);
  if (resto > 0 || inteiro === 0) { if (inteiro > 0) extensoPartes.push(converterCentena(resto)); }

  let strInteiro = extensoPartes.join(' e ');
  let resultado = '';
  if (inteiro > 0) resultado += `${strInteiro} ${inteiro === 1 ? 'real' : 'reais'}`;
  if (centavos > 0) {
    let strCentavos = converterCentena(centavos);
    resultado += `${inteiro > 0 ? ' e ' : ''}${strCentavos} ${centavos === 1 ? 'centavo' : 'centavos'}`;
  }
  return resultado;
}