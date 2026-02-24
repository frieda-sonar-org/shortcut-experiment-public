import { TextNodeOptional } from '../../../types/utils';
export declare enum BannerVariety {
    Danger = "danger",
    Info = "info",
    Success = "success",
    Warning = "warning"
}
export interface BannerProps {
    /**
     * The content to be displayed in the banner, keep it short and concise. It can't break into multiple lines and will be ellipsized if too long.
     */
    children: TextNodeOptional;
    className?: string;
    /**
     * Function that will be called when the dismiss button is clicked. The dismiss button is only shown if this function is defined.
     */
    onDismiss?: VoidFunction | ((event: React.MouseEvent<HTMLButtonElement>) => Promise<void>);
    /**
     * Prefix text for screen readers to announce before the banner content. Optional since a default value is provided.
     */
    screenReaderPrefix?: TextNodeOptional;
    /**
     * The variety of banner to display. Controls the styling and icon.
     */
    variety: `${BannerVariety}`;
}
//# sourceMappingURL=BannerTypes.d.ts.map