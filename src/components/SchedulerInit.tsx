// This is a server component that initializes the scheduler on app startup
console.log("[SchedulerInit.tsx] File loaded");

import { initializeScheduler } from "lib/initScheduler";

export function SchedulerInit() {
  console.log("[SchedulerInit] Function called on server");
  
  // Use immediate execution to ensure logs appear
  (async () => {
    try {
      console.log("[SchedulerInit] Attempting to initialize scheduler...");
      initializeScheduler();
      console.log("[SchedulerInit] ✓ Scheduler initialized successfully");
    } catch (error) {
      console.error("[SchedulerInit] ✗ Failed to initialize scheduler:", error);
    }
  })();

  return null; // This component doesn't render anything
}
