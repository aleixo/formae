/// <reference types="react" />
import { CheckboxProps } from "@mui/material";
declare const Checkbox: (props: JSX.IntrinsicAttributes & CheckboxProps & {
    label: string;
}) => JSX.Element;
declare const FormCheckbox: ({ name, validations, errorMessages, masks, filter, formatters, visibilityConditions, formId, visibility, value, ...props }: JSX.IntrinsicAttributes & CheckboxProps & {
    label: string;
} & Pick<import("@form-builder/engine").TComponent, "api" | "formatters" | "clearFields" | "masks" | "validations" | "visibilityConditions" | "errorMessages" | "filter"> & {
    formId?: string | undefined;
    visibility?: boolean | undefined;
    name: string;
    value?: any;
}) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export { Checkbox, FormCheckbox };
