import { ForwardRefExoticComponent, MouseEventHandler, ReactNode } from '../../../../node_modules/react';
import { NavLinkBaseProps } from '../../../common/components/NavLinkBase';
import { TextNode } from '../../../types/utils';
import { IconFilledProps } from '../../icons';
export interface SidebarNavigationItemProps extends Pick<NavLinkBaseProps, 'isMatchingFullPath' | 'enableOpenInNewTab' | 'to'> {
    ariaLabel?: string;
    /**
     * The label of the SidebarNavigationItem.
     * It can be a string or a JSX.Element, in the case of a JSX.Element it should not be wrapped in
     * a `<Text>` component, the SidebarNavigationItem already handles the typography styling for you.
     */
    children: TextNode;
    className?: string;
    /**
     * Whether to hide the Icon when the sidebar is open.
     * The purpose is to have the icon appear only when the sidebar is not open, and for accordion child items only.
     */
    disableIconWhenSidebarOpen?: boolean;
    /**
     * Whether to display the tooltip on the item or not.
     * By default the tooltip is disabled, it should only be enabled if you expect the content to be ellipsed.
     */
    enableTooltip?: boolean;
    /**
     * Control whether the SidebarNavigationItem is active or not.
     * If true, the item will have a different style to indicate it is active.
     * If false it will override any default behavior and not indicate it is active.
     *
     * By default this behavior is handled by the underlying react-router's NavLink component,
     * overriding this is only needed for complex scenarios.
     */
    isActive?: boolean;
    /**
     * The onClick handler for the SidebarNavigationItem.
     */
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    /**
     * Optional content to display on the right. Typically badges and similar metadata.
     */
    suffix?: ReactNode;
    /**
     * The icon component to display at the start of the SidebarNavigationItem.
     * Must be an Echoes Icon component.
     */
    Icon: ForwardRefExoticComponent<IconFilledProps & React.RefAttributes<HTMLSpanElement>>;
}
export declare const SidebarNavigationItem: ForwardRefExoticComponent<SidebarNavigationItemProps & import('../../../../node_modules/react').RefAttributes<HTMLAnchorElement>>;
//# sourceMappingURL=SidebarNavigationItem.d.ts.map