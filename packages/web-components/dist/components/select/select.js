import { jsx as _jsx } from "react/jsx-runtime";
import { MenuItem, Select } from "@mui/material";
const FormSelect = (props) => (_jsx(Select, Object.assign({ autoWidth: true, fullWidth: true }, props, { children: props.options.map((option) => (_jsx(MenuItem, Object.assign({ value: option.value }, { children: option.label }), option.value))) })));
export { FormSelect };
//# sourceMappingURL=select.js.map