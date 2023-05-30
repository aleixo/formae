import { TSchema } from "@form-builder/engine";
import { useCallback, useMemo } from "react";

const getStoreItem = <T>(key: string) => {
  const item = window.localStorage.getItem(key);
  if (!item) return false;
  return JSON.parse(item) as T;
};

const setStoreItem = (key: string, item: Record<string, unknown>) =>
  window.localStorage.setItem(key, JSON.stringify(item));

const useApi = () => {
  const getSchema = useCallback(() => getStoreItem<TSchema>("form_json"), []);

  const getTemplates = useCallback(() => getStoreItem("templates"), []);

  const updateTemplates = useCallback(
    (templates: any) => setStoreItem("templates", templates),
    []
  );

  const updateSchema = useCallback(
    (schema: TSchema) => setStoreItem("form_json", schema),
    []
  );

  return useMemo(
    () => ({
      updateTemplates,
      getSchema,
      updateSchema,
      getTemplates,
    }),
    [updateTemplates, getSchema, getTemplates, updateSchema]
  );
};

export { useApi };
