import { ReactNode } from '../../../node_modules/react';
import { TextNodeOptional } from '../../types/utils';
import { HeadingProps } from '../typography';
export interface FormSectionProps {
    className?: string;
    /**
     * Any number of form controls. The available form control elements are `CheckboxGroup`,
     * `RadioButtonGroup`, `Select`, `Textarea`, and `TextInput`.
     */
    children: ReactNode;
    /**
     * Optional description to display below the section title. It's automatically wrapped in a
     * `<Text>` component.
     */
    description?: TextNodeOptional;
    /**
     * The ID of the section. If not provided, a unique ID will be generated.
     */
    id?: string;
    /**
     * Optional title to be displayed at the top of the section. It's automatically wrapped in a
     * `<Heading as="h3">` component.
     */
    title?: TextNodeOptional;
    /**
     * The HTML element to use for the section title. Defaults to `h3`. (optional)
     */
    titleAs?: HeadingProps['as'];
    /**
     * The size of the title. Defaults to h3 default size. (optional)
     */
    titleSize?: HeadingProps['size'];
}
export declare const FormSection: import('../../../node_modules/react').ForwardRefExoticComponent<FormSectionProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FormSection.d.ts.map