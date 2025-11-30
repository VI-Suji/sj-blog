'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { createClient } from 'next-sanity'
import "easymde/dist/easymde.min.css";
import Image from 'next/image';

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

import { apiVersion, dataset, projectId } from '@/sanity/env'
import { urlFor } from '@/lib/sanity.client'

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
})

interface PostEditorProps {
    post?: any
}

export default function PostEditor({ post }: PostEditorProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>('')
    const editorRef = useRef<any>(null)

    const [formData, setFormData] = useState({
        title: post?.title || '',
        slug: post?.slug || '',
        description: post?.description || '',
        markdown: post?.markdown || '',
        category: post?.category || 'Technology',
        tags: post?.tags?.join(', ') || '',
        published: post?.published || false,
    })

    // Initialize preview URL if post has an image
    useEffect(() => {
        if (post?.coverImage) {
            if (typeof post.coverImage === 'string') {
                setPreviewUrl(post.coverImage)
            } else if (post.coverImage.asset) {
                setPreviewUrl(urlFor(post.coverImage))
            }
        }
    }, [post])

    // Auto-generate slug
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

    const handleMarkdownChange = (value: string) => {
        setFormData(prev => ({ ...prev, markdown: value }))
    }

    const handleToggle = () => {
        setFormData(prev => ({ ...prev, published: !prev.published }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setIsSubmitting(true)

            // Upload image to Sanity
            const asset = await client.assets.upload('image', file, {
                contentType: file.type,
                filename: file.name,
            })

            // Get the image URL
            const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${asset._id.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`

            // Insert markdown image syntax at cursor position
            const markdownImage = `\n![${file.name.split('.')[0]}](${imageUrl})\n`

            // Use SimpleMDE's CodeMirror instance to insert at cursor
            if (editorRef.current) {
                const cm = editorRef.current.codemirror
                if (cm) {
                    const doc = cm.getDoc()
                    const cursor = doc.getCursor()
                    doc.replaceRange(markdownImage, cursor)
                }
            } else {
                // Fallback: append to end if editor ref not available
                setFormData(prev => ({ ...prev, markdown: prev.markdown + markdownImage }))
            }

            setIsSubmitting(false)
        } catch (error) {
            console.error('Error uploading image:', error)
            alert('Failed to upload image')
            setIsSubmitting(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            if (!process.env.NEXT_PUBLIC_SANITY_API_TOKEN) {
                throw new Error('Missing SANITY_API_TOKEN. Please add it to .env.local')
            }

            // 1. Upload Image if exists
            let imageAssetId = null
            if (imageFile) {
                const asset = await client.assets.upload('image', imageFile, {
                    contentType: imageFile.type,
                    filename: imageFile.name,
                })
                imageAssetId = asset._id
            }

            // 2. Prepare Document
            const doc: any = {
                _type: 'post',
                title: formData.title,
                slug: { _type: 'slug', current: formData.slug },
                description: formData.description,
                markdown: formData.markdown,
                category: formData.category,
                tags: formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
                published: formData.published,
                publishedAt: formData.published ? (post?.publishedAt || new Date().toISOString()) : null,
            }

            // Add image if uploaded
            if (imageAssetId) {
                doc.coverImage = {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageAssetId
                    }
                }
            }

            // 3. Create or Patch
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

    // Memoize SimpleMDE options to prevent re-renders
    const editorOptions = useMemo(() => ({
        spellChecker: false,
        placeholder: "Write your amazing content here...",
        status: false,
        autofocus: false,
    }), [])

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
            {error && (
                <div className="bg-red-50 text-red-700 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 border border-red-200 text-xs sm:text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-shadow"
                        placeholder="Enter post title"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-shadow"
                        placeholder="auto-generated"
                        required
                    />
                </div>
            </div>

            {/* IMAGE UPLOAD SECTION */}
            <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Cover Image</label>
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="flex-1 w-full">
                        <label className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-4 sm:pt-5 pb-5 sm:pb-6">
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="text-xs sm:text-sm text-slate-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            </div>
                            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                        </label>
                    </div>
                    {previewUrl && (
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 border border-slate-200 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-shadow resize-none"
                    placeholder="Brief description of the post (optional)"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-shadow bg-white"
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
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Tags (comma separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="Tech, Thoughts, Books"
                        className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-shadow"
                    />
                </div>
            </div>

            <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700">Content (Markdown) *</label>

                    {/* Image Upload Button */}
                    <label className="cursor-pointer px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>Add Image</span>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleContentImageUpload}
                            disabled={isSubmitting}
                        />
                    </label>
                </div>

                <div className="border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-slate-400 transition-shadow">
                    <SimpleMDE
                        value={formData.markdown}
                        onChange={handleMarkdownChange}
                        options={editorOptions}
                        getMdeInstance={(instance) => {
                            editorRef.current = instance
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 sm:pt-6 border-t border-slate-200">
                <div className="flex items-center gap-3 px-3 sm:px-4 py-2 bg-slate-50 rounded-lg">
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
                    <span className="text-xs sm:text-sm font-medium text-slate-700">
                        {formData.published ? 'Published' : 'Draft'}
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 sm:px-6 py-2 sm:py-2.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm sm:text-base text-center"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base text-center"
                    >
                        {isSubmitting ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
                    </button>
                </div>
            </div>
        </form>
    )
}
