import { DesignTokensColorsIcons } from '../../types/design-tokens';
export interface IconProps {
    className?: string;
    color?: DesignTokensColorsIcons;
}
export interface IconFilledProps extends IconProps {
    isFilled?: boolean;
}
interface IconBaseProps {
    children: React.ReactNode;
}
export declare const IconMaterialWrapper: import('@emotion/styled').StyledComponent<IconBaseProps & IconFilledProps & import('../../../node_modules/react').RefAttributes<HTMLSpanElement> & {
    theme?: import('@emotion/react').Theme;
}, {}, {}>;
export declare const IconCustomWrapper: import('@emotion/styled').StyledComponent<IconBaseProps & IconFilledProps & import('../../../node_modules/react').RefAttributes<HTMLSpanElement> & {
    theme?: import('@emotion/react').Theme;
} & IconProps, {}, {}>;
export {};
//# sourceMappingURL=IconWrapper.d.ts.map