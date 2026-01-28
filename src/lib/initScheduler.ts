import { scheduler } from "./scheduler";

let initialized = false;

export function initializeScheduler() {
  // Ensure we only initialize once
  if (initialized) {
    console.log("[initScheduler] Already initialized, skipping");
    return;
  }
  
  initialized = true;
  
  console.log("[initScheduler] Initializing scheduler");
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

  console.log("[initScheduler] ✓ Scheduler initialized successfully");
}
