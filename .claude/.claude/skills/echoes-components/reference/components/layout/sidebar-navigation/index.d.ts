import { SidebarNavigationBody } from './SidebarNavigationBody';
export { type SidebarNavigationProps } from './SidebarNavigation';
export { type SidebarNavigationAccordionItemProps } from './SidebarNavigationAccordionItem';
export { type SidebarNavigationGroupProps } from './SidebarNavigationGroup';
export { type SidebarNavigationHeaderProps } from './SidebarNavigationHeader';
export { type SidebarNavigationItemProps } from './SidebarNavigationItem';
export declare const SidebarNavigation: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./SidebarNavigation').SidebarNavigationProps & {
    children?: import('../../../../node_modules/react').ReactNode | undefined;
} & import('../../../../node_modules/react').RefAttributes<HTMLDivElement>> & {
    /**
     * {@link SidebarNavigationAccordionItem | AccordionItem} provides expandable navigation sections
     * with collapsible sub-items. Ideal for organizing related navigation items.
     *
     * ```tsx
     * <SidebarNavigation.AccordionItem Icon={SecurityIcon} label="Security">
     *   <SidebarNavigation.Item to="/security/hotspots">
     *     Security Hotspots
     *   </SidebarNavigation.Item>
     * </SidebarNavigation.AccordionItem>
     * ```
     */
    AccordionItem: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./SidebarNavigationAccordionItem').SidebarNavigationAccordionItemProps & import('../../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    /**
     * {@link SidebarNavigationBody | Body} provides the main scrollable content area for navigation items.
     * Should contain groups, items, and accordions. Automatically handles overflow in closed state.
     *
     * ```tsx
     * <SidebarNavigation.Body>
     *   <SidebarNavigation.Item to="/dashboard">Dashboard</SidebarNavigation.Item>
     * </SidebarNavigation.Body>
     * ```
     */
    Body: typeof SidebarNavigationBody;
    /**
     * {@link SidebarNavigationFooter | Footer} provides a fixed footer section at the bottom of the sidebar.
     * Can contain accordions and items.
     *
     * ```tsx
     * <SidebarNavigation.Footer>
     *   <SidebarNavigation.Item Icon={SettingsIcon} to="/settings">
     *     Settings
     *   </SidebarNavigation.Item>
     * </SidebarNavigation.Footer>
     * ```
     */
    Footer: import('@emotion/styled').StyledComponent<{
        theme?: import('@emotion/react').Theme;
        as?: React.ElementType;
    }, import('../../../../node_modules/react').DetailedHTMLProps<import('../../../../node_modules/react').HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
    /**
     * {@link SidebarNavigationGroup | Group} organizes navigation items under a common label,
     * creating visual separation and hierarchy.
     *
     * ```tsx
     * <SidebarNavigation.Group label="Analysis">
     *   <SidebarNavigation.Item Icon={IssuesIcon} to="/issues">
     *     Issues
     *   </SidebarNavigation.Item>
     * </SidebarNavigation.Group>
     * ```
     */
    Group: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./SidebarNavigationGroup').SidebarNavigationGroupProps & {
        children?: import('../../../../node_modules/react').ReactNode | undefined;
    } & import('../../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    /**
     * {@link SidebarNavigationHeader | Header} displays project/organization information at the top
     * of the sidebar. Supports avatars and interactive dropdowns.
     *
     * ```tsx
     * <SidebarNavigation.Header
     *   name="SonarQube Community"
     *   qualifier="Organization"
     *   avatar={<Avatar />}
     *   isInteractive
     * />
     * ```
     */
    Header: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./SidebarNavigationHeader').SidebarNavigationHeaderProps & import('../../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    /**
     * {@link SidebarNavigationItem | Item} represents individual navigation items with support for
     * icons, active states, and router integration. Do not wrap children in Text components.
     *
     * ```tsx
     * <SidebarNavigation.Item Icon={HomeIcon} to="/dashboard" enableTooltip>
     *   Dashboard
     * </SidebarNavigation.Item>
     * ```
     */
    Item: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./SidebarNavigationItem').SidebarNavigationItemProps & import('../../../../node_modules/react').RefAttributes<HTMLAnchorElement>>;
};
//# sourceMappingURL=index.d.ts.map