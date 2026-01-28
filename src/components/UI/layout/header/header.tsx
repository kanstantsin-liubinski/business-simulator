"use client";

import { signOutFunc } from "actions/sign-out";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "store/auth.store";
import { useGameStore } from "store/game.store";
import GameButton from "components/UI/GameButton/GameButton";
import GameLink from "components/UI/GameLink/GameLink";

const BirdLogo = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bird body */}
    <circle cx="20" cy="22" r="8" fill="#FF6B6B" />
    {/* Bird head */}
    <circle cx="22" cy="14" r="6" fill="#FF8E72" />
    {/* Bird eye */}
    <circle cx="24" cy="13" r="1.5" fill="#000" />
    {/* Bird beak */}
    <path d="M26 13 L29 12 L26.5 14 Z" fill="#FFD93D" />
    {/* Left wing */}
    <path d="M14 20 Q8 18 10 25 Q14 24 16 22 Z" fill="#FF5252" />
    {/* Right wing */}
    <path d="M26 20 Q32 18 30 25 Q26 24 24 22 Z" fill="#FF8E72" />
    {/* Tail feathers */}
    <path d="M12 23 Q6 24 5 20 Q7 26 12 26 Z" fill="#FF6B6B" />
    <path d="M12 24 Q4 28 8 32 Q12 28 12 26 Z" fill="#FF5252" />
    {/* Legs */}
    <line
      x1="18"
      y1="30"
      x2="18"
      y2="35"
      stroke="#FFA500"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="22"
      y1="30"
      x2="22"
      y2="35"
      stroke="#FFA500"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Feet */}
    <path
      d="M18 35 L16 37 M18 35 L20 37 M18 35 L18 36.5"
      stroke="#FFA500"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <path
      d="M22 35 L20 37 M22 35 L24 37 M22 35 L22 36.5"
      stroke="#FFA500"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export default function Header() {
  const router = useRouter();
  const { setAuthState } = useAuthStore();
  const { money, monthlyIncome, setMoney, setMonthlyIncome } = useGameStore();

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        console.log("Header: Fetching user balance from /api/user...");
        const response = await fetch("/api/user");
        console.log("Header: User API response status:", response.status);
        if (response.ok) {
          const data = await response.json();
          console.log("Header: User data received:", data);
          setMoney(data.balance);
        } else {
          console.error("Header: Failed to fetch user data, status:", response.status);
        }
      } catch (err) {
        console.error("Header: Error fetching user balance:", err);
      }
    };

    const fetchRentalIncome = async () => {
      try {
        const response = await fetch("/api/cities");
        if (response.ok) {
          const citiesData = await response.json();
          
          // Calculate total daily rental income from rented properties
          let totalDailyIncome = 0;
          citiesData.forEach((city: any) => {
            city.properties.forEach((property: any) => {
              if (property.isRented) {
                totalDailyIncome += property.price * 0.0003; // 0.03% daily
              }
            });
          });
          
          setMonthlyIncome(Math.round(totalDailyIncome));
        }
      } catch (err) {
        console.error("Header: Error fetching rental income:", err);
      }
    };

    fetchUserBalance();
    fetchRentalIncome();
  }, [setMoney, setMonthlyIncome]);

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      console.error("Error signing out:", error);
    }

    setAuthState("unauthenticated", null);
    router.push("/sign-in");
  };

  return (
    <>
      <header className="w-full h-16 shadow-lg backdrop-blur-xl border-b border-white/20 flex justify-center items-center px-8 sticky top-0 z-40 relative" style={{background: "linear-gradient(to right, rgba(255,255,255,0.05) 0%, rgba(236,72,153,0.3) 50%, rgba(255,255,255,0.05) 100%)"}}>
        <div className="flex-1">
          <BirdLogo />
        </div>

        <Link href="/">
          <button className="w-auto h-14 relative font-semibold cursor-pointer transition-all duration-200 active:scale-95 overflow-hidden px-10 py-2 bg-slate-700 text-white border border-cyan-500/60 hover:border-cyan-400 hover:bg-slate-600 hover:shadow-lg hover:shadow-cyan-500/30 rounded-lg text-xl">
            🏠
          </button>
        </Link>

        <div className="flex-1 flex flex-end items-center gap-x-2">
          <div className="ml-auto px-4 py-2 bg-gradient-to-br from-slate-700 to-slate-800 border border-cyan-500/60 rounded-lg shadow-lg shadow-cyan-500/20 hover:border-cyan-400 hover:shadow-cyan-500/30 transition-all duration-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">💰</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                  Balance
                </span>
                <span className="text-base font-bold text-cyan-200">
                  ${money.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="px-4 py-2 bg-gradient-to-br from-slate-700 to-slate-800 border border-blue-500/60 rounded-lg shadow-lg shadow-blue-500/20 hover:border-blue-400 hover:shadow-blue-500/30 transition-all duration-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">📈</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                  Income
                </span>
                <span className="text-base font-bold text-blue-200">
                  ${monthlyIncome.toLocaleString()}/day
                </span>
              </div>
            </div>
          </div>

          <div>
            <GameButton
              className="h-14 w-auto"
              variant="danger"
              onClick={() => handleSignOut()}
            >
              SIGN OUT
            </GameButton>
          </div>
        </div>
      </header>
    </>
  );
}
