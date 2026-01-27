import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Try to get the session token directly from cookies
    const sessionToken = request.cookies.get("__Secure-authjs.session-token")?.value 
        || request.cookies.get("authjs.session-token")?.value;

    console.log(`[Middleware] Path: ${pathname}, SessionToken: ${sessionToken ? 'EXISTS' : 'MISSING'}`);
    
    // List all cookies for debugging
    const allCookies = request.cookies.getAll();
    console.log(`[Middleware] All cookies:`, allCookies.map(c => c.name));

    const secret = process.env.NEXTAUTH_SECRET;
    
    if (!secret) {
        console.error("[Middleware] NEXTAUTH_SECRET not found!");
        return NextResponse.next();
    }

    const token = sessionToken ? await getToken({ 
        req: request,
        secret: secret
    }) : null;

    console.log(`[Middleware] JWT Token valid: ${token ? 'YES' : 'NO'}`);

    // Public paths that still go through middleware
    if (pathname === "/sign-in" || pathname === "/sign-up") {
        // If user is authenticated and trying to access sign-in/sign-up, redirect to home
        if (token) {
            console.log(`[Middleware] Redirecting to / - user already authenticated`);
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    // Protected routes - require authentication
    if (!token) {
        console.log(`[Middleware] Redirecting to /sign-in - no token for ${pathname}`);
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|static|favicon.ico|api).*)"],
}