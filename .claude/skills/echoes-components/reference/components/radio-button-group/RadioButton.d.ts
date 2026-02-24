import { RadioOption } from './RadioButtonTypes';
interface InternalRadioButtonProps {
    groupId: string;
    hasError?: boolean;
}
export type RadioButtonProps = RadioOption & InternalRadioButtonProps;
/** Internal component, don't re-export in the index */
export declare function RadioButton(props: Readonly<RadioButtonProps>): import("@emotion/react/jsx-runtime").JSX.Element;
export declare namespace RadioButton {
    var displayName: string;
}
export {};
//# sourceMappingURL=RadioButton.d.ts.map