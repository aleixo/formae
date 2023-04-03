import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "@form-builder/engine";
import { Button } from "@mui/material";
import { useState } from "react";
const Table = ({ title, row, baseCellName, id, value = [] }) => {
    const [state, dispatch] = useState(Array.from(value, (row) => row));
    return (_jsxs("div", { children: [_jsx("h3", { children: title }), state.map((_, i) => (_jsx(Fragment, { components: row, id: id, onComponent: (component) => (Object.assign(Object.assign({}, component), { name: `${baseCellName}[${i}].${component.name}` })) }, i))), _jsx(Button, Object.assign({ onClick: () => dispatch([...state, row]) }, { children: "Add" }))] }));
};
export { Table };
//# sourceMappingURL=table.js.map