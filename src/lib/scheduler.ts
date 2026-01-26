type Task = () => void | Promise<void>;

console.log("[scheduler.ts] File loaded - starting module initialization");

class FiveMinuteScheduler {
  private timeoutId: NodeJS.Timeout | null = null;
  private intervalId: NodeJS.Timeout | null = null;
  private started = false;
  private readonly intervalMs = 5 * 60 * 1000; // 5 minutes
  private tasks: Map<string, Task> = new Map();

  constructor() {
    console.log("[FiveMinuteScheduler] Instance created");
  }

  start() {
    if (this.started) {
      console.log("[Scheduler] Already started, skipping");
      return;
    }
    this.started = true;

    const now = Date.now();
    const nextTick = Math.ceil(now / this.intervalMs) * this.intervalMs;
    const delay = Math.max(0, nextTick - now);

    // First aligned tick
    this.timeoutId = setTimeout(async () => {
      await this.runTasks("first-aligned");
      // Subsequent aligned ticks
      this.intervalId = setInterval(() => {
        void this.runTasks("interval");
      }, this.intervalMs);
    }, delay);

    console.log(
      `[Scheduler] ✓ Started. First run in ${Math.round(delay / 1000)}s, then every 5 minutes.`
    );
  }

  stop() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.intervalId) clearInterval(this.intervalId);
    this.timeoutId = null;
    this.intervalId = null;
    this.started = false;
    console.log("[Scheduler] Stopped.");
  }

  addTask(name: string, task: Task) {
    this.tasks.set(name, task);
    console.log(`[Scheduler] Task registered: ${name}`);
  }

  removeTask(name: string) {
    this.tasks.delete(name);
    console.log(`[Scheduler] Task removed: ${name}`);
  }

  private async runTasks(trigger: "first-aligned" | "interval") {
    const currentTime = new Date().toLocaleTimeString("ru-RU");
    
    if (this.tasks.size === 0) {
      console.log(`[Scheduler] ✓ Tick @ ${currentTime} (${trigger}) - no tasks registered`);
      return;
    }

    console.log(
      `[Scheduler] ✓ Tick @ ${currentTime} (${trigger}). Running ${this.tasks.size} task(s)...`
    );
    for (const [name, task] of this.tasks.entries()) {
      const startedAt = Date.now();
      try {
        await task();
        console.log(
          `[Scheduler] ✓ Task '${name}' completed in ${Date.now() - startedAt}ms`
        );
      } catch (err) {
        console.error(`[Scheduler] ✗ Task '${name}' failed:`, err);
      }
    }
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __fiveMinuteScheduler: FiveMinuteScheduler | undefined;
}

const schedulerInstance = globalThis.__fiveMinuteScheduler ?? new FiveMinuteScheduler();
if (!globalThis.__fiveMinuteScheduler) {
  globalThis.__fiveMinuteScheduler = schedulerInstance;
}

console.log("[scheduler.ts] Module loaded, scheduler instance exported");

export const scheduler = schedulerInstance;

// Example: you can register tasks elsewhere like this:
// scheduler.addTask("update-prices", async () => { /* ... */ });
