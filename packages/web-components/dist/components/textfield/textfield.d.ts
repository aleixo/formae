/// <reference types="react" />
import { TextField } from "@mui/material";
declare const FormTextField: ({ name, validations, errorMessages, masks, filter, formatters, visibilityConditions, formId, visibility, value, ...props }: {
    variant?: import("@mui/material").TextFieldVariants | undefined;
} & Omit<import("@mui/material").FilledTextFieldProps | import("@mui/material").OutlinedTextFieldProps | import("@mui/material").StandardTextFieldProps, "variant"> & Pick<import("@form-builder/engine").TComponent, "api" | "formatters" | "clearFields" | "masks" | "validations" | "visibilityConditions" | "errorMessages" | "filter"> & {
    formId?: string | undefined;
    visibility?: boolean | undefined;
    name: string;
    value?: any;
}) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export { FormTextField, TextField };
