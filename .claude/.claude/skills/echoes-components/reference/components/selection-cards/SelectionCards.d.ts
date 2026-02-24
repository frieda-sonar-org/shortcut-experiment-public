import { PropsAriaLabel, PropsAriaLabelledBy } from '../../types/utils';
import { RadioButtonGroupProps, RadioOption } from '../radio-button-group/RadioButtonTypes';
export type SelectionCardOption = RadioOption & {
    /**
     * Illustration to display at the top (optional)
     */
    illustration?: React.ReactNode;
};
interface BaseProps extends Pick<RadioButtonGroupProps, 'alignment' | 'className' | 'isDisabled' | 'onChange' | 'value'> {
    /**
     * Callback fired when the selected card changes.
     *
     * @param value - The value of the newly selected card.
     */
    onChange: (value: string) => void;
    /**
     * Array of options to display as Cards.
     */
    options: SelectionCardOption[];
    /**
     * The currently selected value (controlled).
     */
    value: string;
}
export type SelectionCardsProps = BaseProps & (PropsAriaLabel | PropsAriaLabelledBy);
/**
 * This component works like Radio Buttons, but isn't meant for forms.
 * It shows a card for each option.
 *
 * Example:
 *
 * ```
 *  <SelectionCards
 *    alignment: GroupAlignment.Horizontal,
 *    ariaLabel: 'Choose your favorite number',
 *    onChange: setFavoriteNumber
 *    options: [
 *      { label: 'One', value: '1' },
 *      { label: 'Two', value: '2' },
 *      { label: 'Three', value: '3' },
 *    ],
 *    value: favoriteNumber
 *  />
 * ```
 */
export declare const SelectionCards: import('../../../node_modules/react').ForwardRefExoticComponent<SelectionCardsProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=SelectionCards.d.ts.map