export type Project = {
  id: string;
  title: string;
  category: string;
  date: string;
  completionTime?: string;
  difficulty?: string;
  mainImage: string;
  gallery?: string[];
  description: string;
  process?: {
    title: string;
    content: string;
  }[];
  materials?: string[];
  lessons?: string[];
};

export type Tool = {
  id: string;
  name: string;
  description: string;
  link: string;
  imageUrl: string;
};
