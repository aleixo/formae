import { CoreEvents, TSchema } from "@form-builder/engine";
export type TFeatureConfigurationsPossibleEvents = keyof typeof CoreEvents;
export type TFeatureConfigurationsEvent = {
    label: string;
    event?: TFeatureConfigurationsPossibleEvents;
};
declare const schema: ({ event }: {
    event: string;
}) => TSchema;
export { schema };
