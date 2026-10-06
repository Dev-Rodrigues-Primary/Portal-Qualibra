export function formatCurrency(value) {
  if (value === null || value === undefined || isNaN(value)) {
    return 'R$ 0,00';
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value, decimals = 2) {
  if (value === null || value === undefined || isNaN(value)) {
    return '0,00%';
  }
  return `${Number(value).toFixed(decimals).replace('.', ',')}%`;
}

export function parseNumberInput(val) {
  if (val === '' || val === null || val === undefined) return 0;
  const num = parseFloat(val);
  return isNaN(num) ? 0 : num;
}
