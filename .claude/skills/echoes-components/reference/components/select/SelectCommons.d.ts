import { SelectProps as MantineSelectProps } from '@mantine/core';
import { PropsWithLabels, TextNodeOptional } from '../../types/utils';
import { ValidationProps, FormFieldProps } from '../form/FormField';
import { OptionComponent } from './SelectItemCommons';
import { SelectData, SelectHighlight, SelectOption, SelectOptionType } from './SelectTypes';
import { SelectFilterFunction } from './useSelectOptionFilter';
type FormFieldPropsSubset = Pick<FormFieldProps, 'helpToggletipProps' | 'width'>;
export interface SelectBaseProps extends ValidationProps, FormFieldPropsSubset {
    className?: string;
    data: SelectData;
    defaultValue?: MantineSelectProps['defaultValue'];
    filter?: SelectFilterFunction;
    hasDropdownAutoWidth?: boolean;
    helpText?: TextNodeOptional;
    highlight?: `${SelectHighlight}`;
    isDisabled?: boolean;
    isLoading?: boolean;
    isNotClearable?: boolean;
    isSearchable?: boolean;
    isRequired?: boolean;
    labelNotFound?: MantineSelectProps['nothingFoundMessage'];
    limit?: MantineSelectProps['limit'];
    name?: MantineSelectProps['name'];
    optionComponent?: OptionComponent;
    optionType?: `${SelectOptionType}`;
    onChange: (value: string | null, option: SelectOption) => void;
    onOpen?: MantineSelectProps['onDropdownOpen'];
    onSearch?: MantineSelectProps['onSearchChange'];
    placeholder?: MantineSelectProps['placeholder'];
    value: MantineSelectProps['value'];
    valueIcon?: MantineSelectProps['leftSection'];
}
export declare const SelectBase: import('../../../node_modules/react').ForwardRefExoticComponent<PropsWithLabels<SelectBaseProps> & import('../../../node_modules/react').RefAttributes<HTMLInputElement>>;
export declare const SelectStyled: import('@emotion/styled').StyledComponent<MantineSelectProps & import('../../../node_modules/react').RefAttributes<HTMLInputElement> & {
    component?: any;
    renderRoot?: (props: Record<string, any>) => React.ReactNode;
} & {
    theme?: import('@emotion/react').Theme;
}, {}, {}>;
export declare function SelectGlobalStyles(): import("@emotion/react/jsx-runtime").JSX.Element;
interface SelectRightSectionProps extends Pick<SelectBaseProps, 'isLoading'> {
    hasValue: boolean;
    isClearable: boolean;
}
export declare function getSelectRightSection(props: Readonly<SelectRightSectionProps>): import("@emotion/react/jsx-runtime").JSX.Element | undefined;
export {};
//# sourceMappingURL=SelectCommons.d.ts.map