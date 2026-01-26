"use client";

import { useState, useEffect } from "react";
import { useGameStore } from "store/game.store";

interface Property {
  id: string;
  name: string;
  price: number;
  description: string;
  x: number;
  y: number;
  type: string;
  ownerId: string | null;
}

interface City {
  name: string;
  image: string;
  properties: Property[];
}

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  userBalance: number;
  onBuy: (propertyId: string) => Promise<void>;
  isBuying: boolean;
  currentUserId: string | null;
}

const PropertyModal = ({ property, onClose, userBalance, onBuy, isBuying, currentUserId }: PropertyModalProps) => {
  if (!property) return null;

  const isOwned = !!property.ownerId;
  const isOwnedByCurrentUser = property.ownerId === currentUserId;
  const canBuy = !isOwned && userBalance >= property.price;

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

        <div className="bg-slate-900/50 rounded-lg p-4 mb-4 border border-cyan-500/30">
          <p className="text-gray-400 mb-2">Price</p>
          <p className="text-4xl font-bold text-cyan-300">
            ${property.price.toLocaleString()}
          </p>
        </div>

        {isOwnedByCurrentUser && (
          <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-3 mb-4">
            <p className="text-green-300 font-semibold text-center">✓ You own this property</p>
          </div>
        )}

        {isOwned && !isOwnedByCurrentUser && (
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 mb-4">
            <p className="text-red-300 font-semibold text-center">✗ Property already owned</p>
          </div>
        )}

        {!isOwned && (
          <div className="bg-slate-900/50 rounded-lg p-3 mb-4 border border-cyan-500/30">
            <p className="text-gray-400 text-sm">Your balance</p>
            <p className="text-xl font-bold text-cyan-300">
              ${userBalance.toLocaleString()}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          {!isOwned && (
            <button
              onClick={() => onBuy(property.id)}
              disabled={!canBuy || isBuying}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 active:scale-95 ${
                canBuy && !isBuying
                  ? "bg-green-600 text-white border border-green-400 hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/30"
                  : "bg-gray-600 text-gray-400 border border-gray-500 cursor-not-allowed opacity-50"
              }`}
            >
              {isBuying ? "Buying..." : canBuy ? "Buy" : "Insufficient Funds"}
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-slate-700 text-white border border-cyan-500/60 hover:border-cyan-400 hover:bg-slate-600 hover:shadow-lg hover:shadow-cyan-500/30 rounded-lg font-semibold transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default function RealEstatePage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isBuying, setIsBuying] = useState(false);
  const { money: userBalance, setMoney: setUserBalance } = useGameStore();

  // Загружаем города из БД
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/cities");
        
        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }
        
        const data = await response.json();
        setCities(data);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setError(err instanceof Error ? err.message : "Failed to load cities");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUserData = async () => {
      try {
        console.log("Fetching user data from /api/user...");
        const response = await fetch("/api/user");
        console.log("User API response status:", response.status);
        if (response.ok) {
          const data = await response.json();
          console.log("User data received:", data);
          setUserBalance(data.balance);
          setCurrentUserId(data.id);
        } else {
          console.error("Failed to fetch user data, status:", response.status);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchCities();
    fetchUserData();
  }, []);

  const handleBuyProperty = async (propertyId: string) => {
    try {
      setIsBuying(true);
      const response = await fetch("/api/buy-property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to buy property");
        return;
      }

      // Обновляем баланс
      setUserBalance(data.newBalance);

      // Обновляем список городов чтобы отразить изменение владельца
      const citiesResponse = await fetch("/api/cities");
      if (citiesResponse.ok) {
        const citiesData = await citiesResponse.json();
        setCities(citiesData);
      }

      setSelectedProperty(null);
      alert("Property purchased successfully!");
    } catch (err) {
      console.error("Error buying property:", err);
      alert("Failed to buy property");
    } finally {
      setIsBuying(false);
    }
  };

  const currentCity = cities[selectedCityIndex];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-300 text-lg">Loading cities...</p>
        </div>
      </div>
    );
  }

  if (error || cities.length === 0) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error || "No cities found"}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-cyan-500 text-slate-900 rounded-lg font-semibold hover:bg-cyan-400"
          >
            Retry
          </button>
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

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full px-4">
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

        {/* Properties Table and Map Container */}
        <div className="flex gap-8 w-full h-screen max-h-[calc(100vh-300px)]">
          {/* Properties Table */}
          <div className="w-[480px] bg-gradient-to-br from-slate-700 to-slate-800 border border-cyan-500/50 rounded-lg p-4 shadow-2xl shadow-cyan-500/20 h-full flex flex-col">
            <h2 className="text-lg font-bold text-cyan-200 mb-3">Properties List</h2>
            <div className="overflow-y-auto flex-1">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-slate-800/80 border-b border-cyan-500/30">
                  <tr>
                    <th className="text-left px-2 py-1.5 text-cyan-300 font-semibold">Name</th>
                    <th className="text-left px-2 py-1.5 text-cyan-300 font-semibold">Description</th>
                    <th className="text-left px-2 py-1.5 text-cyan-300 font-semibold">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCity.properties.map((property) => (
                    <tr
                      key={property.id}
                      onClick={() => setSelectedProperty(property)}
                      className={`cursor-pointer transition-all duration-200 border-b border-slate-600/50 hover:bg-slate-600/50 ${
                        selectedProperty?.id === property.id
                          ? "bg-cyan-500/30"
                          : ""
                      }`}
                    >
                      <td className="px-2 py-2 text-white truncate max-w-[140px]">{property.name}</td>
                      <td className="px-2 py-2 text-gray-300 truncate max-w-[120px]">{property.description}</td>
                      <td className="px-2 py-2 text-cyan-300 font-semibold whitespace-nowrap">${property.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Map */}
          <div
            className="flex-1 bg-cover bg-center border-2 border-cyan-500/50 rounded-lg relative overflow-hidden shadow-2xl shadow-cyan-500/20 h-full"
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
                className={`absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 active:scale-90 ${
                  selectedProperty?.id === property.id ? "scale-150" : ""
                }`}
                style={{
                  left: `${property.x}%`,
                  top: `${property.y}%`,
                }}
              >
                {/* Outer glow */}
                <div className={`absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl transition-all duration-200 ${
                  property.ownerId
                    ? selectedProperty?.id === property.id
                      ? "bg-red-500/70 scale-150"
                      : "bg-red-500/30 group-hover:bg-red-500/50"
                    : selectedProperty?.id === property.id
                      ? "bg-cyan-500/70 scale-150"
                      : "bg-cyan-500/30 group-hover:bg-cyan-500/50"
                }`}></div>

                {/* Marker circle */}
                <div className={`absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-200 ${
                  property.ownerId
                    ? `bg-gradient-to-br from-red-400 to-red-600 border-red-200 ${
                        selectedProperty?.id === property.id
                          ? "shadow-2xl shadow-red-500/80 scale-125"
                          : "shadow-lg shadow-red-500/50 group-hover:shadow-xl group-hover:shadow-red-500/70 group-hover:scale-125"
                      }`
                    : `bg-gradient-to-br from-cyan-400 to-cyan-600 border-cyan-200 ${
                        selectedProperty?.id === property.id
                          ? "shadow-2xl shadow-cyan-500/80 scale-125"
                          : "shadow-lg shadow-cyan-500/50 group-hover:shadow-xl group-hover:shadow-cyan-500/70 group-hover:scale-125"
                      }`
                }`}></div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-slate-900 border border-cyan-500 rounded px-3 py-2 whitespace-nowrap text-sm text-cyan-200 shadow-lg">
                    {property.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Properties count */}
        <div className="text-center text-gray-400">
          <p>
            Displaying {currentCity.properties.length} properties in {currentCity.name}. Click on any marker to view details.
          </p>
        </div>
      </div>

      {/* Modal */}
      <PropertyModal 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)}
        userBalance={userBalance}
        onBuy={handleBuyProperty}
        isBuying={isBuying}
        currentUserId={currentUserId}
      />
    </div>
  );
}
