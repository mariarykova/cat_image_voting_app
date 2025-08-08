import { useDarkMode } from '../context/DarkModeContext';

export const DarkModeToggle = () => {
  const { isDark, toggleDark } = useDarkMode();

  return (
    <button
      onClick={toggleDark}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition"
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};
