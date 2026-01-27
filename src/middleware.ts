import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = await getToken({ 
        req: request,
        secret: process.env.NEXTAUTH_SECRET 
    });

    // Paths that don't require authentication
    const publicPaths = ["/sign-in", "/sign-up", "/api/auth"];

    // Check if current path is public
    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

    // If user is not authenticated and trying to access protected route
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // If user is authenticated and trying to access sign-in/sign-up, redirect to home
    if (token && (pathname === "/sign-in" || pathname === "/sign-up")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|static|favicon.ico).*)"],
}