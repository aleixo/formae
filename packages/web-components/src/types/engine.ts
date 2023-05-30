import { TComponent } from "@form-builder/engine";

export enum EFormComponent {
  ACCORDION = "ACCORDION",
  INPUT = "INPUT",
  FORM_GROUP = "FORM_GROUP",
}

export enum EBuilderComponentPropsTypes {
  STRING = "string",
  BOOLEAN = "boolean",
  OBJECT = "object",
  SELECT = "select",
}

export interface IComponent extends TComponent {
  id?: string;
}
