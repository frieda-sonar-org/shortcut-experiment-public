import { Ref } from '../../node_modules/react';
import { ToastId, ToastProps } from '../common/components/Toast';
export { ToastVariety } from '../common/components/Toast';
/**
 * Represents the available duration options for toast notifications.
 */
export declare enum ToastDuration {
    /**
     * Short duration for toasts with only 1 line of text (8 seconds).
     */
    Short = "short",
    /**
     * Medium duration for toasts with 2 lines of text (16 seconds) - default duration.
     */
    Medium = "medium",
    /**
     * Long duration for toasts with 3 lines of text (24 seconds).
     */
    Long = "long",
    /**
     * Infinite duration toast that remains visible until manually dismissed.
     * Mandatory when the toast has actions.
     */
    Infinite = "infinite"
}
export interface ToastParams extends Omit<ToastProps, 'id'> {
    /**
     * Optional unique identifier for the toast. If not provided, one will be generated automatically.
     * This ID is used to manage the toast's lifecycle, such as dismissing it manually or modifying it.
     * Using the same ID for multiple toast call will update the existing toast instead of creating a new one.
     */
    id?: ToastId;
    /**
     * How long the toast should remain visible (optional). The default is `medium`.
     * Note: Toasts with actions must use infinite duration.
     */
    duration?: `${ToastDuration}`;
    /**
     * Callback function executed when the toast auto-closes due reaching the end of its duration (optional).
     */
    onAutoClose?: VoidFunction;
    /**
     * Callback function executed when the toast is manually dismissed (optional).
     */
    onDismiss?: VoidFunction;
}
type ToastShortcutParams = Omit<ToastParams, 'variety'>;
type ToastFn = {
    <T extends ToastParams>(params: TypeGuardValidToastParams<T>): ToastId;
    /**
     * Creates a success toast notification.
     * @param params - {@link ToastParams | Toast configuration object} (variety automatically set to 'success')
     * @param ref - Optional React ref for the toast element
     * @returns The unique identifier of the created toast
     */
    success: <T extends ToastShortcutParams>(params: TypeGuardValidToastParams<T>, ref?: Ref<HTMLDivElement>) => ToastId;
    /**
     * Creates an error toast notification.
     * @param params - {@link ToastParams | Toast configuration object} (variety automatically set to 'danger')
     * @param ref - Optional React ref for the toast element
     * @returns The unique identifier of the created toast
     */
    error: <T extends ToastShortcutParams>(params: TypeGuardValidToastParams<T>, ref?: Ref<HTMLDivElement>) => ToastId;
    /**
     * Creates an info toast notification.
     * @param params - {@link ToastParams | Toast configuration object} (variety automatically set to 'info')
     * @param ref - Optional React ref for the toast element
     * @returns The unique identifier of the created toast
     */
    info: <T extends ToastShortcutParams>(params: TypeGuardValidToastParams<T>, ref?: Ref<HTMLDivElement>) => ToastId;
    /**
     * Creates a warning toast notification.
     * @param params - {@link ToastParams | Toast configuration object} (variety automatically set to 'warning')
     * @param ref - Optional React ref for the toast element
     * @returns The unique identifier of the created toast
     */
    warning: <T extends ToastShortcutParams>(params: TypeGuardValidToastParams<T>, ref?: Ref<HTMLDivElement>) => ToastId;
    /**
     * Dismisses a toast notification by its ID.
     * @param id - The unique identifier of the toast to dismiss
     */
    dismiss: (id: ToastId) => void;
};
/**
 * Toast utility for creating and managing toast notifications.
 *
 * @param params - {@link ToastParams | Toast configuration object} (variety automatically set to 'success')
 * @param ref - Optional React ref for the toast element
 * @returns The unique identifier of the created toast
 *
 * **Updating a toast**
 *
 * It's possible to update an existing toast with new texts, new variety, etc, by just calling the
 * `toast` function again with the same ID.
 *
 * **Important Rules**
 *
 * - Toasts with actions must be dismissible and have infinite duration
 * - Infinite duration toasts must be dismissible
 *
 * **Basic Usage**
 *
 * ```tsx
 * // Toast
 * const id = toast({
 *   variety: ToastVariety.Success,
 *   description: "Operation completed successfully"
 * });
 *
 * // Variety shortcuts
 * toast.success({ description: "File saved!" });
 * toast.error({ description: "Failed to save file" });
 * toast.info({ description: "New update available" });
 * toast.warning({ description: "Storage space is low" });
 *
 * // With actions
 * toast.success({
 *   title: "File uploaded",
 *   description: "Your file has been uploaded successfully.",
 *   isDismissable: true,
 *   duration: ToastDuration.Infinite,
 *   actions: ({ dismiss }) => (
 *     <Button onClick={dismiss}>
 *       View File
 *     </Button>
 *   )
 * });
 *
 * // Manual dismiss of a toast using its ID
 * toast.dismiss(id);
 * ```
 */
export declare const toast: ToastFn;
type InvalidToastActionNoDismissable = {
    actions: Required<ToastParams['actions']>;
    isDismissable?: false;
};
type InvalidToastActionNoInfinite = {
    actions: Required<ToastParams['actions']>;
    duration?: `${Exclude<ToastDuration, ToastDuration.Infinite>}`;
};
type InvalidToastInfiniteNoDismissable = {
    duration: ToastDuration.Infinite;
    isDismissable?: false;
};
/**
 * Compile-time type guard that enforces toast parameter validation rules, and displays human
 * readable error messages when we don't follow the rules.
 */
type TypeGuardValidToastParams<T extends ToastShortcutParams> = T extends InvalidToastActionNoDismissable ? '🚨 A toast with the `actions` param must also have the `isDismissable` param set to `true`' : T extends InvalidToastActionNoInfinite ? '🚨 A toast with the `actions` param must also have the `duration` param set to `infinite`' : T extends InvalidToastInfiniteNoDismissable ? '🚨 A toast with the `duration` param set to `infinite` must also have the `isDismissable` param set to `true`' : T;
//# sourceMappingURL=toasts.d.ts.map