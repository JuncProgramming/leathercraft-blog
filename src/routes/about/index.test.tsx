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

describe('About Page Smoke Test', () => {
  it('should render the about page without crashing', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const memoryHistory = createMemoryHistory({
      initialEntries: ['/about'],
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
        screen.getByRole('heading', { name: /About Me/i })
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText(/Just a beginner learning leathercraft/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /Oliwier/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /What I'm Working On/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /Contact/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /Check Out My Progress/i })
    ).toBeInTheDocument();

    const viewProjectsLink = screen.getByRole('link', {
      name: /View Projects/i,
    });
    expect(viewProjectsLink).toBeInTheDocument();
    expect(viewProjectsLink).toHaveAttribute('href', '/projects');

    const seeToolsLink = screen.getByRole('link', { name: /See Tools/i });
    expect(seeToolsLink).toBeInTheDocument();
    expect(seeToolsLink).toHaveAttribute('href', '/tools');

    const emailLinks = screen.getAllByRole('link', {
      name: /juncmakes@gmail.com/i,
    });
    expect(emailLinks).toHaveLength(2);
    emailLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', 'mailto:juncmakes@gmail.com');
    });

    expect(screen.getByText(/Łódź, Poland/i)).toBeInTheDocument();

    const navElements = screen.getAllByRole('navigation');
    expect(navElements).toHaveLength(2);

    expect(screen.getByRole('main')).toBeInTheDocument();

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(2);

    const Images = screen.queryAllByRole('img');
    Images.forEach((image) => {
      expect(image).toBeInTheDocument()
    });
  });
});
