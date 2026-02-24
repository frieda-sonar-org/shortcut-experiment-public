import { SelectOption } from './SelectTypes';
export interface SelectParsedOptionGroup {
    group: string;
    items: SelectOption[];
}
export type SelectParsedOption = SelectOption | SelectParsedOptionGroup;
export interface SelectFilterOptionsInput {
    options: SelectParsedOption[];
    search: string;
    limit: number;
}
export declare function isOptionsGroup(option: SelectParsedOption): option is SelectParsedOptionGroup;
export interface SelectFilterFunctionInput {
    option: SelectOption;
    search: string;
}
export declare function defaultSelectFilter({ option, search }: SelectFilterFunctionInput): boolean;
export type SelectFilterFunction = typeof defaultSelectFilter;
export declare function useSelectOptionFilter(filter?: SelectFilterFunction): ({ options, search, limit }: SelectFilterOptionsInput) => SelectParsedOption[];
//# sourceMappingURL=useSelectOptionFilter.d.ts.map