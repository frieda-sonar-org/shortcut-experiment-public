export { FormFieldValidation, FormFieldWidth } from './FormField';
export { FormFooterSide, type FormFooterProps } from './FormFooter';
export { type FormHeaderProps } from './FormHeader';
export { type FormRootProps } from './FormRoot';
export { type FormSectionProps } from './FormSection';
/**
 * {@link FormRoot | Form} is a form element that wrap {@link FormHeader | Form.Header},
 * {@link FormSection | Form.Section} and {@link FormFooter | Form.Footer}.
 * It provides a consistent layout for forms.
 *
 * **Permitted Content**
 *
 * Exactly one {@link FormHeader | Form.Header}, one {@link FormFooter | Form.Footer} and as many
 * {@link FormSection | Form.Section} as needed in between the header and footer.
 *
 * **Example**
 *
 * ```tsx
 *  <Form method="POST">
 *    <Form.Header title="Form title" />
 *    <Form.Section>
 *      ...
 *    </Form.Section>
 *    <Form.Section>
 *      ...
 *    </Form.Section>
 *    <Form.Footer>
 *      <Button type="reset">Cancel</Button>
 *      <Button type="submit" variety="primary">Confirm</Button>
 *    </Form.Footer>
 *  </Form>
 * ```
 */
export declare const Form: import('../../../node_modules/react').ForwardRefExoticComponent<import('./FormRoot').FormRootProps & import('../../../node_modules/react').RefAttributes<HTMLFormElement>> & {
    /**
     * {@link FormHeader | Form.Header} is used to display a title and optional description at the top of a form.
     */
    Header: import('../../../node_modules/react').ForwardRefExoticComponent<import('./FormHeader').FormHeaderProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    /**
     * {@link FormSection | Form.Section} is used to group related form controls together. It can have
     * a title and description and can contain multiple form controls.
     *
     * The available form control elements are `CheckboxGroup`, `RadioButtonGroup`, `Select`, `Textarea`,
     * and `TextInput`.
     */
    Section: import('../../../node_modules/react').ForwardRefExoticComponent<import('./FormSection').FormSectionProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    /**
     * {@link FormFooter | Form.Footer} is used to display a group of buttons at the bottom of the form.
     * The children should be `Button` components, they are automatically wrapped in a `ButtonGroup`.
     */
    Footer: import('../../../node_modules/react').ForwardRefExoticComponent<import('./FormFooter').FormFooterProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
};
//# sourceMappingURL=index.d.ts.map