export interface GameCardData {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: string;
  tags: string[];
  featured: boolean;
  popular: boolean;
  publishedAt: string;
  updatedAt: string;
}
