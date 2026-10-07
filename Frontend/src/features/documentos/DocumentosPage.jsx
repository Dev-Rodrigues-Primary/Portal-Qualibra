import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { FileText, Download, BookOpen, Table, Search, CheckCircle } from 'lucide-react';

export function DocumentosPage() {
  const [tab, setTab] = useState('modelos');
  const [search, setSearch] = useState('');
  const [downloading, setDownloading] = useState('');

  const documentos = [
    {
      tipo: 'modelos',
      titulo: 'Contrato de Prestação de Serviços Contábeis',
      desc: 'Minuta contratual completa com cláusulas de LGPD, responsabilidades e honorários.',
      formato: 'DOCX',
      arquivo: '/documents/modelo_contrato_servicos_qualibra.docx'
    },
    {
      tipo: 'modelos',
      titulo: 'Modelo de Procuração e-CAC / RFB',
      desc: 'Procuração padronizada para representação corporativa perante a Receita Federal.',
      formato: 'DOCX',
      arquivo: '/documents/modelo_procuracao_ecac.docx'
    },
    {
      tipo: 'manuais',
      titulo: 'Manual de Retenções na Fonte (IRRF, PCC, ISS)',
      desc: 'Procedimento Operacional Padrão (POP) para conferência de notas fiscais de entrada.',
      formato: 'PDF',
      arquivo: '/documents/manual_retencoes_fonte.pdf'
    },
    {
      tipo: 'manuais',
      titulo: 'Manual de Fechamento de Folha no eSocial',
      desc: 'Cronograma operacional e validação de rubricas S-1200, S-1210 e fechamento S-1299.',
      formato: 'PDF',
      arquivo: '/documents/manual_fechamento_esocial.pdf'
    },
    {
      tipo: 'tabelas',
      titulo: 'Tabela do Simples Nacional 2026 (Anexos I a V)',
      desc: 'Faixas de receita bruta acumulada, alíquotas nominais e deduções da LC 123/2006.',
      formato: 'XLSX',
      arquivo: '/documents/tabela_simples_nacional_2026.xlsx'
    },
    {
      tipo: 'tabelas',
      titulo: 'Tabela Progressiva INSS e IRPF 2026',
      desc: 'Faixas vigentes de retenção na fonte, teto do RGPS e dedução simplificada.',
      formato: 'PDF',
      arquivo: '/documents/tabela_inss_irpf_2026.pdf'
    }
  ];

  const handleDownload = (doc) => {
    setDownloading(doc.titulo);
    setTimeout(() => {
      // Simula download com criação de arquivo dinâmico caso não exista arquivo físico
      const element = document.createElement('a');
      const file = new Blob([`Documento Padronizado Grupo Qualibra: ${doc.titulo}\nFormato: ${doc.formato}\nEmitido em: ${new Date().toLocaleDateString('pt-BR')}`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${doc.titulo.toLowerCase().replace(/\s+/g, '_')}.${doc.formato.toLowerCase()}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloading('');
    }, 400);
  };

  const filtered = documentos.filter((d) => {
    const matchesTab = d.tipo === tab;
    const matchesSearch = d.titulo.toLowerCase().includes(search.toLowerCase()) || d.desc.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in-up">
      <div className="no-print"><Breadcrumbs items={[{ label: 'Central de Documentos & Modelos' }]} /></div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
            Repositório Institucional de Modelos & Manuais
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Central de Documentos e Tabelas</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Modelos de minutas contratuais, Procedimentos Operacionais Padrão (POPs) e planilhas oficiais.
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar manual, minuta ou tabela..."
            className="pl-8 pr-3 py-2 text-xs rounded-xl glass-input w-full sm:w-64"
          />
        </div>
      </div>

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
                tab === t.id ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500 hover:text-slate-800'
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
                onClick={() => handleDownload(item)}
                disabled={downloading === item.titulo}
                className="flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800 transition"
              >
                {downloading === item.titulo ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>{downloading === item.titulo ? 'Baixando...' : 'Baixar Arquivo'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}