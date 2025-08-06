import { type CatImage } from '../types';

const API_KEY = import.meta.env.VITE_CAT_API_KEY;

export const fetchCatImages = async (): Promise<CatImage[]> => {
  const response = await fetch(
    'https://api.thecatapi.com/v1/images/search?limit=10',
    {
      headers: {
        'x-api-key': API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch cat images');
  }

  return await response.json();
};