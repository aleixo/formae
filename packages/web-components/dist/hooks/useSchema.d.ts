/// <reference types="react" />
import { TComponent, TSchema } from "@form-builder/engine";
import { IComponent } from "../common/types/engine";
declare const useSchema: () => {
    getComponentWithPattern: <T>(schema: T, pattern: string) => TComponent[];
    getTopSchemaComponent: (schema: TSchema) => any;
    init: ({ configs }: {
        configs: any;
    }) => {
        configs: unknown;
        page: TComponent[];
    };
    initForm: () => TSchema;
    add: (schema: TComponent[], component: IComponent) => TComponent[];
    addToFormStep: (schema: TSchema, component: TComponent, step?: number) => TSchema;
    buildComponent: ({ component, props }: {
        component?: string | undefined;
        props?: {} | undefined;
    }) => IComponent;
    buildTemplateComponent: (template: any) => IComponent;
    edit: <T_1>(schema: T_1, targetComponent: IComponent) => T_1;
    moveTo: <T_2>(schema: T_2, from: IComponent, to?: IComponent) => T_2;
    remove: <T_3>(schema: T_3, step: number, component: IComponent) => T_3;
    moveUp: <T_4>(schema: T_4, targetComponent: IComponent) => T_4;
    moveDown: <T_5>(schema: T_5, targetComponent: IComponent) => T_5;
    transverseSchema: <T_6>(schema: T_6, targetStep: number, cb: (component: IComponent[], index: number, currDepth: number, len: number, prev: IComponent[], count: any) => any, id?: number) => T_6;
    cloneComponent: (component: TComponent) => IComponent;
    extractComponentFormConfigurations: (component: TComponent) => Pick<TComponent, "api" | "formatters" | "clearFields" | "masks" | "validations" | "visibilityConditions">;
    createTemplate: (component: TComponent, isReference: boolean, name: string) => {
        __isTemplate: boolean;
        __isReference: boolean;
        label: string;
        name: string;
        component: string;
        metadata?: Record<string, any> | undefined;
        group?: string | undefined;
        wrapper?: (new () => import("react").Component<{}, {}, any>) | undefined;
        children?: TComponent[] | undefined;
        errorMessages?: import("@form-builder/engine/dist/core/types").TErrorMessages | undefined;
        type?: string | undefined;
        state?: {
            hidden?: boolean | undefined;
        } | undefined;
        props?: Record<string, unknown> | undefined;
        validations?: Partial<Record<import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_MOUNT | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_CHANGE | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_BLUR | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_FOCUS | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_REHYDRATE, import("@form-builder/engine/dist/core/types").TSchemaValidation>> | undefined;
        filter?: import("@form-builder/engine/dist/core/types").TSchemaValidation | undefined;
        visibilityConditions?: Partial<Record<import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_MOUNT | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_CHANGE | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_BLUR | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_FOCUS | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_REHYDRATE, import("@form-builder/engine/dist/core/types").TSchemaVisibilityConditions>> | undefined;
        clearFields?: Partial<Record<import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_MOUNT | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_CHANGE | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_BLUR | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_FOCUS | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_REHYDRATE, import("@form-builder/engine/dist/core/types").TSchemaClearFields>> | undefined;
        api?: Partial<Record<import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_MOUNT | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_CHANGE | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_BLUR | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_FOCUS | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_REHYDRATE, import("@form-builder/engine/dist/core/types").TSchemaApi>> | undefined;
        masks?: Partial<Record<import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_MOUNT | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_BLUR | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_FOCUS, import("@form-builder/engine/dist/core/types").TSchemaMasks>> | undefined;
        formatters?: Partial<Record<import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_MOUNT | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_CHANGE | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_BLUR | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_FOCUS | import("@form-builder/engine/dist/core/events").EEVents.ON_FIELD_REHYDRATE, import("@form-builder/engine/dist/core/types").TSchemaFormatters>> | undefined;
    };
};
export { useSchema };
