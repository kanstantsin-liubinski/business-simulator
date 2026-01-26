// Временный файл для отправки данных в БД через POST /api/seed-cities
// После заполнения БД этот файл можно удалить

const citiesData = [
  {
    name: "New York",
    image: "/maps/new-york.jpg",
    properties: [
      {
        name: "Manhattan Apartment",
        price: 850000,
        description: "Luxury apartment in the heart of Manhattan.",
        x: 20.3,
        y: 30.5,
        type: "Apartment",
      },
      {
        name: "Brooklyn Loft",
        price: 550000,
        description: "Modern loft in trendy Brooklyn neighborhood.",
        x: 87.7,
        y: 62.3,
        type: "Loft",
      },
      {
        name: "Penthouse Times Square",
        price: 1200000,
        description: "Premium penthouse with Times Square views.",
        x: 58.5,
        y: 18,
        type: "Penthouse",
      },
      {
        name: "Upper East Side Townhouse",
        price: 950000,
        description: "Classic townhouse in exclusive neighborhood.",
        x: 56.3,
        y: 83,
        type: "Townhouse",
      },
      {
        name: "SoHo Loft",
        price: 750000,
        description: "Artistic loft in vibrant SoHo district.",
        x: 25.4,
        y: 63.1,
        type: "Loft",
      },
    ],
  },
  {
    name: "Berlin",
    image: "/maps/berlin.jpg",
    properties: [
      {
        name: "Mitte Modern Apartment",
        price: 480000,
        description: "Contemporary apartment in trendy Mitte district.",
        x: 30,
        y: 25,
        type: "Apartment",
      },
      {
        name: "Kreuzberg Creative Loft",
        price: 350000,
        description: "Spacious loft in artistic Kreuzberg area.",
        x: 70,
        y: 60,
        type: "Loft",
      },
      {
        name: "Charlottenburg Palace Nearby",
        price: 620000,
        description: "Historic building near famous palace.",
        x: 50,
        y: 20,
        type: "Historic",
      },
      {
        name: "Prenzlauer Berg Studio",
        price: 320000,
        description: "Charming studio in bohemian neighborhood.",
        x: 40,
        y: 70,
        type: "Studio",
      },
      {
        name: "Friedrichshain Industrial",
        price: 400000,
        description: "Converted industrial space with character.",
        x: 25,
        y: 50,
        type: "Industrial",
      },
    ],
  },
  {
    name: "Moscow",
    image: "/maps/moscow.jpg",
    properties: [
      {
        name: "Red Square Apartment",
        price: 1100000,
        description: "Luxury apartment with Kremlin views.",
        x: 30,
        y: 25,
        type: "Apartment",
      },
      {
        name: "Arbat Historic House",
        price: 750000,
        description: "Charming house on famous Arbat street.",
        x: 70,
        y: 60,
        type: "House",
      },
      {
        name: "Sokolniki Park Penthouse",
        price: 950000,
        description: "Modern penthouse with park views.",
        x: 50,
        y: 20,
        type: "Penthouse",
      },
      {
        name: "Tverskaya Office",
        price: 580000,
        description: "Prime office space in business district.",
        x: 40,
        y: 70,
        type: "Office",
      },
      {
        name: "Zamoskvorechye Mansion",
        price: 1300000,
        description: "Grand mansion in historic district.",
        x: 25,
        y: 50,
        type: "Mansion",
      },
    ],
  },
  {
    name: "Beijing",
    image: "/maps/beijing.jpg",
    properties: [
      {
        name: "Forbidden City Nearby Apartment",
        price: 680000,
        description: "Luxury apartment near historic palace.",
        x: 30,
        y: 25,
        type: "Apartment",
      },
      {
        name: "Chaoyang Modern Condo",
        price: 520000,
        description: "Contemporary condo in business district.",
        x: 70,
        y: 60,
        type: "Condo",
      },
      {
        name: "Summer Palace Estate",
        price: 890000,
        description: "Prestigious estate near royal gardens.",
        x: 50,
        y: 20,
        type: "Estate",
      },
      {
        name: "Hutong Traditional House",
        price: 420000,
        description: "Restored traditional courtyard house.",
        x: 40,
        y: 70,
        type: "Traditional",
      },
      {
        name: "CBD Premium Office",
        price: 650000,
        description: "Modern office in central business district.",
        x: 25,
        y: 50,
        type: "Office",
      },
    ],
  },
  {
    name: "Tokyo",
    image: "/maps/tokyo.jpg",
    properties: [
      {
        name: "Shibuya Modern Apartment",
        price: 920000,
        description: "Contemporary apartment in vibrant Shibuya.",
        x: 30,
        y: 25,
        type: "Apartment",
      },
      {
        name: "Shinjuku Luxury Tower",
        price: 1100000,
        description: "High-rise condo in bustling Shinjuku.",
        x: 70,
        y: 60,
        type: "Tower",
      },
      {
        name: "Ginza Premium Studio",
        price: 780000,
        description: "Exclusive studio in luxury shopping district.",
        x: 50,
        y: 20,
        type: "Studio",
      },
      {
        name: "Asakusa Traditional Home",
        price: 550000,
        description: "Charming home in historic temple area.",
        x: 40,
        y: 70,
        type: "Home",
      },
      {
        name: "Minato Bay Penthouse",
        price: 1400000,
        description: "Ultra-luxury penthouse with bay views.",
        x: 25,
        y: 50,
        type: "Penthouse",
      },
    ],
  },
];

// Функция для отправки данных
async function seedDatabase() {
  try {
    const response = await fetch("http://localhost:3001/api/seed-cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(citiesData),
    });

    const result = await response.json();
    console.log("Seed result:", result);
  } catch (error) {
    console.error("Error seeding:", error);
  }
}

// Раскомментируйте следующую строку и запустите файл для заполнения БД:
// seedDatabase();

export { citiesData, seedDatabase };
