import { ReactNode } from '../../../node_modules/react';
import { TextNodeOptional } from '../../types/utils';
import { ModalCommonProps, ModalSize } from './ModalTypes';
interface ModalBaseProps {
    /** An optional accessible description to be announced when the dialog is opened. */
    description?: TextNodeOptional;
    footerLink?: ReactNode;
    primaryButton?: ReactNode;
    secondaryButton?: ReactNode;
    size?: `${ModalSize}`;
}
export type ModalProps = ModalCommonProps & ModalBaseProps;
export declare const Modal: import('../../../node_modules/react').ForwardRefExoticComponent<ModalProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=Modal.d.ts.map