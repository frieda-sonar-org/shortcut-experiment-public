import { ComponentPropsWithoutRef, ForwardRefExoticComponent } from '../../../node_modules/react';
import { IconFilledProps } from '../icons/IconWrapper';
import { Tooltip } from '../tooltip';
import { ButtonAsLinkBaseProps, LinkPropsForbiddenForButton } from './ButtonAsLink';
import { ButtonBaseProps } from './ButtonTypes';
type TooltipProps = ComponentPropsWithoutRef<typeof Tooltip>;
type TooltipOptions = Omit<TooltipProps, 'children' | 'content' | 'key'>;
interface CommonProps {
    /**
     * The icon component to display inside the button.
     * Must be an Echoes Icon component.
     */
    Icon: ForwardRefExoticComponent<IconFilledProps & React.RefAttributes<HTMLSpanElement>>;
    /**
     * Whether the icon should be displayed in its filled variant (optional).
     * Default is false, showing the outline version of the icon.
     */
    isIconFilled?: IconFilledProps['isFilled'];
    /**
     * Content to display in the tooltip of the button (optional).
     * Defaults to the ariaLabel value if not provided.
     */
    tooltipContent?: TooltipProps['content'];
    /**
     * Additional configuration options for the tooltip (optional).
     * Excludes properties that are managed internally by the ButtonIcon.
     */
    tooltipOptions?: TooltipOptions;
}
export interface ButtonIconAsButtonProps extends CommonProps, ButtonBaseProps, LinkPropsForbiddenForButton {
    /**
     * Accessible label for screen readers (required).
     * Since icon buttons have no visible text, this is essential for accessibility.
     */
    ariaLabel: string;
}
interface ButtonIconAsLinkProps extends CommonProps, ButtonAsLinkBaseProps {
    /**
     * Accessible label for screen readers (required).
     * Since icon buttons have no visible text, this is essential for accessibility.
     */
    ariaLabel: string;
}
export type ButtonIconProps = ButtonIconAsButtonProps | ButtonIconAsLinkProps;
/**
 * A compact button component that displays only an icon with integrated tooltip support.
 *
 * The ButtonIcon component provides a space-efficient alternative to regular buttons
 * when screen real estate is limited or when the action can be clearly communicated
 * through iconography alone. It automatically includes tooltip functionality to ensure
 * users understand the button's purpose, and like the regular Button component, it can
 * render as either an HTML button or anchor element based on the provided properties.
 *
 * **Dual Rendering Mode**
 *
 * - Renders as `<button>` for actions and form interactions
 * - Renders as `<a>` when `to` prop is provided and button is not disabled
 * - Maintains consistent visual appearance regardless of underlying element
 *
 * **Icon Support**
 *
 * - Accepts any Icon component from the Echoes design system
 * - Accepts the component itself and not an instance of it nor a JSX element
 * - Icons are automatically sized and positioned within the button
 * - Loading states replace the icon with a spinner while maintaining layout
 *
 * **Accessibility**
 *
 * Since icon buttons lack visible text, accessibility is critical:
 * - The `ariaLabel` prop is required and provides screen reader context
 * - Tooltips are automatically enabled to help sighted users
 * - Tooltip content defaults to the aria-label but can be customized
 */
export declare const ButtonIcon: ForwardRefExoticComponent<ButtonIconProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
export {};
//# sourceMappingURL=ButtonIcon.d.ts.map