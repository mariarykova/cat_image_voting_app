import { useCatContext } from '../context/CatContext';

export const VoteCounter: React.FC = () => {
  const { votes } = useCatContext();

  return (
    <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
      You’ve cast {votes.length} vote{votes.length !== 1 && 's'}.
    </p>
  );
};
