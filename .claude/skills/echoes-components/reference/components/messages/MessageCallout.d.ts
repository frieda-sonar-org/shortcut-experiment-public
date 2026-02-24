import { PropsWithChildren, ReactNode } from '../../../node_modules/react';
import { MessageVariety } from './MessageTypes';
export interface MessageCalloutProps extends PropsWithChildren {
    action?: ReactNode;
    className?: string;
    onDismiss?: VoidFunction;
    screenReaderPrefix?: string;
    title?: string;
    variety: `${MessageVariety}`;
}
export declare const MessageCallout: import('../../../node_modules/react').ForwardRefExoticComponent<MessageCalloutProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MessageCallout.d.ts.map