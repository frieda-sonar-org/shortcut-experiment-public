export interface LogoProps {
    className?: string;
    hasText?: boolean;
    size?: `${LogoSize}`;
}
export declare enum LogoSize {
    Small = "small",
    Medium = "medium",
    Large = "large"
}
export declare const LogoSvgWrapper: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
} & Pick<LogoProps, "size">, import('../../../node_modules/react').SVGProps<SVGSVGElement>, {}>;
//# sourceMappingURL=logoUtils.d.ts.map