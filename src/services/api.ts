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

export const postVote = async (
  image_id: string,
  value: 1 | -1,
  sub_id: string
): Promise<any> => {
  const res = await fetch('https://api.thecatapi.com/v1/votes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify({ image_id, value, sub_id }),
  });

  if (!res.ok) throw new Error('Failed to vote');

  return await res.json();
};
