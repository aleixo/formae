import { TComponent } from "@form-builder/engine";

export const EBuilderComponentPropsTypes = {
  STRING: "string",
  BOOLEAN: "boolean",
  SELECT: "select",
  TABLE: "table",
  ACCORDION: "ACCORDION",
  GROUP: "GROUP",
  BUTTON: "BUTTON",
};

export interface IComponent extends TComponent {
  id?: string;
}
