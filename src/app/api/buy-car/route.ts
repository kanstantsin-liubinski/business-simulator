import { NextResponse } from 'next/server';
import { auth } from 'auth/auth';
import prisma from 'utils/prisma';

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { carId, carPrice, carName } = await request.json();

    if (!carId || !carPrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { ownedProperties: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user has enough balance
    if (user.balance < carPrice) {
      return NextResponse.json(
        { error: 'Insufficient funds' },
        { status: 400 }
      );
    }

    // Update user balance
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        balance: user.balance - carPrice,
      },
    });

    // Create UserCar record to link the car to the user
    await prisma.userCar.create({
      data: {
        userId: user.id,
        carId: carId,
      },
    });

    return NextResponse.json({
      success: true,
      newBalance: updatedUser.balance,
      message: `Поздравляем! Вы купили ${carName} за $${carPrice.toLocaleString()}`,
    });
  } catch (error) {
    console.error('Error buying car:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
