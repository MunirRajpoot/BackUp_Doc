import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard',];

export function middleware(req) {
    const token = req.cookies.get('auth_token')?.value;
    const { pathname } = req.nextUrl;


    // Check if pathname starts with a protected route
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

    if (isProtected && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
