import { PropsWithLabels } from '../../types/utils';
import { SelectBaseProps } from './SelectCommons';
export type SelectAsyncProps = Omit<SelectBaseProps, 'filter' | 'isSearchable' | 'onSearch'> & Required<Pick<SelectBaseProps, 'onSearch'>>;
export declare const SelectAsync: import('../../../node_modules/react').ForwardRefExoticComponent<PropsWithLabels<SelectAsyncProps> & import('../../../node_modules/react').RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=SelectAsync.d.ts.map