import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@mui/material";
import { useState } from "react";
import { Fragment } from "@form-builder/engine";
const Table = ({ id, title, row, baseCellName, onChange, value = [] }) => {
    const [state, dispatch] = useState(Array.isArray(value)
        ? Array.from(value, (row) => row)
        : Object.keys(value).map((key) => ({ key: key, value: value[key] })));
    const buildRowComponent = (component, rowIndex) => {
        const firstPathPart = `${baseCellName}[${rowIndex}]`;
        return Object.assign(Object.assign({}, component), { name: component.name
                ? `${firstPathPart}.${component.name}`
                : `${firstPathPart}` });
    };
    return (_jsxs("div", { children: [_jsx("h3", { children: title }), state.map((key, i) => (_jsxs(_Fragment, { children: [_jsx(Fragment, { components: row, id: id, onComponent: (c) => buildRowComponent(c, i), onData: ({ formatted }) => {
                            onChange(formatted[baseCellName]);
                        } }, i), _jsx(Button, Object.assign({ type: "button", onClick: () => {
                            dispatch(state.filter((_, index) => index !== i));
                            onChange(state.filter((_, index) => index !== i));
                        } }, { children: "Remove" }))] }))), _jsx(Button, Object.assign({ type: "button", onClick: () => {
                    dispatch([...state, row]);
                } }, { children: "Add" }))] }));
};
export { Table };
//# sourceMappingURL=table.js.map