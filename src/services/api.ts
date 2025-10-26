import axios from 'axios';
import type { Project, Tool } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337/api';

const api = axios.create({
  baseURL: API_URL,
});

export const projectsAPI = {
  async getAll(
    page: number,
    pageSize: number
  ): Promise<{ projects: Project[]; totalPages: number }> {
    const response = await api.get(
      `/projects?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );

    const meta = response.data.meta;

    const projects = response.data.data.map((item: any) => ({
      id: item.documentId,
      title: item.title,
      category: item.category,
      date: item.date,
      completionTime: item.completionTime,
      difficulty: item.difficulty,
      mainImage: item.mainImage ? `${item.mainImage.url}` : '',
      gallery:
        item.gallery
          ?.map((img: any) => (img.url ? `${img.url}` : ''))
          .filter(Boolean) || [],
      description: item.description,
      excerpt: item.excerpt,
      process:
        item.processStep?.map((step: any) => ({
          title: step.title,
          content: step.content,
        })) || [],
      materials: item.materials?.split('\n').filter(Boolean) || [],
      lessons: item.lessons?.split('\n').filter(Boolean) || [],
    }));

    return {
      projects: projects,
      totalPages: meta.pagination.pageCount,
    };
  },

  async getById(id: string): Promise<Project> {
    const response = await api.get(`/projects/${id}?populate=*`);

    const item = response.data.data;
    return {
      id: item.documentId,
      title: item.title,
      category: item.category,
      date: item.date,
      completionTime: item.completionTime,
      difficulty: item.difficulty,
      mainImage: item.mainImage ? `${item.mainImage.url}` : '',
      gallery:
        item.gallery
          ?.map((img: any) => (img.url ? `${img.url}` : ''))
          .filter(Boolean) || [],
      description: item.description,
      excerpt: item.excerpt,
      process:
        item.processStep?.map((step: any) => ({
          title: step.title,
          content: step.content,
        })) || [],
      materials: item.materials?.split('\n').filter(Boolean) || [],
      lessons: item.lessons?.split('\n').filter(Boolean) || [],
    };
  },
};

export const toolsAPI = {
  async getAll(): Promise<Tool[]> {
    const response = await api.get('/tools?populate=*');

    return response.data.data.map((item: any) => ({
      id: item.documentId,
      name: item.name,
      description: item.description,
      link: item.link || '',
      imageUrl: item.image ? `${item.image.url}` : '',
    }));
  },
};
