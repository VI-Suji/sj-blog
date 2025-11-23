import { NextResponse } from 'next/server';
import { getPublishedPosts } from '@/lib/notion';

export async function GET() {
    const posts = await getPublishedPosts();
    return NextResponse.json(posts, {
        headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=59',
        },
    });
}
