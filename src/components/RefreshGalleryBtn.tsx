import { useCatContext } from '../context/CatContext';

export const RefreshGalleryButton: React.FC = () => {
  const { isLoading, refreshCats } = useCatContext();


  return (
   <div className="text-center mt-4">
        <button
          onClick={refreshCats}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-black hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          🔄 Refresh
        </button>
      </div>
  );
};
