import { RenderOptions, RenderResult } from '@testing-library/react';
import { UserEvent, Options as UserEventsOptions } from '@testing-library/user-event';
import { default as React, ComponentProps } from '../../../node_modules/react';
import { PropsWithLabels, PropsWithLabelsAndHelpText } from '../../types/utils';
type RenderResultWithUser = RenderResult & {
    user: UserEvent;
};
export declare function render(ui: React.ReactElement, options?: RenderOptions, userEventOptions?: UserEventsOptions): RenderResultWithUser;
export declare const renderWithMemoryRouter: (ui: JSX.Element, initialEntries?: string[], options?: RenderOptions, userEventOptions?: UserEventsOptions) => RenderResultWithUser;
export type OmitPropsWithLabelsAndHelpText<T extends React.JSXElementConstructor<any>> = Partial<Omit<ComponentProps<T>, keyof PropsWithLabelsAndHelpText<{}>>> & PropsWithLabelsAndHelpText<{}>;
export type OmitPropsWithLabels<T extends React.JSXElementConstructor<any>> = Partial<Omit<ComponentProps<T>, keyof PropsWithLabels<{}>>> & PropsWithLabels<{}>;
export {};
//# sourceMappingURL=test-utils.d.ts.map