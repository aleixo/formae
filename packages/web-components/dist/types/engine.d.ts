import { TComponent } from "@form-builder/engine";
export declare enum EFormComponent {
    ACCORDION = "ACCORDION",
    INPUT = "INPUT",
    FORM_GROUP = "FORM_GROUP"
}
export declare enum EBuilderComponentPropsTypes {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    OBJECT = "object",
    ARRAY = "array",
    TABLE = "table"
}
export interface IComponent extends TComponent {
    id?: string;
}
