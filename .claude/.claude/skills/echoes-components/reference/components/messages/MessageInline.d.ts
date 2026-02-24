import { MessageInlineSize, MessageVariety } from './MessageTypes';
export interface MessageInlineProps {
    as?: 'div' | 'span';
    className?: string;
    id?: string;
    screenReaderPrefix?: string;
    size?: `${MessageInlineSize}`;
    variety: `${MessageVariety}`;
}
export declare const MessageInline: import('../../../node_modules/react').ForwardRefExoticComponent<MessageInlineProps & {
    children?: import('../../../node_modules/react').ReactNode | undefined;
} & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MessageInline.d.ts.map