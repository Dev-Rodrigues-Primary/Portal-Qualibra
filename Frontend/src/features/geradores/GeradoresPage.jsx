import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { Printer, Copy, Check, Search, Loader2, Building, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export function GeradoresPage() {
  const [copied, setCopied] = useState(false);
  const [loadingCnpj, setLoadingCnpj] = useState(false);
  const [cnpjStatus, setCnpjStatus] = useState('');

  const [nomeBeneficiario, setNomeBeneficiario] = useState('João da Silva');
  const [documento, setDocumento] = useState('60.746.948/0001-12');
  const [valor, setValor] = useState(1500);
  const [referente, setReferente] = useState('Serviços de consultoria técnica e parametrização tributária');
  const [dataDoc, setDataDoc] = useState(new Date().toLocaleDateString('pt-BR'));

  // Funcao que consulta a Receita Federal diretamente
  const consultarCnpjNaReceita = async (cnpjDigitado) => {
    const limpo = cnpjDigitado.replace(/\D/g, '');
    if (limpo.length !== 14) return;

    setLoadingCnpj(true);
    setCnpjStatus('Consultando base da Receita Federal...');

    try {
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${limpo}`);
      if (!response.ok) {
        throw new Error('CNPJ não localizado na base da Receita Federal.');
      }
      const data = await response.json();
      if (data.razao_social) {
        setNomeBeneficiario(data.razao_social);
        setCnpjStatus(`✓ Localizado: ${data.razao_social} (${data.municipio || ''}-${data.uf || ''})`);
      }
    } catch (err) {
      setCnpjStatus('⚠️ Não foi possível localizar a Razão Social para este CNPJ.');
    } finally {
      setLoadingCnpj(false);
    }
  };

  const handleDocumentoChange = (e) => {
    const valorDigitado = e.target.value;
    setDocumento(valorDigitado);
    const apenasNum = valorDigitado.replace(/\D/g, '');
    if (apenasNum.length === 14) {
      consultarCnpjNaReceita(apenasNum);
    } else {
      setCnpjStatus('');
    }
  };

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
          Digite qualquer CNPJ de 14 dígitos para preencher a Razão Social oficial automaticamente via Receita Federal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Formulário */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200 pb-3">
            Dados para Preenchimento
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              CPF ou CNPJ (Busca Automática)
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={documento}
                onChange={handleDocumentoChange}
                placeholder="Digite o CNPJ..."
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl glass-input text-sm font-mono"
              />
              <button
                type="button"
                onClick={() => consultarCnpjNaReceita(documento)}
                className="absolute right-2 p-1.5 text-slate-400 hover:text-brand-600 transition"
                title="Consultar CNPJ na Receita"
              >
                {loadingCnpj ? <Loader2 className="w-4 h-4 animate-spin text-brand-600" /> : <Search className="w-4 h-4" />}
              </button>
            </div>
            {cnpjStatus && (
              <span className={`text-[11px] mt-1.5 block font-medium ${loadingCnpj ? 'text-brand-600' : cnpjStatus.startsWith('✓') ? 'text-emerald-600' : 'text-amber-600'}`}>
                {cnpjStatus}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Nome do Beneficiário / Razão Social</label>
            <input
              type="text"
              value={nomeBeneficiario}
              onChange={(e) => setNomeBeneficiario(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Valor Líquido (R$)</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(parseFloat(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
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

            <pre className="p-4 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed shadow-sm">
              {documentoGerado}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
            * Consulta em tempo real integrada à base pública da Receita Federal.
          </div>
        </div>
      </div>
    </div>
  );
}