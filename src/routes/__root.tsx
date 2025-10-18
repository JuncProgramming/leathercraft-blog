import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { Link } from '@tanstack/react-router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      <Header />
      <main className="flex justify-center p-6 flex-1">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg border border-stone-200 p-8">
          <Outlet />
        </div>
      </main>
      <Footer />
      {process.env.NODE_ENV !== 'test' && (
        <TanStackDevtools
          config={{
            position: 'bottom-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      )}
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-4xl font-bold text-yellow-900 mb-4">404</h1>
      <p className="text-lg font-medium text-zinc-600 mb-6">
        The page you are looking for does not exist
      </p>
      <Link
        className="px-6 py-2 bg-yellow-950 text-white rounded-md hover:bg-yellow-900 transition"
        to="/">
        Go Back Home
      </Link>
    </div>
  );
}
