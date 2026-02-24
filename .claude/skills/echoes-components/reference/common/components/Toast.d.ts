import { ReactNode } from '../../../node_modules/react';
import { TextNode, TextNodeOptional } from '../../types/utils';
/**
 * Represents the available visual varieties for toast notifications.
 */
export declare enum ToastVariety {
    /**
     * Used for error messages and critical alerts.
     */
    Danger = "danger",
    /**
     * Used for general information and neutral messages.
     */
    Info = "info",
    /**
     * Used for successful actions and positive confirmations.
     */
    Success = "success",
    /**
     * Used for cautionary messages and potential issues.
     */
    Warning = "warning"
}
/**
 * Unique identifier type for toast instances.
 */
export type ToastId = string | number;
/**
 * Parameters passed to toast action functions.
 */
interface ToastActionsParams {
    /**
     * The unique identifier of the toast.
     */
    id: ToastId;
    /**
     * Function to programmatically dismiss the toast, after clicking an action we should normally also dismiss the toast.
     */
    dismiss: VoidFunction;
}
export interface ToastProps {
    /**
     * Custom actions to display in the toast (optional). Receives the toast ID
     * and dismiss function as parameters. It should be either one or more Buttons or Links.
     * If provided, the toast should also have the `isDismissable` prop set to true and it's duration set to infinite.
     */
    actions?: ({ id, dismiss }: ToastActionsParams) => ReactNode;
    /**
     * The main message content of the toast.
     */
    description: TextNode;
    className?: string;
    /**
     * Unique identifier for the toast instance.
     */
    id: ToastId;
    /**
     * When true, displays a dismiss button allowing users to manually close the toast (optional).
     * It must be set to true if the duration of the toast is set to infinite though.
     * The default is false.
     */
    isDismissable?: boolean;
    /**
     * Optional prefix text for screen readers, providing additional context.
     * If not provided, a default message based on the toast variety will be used.
     */
    screenReaderPrefix?: string;
    /**
     * Optional title text displayed above the description.
     */
    title?: TextNodeOptional;
    /**
     * The visual style and semantic meaning of the toast (info, success, warning, or danger).
     */
    variety: `${ToastVariety}`;
}
/**
 * Toasts provide brief notifications about app processes at the bottom of the screen.
 * They inform users about ongoing actions or errors.
 *
 * **Permitted Content**
 *
 * A toast must have a description and variety. It may optionally have a title,
 * custom actions, and dismissible behavior.
 *
 * **Example**
 *
 * ```tsx
 * <Toast
 *   id="toast-1"
 *   variety={ToastVariety.Success}
 *   title="Success!"
 *   description="Your changes have been saved."
 *   isDismissable
 *   actions={({ dismiss }) => (
 *     <Button onClick={dismiss}>
 *       Undo
 *     </Button>
 *   )}
 * />
 * ```
 */
export declare const Toast: import('../../../node_modules/react').ForwardRefExoticComponent<Readonly<ToastProps> & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
export declare function ToastGlobalStyles(): import("@emotion/react/jsx-runtime").JSX.Element;
export declare namespace ToastGlobalStyles {
    var displayName: string;
}
export {};
//# sourceMappingURL=Toast.d.ts.map