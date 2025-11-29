export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    date: string;
    tags: string[];
    category?: string;
    description: string;
    published: boolean;
    cover: string;
    readTime?: string;
    content?: string;
}
