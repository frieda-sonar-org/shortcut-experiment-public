import { ReactElement, ReactNode } from '../../../node_modules/react';
export declare enum TooltipAlign {
    Start = "start",
    Center = "center",
    End = "end"
}
export declare enum TooltipSide {
    Top = "top",
    Right = "right",
    Bottom = "bottom",
    Left = "left"
}
export interface TooltipProps {
    /**
     * The preferred alignment against the trigger. May change when collisions occur.
     * @default 'center'
     */
    align?: `${TooltipAlign}`;
    /**
     * The component that triggers the tooltip. It must be an interactive element to ensure the tooltip is accessible.
     *
     * It must be a single child element, so it can be wrapped by the tooltip trigger and should forward the ref
     * to it's underlying DOM element as well as the extra props.
     */
    children: ReactElement;
    /**
     * The content of the tooltip.
     * It can be a string or JSX.Element, in the case of a JSX.Element it should not be wrapped in
     * a `<Text>` component, the tooltip already handles the typography styling for you. You can use `<b>`,
     * `<strong>`, `<i>`, `<em>` and other typography HTML tags also supported in the `<Text>` component.
     */
    content: ReactNode;
    /**
     * Used to control/override the visibility of the tooltip, optional and not needed in most cases.
     */
    isOpen?: boolean;
    /**
     * The preferred side of the trigger to render against when open. Will be reversed when collisions occur.
     * @default 'top'
     */
    side?: `${TooltipSide}`;
}
/**
 * **Tooltips must be attached to an interactive element to be accessible.**
 * Using a non-interactive element is acceptable if the trigger element has an accessible label
 * (aria-label or aria-description) that contains the same information.
 *
 * ### Stacking Context
 *
 * In order to have tooltips appear above the rest of the UI, it is probably necessary to have a [Stacking Context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context) for your app. This means the root should define a new one, or be wrapped in a component that does it.
 *
 * The easiest way to start a new Stacking Context is to provide it with the following CSS properties:
 *
 * ```CSS
 *   isolation: isolate;
 *   position: relative;
 * ```
 *
 * Since the tooltips are appended to the body, they are in the root Stacking Context. If other elements are also there, the z-index will determine which appears on top. By creating a new Stacking Context for your app, it ensures that z-indexed elements will stay within that context, while tooltips will be painted on top, in the parent Stacking Context.
 */
export declare const Tooltip: import('../../../node_modules/react').ForwardRefExoticComponent<TooltipProps & import('../../../node_modules/react').RefAttributes<HTMLElement>>;
//# sourceMappingURL=Tooltip.d.ts.map