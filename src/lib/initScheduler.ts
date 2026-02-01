import { scheduler } from "./scheduler";
import { INCOME_DISTRIBUTION_TIMEOUT_MS } from "./scheduler-config";
import prisma from "utils/prisma";

// Use global to preserve state across HMR
declare global {
  // eslint-disable-next-line no-var
  var __schedulerTasksInitialized: boolean | undefined;
  var __incomeDistributionInProgress: boolean | undefined;
  var __incomeDistributionTimeout: NodeJS.Timeout | null | undefined;
}

// Auto-reset the flag if it's stuck for more than the timeout
function resetIncomeDistributionFlag() {
  globalThis.__incomeDistributionInProgress = false;
  console.warn("[Scheduler Task] ⚠️ Income distribution flag was forcefully reset (task took too long or crashed)");
  globalThis.__incomeDistributionTimeout = null;
}

export function initializeScheduler() {
  // Start scheduler (it won't start twice thanks to its internal logic)
  scheduler.start();

  // Register tasks only once to avoid duplicates after HMR
  if (!globalThis.__schedulerTasksInitialized) {
    globalThis.__schedulerTasksInitialized = true;
    console.log("[initScheduler] Registering scheduler tasks for the first time");
  } else {
    console.log("[initScheduler] Tasks already registered, checking scheduler state...");
  }

  // Always ensure these tasks exist (they're safe to re-add due to the addTask deduplication)
  
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
    // Skip if already distributing income (prevent race conditions)
    if (globalThis.__incomeDistributionInProgress) {
      console.log("[Scheduler Task] ⏭️ Income distribution already in progress, skipping this tick");
      return;
    }

    globalThis.__incomeDistributionInProgress = true;
    const startTime = Date.now();
    
    // Set a safety timeout to reset the flag if something goes wrong
    if (globalThis.__incomeDistributionTimeout) {
      clearTimeout(globalThis.__incomeDistributionTimeout);
    }
    globalThis.__incomeDistributionTimeout = setTimeout(() => {
      resetIncomeDistributionFlag();
    }, INCOME_DISTRIBUTION_TIMEOUT_MS);

    try {
      // Find all rented properties with owner info
      const rentedProperties = await prisma.citiesEstateObject.findMany({
        where: { isRented: true },
        include: { owner: true },
      });

      console.log(`[Scheduler Task] Found ${rentedProperties.length} rented properties`);

      if (rentedProperties.length === 0) {
        console.log("[Scheduler Task] No rented properties found");
        return;
      }

      // Group properties by owner to reduce DB calls
      const incomeByOwner = new Map<string, number>();
      
      for (const property of rentedProperties) {
        if (!property.owner) {
          console.warn(`[Scheduler Task] ⚠️ Property ${property.id} has no owner`);
          continue;
        }

        const dailyIncome = property.price * 0.0003; // 0.03% of property price
        const currentIncome = incomeByOwner.get(property.owner.id) || 0;
        incomeByOwner.set(property.owner.id, currentIncome + dailyIncome);
      }

      // Update user balances in batch
      let successCount = 0;
      for (const [ownerId, totalIncome] of incomeByOwner.entries()) {
        try {
          await prisma.user.update({
            where: { id: ownerId },
            data: { balance: { increment: totalIncome } },
          });
          successCount++;
          console.log(`[Scheduler Task] ✓ Added ${Math.round(totalIncome)} to user ${ownerId}`);
        } catch (updateError) {
          console.error(`[Scheduler Task] ✗ Failed to update balance for user ${ownerId}:`, updateError);
        }
      }

      const duration = Date.now() - startTime;
      console.log(`[Scheduler Task] ✓ Income distribution completed in ${duration}ms. Updated ${successCount}/${incomeByOwner.size} users`);
    } catch (error) {
      console.error("[Scheduler Task] ✗ Error distributing rental income:", error);
    } finally {
      // Clear the safety timeout if it was set
      if (globalThis.__incomeDistributionTimeout) {
        clearTimeout(globalThis.__incomeDistributionTimeout);
        globalThis.__incomeDistributionTimeout = null;
      }
      globalThis.__incomeDistributionInProgress = false;
    }
  });
}
