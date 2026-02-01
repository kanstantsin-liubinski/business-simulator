import { NextResponse } from 'next/server';
import { auth } from 'auth/auth';
import prisma from 'utils/prisma';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        ownedProperties: true,
        ownedCars: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Count properties and cars
    const propertiesCount = user.ownedProperties.length;
    const carsCount = user.ownedCars.length;

    return NextResponse.json({
      balance: user.balance,
      propertiesCount,
      carsCount,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
