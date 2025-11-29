'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { createClient } from 'next-sanity'
import "easymde/dist/easymde.min.css";

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

// Create a client with write token (should be in env, but for now we use the public one which might not have write access)
// IMPORTANT: The user needs to add a token with write access to .env.local
import { apiVersion, dataset, projectId } from '@/sanity/env'

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN, // We need a token for writing
})

interface PostEditorProps {
    post?: any
}

export default function PostEditor({ post }: PostEditorProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        title: post?.title || '',
        slug: post?.slug || '',
        description: post?.description || '',
        markdown: post?.markdown || '',
        category: post?.category || 'Technology',
        tags: post?.tags?.join(', ') || '',
        published: post?.published || false,
        coverImage: post?.coverImage || '', // This stores the URL for display
    })

    // Auto-generate slug from title if creating new
    useEffect(() => {
        if (!post && formData.title) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '')
            setFormData(prev => ({ ...prev, slug }))
        }
    }, [formData.title, post])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleMarkdownChange = useCallback((value: string) => {
        setFormData(prev => ({ ...prev, markdown: value }))
    }, [])

    const handleToggle = () => {
        setFormData(prev => ({ ...prev, published: !prev.published }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            if (!process.env.NEXT_PUBLIC_SANITY_API_TOKEN) {
                throw new Error('Missing SANITY_API_TOKEN in environment variables. Please add a token with write access.')
            }

            const doc = {
                _type: 'post',
                title: formData.title,
                slug: { _type: 'slug', current: formData.slug },
                description: formData.description,
                markdown: formData.markdown,
                category: formData.category,
                tags: formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
                published: formData.published,
                publishedAt: formData.published ? new Date().toISOString() : null,
                // We are not handling image upload here for simplicity, preserving existing if editing
            }

            if (post?._id) {
                await client.patch(post._id).set(doc).commit()
            } else {
                await client.create(doc)
            }

            router.push('/admin')
            router.refresh()
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Something went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200 text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-shadow"
                        placeholder="Enter post title"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-shadow"
                        placeholder="auto-generated"
                        required
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-shadow resize-none"
                    placeholder="Brief description of the post"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-shadow bg-white"
                    >
                        <option value="Technology">Technology</option>
                        <option value="Photography">Photography</option>
                        <option value="Random Thoughts">Random Thoughts</option>
                        <option value="Travel">Travel</option>
                        <option value="Books">Books</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="Tech, Thoughts, Books"
                        className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-shadow"
                    />
                </div>
            </div>

            <div className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-2">Content (Markdown) *</label>
                <div className="border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-slate-400 transition-shadow">
                    <SimpleMDE
                        value={formData.markdown}
                        onChange={handleMarkdownChange}
                        options={{
                            spellChecker: false,
                            placeholder: "Write your amazing content here...",
                            status: false,
                        }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-lg">
                    <button
                        type="button"
                        onClick={handleToggle}
                        className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.published ? 'bg-green-600' : 'bg-slate-300'
                            }`}
                    >
                        <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.published ? 'translate-x-5' : 'translate-x-0'
                                }`}
                        />
                    </button>
                    <span className="text-sm font-medium text-slate-700">
                        {formData.published ? 'Published' : 'Draft'}
                    </span>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
                    </button>
                </div>
            </div>
        </form>
    )
}
