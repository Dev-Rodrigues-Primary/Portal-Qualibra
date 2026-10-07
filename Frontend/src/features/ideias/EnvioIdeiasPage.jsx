import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { Lightbulb, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, X, Mail, ShieldCheck } from 'lucide-react';

export function EnvioIdeiasPage() {
  // E-mail de destino FIXO E OBRIGATÓRIO
  const EMAIL_DESTINO = 'suporte.TI@qualibra.com.br';

  // Campos do formulário
  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('Fiscal');
  const [emailRemetente, setEmailRemetente] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  // Estados de controle
  const [enviando, setEnviando] = useState(false);
  const [toastSucesso, setToastSucesso] = useState(false);
  const [erroEnvio, setErroEnvio] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroEnvio('');

    if (!nome.trim() || !emailRemetente.trim() || !titulo.trim() || !descricao.trim()) {
      setErroEnvio('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setEnviando(true);

    try {
      // Envio direto para suporte.TI@qualibra.com.br via FormSubmit AJAX
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(EMAIL_DESTINO)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `💡 [Portal Qualibra] Nova Sugestão / Ideia: ${titulo}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: emailRemetente,
          Destinatario_Oficial: EMAIL_DESTINO,
          Nome_Colaborador: nome,
          Setor_Departamento: setor,
          Email_Retorno: emailRemetente,
          Titulo_Ideia: titulo,
          Detalhamento_Ideia: descricao,
          Data_Envio: new Date().toLocaleString('pt-BR')
        })
      });

      const data = await response.json();

      if (response.ok || data.success === 'true' || data.success === true) {
        // Dispara notificação no canto superior esquerdo
        setToastSucesso(true);
        // Limpa os campos
        setNome('');
        setTitulo('');
        setDescricao('');
        setEmailRemetente('');

        // Fecha a notificação automaticamente após 6 segundos
        setTimeout(() => setToastSucesso(false), 6000);
      } else {
        throw new Error(data.message || 'Erro ao enviar o e-mail.');
      }
    } catch (err) {
      setErroEnvio('Não foi possível enviar o e-mail. Verifique a conexão com a internet.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up relative">
      
      {/* ================= TOAST NOTIFICATION NO CANTO SUPERIOR ESQUERDO ================= */}
      {toastSucesso && (
        <div className="fixed top-5 left-5 z-50 max-w-sm w-full bg-white border border-emerald-300 rounded-2xl shadow-2xl p-4 flex items-start space-x-3 animate-fade-in-up border-l-4 border-l-emerald-500">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-grow pr-2">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-sm">Ideia Enviada com Sucesso!</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Sua sugestão foi enviada diretamente para <b>{EMAIL_DESTINO}</b>.
            </p>
          </div>
          <button
            onClick={() => setToastSucesso(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <Breadcrumbs items={[{ label: 'Central de Sugestões & Ideias' }]} />

      {/* Banner de Apresentação */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase inline-flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" /> Canal Aberto de Inovação
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Envie sua Ideia para o Portal</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Sugira novas calculadoras, rotinas fiscais ou melhorias operacionais diretamente para a TI.
          </p>
        </div>

        {/* Destinatário Fixo */}
        <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-xs min-w-[260px]">
          <div className="text-slate-400 font-mono text-[10px] uppercase flex items-center gap-1">
            <Mail className="w-3 h-3 text-brand-600" />
            <span>Destino Oficial:</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="font-mono font-bold text-slate-900 text-xs">{EMAIL_DESTINO}</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" title="Canal Verificado da Qualibra" />
          </div>
        </div>
      </div>

      {/* Formulário de Envio */}
      <div className="max-w-2xl mx-auto glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Seu Nome Completo *
              </label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Mariana Costa"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Seu E-mail para Retorno *
              </label>
              <input
                type="email"
                required
                value={emailRemetente}
                onChange={(e) => setEmailRemetente(e.target.value)}
                placeholder="seu.email@qualibra.com.br"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Setor / Departamento
              </label>
              <select
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
              >
                <option value="Fiscal">Setor Fiscal</option>
                <option value="Contábil">Setor Contábil</option>
                <option value="DP">Departamento Pessoal</option>
                <option value="Societário">Societário / Legalização</option>
                <option value="TI">TI & Sistemas</option>
                <option value="Diretoria">Diretoria / Geral</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Título da Ideia *
              </label>
              <input
                type="text"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Nova calculadora de Difal / ICMS-ST"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Descreva sua Ideia ou Ferramenta Desejada *
            </label>
            <textarea
              required
              rows={5}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Explique como essa ferramenta ajudaria sua rotina, quais seriam as entradas de dados e o resultado esperado..."
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          {erroEnvio && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{erroEnvio}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-brand-600/20 text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            {enviando ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitindo para suporte.TI@qualibra.com.br...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Enviar Sugestão para TI</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-slate-400 font-mono">
          * Mensagem enviada diretamente para a caixa postal <b>suporte.TI@qualibra.com.br</b>.
        </div>
      </div>
    </div>
  );
}