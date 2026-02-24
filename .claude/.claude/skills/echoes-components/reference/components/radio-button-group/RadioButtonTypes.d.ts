import { ReactNode } from '../../../node_modules/react';
import { GroupAlignment } from '../../types/GroupAlignment';
import { TextNodeOptional } from '../../types/utils';
import { FormFieldProps, ValidationProps } from '../form/FormField';
type FormFieldPropsSubset = Pick<FormFieldProps, 'helpToggletipProps' | 'width'>;
export interface RadioButtonGroupProps extends ValidationProps, FormFieldPropsSubset {
    /**
     * Callback fired when the selected radio button changes.
     *
     * @param value - The value of the newly selected radio button.
     */
    onChange?: (value: string) => void;
    /**
     * Array of options to display as radio buttons.
     */
    options: RadioOption[];
    /**
     * Defines if the buttons are displayed vertically or horizontally.
     * (default is vertical)
     */
    alignment?: `${GroupAlignment}`;
    /**
     * Additional CSS class names to apply to the group.
     */
    className?: string;
    /**
     * The default selected value (uncontrolled).
     */
    defaultValue?: string;
    /**
     * Optional text to display under the group
     */
    helpText?: TextNodeOptional;
    /**
     * The unique identifier for the radio button group.
     */
    id?: string;
    /**
     * Whether the radio button group is disabled.
     */
    isDisabled?: boolean;
    /**
     * Whether selection is required.
     */
    isRequired?: boolean;
    /**
     * The currently selected value (controlled).
     */
    value?: string;
}
/** If label is a ReactNode, ariaLabel is required for accessibility. */
export type RadioOption = {
    /** Optional help text displayed under the option's label. */
    helpText?: ReactNode;
    /** Whether the option is disabled. */
    isDisabled?: boolean;
    /** The unique value associated with this option. */
    value: string;
} & ({
    ariaLabel: string;
    label: ReactNode;
} | {
    ariaLabel?: string;
    label: string;
});
export {};
//# sourceMappingURL=RadioButtonTypes.d.ts.map