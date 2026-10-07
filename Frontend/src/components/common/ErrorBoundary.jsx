import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary Qualibra:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold border border-amber-200">
              ⚠️
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Recuperação do Portal Qualibra</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Detectamos dados em cache da versão anterior. Clique abaixo para limpar o cache local e restaurar a interface oficial:
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  try {
                    localStorage.removeItem('qualibra_favorites');
                    localStorage.removeItem('qualibra_recents');
                  } catch (e) {}
                  window.location.href = '/dashboard';
                }}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
              >
                Limpar Cache e Abrir Portal
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                Apenas Recarregar (F5)
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}