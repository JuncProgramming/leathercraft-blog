import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { projectsAPI } from '@/services/api';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const PAGE = 1;
  const ITEMS_TO_SHOW = 3;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: () => projectsAPI.getAll(PAGE, ITEMS_TO_SHOW),
  });

  const featuredProjects = data?.projects || [];

  return (
    <div className="space-y-16">
      <div className="text-center space-y-6 pt-12 pb-4">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-stone-800 tracking-tight">
            Learning Leathercraft,
            <br />
            One Stitch at a Time
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Follow along as I navigate the world of leatherworking - from my
            first wonky stitches to projects I'm actually proud of. No expert
            here, just honest learning and plenty of mistakes.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link
            to="/projects"
            className="px-8 py-3 bg-stone-800 text-white rounded-md hover:bg-stone-700 transition font-semibold text-lg">
            View My Projects
          </Link>
          <Link
            to="/about"
            className="px-8 py-3 bg-stone-100 text-stone-800 rounded-md hover:bg-stone-200 transition font-semibold text-lg border-2 border-stone-200">
            About Me
          </Link>
        </div>
      </div>

      <div className="border-t-2 border-stone-800/20"></div>

      <div className="space-y-16">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-stone-800 tracking-tight">
            Recent Projects
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            A few things I've been working on lately - each one teaching me
            something new.
          </p>
        </div>

        <div
          className={`grid gap-8 ${
            featuredProjects.length === 1 ? 'grid-cols-1 md:max-w-md md:mx-auto'
            : featuredProjects.length === 2 ?
              'grid-cols-1 md:grid-cols-2 md:max-w-3xl md:mx-auto'
            : 'grid-cols-1 md:grid-cols-3'
          }`}>
          {isLoading ?
            <div className="col-span-full text-center py-16">
              <div className="w-16 h-16 border-4 border-stone-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-stone-600 text-lg mt-4">Loading projects...</p>
            </div>
          : error ?
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-stone-800">
                  Failed to Load Recent Projects
                </h2>
                <p className="text-stone-600">
                  There was an error loading recent projects. Please try again later.
                </p>
                <button
                  onClick={() => refetch()}
                  className="px-6 py-2 bg-stone-800 text-white rounded-md hover:bg-stone-700 transition font-medium">
                  Retry
                </button>
              </div>
            </div>
          : featuredProjects.length === 0 ?
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-5xl">📂</span>
                </div>
                <h3 className="text-2xl font-bold text-stone-800">
                  No Projects Yet
                </h3>
                <p className="text-stone-600">Projects coming soon!</p>
              </div>
            </div>
          : featuredProjects.map((project) => (
              <Link
                key={project.id}
                to="/projects/$projectId"
                params={{ projectId: project.id }}
                className="group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-stone-200 hover:border-stone-800 flex flex-col">
                <div className="aspect-square bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center overflow-hidden relative">
                  {project.mainImage ?
                    <img
                      src={project.mainImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  : <span className="text-7xl">🧳</span>}
                  <div className="absolute top-3 right-3 bg-stone-800 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {project.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-stone-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-stone-600 line-clamp-2">
                    {project.excerpt}
                  </p>
                  <div className="mt-auto pt-4">
                    <span className="text-stone-800 font-semibold text-sm flex items-center gap-2 group/btn">
                      View Project
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>

        <div className="text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-stone-800 hover:text-stone-600 transition-colors font-semibold">
            See All Projects
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="border-t-2 border-stone-800/20"></div>

      <div className="bg-stone-50 rounded-lg p-12 border border-stone-200">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-stone-800">
            Why I Started This Journey
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            Leathercraft caught my attention completely by accident. I first
            wanted to get into woodworking, but with no space in my garage for
            all the tools, I started looking into something smaller - and that's
            how I found leathercraft. This blog is my way of documenting the
            learning process, celebrating small wins, and hopefully helping
            others who are starting out too.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed">
            I'm not here to pretend I know it all. Every project teaches me
            something new, and I want to share both the successes and the
            setbacks. If you're thinking about trying leathercraft, or you're
            just curious about the craft, welcome - let's learn together.
          </p>
          <div className="pt-4">
            <Link
              to="/about"
              className="inline-block px-8 py-3 bg-stone-800 text-white rounded-md hover:bg-stone-700 transition font-semibold">
              More About Me
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-stone-800/20"></div>

      <div className="bg-stone-800 text-white rounded-lg p-12 text-center space-y-4">
        <h2 className="text-3xl font-bold">Ready to Start Exploring?</h2>
        <p className="text-stone-300 text-lg max-w-2xl mx-auto">
          Whether you're here for project inspiration, tool recommendations, or
          just to see what leathercraft is all about, there's something for you.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Link
            to="/projects"
            className="px-8 py-3 bg-white text-stone-800 rounded-md hover:bg-stone-100 transition font-semibold">
            Browse Projects
          </Link>
          <Link
            to="/tools"
            className="px-8 py-3 bg-stone-700 text-white rounded-md hover:bg-stone-600 transition font-semibold">
            Check Out Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
