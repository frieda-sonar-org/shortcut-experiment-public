import { TextNode } from '../../types/utils';
import { ToggleTipProps } from '../toggle-tip';
import { TableCellJustify, TableSortDirection } from './TableTypes';
export interface TableColumnHeaderCellProps {
    className?: string;
    justify?: `${TableCellJustify}`;
    label?: TextNode;
    onSort?: () => void;
    sortDirection?: `${TableSortDirection}`;
    toggleTip?: ToggleTipProps;
}
export declare const TableColumnHeaderCell: import('../../../node_modules/react').ForwardRefExoticComponent<TableColumnHeaderCellProps & import('../../../node_modules/react').RefAttributes<HTMLTableCellElement>>;
//# sourceMappingURL=TableColumnHeaderCell.d.ts.map