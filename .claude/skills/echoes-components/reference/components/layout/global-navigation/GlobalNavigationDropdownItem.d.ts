import { ReactNode } from '../../../../node_modules/react';
import { DropdownMenuProps } from '../../dropdown-menu/DropdownMenu';
export interface GlobalNavigationDropdownItemProps extends DropdownMenuProps {
    className?: string;
    disableActiveHighlight?: boolean;
}
export declare const GlobalNavigationDropdownItem: import('../../../../node_modules/react').ForwardRefExoticComponent<GlobalNavigationDropdownItemProps & import('../../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
export declare function isActive(pathname: string, item: ReactNode): boolean;
//# sourceMappingURL=GlobalNavigationDropdownItem.d.ts.map