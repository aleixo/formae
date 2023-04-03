import { CoreEvents, TComponent, TSchema } from "@form-builder/engine";
export declare const validations: (prefix?: string) => TComponent[];
export declare const schema: ({ event }: {
    event: typeof CoreEvents;
}) => TSchema;
