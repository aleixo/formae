import { useCallback, useMemo } from "react";
const getStoreItem = (key) => {
    const item = window.localStorage.getItem(key);
    if (!item)
        return false;
    return JSON.parse(item);
};
const setStoreItem = (key, item) => window.localStorage.setItem(key, JSON.stringify(item));
const useApi = () => {
    const getSchema = useCallback(() => getStoreItem("form_json"), []);
    const getTemplates = useCallback(() => getStoreItem("templates"), []);
    const updateTemplates = useCallback((templates) => setStoreItem("templates", templates), []);
    const updateSchema = useCallback((schema) => setStoreItem("form_json", schema), []);
    return useMemo(() => ({
        updateTemplates,
        getSchema,
        updateSchema,
        getTemplates,
    }), [updateTemplates, getSchema, getTemplates, updateSchema]);
};
export { useApi };
//# sourceMappingURL=useApi.js.map