"use client";

import { useEffect } from "react";
import { clientScheduler } from "lib/client-scheduler";
import { useGameStore } from "store/game.store";

console.log("[ClientSchedulerInit.tsx] File loaded");

export function ClientSchedulerInit() {
  const { setMoney, setMonthlyIncome } = useGameStore();

  useEffect(() => {
    console.log("[ClientSchedulerInit] Component mounted, initializing scheduler");
    
    // Start the scheduler
    clientScheduler.start();

    // Add task to sync user balance and rental income from server
    clientScheduler.addTask("sync-user-data", async () => {
      try {
        console.log("[ClientScheduler] Syncing user data...");
        
        // Fetch user balance
        const userResponse = await fetch("/api/user");
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setMoney(userData.balance);
          console.log("[ClientScheduler] ✓ Balance synced:", userData.balance);
        }

        // Fetch and calculate rental income
        const citiesResponse = await fetch("/api/cities");
        if (citiesResponse.ok) {
          const citiesData = await citiesResponse.json();
          
          let totalDailyIncome = 0;
          citiesData.forEach((city: any) => {
            city.properties.forEach((property: any) => {
              if (property.isRented) {
                totalDailyIncome += property.price * 0.0003; // 0.03% daily
              }
            });
          });
          
          setMonthlyIncome(Math.round(totalDailyIncome));
          console.log("[ClientScheduler] ✓ Rental income synced:", Math.round(totalDailyIncome));
        }
      } catch (error) {
        console.error("[ClientScheduler] ✗ Error syncing data:", error);
      }
    });

    console.log("[ClientSchedulerInit] ✓ Scheduler initialized successfully");

    return () => {
      console.log("[ClientSchedulerInit] Component unmounted, stopping scheduler");
      clientScheduler.stop();
    };
  }, [setMoney, setMonthlyIncome]);

  return null;
}
