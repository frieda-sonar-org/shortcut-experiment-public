import { ButtonAsButtonProps } from '../buttons/Button';
import { RatingBadgeProps } from './RatingBadge';
/**
 * Props for the RatingBadgeButton component.
 * Combines button click functionality with all RatingBadge properties.
 */
export type RatingBadgeButtonProps = Pick<ButtonAsButtonProps, 'onClick'> & RatingBadgeProps;
/**
 * An interactive button version of the RatingBadge component.
 */
export declare const RatingBadgeButton: import('../../../node_modules/react').ForwardRefExoticComponent<Pick<ButtonAsButtonProps, "onClick"> & RatingBadgeProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=RatingBadgeButton.d.ts.map