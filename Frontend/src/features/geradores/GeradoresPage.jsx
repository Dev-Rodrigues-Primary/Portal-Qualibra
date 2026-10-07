import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { Printer, Copy, Check, QrCode, Building2, CheckCircle2 } from 'lucide-react';
import { formatCurrency, valorPorExtenso } from '../../utils/formatters';

export function GeradoresPage() {
  const [copied, setCopied] = useState(false);

  // Campos do Recibo
  const [nomeBeneficiario, setNomeBeneficiario] = useState('João da Silva');
  const [cpfCnpjBeneficiario, setCpfCnpjBeneficiario] = useState('123.456.789-00');
  const [endereco, setEndereco] = useState('Rua Fictícia, 123 - Centro, São Paulo/SP');
  const [formaPagamento, setFormaPagamento] = useState('Transferência Bancária / PIX');
  const [dadosBancarios, setDadosBancarios] = useState('Chave PIX: 123.456.789-00 (Banco Nubank)');
  const [valor, setValor] = useState(2500);
  const [referente, setReferente] = useState('Serviços técnicos de consultoria e parametrização');
  const [dataDoc, setDataDoc] = useState(new Date().toLocaleDateString('pt-BR'));

  const valorExtenso = valorPorExtenso(valor);

  const isPixOuTransf = formaPagamento.includes('PIX') || formaPagamento.includes('Transferência');
  const linhaBancaria = isPixOuTransf && dadosBancarios.trim() 
    ? `\nDados para Crédito: ${dadosBancarios}` 
    : '';

  const documentoGerado = `===============================================================
       GRUPO QUALIBRA • CONTROLADORIA & OPERAÇÕES FINANCEIRAS
===============================================================

RECIBO DE PAGAMENTO

Recebi(emos) da empresa GRUPO QUALIBRA, a quantia líquida de ${formatCurrency(valor)} (${valorExtenso}), referente a ${referente}.

O pagamento foi quitado na data de emissão deste documento, por meio de ${formaPagamento}.${linhaBancaria}

Pela clareza e exatidão do recebido, firmo(amos) o presente recibo dando plena, geral e irrevogável quitação de todas as obrigações pertinentes.

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
    <div className="space-y-6 pb-12 animate-fade-in-up">
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Gerador de Documentos e Recibos' }]} />
      </div>

      <div className="glass-panel p-6 lg:p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full uppercase flex items-center gap-1.5 w-fit">
            <Building2 className="w-3.5 h-3.5" /> Produtividade Corporativa & Jurídica
          </span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Gerador Estruturado de Termos e Recibos
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl">
            Conversão automática de valor por extenso em Real (BRL), suporte a chaves PIX/contas bancárias e formatação de impressão limpa.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* ================= LADO ESQUERDO: PARÂMETROS ================= */}
        <div className="no-print xl:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 bg-white">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 text-sm">
              Dados para Preenchimento do Recibo
            </h3>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Beneficiário / Razão Social</label>
                <input 
                  type="text" 
                  value={nomeBeneficiario} 
                  onChange={e => setNomeBeneficiario(e.target.value)} 
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-semibold text-slate-900" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CPF ou CNPJ</label>
                  <input 
                    type="text" 
                    value={cpfCnpjBeneficiario} 
                    onChange={e => setCpfCnpjBeneficiario(e.target.value)} 
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Valor Líquido (R$)</label>
                  <input 
                    type="number" 
                    value={valor} 
                    onChange={e => setValor(parseFloat(e.target.value) || 0)} 
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono font-bold text-brand-700" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Endereço Completo</label>
                <input 
                  type="text" 
                  value={endereco} 
                  onChange={e => setEndereco(e.target.value)} 
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-slate-800" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Forma de Pagamento</label>
                <select 
                  value={formaPagamento} 
                  onChange={e => setFormaPagamento(e.target.value)} 
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-medium"
                >
                  <option value="Transferência Bancária / PIX">Transferência Bancária / PIX</option>
                  <option value="Dinheiro em Espécie (Moeda Corrente Nacional)">Dinheiro em Espécie</option>
                  <option value="Cheque Nominal">Cheque Nominal</option>
                </select>
              </div>

              {/* CAMPO CONDICIONAL DE DADOS BANCÁRIOS / PIX */}
              {isPixOuTransf && (
                <div className="p-3 bg-brand-50/50 border border-brand-200 rounded-xl space-y-1 animate-fade-in-up">
                  <label className="block text-xs font-bold text-brand-900 flex items-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5 text-brand-600" />
                    Chave PIX / Dados Bancários do Beneficiário
                  </label>
                  <input 
                    type="text" 
                    value={dadosBancarios} 
                    onChange={e => setDadosBancarios(e.target.value)} 
                    placeholder="Ex: Chave PIX celular / e-mail ou Banco, Agência e Conta"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-brand-300 text-xs font-mono text-slate-800" 
                  />
                  <span className="text-[10px] text-brand-700 block">
                    Será impresso no corpo do documento como comprovante de destino do crédito.
                  </span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Referente a</label>
                <textarea 
                  rows={2} 
                  value={referente} 
                  onChange={e => setReferente(e.target.value)} 
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-sm" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= LADO DIREITO: PRÉ-VISUALIZAÇÃO (FOLHA TIMBRADA) ================= */}
        <div className="xl:col-span-7 glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm bg-white">
          <div>
            <div className="no-print flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <span className="text-sm font-bold text-slate-900 uppercase font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Espelho do Documento Formatado
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={handleCopy} 
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Texto Copiado!' : 'Copiar Texto'}</span>
                </button>
                <button 
                  onClick={() => window.print()} 
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir em A4</span>
                </button>
              </div>
            </div>

            {/* FOLHA DE RECIBO COM SOMBRA E BORDA NITIDA */}
            <div className="bg-slate-50 p-2 sm:p-4 rounded-xl border border-slate-200 overflow-x-auto">
              <pre className="p-6 sm:p-8 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed shadow-sm min-h-[360px]">
                {documentoGerado}
              </pre>
            </div>
          </div>

          <div className="no-print mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
            * O texto acima contém cláusula de quitação válida para comprovação financeira perante auditorias internas.
          </div>
        </div>

      </div>
    </div>
  );
}