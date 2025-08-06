import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { fetchCatImages, postVote } from '../services/api';
import { type CatImage } from '../types';
import { getOrCreateSubId } from '../utils/getSubId';

type CatContextType = {
  cats: CatImage[];
  isLoading: boolean;
  refreshCats: () => void;
  vote: (imageId: string, value: 1 | -1) => void;
};

const CatContext = createContext<CatContextType | undefined>(undefined);

export const useCatContext = () => {
  const context = useContext(CatContext);
  if (!context) throw new Error('useCatContext must be used within CatProvider');
  return context;
};

export const CatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subId] = useState(getOrCreateSubId);

  const refreshCats = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchCatImages();
      setCats(data);
    } catch (error) {
      console.error('Failed to fetch cats:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const vote = async (imageId: string, value: 1 | -1) => {
    try {
      await postVote(imageId, value, subId);
      setCats(prev =>
        prev.map(cat =>
          cat.id === imageId ? { ...cat, vote: value } : cat
        )
      );
    } catch (error) {
      console.error('Voting failed:', error);
    }
  };

  useEffect(() => {
    refreshCats();
  }, [refreshCats]);

  return (
    <CatContext.Provider value={{ cats, isLoading, refreshCats, vote }}>
      {children}
    </CatContext.Provider>
  );
};
