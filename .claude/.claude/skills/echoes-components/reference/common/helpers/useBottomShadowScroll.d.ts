import { RefObject } from '../../../node_modules/react';
/**
 * Custom hook to manage the visibility of a bottom shadow on a scrollable container.
 * The shadow indicates that there is more content to scroll to.
 * @param scrollableContainerRef - Ref to the scrollable container element, its height and scroll event are monitored to recompute the shadow
 * @param resizableContentRef - Ref to the resizable content element inside the scrollable container, its height is monitored to recompute the shadow
 * @returns {boolean} Whether the bottom shadow should be shown
 */
export declare function useBottomShadowScroll(scrollableContainerRef: RefObject<HTMLElement>, resizableContentRef: RefObject<HTMLElement>): readonly [boolean];
export declare const BottomShadowScroll: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
}, import('../../../node_modules/react').DetailedHTMLProps<import('../../../node_modules/react').HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
//# sourceMappingURL=useBottomShadowScroll.d.ts.map