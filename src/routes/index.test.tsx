import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import '@testing-library/jest-dom/vitest';
import { routeTree } from '../routeTree.gen';

describe('Homepage Smoke Test', () => {
  it('should render the homepage without crashing', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const router = createRouter({
      routeTree,
      context: { queryClient },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Learning Leathercraft/i)).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        /Follow along as I navigate the world of leatherworking/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /View My Projects/i })
    ).toBeInTheDocument();
    const aboutLinks = screen.getAllByRole('link', { name: /About Me/i });
    expect(aboutLinks.length).toBeGreaterThan(0);
  });
});
