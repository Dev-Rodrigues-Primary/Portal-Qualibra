import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { Printer, Copy, Check, FileCheck } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export function GeradoresPage() {
  const [tipo, setTipo] = useState('recibo');
  const [copied, setCopied] = useState(false);

  // Estados dos campos
  const [nomeBeneficiario, setNomeBeneficiario] = useState('João da Silva');
  const [documento, setDocumento] = useState('123.456.789-00');
  const [valor, setValor] = useState(1500);
  const [referente, setReferente] = useState('Serviços de consultoria técnica em parametrização');
  const [dataDoc, setDataDoc] = useState(new Date().toLocaleDateString('pt-BR'));

  const documentoGerado = `RECIBO DE PAGAMENTO

Recebi(emos) de GRUPO QUALIBRA, a quantia líquida de ${formatCurrency(valor)}, referente a ${referente}.

Pela clareza e exatidão do recebido, firmo(amos) o presente recibo dando plena, geral e irrevogável quitação.

Beneficiário: ${nomeBeneficiario}
CPF / CNPJ: ${documento}
Data de Emissão: ${dataDoc}

___________________________________________________
Assinatura do Beneficiário`;

  const handleCopy = () => {
    navigator.clipboard.writeText(documentoGerado);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Geradores de Documentos' }]} />

      <div className="glass-panel p-6 rounded-2xl border border-slate-200">
        <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
          Produtividade Corporativa
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Gerador Estruturado de Termos e Recibos</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Preencha os campos ao lado para gerar documentos padronizados com cópia rápida e impressão formatada.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Formulário */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Dados para Preenchimento
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Nome do Beneficiário / Razão</label>
            <input
              type="text"
              value={nomeBeneficiario}
              onChange={(e) => setNomeBeneficiario(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">CPF / CNPJ</label>
              <input
                type="text"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Valor (R$)</label>
              <input
                type="number"
                value={valor}
                onChange={(e) => setValor(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Referente a</label>
            <textarea
              rows={3}
              value={referente}
              onChange={(e) => setReferente(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>
        </div>

        {/* Pré-Visualização */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <span className="text-sm font-bold text-slate-900 uppercase font-mono">Pré-visualização do Documento</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium flex items-center gap-1.5 transition shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir</span>
                </button>
              </div>
            </div>

            <pre className="p-4 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
              {documentoGerado}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
            * Modelo administrativo padronizado pelo Grupo Qualibra.
          </div>
        </div>
      </div>
    </div>
  );
}