import { TextNodeOptional } from '../../types/utils';
import { ToggleTipProps } from '../toggle-tip';
export interface FormFieldLabelProps {
    children?: TextNodeOptional;
    /**
     * The ID of the form control that this label is associated with.
     */
    htmlFor?: string;
    /**
     * The ID of the label (optional).
     */
    id?: string;
    /**
     * When true, the label will not be clickable.
     */
    isDisabled?: boolean;
    /**
     * When true, will display an asterisk to indicate that the field is required.
     */
    isRequired?: boolean;
    /**
     * The props for a help toggletip showing next to the form field label to provide additional information about the field (optional).
     */
    helpToggletipProps?: ToggleTipProps;
}
/**
 * A form field may have a label that appears above the form control.
 *
 * **Permitted Parents**
 *
 * `FormField`
 *
 * **Permitted Content**
 *
 * Any phrasing content.
 *
 * @internal
 */
export declare const FormFieldLabel: import('../../../node_modules/react').ForwardRefExoticComponent<FormFieldLabelProps & import('../../../node_modules/react').RefAttributes<HTMLLabelElement>>;
//# sourceMappingURL=FormFieldLabel.d.ts.map