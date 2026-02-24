import { ReactNode } from '../../../node_modules/react';
import { TextNode, TextNodeOptional } from '../../types/utils';
import { ModalCommonProps } from './ModalTypes';
interface BaseProps {
    /** A mandatory accessible description to be announced when the ModalAlert is opened. */
    description: TextNode;
    primaryButton: ReactNode;
}
interface WithSecondaryButton extends BaseProps {
    secondaryButton?: ReactNode;
    secondaryButtonLabel?: never;
}
interface WithSecondaryButtonLabel extends BaseProps {
    secondaryButton?: never;
    secondaryButtonLabel?: TextNodeOptional;
}
export type ModalAlertProps = ModalCommonProps & (WithSecondaryButton | WithSecondaryButtonLabel);
export declare const ModalAlert: import('../../../node_modules/react').ForwardRefExoticComponent<ModalAlertProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=ModalAlert.d.ts.map