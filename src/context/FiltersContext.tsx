import { createContext, useContext, useState, ReactNode } from 'react';

interface FiltersContextType {
  filters: { account?: string; industry?: string; state?: string; startDate?: string; endDate?: string };
  setFilters: (filters: any) => void;
}

export const FiltersContext = createContext<FiltersContextType>({ filters: {}, setFilters: () => {} });

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState({});

  return <FiltersContext.Provider value={{ filters, setFilters }}>{children}</FiltersContext.Provider>;
}

export const useFilters = () => {
  return useContext(FiltersContext);
};