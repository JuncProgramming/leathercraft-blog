import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { projectsAPI } from '@/services/api';

export const Route = createFileRoute('/projects/')({
  component: ProjectsPage,
});

function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsAPI.getAll,
  });

  const filteredProjects =
    selectedCategory === 'All' ? projects : (
      projects.filter((project) => project.category === selectedCategory)
    );

  return (
    <div className="max-w-8xl mx-auto space-y-12">
      <div className="text-center space-y-6 pb-12 pt-4 border-b-2 border-stone-800/20">
        <h1 className="text-4xl font-bold text-stone-800 tracking-tight">
          My Projects
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          A collection of my leatherwork projects. Each piece tells a story of
          craftsmanship, learning, and passion for the craft.
        </p>
      </div>

      <div className="bg-stone-50 rounded-lg p-8 border border-stone-200">
        <h2 className="text-2xl font-bold text-stone-800 mb-6 text-center">
          Project Categories
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {['All', 'Wallets', 'Bags', 'Belts', 'Accessories', 'Custom'].map(
            (category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 border-2 rounded-full transition-all font-medium text-sm ${
                  selectedCategory === category ?
                    'bg-stone-800 text-white border-stone-800'
                  : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-800 hover:text-white hover:border-stone-800'
                }`}>
                {category}
              </button>
            )
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-white rounded-lg overflow-hidden hover:shadow transition-all duration-300 border border-stone-200 hover:border-stone-800 flex flex-col">
            <div className="aspect-video bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center overflow-hidden relative">
              {project.mainImage ?
                <img
                  src={project.mainImage}
                  alt={project.title || 'Project image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              : <span className="text-7xl">🧳</span>}

              <div className="absolute top-3 right-3 bg-stone-800 text-white px-3 py-1 rounded-full text-xs font-medium">
                {project.category}
              </div>
            </div>

            <div className="p-6 space-y-3 flex flex-col flex-1">
              <div className="space-y-2 flex-1">
                {project.date && (
                  <p className="text-xs text-stone-500 uppercase tracking-wider">
                    {project.date}
                  </p>
                )}

                <h3 className="text-xl font-bold text-stone-800 line-clamp-2 group-hover:text-stone-700 transition-colors">
                  {project.title || 'Project Title'}
                </h3>

                <p className="text-sm text-stone-600 line-clamp-4">
                  {project.description ||
                    'Share the story behind this project - what inspired it, challenges you faced, and what you learned along the way.'}
                </p>
              </div>

              <div className="pt-4">
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: project.id }}
                  className="text-stone-800 font-semibold hover:text-stone-600 transition-colors text-sm flex items-center gap-2 group/btn cursor-pointer">
                  View Details
                  <svg
                    className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
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
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-stone-800 text-white rounded-lg p-12 text-center space-y-4">
        <h2 className="text-3xl font-bold">Curious About My Tools?</h2>
        <p className="text-stone-300 text-lg max-w-2xl mx-auto">
          See the leathercraft tools I use and recommend for all kinds projects.
        </p>
        <div className="pt-4">
          <Link
            to="/tools"
            className="inline-block px-8 py-3 bg-white text-stone-800 rounded-md hover:bg-stone-100 transition font-semibold">
            View Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
