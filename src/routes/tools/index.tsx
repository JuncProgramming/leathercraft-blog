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
  } = useQuery({
    queryKey: ['tools'],
    queryFn: toolsAPI.getAll,
  });

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
        {tools.map((tool) => (
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
        ))}
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
