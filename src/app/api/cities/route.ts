import { NextResponse } from "next/server";
import prisma from "utils/prisma";

export async function GET() {
  try {
    const cities = await prisma.city.findMany({
      include: {
        citiesEstateObjects: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Преобразуем данные в формат, который ожидает фронт
    const formattedCities = cities.map(city => ({
      name: city.name,
      image: city.image,
      properties: city.citiesEstateObjects.map(obj => ({
        id: obj.id,
        name: obj.name,
        price: obj.price,
        description: obj.description,
        x: obj.x,
        y: obj.y,
        type: obj.type,
      })),
    }));

    return NextResponse.json(formattedCities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
