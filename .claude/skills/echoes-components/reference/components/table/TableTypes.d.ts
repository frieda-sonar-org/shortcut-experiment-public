import { ComponentProps, PropsWithChildren } from '../../../node_modules/react';
export declare enum TableVariety {
    Surface = "surface",
    Ghost = "ghost"
}
export declare enum TableCellJustify {
    Start = "start",
    Center = "center",
    End = "end"
}
export declare enum TableSortDirection {
    Asc = "asc",
    Desc = "desc"
}
export interface TableBaseProps extends PropsWithChildren<ComponentProps<'table'>> {
    className?: string;
    gridTemplate: string;
    variety?: `${TableVariety}`;
}
export interface TablePropsWithLabel extends TableBaseProps {
    ariaLabel: string;
    ariaLabelledBy?: never;
}
export interface TablePropsWithLabeledBy extends TableBaseProps {
    ariaLabel?: never;
    ariaLabelledBy: string;
}
export type TableProps = TablePropsWithLabel | TablePropsWithLabeledBy;
//# sourceMappingURL=TableTypes.d.ts.map