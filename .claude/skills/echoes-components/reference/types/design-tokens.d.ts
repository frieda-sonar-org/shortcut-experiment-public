import { default as designTokensBase } from '../generated/design-tokens-base.json';
import { default as designTokensThemed } from '../generated/design-tokens-themed.json';
export type DesignTokensThemed = keyof typeof designTokensThemed;
export type DesignTokensBase = keyof typeof designTokensBase;
export type DesignTokens = DesignTokensThemed | DesignTokensBase;
export type DesignTokensColors = {
    [K in DesignTokensThemed]: K extends `echoes-color-${string}` ? K : never;
}[DesignTokensThemed];
export type DesignTokensColorsIcons = {
    [K in DesignTokensThemed]: K extends `echoes-color-icon-${string}` | `echoes-severity-badge-colors-foreground-${string}-icon-${string}` | `echoes-logos-colors-brand` ? K : never;
}[DesignTokensThemed];
export type DesignTokensColorsText = {
    [K in DesignTokensThemed]: K extends `echoes-color-text-${string}` ? K : never;
}[DesignTokensThemed];
export type WithoutEchoesPrefix<T> = T extends `echoes-${infer P}` ? P : never;
//# sourceMappingURL=design-tokens.d.ts.map