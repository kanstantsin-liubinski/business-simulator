import { NextResponse } from "next/server";
import prisma from "utils/prisma";
import { auth } from "auth/auth";

export async function GET() {
  try {
    const session = await auth();
    console.log("API /user - Session:", session);
    
    if (!session?.user?.email) {
      console.log("API /user - No session or email");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        balance: true,
      },
    });

    console.log("API /user - User found:", user);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
