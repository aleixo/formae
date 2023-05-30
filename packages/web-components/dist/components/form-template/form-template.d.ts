/// <reference types="react" />
import { TComponent } from "@form-builder/engine";
declare const FormComponentFeatureTemplate: ({ feature, template, onChangeTemplate, showGrid, }: {
    showGrid?: boolean | undefined;
    template: any;
    feature: keyof TComponent;
    onChangeTemplate(template: {
        formatted: TComponent;
        configuration: any;
    }): void;
}) => JSX.Element;
export { FormComponentFeatureTemplate };
