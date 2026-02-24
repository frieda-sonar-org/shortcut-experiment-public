import { ComboboxItem } from '@mantine/core';
import { ReactNode } from '../../../node_modules/react';
import { TextNodeOptional } from '../../types/utils';
export declare enum SelectHighlight {
    Default = "default",
    Ghost = "unstyled"
}
export declare enum SelectOptionType {
    Check = "check",
    Radio = "radio"
}
export interface SelectOption extends ComboboxItem {
    prefix?: ReactNode;
    suffix?: ReactNode;
    helpText?: TextNodeOptional;
    group?: never;
}
export interface SelectOptionGroup<T = SelectOption> {
    group: string;
    items: T[];
}
export type SelectData = Array<SelectOption | SelectOptionGroup> | ReadonlyArray<SelectOption | SelectOptionGroup>;
//# sourceMappingURL=SelectTypes.d.ts.map