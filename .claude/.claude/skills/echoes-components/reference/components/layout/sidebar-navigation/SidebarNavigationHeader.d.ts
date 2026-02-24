import { ReactNode } from '../../../../node_modules/react';
import { TextNode, TextNodeOptional } from '../../../types/utils';
export interface SidebarNavigationHeaderProps {
    /**
     * Image to display to the left of the header.
     */
    avatar?: ReactNode;
    /**
     * Display a Icon on the right, indicating it triggers a dropdown.
     * To be set to `true` when used as a dropdown trigger.
     */
    isInteractive?: boolean;
    /**
     * Text to display under the main text of the header.
     * Typically defines the type of entity being shown (organization, enterprise, project, ...)
     */
    qualifier?: TextNodeOptional;
    /**
     * The main text to show in the header
     */
    name: TextNode;
}
export declare const SidebarNavigationHeader: import('../../../../node_modules/react').ForwardRefExoticComponent<SidebarNavigationHeaderProps & import('../../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=SidebarNavigationHeader.d.ts.map