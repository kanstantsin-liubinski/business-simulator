"use client";

import { useState } from "react";
import { useGameStore } from "store/game.store";

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
  const { money, subtractMoney } = useGameStore();
  const [selectedCar, setSelectedCar] = useState<Car | null>(cars[0]);
  const [showConfirm, setShowConfirm] = useState(false);

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

  const canBuy = money >= (selectedCar?.price || 0);

  const handleBuyCar = () => {
    if (selectedCar && canBuy) {
      subtractMoney(selectedCar.price);
      alert(`Поздравляем! Вы купили ${selectedCar.name} за $${selectedCar.price.toLocaleString()}`);
      setShowConfirm(false);
      setSelectedCar(null);
    }
  };

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
            АВТОМОБИЛЬНЫЙ РЫНОК
          </h1>
          <p className="text-gray-300 text-lg">Выберите автомобиль и совершите покупку</p>
        </div>

        {/* Cars Table and Cards Container */}
        <div className="flex gap-8 w-full max-w-7xl h-[700px]">
          {/* Cars Table */}
          <div className="w-[480px] bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-cyan-500/30 rounded-lg p-4 flex flex-col h-full">
            <h2 className="text-lg font-bold text-cyan-200 mb-3">Доступные автомобили</h2>
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
                      key={car.id}
                      onClick={() => setSelectedCar(car)}
                      className={`cursor-pointer transition-all duration-200 border-b border-slate-600/50 hover:bg-slate-600/50 ${
                        selectedCar?.id === car.id ? "bg-cyan-500/30" : ""
                      }`}
                    >
                      <td className="px-2 py-2 text-white truncate max-w-[140px] font-medium">{car.name}</td>
                      <td className="px-2 py-2 text-gray-300 whitespace-nowrap">{car.year}</td>
                      <td className="px-2 py-2 text-green-400 font-semibold whitespace-nowrap">${car.price.toLocaleString()}</td>
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
                    <h3 className="text-3xl font-bold text-cyan-200">{selectedCar.name}</h3>
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

                  {/* Buy Button */}
                  <button
                    onClick={() => setShowConfirm(true)}
                    disabled={!canBuy}
                    className={`w-full mt-auto px-6 py-3 rounded-lg font-bold text-white transition-colors duration-200 active:scale-95 cursor-pointer disabled:cursor-not-allowed ${
                      canBuy
                        ? "bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 border border-green-400/50 hover:border-green-300 shadow-lg shadow-green-500/20"
                        : "bg-gray-700 border border-gray-600 opacity-60"
                    }`}
                  >
                    {canBuy ? "Купить автомобиль" : "Недостаточно средств"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Purchase Confirmation Modal */}
      {showConfirm && selectedCar && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowConfirm(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-slate-700 to-slate-800 border border-cyan-500/50 rounded-lg p-8 max-w-md w-full z-50 shadow-2xl shadow-cyan-500/30">
            <h2 className="text-3xl font-bold text-cyan-200 mb-6">
              Подтверждение покупки
            </h2>
            
            <div className="mb-6 space-y-3 bg-slate-900/50 rounded-lg p-4 border border-slate-600/30">
              <div className="flex justify-between">
                <span className="text-gray-400">Автомобиль:</span>
                <span className="text-white font-semibold">{selectedCar.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Год:</span>
                <span className="text-white">{selectedCar.year}</span>
              </div>
              <div className="flex justify-between text-lg border-t border-slate-600 pt-3">
                <span className="text-gray-400">Цена:</span>
                <span className="text-green-400 font-bold">
                  ${selectedCar.price.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBuyCar}
                disabled={!canBuy}
                className="flex-1 px-6 py-3 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-lg border border-green-400/50 hover:border-green-300 disabled:border-gray-500 shadow-lg shadow-green-500/20 disabled:shadow-none transition-colors duration-200 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              >
                {canBuy ? "Подтвердить" : "Недостаточно средств"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-6 py-3 bg-slate-700 text-white border border-slate-500 hover:border-slate-400 hover:bg-slate-600 rounded-lg font-semibold transition-colors duration-200 active:scale-95 cursor-pointer"
              >
                Отмена
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
