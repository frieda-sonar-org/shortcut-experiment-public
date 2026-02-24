import { PropsWithChildren } from '../../../node_modules/react';
export declare enum HeadingSize {
    ExtraSmall = "xsmall",
    Small = "small",
    Medium = "medium",
    Large = "large",
    ExtraLarge = "xlarge"
}
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
export interface HeadingProps {
    as: HeadingTag;
    className?: string;
    id?: string;
    hasMarginBottom?: boolean;
    size?: `${HeadingSize}`;
}
export declare const Heading: import('../../../node_modules/react').ForwardRefExoticComponent<Readonly<PropsWithChildren<HeadingProps>> & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=Heading.d.ts.map