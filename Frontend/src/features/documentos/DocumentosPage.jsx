import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { FileText, Download, Eye, BookOpen, Table } from 'lucide-react';

export function DocumentosPage() {
  const [tab, setTab] = useState('modelos');

  const documentos = [
    {
      tipo: 'modelos',
      titulo: 'Contrato Padrão de Prestação de Serviços Contábeis',
      desc: 'Minuta contratual com cláusulas de LGPD, responsabilidades e honorários.',
      formato: 'DOCX'
    },
    {
      tipo: 'modelos',
      titulo: 'Modelo de Procuração e-CAC / Receita Federal',
      desc: 'Procuração para representação de pessoa jurídica perante órgãos fazendários.',
      formato: 'DOCX'
    },
    {
      tipo: 'manuais',
      titulo: 'Manual de Retenções na Fonte (IRRF, PCC, ISS)',
      desc: 'Guia prático para departamento de faturamento e notas fiscais de entrada.',
      formato: 'PDF'
    },
    {
      tipo: 'manuais',
      titulo: 'Manual Operacional de Fechamento de Folha no eSocial',
      desc: 'Cronograma, conferência de S-1200, S-1210 e fechamento S-1299.',
      formato: 'PDF'
    },
    {
      tipo: 'tabelas',
      titulo: 'Tabela Vigente do Simples Nacional (Anexos I a V)',
      desc: 'Faixas de receita bruta, alíquotas nominais e parcelas a deduzir da LC 123/2006.',
      formato: 'XLSX'
    },
    {
      tipo: 'tabelas',
      titulo: 'Tabela de Incidência Previdenciária e IRRF 2025/2026',
      desc: 'Teto do INSS, salários de contribuição e faixas progressivas do IR retido na fonte.',
      formato: 'PDF'
    }
  ];

  const filtered = documentos.filter((d) => d.tipo === tab);

  const handleDownload = (titulo) => {
    alert(`Download do arquivo "${titulo}" iniciado (Template corporativo Qualibra).`);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Central de Documentos' }]} />

      <div className="glass-panel p-6 rounded-2xl border border-slate-200">
        <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
          Repositório de Modelos & Manuais
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Central de Documentos e Tabelas</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Acesso e download de minutas contratuais, manuais internos dos setores e tabelas fiscais de conferência.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-4">
        {[
          { id: 'modelos', label: 'Modelos de Minutas', icon: FileText },
          { id: 'manuais', label: 'Manuais Operacionais', icon: BookOpen },
          { id: 'tabelas', label: 'Tabelas Fiscais & Trabalhistas', icon: Table }
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 transition border-b-2 ${
                tab === t.id
                  ? 'border-brand-600 text-brand-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, idx) => (
          <div key={idx} className="glass-card p-5 rounded-2xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-bold border border-brand-200">
                  {item.formato}
                </span>
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">{item.titulo}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleDownload(item.titulo)}
                className="flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Modelo</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}