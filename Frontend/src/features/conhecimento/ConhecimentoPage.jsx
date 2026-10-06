import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { BookOpen, Search, ChevronRight, HelpCircle } from 'lucide-react';

export function ConhecimentoPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const artigos = [
    {
      id: 'art-1',
      setor: 'Fiscal',
      titulo: 'Como parametrizar o Fator R no encerramento mensal do Simples Nacional',
      objetivo: 'Evitar reenquadramento indevido no Anexo V e planejar retirada de pró-labore.',
      passos: [
        'Apurar a folha de pagamento dos últimos 12 meses (incluindo encargos e pró-labore).',
        'Dividir a folha pela receita bruta acumulada dos últimos 12 meses (RBT12).',
        'Se o resultado for ≥ 28%, tributar pelo Anexo III. Se for inferior, tributar pelo Anexo V.'
      ],
      erros: 'Ignorar o 13º salário na conta ou deixar de somar o pró-labore informado no eSocial.'
    },
    {
      id: 'art-2',
      setor: 'DP',
      titulo: 'Rotina de Envio de Fechamento do eSocial (S-1299)',
      objetivo: 'Garantir a apuração correta da DCTFWeb e emissão tempestiva do DARF Previdenciário.',
      passos: [
        'Transmitir todos os eventos periódicos S-1200 (Remuneração) e S-1210 (Pagamentos).',
        'Efetuar o envio do evento S-1299 indicando o encerramento da competência.',
        'Acessar a DCTFWeb no portal e-CAC para transmissão e emissão da guia única unificada.'
      ],
      erros: 'Fechar a folha sem antes verificar advertências no RET (Registro de Eventos Trabalhistas).'
    },
    {
      id: 'art-3',
      setor: 'Societário',
      titulo: 'Etapas para Alteração de Endereço entre Municípios',
      objetivo: 'Regularizar a empresa perante Junta, RFB, SEFAZ e prefeituras de origem/destino.',
      passos: [
        'Fazer consulta de viabilidade no município de destino.',
        'Elaborar alteração contratual consolidada e protocolar via DBE na Junta Comercial.',
        'Baixar a inscrição municipal na origem e solicitar abertura no novo município.'
      ],
      erros: 'Esquecer de solicitar baixa do alvará na cidade antiga, gerando taxas de fiscalização indevidas.'
    }
  ];

  const filtered = artigos.filter(
    (a) =>
      a.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.setor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.objetivo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Base de Conhecimento' }]} />

      <div className="glass-panel p-6 rounded-2xl border border-slate-200">
        <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
          Wiki & Manuais de Procedimentos
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Base de Conhecimento Interna</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Documentação de rotinas críticas, soluções para erros frequentes e conformidade dos setores.
        </p>

        <div className="mt-4 relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar nos manuais de procedimentos..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl glass-input"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((item) => (
          <div key={item.id} className="glass-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-mono font-bold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-lg">
                Setor: {item.setor}
              </span>
              <span className="text-xs text-slate-400 font-mono">Qualibra Wiki ID: {item.id}</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{item.titulo}</h3>
              <p className="text-xs text-slate-600 mt-1"><b>Objetivo:</b> {item.objetivo}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase font-mono block">Passo a Passo:</span>
              <ol className="list-decimal list-inside text-xs text-slate-700 space-y-1">
                {item.passos.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ol>
            </div>

            <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-xl flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span><b>Ponto de Atenção / Erro Comum:</b> {item.erros}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}