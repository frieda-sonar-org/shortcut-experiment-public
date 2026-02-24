import { ComboboxLikeRenderOptionInput } from '@mantine/core';
import { ComponentType } from '../../../node_modules/react';
import { SelectOption, SelectOptionType } from './SelectTypes';
export type RenderOptionParams = ComboboxLikeRenderOptionInput<SelectOption>;
export type OptionComponent = ComponentType<SelectOption>;
export interface OptionComponentProps extends SelectOption {
    selected?: boolean;
}
export declare function useSelectOptionFunction(OptionComponent: OptionComponent | undefined, optionType: `${SelectOptionType}`): ({ option, checked }: RenderOptionParams) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SelectItemCommons.d.ts.map