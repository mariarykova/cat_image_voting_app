import { type CatImage } from '../types';
import ThumbUpIcon from '../assets/thumb-up.svg?react';
import ThumbDownIcon from '../assets/thumb-down.svg?react';

type Props = {
  cat: CatImage;
//   onVote: (imageId: string, value: 1 | -1) => void;
};

export const CatImageCard: React.FC<Props> = ({ cat }) => {
  const handleVote = (value: 1 | -1) => {
    // onVote(cat.id, value);
    console.log(cat.id, value)
  };

  return (
    <div className="rounded overflow-hidden shadow hover:shadow-lg transition">
      <img
        src={cat.url}
        alt="A cute cat"
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="flex justify-center gap-4 p-4">
        <button
          onClick={() => handleVote(1)}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <ThumbUpIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleVote(-1)}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <ThumbDownIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
