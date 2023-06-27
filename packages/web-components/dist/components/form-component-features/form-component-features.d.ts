/// <reference types="react" />
import { TComponent } from "@form-builder/engine";
type EFeatures = keyof TComponent | "basic" | "configurations";
declare const FormComponentFeatures: ({ feature, events, onEventClick, showEventSelection, allowTemplate, title, }: {
    showEventSelection?: boolean | undefined;
    feature?: EFeatures | undefined;
    events?: string[] | undefined;
    onEventClick?(event: string): void;
    allowTemplate?: boolean | undefined;
    title?: string | undefined;
}) => JSX.Element;
export { FormComponentFeatures };
