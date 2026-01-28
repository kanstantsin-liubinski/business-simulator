// This is a server component that initializes the scheduler on app startup
console.log("[SchedulerInit.tsx] File loaded");

import { initializeScheduler } from "lib/initScheduler";

// Initialize scheduler on module load
initializeScheduler();

export function SchedulerInit() {
  return null; // This component doesn't render anything
}
