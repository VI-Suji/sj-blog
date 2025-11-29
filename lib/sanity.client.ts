import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../sanity/env'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
})

// Simple image URL builder
export function urlFor(source: any) {
    if (!source?.asset?._ref) return '/latest1.png'

    const [, id, dimensions, format] = source.asset._ref.split('-')
    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
}
