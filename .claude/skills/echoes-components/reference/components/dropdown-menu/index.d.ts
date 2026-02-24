export { DropdownMenuAlign, DropdownMenuSide, type DropdownMenuProps } from './DropdownMenu';
export { type DropdownMenuItemButtonProps } from './DropdownMenuItemButton';
export { type DropdownMenuItemButtonCheckableProps } from './DropdownMenuItemButtonCheckable';
export { type DropdownMenuItemButtonDestructiveProps } from './DropdownMenuItemButtonDestructive';
export { type DropdownMenuItemLinkProps } from './DropdownMenuItemLink';
export { type DropdownMenuItemLinkDownloadProps } from './DropdownMenuItemLinkDownload';
export { type DropdownMenuSubProps } from './DropdownMenuSubMenu';
export declare const DropdownMenu: import('../../../node_modules/react').ForwardRefExoticComponent<import('./DropdownMenu').DropdownMenuProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>> & {
    GroupLabel: import('@emotion/styled').StyledComponent<import('@radix-ui/react-dropdown-menu').DropdownMenuLabelProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement> & {
        theme?: import('@emotion/react').Theme;
    }, {}, {}>;
    ItemButton: import('../../../node_modules/react').ForwardRefExoticComponent<import('./DropdownMenuItemButton').DropdownMenuItemButtonProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    ItemButtonCheckable: import('../../../node_modules/react').ForwardRefExoticComponent<import('./DropdownMenuItemButtonCheckable').DropdownMenuItemButtonCheckableProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    ItemButtonDestructive: import('../../../node_modules/react').ForwardRefExoticComponent<import('./DropdownMenuItemButtonDestructive').DropdownMenuItemButtonDestructiveProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    ItemLink: import('../../../node_modules/react').ForwardRefExoticComponent<Omit<import('./DropdownMenuItemBase').DropdownMenuItemBaseProps, "isCheckable" | "isChecked"> & {
        hasExternalIcon?: boolean;
    } & Pick<import('../../common/components/NavLinkBase').NavLinkBaseProps, "download" | "to" | "enableOpenInNewTab" | "isActive" | "isMatchingFullPath"> & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    ItemLinkDownload: import('../../../node_modules/react').ForwardRefExoticComponent<Omit<import('./DropdownMenuItemBase').DropdownMenuItemBaseProps, "prefix" | "suffix" | "isCheckable" | "isChecked"> & Pick<import('../../common/components/NavLinkBase').NavLinkBaseProps, "to"> & {
        download: string;
    } & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    Separator: import('@emotion/styled').StyledComponent<import('@radix-ui/react-dropdown-menu').DropdownMenuSeparatorProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement> & {
        theme?: import('@emotion/react').Theme;
    }, {}, {}>;
    SubMenu: import('../../../node_modules/react').ForwardRefExoticComponent<import('./DropdownMenuSubMenu').DropdownMenuSubProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
};
//# sourceMappingURL=index.d.ts.map