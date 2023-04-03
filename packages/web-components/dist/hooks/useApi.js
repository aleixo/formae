import { useCallback, useMemo } from "react";
const getStoreItem = (key) => JSON.parse(window.localStorage.getItem(key) || "{}");
const setStoreItem = (key, item) => window.localStorage.setItem(key, JSON.stringify(item));
const useApi = () => {
    const getSchema = useCallback(() => getStoreItem("form_json"), []);
    const updateSchema = useCallback((schema) => setStoreItem("form_json", schema), []);
    const getTemplates = useCallback(() => getStoreItem("templates"), []);
    const addTemplate = useCallback((template) => setStoreItem("templates", Object.assign(Object.assign({}, getTemplates()), template)), [getTemplates]);
    const getFormFieldConfigurationsTemplate = useCallback(() => getStoreItem("field_form_config"), []);
    const addFormFieldConfigurationsTemplate = useCallback((configs) => setStoreItem("field_form_config", Object.assign(Object.assign({}, getFormFieldConfigurationsTemplate()), configs)), [getFormFieldConfigurationsTemplate]);
    return useMemo(() => ({
        getSchema,
        updateSchema,
        addTemplate,
        getTemplates,
        addFormFieldConfigurationsTemplate,
        getFormFieldConfigurationsTemplate,
    }), [
        addFormFieldConfigurationsTemplate,
        addTemplate,
        getFormFieldConfigurationsTemplate,
        getSchema,
        getTemplates,
        updateSchema,
    ]);
};
export { useApi };
//# sourceMappingURL=useApi.js.map