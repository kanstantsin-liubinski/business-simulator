import { NextResponse } from "next/server";
import prisma from "utils/prisma";

export async function POST(request: Request) {
  try {
    const cities = await request.json();

    // Очищаем старые данные (если нужно)
    await prisma.citiesEstateObject.deleteMany({});
    await prisma.city.deleteMany({});

    // Создаем города с их объектами
    for (const cityData of cities) {
      await prisma.city.create({
        data: {
          name: cityData.name,
          image: cityData.image,
          citiesEstateObjects: {
            create: cityData.properties.map((prop: any) => ({
              name: prop.name,
              price: prop.price,
              description: prop.description,
              x: prop.x,
              y: prop.y,
              type: prop.type,
            })),
          },
        },
      });
    }

    const count = await prisma.city.count();
    const propertiesCount = await prisma.citiesEstateObject.count();

    return NextResponse.json({
      success: true,
      message: `Created ${count} cities with ${propertiesCount} properties`,
    });
  } catch (error) {
    console.error("Error seeding cities:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed cities" },
      { status: 500 }
    );
  }
}
