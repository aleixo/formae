import { TComponent, TSchema } from "@form-builder/engine";
import { useCallback, useMemo } from "react";

type ITemplates = Record<string, TComponent>;

const getStoreItem = <T>(key: string) =>
  JSON.parse(window.localStorage.getItem(key) || "{}") as T;

const setStoreItem = (key: string, item: Record<string, unknown>) =>
  window.localStorage.setItem(key, JSON.stringify(item));

const useApi = () => {
  const getSchema = useCallback(() => getStoreItem<TSchema>("form_json"), []);

  const updateSchema = useCallback(
    (schema: TSchema) => setStoreItem("form_json", schema),
    []
  );
  const getTemplates = useCallback(
    () => getStoreItem<ITemplates>("templates"),
    []
  );

  const addTemplate = useCallback(
    (template: Record<string, TComponent>) =>
      setStoreItem("templates", { ...getTemplates(), ...template }),
    [getTemplates]
  );

  const getFormFieldConfigurationsTemplate = useCallback(
    () => getStoreItem<TComponent>("field_form_config"),
    []
  );

  const addFormFieldConfigurationsTemplate = useCallback(
    (configs: Record<string, unknown>) =>
      setStoreItem("field_form_config", {
        ...getFormFieldConfigurationsTemplate(),
        ...configs,
      }),
    [getFormFieldConfigurationsTemplate]
  );

  return useMemo(
    () => ({
      getSchema,
      updateSchema,
      addTemplate,
      getTemplates,
      addFormFieldConfigurationsTemplate,
      getFormFieldConfigurationsTemplate,
    }),
    [
      addFormFieldConfigurationsTemplate,
      addTemplate,
      getFormFieldConfigurationsTemplate,
      getSchema,
      getTemplates,
      updateSchema,
    ]
  );
};

export { useApi };
