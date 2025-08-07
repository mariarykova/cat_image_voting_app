import { useCatContext } from '../context/CatContext';

export const VoteCounter: React.FC = () => {
  const { votes } = useCatContext();

  return (
    <p className="text-center text-gray-700 mt-4">
      You’ve cast {votes.length} vote{votes.length !== 1 && 's'}.
    </p>
  );
};
