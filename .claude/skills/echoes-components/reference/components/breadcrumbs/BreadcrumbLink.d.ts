import { ReactNode } from '../../../node_modules/react';
import { LinkBaseProps, LinkStandaloneBaseProps } from '../links/LinkTypes';
export interface BreadcrumbLinkProps extends LinkStandaloneBaseProps, Omit<LinkBaseProps, 'children'> {
    hasEllipsis?: boolean;
    linkElement: ReactNode;
}
export declare const BreadcrumbLink: import('@emotion/styled').StyledComponent<BreadcrumbLinkProps & import('../../../node_modules/react').RefAttributes<HTMLAnchorElement> & {
    theme?: import('@emotion/react').Theme;
}, {}, {}>;
//# sourceMappingURL=BreadcrumbLink.d.ts.map