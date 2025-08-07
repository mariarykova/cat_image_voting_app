import { useCatContext } from '../context/CatContext';

export const RefreshGalleryButton: React.FC = () => {
  const { isLoading, getCats } = useCatContext();


  return (
   <div className="text-center mt-4">
        <button
          onClick={getCats}
          disabled={isLoading}
          className="border cursor-pointer hover:border-blue-200 rounded px-3 py-2 transition"
          >
          Refresh Cat Images
        </button>
      </div>
  );
};
