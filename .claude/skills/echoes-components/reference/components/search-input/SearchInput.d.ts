import { InputHTMLAttributes } from '../../../node_modules/react';
import { InputEventProps } from '../text-input/TextInputBase';
type InputAttributes = Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'maxLength'>;
type SearchInputEventProps = Omit<InputEventProps<HTMLInputElement>, 'onChange'>;
/**
 * Available width options for SearchInput
 */
export declare enum SearchInputWidth {
    /**
     * Full width (100%) (default)
     */
    Full = "full",
    /**
     * Fixed width that matches FormFieldWidth.Medium
     */
    Medium = "medium",
    /**
     * Fixed width that matches FormFieldWidth.Large
     */
    Large = "large"
}
export interface SearchInputProps extends InputAttributes, SearchInputEventProps {
    /**
     * The ID of the element that describes the input field for accessibility (optional).
     */
    ariaDescribedBy?: string;
    /**
     * Custom aria-label for the input field, optional as by default the placeholderLabel value is used as the aria-label
     */
    ariaLabel?: string;
    /**
     * Add a `class` attribute to the root element (optional).
     */
    className?: string;
    /**
     * Whether the input should automatically receive focus when mounted, default to false
     */
    hasAutoFocus?: boolean;
    /**
     * Whether to prevent scrolling when focusing the input with auto-focus, default to false
     */
    hasPreventScroll?: boolean;
    /**
     * Whether the input is disabled and cannot be interacted with, default to false
     */
    isDisabled?: boolean;
    /**
     * Whether to show a loading spinner in the input suffix, default to false
     */
    isLoading?: boolean;
    /**
     * Minimum number of characters required for the search, will display a message if the input value is below this length
     * and the input is not empty (optional).
     */
    minLength?: number;
    /**
     * Custom label text to display for the minimum length requirement (optional).
     */
    minLengthLabel?: string;
    /**
     * Callback function called when the input value changes, this is mandatory, the SearchInput must be controlled.
     * It receives the new value as a string and is NOT debounced.
     * It is the responsibility of the parent component to handle debouncing if needed.
     * @param newValue - The new value of the input field.
     */
    onChange: (newValue: string) => void;
    /**
     * Custom placeholder text for the input field, acts as the SearchInput label when no aria-label is provided.
     * If `minLength` is defined, the placeholder will be appended with the minimum length label.
     */
    placeholderLabel?: string;
    /**
     * The current value of the search input, this is mandatory, the SearchInput must be controlled.
     * It should be a string that represents the current search query.
     */
    value: string;
    /**
     * The width of the input field. Can be either `full`, `medium`, or `large`.
     * Default is `full`.
     */
    width?: `${SearchInputWidth}`;
}
/**
 * A search input allows users to enter search queries with enhanced functionality
 * including auto-focus, loading states, clear functionality, and minimum length message display.
 *
 * The `SearchInput` is a controlled component that requires both `value` and `onChange` handler.
 * /!\ The `onChange` callback is NOT debounced - implement debouncing in the parent component if needed.
 *
 * **Permitted Content**
 *
 * None; it's a self-closing element.
 *
 * **Permitted Parents**
 *
 * Any element that accepts flow content.
 *
 * **Example**
 *
 * ```tsx
 * const [searchQuery, setSearchQuery] = useState('');
 *
 * <SearchInput
 *   value={searchQuery}
 *   onChange={setSearchQuery}
 *   width="full"
 * />
 * ```
 */
export declare const SearchInput: import('../../../node_modules/react').ForwardRefExoticComponent<SearchInputProps & import('../../../node_modules/react').RefAttributes<HTMLInputElement>>;
export {};
//# sourceMappingURL=SearchInput.d.ts.map