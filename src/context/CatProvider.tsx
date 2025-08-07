import {
  useEffect,
  useState,
  useCallback,
} from 'react';
import { fetchCatImages, postVote, getUserVotes } from '../services/api';
import { type CatImage } from '../types';
import { getOrCreateSubId } from '../utils/getSubId';
import { CatContext } from './CatContext';



export const CatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subId] = useState(getOrCreateSubId);
  const [votes, setVotes] = useState<{ image_id: string; value: 1 | -1 }[]>([]);

  const getCats = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchCatImages();
      const voteData = await getUserVotes(subId);

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

      const updatedVotes = await getUserVotes(subId);
      setVotes(updatedVotes);
    } catch (error) {
      console.error('Voting failed:', error);
    }
  };

  useEffect(() => {
    getCats();
  }, [getCats]);

  return (
    <CatContext.Provider value={{ cats, isLoading, getCats, vote, votes }}>
      {children}
    </CatContext.Provider>
  );
};
