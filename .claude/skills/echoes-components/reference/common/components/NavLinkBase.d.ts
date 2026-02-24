import { NavLinkProps as RouterNavLinkProps } from 'react-router-dom';
type RouterNavLinkPropsAllowed = 'download' | 'to' | 'onClick';
export interface NavLinkBaseProps extends Pick<RouterNavLinkProps, RouterNavLinkPropsAllowed> {
    className?: string;
    children: React.ReactNode;
    isActive?: boolean;
    isMatchingFullPath?: boolean;
    enableOpenInNewTab?: boolean;
}
export declare const NavLinkBase: import('../../../node_modules/react').ForwardRefExoticComponent<NavLinkBaseProps & import('../../../node_modules/react').RefAttributes<HTMLAnchorElement>>;
export {};
//# sourceMappingURL=NavLinkBase.d.ts.map