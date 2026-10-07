import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { Printer, Copy, Check } from 'lucide-react';
import { formatCurrency, valorPorExtenso } from '../../utils/formatters';

export function GeradoresPage() {
  const [copied, setCopied] = useState(false);

  // Campos Enriquecidos
  const [nomeBeneficiario, setNomeBeneficiario] = useState('João da Silva');
  const [cpfCnpjBeneficiario, setCpfCnpjBeneficiario] = useState('123.456.789-00');
  const [endereco, setEndereco] = useState('Rua Fictícia, 123 - Centro, São Paulo/SP');
  const [formaPagamento, setFormaPagamento] = useState('Transferência Bancária / PIX');
  const [valor, setValor] = useState(2500);
  const [referente, setReferente] = useState('Serviços técnicos de consultoria e parametrização');
  const [dataDoc, setDataDoc] = useState(new Date().toLocaleDateString('pt-BR'));

  const valorExtenso = valorPorExtenso(valor);

  const documentoGerado = `RECIBO DE PAGAMENTO

Recebi(emos) da empresa GRUPO QUALIBRA, a quantia líquida de ${formatCurrency(valor)} (${valorExtenso}), referente a ${referente}.

O pagamento foi efetuado na data de emissão deste documento, por meio de ${formaPagamento}.

Pela clareza e exatidão do recebido, firmo(amos) o presente recibo dando plena, geral e irrevogável quitação.

Beneficiário: ${nomeBeneficiario}
CPF / CNPJ: ${cpfCnpjBeneficiario}
Endereço: ${endereco}

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
      <div className="no-print"><Breadcrumbs items={[{ label: 'Gerador de Documentos e Recibos' }]} /></div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-200">
        <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
          Produtividade Corporativa
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Gerador Estruturado de Termos e Recibos</h2>
        <p className="text-xs text-slate-500 mt-0.5">Conversão automática para extenso em português e layout de impressão limpo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="no-print lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">Dados para Preenchimento</h3>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Nome do Beneficiário / Razão Social</label>
            <input type="text" value={nomeBeneficiario} onChange={e=>setNomeBeneficiario(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">CPF ou CNPJ</label>
              <input type="text" value={cpfCnpjBeneficiario} onChange={e=>setCpfCnpjBeneficiario(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Valor Líquido (R$)</label>
              <input type="number" value={valor} onChange={e=>setValor(parseFloat(e.target.value)||0)} className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Endereço Completo</label>
            <input type="text" value={endereco} onChange={e=>setEndereco(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm" />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Forma de Pagamento</label>
            <select value={formaPagamento} onChange={e=>setFormaPagamento(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm">
              <option value="Transferência Bancária / PIX">Transferência Bancária / PIX</option>
              <option value="Dinheiro em Espécie">Dinheiro em Espécie</option>
              <option value="Cheque Nominal">Cheque Nominal</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Referente a</label>
            <textarea rows={2} value={referente} onChange={e=>setReferente(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm" />
          </div>
        </div>

        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="no-print flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <span className="text-sm font-bold text-slate-900 uppercase font-mono">Pré-Visualização do Documento</span>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex gap-1.5 transition">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600"/> : <Copy className="w-3.5 h-3.5"/>}
                  <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
                </button>
                <button onClick={()=>window.print()} className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium flex gap-1.5 transition shadow-xs">
                  <Printer className="w-3.5 h-3.5"/> Imprimir
                </button>
              </div>
            </div>
            <pre className="p-5 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed shadow-xs">
              {documentoGerado}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}