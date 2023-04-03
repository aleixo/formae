/// <reference types="react" />
import { TextField } from "@mui/material";
declare const FormTextField: ({ name, validations, errorMessages, masks, filter, formatters, visibilityConditions, formId, visibility, value, ...props }: import("@mui/material").TextFieldProps & Pick<import("@form-builder/engine").TComponent, "errorMessages" | "validations" | "filter" | "rehydrate" | "visibilityConditions" | "clearFields" | "api" | "masks" | "formatters"> & {
    formId?: string | undefined;
    visibility?: boolean | undefined;
    name: string;
    value?: any;
}) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export { FormTextField, TextField };
