import { DesignTokens, DesignTokensBase, WithoutEchoesPrefix } from '../types/design-tokens';
export type EchoesDesignTokens = WithoutEchoesPrefix<DesignTokens>;
export type EchoesCSSVarString = `var(--echoes-${EchoesDesignTokens})`;
export type EchoesCSSVarStringWithFallback = `var(--echoes-${EchoesDesignTokens}, ${string})`;
/**
 * Type-safe helper function to create CSS variable references for echoes design tokens.
 *
 * @param token - Design token name without the 'echoes-' prefix
 * @param fallback - Optional fallback value
 * @returns CSS variable string in the format: var(--echoes-{token}) or var(--echoes-{token}, {fallback})
 *
 * @example
 * ```tsx
 * // Basic usage
 * cssVar('dimension-height-600') // returns 'var(--echoes-dimension-height-600)'
 *
 * // With fallback
 * cssVar('dimension-height-600', '1.5rem') // returns 'var(--echoes-dimension-height-600, 1.5rem)'
 *
 * // In styled components
 * const Wrapper = styled.div`
 *   height: ${cssVar('dimension-height-600')};
 *   background: ${cssVar('color-background-accent-default')};
 * `;
 *
 * // In styled components with object syntax
 * const Wrapper = styled.div({
 *   height: cssVar('dimension-height-600'),
 *   background: cssVar('color-background-accent-default'),
 * });
 * ```
 */
export declare function cssVar(token: EchoesDesignTokens): EchoesCSSVarString;
export declare function cssVar(token: EchoesDesignTokens, fallback: string): EchoesCSSVarStringWithFallback;
export type EchoesBaseDesignTokens = WithoutEchoesPrefix<DesignTokensBase>;
/**
 * Get the string value of a base Echoes design token.
 *
 * @param token - The design token to retrieve the value for.
 * @returns The value of the design token as a string.
 */
export declare function designToken(token: EchoesBaseDesignTokens): string;
//# sourceMappingURL=design-tokens.d.ts.map