import { TooltipRenderProps } from 'react-joyride';
import { SpotlightProps } from './SpotlightTypes';
export type SpotlightModalForStepProps = TooltipRenderProps & Pick<SpotlightProps, 'image' | 'stepXofYLabel'> & {
    /**
     * The CSS class name to add to the target element when it becomes active
     */
    activeTargetClassName: string;
};
export declare function SpotlightModalForStep(props: Readonly<SpotlightModalForStepProps>): import("@emotion/react/jsx-runtime").JSX.Element;
export declare namespace SpotlightModalForStep {
    var displayName: string;
}
//# sourceMappingURL=SpotlightModalForStep.d.ts.map