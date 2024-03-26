import { NextResponse } from 'next/server'

export function middleware(request) {
    const response = NextResponse.next();
    if (request.cookies.has('token')) {
        const token = request.cookies.get('token').value;
        response.cookies.set('token', token, {expires: Date.now() + 1000 * 60 * 60 * 24 * 7 * 4})
    }
    return response;
}

export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}