import { CoreEvents, TComponent } from "@form-builder/engine";
import { EBuilderComponentPropsTypes } from "../../../types/engine";
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
export declare const schema: ({ event }: {
    event: string;
}) => {
    components: {
        component: string;
        name: string;
        children: {
            component: EBuilderComponentPropsTypes;
            name: string;
            children: TComponent[];
        }[];
    }[];
};
