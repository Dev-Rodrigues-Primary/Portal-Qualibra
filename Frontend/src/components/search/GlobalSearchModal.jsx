import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PORTAL_REGISTRY } from '../../domain/portalRegistry';
import { usePortal } from '../../context/PortalContext';
import { Search, X, ArrowRight, CornerDownLeft, Star } from 'lucide-react';

export function GlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen, isFavorite, toggleFavorite, registerAccess } = usePortal();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') ||
          (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = PORTAL_REGISTRY.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.subCategory.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    );
  });

  const handleSelect = (item) => {
    registerAccess(item);
    setIsSearchOpen(false);
    navigate(item.route);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-brand-600 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar calculadoras, consultas, checklists, documentos, sistemas..."
            className="w-full text-slate-800 placeholder-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 text-xs font-mono text-slate-400 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1 divide-y divide-slate-100 flex-grow">
          {results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-brand-50/60 cursor-pointer transition"
              >
                <div className="flex items-center space-x-3 pr-2">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-brand-600 group-hover:text-white flex items-center justify-center text-brand-700 transition flex-shrink-0">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-sm group-hover:text-brand-700 transition">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {item.subCategory}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.desc}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="p-1.5 text-slate-300 hover:text-amber-500 transition"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        isFavorite(item.id) ? 'fill-amber-400 text-amber-500' : ''
                      }`}
                    />
                  </button>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 transition" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500 text-sm">
              Nenhum recurso encontrado para "{query}".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Use <b>↑</b> <b>↓</b> e <b>ENTER</b> para navegar</span>
          <span>Grupo Qualibra • Hub Operacional</span>
        </div>
      </div>
    </div>
  );
}