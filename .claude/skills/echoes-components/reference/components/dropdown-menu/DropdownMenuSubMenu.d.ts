import { ReactNode } from '../../../node_modules/react';
import * as radixDropdownMenu from '@radix-ui/react-dropdown-menu';
export interface DropdownMenuSubProps extends radixDropdownMenu.DropdownMenuSubProps {
    className?: string;
    id?: string;
    isOpen?: boolean;
    isOpenOnMount?: boolean;
    items: ReactNode | undefined;
}
export declare const DropdownMenuSubMenu: import('../../../node_modules/react').ForwardRefExoticComponent<DropdownMenuSubProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DropdownMenuSubMenu.d.ts.map