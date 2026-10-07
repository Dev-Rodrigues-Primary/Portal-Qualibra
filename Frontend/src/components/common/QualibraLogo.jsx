import React from 'react';

export function QualibraLogo({ size = 'md', showText = true, layout = 'horizontal', className = '' }) {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const iconClass = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-3 ${layout === 'vertical' ? 'flex-col text-center' : 'flex-row'} ${className}`}>
      {/* Ícone Hexagonal Origami Prismatico */}
      <div className={`relative flex-shrink-0 ${iconClass} filter drop-shadow-sm`}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="q-orange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <linearGradient id="q-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>
            <linearGradient id="q-purple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>
            <linearGradient id="q-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="q-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>
            <linearGradient id="q-green" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#65A30D" />
            </linearGradient>
          </defs>

          {/* Facetas Origami */}
          <polygon points="100,20 40,55 40,115 75,95 100,50" fill="url(#q-green)" />
          <polygon points="100,20 120,0 145,55 100,50" fill="url(#q-orange)" />
          <polygon points="100,50 145,55 160,115 125,95" fill="url(#q-red)" />
          <polygon points="125,95 160,115 100,180 100,135" fill="url(#q-purple)" />
          <polygon points="100,135 100,180 40,145 75,125" fill="url(#q-blue)" />
          <polygon points="75,95 75,125 40,145 40,55" fill="url(#q-cyan)" />
          <polygon points="100,50 125,95 100,135 75,125 75,95" fill="#FFFFFF" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col select-none">
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