import { CSSProperties, MouseEvent, ReactNode } from '../../../node_modules/react';
import { LinkProps as RouterLinkProps } from 'react-router-dom';
import { ButtonBaseProps } from '../buttons/ButtonTypes';
type RouterNavLinkPropsSubset = Pick<RouterLinkProps, 'download' | 'reloadDocument' | 'state' | 'to'>;
export declare enum LinkHighlight {
    Accent = "accent",
    CurrentColor = "current-color",
    Default = "default",
    Subtle = "subtle"
}
interface LinkCommonProps {
    children: ReactNode;
    className?: string;
    highlight?: `${LinkHighlight}`;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    style?: CSSProperties;
    enableBlurAfterClick?: boolean;
    enablePreventDefault?: boolean;
    enableStopPropagation?: boolean;
    title?: string;
}
export interface LinkBaseProps extends LinkCommonProps, RouterNavLinkPropsSubset {
    enableOpenInNewTab?: boolean;
}
interface LinkAsLinkProps extends LinkBaseProps {
    type?: never;
}
type LinkPropsForbiddenForButton = {
    [K in keyof RouterNavLinkPropsSubset]?: never;
} & {
    enableOpenInNewTab?: never;
};
interface LinkAsButtonProps extends LinkCommonProps, LinkPropsForbiddenForButton {
    onClick: (event: MouseEvent<HTMLElement>) => void;
    type?: ButtonBaseProps['type'];
}
export type LinkProps = LinkAsLinkProps | LinkAsButtonProps;
export type LinkStandaloneBaseProps = {
    iconLeft?: ReactNode;
};
export type LinkStandaloneProps = LinkProps & LinkStandaloneBaseProps;
export declare function isLinkAsButton(props: LinkProps): props is LinkAsButtonProps;
export {};
//# sourceMappingURL=LinkTypes.d.ts.map