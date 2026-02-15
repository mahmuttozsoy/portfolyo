import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-me';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Only protect /admin routes
    if (pathname.startsWith('/admin')) {
        // Public admin routes (like login)
        if (pathname === '/admin') {
            return NextResponse.next();
        }

        const token = req.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/admin', req.url));
        }

        try {
            await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
            return NextResponse.next();
        } catch (error) {
            // Invalid token
            return NextResponse.redirect(new URL('/admin', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
