import { InputHTMLAttributes, ReactNode } from '../../../node_modules/react';
import { PropsWithLabels } from '../../types/utils';
import { InputEventProps, InputProps } from './TextInputBase';
type InputAttributes = Pick<InputHTMLAttributes<HTMLInputElement>, 'autoComplete' | 'autoFocus' | 'dir' | 'form' | 'max' | 'min' | 'maxLength' | 'minLength' | 'name' | 'pattern' | 'readOnly' | 'step'>;
interface TextInputPropsBase extends InputProps, InputAttributes, InputEventProps<HTMLInputElement> {
    prefix?: ReactNode;
    suffix?: ReactNode;
    type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
}
export type TextInputProps = PropsWithLabels<TextInputPropsBase>;
export declare const TextInput: import('../../../node_modules/react').ForwardRefExoticComponent<TextInputProps & import('../../../node_modules/react').RefAttributes<HTMLInputElement>>;
export {};
//# sourceMappingURL=TextInput.d.ts.map