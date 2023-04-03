import { TextField } from "@mui/material";
import { asFormField } from "@form-builder/engine";
const FormTextField = asFormField({
    Comp: TextField,
    propsMapping: {
        getValue: "onChange",
        setValue: "value",
        setErrorMessage: "errorMessage",
        onBlur: "onBlur",
        onFocus: "onFocus",
    },
});
export { FormTextField, TextField };
//# sourceMappingURL=textfield.js.map