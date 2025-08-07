import { describe, it, expect, vi } from 'vitest';

vi.mock('../context/CatContext', async () => {
  const actual = await vi.importActual<typeof import('../context/CatContext')>(
    '../context/CatContext'
  );

  return {
    ...actual,
    useCatContext: () => ({
      cats: [
        { id: '1', url: 'https://cdn2.thecatapi.com/images/2k3.png' },
        { id: '2', url: 'https://cdn2.thecatapi.com/images/cg0.jpg' },
      ],
      isLoading: false,
      votes: [],
      refreshCats: vi.fn(),
      vote: vi.fn(),
    }),
  };
});


import { render, screen } from '@testing-library/react';
import { CatGallery } from '../components/CatGallery';


describe('Gallery Component', () => {
  it('renders all cat images from context', () => {
    render(<CatGallery />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);
    expect(images[0]).toHaveAttribute('src', 'https://cdn2.thecatapi.com/images/2k3.png');
    expect(images[1]).toHaveAttribute('src', 'https://cdn2.thecatapi.com/images/cg0.jpg');
  });
});
