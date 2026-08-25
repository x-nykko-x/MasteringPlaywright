export class RetryHelper {
  /**
   * Retry an async operation up to maxAttempts times
   * Waits delayMs between attempts
   */
  static async withRetry<T>(
    operation: () => Promise<T>,
    maxAttempts: number = 3,
    delayMs: number = 1000,
    context: string = "Operation",
  ): Promise<T> {
    let lastError: Error | unknown;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        console.warn(`[Retry] ${context} — Attempt ${attempt}/${maxAttempts} failed`);

        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
        }
      }
    }

    throw new Error(`[Retry] ${context} failed after ${maxAttempts} attempts: ${lastError}`);
  }

  /**
   * Retry with exponential backoff
   */
  static async withExponentialBackoff<T>(operation: () => Promise<T>, maxAttempts: number = 3): Promise<T> {
    return RetryHelper.withRetry(
      operation,
      maxAttempts,
      1000, // base delay — doubles each attempt
      "ExponentialBackoff",
    );
  }
}
