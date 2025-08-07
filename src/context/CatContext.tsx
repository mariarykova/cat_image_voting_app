
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { fetchCatImages, postVote, getUserVotes } from '../services/api';
import { type CatImage } from '../types';
import { getOrCreateSubId } from '../utils/getSubId';

type CatContextType = {
  cats: CatImage[];
  isLoading: boolean;
  refreshCats: () => void;
  vote: (imageId: string, value: 1 | -1) => void;
  votes: { image_id: string; value: 1 | -1 }[];
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
  const [votes, setVotes] = useState<{ image_id: string; value: 1 | -1 }[]>([]);

  const refreshCats = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchCatImages();
      const voteData = await getUserVotes(subId);

      // Merge votes into images
      const enriched = data.map(cat => {
        const vote = voteData.find(v => v.image_id === cat.id);
        return {
          ...cat,
          voteScore: vote?.value ?? 0,
          userVote: vote?.value,
        };
      });

      setCats(enriched);
      setVotes(voteData);
    } catch (error) {
      console.error('Failed to fetch cats or votes:', error);
    } finally {
      setIsLoading(false);
    }
  }, [subId]);

  const vote = async (imageId: string, value: 1 | -1) => {
    try {
      await postVote(imageId, value, subId);

      // Optimistic update for `cats`
      setCats(prev =>
        prev.map(cat => {
          if (cat.id !== imageId) return cat;
          const newScore = (cat.voteScore ?? 0) + value;
          return {
            ...cat,
            voteScore: newScore,
            userVote: value,
          };
        })
      );

      // Re-fetch votes to update context state
      const updatedVotes = await getUserVotes(subId);
      setVotes(updatedVotes);
    } catch (error) {
      console.error('Voting failed:', error);
    }
  };

  useEffect(() => {
    refreshCats();
  }, [refreshCats]);

  return (
    <CatContext.Provider value={{ cats, isLoading, refreshCats, vote, votes }}>
      {children}
    </CatContext.Provider>
  );
};
