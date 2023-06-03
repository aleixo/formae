import { jsx as _jsx } from "react/jsx-runtime";
import { MenuItem, Select as MUISelect } from "@mui/material";
const Select = (props) => (_jsx(MUISelect, Object.assign({}, props, { children: props.options.map((option) => (_jsx(MenuItem, Object.assign({ value: option.value, selected: option.selected || props.value === option.value }, { children: option.label }), option.value))) })));
export { Select };
//# sourceMappingURL=select.js.map