"use client";

import Link from "next/link";

interface GameCardProps {
  title: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}

const GameCard = ({ title, href, description, icon }: GameCardProps) => {
  return (
    <Link href={href}>
      <div className="relative group cursor-pointer h-56 overflow-hidden rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30">
        {/* Card background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-750 to-slate-800 border border-slate-600/50 group-hover:border-blue-500/70 transition-colors duration-300 rounded-lg"></div>

        {/* Colorful gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-blue-500 via-cyan-500 to-slate-800 transition-opacity duration-300"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="text-5xl">{icon}</div>
          <h2 className="text-4xl font-bold text-white group-hover:text-cyan-200 transition-colors duration-300">
            {title}
          </h2>
          <p className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Animated bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </Link>
  );
};

export default function CarsPage() {
  const cards = [
    {
      title: "Гараж",
      href: "/cars/garage",
      description: "Ваш личный гараж. Управляйте и кастомизируйте ваши автомобили.",
      icon: "🏠",
      featured: true,
    },
    {
      title: "Автосалон",
      href: "/cars/dealership",
      description: "Покупайте новые автомобили",
      icon: "🏪",
      featured: false,
    },
    {
      title: "Авторынок",
      href: "/cars/market",
      description: "Покупайте и продавайте б/у автомобили.",
      icon: "💰",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center px-8 py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-950/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-12 max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent mb-3">
            АВТОМОБИЛИ
          </h1>
          <p className="text-gray-300 text-lg">Выберите услугу и начните играть</p>
        </div>

        {/* Cards Grid - Equal size in row with Garage in center */}
        <div className="grid grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Автосалон - Left */}
          <GameCard 
            key={cards[1].href} 
            {...cards[1]}
          />
          
          {/* Гараж - Center */}
          <GameCard 
            key={cards[0].href} 
            {...cards[0]}
          />
          
          {/* Авторынок - Right */}
          <GameCard 
            key={cards[2].href} 
            {...cards[2]}
          />
        </div>
      </div>
    </div>
  );
}
