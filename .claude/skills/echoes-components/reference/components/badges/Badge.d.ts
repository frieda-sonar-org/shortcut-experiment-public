import { PropsWithChildren } from '../../../node_modules/react';
import { IconFilledProps } from '../icons/IconWrapper';
export declare enum BadgeSize {
    Small = "small",
    Medium = "medium"
}
export declare enum BadgeVariety {
    Danger = "danger",
    Highlight = "highlight",
    Info = "info",
    Neutral = "neutral",
    Success = "success",
    Warning = "warning"
}
export interface BadgeProps extends PropsWithChildren {
    /**
     * Optional icon component to render on the left side of the badge.
     */
    IconLeft?: React.ForwardRefExoticComponent<IconFilledProps & React.RefAttributes<HTMLSpanElement>>;
    /**
     * ARIA label for accessibility purposes. Provides a textual description of the badge.
     */
    ariaLabel?: string;
    className?: string;
    /**
     * Indicates whether the badge should use high-contrast styling for better visibility.
     */
    isHighContrast?: boolean;
    /**
     * Determines whether the icon (if provided) should be rendered in a filled style.
     */
    isIconFilled?: boolean;
    /**
     * Changes the badge into a button to allow interactivity (for a Popover, typically)
     */
    isInteractive?: boolean;
    /**
     * Specifies the size of the badge. Must match `BadgeSize`.
     */
    size?: `${BadgeSize}`;
    /**
     * Specifies the style of the badge. Must match `BadgeVariety`.
     */
    variety: `${BadgeVariety}`;
}
/**
 * Badge is used to highlight metadata and pieces of information associated with another element.
 * Can be used as a static badge or interactive with a popover that explains the badge's meaning.
 */
export declare const Badge: import('../../../node_modules/react').ForwardRefExoticComponent<BadgeProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Badge.d.ts.map