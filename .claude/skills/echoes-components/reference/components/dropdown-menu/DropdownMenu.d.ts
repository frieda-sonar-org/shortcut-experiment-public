import { ReactNode } from '../../../node_modules/react';
import { PropsLabelAndHelpText } from '../../types/utils';
import * as radixDropdownMenu from '@radix-ui/react-dropdown-menu';
export declare enum DropdownMenuAlign {
    Center = "center",
    End = "end",
    Start = "start"
}
export declare enum DropdownMenuSide {
    Bottom = "bottom",
    Left = "left",
    Right = "right",
    Top = "top"
}
export interface DropdownMenuProps extends radixDropdownMenu.DropdownMenuTriggerProps {
    align?: `${DropdownMenuAlign}`;
    children: ReactNode;
    className?: string;
    header?: Pick<PropsLabelAndHelpText, 'helpText' | 'label'> & {
        suffix?: ReactNode;
    };
    id?: string;
    isModal?: boolean;
    isOpen?: boolean;
    isOpenOnMount?: boolean;
    items: ReactNode | undefined;
    onClose?: () => void;
    onOpen?: () => void;
    side?: `${DropdownMenuSide}`;
}
export declare const DropdownMenuRoot: import('../../../node_modules/react').ForwardRefExoticComponent<DropdownMenuProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=DropdownMenu.d.ts.map