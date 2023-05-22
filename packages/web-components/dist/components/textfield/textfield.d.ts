/// <reference types="react" />
import { TextField } from "@mui/material";
declare const FormTextField: ({ name, validations, errorMessages, masks, filter, formatters, visibilityConditions, formId, visibility, value, ...props }: import("@mui/material").TextFieldProps & Pick<import("@form-builder/engine").TComponent, "api" | "formatters" | "clearFields" | "masks" | "validations" | "visibilityConditions" | "errorMessages" | "filter" | "rehydrate"> & {
    formId?: string | undefined;
    visibility?: boolean | undefined;
    name: string;
    value?: any;
}) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export { FormTextField, TextField };
