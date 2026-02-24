export declare const THROTTLE_SHORT_DELAY = 10;
export declare const THROTTLE_LONG_DELAY = 100;
/**
 * Throttle a function to ensure it is not called more than once during the specified delay.
 * @param callback The function to throttle.
 * @param delay The time in milliseconds to wait before allowing the next call.
 * @returns A throttled version of the callback function.
 */
export declare function throttle<T extends unknown[]>(callback: (...args: T) => void, delay: number): (...args: T) => void;
//# sourceMappingURL=utils.d.ts.map