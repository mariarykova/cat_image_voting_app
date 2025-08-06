import { useCatContext } from '../context/CatContext';
import { CatImageCard } from './CatImageCard';
import { Transition } from '@headlessui/react';

export const CatGallery: React.FC = () => {
  const { cats, isLoading, refreshCats, vote } = useCatContext();

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Browse Cats</h2>
        <button
          onClick={refreshCats}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          🔄 Refresh
        </button>
      </div>

      <Transition
        show={!isLoading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cats.map(cat => (
            <CatImageCard key={cat.id} cat={cat} onVote={vote} />
          ))}
        </div>
      </Transition>

      {isLoading && <p className="text-center text-gray-500">Loading cats...</p>}
    </section>
  );
};
