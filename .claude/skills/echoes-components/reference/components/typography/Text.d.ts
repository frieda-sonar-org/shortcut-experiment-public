import { PropsWithChildren } from '../../../node_modules/react';
import { DesignTokensColorsText } from '../../types/design-tokens';
export declare enum TextSize {
    Small = "small",
    Default = "default",
    Large = "large"
}
type TextTags = 'span' | 'p' | 'div' | 'strong' | 'b' | 'em' | 'i' | 'ul' | 'ol' | 'li';
export type TextProps = {
    as?: TextTags;
    className?: string;
    id?: string;
    isHighlighted?: boolean;
    size?: `${TextSize}`;
} & ColorProps;
type ColorProps = {
    colorOverride?: DesignTokensColorsText;
    isSubtle?: never;
} | {
    colorOverride?: never;
    isSubtle: boolean;
};
export declare const Text: import('../../../node_modules/react').ForwardRefExoticComponent<PropsWithChildren<TextProps> & import('../../../node_modules/react').RefAttributes<HTMLSpanElement>>;
export declare const TextTypographyStyle: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
}, import('../../../node_modules/react').DetailedHTMLProps<import('../../../node_modules/react').HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
export {};
//# sourceMappingURL=Text.d.ts.map