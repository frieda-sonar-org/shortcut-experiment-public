import { ReactNode } from '../../../../node_modules/react';
import { LinkProps as RouterLinkProps } from 'react-router-dom';
export interface GlobalNavigationItemProps {
    /**
     * The label of the GlobalNavigationItem.
     * It can be a string or a JSX.Element, in the case of a JSX.Element it should not be wrapped in
     * a `<Text>` component, the GlobalNavigationItem already handles the typography styling for you.
     */
    children: ReactNode;
    className?: string;
    /**
     * Control whether the GlobalNavigationItem is active or not.
     * If true, the item will have a different style to indicate it is active.
     *
     * By default this behavior uses react-router-dom's URL matching utility.
     * Overriding this is only needed for complex scenarios.
     */
    isActive?: boolean;
    to: RouterLinkProps['to'];
}
export declare const GlobalNavigationItem: import('../../../../node_modules/react').ForwardRefExoticComponent<GlobalNavigationItemProps & import('../../../../node_modules/react').RefAttributes<HTMLAnchorElement>>;
//# sourceMappingURL=GlobalNavigationItem.d.ts.map