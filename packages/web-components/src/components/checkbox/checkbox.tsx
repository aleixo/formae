import { asFormField } from "@form-builder/engine";
import {
  Checkbox as MuiCheckbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

const Checkbox = (props) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={<MuiCheckbox {...props} />}
        label={props.label}
      />
    </FormGroup>
  );
};

const FormCheckbox = asFormField<React.ComponentProps<typeof Checkbox>>({
  Comp: Checkbox,
  propsMapping: {
    getValue: "onChange",
    setValue: "value",
    setErrorMessage: "errorMessage",
    onBlur: "onBlur",
    onFocus: "onFocus",
  },
});

export { Checkbox, FormCheckbox };
