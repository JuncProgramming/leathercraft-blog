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

    const aboutLinks = screen.getAllByRole('link', { name: /About Me/i });
    expect(aboutLinks).toHaveLength(2);
    aboutLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/about');
    });

    const projectsLinks = screen.getAllByRole('link', { name: /Projects/i });
    expect(projectsLinks).toHaveLength(5);
    projectsLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/projects');
    });

    const toolsLinks = screen.getAllByRole('link', { name: /Tools/i });
    expect(toolsLinks).toHaveLength(3);
    toolsLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/tools');
    });

    const navElements = screen.getAllByRole('navigation');
    expect(navElements).toHaveLength(2);

    expect(screen.getByRole('main')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /Recent Projects/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /Why I Started This Journey/i })
    ).toBeInTheDocument();

    const images = screen.queryAllByRole('img');
    images.forEach((image) => {
      expect(image).toBeInTheDocument();
    });

    const emailLink = screen.getByRole('link', {
      name: /juncmakes@gmail.com/i,
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:juncmakes@gmail.com');
  });
});
