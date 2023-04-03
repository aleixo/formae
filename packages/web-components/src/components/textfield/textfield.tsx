import { TextField } from "@mui/material";
import { asFormField } from "@form-builder/engine";

const FormTextField = asFormField<React.ComponentProps<typeof TextField>>({
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
