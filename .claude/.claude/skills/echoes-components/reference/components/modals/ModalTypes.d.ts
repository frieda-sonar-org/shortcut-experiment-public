import { ReactNode } from '../../../node_modules/react';
import { TextNodeOptional } from '../../types/utils';
export declare enum ModalSize {
    Default = "default",
    Wide = "wide"
}
interface CommonProps {
    /**
     * Interactive element that triggers the display of the Dialog.
     * It should forward it's ref and props to the DOM.
     */
    children?: ReactNode;
    /**
     * Main content of the dialog, won't be automatically announced.
     * Optional since a dialog could have only the title and description.
     */
    content?: ReactNode;
    /**
     * Force the dialog to be open by default.
     */
    isDefaultOpen?: boolean;
    /**
     * Callback function triggered when the dialog is closed.
     */
    onClose?: VoidFunction;
    /** An accessible title to be announced when the dialog is opened. */
    title?: TextNodeOptional;
}
interface UncontrolledProps extends CommonProps {
    isOpen?: never;
    onOpenChange?: never;
}
interface ControlledProps extends CommonProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}
export type ModalCommonProps = UncontrolledProps | ControlledProps;
export {};
//# sourceMappingURL=ModalTypes.d.ts.map