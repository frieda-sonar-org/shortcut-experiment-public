import { LinkBaseProps } from '../links/LinkTypes';
import { ButtonCommonProps, HTMLButtonAttributesSubset } from './ButtonTypes';
type LinkPropsSubset = Pick<LinkBaseProps, 'to' | 'download' | 'reloadDocument' | 'enableOpenInNewTab' | 'state'>;
export type LinkPropsForbiddenForButton = {
    [K in keyof LinkPropsSubset]?: never;
};
/**
 * Available visual style variants for buttons that render as links.
 * Limited to varieties that work well with navigation elements.
 */
export declare enum ButtonAsLinkVariety {
    /**
     * The "default" style is the go-to button.
     */
    Default = "default",
    /**
     * Minimal button with transparent background for tertiary actions.
     */
    DefaultGhost = "default-ghost",
    /**
     * Emphasized button for primary actions and call-to-action scenarios. Should be used once per section.
     */
    Primary = "primary",
    /**
     * Primary styling with transparent background for tertiary actions.
     */
    PrimaryGhost = "primary-ghost"
}
type ButtonPropsForbiddenForLink = {
    [K in keyof HTMLButtonAttributesSubset]?: never;
};
export interface ButtonAsLinkBaseProps extends ButtonCommonProps, LinkPropsSubset, ButtonPropsForbiddenForLink {
    /**
     * The visual style variant of the link button (optional).
     * Limited to varieties appropriate for navigation elements. Default is `default`.
     */
    variety?: `${ButtonAsLinkVariety}`;
}
export declare const ButtonAsLink: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
} & import('react-router-dom').LinkProps & import('../../../node_modules/react').RefAttributes<HTMLAnchorElement>, {}, {}>;
export declare const ButtonIconAsLink: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
} & import('react-router-dom').LinkProps & import('../../../node_modules/react').RefAttributes<HTMLAnchorElement>, {}, {}>;
export {};
//# sourceMappingURL=ButtonAsLink.d.ts.map