export interface IPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail?: string;
  images: string[];
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  author: {
    id: string;
    name: string;
    email: string;
    contact_number: string;
    profile_pic: string;
    status: string;
    role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
    created_at: string;
    updated_at: string;
  };
}
