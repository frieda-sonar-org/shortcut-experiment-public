import { ComponentPropsWithoutRef, ReactNode } from '../../../../node_modules/react';
import { DropdownMenuProps } from '../../dropdown-menu';
import { Tooltip } from '../../tooltip';
type TooltipProps = ComponentPropsWithoutRef<typeof Tooltip>;
export interface GlobalNavigationAccountProps extends Omit<DropdownMenuProps, 'children'> {
    ariaLabel?: string;
    avatar: ReactNode;
    tooltipContent?: TooltipProps['content'];
}
export declare const GlobalNavigationAccount: import('../../../../node_modules/react').ForwardRefExoticComponent<GlobalNavigationAccountProps & import('../../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=GlobalNavigationAccount.d.ts.map