import { NextResponse } from 'next/server';
import { getPublishedPosts } from '@/lib/notion';

export async function GET() {
    const posts = await getPublishedPosts();
    return NextResponse.json(posts);
}
