import React, { createContext, useContext, useState, useEffect } from 'react';

const PortalContext = createContext();

const DEFAULT_FAVORITES = ['reforma-tributaria', 'fator-r', 'calendario-fiscal'];

export function PortalProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('qualibra_favorites');
      if (!saved) return DEFAULT_FAVORITES;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : DEFAULT_FAVORITES;
    } catch {
      return DEFAULT_FAVORITES;
    }
  });

  const [recentItems, setRecentItems] = useState(() => {
    try {
      const saved = localStorage.getItem('qualibra_recents');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('qualibra_favorites', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('qualibra_recents', JSON.stringify(recentItems));
    } catch (e) {}
  }, [recentItems]);

  const toggleFavorite = (itemId) => {
    if (!itemId) return;
    setFavorites((prev) => {
      const arr = Array.isArray(prev) ? prev : DEFAULT_FAVORITES;
      return arr.includes(itemId) ? arr.filter((id) => id !== itemId) : [...arr, itemId];
    });
  };

  const isFavorite = (itemId) => {
    if (!itemId || !Array.isArray(favorites)) return false;
    return favorites.includes(itemId);
  };

  const registerAccess = (item) => {
    if (!item || !item.id) return;
    setRecentItems((prev) => {
      const arr = Array.isArray(prev) ? prev : [];
      const filtered = arr.filter((r) => r && r.id !== item.id);
      return [item, ...filtered].slice(0, 8);
    });
  };

  return (
    <PortalContext.Provider
      value={{
        favorites: Array.isArray(favorites) ? favorites : DEFAULT_FAVORITES,
        toggleFavorite,
        isFavorite,
        recentItems: Array.isArray(recentItems) ? recentItems : [],
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