import { ReactNode } from '../../../node_modules/react';
export declare enum FormFooterSide {
    Right = "right",
    Left = "left"
}
export interface FormFooterProps {
    /**
     * Buttons to display at the bottom of the Form. They are wrapped in a `ButtonGroup` and aligned to
     * the left of the Form by default.
     */
    children: ReactNode;
    className?: string;
    /**
     * Change the alignment of the buttons to the right or left side of the form (optional)
     */
    side?: `${FormFooterSide}`;
}
export declare const FormFooter: import('../../../node_modules/react').ForwardRefExoticComponent<FormFooterProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FormFooter.d.ts.map