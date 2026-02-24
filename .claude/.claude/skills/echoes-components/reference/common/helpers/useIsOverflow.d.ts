import { DependencyList, MutableRefObject } from '../../../node_modules/react';
/**
 * This hook checks if the content of a given ref is overflowing its container horizontally.
 * It returns a boolean indicating whether the content is overflowing.
 *
 * @param forwardedRef - The ref to check for overflow.
 * @param deps - Optional dependencies array to re-compute the overflow state.
 */
export declare function useIsOverflow(forwardedRef: MutableRefObject<HTMLElement | null>, deps?: DependencyList): readonly [boolean | undefined];
//# sourceMappingURL=useIsOverflow.d.ts.map