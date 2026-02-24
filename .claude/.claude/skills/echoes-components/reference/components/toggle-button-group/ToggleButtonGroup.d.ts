import { ReactNode } from '../../../node_modules/react';
interface ToggleOption {
    label: string;
    value: string;
    iconLeft?: ReactNode;
    suffix?: ReactNode;
}
export interface ToggleButtonGroupProps {
    /**
     * An array of toggle options to be displayed in the group.
     */
    options: ToggleOption[];
    className?: string;
    isDisabled?: boolean;
    /**
     * Callback function triggered when the selected value changes.
     * @param value - The newly selected value.
     */
    onChange: (value: string) => void;
    /**
     * The currently selected value in the toggle button group.
     */
    selected: string;
}
export declare const ToggleButtonGroup: import('../../../node_modules/react').ForwardRefExoticComponent<ToggleButtonGroupProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=ToggleButtonGroup.d.ts.map