import React from 'react';

export function QualibraLogo({ size = 'md', showText = true, layout = 'horizontal', className = '' }) {
  const sizeMap = {
    xs: 'h-6',
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20'
  };

  const imgHeight = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-3 ${layout === 'vertical' ? 'flex-col text-center' : 'flex-row'} ${className}`}>
      {/* Imagem do Logo PNG com Fallback */}
      <img 
        src="/logo.png" 
        alt="Grupo Qualibra" 
        className={`${imgHeight} w-auto object-contain filter drop-shadow-sm hover:scale-105 transition-transform duration-300`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlMmU4ZjAiIHN0cm9rZS13aWR0aD0iMiI+PHJlY3QgeD0iMyIgeT0iMyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiIvPjwvc3ZnPg==';
        }}
      />

      {/* Tipografia Oficial da Marca */}
      {showText && (
        <div className="flex flex-col select-none text-left">
          <div className="flex items-baseline tracking-tight">
            <span className="font-extrabold text-slate-900 text-base sm:text-lg">Grupo </span>
            <span className="font-black text-amber-500 text-lg sm:text-xl ml-0.5 leading-none">Q</span>
            <span className="font-extrabold text-slate-900 text-base sm:text-lg">ualibra</span>
          </div>
          <span className="text-[11px] font-bold text-slate-700 tracking-wider -mt-1 font-sans">
            contabilidade
          </span>
          <span className="text-[8px] font-medium text-slate-400 uppercase tracking-widest -mt-0.5">
            Auditores & Consultores
          </span>
        </div>
      )}
    </div>
  );
}

export default QualibraLogo;