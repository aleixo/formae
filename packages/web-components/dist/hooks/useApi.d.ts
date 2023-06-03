import { TSchema } from "@form-builder/engine";
declare const useApi: () => {
    updateTemplates: (templates: any) => void;
    getSchema: () => false | TSchema;
    updateSchema: (schema: TSchema) => void;
    getTemplates: () => unknown;
};
export { useApi };
