import { scheduler } from "./scheduler";
import prisma from "utils/prisma";

let initialized = false;

export function initializeScheduler() {
  // Ensure we only initialize once
  if (initialized) {
    return;
  }
  
  initialized = true;
  
  scheduler.start();

  // Add test task that runs immediately to verify scheduler works
  scheduler.addTask("test-startup", async () => {
    console.log("[Scheduler] ✓ Test task executed - scheduler is working!");
  });

  // Add default task: log current time every 1 minute
  scheduler.addTask("log-time", async () => {
    const now = new Date();
    const timeString = now.toLocaleString("ru-RU");
    console.log(`[Scheduler Task] Current time: ${timeString}`);
  });

  // Add rental income distribution task
  scheduler.addTask("distribute-rental-income", async () => {
    try {
      // Find all rented properties
      const rentedProperties = await prisma.citiesEstateObject.findMany({
        where: { isRented: true },
        include: { owner: true },
      });

      if (rentedProperties.length === 0) {
        return;
      }

      // Distribute income to each rented property owner
      for (const property of rentedProperties) {
        if (!property.owner) continue;

        const dailyIncome = property.price * 0.0003; // 0.03% of property price

        // Update user balance
        await prisma.user.update({
          where: { id: property.owner.id },
          data: { balance: { increment: dailyIncome } },
        });
      }
    } catch (error) {
      console.error("[Scheduler Task] Error distributing rental income:", error);
    }
  });
}
