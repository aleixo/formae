/// <reference types="react" />
import { CoreEvents, TSchema } from "@form-builder/engine";
import { EBuilderComponentPropsTypes } from "../../types/engine";
import { TextField } from "../textfield/textfield";
export type TFeatureConfigurationsPossibleEvents = keyof typeof CoreEvents;
export type TFeatureConfigurationsEvent = {
    label: string;
    event?: TFeatureConfigurationsPossibleEvents;
};
export interface IFormFeature {
    label: string;
    key: string;
    type: EBuilderComponentPropsTypes;
    configurations?: {
        fields?: Record<string, {
            type: EBuilderComponentPropsTypes;
        }>;
        events?: TFeatureConfigurationsEvent[];
    };
}
declare const features: TSchema;
declare const formMapper: {
    ACCORDION: {
        component: ({ title, description, tooltipText, children, id, disabled, }: import("../accordion/accordion").TPros) => JSX.Element;
    };
    FORM_GROUP: {
        component: ({ children, title }: {
            children: any;
            title: any;
        }) => JSX.Element;
    };
    string: {
        component: typeof TextField;
    };
    array: {
        component: (props: import("@mui/material").SelectProps<unknown> & {
            options: {
                value: string;
                label: string;
                selected?: boolean | undefined;
            }[];
        }) => JSX.Element;
    };
    object: {
        component: ({ children, title }: {
            children: any;
            title: any;
        }) => JSX.Element;
    };
    boolean: {
        component: (props: any) => JSX.Element;
    };
    table: {
        component: ({ title, row, baseCellName, id, value }: {
            title: any;
            row: any;
            baseCellName: any;
            id: any;
            value?: never[] | undefined;
        }) => JSX.Element;
    };
};
declare const formPropsMapping: {
    string: {
        getValue: string;
        setValue: string;
    };
    array: {
        getValue: string;
        setValue: string;
    };
    boolean: {
        getValue: string;
        setValue: string;
    };
    table: {
        setValue: string;
    };
};
export { features, formMapper, formPropsMapping };
