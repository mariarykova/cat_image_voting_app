
import {
  createContext,
  useContext,
} from 'react';
import { type CatContextType } from '../types';

export const CatContext = createContext<CatContextType | undefined>(undefined);

export const useCatContext = () => {
  const context = useContext(CatContext);
  if (!context) throw new Error('useCatContext must be used within CatProvider');
  return context;
};
