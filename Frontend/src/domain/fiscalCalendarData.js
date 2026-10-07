export const FERIADOS_NACIONAIS_2026 = ['2026-01-01', '2026-02-17', '2026-04-03', '2026-04-21', '2026-05-01', '2026-06-04', '2026-09-07', '2026-10-12', '2026-11-02', '2026-11-15', '2026-11-20', '2026-12-25'];
function isDiaUtil(data) {
  const ds = data.getDay();
  if (ds === 0 || ds === 6) return false;
  return !FERIADOS_NACIONAIS_2026.includes(data.toISOString().split('T')[0]);
}
export function ajustarVencimento(ano, mes, diaBase, regra) {
  let data = new Date(ano, mes - 1, diaBase);
  if (regra === 'posterga') { while (!isDiaUtil(data)) data.setDate(data.getDate() + 1); }
  else if (regra === 'antecipa') { while (!isDiaUtil(data)) data.setDate(data.getDate() - 1); }
  return data;
}
export function gerarEventosFiscais(mesAtual = new Date().getMonth() + 1, anoAtual = 2026) {
  const eventosBase = [
    { id: 'fgts-digital', nome: 'FGTS Digital Mensal', diaBase: 20, regra: 'posterga', desc: 'Recolhimento via Pix', categoria: 'trabalhista' },
    { id: 'esocial-dctfweb', nome: 'eSocial & DCTFWeb', diaBase: 15, regra: 'antecipa', desc: 'Transmissão do encerramento e guia única.', categoria: 'obrigacoes' },
    { id: 'das-simples', nome: 'DAS - Simples Nacional', diaBase: 20, regra: 'posterga', desc: 'Apuração mensal PGDAS-D.', categoria: 'tributario' },
    { id: 'pis-cofins', nome: 'DARF PIS / COFINS / IPI', diaBase: 25, regra: 'antecipa', desc: 'Tributos federais Presumido e Real.', categoria: 'tributario' },
    { id: 'irrf', nome: 'DARF IRRF (0561)', diaBase: 20, regra: 'antecipa', desc: 'Imposto de Renda Retido.', categoria: 'trabalhista' }
  ];
  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  return eventosBase.map(ev => {
    const dE = ajustarVencimento(anoAtual, mesAtual, ev.diaBase, ev.regra);
    const diff = Math.ceil((dE - hoje) / 86400000);
    let st = 'Normal', stC = 'bg-slate-100 text-slate-700';
    if (diff < 0) { st = 'Atrasado'; stC = 'bg-rose-50 text-rose-700 border border-rose-200'; }
    else if (diff <= 3) { st = 'Urgente'; stC = 'bg-amber-50 text-amber-700 border border-amber-200'; }
    return { ...ev, diaFinal: String(dE.getDate()).padStart(2, '0'), dataCompleta: dE.toLocaleDateString('pt-BR'), status: st, statusClass: stC };
  }).sort((a, b) => Number(a.diaFinal) - Number(b.diaFinal));
}