import { ComponentProps, JSX } from '../../../node_modules/react';
import { TextNodeOptional } from '../../types/utils';
import { FormFieldLabelProps } from './FormFieldLabel';
/**
 * Form fields wrap form controls and help create standardization between them.
 * They may have a label, a description, and validation.
 *
 * **Permitted Content**
 *
 * Exactly one from control element. The available form control elements are
 * `CheckboxGroup`, `RadioButtonGroup`, `Select`, `Textarea`, and `TextInput`.
 *
 * **Example**
 *
 * ```tsx
 * <FormField
 *   controlId="19ujfsyw"
 *   helpText="Please provide your full name"
 *   isRequired
 *   label="Full name"
 *   massageInvalid="Your name is required"
 *   validation="invalid">
 *   <TextInput id="19ujfsyw" required />
 * </FormField>
 * ```
 *
 * @internal
 */
export declare const FormField: import('../../../node_modules/react').ForwardRefExoticComponent<FormFieldProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
/**
 * Represents the validity state of a form field.
 */
export declare enum FormFieldValidation {
    /**
     * The form field has failed validation.
     */
    Invalid = "invalid",
    /**
     * The form field has not been explicitly validated (default).
     */
    None = "none",
    /**
     * The form field has been successfully validated.
     */
    Valid = "valid"
}
/**
 * The available width options for a form felid.
 */
export declare enum FormFieldWidth {
    Small = "small",
    Medium = "medium",
    Large = "large",
    Full = "full"
}
type WhiteListedProps = Pick<ComponentProps<'div'>, 'className'>;
export interface ValidationProps {
    /**
     * The message to display when the form field is invalid (optional).
     */
    messageInvalid?: TextNodeOptional;
    /**
     * The message to display when the form field is valid (optional).
     */
    messageValid?: TextNodeOptional;
    /**
     * The validation state of the form field (optional). The default is `none`,
     * meaning the form field has not been explicitly validated.
     */
    validation?: `${FormFieldValidation}`;
}
export interface FormFieldProps extends ValidationProps, WhiteListedProps {
    /**
     * The form control element. A form field should have exactly one form control.
     */
    children: JSX.Element;
    /**
     * The ID of the form control that this form field is associated with
     * (optional).
     */
    controlId?: string;
    /**
     * A descriptive message for the form field, provides more context about the input validation and criteria (optional).
     */
    helpText?: TextNodeOptional;
    /**
     * The ID of the description for the form field (optional). Useful for
     * establishing a relationship between a description and a form control using
     * the `aria-describedby` attribute.
     */
    helpTextId?: string;
    /**
     * When true, pointer events will be disabled on the label to prevent
     * activating the form control.
     */
    isDisabled?: boolean;
    /**
     * When true, an asterisk will be displayed next to the label to indicate that
     * the field is required.
     */
    isRequired?: FormFieldLabelProps['isRequired'];
    /**
     * The label for the form field (optional).
     */
    label?: FormFieldLabelProps['children'];
    /**
     * The ID of the label for the form field (optional).
     */
    labelId?: FormFieldLabelProps['id'];
    /**
     * The props for a help toggletip showing next to the form field label to provide additional information about the field (optional).
     */
    helpToggletipProps?: FormFieldLabelProps['helpToggletipProps'];
    /**
     * The ID of the validation message for the form field (optional). Useful for
     * establishing a relationship between a validation message and a form control
     * using the `aria-describedby` attribute.
     */
    validationMessageId?: string;
    /**
     * Controls the width of the form field (optional). The default value is
     * `full`, meaning it will take up the full width of its container.
     */
    width?: `${FormFieldWidth}`;
}
export {};
//# sourceMappingURL=FormField.d.ts.map