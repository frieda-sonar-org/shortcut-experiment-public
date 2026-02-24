import { ForwardRefExoticComponent, ReactNode } from '../../../../node_modules/react';
import { TextNode } from '../../../types/utils';
import { IconFilledProps } from '../../icons';
export interface SidebarNavigationAccordionItemProps {
    ariaLabel?: string;
    /**
     * List of SidebarNavigationItem that are displayed when the accordion is expanded.
     * Should ideally be maximum 5 items.
     */
    children: ReactNode;
    className?: string;
    /**
     * Whether to display the tooltip on the accordion item or not.
     * By default the tooltip is disabled, it should only be enabled if you expect the content to be ellipsed.
     */
    enableTooltip?: boolean;
    /**
     * The label for the SidebarNavigationAccordionItem.
     */
    label: TextNode;
    /**
     * The onClose callback is called when the accordion is closed.
     */
    onClose?: VoidFunction;
    /**
     * The onOpen callback is called when the accordion is opened.
     */
    onOpen?: VoidFunction;
    /**
     * Optional content to display on the right, before the chevron. Typically badges, item count and similar metadata.
     */
    suffix?: ReactNode;
    /**
     * The icon component to display at the start of the SidebarNavigationAccordionItem.
     * Must be an Echoes Icon component.
     */
    Icon: ForwardRefExoticComponent<IconFilledProps & React.RefAttributes<HTMLSpanElement>>;
}
export declare const SidebarNavigationAccordionItem: ForwardRefExoticComponent<SidebarNavigationAccordionItemProps & import('../../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
export declare const AccordionItemsList: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
}, import('../../../../node_modules/react').DetailedHTMLProps<import('../../../../node_modules/react').HTMLAttributes<HTMLUListElement>, HTMLUListElement>, {}>;
//# sourceMappingURL=SidebarNavigationAccordionItem.d.ts.map