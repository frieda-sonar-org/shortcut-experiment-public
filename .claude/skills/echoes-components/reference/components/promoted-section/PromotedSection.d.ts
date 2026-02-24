import { TextNode } from '../../types/utils';
import { HeadingProps } from '../typography';
export declare enum PromotedSectionVariety {
    Highlight = "highlight",
    Neutral = "neutral"
}
export interface PromotedSectionProps {
    /**
     * The actions at the bottom: either a Button, a ButtonGroup, or a LinkStandalone (optional)
     */
    actions?: React.ReactNode;
    /**
     * The text to display on a badge next to the header (optional).
     * No badge appears if this is undefined or the empty string `""`
     */
    badgeText?: TextNode;
    /**
     * CSS class name(s) to apply to the section (optional)
     */
    className?: string;
    /**
     * The header text for the section
     */
    headerText: TextNode;
    /**
     * The illustration to display on the right-hand side (optional)
     */
    illustration?: React.ReactNode;
    /**
     * The callback function to call when the section is dismissed (optional).
     * When this is not `undefined`, a dismiss button is showed.
     */
    onDismiss?: () => void;
    /**
     * The main text for the section
     */
    text: TextNode;
    /**
     * The HTML element to use for the title. Defaults to `h2` (optional)
     */
    titleAs?: `${HeadingProps['as']}`;
    /**
     * The variety: either PromotedSectionVariety.Highlight/'highlight' or PromotedSectionVariety.Neutral/'neutral'.
     * Defaults to PromotedSectionVariety.Neutral/'neutral' (optional)
     */
    variety?: `${PromotedSectionVariety}`;
}
export declare const PromotedSection: import('../../../node_modules/react').ForwardRefExoticComponent<Readonly<PromotedSectionProps> & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PromotedSection.d.ts.map