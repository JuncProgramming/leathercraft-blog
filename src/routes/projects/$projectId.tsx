import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { projectsAPI } from '@/services/api';
import { useState } from 'react';

export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { projectId } = Route.useParams();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectsAPI.getById(projectId),
  });

  if (isLoading) {
    return (
      <div className="max-w-8xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-stone-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-stone-600 text-lg">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-8xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-stone-800">Project Not Found</h2>
          <p className="text-stone-600">
            {error ? "There was an error loading this project." : "This project doesn't exist or has been removed."}
          </p>
          <Link 
            to="/projects" 
            className="inline-block px-6 py-2 bg-stone-800 text-white rounded-md hover:bg-stone-700 transition font-medium">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto space-y-12">
      <div className="pt-4 flex items-center justify-between">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors font-medium">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Projects
        </Link>
        <div className="bg-stone-800 text-white px-4 py-2 rounded-full text-sm font-medium">
          {project.category}
        </div>
      </div>

      <div className="text-center space-y-6 pb-12 border-b-2 border-stone-800/20">
        <h1 className="text-4xl font-bold text-stone-800 tracking-tight">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-6 justify-center text-sm text-stone-600">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{project.date}</span>
          </div>
          {project.completionTime && (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{project.completionTime}</span>
            </div>
          )}
          {project.difficulty && (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>{project.difficulty}</span>
            </div>
          )}
        </div>
      </div>

      <div className="aspect-video bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg overflow-hidden">
        {project.mainImage ?
          <img
            src={project.mainImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        : <div className="w-full h-full flex items-center justify-center">
            <span className="text-9xl">📸</span>
          </div>
        }
      </div>

      <div className="bg-stone-50 rounded-lg p-8 border border-stone-200">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">
          About This Project
        </h2>
        <p className="text-stone-600 leading-relaxed text-lg">
          {project.description}
        </p>
      </div>

      {project.gallery && project.gallery.filter((img) => img).length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-stone-800">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.gallery.filter((img) => img).map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {project.process && project.process.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-stone-800">Build Process</h2>
            <div className="space-y-4">
              {project.process.map((step, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg border border-stone-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-stone-800 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-stone-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-stone-600 leading-relaxed">
                        {step.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {project.materials && project.materials.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-6">
                Materials Used
              </h2>
              <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
                <ul className="space-y-3">
                  {project.materials.map((material, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-stone-800 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-stone-600">{material}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {project.lessons && project.lessons.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-6">
                What I Learned
              </h2>
              <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
                <ul className="space-y-3">
                  {project.lessons.map((lesson, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-stone-800 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-stone-600 leading-relaxed">
                        {lesson}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-stone-800 text-white rounded-lg p-12 text-center space-y-4">
        <h2 className="text-3xl font-bold">Want to See More?</h2>
        <p className="text-stone-300 text-lg max-w-2xl mx-auto">
          Check out my other leathercraft projects or explore the tools I use.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link
            to="/projects"
            className="inline-block px-8 py-3 bg-white text-stone-800 rounded-md hover:bg-stone-100 transition font-semibold">
            All Projects
          </Link>
          <Link
            to="/tools"
            className="inline-block px-8 py-3 bg-stone-700 text-white rounded-md hover:bg-stone-600 transition font-semibold">
            View Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
