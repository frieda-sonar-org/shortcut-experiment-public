import { ButtonIconProps } from '../buttons/ButtonIcon';
import { ButtonBaseProps } from '../buttons/ButtonTypes';
import { IconFilledProps } from '../icons/IconWrapper';
export declare enum BadgeSeverityLevel {
    Blocker = "blocker",
    High = "high",
    Medium = "medium",
    Low = "low",
    Info = "info"
}
export declare enum BadgeSeverityVariety {
    Clickable = "clickable",
    Dropdown = "dropdown",
    Static = "static"
}
type excludedButtonProps = 'isLoading' | 'size' | 'variety' | 'isDisabled';
type InheritedButtonProps = Omit<ButtonBaseProps, excludedButtonProps> & Pick<ButtonIconProps, 'isIconFilled' | 'tooltipContent' | 'tooltipOptions'>;
export interface BadgeSeverityProps extends InheritedButtonProps {
    /**
     * Optional React component to render an icon on the left side of the badge.
     */
    IconLeft?: React.ForwardRefExoticComponent<IconFilledProps & React.RefAttributes<HTMLSpanElement>>;
    /**
     * The ARIA label for the button. Should include the quality & severity values.
     */
    ariaLabel: string;
    /**
     * Indicates whether the badge is in a loading state, which will replace the button's icon with the spinner
     */
    isLoading?: boolean;
    /**
     * Text content of the badge
     */
    quality: string;
    /**
     * Specifies the severity level of the badge, to style it accordingly.
     * Must match `BadgeSeverityLevel`.
     */
    severity: `${BadgeSeverityLevel}`;
    /**
     * The variety of the badge.
     */
    variety?: `${BadgeSeverityVariety}`;
}
/**
 * BadgeSeverity is a visual indicator used to quickly communicate an issue's categorizations and severity.
 * It can be used as a static badge, or clickable with a popover explaining the severity or as a dropdown
 * to change the severity of an issue.
 */
export declare const BadgeSeverity: import('../../../node_modules/react').ForwardRefExoticComponent<BadgeSeverityProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=BadgeSeverity.d.ts.map