import { InputHTMLAttributes } from '../../../node_modules/react';
import { TextNodeOptional } from '../../types/utils';
import { ValidationProps, FormFieldProps } from '../form/FormField';
type InputEventAttributesSubset = 'onFocus' | 'onBlur' | 'onChange' | 'onInvalid' | 'onKeyDown' | 'onKeyPress' | 'onKeyUp' | 'onMouseEnter' | 'onMouseLeave' | 'onPointerEnter' | 'onPointerLeave';
export type InputEventProps<T> = Pick<InputHTMLAttributes<T>, InputEventAttributesSubset>;
type FormFieldPropsSubset = Pick<FormFieldProps, 'helpToggletipProps' | 'isRequired' | 'width'>;
export interface InputProps extends ValidationProps, FormFieldPropsSubset {
    className?: string;
    helpText?: TextNodeOptional;
    isDisabled?: boolean;
    placeholder?: string;
    value?: string | number;
}
export declare const InputStyled: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
}, import('../../../node_modules/react').DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, {}>;
export declare const InputWrapper: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
}, import('../../../node_modules/react').DetailedHTMLProps<import('../../../node_modules/react').HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const InputPrefix: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
} & import('../../../node_modules/react').ClassAttributes<HTMLSpanElement> & import('../../../node_modules/react').HTMLAttributes<HTMLSpanElement> & {
    theme?: import('@emotion/react').Theme;
}, {}, {}>;
export declare const InputSuffix: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
} & import('../../../node_modules/react').ClassAttributes<HTMLSpanElement> & import('../../../node_modules/react').HTMLAttributes<HTMLSpanElement> & {
    theme?: import('@emotion/react').Theme;
}, {}, {}>;
export {};
//# sourceMappingURL=TextInputBase.d.ts.map