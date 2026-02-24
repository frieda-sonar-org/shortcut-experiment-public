import { ForwardedRef } from '../../../node_modules/react';
/**
 * This hook may be used to intercept a forwarded ref, providing a local ref
 * that can be used in the component.
 * It stores the ref in a state to ensure the component is re-rendered when the ref changes.
 *
 * **Example**
 *
 * ```typescript
 * const Input = forwardRef<HTMLInputElement>((props, forwardedRef) => {
 *   const [ref, setRef] = useForwardedRefWithState(forwardedRef);
 *   return <input ref={setRef} />
 * });
 * ```
 */
export declare function useForwardedRefWithState<T>(forwardedRef: ForwardedRef<T>): readonly [T | null, (element: T | null) => void];
/**
 * This hook may be used to intercept a forwarded ref, providing a local ref
 * that can be used in the component.
 * It uses a real ref, so the component won't be re-rendered when the ref changes.
 *
 * **Example**
 *
 * ```typescript
 * const Input = forwardRef<HTMLInputElement>((props, forwardedRef) => {
 *   const [ref, setRef] = useForwardedRef(forwardedRef);
 *   return <input ref={setRef} />
 * });
 * ```
 */
export declare function useForwardedRef<T>(forwardedRef: ForwardedRef<T>): readonly [import('../../../node_modules/react').MutableRefObject<T | null>, (element: T | null) => void];
//# sourceMappingURL=useForwardedRef.d.ts.map