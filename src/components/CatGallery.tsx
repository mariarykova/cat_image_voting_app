import { useCatContext } from '../context/CatContext';
import { CatImageCard } from './CatImageCard';
import { Transition } from '@headlessui/react';

import CatSvg from '../assets/cat.svg?react';

export const CatGallery: React.FC = () => {
  const { cats, isLoading } = useCatContext();

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">

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
            <CatImageCard key={cat.id} cat={cat} />
          ))}
        </div>
      </Transition>

      {isLoading && <div className="flex justify-center text-center text-gray-500">Loading cats..<CatSvg className="w-5 h-5"/>..</div>}
    </section>
  );
};
