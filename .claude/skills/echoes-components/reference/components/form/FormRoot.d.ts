import { FormHTMLAttributes, ReactNode } from '../../../node_modules/react';
type FormAttributesSubset = 'action' | 'className' | 'id' | 'method' | 'name' | 'onReset' | 'onSubmit' | 'onInvalid' | 'target';
type FormAttributes = Pick<FormHTMLAttributes<HTMLFormElement>, FormAttributesSubset>;
export interface FormRootProps extends FormAttributes {
    /**
     * The content of the `Form`, only one mandatory `Form.Header`, multiple `Form.Section`
     * and one mandatory `Form.Footer` are allowed.
     */
    children: ReactNode;
    /**
     * `noValidate` attribute is added by default on the form to not use the browser form validation.
     * Set this prop to `true` to remove the `noValidate` attribute.
     */
    enableBrowserValidation?: boolean;
}
export declare const FormRoot: import('../../../node_modules/react').ForwardRefExoticComponent<FormRootProps & import('../../../node_modules/react').RefAttributes<HTMLFormElement>>;
export {};
//# sourceMappingURL=FormRoot.d.ts.map