import { ReactNode } from '../../../node_modules/react';
export interface ButtonGroupProps {
    /**
     * Button components to be grouped together.
     * Should contain two or more Button or ButtonIcon components.
     */
    children: ReactNode;
    className?: string;
    /**
     * Whether buttons should be visually combined into a single unit (optional).
     * When true, buttons are connected with no gap and shared borders.
     * Default is false, showing buttons with standard spacing.
     */
    isCombined?: boolean;
}
/**
 * A container component that visually combines a group of buttons that are part of the same context,
 * like a set of actions that can be performed on the same element.
 * e.g. Submit and Cancel a modal. A button group can be used on modals, forms, cards, tables, etc...
 *
 * The ButtonGroup component provides two distinct grouping modes: standard spacing for
 * independent buttons, and combined mode where buttons are visually connected as a single
 * unit.
 *
 * **Permitted Content**
 *
 * Should contain Button or ButtonIcon components. The ButtonGroup automatically
 * handles the visual treatment of child buttons based on the selected mode.
 */
export declare const ButtonGroup: import('../../../node_modules/react').ForwardRefExoticComponent<Readonly<ButtonGroupProps> & import('../../../node_modules/react').RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=ButtonGroup.d.ts.map