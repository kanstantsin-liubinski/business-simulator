"use client";

import { useState } from "react";
import { useGameStore } from "store/game.store";
import { useRouter } from "next/navigation";

interface Car {
  id: number;
  name: string;
  year: number;
  mileage: number;
  condition: number;
  color: string;
  price: number;
}

const cars: Car[] = [
  {
    id: 1,
    name: "Toyota Camry",
    year: 2020,
    mileage: 35000,
    condition: 92,
    color: "Silver",
    price: 18500,
  },
  {
    id: 2,
    name: "BMW 3 Series",
    year: 2019,
    mileage: 48000,
    condition: 88,
    color: "Black",
    price: 28900,
  },
  {
    id: 3,
    name: "Honda Civic",
    year: 2021,
    mileage: 22000,
    condition: 95,
    color: "Blue",
    price: 16200,
  },
  {
    id: 4,
    name: "Mercedes-Benz C-Class",
    year: 2018,
    mileage: 62000,
    condition: 82,
    color: "White",
    price: 32000,
  },
  {
    id: 5,
    name: "Ford Mustang",
    year: 2020,
    mileage: 28000,
    condition: 90,
    color: "Red",
    price: 35500,
  },
  {
    id: 6,
    name: "Tesla Model 3",
    year: 2022,
    mileage: 15000,
    condition: 98,
    color: "Pearl White",
    price: 42000,
  },
  {
    id: 7,
    name: "Audi A4",
    year: 2019,
    mileage: 41000,
    condition: 86,
    color: "Gray",
    price: 26800,
  },
  {
    id: 8,
    name: "Nissan Altima",
    year: 2021,
    mileage: 19000,
    condition: 94,
    color: "Platinum",
    price: 17500,
  },
  {
    id: 9,
    name: "Porsche 911",
    year: 2020,
    mileage: 12000,
    condition: 96,
    color: "Yellow",
    price: 89000,
  },
  {
    id: 10,
    name: "Chevrolet Corvette",
    year: 2021,
    mileage: 8000,
    condition: 97,
    color: "Orange",
    price: 65000,
  },
];

export default function CarMarketPage() {
  const router = useRouter();
  const { money, subtractMoney } = useGameStore();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleBuyCar = (car: Car) => {
    if (money >= car.price) {
      subtractMoney(car.price);
      alert(`Congratulations! You bought ${car.name} for $${car.price.toLocaleString()}`);
      // TODO: Add car to garage
    } else {
      alert(`Not enough money! You need $${(car.price - money).toLocaleString()} more.`);
    }
    setSelectedCar(null);
  };

  const getConditionColor = (condition: number) => {
    if (condition >= 95) return "text-green-400";
    if (condition >= 85) return "text-cyan-400";
    if (condition >= 70) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center px-8 py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col gap-8 max-w-7xl w-full">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent mb-3">
            CAR MARKET
          </h1>
          <p className="text-gray-300 text-lg">Browse and buy cars</p>
        </div>

        {/* Table */}
        <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-cyan-500/30 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-900/50 border-b border-cyan-500/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-200 uppercase tracking-wider">
                    Car
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-200 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-200 uppercase tracking-wider">
                    Mileage
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-200 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-200 uppercase tracking-wider">
                    Color
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-200 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-cyan-200 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600/30">
                {cars.map((car) => (
                  <tr
                    key={car.id}
                    className="hover:bg-slate-700/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🚗</span>
                        <span className="text-white font-semibold">{car.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{car.year}</td>
                    <td className="px-6 py-4 text-gray-300">
                      {car.mileage.toLocaleString()} mi
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${getConditionColor(car.condition)}`}>
                        {car.condition}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full text-sm text-gray-200">
                        <span
                          className="w-3 h-3 rounded-full border border-gray-400"
                          style={{
                            backgroundColor:
                              car.color === "Silver"
                                ? "#C0C0C0"
                                : car.color === "Black"
                                ? "#000000"
                                : car.color === "Blue"
                                ? "#3B82F6"
                                : car.color === "White"
                                ? "#FFFFFF"
                                : car.color === "Red"
                                ? "#EF4444"
                                : car.color === "Pearl White"
                                ? "#F8F8FF"
                                : car.color === "Gray"
                                ? "#6B7280"
                                : car.color === "Platinum"
                                ? "#E5E4E2"
                                : car.color === "Yellow"
                                ? "#FCD34D"
                                : "#FB923C",
                          }}
                        ></span>
                        {car.color}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400 font-bold text-lg">
                        ${car.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedCar(car)}
                        className="px-4 py-2 bg-gradient-to-br from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white font-semibold rounded-lg border border-cyan-400/50 hover:border-cyan-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-200 active:scale-95"
                      >
                        Buy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back button */}
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/cars")}
            className="px-6 py-3 bg-slate-700 text-white border border-slate-500 hover:border-slate-400 hover:bg-slate-600 rounded-lg font-semibold transition-all duration-200 active:scale-95"
          >
            ← Back to Cars
          </button>
        </div>
      </div>

      {/* Purchase Confirmation Modal */}
      {selectedCar && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSelectedCar(null)}
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-slate-700 to-slate-800 border border-cyan-500/50 rounded-lg p-8 max-w-md w-full z-50 shadow-2xl shadow-cyan-500/30">
            <h2 className="text-3xl font-bold text-cyan-200 mb-4">
              Confirm Purchase
            </h2>
            
            <div className="mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Car:</span>
                <span className="text-white font-semibold">{selectedCar.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Year:</span>
                <span className="text-white">{selectedCar.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Condition:</span>
                <span className={`font-bold ${getConditionColor(selectedCar.condition)}`}>
                  {selectedCar.condition}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Price:</span>
                <span className="text-green-400 font-bold text-xl">
                  ${selectedCar.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-600">
                <span className="text-gray-400">Your Balance:</span>
                <span className="text-cyan-300 font-bold">
                  ${money.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleBuyCar(selectedCar)}
                disabled={money < selectedCar.price}
                className="flex-1 px-6 py-3 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg border border-green-400/50 hover:border-green-300 disabled:border-gray-500 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 disabled:shadow-none transition-all duration-200 active:scale-95"
              >
                {money >= selectedCar.price ? "Confirm" : "Not Enough Money"}
              </button>
              <button
                onClick={() => setSelectedCar(null)}
                className="px-6 py-3 bg-slate-700 text-white border border-slate-500 hover:border-slate-400 hover:bg-slate-600 rounded-lg font-semibold transition-all duration-200 active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
