'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import Link from 'next/link'

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
})

interface Post {
    _id: string
    title: string
    slug: string
    description: string
    category: string
    tags: string[]
    published: boolean
    publishedAt: string
    _updatedAt: string
}

export default function AdminDashboard() {
    const router = useRouter()
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const data = await client.fetch(`*[_type == "post"] | order(_updatedAt desc) {
                _id,
                title,
                "slug": slug.current,
                description,
                category,
                tags,
                published,
                publishedAt,
                _updatedAt
            }`)
            setPosts(data)
        } catch (error) {
            console.error('Error fetching posts:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) {
            return
        }

        try {
            await client.delete(id)
            await fetchPosts()
        } catch (error) {
            console.error('Error deleting:', error)
            alert('Error deleting post')
        }
    }

    const togglePublish = async (post: Post) => {
        try {
            await client.patch(post._id).set({ published: !post.published }).commit()
            await fetchPosts()
        } catch (error) {
            console.error('Error toggling publish:', error)
            alert('Error updating post')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-3 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Subtle background */}
            <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-0"
                style={{
                    backgroundImage: 'radial-gradient(circle, #000 0.5px, transparent 0.5px)',
                    backgroundSize: '20px 20px'
                }}
            ></div>

            <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 relative z-10">

                {/* HEADER */}
                <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-gray-200">
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                            Content Manager
                        </h1>
                        <p className="text-sm sm:text-base text-gray-500 font-medium">
                            Manage your blog posts
                        </p>
                    </div>

                    <Link
                        href="/admin/post/new"
                        className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto text-center"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <span className="text-xl leading-none">+</span> New Post
                        </span>
                    </Link>
                </div>

                {/* POSTS LIST */}
                <div className="grid gap-3 sm:gap-4">
                    {posts.length === 0 ? (
                        <div className="p-12 sm:p-16 text-center rounded-2xl border-2 border-dashed border-gray-200 bg-white">
                            <p className="text-lg sm:text-xl font-semibold text-gray-400">No posts found</p>
                            <p className="text-sm sm:text-base text-gray-400 mt-2">Create your first post to get started</p>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div
                                key={post._id}
                                onClick={() => router.push(`/admin/post/${post._id}`)}
                                className="group bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200 cursor-pointer"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">

                                    {/* Content Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                                            <span className={`px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-full ${post.published
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                {post.published ? 'Published' : 'Draft'}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {new Date(post._updatedAt).toLocaleDateString()}
                                            </span>
                                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                                                {post.category}
                                            </span>
                                        </div>

                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors break-words">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2 sm:line-clamp-1 break-words">
                                            {post.description}
                                        </p>
                                    </div>

                                    {/* Actions - Right aligned on desktop */}
                                    <div className="flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-center lg:items-center gap-2 pt-3 sm:pt-0 lg:pt-0 border-t sm:border-t-0 lg:border-t-0 border-gray-100 lg:ml-auto">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                togglePublish(post);
                                            }}
                                            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors text-center"
                                        >
                                            {post.published ? 'Unpublish' : 'Publish'}
                                        </button>

                                        <Link
                                            href={`/admin/post/${post._id}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm text-center"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(post._id, post.title);
                                            }}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm text-center"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
