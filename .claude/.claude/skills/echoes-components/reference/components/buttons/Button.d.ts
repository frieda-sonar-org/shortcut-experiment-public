import { MouseEvent, ReactNode } from '../../../node_modules/react';
import { ButtonAsLinkBaseProps, LinkPropsForbiddenForButton } from './ButtonAsLink';
import { ButtonBaseProps } from './ButtonTypes';
interface CommonProps {
    /**
     * The content to display inside the button.
     */
    children?: ReactNode;
    /**
     * Optional content to display before the button text (e.g., icons).
     */
    prefix?: ReactNode;
    /**
     * Optional content to display after the button text (e.g., icons).
     */
    suffix?: ReactNode;
}
export interface ButtonAsButtonProps extends CommonProps, ButtonBaseProps, LinkPropsForbiddenForButton {
}
interface ButtonAsLinkProps extends CommonProps, ButtonAsLinkBaseProps {
}
export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;
/**
 * Button component that can render as either an HTML button or anchor element.
 *
 * **Dual Rendering Mode**
 *
 * - Renders as `<button>` by default
 * - Renders as `<a>` when `to` prop is provided and button is not disabled
 * - Maintains consistent visual appearance regardless of underlying element
 *
 * **Button Varieties**
 *
 * - `default`: The "default" style is the go-to button.
 * - `primary`: Reserved for the main call-to-action. Should be used once per section.
 * - `danger`: Use it for actions that remove data and are not reversible.
 *
 * Use the **filled** variety for actions that are key to the user.
 * The **outlined** variety can be used multiple times for secondary actions.
 * The **ghost** variety is used in tertiary actions.
 */
export declare const Button: import('../../../node_modules/react').ForwardRefExoticComponent<ButtonProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
/**
 * Custom hook that creates a click handler with support for disabled state,
 * preventDefault, and stopPropagation behaviors.
 *
 * @param props - Configuration object containing click behavior options
 * @returns A memoized click handler function
 */
export declare function useButtonClickHandler(props: Pick<ButtonBaseProps, 'isDisabled' | 'enablePreventDefault' | 'enableStopPropagation'> & {
    onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => unknown;
}): (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
export {};
//# sourceMappingURL=Button.d.ts.map