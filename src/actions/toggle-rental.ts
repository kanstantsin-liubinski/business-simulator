"use server";

import { auth } from "auth/auth";
import prisma from "utils/prisma";

interface ToggleRentalResponse {
  success: boolean;
  isRented?: boolean;
  message?: string;
  error?: string;
}

export async function togglePropertyRental(propertyId: string): Promise<ToggleRentalResponse> {
  try {
    // 1. Проверяем аутентификацию
    const session = await auth();

    if (!session?.user?.email) {
      return { success: false, error: "Not authenticated" };
    }

    // Находим пользователя по email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // 2. Находим свойство и проверяем что оно принадлежит пользователю
    const property = await prisma.citiesEstateObject.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return { success: false, error: "Property not found" };
    }

    if (property.ownerId !== user.id) {
      return { success: false, error: "This property does not belong to you" };
    }

    // 3. Переключаем флаг isRented
    const updatedProperty = await prisma.citiesEstateObject.update({
      where: { id: propertyId },
      data: { isRented: !property.isRented },
    });

    return {
      success: true,
      isRented: updatedProperty.isRented,
      message: updatedProperty.isRented
        ? "Property is now being rented out"
        : "Rental stopped",
    };
  } catch (error) {
    console.error("Error toggling property rental:", error);
    return { success: false, error: "Failed to toggle rental" };
  }
}
