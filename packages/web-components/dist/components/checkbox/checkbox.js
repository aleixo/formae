import { jsx as _jsx } from "react/jsx-runtime";
import { asFormField } from "@form-builder/engine";
import { Checkbox as MuiCheckbox, FormGroup, FormControlLabel, } from "@mui/material";
const Checkbox = (props) => {
    return (_jsx(FormGroup, { children: _jsx(FormControlLabel, { control: _jsx(MuiCheckbox, Object.assign({}, props)), label: props.label }) }));
};
const FormCheckbox = asFormField({
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
//# sourceMappingURL=checkbox.js.map