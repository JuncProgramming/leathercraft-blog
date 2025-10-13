import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { toolsAPI } from '@/services/api';

export const Route = createFileRoute('/tools/')({
  component: ToolsPage,
});

function ToolsPage() {
  const {
    data: tools = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['tools'],
    queryFn: toolsAPI.getAll,
  });

  if (isLoading) {
    return (
      <div className="max-w-8xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-stone-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-stone-600 text-lg">Loading tools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-8xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-stone-800">Failed to Load Tools</h2>
          <p className="text-stone-600">There was an error loading the tools. Please try again later.</p>
          <button 
            onClick={() => refetch()} 
            className="px-6 py-2 bg-stone-800 text-white rounded-md hover:bg-stone-700 transition font-medium">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto space-y-12">
      <div className="text-center space-y-6 pb-12 pt-4 border-b-2 border-stone-800/20">
        <h1 className="text-4xl font-bold text-stone-800 tracking-tight">
          Some of My Recommended Leathercraft Tools
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          This list doesn't cover every tool you'll need, but each one here
          stands out in its category. I only included tools that I've found to
          be exceptional - the kind that make a real difference when you're
          learning leathercraft.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-5xl">🔧</span>
              </div>
              <h3 className="text-2xl font-bold text-stone-800">No Tools Yet</h3>
              <p className="text-stone-600">
                Tool recommendations will be added soon. Check back later!
              </p>
            </div>
          </div>
        ) : (
          tools.map((tool) => (
          <div
            key={tool.id}
            className="group bg-white rounded-lg overflow-hidden hover:shadow transition-all duration-300 border border-stone-200 hover:border-stone-800 flex flex-col">
            <div className="aspect-video bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center overflow-hidden">
              {tool.imageUrl ?
                <img
                  src={tool.imageUrl}
                  alt={tool.name || 'Tool image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              : <span className="text-6xl">🔨</span>}
            </div>
            <div className="p-6 bg-stone-50/50 flex flex-col flex-1">
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-bold text-stone-800 line-clamp-2 group-hover:text-stone-700 transition-colors">
                  {tool.name || 'Tool Name'}
                </h3>
                <p className="text-sm text-stone-600 line-clamp-3">
                  {tool.description ||
                    'Add details about this tool and how you use it in your leatherwork.'}
                </p>
              </div>

              <div className="pt-4">
                <a
                  href={tool.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-stone-800 text-white py-3 px-4 rounded-md hover:bg-stone-700 transition-colors duration-200 font-medium text-sm uppercase tracking-wider text-center">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))
        )}
      </div>
      <div className="bg-stone-800 text-white rounded-lg p-12 text-center space-y-4 mt-12">
        <h2 className="text-3xl font-bold">
          Want to See These Tools in Action?
        </h2>
        <p className="text-stone-300 text-lg max-w-2xl mx-auto">
          Check out my leathercraft projects to see how I use these tools and
          what I've made with them.
        </p>
        <div className="pt-4">
          <Link
            to="/about"
            className="inline-block px-8 py-3 bg-white text-stone-800 rounded-md hover:bg-stone-100 transition font-semibold">
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
