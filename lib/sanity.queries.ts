import { client, urlFor } from './sanity.client'
import { BlogPost } from './types'
import { PortableTextBlock } from '@sanity/types'

// GROQ query to fetch all published posts
const postsQuery = `*[_type == "post" && published == true] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "coverImage": coverImage.asset->url,
  category,
  tags,
  publishedAt,
  published,
  content,
  markdown
}`

// GROQ query to fetch ALL posts for Admin
const allPostsQuery = `*[_type == "post"] | order(_updatedAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "coverImage": coverImage.asset->url,
  category,
  tags,
  publishedAt,
  published,
  _updatedAt,
  markdown
}`

// GROQ query to fetch a single post by slug
const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  coverImage,
  category,
  tags,
  publishedAt,
  published,
  content,
  markdown
}`

export async function getPublishedPosts(): Promise<BlogPost[]> {
    try {
        const posts = await client.fetch(postsQuery)

        return posts.map((post: any) => ({
            id: post._id,
            title: post.title || 'Untitled',
            slug: post.slug || '',
            date: post.publishedAt || new Date().toISOString(),
            tags: post.tags || [],
            category: post.category || '',
            description: post.description || '',
            published: post.published || false,
            cover: post.coverImage || '/latest1.png',
            readTime: calculateReadTime(post.content),
            content: post.content,
        }))
    } catch (error) {
        console.error('Error fetching posts from Sanity:', error)
        return []
    }
}

export async function getAllPosts() {
    try {
        const posts = await client.fetch(allPostsQuery)
        return posts.map((post: any) => ({
            ...post,
            id: post._id,
            date: post.publishedAt || post._updatedAt,
        }))
    } catch (error) {
        console.error('Error fetching all posts:', error)
        return []
    }
}

export async function getPostById(id: string) {
    try {
        const post = await client.fetch(`*[_type == "post" && _id == $id][0] {
            ...,
            "slug": slug.current
        }`, { id })
        if (!post) return null
        return post
    } catch (error) {
        console.error('Error fetching post by id:', error)
        return null
    }
}

export async function getPostBySlug(slug: string) {
    try {
        const post = await client.fetch(postBySlugQuery, { slug })

        if (!post) return null

        // Get cover image URL
        let coverUrl = '/latest1.png'
        if (post.coverImage) {
            coverUrl = urlFor(post.coverImage)
        }

        return {
            post: {
                id: post._id,
                title: post.title || 'Untitled',
                slug: post.slug || '',
                date: post.publishedAt || new Date().toISOString(),
                tags: post.tags || [],
                category: post.category || '',
                description: post.description || '',
                published: post.published || false,
                cover: coverUrl,
                readTime: calculateReadTime(post.content),
            },
            content: post.content,
            markdown: post.markdown || null,
        }
    } catch (error) {
        console.error('Error fetching post by slug:', error)
        return null
    }
}

// Helper function to calculate read time from Portable Text content
function calculateReadTime(content: PortableTextBlock[]): string {
    if (!content || !Array.isArray(content)) return '3 min read'

    let wordCount = 0

    content.forEach((block: any) => {
        if (block._type === 'block' && block.children) {
            block.children.forEach((child: any) => {
                if (child.text) {
                    wordCount += child.text.split(/\s+/).filter(Boolean).length
                }
            })
        }
    })

    const minutes = Math.ceil(wordCount / 200) // Average reading speed
    return `${minutes} min read`
}

// Helper function to convert Portable Text to plain markdown (simplified)
export function portableTextToMarkdown(content: PortableTextBlock[]): string {
    if (!content || !Array.isArray(content)) return ''

    let markdown = ''

    content.forEach((block: any) => {
        if (block._type === 'block') {
            // Handle different block styles
            const text = block.children?.map((child: any) => {
                let str = child.text || ''

                // Apply marks (bold, italic, etc.)
                if (child.marks && child.marks.length > 0) {
                    child.marks.forEach((mark: string) => {
                        if (mark === 'strong') str = `**${str}**`
                        if (mark === 'em') str = `*${str}*`
                        if (mark === 'code') str = `\`${str}\``
                    })
                }

                return str
            }).join('') || ''

            // Add appropriate markdown syntax based on style
            switch (block.style) {
                case 'h1':
                    markdown += `# ${text}\n\n`
                    break
                case 'h2':
                    markdown += `## ${text}\n\n`
                    break
                case 'h3':
                    markdown += `### ${text}\n\n`
                    break
                case 'blockquote':
                    markdown += `> ${text}\n\n`
                    break
                default:
                    markdown += `${text}\n\n`
            }
        } else if (block._type === 'code') {
            markdown += `\`\`\`${block.language || ''}\n${block.code}\n\`\`\`\n\n`
        }
    })

    return markdown
}
