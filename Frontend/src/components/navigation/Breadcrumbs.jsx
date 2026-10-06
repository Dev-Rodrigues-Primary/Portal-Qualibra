import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs({ items = [] }) {
  return (
    <nav className="flex items-center space-x-2 text-xs font-mono text-slate-500 mb-4" aria-label="Breadcrumb">
      <Link to="/dashboard" className="hover:text-brand-600 transition flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span>Hub</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          {item.link ? (
            <Link to={item.link} className="hover:text-brand-600 transition">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
