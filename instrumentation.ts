export async function register() {
  console.log("[Instrumentation] register() called, NEXT_RUNTIME:", process.env.NEXT_RUNTIME);

  // Skip if running on Edge runtime (only run on Node.js)
  if (process.env.NEXT_RUNTIME === "edge") {
    console.log("[Instrumentation] Skipping: Edge runtime detected");
    return;
  }

  try {
    const { scheduler } = await import("./src/lib/scheduler");

    // Start the 5-minute aligned scheduler
    console.log("[Instrumentation] Starting scheduler...");
    scheduler.start();

    // Example placeholder task registration. Commented out by default.
    // You can uncomment and implement your DB updates here or from any server module:
    // scheduler.addTask("update-prices", async () => {
    //   const { default: prisma } = await import("./src/utils/prisma");
    //   // ... perform batched updates
    // });

    console.log("[Instrumentation] ✓ Server scheduler initialized successfully");
  } catch (error) {
    console.error("[Instrumentation] ✗ Failed to initialize scheduler:", error);
  }
}
