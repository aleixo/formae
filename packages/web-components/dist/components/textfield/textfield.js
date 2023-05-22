import { TextField } from "@mui/material";
import { asFormField } from "@form-builder/engine";
const FormTextField = asFormField({
    Comp: TextField,
    propsMapping: {
        getValue: "onChange",
        setValue: "value",
        onBlur: "onBlur",
        onFocus: "onFocus",
        setErrorMessage: "helperText",
        setErrorState: "error",
    },
});
export { FormTextField, TextField };
//# sourceMappingURL=textfield.js.map