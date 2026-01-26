import { NextResponse } from "next/server";
import prisma from "utils/prisma";
import { auth } from "auth/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { propertyId } = await request.json();

    if (!propertyId) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    // Получаем пользователя
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Получаем объект недвижимости
    const property = await prisma.citiesEstateObject.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Проверяем, не куплен ли уже объект
    if (property.ownerId) {
      return NextResponse.json(
        { error: "Property already owned" },
        { status: 400 }
      );
    }

    // Проверяем, хватает ли денег
    if (user.balance < property.price) {
      return NextResponse.json(
        { error: "Insufficient funds" },
        { status: 400 }
      );
    }

    // Выполняем транзакцию: снимаем деньги и назначаем владельца
    const [updatedUser, updatedProperty] = await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { balance: user.balance - property.price },
      }),
      prisma.citiesEstateObject.update({
        where: { id: propertyId },
        data: { ownerId: user.id },
      }),
    ]);

    return NextResponse.json({
      success: true,
      newBalance: updatedUser.balance,
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Error buying property:", error);
    return NextResponse.json(
      { error: "Failed to buy property" },
      { status: 500 }
    );
  }
}
