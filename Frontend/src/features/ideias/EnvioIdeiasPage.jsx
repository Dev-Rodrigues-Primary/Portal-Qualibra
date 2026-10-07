import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { Lightbulb, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, X, Mail } from 'lucide-react';

export function EnvioIdeiasPage() {
  // E-mail de destino padrão (você pode editar aqui ou na tela)
  const [emailDestino, setEmailDestino] = useState('qualibra.dev@gmail.com');
  const [editandoDestino, setEditandoDestino] = useState(false);

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

    if (!nome || !emailRemetente || !titulo || !descricao) {
      setErroEnvio('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setEnviando(true);

    try {
      // Envio real via API do FormSubmit (AJAX sem redirecionamento)
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(emailDestino)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `💡 Nova Ideia para o Portal Qualibra: ${titulo}`,
          _template: 'table',
          Nome: nome,
          Setor: setor,
          Email_Contato: emailRemetente,
          Titulo_Ideia: titulo,
          Descricao: descricao,
          Enviado_Em: new Date().toLocaleString('pt-BR')
        })
      });

      const data = await response.json();

      if (response.ok || data.success === 'true' || data.success === true) {
        // Dispara a notificacao no canto superior esquerdo
        setToastSucesso(true);
        // Limpa o formulario
        setNome('');
        setTitulo('');
        setDescricao('');
        setEmailRemetente('');

        // Fecha a notificacao automaticamente apos 6 segundos
        setTimeout(() => setToastSucesso(false), 6000);
      } else {
        throw new Error(data.message || 'Erro ao enviar o e-mail.');
      }
    } catch (err) {
      setErroEnvio('Não foi possível enviar o e-mail no momento. Verifique sua conexão.');
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
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Sua sugestão foi enviada diretamente para a caixa de entrada da Qualibra. Obrigado pela colaboração!
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
            Tem sugestão de uma nova calculadora, rotina ou melhoria? Envie agora para a equipe de desenvolvimento!
          </p>
        </div>

        {/* Destinatário */}
        <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-xs">
          <div className="text-slate-400 font-mono text-[10px] uppercase">E-mail de Destino:</div>
          {editandoDestino ? (
            <div className="flex gap-1 mt-1">
              <input
                type="email"
                value={emailDestino}
                onChange={(e) => setEmailDestino(e.target.value)}
                className="px-2 py-1 text-xs border border-brand-300 rounded font-mono"
              />
              <button
                onClick={() => setEditandoDestino(false)}
                className="px-2 py-1 bg-brand-600 text-white rounded text-[11px]"
              >
                Salvar
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2 mt-0.5">
              <span className="font-mono font-semibold text-slate-800">{emailDestino}</span>
              <button
                onClick={() => setEditandoDestino(true)}
                className="text-[10px] text-brand-600 hover:underline"
              >
                (Alterar)
              </button>
            </div>
          )}
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
                placeholder="seu.email@empresa.com"
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
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-brand-600/20 text-sm flex items-center justify-center gap-2"
          >
            {enviando ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Enviando Ideia por E-mail...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Enviar Sugestão por E-mail</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-slate-400 font-mono">
          * As sugestões são enviadas diretamente para a caixa postal e analisadas pela equipe de tecnologia.
        </div>
      </div>
    </div>
  );
}