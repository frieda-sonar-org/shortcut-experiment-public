import { AsideSize, PageWidth } from './LayoutTypes';
export declare const BannerContainer: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
}, import('../../../node_modules/react').DetailedHTMLProps<import('../../../node_modules/react').HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const ContentGrid: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
}, import('../../../node_modules/react').DetailedHTMLProps<import('../../../node_modules/react').HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export interface AsideProps {
    className?: string;
    id?: string;
    role?: string;
    size?: `${AsideSize}`;
}
export declare const AsideLeft: import('../../../node_modules/react').ForwardRefExoticComponent<AsideProps & {
    children?: import('../../../node_modules/react').ReactNode | undefined;
} & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
export interface PageGridProps {
    className?: string;
    width?: `${PageWidth}`;
}
export declare const PageGrid: import('../../../node_modules/react').ForwardRefExoticComponent<PageGridProps & {
    children?: import('../../../node_modules/react').ReactNode | undefined;
} & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
export declare const PageContent: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
}, import('../../../node_modules/react').DetailedHTMLProps<import('../../../node_modules/react').HTMLAttributes<HTMLElement>, HTMLElement>, {}>;
export declare const PageFooter: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
}, import('../../../node_modules/react').DetailedHTMLProps<import('../../../node_modules/react').HTMLAttributes<HTMLElement>, HTMLElement>, {}>;
//# sourceMappingURL=LayoutSlots.d.ts.map