import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sanity Studio',
    description: 'Content management for Comic Blog',
}

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div style={{ margin: 0 }}>{children}</div>
    )
}
