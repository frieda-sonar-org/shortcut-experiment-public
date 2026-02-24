export { type GlobalNavigationProps } from './GlobalNavigation';
export { type GlobalNavigationAccountProps } from './GlobalNavigationAccount';
export { type GlobalNavigationActionProps } from './GlobalNavigationAction';
export { type GlobalNavigationDropdownItemProps } from './GlobalNavigationDropdownItem';
export { type GlobalNavigationHomeProps } from './GlobalNavigationHome';
export { type GlobalNavigationItemProps } from './GlobalNavigationItem';
export { type GlobalNavigationItemsContainerProps } from './GlobalNavigationItemsContainer';
export { type GlobalNavigationPrimaryProps } from './GlobalNavigationPrimary';
export declare const GlobalNavigation: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./GlobalNavigation').GlobalNavigationProps & import('../../../../node_modules/react').RefAttributes<HTMLElement>> & {
    Primary: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./GlobalNavigationPrimary').GlobalNavigationPrimaryProps & import('../../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    Secondary: import('@emotion/styled').StyledComponent<{
        theme?: import('@emotion/react').Theme;
        as?: React.ElementType;
    }, import('../../../../node_modules/react').DetailedHTMLProps<import('../../../../node_modules/react').HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
    /**
     * {@link GlobalNavigationItem | GlobalNavigation.Item} is basically a menu link.
     *
     * Place it inside the {@link GlobalNavigationItemsContainer | GlobalNavigation.ItemsContainer}.
     *
     * Its children should be limited to formatted text.
     */
    Item: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./GlobalNavigationItem').GlobalNavigationItemProps & import('../../../../node_modules/react').RefAttributes<HTMLAnchorElement>>;
    /**
     * {@link GlobalNavigationItemsContainer | GlobalNavigation.ItemsContainer} wraps the GlobalNavigation Items.
     * It should be in the Primary section and contain only instances of {@link GlobalNavigationItem | GlobalNavigation.Item}
     * and {@link GlobalNavigationDropdownItem | GlobalNavigation.DropdownItem}.
     */
    ItemsContainer: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./GlobalNavigationItemsContainer').GlobalNavigationItemsContainerProps & import('../../../../node_modules/react').RefAttributes<HTMLUListElement>>;
    /**
     * {@link GlobalNavigationDropdownItem | GlobalNavigation.DropdownItem} is a menu item that opens a dropdown menu.
     *
     * Place it inside the {@link GlobalNavigationItemsContainer | GlobalNavigation.ItemsContainer}.
     *
     * It uses a button with a chevron suffix as a trigger, so its children should be limited to formatted text.
     */
    DropdownItem: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./GlobalNavigationDropdownItem').GlobalNavigationDropdownItemProps & import('../../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    /**
     * {@link GlobalNavigationAction | GlobalNavigation.Action} is a ButtonIcon dedicated to the Secondary section of the GlobalNavigation.
     * It has the same API
     */
    Action: import('../../../../node_modules/react').ForwardRefExoticComponent<import('../..').ButtonIconProps & import('../../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    /**
     * {@link GlobalNavigationAccount | GlobalNavigation.Account} is a special button for the account menu of the GlobalNavigation.
     *
     * It wraps a DropdownMenu, so it expects the `items` to be provided directly to it.
     * It includes an `avatar` render prop that should be supplied with the product's Avatar component.
     * Note that it will constrain it to 20x20 px.
     */
    Account: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./GlobalNavigationAccount').GlobalNavigationAccountProps & import('../../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    Home: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./GlobalNavigationHome').GlobalNavigationHomeProps & import('../../../../node_modules/react').RefAttributes<HTMLDivElement>>;
};
/**
 * @deprecated Use Layout.GlobalNavigation instead
 */
export declare const DirectImportGlobalNavigation: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./GlobalNavigation').GlobalNavigationProps & import('../../../../node_modules/react').RefAttributes<HTMLElement>> & {
    Primary: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./GlobalNavigationPrimary').GlobalNavigationPrimaryProps & import('../../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    Secondary: import('@emotion/styled').StyledComponent<{
        theme?: import('@emotion/react').Theme;
        as?: React.ElementType;
    }, import('../../../../node_modules/react').DetailedHTMLProps<import('../../../../node_modules/react').HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
    /**
     * {@link GlobalNavigationItem | GlobalNavigation.Item} is basically a menu link.
     *
     * Place it inside the {@link GlobalNavigationItemsContainer | GlobalNavigation.ItemsContainer}.
     *
     * Its children should be limited to formatted text.
     */
    Item: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./GlobalNavigationItem').GlobalNavigationItemProps & import('../../../../node_modules/react').RefAttributes<HTMLAnchorElement>>;
    /**
     * {@link GlobalNavigationItemsContainer | GlobalNavigation.ItemsContainer} wraps the GlobalNavigation Items.
     * It should be in the Primary section and contain only instances of {@link GlobalNavigationItem | GlobalNavigation.Item}
     * and {@link GlobalNavigationDropdownItem | GlobalNavigation.DropdownItem}.
     */
    ItemsContainer: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./GlobalNavigationItemsContainer').GlobalNavigationItemsContainerProps & import('../../../../node_modules/react').RefAttributes<HTMLUListElement>>;
    /**
     * {@link GlobalNavigationDropdownItem | GlobalNavigation.DropdownItem} is a menu item that opens a dropdown menu.
     *
     * Place it inside the {@link GlobalNavigationItemsContainer | GlobalNavigation.ItemsContainer}.
     *
     * It uses a button with a chevron suffix as a trigger, so its children should be limited to formatted text.
     */
    DropdownItem: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./GlobalNavigationDropdownItem').GlobalNavigationDropdownItemProps & import('../../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    /**
     * {@link GlobalNavigationAction | GlobalNavigation.Action} is a ButtonIcon dedicated to the Secondary section of the GlobalNavigation.
     * It has the same API
     */
    Action: import('../../../../node_modules/react').ForwardRefExoticComponent<import('../..').ButtonIconProps & import('../../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    /**
     * {@link GlobalNavigationAccount | GlobalNavigation.Account} is a special button for the account menu of the GlobalNavigation.
     *
     * It wraps a DropdownMenu, so it expects the `items` to be provided directly to it.
     * It includes an `avatar` render prop that should be supplied with the product's Avatar component.
     * Note that it will constrain it to 20x20 px.
     */
    Account: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./GlobalNavigationAccount').GlobalNavigationAccountProps & import('../../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    Home: import('../../../../node_modules/react').ForwardRefExoticComponent<import('./GlobalNavigationHome').GlobalNavigationHomeProps & import('../../../../node_modules/react').RefAttributes<HTMLDivElement>>;
};
//# sourceMappingURL=index.d.ts.map