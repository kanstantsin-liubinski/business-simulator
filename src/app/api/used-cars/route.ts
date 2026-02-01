import { NextResponse } from "next/server";
import prisma from "utils/prisma";

export async function GET() {
  try {
    const usedCars = await prisma.usedCar.findMany({
      include: {
        make: true,
        model: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(usedCars);
  } catch (error) {
    console.error("Error fetching used cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch used cars" },
      { status: 500 }
    );
  }
}
