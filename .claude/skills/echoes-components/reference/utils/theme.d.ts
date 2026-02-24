import { PropsWithChildren } from '../../node_modules/react';
import { Theme } from '../generated/themes';
export declare const THEME_DATA_ATTRIBUTE = "data-echoes-theme";
export declare function setTheme(theme: `${Theme}`): void;
export interface ThemeProviderProps {
    asChild?: boolean;
    theme: `${Theme}`;
}
export declare function ThemeProvider({ asChild, theme, ...props }: PropsWithChildren<ThemeProviderProps>): import("@emotion/react/jsx-runtime").JSX.Element;
export declare namespace ThemeProvider {
    var displayName: string;
}
export declare const ThemeContext: import('../../node_modules/react').Context<"light" | "dark" | undefined>;
//# sourceMappingURL=theme.d.ts.map