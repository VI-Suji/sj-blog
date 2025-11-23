import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get('token');

    // Simple security check
    // In production, use process.env.REVALIDATION_TOKEN
    if (token !== 'sujith-blog-revalidate') {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    revalidatePath('/', 'layout');
    return NextResponse.json({ revalidated: true, now: Date.now() });
}
