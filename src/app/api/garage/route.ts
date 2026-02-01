import { NextResponse } from "next/server";
import { auth } from "auth/auth";
import prisma from "utils/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        ownedCars: {
          include: {
            car: {
              include: {
                make: true,
                model: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Transform to just the cars with their details
    const cars = user.ownedCars.map((userCar) => ({
      ...userCar.car,
      userCarId: userCar.id,
    }));

    return NextResponse.json(cars);
  } catch (error) {
    console.error("Error fetching user cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch user cars" },
      { status: 500 }
    );
  }
}
