"use client";

import { useState, useEffect } from "react";
import { useGameStore } from "store/game.store";

interface CarMake {
  id: string;
  name: string;
  createdAt: string;
}

interface CarModel {
  id: string;
  name: string;
  makeId: string;
  createdAt: string;
}

interface Car {
  id: string;
  makeId: string;
  modelId: string;
  year: number;
  mileage: number;
  condition: number;
  color: string;
  price: number;
  available: boolean;
  userCarId: string;
  make: CarMake;
  model: CarModel;
}

export default function GaragePage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isLoadingCars, setIsLoadingCars] = useState(true);

  // Fetch user cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/garage');
        const data = await response.json();
        
        // Ensure data is always an array
        if (Array.isArray(data)) {
          setCars(data);
          if (data.length > 0) {
            setSelectedCar(data[0]);
          }
        } else {
          console.error('API returned non-array data:', data);
          setCars([]);
        }
      } catch (error) {
        console.error('Failed to fetch cars:', error);
        setCars([]);
      } finally {
        setIsLoadingCars(false);
      }
    };

    fetchCars();
  }, []);

  const getCarName = (car: Car) => {
    return `${car.make.name} ${car.model.name}`;
  };

  const getConditionColor = (condition: number) => {
    if (condition >= 95) return "text-green-400";
    if (condition >= 85) return "text-cyan-400";
    if (condition >= 70) return "text-yellow-400";
    return "text-orange-400";
  };

  const getConditionBg = (condition: number) => {
    if (condition >= 95) return "from-green-900/30 to-green-800/30 border-green-500/30";
    if (condition >= 85) return "from-cyan-900/30 to-cyan-800/30 border-cyan-500/30";
    if (condition >= 70) return "from-yellow-900/30 to-yellow-800/30 border-yellow-500/30";
    return "from-orange-900/30 to-orange-800/30 border-orange-500/30";
  };

  if (isLoadingCars) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <p className="text-cyan-300 text-xl">Загрузка гаража...</p>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center px-8 py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent mb-3">
            МОЙ ГАРАЖ
          </h1>
          <p className="text-gray-300 text-lg mb-8">У вас пока нет автомобилей</p>
          <a
            href="/cars/market"
            className="inline-block px-8 py-3 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-lg border border-green-400/50 transition-colors"
          >
            Перейти на авторынок
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center px-8 py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent mb-3">
            МОЙ ГАРАЖ
          </h1>
          <p className="text-gray-300 text-lg">Ваши автомобили</p>
        </div>

        {/* Cars Table and Cards Container */}
        <div className="flex gap-8 w-full max-w-7xl h-[700px]">
          {/* Cars Table */}
          <div className="w-[480px] bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-cyan-500/30 rounded-lg p-4 flex flex-col h-full">
            <h2 className="text-lg font-bold text-cyan-200 mb-3">Ваши автомобили</h2>
            <div className="overflow-y-auto flex-1">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-slate-800/80 border-b border-cyan-500/30">
                  <tr>
                    <th className="text-left px-2 py-1.5 text-cyan-300 font-semibold">Модель</th>
                    <th className="text-left px-2 py-1.5 text-cyan-300 font-semibold">Год</th>
                    <th className="text-right px-2 py-1.5 text-cyan-300 font-semibold">Цена</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr
                      key={car.userCarId}
                      onClick={() => setSelectedCar(car)}
                      className={`cursor-pointer transition-all duration-200 border-b border-slate-600/50 hover:bg-slate-600/50 ${
                        selectedCar?.userCarId === car.userCarId ? "bg-cyan-500/30" : ""
                      }`}
                    >
                      <td className="px-2 py-2 text-white truncate max-w-[140px] font-medium">{getCarName(car)}</td>
                      <td className="px-2 py-2 text-gray-300 whitespace-nowrap">{car.year}</td>
                      <td className="px-2 py-2 text-green-400 font-semibold whitespace-nowrap text-right">${car.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Car Details Cards */}
          <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-4 h-full">
            {selectedCar && (
              <>
                {/* Main Car Card */}
                <div className="flex flex-col bg-gradient-to-br from-slate-700 to-slate-800 border border-cyan-500/50 rounded-lg p-6 flex-shrink-0 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-3xl font-bold text-cyan-200">{getCarName(selectedCar)}</h3>
                    <span className="text-5xl">🚗</span>
                  </div>

                  {/* Car Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={`bg-gradient-to-br ${getConditionBg(selectedCar.condition)} backdrop-blur-sm rounded-lg p-4 border`}>
                      <p className="text-gray-400 text-xs mb-1">Состояние</p>
                      <p className={`text-2xl font-bold ${getConditionColor(selectedCar.condition)}`}>
                        {selectedCar.condition}%
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
                      <p className="text-gray-400 text-xs mb-1">Год выпуска</p>
                      <p className="text-2xl font-bold text-blue-400">
                        {selectedCar.year}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900/50 to-slate-900/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/30">
                      <p className="text-gray-400 text-xs mb-1">Пробег</p>
                      <p className="text-2xl font-bold text-white">
                        {selectedCar.mileage.toLocaleString()} км
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
                      <p className="text-gray-400 text-xs mb-1">Рейтинг</p>
                      <p className="text-2xl font-bold text-purple-400">
                        ★ {(selectedCar.condition / 10).toFixed(1)}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900/50 to-slate-900/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/30">
                      <p className="text-gray-400 text-xs mb-1">Цвет</p>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full border border-gray-400"
                          style={{
                            backgroundColor:
                              selectedCar.color === "Silver"
                                ? "#C0C0C0"
                                : selectedCar.color === "Black"
                                ? "#000000"
                                : selectedCar.color === "Blue"
                                ? "#3B82F6"
                                : selectedCar.color === "White"
                                ? "#FFFFFF"
                                : selectedCar.color === "Red"
                                ? "#EF4444"
                                : selectedCar.color === "Pearl White"
                                ? "#F8F8FF"
                                : selectedCar.color === "Gray"
                                ? "#6B7280"
                                : selectedCar.color === "Platinum"
                                ? "#E5E4E2"
                                : selectedCar.color === "Yellow"
                                ? "#FCD34D"
                                : "#FB923C",
                          }}
                        ></span>
                        <span className="text-white font-medium">{selectedCar.color}</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 backdrop-blur-sm rounded-lg p-4 border border-green-500/30">
                      <p className="text-gray-400 text-xs mb-1">Цена</p>
                      <p className="text-2xl font-bold text-green-400">
                        ${selectedCar.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Sell Button */}
                  <button
                    disabled
                    className="w-full mt-auto px-6 py-3 rounded-lg font-bold text-white transition-colors duration-200 bg-orange-600/50 border border-orange-400/30 opacity-60 cursor-not-allowed"
                  >
                    Продать автомобиль (скоро)
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
