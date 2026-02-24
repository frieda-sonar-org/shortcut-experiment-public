import { MouseEventHandler, ReactNode } from '../../../node_modules/react';
import { TextNode } from '../../types/utils';
type CheckProps = {
    isCheckable: true;
    isChecked?: boolean;
} | {
    isCheckable?: false;
    isChecked?: never;
};
export type DropdownMenuItemBaseProps = CheckProps & {
    ariaLabel?: string;
    children: ReactNode;
    className?: string;
    helpText?: TextNode;
    isDisabled?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    prefix?: ReactNode;
    suffix?: ReactNode;
};
type FunctionChild = (data: {
    getStyledItemContents: ({ label }: {
        label: ReactNode;
    }) => ReactNode;
}) => ReactNode;
export declare const DropdownMenuItemBase: import('../../../node_modules/react').ForwardRefExoticComponent<Omit<DropdownMenuItemBaseProps, "children"> & {
    as?: React.FC;
    children: ReactNode | FunctionChild;
} & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
export declare function isDropdownMenuItemComponent(node: any): boolean;
export {};
//# sourceMappingURL=DropdownMenuItemBase.d.ts.map