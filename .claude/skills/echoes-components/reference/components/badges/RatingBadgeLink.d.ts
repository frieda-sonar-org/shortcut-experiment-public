import { LinkBaseProps } from '../links/LinkTypes';
import { RatingBadgeProps } from './RatingBadge';
/**
 * Props for the RatingBadgeLink component.
 * Combines link functionality with all RatingBadge properties.
 */
export type RatingBadgeLinkProps = Omit<LinkBaseProps, 'children' | 'highlight'> & RatingBadgeProps;
/**
 * A link version of the RatingBadge component.
 */
export declare const RatingBadgeLink: import('../../../node_modules/react').ForwardRefExoticComponent<Omit<LinkBaseProps, "children" | "highlight"> & RatingBadgeProps & import('../../../node_modules/react').RefAttributes<HTMLAnchorElement>>;
//# sourceMappingURL=RatingBadgeLink.d.ts.map