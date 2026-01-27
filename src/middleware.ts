import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const secret = process.env.NEXTAUTH_SECRET;
    
    if (!secret) {
        console.error("[Middleware] NEXTAUTH_SECRET not found!");
        return NextResponse.next();
    }

    const token = await getToken({ 
        req: request,
        secret: secret
    });

    console.log(`[Middleware] Path: ${pathname}, Token: ${token ? 'EXISTS' : 'MISSING'}`);

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