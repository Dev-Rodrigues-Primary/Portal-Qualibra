const BACKEND_URL = '/api';

export async function fetchServerStatus() {
  try {
    const res = await fetch(`${BACKEND_URL}/status`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchCnpj(cnpj) {
  const res = await fetch(`${BACKEND_URL}/cnpj/${encodeURIComponent(cnpj)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao consultar CNPJ');
  return data;
}

export async function fetchCep(cep) {
  const res = await fetch(`${BACKEND_URL}/cep/${encodeURIComponent(cep)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao consultar CEP');
  return data;
}