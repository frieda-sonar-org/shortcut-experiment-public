export type { CardBodyProps } from './CardBody';
export type { CardHeaderProps } from './CardHeader';
export type { CardProps } from './CardRoot';
export { CardSize } from './CardSize';
/**
 * {@link CardRoot | Card} is a component for displaying content in a contained, styled container.
 * It provides a flexible card layout system.
 *
 * **Available sizes**
 * - SMALL: Compact card with minimal padding
 * - MEDIUM: Standard card size (default)
 * - LARGE: Expanded card with increased padding
 *
 * **Permitted Content**
 *
 * Exactly one {@link CardBody | Card.Body} component and optionally one
 * {@link CardHeader | Card.Header} component.
 *
 * **Example**
 *
 * ```tsx
 * <Card>
 *   <Card.Header>Card Title</Card.Header>
 *   <Card.Body>Card Content</Card.Body>
 * </Card>
 * ```
 *
 * **Example with size**
 *
 * ```tsx
 * <Card size={CardSize.LARGE}>
 *   <Card.Header>Large Card</Card.Header>
 *   <Card.Body>Content for a large card</Card.Body>
 * </Card>
 * ```
 *
 * **Example without header**
 *
 * ```tsx
 * <Card>
 *   <Card.Body>Card content without a header</Card.Body>
 * </Card>
 * ```
 */
export declare const Card: import('../../../node_modules/react').ForwardRefExoticComponent<Readonly<import('./CardRoot').CardProps> & import('../../../node_modules/react').RefAttributes<HTMLDivElement>> & {
    /**
     * {@link CardHeader | Card.Header} provides a consistently styled header section for the Card component.
     * Automatically inherits size context from parent Card component.
     *
     * **Props**
     * - `title`: React.ReactNode - Required title content
     * - `description?`: React.ReactNode - Optional description text below the title
     * - `hasDivider?`: boolean - When true, renders a divider below the header (default: false)
     * - `rightContent?`: React.ReactNode - Optional content to display on the right side
     * - `className?`: string - Optional CSS class name
     *
     * **Example with description and right content**
     *
     * ```tsx
     * <Card.Header
     *   title="Card Title"
     *   description="Additional information about this card"
     *   rightContent={<Button>Action</Button>}
     * />
     * ```
     *
     * **Example with divider**
     *
     * ```tsx
     * <Card.Header title="Card Title" hasDivider />
     * ```
     */
    Header: import('../../../node_modules/react').ForwardRefExoticComponent<Readonly<import('./CardHeader').CardHeaderProps> & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    /**
     * {@link CardBody | Card.Body} is the container for the main content of a Card.
     * Automatically inherits size context from parent Card component.
     *
     * **Props**
     * - `children`: React.ReactNode - Required content to display in the body
     * - `className?`: string - Optional CSS class name
     * - `insetContent?`: boolean - When true, removes padding from the body (default: false)
     *
     * **Example standard usage**
     *
     * ```tsx
     * <Card.Body>
     *   <p>This is the content of the card.</p>
     * </Card.Body>
     * ```
     *
     * **Example with inset content**
     *
     * ```tsx
     * <Card.Body insetContent>
     *   <div style={{ padding: '8px' }}>Custom padded content</div>
     * </Card.Body>
     * ```
     */
    Body: import('../../../node_modules/react').ForwardRefExoticComponent<Readonly<import('./CardBody').CardBodyProps> & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
};
//# sourceMappingURL=index.d.ts.map