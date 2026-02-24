import { PopoverProps } from '../popover';
type PopoverPropsSubset = Omit<PopoverProps, 'children'>;
export interface ToggleTipProps extends PopoverPropsSubset {
    ariaLabel?: string;
    className?: string;
}
export declare const ToggleTip: import('../../../node_modules/react').ForwardRefExoticComponent<ToggleTipProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=ToggleTip.d.ts.map