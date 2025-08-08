import { type CatImage } from '../types';
import { useCatContext } from '../context/CatContext';
import { useDarkMode } from '../context/DarkModeContext';
import ThumbUpIcon from '../assets/thumb-up.svg?react';
import ThumbDownIcon from '../assets/thumb-down.svg?react';

type Props = {
  cat: CatImage;
};

export const CatImageCard: React.FC<Props> = ({ cat }) => {
  const { vote, votes } = useCatContext();
    const { isDark } = useDarkMode();

  const userVote = votes.find((v) => v.image_id === cat.id);
  const hasVoted = !!userVote;

  const handleVote = (value: 1 | -1) => {
    if (!hasVoted) vote(cat.id, value);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl bg-white dark:bg-gray-800 transition-all">
      <img
        src={cat.url}
        alt="A cute cat"
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="flex justify-center items-center gap-4 p-4">
        <button
          aria-label="Vote up"
          data-testid="vote-up"
          onClick={() => handleVote(1)}
          disabled={hasVoted}
          className={`p-2 rounded-full border transition-all
            ${userVote?.value === 1 ? 'border-green-500 bg-green-100 dark:bg-green-900' : 'hover:border-green-400'}
            ${hasVoted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <ThumbUpIcon className="w-5 h-5 text-green-600 dark:text-green-400" style={{ stroke: isDark ? 'white' : 'black' }} />
        </button>
        <button
          aria-label="Vote down"
          data-testid="vote-down"
          onClick={() => handleVote(-1)}
          disabled={hasVoted}
          className={`p-2 rounded-full border transition-all
            ${userVote?.value === -1 ? 'border-red-500 bg-red-100 dark:bg-red-900' : 'hover:border-red-400'}
            ${hasVoted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <ThumbDownIcon className="w-5 h-5 text-red-600 dark:text-red-400" style={{ stroke: isDark ? 'white' : 'black' }} />
        </button>
        {userVote && (
          <p className="text-center text-sm text-gray-700 dark:text-gray-300 ml-2">
            You voted: {userVote.value === 1 ? '👍' : '👎'}
          </p>
        )}
      </div>
    </div>
  );
};
