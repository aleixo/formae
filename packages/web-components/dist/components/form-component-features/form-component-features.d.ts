/// <reference types="react" />
import { TComponent } from "@form-builder/engine";
type EFeatures = keyof TComponent;
declare const FormComponentFeatures: ({ feature, events, onEventClick, showEventSelection, }: {
    showEventSelection?: boolean | undefined;
    feature: EFeatures;
    events?: string[] | undefined;
    onEventClick?(event: string): void;
}) => JSX.Element;
export { FormComponentFeatures };
