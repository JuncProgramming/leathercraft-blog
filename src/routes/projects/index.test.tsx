import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  RouterProvider,
  createRouter,
  createMemoryHistory,
} from '@tanstack/react-router';
import '@testing-library/jest-dom/vitest';
import { routeTree } from '@/routeTree.gen';

describe('Projects Page Smoke Test', () => {
  it('should render the projects page without crashing', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const memoryHistory = createMemoryHistory({
      initialEntries: ['/projects'],
    });

    const router = createRouter({
      routeTree,
      history: memoryHistory,
      context: { queryClient },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: /Failed to Load Projects/i,
        })
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText(/There was an error loading the projects/i)
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Retry/i })).toBeInTheDocument();

    const navElements = screen.getAllByRole('navigation');
    expect(navElements).toHaveLength(2);

    expect(screen.getByRole('main')).toBeInTheDocument();

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);

    const images = screen.queryAllByRole('img');
    images.forEach((image) => {
      expect(image).toHaveAttribute('alt');
    });

    const emailLink = screen.getByRole('link', {
      name: /juncmakes@gmail.com/i,
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:juncmakes@gmail.com');
  });
});
