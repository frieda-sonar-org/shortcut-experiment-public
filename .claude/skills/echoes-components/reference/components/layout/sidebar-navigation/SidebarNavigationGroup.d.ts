import { TextNode } from '../../../types/utils';
export interface SidebarNavigationGroupProps {
    className?: string;
    /**
     * The label of the SidebarNavigationGroup.
     * It can be a string or a JSX.Element. This is meant for FormattedMessages and other utility components.
     * The styling (font, color, weight, ...) is handled by this component.
     */
    label: TextNode;
}
export declare const SidebarNavigationGroup: import('../../../../node_modules/react').ForwardRefExoticComponent<SidebarNavigationGroupProps & {
    children?: import('../../../../node_modules/react').ReactNode | undefined;
} & import('../../../../node_modules/react').RefAttributes<HTMLDivElement>>;
export declare const SidebarNavigationGroupList: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
}, import('../../../../node_modules/react').DetailedHTMLProps<import('../../../../node_modules/react').HTMLAttributes<HTMLUListElement>, HTMLUListElement>, {}>;
//# sourceMappingURL=SidebarNavigationGroup.d.ts.map