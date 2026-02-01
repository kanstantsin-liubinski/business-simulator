/**
 * Scheduler interval in seconds
 * This constant is used by both server and client schedulers
 * Change this value to adjust the interval everywhere at once
 */
export const SCHEDULER_INTERVAL_SECONDS = 10;

/**
 * Scheduler interval in milliseconds
 */
export const SCHEDULER_INTERVAL_MS = SCHEDULER_INTERVAL_SECONDS * 1000;

/**
 * Safety timeout for income distribution
 * Slightly less than the interval to ensure it triggers before the next tick
 * Prevents deadlock if a task hangs or errors - forces flag reset
 */
export const INCOME_DISTRIBUTION_TIMEOUT_MS = SCHEDULER_INTERVAL_MS - 1000; // 1 second before next tick
