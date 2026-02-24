import { ReactNode } from '../../../node_modules/react';
export interface LayoutProps {
    className?: string;
    children: ReactNode;
    /**
     * Whether the sidebar should be initially docked 🦆 or not, useful to init with user preferences.
     */
    isSidebarInitiallyDocked?: boolean;
    /**
     * Callback function called when the sidebar docked state changes, useful to save user preferences.
     */
    onSidebarDockedChange?: (isDocked: boolean) => void;
}
export declare const Layout: import('../../../node_modules/react').ForwardRefExoticComponent<LayoutProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Layout.d.ts.map