import { NextRequest, NextResponse } from "next/server";

// Minimal middleware - just skip API routes
export async function middleware(request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|static|favicon.ico|api).*)"],
}