import { useEffect, useState } from 'react';
import { fetchCatImages } from '../services/api';
import { type CatImage } from '../types';

export const Gallery = () => {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCatImages()
      .then(data => {
        setCats(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cats:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {cats.map(cat => (
        <div key={cat.id} className="rounded overflow-hidden shadow">
          <img
            src={cat.url}
            alt="A cute cat"
            className="w-full h-64 object-cover"
          />
        </div>
      ))}
    </div>
  );
};
