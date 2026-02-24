import { PropsWithLabelsAndHelpText } from '../../types/utils';
interface CheckboxPropsBase {
    /**
     * The checked state of the checkbox.
     * Can be `true` (checked), `false` (unchecked), or `'indeterminate'` (partially checked).
     */
    checked: boolean | 'indeterminate';
    /**
     * Additional CSS class name for the outer container (optional).
     */
    className?: string;
    /**
     * Whether the checkbox is in an error state (optional).
     * When true, displays error styling. Currently only supported for unchecked checkboxes.
     */
    hasError?: boolean;
    /**
     * Additional CSS class name for the inner container (optional).
     */
    innerClassName?: string;
    /**
     * Whether the checkbox is disabled (optional).
     */
    isDisabled?: boolean;
    /**
     * Whether the checkbox is in a loading state (optional).
     * When true, displays a spinner overlay and prevents interaction.
     */
    isLoading?: boolean;
    /**
     * Whether the checkbox is required (optional).
     * When true, displays a required indicator in the label.
     */
    isRequired?: boolean;
    /**
     * Callback function called when the checkbox state changes.
     * @param checked - The new checked state
     * @param id - The ID of the checkbox element
     */
    onCheck: (checked: boolean | 'indeterminate', id: string) => void;
    /**
     * Focus event handler (optional).
     */
    onFocus?: VoidFunction;
    /**
     * HTML title attribute for the checkbox (optional). Also used as the aria-label if not provided.
     */
    title?: string;
}
export type CheckboxProps = PropsWithLabelsAndHelpText<CheckboxPropsBase>;
/**
 * Checkbox component for selecting options with support for checked, unchecked, and indeterminate states.
 *
 * **States**
 *
 * - `checked`: Boolean true when the checkbox is selected
 * - `unchecked`: Boolean false when the checkbox is not selected
 * - `indeterminate`: String 'indeterminate' for partial selection (e.g., when some child items are selected)
 */
export declare const Checkbox: import('../../../node_modules/react').ForwardRefExoticComponent<CheckboxProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=Checkbox.d.ts.map