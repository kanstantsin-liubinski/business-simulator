export async function register() {
  console.log("[Instrumentation] register() called, NEXT_RUNTIME:", process.env.NEXT_RUNTIME);

  // Skip if running on Edge runtime (only run on Node.js)
  if (process.env.NEXT_RUNTIME === "edge") {
    console.log("[Instrumentation] Skipping: Edge runtime detected");
    return;
  }

  try {
    const { initializeScheduler } = await import("./src/lib/initScheduler");
    initializeScheduler();
    console.log("[Instrumentation] ✓ Scheduler initialized via instrumentation");
  } catch (error) {
    console.error("[Instrumentation] ✗ Failed to initialize scheduler:", error);
  }
}
