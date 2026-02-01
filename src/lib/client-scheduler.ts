import { SCHEDULER_INTERVAL_MS } from "lib/scheduler-config";

type ClientTask = () => void | Promise<void>;

console.log("[client-scheduler.ts] File loaded - starting module initialization");

class ClientScheduler {
  private timeoutId: NodeJS.Timeout | null = null;
  private intervalId: NodeJS.Timeout | null = null;
  private started = false;
  private readonly intervalMs = SCHEDULER_INTERVAL_MS;
  private tasks: Map<string, ClientTask> = new Map();

  constructor() {
    console.log("[ClientScheduler] Instance created");
  }

  start() {
    if (this.started) {
      console.log("[ClientScheduler] Already started, skipping");
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
      `[ClientScheduler] ✓ Started. First run in ${Math.round(delay / 1000)}s, then every 1 minute.`
    );
  }

  stop() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.intervalId) clearInterval(this.intervalId);
    this.timeoutId = null;
    this.intervalId = null;
    this.started = false;
    console.log("[ClientScheduler] Stopped.");
  }

  addTask(name: string, task: ClientTask) {
    this.tasks.set(name, task);
    console.log(`[ClientScheduler] Task registered: ${name}`);
  }

  removeTask(name: string) {
    this.tasks.delete(name);
    console.log(`[ClientScheduler] Task removed: ${name}`);
  }

  private async runTasks(trigger: "first-aligned" | "interval") {
    const currentTime = new Date().toLocaleTimeString("ru-RU");
    
    if (this.tasks.size === 0) {
      console.log(`[ClientScheduler] ✓ Tick @ ${currentTime} (${trigger}) - no tasks registered`);
      return;
    }

    console.log(
      `[ClientScheduler] ✓ Tick @ ${currentTime} (${trigger}). Running ${this.tasks.size} task(s)...`
    );
    for (const [name, task] of this.tasks.entries()) {
      const startedAt = Date.now();
      try {
        await task();
        console.log(
          `[ClientScheduler] ✓ Task '${name}' completed in ${Date.now() - startedAt}ms`
        );
      } catch (err) {
        console.error(`[ClientScheduler] ✗ Task '${name}' failed:`, err);
      }
    }
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __clientScheduler: ClientScheduler | undefined;
}

const schedulerInstance = globalThis.__clientScheduler ?? new ClientScheduler();
if (!globalThis.__clientScheduler) {
  globalThis.__clientScheduler = schedulerInstance;
}

console.log("[client-scheduler.ts] Module loaded, scheduler instance exported");

export const clientScheduler = schedulerInstance;
