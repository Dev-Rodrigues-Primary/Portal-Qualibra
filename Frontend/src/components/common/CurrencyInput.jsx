import React from 'react';

export function CurrencyInput({ value, onChange, className, placeholder }) {
  // Formata o número bruto (ex: 1500.5) para R$ 1.500,50
  const displayValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value || 0);

  const handleChange = (e) => {
    // Remove tudo que não for número
    let val = e.target.value.replace(/\D/g, '');
    if (!val) val = '0';
    // Divide por 100 para criar as duas casas decimais
    const rawNumber = parseInt(val, 10) / 100;
    onChange(rawNumber);
  };

  return (
    <input
      type="text"
      value={displayValue}
      onChange={handleChange}
      className={className}
      placeholder={placeholder}
    />
  );
}