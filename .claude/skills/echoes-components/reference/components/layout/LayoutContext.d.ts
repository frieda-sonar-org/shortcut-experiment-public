import { Dispatch, SetStateAction } from '../../../node_modules/react';
export interface LayoutContextShape {
    hasSidebar: boolean;
    isSidebarDocked: boolean;
    setHasSidebar: Dispatch<SetStateAction<boolean>>;
    setIsSidebarDocked: Dispatch<SetStateAction<boolean>>;
}
export declare const LayoutContext: import('../../../node_modules/react').Context<LayoutContextShape>;
//# sourceMappingURL=LayoutContext.d.ts.map