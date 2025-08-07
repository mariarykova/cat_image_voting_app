import { type CatImage } from '../types';
import  { useCatContext } from '../context/CatContext';
import ThumbUpIcon from '../assets/thumb-up.svg?react';
import ThumbDownIcon from '../assets/thumb-down.svg?react';

type Props = {
  cat: CatImage;
};

export const CatImageCard: React.FC<Props> = ({ cat }) => {
    const { vote, votes } = useCatContext();
    const userVote = votes.find((v) => v.image_id === cat.id);
    const hasVoted = !!userVote;


    const handleVote = (value: 1 | -1) => {
    if (!hasVoted) {
      vote(cat.id, value);
    }
  };


  return (
    <div className="rounded overflow-hidden shadow hover:shadow-lg transition">
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
          className={`p-2 rounded-full transition border 
            ${userVote?.value === 1 ? 'border-green-500' : 'hover:border-green-500 cursor-pointer'}
            ${hasVoted ? 'opacity-50 cursor-not-allowed' : ''}`}
          
        >
          <ThumbUpIcon className="w-5 h-5" />
        </button>
        <button
          aria-label="Vote down"
          data-testid="vote-down"
          onClick={() => handleVote(-1)}
          disabled={hasVoted}
          className={`p-2 rounded-full transition border 
            ${userVote?.value === -1 ? 'border-red-500' : 'hover:border-red-500 cursor-pointer'}
            ${hasVoted ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ThumbDownIcon className="w-5 h-5" />
        </button>

        {userVote && (
        <p className="text-center text-sm text-gray-700">
          You voted: {userVote.value === 1 ? '👍' : '👎'}
        </p>
      )}
      </div>
    </div>
  );
};
