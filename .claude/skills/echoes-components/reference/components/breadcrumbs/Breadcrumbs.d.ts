import { default as React } from '../../../node_modules/react';
import { BreadcrumbLinkProps } from './BreadcrumbLink';
type BreadcrumbItemWithOptionalTo = Omit<BreadcrumbLinkProps, 'to'> & {
    to?: BreadcrumbLinkProps['to'];
};
export type BreadcrumbsItems = [...BreadcrumbLinkProps[], BreadcrumbItemWithOptionalTo] | BreadcrumbLinkProps[];
export interface BreadcrumbsProps {
    className?: string;
    /**
     * A list of breadcrumb props. The last item can (and probably should, in most cases) omit the `to` prop.
     */
    items: BreadcrumbsItems;
}
export declare const Breadcrumbs: import('@emotion/styled').StyledComponent<BreadcrumbsProps & React.RefAttributes<HTMLDivElement> & {
    theme?: import('@emotion/react').Theme;
}, {}, {}>;
export {};
//# sourceMappingURL=Breadcrumbs.d.ts.map