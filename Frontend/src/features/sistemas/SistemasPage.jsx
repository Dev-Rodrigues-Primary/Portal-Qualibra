import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { ExternalLink, ShieldCheck, Filter } from 'lucide-react';

export function SistemasPage() {
  const [filterDept, setFilterDept] = useState('all');

  const sistemas = [
    {
      nome: 'Portal e-CAC (Receita Federal)',
      desc: 'Centro Virtual de Atendimento da Receita Federal (Certificado Digital / Gov.br).',
      url: 'https://cav.receita.fazenda.gov.br/',
      depto: 'Fiscal',
      badge: 'Federal'
    },
    {
      nome: 'Portal do Simples Nacional',
      desc: 'PGDAS-D, DEFIS, parcelamentos fiscais e consulta de optantes.',
      url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/',
      depto: 'Fiscal',
      badge: 'Federal'
    },
    {
      nome: 'eSocial Web Geral',
      desc: 'Escrituração digital de obrigações trabalhistas, previdenciárias e fiscais.',
      url: 'https://login.esocial.gov.br/',
      depto: 'DP',
      badge: 'Trabalhista'
    },
    {
      nome: 'FGTS Digital',
      desc: 'Nova plataforma integrada de arrecadação do Fundo de Garantia por Tempo de Serviço.',
      url: 'https://fgtsdigital.sistema.gov.br/',
      depto: 'DP',
      badge: 'Trabalhista'
    },
    {
      nome: 'REDESIM Nacional',
      desc: 'Rede Nacional para a Simplificação do Registro e da Legalização de Empresas e Negócios.',
      url: 'https://www.gov.br/empresas-e-negocios/pt-br/redesim',
      depto: 'Societário',
      badge: 'Societário'
    },
    {
      nome: 'JUCESP / Juntas Comerciais',
      desc: 'Registro público de atos societários, contratos e certidões estaduais.',
      url: 'https://www.jucesp.sp.gov.br/',
      depto: 'Societário',
      badge: 'Estadual'
    },
    {
      nome: 'SEFAZ / Posto Fiscal Eletrônico',
      desc: 'Consulta de Inscrição Estadual, DEC, emissão de guias de ICMS e conformidade fiscal.',
      url: 'https://portal.fazenda.sp.gov.br/',
      depto: 'Fiscal',
      badge: 'Estadual'
    },
    {
      nome: 'Portal Gov.br Empresas',
      desc: 'Serviços unificados do governo federal para pessoas jurídicas.',
      url: 'https://www.gov.br/empresas-e-negocios/pt-br',
      depto: 'Geral',
      badge: 'Governo'
    }
  ];

  const filtered = sistemas.filter(
    (s) => filterDept === 'all' || s.depto.toLowerCase() === filterDept.toLowerCase()
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Breadcrumbs items={[{ label: 'Sistemas Oficiais Externos' }]} />

      <div className="glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full uppercase">
            Acessos Oficiais Diretos
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Sistemas Governamentais Oficiais</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Atalhos validados para os principais portais da Receita Federal, Fazenda Estadual, eSocial e Juntas Comerciais.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
          {['all', 'Fiscal', 'DP', 'Societário'].map((d) => (
            <button
              key={d}
              onClick={() => setFilterDept(d)}
              className={`px-3 py-1 rounded-lg transition font-medium ${
                filterDept === d
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {d === 'all' ? 'Todos' : d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-5 rounded-2xl flex flex-col justify-between group hover:border-brand-400 transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {item.badge}
                </span>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition text-sm">
                  {item.nome}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-brand-600 font-semibold">
              <span>Abrir link oficial</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}