import { NavLinkBaseProps } from '../../common/components/NavLinkBase';
import { DropdownMenuItemBaseProps } from './DropdownMenuItemBase';
export type DropdownMenuItemLinkProps = Omit<DropdownMenuItemBaseProps, 'isCheckable' | 'isChecked'> & {
    hasExternalIcon?: boolean;
} & Pick<NavLinkBaseProps, 'download' | 'isActive' | 'isMatchingFullPath' | 'enableOpenInNewTab' | 'to'>;
export declare const DropdownMenuItemLink: import('../../../node_modules/react').ForwardRefExoticComponent<Omit<DropdownMenuItemBaseProps, "isCheckable" | "isChecked"> & {
    hasExternalIcon?: boolean;
} & Pick<NavLinkBaseProps, "download" | "to" | "enableOpenInNewTab" | "isActive" | "isMatchingFullPath"> & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DropdownMenuItemLink.d.ts.map