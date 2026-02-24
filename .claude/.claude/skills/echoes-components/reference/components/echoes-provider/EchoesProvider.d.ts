import { PropsWithChildren } from '../../../node_modules/react';
import { TooltipProviderProps } from '..';
export interface EchoesProviderProps {
    /**
     * Custom class name for all the toasts (optional).
     */
    toastsClassName?: string;
    /**
     * Maximum number of toast notifications visible simultaneously (optional).
     * When this limit is reached, older toasts will be automatically dismissed
     * to make room for new ones. The default is 5.
     */
    toastsVisibleNb?: number;
    /**
     * Delay in milliseconds before tooltips appear on hover (optional).
     * Controls the global delay duration for all tooltips in the application.
     * If not specified, the default tooltip delay of 500ms will be used.
     */
    tooltipsDelayDuration?: TooltipProviderProps['delayDuration'];
}
/**
 * Root provider component for the Echoes design system.
 *
 * Sets up the global context, styling, and functionality required by all Echoes components.
 * This includes typography styles, toast notifications, tooltips, and component-specific
 * global styles.
 *
 * It must be placed at the root of your application (or at least wrap all
 * components that use the Echoes design system). To ensure all Echoes components work properly,
 * the EchoesProvider should be placed inside the react-intl provider and react-router provider.
 * Ideally, you should also wrap your application with a div that reset the [Stacking Context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)
 * for your app to ensure that tooltips and toasts from Echoes appear above the rest of the UI.
 *
 * **Usage**
 *
 * ```tsx
 * import { EchoesProvider } from '@sonarsource/echoes-react';
 *
 * function App() {
 *   return (
 *     <IntlProvider>
 *       <RouterProvider router={createBrowserRouter(
 *         createRoutesFromElements(
 *           <Route
 *             element={
 *               <EchoesProvider>
 *                 <ResetLayerStack>
 *                   <Outlet />
 *                 </ResetLayerStack>
 *               </EchoesProvider>
 *             }
 *           >
 *             <Route path="/" element={<YourApplication />} />
 *           </Route>
 *         )
 *       )} />
 *     </IntlProvider>
 *   );
 * }
 * ```
 */
export declare function EchoesProvider(props: PropsWithChildren<EchoesProviderProps>): import("@emotion/react/jsx-runtime").JSX.Element;
export declare namespace EchoesProvider {
    var displayName: string;
}
//# sourceMappingURL=EchoesProvider.d.ts.map