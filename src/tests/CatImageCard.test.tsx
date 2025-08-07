import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CatImageCard } from '../components/CatImageCard';
import type { CatImage } from '../types';

const voteMock = vi.fn();

vi.mock('../context/CatContext', async () => {
  const actual = await vi.importActual<typeof import('../context/CatContext')>(
    '../context/CatContext'
  );

  return {
    ...actual,
    useCatContext: () => ({
      vote: voteMock,
      votes: [],
    }),
  };
});

describe('CatImageCard', () => {
  const mockCat: CatImage = {
    id: '1',
    url: 'https://cdn2.thecatapi.com/images/2k3.png',
  };

  beforeEach(() => {
    voteMock.mockReset();
  });

  it('calls vote function on upvote click', () => {
    render(<CatImageCard cat={mockCat} />);
    const upBtn = screen.getByTestId('vote-up');
    fireEvent.click(upBtn);

    expect(voteMock).toHaveBeenCalledTimes(1);
    expect(voteMock).toHaveBeenCalledWith('1', 1);
  });

  it('calls vote function on downvote click', () => {
    render(<CatImageCard cat={mockCat} />);
    const downBtn = screen.getByTestId('vote-down');
    fireEvent.click(downBtn);

    expect(voteMock).toHaveBeenCalledTimes(1);
    expect(voteMock).toHaveBeenCalledWith('1', -1);
  });
});
