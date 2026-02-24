export { type TableCellBadgeProps } from './TableCellBadge';
export { type TableCellButtonProps } from './TableCellButton';
export { type TableCellButtonIconProps } from './TableCellButtonIcon';
export { type TableCellCheckboxProps } from './TableCellCheckbox';
export { type TableCellLinkProps } from './TableCellLink';
export { type TableCellNumberProps } from './TableCellNumber';
export { type TableCellTextProps } from './TableCellText';
export { type TableColumnHeaderCellProps } from './TableColumnHeaderCell';
export { type TableColumnHeaderCellCheckboxProps } from './TableColumnHeaderCellCheckbox';
export { type TableRowProps } from './TableRow';
export { TableVariety, TableCellJustify, type TableBaseProps, type TableProps } from './TableTypes';
/**
 * {@link TableRoot | Table}
 *
 * The main Table component for Echoes React.
 *
 * This component provides a composable and accessible table structure with a variety of subcomponents
 * for building complex tables. It exposes several specialized cell and header components.
 *
 * It uses CSS grid for its layout, and thus requires the gridTemplate definition.
 * See the {@link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns | MDN Documentation} for more.
 *
 * **Permitted Content**
 *
 * - `Table.Header`: The table header section.
 * - `Table.Body`: The table body section.
 * - `Table.Row`: A row within the table.
 * - `Table.RowHeaderCell`: A header cell for a row.
 * - `Table.ColumnHeaderCell`: A header cell for a column.
 * - `Table.Cell`: A plain table cell for custom content.
 * - `Table.CellText`: A cell for displaying text.
 * - `Table.CellNumber`: A cell for displaying numbers.
 * - `Table.CellLink`: A cell for displaying links.
 * - `Table.CellButton`: A cell for displaying buttons.
 * - `Table.CellBadge`: A cell for displaying badges.
 * - `Table.CellCheckbox`: A cell for displaying checkboxes.
 * - `Table.ColumnHeaderCellCheckbox`: A header cell for a checkbox column.
 *
 * **example**
 *
 * ```tsx
 * <Table gridTemplate='min-content 1fr auto'>
 *   <Table.Header>
 *     <Table.Row>
 *       <Table.ColumnHeaderCellCheckbox />
 *       <Table.ColumnHeaderCell>Project</Table.ColumnHeaderCell>
 *       <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
 *     </Table.Row>
 *   </Table.Header>
 *   <Table.Body>
 *     <Table.Row>
 *       <Table.CellCheckbox checked={true} />
 *       <Table.CellText>Echoes</Table.CellText>
 *       <Table.CellBadge status="success">Active</Table.CellBadge>
 *     </Table.Row>
 *   </Table.Body>
 * </Table>
 * ```
 *
 * **remarks**
 *
 * Use the specialized cell components (`CellText`, `CellNumber`, etc.) for consistent styling and accessibility.
 * The plain `Cell` component is provided as an escape hatch for custom content and should be used sparingly.
 *
 */
export declare const Table: import('../../../node_modules/react').ForwardRefExoticComponent<(Omit<import('./TableTypes').TablePropsWithLabel, "ref"> | Omit<import('./TableTypes').TablePropsWithLabeledBy, "ref">) & import('../../../node_modules/react').RefAttributes<HTMLTableElement>> & {
    /**
     * {@link StyledTableHeader | Table.Header}
     *
     * This is the table header section. It is required!
     */
    Header: import('@emotion/styled').StyledComponent<{
        theme?: import('@emotion/react').Theme;
        as?: React.ElementType;
    }, import('../../../node_modules/react').DetailedHTMLProps<import('../../../node_modules/react').HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, {}>;
    /**
     * {@link StyledTableBody | Table.Body}
     *
     * This is the table body section. It is required!
     */
    Body: import('@emotion/styled').StyledComponent<{
        theme?: import('@emotion/react').Theme;
        as?: React.ElementType;
    }, import('../../../node_modules/react').DetailedHTMLProps<import('../../../node_modules/react').HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, {}>;
    /**
     * {@link TableRow | Table.Row}
     *
     * This is a table row. Wrap your cells in it.
     * You can make it selectable by defining the `selected` prop as well as adding a {@link TableCellCheckbox | Table.CellCheckbox}.
     */
    Row: import('../../../node_modules/react').ForwardRefExoticComponent<Omit<import('./TableRow').TableRowProps, "ref"> & import('../../../node_modules/react').RefAttributes<HTMLTableRowElement>>;
    /**
     * {@link TableRowHeaderCell | Table.RowHeaderCell}
     *
     * This is a table row header cell. It must have a label or an aria-label.
     * Each row should have a header cell to identify the item represented in that row.
     * This will typically be a name, or identifier.
     */
    RowHeaderCell: import('../../../node_modules/react').ForwardRefExoticComponent<import('./TableCellText').TableCellTextProps & import('../../../node_modules/react').RefAttributes<HTMLTableCellElement>>;
    /**
     * {@link TableColumnHeaderCell | Table.ColumnHeaderCell}
     *
     * This is a table column header cell. It must have a label or an aria-label.
     * It may have a toggletip to describe its purpose.
     *
     * ** Sortable **
     * Providing an `onSort` callback will turn this cell's contents into a button.
     * The sorting mechanism must be implemented by you, but providing the sort order will
     * automatically add an indicator and relevant aria attribute to the header.
     *
     */
    ColumnHeaderCell: import('../../../node_modules/react').ForwardRefExoticComponent<import('./TableColumnHeaderCell').TableColumnHeaderCellProps & import('../../../node_modules/react').RefAttributes<HTMLTableCellElement>>;
    /**
     * {@link StyledTableCell | Table.Cell}
     *
     * This is a plain cell:
     * it serves as an escape hatch if you need a cell with custom content
     *
     * Only use this as a last resort!
     */
    Cell: import('@emotion/styled').StyledComponent<{
        theme?: import('@emotion/react').Theme;
        as?: React.ElementType;
    }, import('../../../node_modules/react').DetailedHTMLProps<import('../../../node_modules/react').TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>, {}>;
    /**
     * {@link TableCellText | Table.CellText}
     *
     * This is a simple cell to display text.
     */
    CellText: import('../../../node_modules/react').ForwardRefExoticComponent<import('./TableCellText').TableCellTextProps & import('../../../node_modules/react').RefAttributes<HTMLTableCellElement>>;
    /**
     * {@link TableCellNumber | Table.CellNumber}
     *
     * This is a cell to display a number.
     */
    CellNumber: import('../../../node_modules/react').ForwardRefExoticComponent<import('./TableCellNumber').TableCellNumberProps & import('../../../node_modules/react').RefAttributes<HTMLTableCellElement>>;
    /**
     * {@link TableCellLink | Table.CellLink}
     *
     * This is a cell to display a Link. You may wrap it in a Tooltip if necessary: the Tootlip will be attached to the Link in the cell.
     */
    CellLink: import('../../../node_modules/react').ForwardRefExoticComponent<import('./TableCellLink').TableCellLinkProps & import('../../../node_modules/react').RefAttributes<HTMLAnchorElement>>;
    /**
     * {@link TableCellButton | Table.CellButton}
     *
     * This is a cell to display a Button. You may use it as a trigger (Dropdown, Tooltip, Popover, ...).
     */
    CellButton: import('../../../node_modules/react').ForwardRefExoticComponent<import('./TableCellButton').TableCellButtonProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    /**
     * {@link TableCellButtonIcon | Table.CellButtonIcon}
     *
     * This is a cell to display a ButtonIcon. You may use it as a trigger (Dropdown, Tooltip, Popover, ...).
     */
    CellButtonIcon: import('../../../node_modules/react').ForwardRefExoticComponent<import('./TableCellButtonIcon').TableCellButtonIconProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    /**
     * {@link TableCellBadge | Table.CellBadge}
     *
     * This is a cell to display a Badge. You can make it `isInteractive` and wrap it in a Popover like a regular badge.
     */
    CellBadge: import('../../../node_modules/react').ForwardRefExoticComponent<import('./TableCellBadge').TableCellBadgeProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    /**
     * {@link TableCellCheckbox | Table.CellCheckbox}
     *
     * This is a cell to display a Checkbox. Primarily used for selectable rows.
     */
    CellCheckbox: import('../../../node_modules/react').ForwardRefExoticComponent<import('./TableCellCheckbox').TableCellCheckboxProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
    /**
     * {@link TableColumnHeaderCellCheckbox | Table.ColumnHeaderCellCheckbox}
     *
     * This is a header cell for the checkbox column.
     */
    ColumnHeaderCellCheckbox: import('../../../node_modules/react').ForwardRefExoticComponent<import('./TableColumnHeaderCellCheckbox').TableColumnHeaderCellCheckboxProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
};
//# sourceMappingURL=index.d.ts.map