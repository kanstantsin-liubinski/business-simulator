import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // List all cookies for debugging
    const allCookies = request.cookies.getAll();
    const cookieNames = allCookies.map(c => c.name);
    console.log(`[Middleware] All cookies:`, cookieNames);
    
    // Try to get the session token directly from cookies
    const sessionToken = request.cookies.get("__Secure-authjs.session-token")?.value 
        || request.cookies.get("authjs.session-token")?.value;

    console.log(`[Middleware] Path: ${pathname}, SessionToken: ${sessionToken ? 'EXISTS' : 'MISSING'}`);
    
    if (sessionToken) {
        console.log(`[Middleware] SessionToken prefix:`, sessionToken.substring(0, 50));
    }

    const secret = process.env.NEXTAUTH_SECRET;
    console.log(`[Middleware] NEXTAUTH_SECRET length:`, secret?.length);
    
    if (!secret) {
        console.error("[Middleware] NEXTAUTH_SECRET not found!");
        return NextResponse.next();
    }

    const token = sessionToken ? await getToken({ 
        req: request,
        secret: secret
    }) : null;

    console.log(`[Middleware] JWT Token valid: ${token ? 'YES' : 'NO'}`);
    if (token) {
        console.log(`[Middleware] Token user:`, token);
    }

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