import { AriaRole } from '../../../node_modules/react';
export interface DividerProps {
    /**
     * Additional CSS class name
     */
    className?: string;
    /**
     * Whether the divider is vertical
     * @default false
     */
    isVertical?: boolean;
    /**
     * Optional ARIA role. If not provided, no role will be applied.
     * For semantic separation, 'separator' is recommended.
     */
    role?: AriaRole;
    /**
     * Optional text to display in the middle of the divider
     */
    text?: React.ReactNode;
}
export declare const Divider: import('../../../node_modules/react').ForwardRefExoticComponent<Readonly<DividerProps> & import('../../../node_modules/react').RefAttributes<HTMLDivElement | HTMLHRElement>>;
//# sourceMappingURL=Divider.d.ts.map