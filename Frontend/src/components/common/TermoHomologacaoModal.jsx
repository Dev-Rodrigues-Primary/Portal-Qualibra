import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, FileText, ArrowRight, AlertTriangle } from 'lucide-react';
import { QualibraLogo } from './QualibraLogo';

export function TermoHomologacaoModal() {
  const [aberto, setAberto] = useState(false);
  const [concordou, setConcordou] = useState(false);

  useEffect(() => {
    try {
      const aceito = localStorage.getItem('qualibra_termo_ciencia_uso_v1');
      if (!aceito) {
        setAberto(true);
      }
    } catch (e) {
      setAberto(true);
    }
  }, []);

  const handleAceitar = () => {
    if (!concordou) return;
    try {
      localStorage.setItem('qualibra_termo_ciencia_uso_v1', JSON.stringify({
        dataAceite: new Date().toISOString(),
        termoVersao: '1.0-homologacao'
      }));
    } catch (e) {}
    setAberto(false);
  };

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in-up">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* CABEÇALHO */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <QualibraLogo size="sm" showText={true} />
          <span className="flex items-center gap-1.5 text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-300 px-3 py-1 rounded-full uppercase">
            <Lock className="w-3.5 h-3.5 text-amber-600" /> Homologação Interna
          </span>
        </div>

        {/* CORPO DO TERMO */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="flex items-center gap-3 text-slate-900 font-black text-lg sm:text-xl tracking-tight">
            <ShieldCheck className="w-6 h-6 text-brand-600 flex-shrink-0" />
            <span>Termo de Ciência, Uso Orientativo e Limitação de Finalidade</span>
          </div>

          <p className="text-slate-600 text-xs">
            Este portal é uma ferramenta interna de apoio operacional do <b>Grupo Qualibra Contabilidade</b>, destinada exclusivamente à realização de simulações preliminares e estimativas. Sua utilização requer a estrita observância das condições abaixo:
          </p>

          <div className="space-y-3 pt-1 text-slate-600 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">1. Natureza Auxiliar e Caráter Orientativo:</span>
              <p>
                Os cálculos, memórias de apuração, projeções tributárias e minutas geradas possuem <b>finalidade estritamente orientativa e preliminar</b>. Os resultados não substituem a legislação vigente, as fontes oficiais, os sistemas governamentais ou a análise técnica individual do profissional contábil responsável.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">2. Dever Obrigatório de Conferência e Validação Profissional:</span>
              <p>
                O usuário/analista deverá obrigatoriamente conferir os dados informados, as premissas adotadas e os resultados apresentados antes de utilizá-los em lançamentos contábeis, apurações fiscais, rescisões trabalhistas ou recolhimentos. É indispensável a validação nos sistemas oficiais pertinentes (Domínio Sistemas, PGDAS-D, DCTFWeb, eSocial e FGTS Digital).
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">3. Limitações Técnicas e Atualizações Normativas:</span>
              <p>
                Embora sejam adotados controles de qualidade, as simulações dependem da correção dos dados inseridos e de interpretações normativas que podem divergir de entendimentos fazendários específicos. Quaisquer inconsistências identificadas deverão ser comunicadas formalmente à equipe de desenvolvimento.
              </p>
            </div>

            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-950 space-y-1">
              <span className="font-bold text-amber-900 block">4. Proibição de Uso Operacional Direto sem Auditoria:</span>
              <p>
                O usuário não deverá utilizar resultados não validados como fundamento exclusivo para operações com efeitos fiscais, contábeis, trabalhistas ou financeiros definitivos.
              </p>
            </div>
          </div>
        </div>

        {/* RODAPÉ E ACEITE */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
          <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-brand-400 transition select-none">
            <input
              type="checkbox"
              checked={concordou}
              onChange={(e) => setConcordou(e.target.checked)}
              className="w-5 h-5 text-brand-600 rounded border-slate-300 focus:ring-brand-500 mt-0.5 cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-800 leading-snug">
              Declaro ciência de que as ferramentas deste portal estão em ambiente de homologação interna e comprometo-me a auditar e conferir todos os cálculos nos sistemas oficiais antes de qualquer uso operacional.
            </span>
          </label>

          <button
            onClick={handleAceitar}
            disabled={!concordou}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
              concordou
                ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer hover:scale-[1.01]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Confirmar Ciência e Acessar Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

export default TermoHomologacaoModal;