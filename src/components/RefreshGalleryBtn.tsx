import { useCatContext } from '../context/CatContext';

export const RefreshGalleryButton: React.FC = () => {
  const { isLoading, getCats } = useCatContext();

  return (
   <div className="text-center mt-4">
        <button
          onClick={getCats}
          disabled={isLoading}
          className="
          cursor-pointer px-4 py-2 rounded-md font-medium transition-colors
          border border-gray-300 bg-white text-gray-800 hover:bg-gray-100
          dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700
          disabled:opacity-50 disabled:cursor-not-allowed
        "
          >
          Refresh Cat Images
        </button>
      </div>
  );
};
