import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sanity Studio',
    description: 'Content management for Comic Blog',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0 }}>{children}</body>
        </html>
    )
}
