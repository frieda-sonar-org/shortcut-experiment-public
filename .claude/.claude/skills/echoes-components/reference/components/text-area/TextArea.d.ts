import { InputHTMLAttributes } from '../../../node_modules/react';
import { PropsWithLabels } from '../../types/utils';
import { InputEventProps, InputProps } from '../text-input/TextInputBase';
type InputAttributes = Pick<InputHTMLAttributes<HTMLTextAreaElement>, 'autoComplete' | 'autoFocus' | 'form' | 'maxLength' | 'minLength' | 'name' | 'readOnly'>;
interface TextAreaPropsBase extends InputProps, InputAttributes, InputEventProps<HTMLTextAreaElement> {
    isResizable?: boolean;
    rows?: number;
}
export type TextAreaProps = PropsWithLabels<TextAreaPropsBase>;
export declare const TextArea: import('../../../node_modules/react').ForwardRefExoticComponent<TextAreaProps & import('../../../node_modules/react').RefAttributes<HTMLTextAreaElement>>;
export {};
//# sourceMappingURL=TextArea.d.ts.map