type UseFormFieldA11yInput = {
    /**
     * Explicitly set the `controlId` for the form field (optional).
     */
    controlId?: string;
    /**
     * Whether the form field has a help text (optional).
     */
    hasHelpText?: boolean;
    /**
     * Whether the form field has a validation message (optional).
     */
    hasValidationMessage?: boolean;
};
type UseFormFieldA11yOutput = {
    /**
     * The ID that should be used for the form control.
     */
    controlId: string;
    /**
     * The ID that should be used for the `aria-describedby` attribute.
     */
    describedBy: string | undefined;
    /**
     * The ID that should be used for the help text.
     */
    helpTextId: string;
    /**
     * The ID that should be used for the label.
     */
    labelId: string;
    /**
     * The ID that should be used for the validation message.
     */
    validationMessageId: string;
};
/**
 * This hook may be used to generate accessibility props for a form field.
 *
 * **Example**
 *
 * ```typescript
 * const {
 *   controlId,
 *   describedBy,
 *   helpTextId,
 *   labelId,
 *   validationMessageId
 * } = useFormFieldA11y()
 * ```
 */
export declare function useFormFieldA11y(input?: UseFormFieldA11yInput): UseFormFieldA11yOutput;
export {};
//# sourceMappingURL=useFormFieldA11y.d.ts.map