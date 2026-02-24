import { FormEvent } from '../../../node_modules/react';
import { TextNodeOptional } from '../../types/utils';
import { FormHeaderProps, FormRootProps } from '../form';
import { ModalProps } from './Modal';
import { ModalAlertProps } from './ModalAlert';
type ExcludedModalProps = 'content' | 'isOpen' | 'onOpenChange' | 'primaryButton' | 'secondaryButton';
type FormRootPropsSubset = Omit<FormRootProps, 'children' | 'onSubmit'>;
interface ModalFormBaseProps extends FormRootPropsSubset {
    /**
     * The content of the `Form`, can contain multiple `Form.Section` with their fields
     */
    content: FormRootProps['children'];
    /**
     * Optional content to display under the title/description, can be anything.
     */
    extraContent?: FormHeaderProps['extraContent'];
    /**
     * Whether the submit button should be disabled. If true, the submit button will be disabled.
     */
    isSubmitDisabled?: boolean;
    /**
     * Whether the form is currently submitting. If true, the submit button will be disabled and show a loading spinner.
     */
    isSubmitting?: boolean;
    /**
     * Callback to be called when the form submit event is triggered. If the callback returns a Promise, the modal will
     * only close when the promise is resolved.
     */
    onSubmit?: (event: FormEvent<HTMLFormElement>) => Promise<any> | void;
    /**
     * Allows to override the default text of the secondary button.
     */
    secondaryButtonLabel?: TextNodeOptional;
    /**
     * Allows to override the default text of the submit button.
     */
    submitButtonLabel?: TextNodeOptional;
}
interface ModalPropsSubset extends Omit<ModalProps, ExcludedModalProps> {
    isDestructive?: never;
}
interface ModalAlertPropsSubset extends Omit<ModalAlertProps, ExcludedModalProps> {
    /**
     * Switch from a Modal to a ModalAlert with a destructive action using a ButtonVariety.Danger primary button.
     */
    isDestructive: true;
}
export type ModalFormProps = ModalFormBaseProps & (ModalPropsSubset | ModalAlertPropsSubset);
/**
 * {@link ModalForm} is a helper component that wraps a {@link Form} component inside a {@link Modal}
 * component and simplify usage of forms inside modals.
 *
 * **Key points**
 *
 * Modal submitting forms need to be controlled by the parent to avoid having the modal close before the
 * form submission is completed. The ModalForm handles that for you.
 *
 * It also ties together the form and the submit/reset buttons of the modal.
 *
 * **Permitted Content**
 *
 * A Fragment with as many {@link Form.Section} as your form needs.
 *
 * **Example**
 *
 * ```tsx
 *  <ModalForm method="POST" onSubmit={onSubmit} title="Form title">
 *    <Form.Section>
 *      ...
 *    </Form.Section>
 *  </ModalForm>
 * ```
 */
export declare const ModalForm: import('../../../node_modules/react').ForwardRefExoticComponent<ModalFormProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=ModalForm.d.ts.map