import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isOnAdmin = req.nextUrl.pathname.startsWith('/admin')

    if (isOnAdmin && !isLoggedIn) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    if (isOnAdmin && isLoggedIn) {
        // Check if the user's email is authorized
        if (req.auth?.user?.email !== 'sujithvi06@gmail.com') {
            return NextResponse.redirect(new URL('/auth/error?error=AccessDenied', req.url))
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/admin/:path*']
}
