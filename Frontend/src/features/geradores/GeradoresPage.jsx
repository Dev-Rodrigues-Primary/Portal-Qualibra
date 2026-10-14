import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { CurrencyInput } from '../../components/common/CurrencyInput';
import { formatCurrency, parseNumberInput } from '../../utils/formatters';
import { 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  ShieldCheck, 
  DollarSign, 
  User, 
  CreditCard, 
  MapPin, 
  Calendar, 
  Building2, 
  Sparkles,
  Layers,
  FileCheck2,
  Lock
} from 'lucide-react';

// MOTOR MATEMÁTICO DE CONVERSÃO DE VALOR EM REAIS POR EXTENSO
function valorPorExtenso(num) {
  const v = Math.abs(num);
  if (!v || isNaN(v) || v === 0) return 'zero reais';

  const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
  const de10a19 = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

  function converterCentena(n) {
    if (n === 0) return '';
    if (n === 100) return 'cem';
    let res = '';
    const c = Math.floor(n / 100);
    const d = Math.floor((n % 100) / 10);
    const u = n % 10;

    if (c > 0) res += centenas[c];
    if (d === 1) {
      if (res) res += ' e ';
      res += de10a19[u];
      return res;
    }
    if (d > 1) {
      if (res) res += ' e ';
      res += dezenas[d];
    }
    if (u > 0) {
      if (res) res += ' e ';
      res += unidades[u];
    }
    return res;
  }

  const inteiro = Math.floor(v);
  const centavos = Math.round((v - inteiro) * 100);

  const milhoes = Math.floor(inteiro / 1000000);
  const milhares = Math.floor((inteiro % 1000000) / 1000);
  const resto = inteiro % 1000;

  const partes = [];

  if (milhoes > 0) {
    partes.push(converterCentena(milhoes) + (milhoes === 1 ? ' milhão' : ' milhões'));
  }
  if (milhares > 0) {
    partes.push(converterCentena(milhares) + ' mil');
  }
  if (resto > 0 || partes.length === 0) {
    const rTxt = converterCentena(resto);
    if (rTxt) partes.push(rTxt);
  }

  let textoReais = partes.join(' e ') + (inteiro === 1 ? ' real' : ' reais');
  if (inteiro === 0) textoReais = '';

  let textoCentavos = '';
  if (centavos > 0) {
    textoCentavos = converterCentena(centavos) + (centavos === 1 ? ' centavo' : ' centavos');
  }

  if (textoReais && textoCentavos) return `${textoReais} e ${textoCentavos}`;
  if (textoReais) return textoReais;
  if (textoCentavos) return textoCentavos;
  return 'zero reais';
}

export function GeradoresPage() {
  const [tipoDoc, setTipoDoc] = useState('recibo'); // 'recibo' | 'termo' | 'honorarios'
  const [nome, setNome] = useState('João da Silva');
  const [documento, setDocumento] = useState('123.456.789-00');
  const [valor, setValor] = useState(2500);
  const [endereco, setEndereco] = useState('Rua Fictícia, 123 - Centro, São Paulo/SP');
  const [formaPagamento, setFormaPagamento] = useState('Transferência Bancária / PIX');
  const [dadosBancarios, setDadosBancarios] = useState('Chave PIX: 123.456.789-00 (Banco Nubank)');
  const [referente, setReferente] = useState('Serviços técnicos de consultoria e parametrização');
  const [cidade, setCidade] = useState('São Paulo - SP');
  const [copiado, setCopiado] = useState(false);

  const valorNum = parseNumberInput(valor) || 0;
  const extenso = useMemo(() => valorPorExtenso(valorNum), [valorNum]);

  const dataAtualFormatada = useMemo(() => {
    return new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }, []);

  // Hash de verificação único simulado
  const docHash = useMemo(() => {
    return 'QUALIBRA-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-2026';
  }, [tipoDoc, nome, valorNum]);

  // Texto puro formatado para área de transferência
  const textoParaCopiar = useMemo(() => {
    return `GRUPO QUALIBRA CONTABILIDADE • OPERAÇÕES & CONTROLADORIA\n` +
           `DOCUMENTO: ${tipoDoc.toUpperCase()}\n` +
           `VALOR: ${formatCurrency(valorNum)} (${extenso})\n\n` +
           `Recebi(emos) da empresa GRUPO QUALIBRA, a quantia líquida de ${formatCurrency(valorNum)} (${extenso}), referente a ${referente}.\n\n` +
           `Forma de Pagamento: ${formaPagamento}\n` +
           `Dados para Crédito: ${dadosBancarios}\n\n` +
           `Beneficiário: ${nome}\n` +
           `CPF/CNPJ: ${documento}\n` +
           `Endereço: ${endereco}\n\n` +
           `Data de Emissão: ${cidade}, ${dataAtualFormatada}\n` +
           `Autenticidade: ${docHash}`;
  }, [tipoDoc, valorNum, extenso, referente, formaPagamento, dadosBancarios, nome, documento, endereco, cidade, dataAtualFormatada, docHash]);

  const handleCopiar = () => {
    navigator.clipboard.writeText(textoParaCopiar);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in-up">
      
      {/* BREADCRUMBS */}
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Produtividade' }, { label: 'Gerador Estruturado de Documentos e Recibos' }]} />
      </div>

      {/* HEADER EXECUTIVO PREMIUM */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 lg:p-8 text-white shadow-xl border border-slate-700/60 no-print">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-400/30 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Emissor Oficial de Recibos & Termos
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <ShieldCheck className="w-3 h-3" /> Cláusula de Quitação Plena & Impressão A4
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Gerador Estruturado de Documentos
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Conversão automática de valor em Real por extenso, controle de quitação financeira por PIX e espelho de impressão limpo em folha timbrada sem cabeçalhos do navegador.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={handleCopiar} 
              className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-xs rounded-xl backdrop-blur-md border border-white/20 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {copiado ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-200" />}
              <span>{copiado ? 'Texto Copiado!' : 'Copiar Texto'}</span>
            </button>

            <button 
              onClick={() => window.print()} 
              className="w-full sm:w-auto px-4 py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>Imprimir em A4</span>
            </button>
          </div>
        </div>
      </div>

      {/* GRID DE TRABALHO: INPUTS vs FOLHA A4 TIMBRADA */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* COLUNA ESQUERDA: PARÂMETROS DO RECIBO (NO-PRINT) */}
        <div className="no-print xl:col-span-5 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md p-6 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-amber-600" />
                Dados do Beneficiário & Quitação
              </h3>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                Formulário Oficial
              </span>
            </div>

            <div className="space-y-4">
              
              {/* TIPO DE DOCUMENTO */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                  Modelo do Documento
                </label>
                <select 
                  value={tipoDoc} 
                  onChange={e => setTipoDoc(e.target.value)} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 text-xs shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all cursor-pointer"
                >
                  <option value="recibo">Recibo de Pagamento com Quitação Geral</option>
                  <option value="honorarios">Recibo de Honorários e Assessoria Contábil</option>
                  <option value="termo">Termo de Entrega e Devolução de Documentos</option>
                </select>
              </div>

              {/* NOME DO BENEFICIÁRIO */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-500" />
                  Nome do Beneficiário / Razão Social
                </label>
                <input 
                  type="text" 
                  value={nome} 
                  onChange={e => setNome(e.target.value)} 
                  placeholder="Ex: João da Silva ou Empresa Ltda"
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 text-xs shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              {/* CPF OU CNPJ */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                  CPF ou CNPJ
                </label>
                <input 
                  type="text" 
                  value={documento} 
                  onChange={e => setDocumento(e.target.value)} 
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono font-bold text-slate-900 text-xs shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              {/* VALOR LÍQUIDO */}
              <div className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200/70">
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-amber-950 mb-1 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                  Valor Líquido (R$)
                </label>
                <CurrencyInput 
                  value={valor} 
                  onChange={setValor} 
                  className="w-full p-2.5 rounded-xl border border-amber-300 bg-white font-black text-amber-900 text-base shadow-inner focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
                <div className="text-[10px] text-amber-800 font-serif italic mt-1.5 leading-relaxed bg-white/70 p-2 rounded-lg border border-amber-100">
                  <b>Por Extenso:</b> ({extenso})
                </div>
              </div>

              {/* FORMA DE PAGAMENTO */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                  Forma de Pagamento
                </label>
                <select 
                  value={formaPagamento} 
                  onChange={e => setFormaPagamento(e.target.value)} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 text-xs shadow-inner"
                >
                  <option value="Transferência Bancária / PIX">Transferência Bancária / Chave PIX</option>
                  <option value="Dinheiro em Espécie">Dinheiro em Espécie (Moeda Corrente Nacional)</option>
                  <option value="Cheque Nominal">Cheque Nominal ao Beneficiário</option>
                  <option value="Boleto Bancário Quitado">Boleto Bancário / Compensação</option>
                </select>
              </div>

              {/* CHAVE PIX / CONTA BANCÁRIA */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                  Chave PIX / Dados Bancários de Destino
                </label>
                <input 
                  type="text" 
                  value={dadosBancarios} 
                  onChange={e => setDadosBancarios(e.target.value)} 
                  placeholder="Ex: Chave PIX: email@exemplo.com ou Banco, Ag, Conta"
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono font-medium text-slate-800 text-xs shadow-inner"
                />
              </div>

              {/* REFERENTE A */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                  Referente a (Discriminação da Obrigação)
                </label>
                <textarea 
                  rows="2"
                  value={referente} 
                  onChange={e => setReferente(e.target.value)} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-800 text-xs shadow-inner resize-none leading-relaxed"
                />
              </div>

              {/* ENDEREÇO & CIDADE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                    Endereço Completo
                  </label>
                  <input 
                    type="text" 
                    value={endereco} 
                    onChange={e => setEndereco(e.target.value)} 
                    className="w-full p-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                    Praça de Emissão
                  </label>
                  <input 
                    type="text" 
                    value={cidade} 
                    onChange={e => setCidade(e.target.value)} 
                    className="w-full p-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: ESPELHO DA FOLHA A4 TIMBRADA */}
        <div className="xl:col-span-7">
          
          {/* FOLHA A4 COM ELEVAÇÃO REALISTA */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 lg:p-12 space-y-8 relative overflow-hidden transition-all print:shadow-none print:border-none print:p-0 print:m-0 print:rounded-none">
            
            {/* LINHA PRISMÁTICA NO TOPO DO PAPEL */}
            <div className="h-[3px] w-full bg-gradient-to-r from-emerald-500 via-amber-400 via-rose-500 via-purple-600 to-cyan-500 opacity-80 rounded-full"></div>

            {/* CABEÇALHO DO PAPEL TIMBRADO */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">
                  GRUPO QUALIBRA CONTABILIDADE
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Controladoria, Auditoria & Consultoria Financeira • (11) 2897-4595
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  portalqualibra.local • Operação Interna Blindada
                </p>
              </div>

              <div className="text-right font-mono self-start sm:self-auto">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Controle de Emissão
                </span>
                <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 block mt-1">
                  {docHash}
                </span>
              </div>
            </div>

            {/* TÍTULO DO DOCUMENTO */}
            <div className="text-center py-2">
              <h3 className="text-lg font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 inline-block px-4 pb-1">
                {tipoDoc === 'recibo' && 'RECIBO DE PAGAMENTO & QUITAÇÃO'}
                {tipoDoc === 'honorarios' && 'RECIBO DE HONORÁRIOS PROFISSIONAIS'}
                {tipoDoc === 'termo' && 'TERMO DE ENTREGA & PROTOCOLO DE DOCUMENTOS'}
              </h3>
            </div>

            {/* BOX DO VALOR EM DESTAQUE */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                Valor Líquido Quitado
              </span>
              <div className="text-3xl font-black font-mono text-slate-950">
                {formatCurrency(valorNum)}
              </div>
              <p className="text-xs text-slate-600 font-serif italic max-w-xl mx-auto">
                ({extenso})
              </p>
            </div>

            {/* CORPO DO TEXTO JURÍDICO DO RECIBO */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed text-justify font-sans">
              <p>
                Recebi(emos) da empresa <b>GRUPO QUALIBRA CONTABILIDADE</b>, inscrita no âmbito corporativo sob denominação regular, a quantia líquida de <b>{formatCurrency(valorNum)}</b> (<i>{extenso}</i>), referente à quitação discriminada de: <b>{referente}</b>.
              </p>

              <p>
                Declaro(amos) que o respectivo pagamento foi devidamente processado e quitado por meio de <b>{formaPagamento}</b>, tendo como destino creditício a conta/chave: <b>{dadosBancarios}</b>.
              </p>

              <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 italic">
                Pela clareza e exatidão do montante recebido, firmo(amos) o presente documento dando <b>plena, rasa, geral e irrevogável quitação</b> de todas as obrigações pertinentes ao objeto discriminado, para nada mais reclamar em tempo algum, a qualquer título.
              </p>
            </div>

            {/* QUALIFICAÇÃO DO BENEFICIÁRIO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50/60 p-4 rounded-2xl border border-slate-100 font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Beneficiário / Razão Social:</span>
                <span className="font-bold text-slate-900">{nome}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">CPF / CNPJ:</span>
                <span className="font-bold text-slate-900">{documento}</span>
              </div>
              <div className="sm:col-span-2 pt-1 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Endereço Declarado:</span>
                <span className="text-slate-700">{endereco}</span>
              </div>
            </div>

            {/* DATAÇÃO E ASSINATURA */}
            <div className="pt-6 space-y-8">
              <div className="text-right text-xs font-mono text-slate-600">
                {cidade}, {dataAtualFormatada}.
              </div>

              <div className="pt-8 flex flex-col items-center justify-center text-center">
                <div className="w-72 border-t-2 border-slate-900 mb-2"></div>
                <span className="font-black text-xs text-slate-900 uppercase">{nome}</span>
                <span className="text-[10px] font-mono text-slate-500">CPF/CNPJ: {documento}</span>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">Assinatura do Recebedor</span>
              </div>
            </div>

            {/* RODAPÉ DO DOCUMENTO COM SELO DE AUDITORIA */}
            <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-400 gap-2">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                Documento corporativo com fé de quitação interna
              </span>
              <span>Qualibra Controladoria • Emissão {new Date().getFullYear()}</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default GeradoresPage;