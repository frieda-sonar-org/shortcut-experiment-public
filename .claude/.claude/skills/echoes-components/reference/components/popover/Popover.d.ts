import { ReactElement, ReactNode } from '../../../node_modules/react';
import { TextNodeOptional } from '../../types/utils';
export declare enum PopoverAlign {
    Start = "start",
    Center = "center",
    End = "end"
}
export declare enum PopoverSide {
    Top = "top",
    Right = "right",
    Bottom = "bottom",
    Left = "left"
}
export interface PopoverProps {
    align?: `${PopoverAlign}`;
    children: ReactElement;
    description?: TextNodeOptional;
    extraContent?: ReactNode;
    footer?: ReactNode;
    isOpen?: boolean;
    side?: `${PopoverSide}`;
    title?: TextNodeOptional;
}
/**
 * **Popovers must be attached to a button to be accessible.**
 *
 * ### Stacking Context
 *
 * In order to have popovers appear above the rest of the UI, it is probably necessary to have a [Stacking Context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context) for your app. This means the root should define a new one, or be wrapped in a component that does it.
 *
 * The easiest way to start a new Stacking Context is to provide it with the following CSS properties:
 *
 * ```CSS
 *   position: relative;
 *   z-index: 0;
 * ```
 *
 * Since the popovers are appended to the body, they are in the root Stacking Context. If other elements are also there, the z-index will determine which appears on top. By creating a new Stacking Context for your app, it ensures that z-indexed elements will stay within that context, while popovers will be painted on top, in the parent Stacking Context.
 */
export declare const Popover: import('../../../node_modules/react').ForwardRefExoticComponent<PopoverProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Popover.d.ts.map