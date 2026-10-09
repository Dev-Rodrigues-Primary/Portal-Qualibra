import React from 'react';

export function QualibraLogo({ size = 'md', className = '' }) {
  // Alturas responsivas para a sua logo png
  const sizeMap = { xs: 'h-6', sm: 'h-8', md: 'h-10', lg: 'h-14', xl: 'h-20' };
  const imgHeight = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* 
        INSTRUÇÃO: 
        Coloque o seu arquivo de imagem com o nome exato "logo.png" 
        dentro da pasta: C:\Users\DR\Documents\DEV\PQ\Frontend\public\
      */}
      <img 
        src="/logo.png" 
        alt="Grupo Qualibra" 
        className={`${imgHeight} w-auto object-contain transition-transform duration-300 filter drop-shadow-sm hover:scale-105`}
        onError={(e) => {
          e.target.onerror = null; 
          // Imagem placeholder caso falte a logo.png na pasta public
          e.target.src = 'https://via.placeholder.com/200x50/f8fafc/94a3b8?text=Coloque+logo.png+na+pasta+public';
        }}
      />
    </div>
  );
}

export default QualibraLogo;