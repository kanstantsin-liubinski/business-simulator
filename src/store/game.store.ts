import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  money: number;
  monthlyIncome: number;
  setMoney: (amount: number) => void;
  addMoney: (amount: number) => void;
  subtractMoney: (amount: number) => void;
  setMonthlyIncome: (amount: number) => void;
  addMonthlyIncome: (amount: number) => void;
  subtractMonthlyIncome: (amount: number) => void;
  setUserBalance: (amount: number) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      money: 0,
      monthlyIncome: 0,
      setMoney: (amount) => set({ money: amount }),
      setUserBalance: (amount) => set({ money: amount }),
      addMoney: (amount) => set((state) => ({ money: state.money + amount })),
      subtractMoney: (amount) =>
        set((state) => ({ money: state.money - amount })),
      setMonthlyIncome: (amount) => set({ monthlyIncome: amount }),
      addMonthlyIncome: (amount) =>
        set((state) => ({ monthlyIncome: state.monthlyIncome + amount })),
      subtractMonthlyIncome: (amount) =>
        set((state) => ({ monthlyIncome: Math.max(0, state.monthlyIncome - amount) })),
    }),
    {
      name: "game-storage",
    }
  )
);
