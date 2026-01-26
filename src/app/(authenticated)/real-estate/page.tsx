"use client";

import { useState } from "react";

interface Property {
  id: number;
  name: string;
  price: number;
  description: string;
  x: number;
  y: number;
  type: string;
}

interface City {
  name: string;
  image: string;
  properties: Property[];
}

const cities: City[] = [
  {
    name: "New York",
    image:
      "/maps/new-york.jpg",
    properties: [
      {
        id: 1,
        name: "Manhattan Apartment",
        price: 850000,
        description: "Luxury apartment in the heart of Manhattan.",
        x: 20.3,
        y: 30.5,
        type: "Apartment",
      },
      {
        id: 2,
        name: "Brooklyn Loft",
        price: 550000,
        description: "Modern loft in trendy Brooklyn neighborhood.",
        x: 87.7,
        y: 62.3,
        type: "Loft",
      },
      {
        id: 3,
        name: "Penthouse Times Square",
        price: 1200000,
        description: "Premium penthouse with Times Square views.",
        x: 58.5,
        y: 18,
        type: "Penthouse",
      },
      {
        id: 4,
        name: "Upper East Side Townhouse",
        price: 950000,
        description: "Classic townhouse in exclusive neighborhood.",
        x: 56.3,
        y: 83,
        type: "Townhouse",
      },
      {
        id: 5,
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
    image:
      "/maps/berlin.jpg",
    properties: [
      {
        id: 1,
        name: "Mitte Modern Apartment",
        price: 480000,
        description: "Contemporary apartment in trendy Mitte district.",
        x: 30,
        y: 25,
        type: "Apartment",
      },
      {
        id: 2,
        name: "Kreuzberg Creative Loft",
        price: 350000,
        description: "Spacious loft in artistic Kreuzberg area.",
        x: 70,
        y: 60,
        type: "Loft",
      },
      {
        id: 3,
        name: "Charlottenburg Palace Nearby",
        price: 620000,
        description: "Historic building near famous palace.",
        x: 50,
        y: 20,
        type: "Historic",
      },
      {
        id: 4,
        name: "Prenzlauer Berg Studio",
        price: 320000,
        description: "Charming studio in bohemian neighborhood.",
        x: 40,
        y: 70,
        type: "Studio",
      },
      {
        id: 5,
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
    image:
      "/maps/moscow.jpg",
    properties: [
      {
        id: 1,
        name: "Red Square Apartment",
        price: 1100000,
        description: "Luxury apartment with Kremlin views.",
        x: 30,
        y: 25,
        type: "Apartment",
      },
      {
        id: 2,
        name: "Arbat Historic House",
        price: 750000,
        description: "Charming house on famous Arbat street.",
        x: 70,
        y: 60,
        type: "House",
      },
      {
        id: 3,
        name: "Sokolniki Park Penthouse",
        price: 950000,
        description: "Modern penthouse with park views.",
        x: 50,
        y: 20,
        type: "Penthouse",
      },
      {
        id: 4,
        name: "Tverskaya Office",
        price: 580000,
        description: "Prime office space in business district.",
        x: 40,
        y: 70,
        type: "Office",
      },
      {
        id: 5,
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
    image:
      "/maps/beijing.jpg",
    properties: [
      {
        id: 1,
        name: "Forbidden City Nearby Apartment",
        price: 680000,
        description: "Luxury apartment near historic palace.",
        x: 30,
        y: 25,
        type: "Apartment",
      },
      {
        id: 2,
        name: "Chaoyang Modern Condo",
        price: 520000,
        description: "Contemporary condo in business district.",
        x: 70,
        y: 60,
        type: "Condo",
      },
      {
        id: 3,
        name: "Summer Palace Estate",
        price: 890000,
        description: "Prestigious estate near royal gardens.",
        x: 50,
        y: 20,
        type: "Estate",
      },
      {
        id: 4,
        name: "Hutong Traditional House",
        price: 420000,
        description: "Restored traditional courtyard house.",
        x: 40,
        y: 70,
        type: "Traditional",
      },
      {
        id: 5,
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
    image:
      "/maps/tokyo.jpg",
    properties: [
      {
        id: 1,
        name: "Shibuya Modern Apartment",
        price: 920000,
        description: "Contemporary apartment in vibrant Shibuya.",
        x: 30,
        y: 25,
        type: "Apartment",
      },
      {
        id: 2,
        name: "Shinjuku Luxury Tower",
        price: 1100000,
        description: "High-rise condo in bustling Shinjuku.",
        x: 70,
        y: 60,
        type: "Tower",
      },
      {
        id: 3,
        name: "Ginza Premium Studio",
        price: 780000,
        description: "Exclusive studio in luxury shopping district.",
        x: 50,
        y: 20,
        type: "Studio",
      },
      {
        id: 4,
        name: "Asakusa Traditional Home",
        price: 550000,
        description: "Charming home in historic temple area.",
        x: 40,
        y: 70,
        type: "Home",
      },
      {
        id: 5,
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

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
}

const PropertyModal = ({ property, onClose }: PropertyModalProps) => {
  if (!property) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-slate-700 to-slate-800 border border-cyan-500/50 rounded-lg p-8 max-w-md w-full z-50 shadow-2xl shadow-cyan-500/30">
        <h2 className="text-3xl font-bold text-cyan-200 mb-3">
          {property.name}
        </h2>
        <p className="text-sm text-gray-400 mb-4">{property.type}</p>
        <p className="text-gray-300 mb-6">{property.description}</p>

        <div className="bg-slate-900/50 rounded-lg p-4 mb-6 border border-cyan-500/30">
          <p className="text-gray-400 mb-2">Price</p>
          <p className="text-4xl font-bold text-cyan-300">
            ${property.price.toLocaleString()}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-slate-700 text-white border border-cyan-500/60 hover:border-cyan-400 hover:bg-slate-600 hover:shadow-lg hover:shadow-cyan-500/30 rounded-lg font-semibold transition-all duration-200 active:scale-95"
        >
          Close
        </button>
      </div>
    </>
  );
};

export default function RealEstatePage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const currentCity = cities[selectedCityIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center px-8 py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 max-w-6xl w-full">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent mb-3">
            REAL ESTATE
          </h1>
          <p className="text-gray-300 text-lg">Explore properties in {currentCity.name}</p>
        </div>

        {/* City Selection Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          {cities.map((city, index) => (
            <button
              key={city.name}
              onClick={() => setSelectedCityIndex(index)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${
                selectedCityIndex === index
                  ? "bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/50 border border-cyan-300"
                  : "bg-slate-700 text-white border border-cyan-500/60 hover:border-cyan-400 hover:bg-slate-600 hover:shadow-lg hover:shadow-cyan-500/30"
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>

        {/* Interactive Map */}
        <div
          className="w-full aspect-video bg-cover bg-center border-2 border-cyan-500/50 rounded-lg relative overflow-hidden shadow-2xl shadow-cyan-500/20"
          style={{
            backgroundImage: `url('${currentCity.image}')`,
          }}
        >
          {/* Dark overlay for better visibility */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Properties markers */}
          {currentCity.properties.map((property) => (
            <button
              key={property.id}
              onClick={() => setSelectedProperty(property)}
              className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 active:scale-90"
              style={{
                left: `${property.x}%`,
                top: `${property.y}%`,
              }}
            >
              {/* Outer glow */}
              <div className="absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-cyan-500/30 rounded-full blur-xl group-hover:bg-cyan-500/50 transition-all duration-200"></div>

              {/* Marker circle */}
              <div className="absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full border-2 border-cyan-200 shadow-lg shadow-cyan-500/50 group-hover:shadow-xl group-hover:shadow-cyan-500/70 group-hover:scale-125 transition-all duration-200"></div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-slate-900 border border-cyan-500 rounded px-3 py-2 whitespace-nowrap text-sm text-cyan-200 shadow-lg">
                  {property.name}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Properties count */}
        <div className="text-center text-gray-400">
          <p>
            Displaying {currentCity.properties.length} properties in {currentCity.name}. Click on any marker to view details.
          </p>
        </div>
      </div>

      {/* Modal */}
      <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    </div>
  );
}
