// This is a server component that initializes the scheduler on app startup
console.log("[SchedulerInit.tsx] File loaded");

import { scheduler } from "lib/scheduler";

export function SchedulerInit() {
  console.log("[SchedulerInit] Function called on server");
  
  // Use immediate execution to ensure logs appear
  (async () => {
    console.log("[SchedulerInit] Component mounted on server");
    console.log("[SchedulerInit] Attempting to start scheduler...");
    
    try {
      scheduler.start();
      
      // Add test task that runs immediately to verify scheduler works
      scheduler.addTask("test-startup", async () => {
        console.log("[Scheduler] ✓ Test task executed - scheduler is working!");
      });
      
      // Add default task: log current time every 5 minutes
      scheduler.addTask("log-time", async () => {
        const now = new Date();
        const timeString = now.toLocaleString("ru-RU");
        console.log(`[Scheduler Task] Current time: ${timeString}`);
      });
      
      console.log("[SchedulerInit] ✓ Scheduler started successfully");
    } catch (error) {
      console.error("[SchedulerInit] ✗ Failed to start scheduler:", error);
    }
  })();

  return null; // This component doesn't render anything
}
