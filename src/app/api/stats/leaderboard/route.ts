import { NextResponse } from 'next/server';
import prisma from 'utils/prisma';

export async function GET() {
  try {
    const topUsers = await prisma.user.findMany({
      orderBy: {
        balance: 'desc',
      },
      take: 100,
      select: {
        id: true,
        email: true,
        balance: true,
        _count: {
          select: {
            ownedProperties: true,
          },
        },
      },
    });

    const formattedUsers = topUsers.map((user, index) => ({
      rank: index + 1,
      email: user.email,
      balance: user.balance,
      propertiesCount: user._count.ownedProperties,
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Error fetching top users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
