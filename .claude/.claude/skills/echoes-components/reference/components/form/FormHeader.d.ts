import { ReactNode } from '../../../node_modules/react';
import { TextNode, TextNodeOptional } from '../../types/utils';
import { HeadingProps } from '../typography';
export interface FormHeaderProps {
    className?: string;
    /**
     * Optional description to display below the title. It's automatically wrapped in a `<Text>` component.
     */
    description?: TextNodeOptional;
    /**
     * Optional content to display under the title/description, can be anything.
     */
    extraContent?: ReactNode;
    /**
     * Title to display at the top of the Form. It's automatically wrapped in a `<Heading as="h2">` component.
     */
    title: TextNode;
    /**
     * The HTML element to use for the title. Defaults to `h2`. (optional)
     */
    titleAs?: HeadingProps['as'];
    /**
     * The size of the title. Defaults to h2 default size. (optional)
     */
    titleSize?: HeadingProps['size'];
}
export declare const FormHeader: import('../../../node_modules/react').ForwardRefExoticComponent<FormHeaderProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FormHeader.d.ts.map