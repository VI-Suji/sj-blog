import { NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/notion';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const post = await getPostBySlug(slug);

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=59',
            },
        });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
