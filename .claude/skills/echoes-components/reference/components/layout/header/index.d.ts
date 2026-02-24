export type { HeaderMetadataProps as PageHeaderMetadataProps } from './common/HeaderMetadata';
export type { ContentHeaderTitleProps, PageHeaderTitleProps } from './common/HeaderTitle';
export type { HeaderProps as ContentHeaderProps, PageHeaderProps } from './common/HeaderTypes';
export declare const PageHeader: import('../../../../node_modules/react').ForwardRefExoticComponent<import('.').PageHeaderProps & import('../../../../node_modules/react').RefAttributes<HTMLDivElement>> & {
    /**
     * Page title component (required) with optional prefix/suffix
     */
    Title: import('../../../../node_modules/react').ForwardRefExoticComponent<import('.').PageHeaderTitleProps & {
        children?: import('../../../../node_modules/react').ReactNode | undefined;
    } & import('../../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    /**
     * Action elements container (button group)
     */
    Actions: import('../../../../node_modules/react').ForwardRefExoticComponent<Readonly<import('../..').ButtonGroupProps> & import('../../../../node_modules/react').RefAttributes<HTMLSpanElement>>;
    /**
     * Breadcrumb navigation component
     */
    Breadcrumbs: import('@emotion/styled').StyledComponent<import('../..').BreadcrumbsProps & import('../../../../node_modules/react').RefAttributes<HTMLDivElement> & {
        theme?: import('@emotion/react').Theme;
    }, {}, {}>;
    /**
     * Description text component
     */
    Description: import('../../../../node_modules/react').ForwardRefExoticComponent<import('../../../../node_modules/react').PropsWithChildren<import('../..').TextProps> & import('../../../../node_modules/react').RefAttributes<HTMLSpanElement>>;
    /**
     * Metadata information component
     */
    Metadata: import('../../../../node_modules/react').ForwardRefExoticComponent<import('.').PageHeaderMetadataProps & {
        children?: import('../../../../node_modules/react').ReactNode | undefined;
    } & import('../../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    /**
     * Global navigation items container
     */
    Navigation: import('../../../../node_modules/react').ForwardRefExoticComponent<import('..').GlobalNavigationItemsContainerProps & import('../../../../node_modules/react').RefAttributes<HTMLUListElement>>;
    /**
     * Dropdown navigation item component
     */
    NavigationDropdownItem: import('../../../../node_modules/react').ForwardRefExoticComponent<import('..').GlobalNavigationDropdownItemProps & import('../../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    /**
     * Individual navigation item component
     */
    NavigationItem: import('../../../../node_modules/react').ForwardRefExoticComponent<import('..').GlobalNavigationItemProps & import('../../../../node_modules/react').RefAttributes<HTMLAnchorElement>>;
};
export declare const ContentHeader: import('../../../../node_modules/react').ForwardRefExoticComponent<import('.').ContentHeaderProps & import('../../../../node_modules/react').RefAttributes<HTMLDivElement>> & {
    /**
     * Content title component (required) with optional prefix/suffix
     */
    Title: import('../../../../node_modules/react').ForwardRefExoticComponent<import('.').ContentHeaderTitleProps & {
        children?: import('../../../../node_modules/react').ReactNode | undefined;
    } & import('../../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    /**
     * Action elements container (button group)
     */
    Actions: import('../../../../node_modules/react').ForwardRefExoticComponent<Readonly<import('../..').ButtonGroupProps> & import('../../../../node_modules/react').RefAttributes<HTMLSpanElement>>;
    /**
     * Breadcrumb navigation component
     */
    Breadcrumbs: import('@emotion/styled').StyledComponent<import('../..').BreadcrumbsProps & import('../../../../node_modules/react').RefAttributes<HTMLDivElement> & {
        theme?: import('@emotion/react').Theme;
    }, {}, {}>;
    /**
     * Description text component
     */
    Description: import('../../../../node_modules/react').ForwardRefExoticComponent<import('../../../../node_modules/react').PropsWithChildren<import('../..').TextProps> & import('../../../../node_modules/react').RefAttributes<HTMLSpanElement>>;
    /**
     * Metadata information component
     */
    Metadata: import('../../../../node_modules/react').ForwardRefExoticComponent<import('.').PageHeaderMetadataProps & {
        children?: import('../../../../node_modules/react').ReactNode | undefined;
    } & import('../../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    /**
     * Global navigation items container
     */
    Navigation: import('../../../../node_modules/react').ForwardRefExoticComponent<import('..').GlobalNavigationItemsContainerProps & import('../../../../node_modules/react').RefAttributes<HTMLUListElement>>;
    /**
     * Dropdown navigation item component
     */
    NavigationDropdownItem: import('../../../../node_modules/react').ForwardRefExoticComponent<import('..').GlobalNavigationDropdownItemProps & import('../../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    /**
     * Individual navigation item component
     */
    NavigationItem: import('../../../../node_modules/react').ForwardRefExoticComponent<import('..').GlobalNavigationItemProps & import('../../../../node_modules/react').RefAttributes<HTMLAnchorElement>>;
};
//# sourceMappingURL=index.d.ts.map