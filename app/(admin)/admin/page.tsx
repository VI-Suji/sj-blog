'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from 'next-sanity'
import dynamic from 'next/dynamic'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import "easymde/dist/easymde.min.css"

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

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
    markdown: string
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
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        markdown: '',
        category: 'Technology',
        tags: '',
        published: false,
    })

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
                markdown,
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

    const handleEdit = (post: Post) => {
        setEditingId(post._id)
        setIsCreating(false)
        setFormData({
            title: post.title || '',
            slug: post.slug || '',
            description: post.description || '',
            markdown: post.markdown || '',
            category: post.category || 'Technology',
            tags: post.tags?.join(', ') || '',
            published: post.published || false,
        })
    }

    const handleCreate = () => {
        setIsCreating(true)
        setEditingId(null)
        setFormData({
            title: '',
            slug: '',
            description: '',
            markdown: '',
            category: 'Technology',
            tags: '',
            published: false,
        })
    }

    const handleCancel = () => {
        setEditingId(null)
        setIsCreating(false)
        setFormData({
            title: '',
            slug: '',
            description: '',
            markdown: '',
            category: 'Technology',
            tags: '',
            published: false,
        })
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const doc = {
                _type: 'post',
                title: formData.title,
                slug: { _type: 'slug', current: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
                description: formData.description,
                markdown: formData.markdown,
                category: formData.category,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                published: formData.published,
                publishedAt: formData.published ? new Date().toISOString() : null,
            }

            if (editingId) {
                await client.patch(editingId).set(doc).commit()
            } else {
                await client.create(doc)
            }

            await fetchPosts()
            handleCancel()
        } catch (error) {
            console.error('Error saving:', error)
            alert('Error saving post')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) {
            return
        }

        try {
            await client.delete(id)
            await fetchPosts()
            if (editingId === id) {
                handleCancel()
            }
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-3 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
                    <p className="text-slate-600 font-medium">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
                            Content Manager
                        </h1>
                        <p className="text-slate-500">Manage your blog posts</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors duration-200 shadow-sm"
                    >
                        + New Post
                    </button>
                </div>
            </div>

            {/* Editor Form */}
            {(isCreating || editingId) && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        {isCreating ? 'Create New Post' : 'Edit Post'}
                    </h2>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-shadow"
                                    placeholder="Enter post title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-shadow"
                                    placeholder="auto-generated"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-shadow resize-none"
                                rows={3}
                                placeholder="Brief description of the post"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-shadow bg-white"
                                >
                                    <option value="Technology">Technology</option>
                                    <option value="Design">Design</option>
                                    <option value="Business">Business</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Tags</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-shadow"
                                    placeholder="tag1, tag2, tag3"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Content (Markdown) *</label>
                            <div className="border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-slate-400 transition-shadow">
                                <SimpleMDE
                                    value={formData.markdown}
                                    onChange={(value) => setFormData({ ...formData, markdown: value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                            <input
                                type="checkbox"
                                id="published"
                                checked={formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400 cursor-pointer"
                            />
                            <label htmlFor="published" className="text-sm font-medium text-slate-700 cursor-pointer">
                                Publish immediately
                            </label>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-slate-200">
                            <button
                                onClick={handleSave}
                                disabled={saving || !formData.title || !formData.description || !formData.markdown}
                                className="px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                {saving ? 'Saving...' : 'Save Post'}
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-6 py-2.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Posts List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900">All Posts</h2>
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                            {posts.length}
                        </span>
                    </div>
                </div>

                {posts.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-slate-500">No posts yet. Create your first post to get started!</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {posts.map((post) => (
                            <div
                                key={post._id}
                                onClick={() => handleEdit(post)}
                                className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                {post.title}
                                            </h3>
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${post.published
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                {post.published ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed">{post.description}</p>
                                        <div className="flex flex-wrap gap-2 text-sm">
                                            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium">
                                                {post.category}
                                            </span>
                                            {post.tags?.map((tag, i) => (
                                                <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md font-medium">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => togglePublish(post)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${post.published
                                                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                }`}
                                        >
                                            {post.published ? 'Unpublish' : 'Publish'}
                                        </button>
                                        <button
                                            onClick={() => handleEdit(post)}
                                            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post._id, post.title)}
                                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
