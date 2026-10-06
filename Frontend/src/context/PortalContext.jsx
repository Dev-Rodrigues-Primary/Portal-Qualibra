import React, { createContext, useContext, useState, useEffect } from 'react';

const PortalContext = createContext();

export function PortalProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('qualibra_favorites');
      return saved ? JSON.parse(saved) : ['reforma-tributaria', 'fator-r', 'calendario-fiscal'];
    } catch {
      return ['reforma-tributaria', 'fator-r', 'calendario-fiscal'];
    }
  });

  const [recentItems, setRecentItems] = useState(() => {
    try {
      const saved = localStorage.getItem('qualibra_recents');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('qualibra_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('qualibra_recents', JSON.stringify(recentItems));
  }, [recentItems]);

  const toggleFavorite = (itemId) => {
    setFavorites((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const registerAccess = (item) => {
    setRecentItems((prev) => {
      const filtered = prev.filter((r) => r.id !== item.id);
      return [item, ...filtered].slice(0, 8);
    });
  };

  return (
    <PortalContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite: (id) => favorites.includes(id),
        recentItems,
        registerAccess,
        isSearchOpen,
        setIsSearchOpen
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) throw new Error('usePortal deve ser usado dentro de PortalProvider');
  return context;
}