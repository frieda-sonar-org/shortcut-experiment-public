export interface PaginationProps {
    /**
     * Forwarded to all the buttons
     */
    isDisabled?: boolean;
    /**
     * Callback triggered when a button is clicked.
     *
     * @param targetPage The page requested
     */
    onChange: (targetPage: number) => void;
    /**
     * The current page. Bounds are `[1, totalPages]`, inclusive.
     */
    page: number;
    /**
     * The total number of pages
     */
    totalPages: number;
}
//# sourceMappingURL=PaginationTypes.d.ts.map