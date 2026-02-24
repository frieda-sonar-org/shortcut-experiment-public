import { ReactNode } from '../../../../../node_modules/react';
import { HeadingProps } from '../../../typography';
export interface ContentHeaderTitleProps {
    /**
     * Additional CSS class name(s)
     */
    className?: string;
    /**
     * The heading tag to use for the title itself
     */
    headingLevel?: HeadingProps['as'];
    /**
     * Content (e.g. a ButtonIcon) to display before the title
     */
    prefix?: ReactNode;
    /**
     * Content (e.g. a ButtonIcon) to display after the title
     */
    suffix?: ReactNode;
}
/**
 * Displays the main title in the content header. The title is rendered as a heading (h2 by default)
 * and can optionally include prefix and suffix elements.
 */
export declare const ContentHeaderTitle: import('../../../../../node_modules/react').ForwardRefExoticComponent<ContentHeaderTitleProps & {
    children?: ReactNode | undefined;
} & import('../../../../../node_modules/react').RefAttributes<HTMLDivElement>>;
export interface PageHeaderTitleProps extends ContentHeaderTitleProps {
}
/**
 * Displays the main title in the page header. The title is rendered as a heading (h1 by default)
 * and can optionally include prefix and suffix elements.
 */
export declare const PageHeaderTitle: import('../../../../../node_modules/react').ForwardRefExoticComponent<PageHeaderTitleProps & {
    children?: ReactNode | undefined;
} & import('../../../../../node_modules/react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HeaderTitle.d.ts.map