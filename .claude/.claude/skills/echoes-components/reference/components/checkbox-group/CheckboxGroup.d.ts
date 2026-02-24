import { ReactNode, RefAttributes } from '../../../node_modules/react';
import { GroupAlignment } from '../../types/GroupAlignment';
import { PropsWithLabels, TextNodeOptional } from '../../types/utils';
import { CheckboxProps } from '../checkbox/Checkbox';
import { ValidationProps, FormFieldProps } from '../form/FormField';
/**
 * A checkbox group allows a user to select multiple items from a list of
 * options. A checkbox group must have at least one option.
 *
 * Each option must have a unique value. If an options's value is `undefined`,
 * then the option's label will be used as its value.
 *
 * The selected values may appear in any order. Equality is determined using
 * strict equality (`===`).
 *
 * The disabled state and error state will be applied to the entire group.
 * However, you may disabled individual checkboxes without disabling the group.
 *
 * > A checkbox group is a controlled element, it requires a `value` and
 * `onChange` handler.
 *
 * **Permitted Content**
 *
 * None; it's a self closing element.
 *
 * **Permitted Parents**
 *
 * Any element that accepts flow content.
 *
 * **Example**
 *
 * ```tsx
 * <CheckboxGroup
 *   label="Favorite colors"
 *   onChange={setFavoriteColors}
 *   options={[
 *     { label: 'Red' },
 *     { label: 'Green' },
 *     { label: 'Blue' },
 *   ]}
 *   value={favoriteColors}
 * />
 * ```
 */
export declare const CheckboxGroup: CheckboxGroup;
interface CheckboxGroup {
    <T>(props: CheckboxGroupProps<T>): ReactNode;
    displayName?: string;
}
type CheckboxOption<T = unknown> = Pick<CheckboxProps, 'helpText' | 'id' | 'isDisabled' | 'onFocus'> & {
    /**
     * The label displayed next to the checkbox.
     */
    label: string;
    /**
     * Explicitly set the value of the checkbox (optional). If not provided, the
     * label is used as the checkbox value.
     */
    value?: T;
};
type FormFieldPropsSubset = Pick<FormFieldProps, 'helpToggletipProps' | 'isRequired' | 'width'>;
interface CheckboxGroupPropsBase<T> extends RefAttributes<HTMLDivElement>, ValidationProps, FormFieldPropsSubset {
    /**
     * Controls the alignment of the checkboxes in the group (optional). The
     * default is `vertical`.
     */
    alignment?: `${GroupAlignment}`;
    /**
     * Add a `class` attribute to the root element (optional).
     */
    className?: string;
    /**
     * Optional text to display under the group
     */
    helpText?: TextNodeOptional;
    /**
     * The ID of the element with the role `group` (optional).
     */
    id?: string;
    /**
     * Prevent the user from interacting with the checkboxes (optional).
     */
    isDisabled?: boolean;
    /**
     * You may provide a name for the group that is used when submitting a form
     * (optional). The value of the field will be a comma separated list of the
     * selected values.
     *
     * If you need to control how the selected values are serialized, you can
     * provide a custom serializer using the `serializeValue` prop.
     */
    name?: string;
    /**
     * Called when the value of the group changes.
     */
    onChange(value: T[]): void;
    /**
     * Defines which checkboxes are available in the group. Each checkbox should
     * have a unique value.
     */
    options: [CheckboxOption<T>, ...CheckboxOption<T>[]];
    /**
     * Provide custom serialization for the selected values (optional). The
     * default behavior is to cast each value to a string.
     */
    serializeValue?: (value: T) => string;
    /**
     * An unordered list of the selected values. The value of each checkbox is
     * assumed to be unique.
     */
    value: T[];
}
export type CheckboxGroupProps<T = unknown> = PropsWithLabels<CheckboxGroupPropsBase<T>>;
export {};
//# sourceMappingURL=CheckboxGroup.d.ts.map