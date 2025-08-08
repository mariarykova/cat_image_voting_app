import { render } from '@testing-library/react';
import { DarkModeProvider } from '../context/DarkModeContext';

export const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <DarkModeProvider>
        {ui}
    </DarkModeProvider>
  );
};
