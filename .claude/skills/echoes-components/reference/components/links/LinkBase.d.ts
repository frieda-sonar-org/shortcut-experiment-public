import { LinkProps } from './LinkTypes';
export declare const LinkBase: import('../../../node_modules/react').ForwardRefExoticComponent<LinkProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
export declare function getShouldOpenInNewTabProps({ download, enableOpenInNewTab, to, }: Pick<LinkProps, 'download' | 'enableOpenInNewTab' | 'to'>): {
    rel: string;
    target: string;
} | {
    rel?: undefined;
    target?: undefined;
};
//# sourceMappingURL=LinkBase.d.ts.map