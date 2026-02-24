import { default as React } from '../../../node_modules/react';
import { CardSize } from './CardSize';
export interface CardProps {
    children: React.ReactNode;
    className?: string;
    size?: `${CardSize}`;
}
export declare function useCardSize(): "medium" | "small" | "large";
export declare const CardRoot: React.ForwardRefExoticComponent<Readonly<CardProps> & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CardRoot.d.ts.map