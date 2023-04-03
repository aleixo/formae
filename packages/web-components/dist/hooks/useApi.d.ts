import { TComponent, TSchema } from "@form-builder/engine";
type ITemplates = Record<string, TComponent>;
declare const useApi: () => {
    getSchema: () => TSchema;
    updateSchema: (schema: TSchema) => void;
    addTemplate: (template: Record<string, TComponent>) => void;
    getTemplates: () => ITemplates;
    addFormFieldConfigurationsTemplate: (configs: Record<string, unknown>) => void;
    getFormFieldConfigurationsTemplate: () => TComponent;
};
export { useApi };
