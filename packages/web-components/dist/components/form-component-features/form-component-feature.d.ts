/// <reference types="react" />
import { TComponent } from "@form-builder/engine";
import { IFormFeature, TFeatureConfigurationsEvent } from "./form-component-features.configs";
interface IProps {
    feature: IFormFeature;
    formId: string;
    component: TComponent;
    event?: TFeatureConfigurationsEvent;
    validation?: string | Record<any, any>;
    index?: number;
}
declare const ComponentFeature: ({ event, feature, validation, formId, component, index, }: IProps) => JSX.Element;
export { ComponentFeature };
