import { NavLinkBaseProps } from '../../common/components/NavLinkBase';
import { DropdownMenuItemBaseProps } from './DropdownMenuItemBase';
export type DropdownMenuItemLinkDownloadProps = Omit<DropdownMenuItemBaseProps, 'isCheckable' | 'isChecked' | 'prefix' | 'suffix'> & Pick<NavLinkBaseProps, 'to'> & {
    download: string;
};
export declare const DropdownMenuItemLinkDownload: import('../../../node_modules/react').ForwardRefExoticComponent<Omit<DropdownMenuItemBaseProps, "prefix" | "suffix" | "isCheckable" | "isChecked"> & Pick<NavLinkBaseProps, "to"> & {
    download: string;
} & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DropdownMenuItemLinkDownload.d.ts.map