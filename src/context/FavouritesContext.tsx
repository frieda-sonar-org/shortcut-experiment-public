import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface FavouritesContextValue {
  starredIds: Set<string>;
  toggleStar: (key: string) => void;
  isStarred: (key: string) => boolean;
}

const FavouritesContext = createContext<FavouritesContextValue | null>(null);

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [starredIds, setStarredIds] = useState<Set<string>>(() => new Set());

  const toggleStar = (key: string) => {
    setStarredIds(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const isStarred = (key: string) => starredIds.has(key);

  return (
    <FavouritesContext.Provider value={{ starredIds, toggleStar, isStarred }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error('useFavourites must be used inside FavouritesProvider');
  return ctx;
}
