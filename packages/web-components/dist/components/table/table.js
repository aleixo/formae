import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
/**
 *
 * <Fragment
              key={i}
              components={row}
              id={id}
              onComponent={(component) => ({
                ...component,
                name: component.name
                  ? `${baseCellName}[${i}].${component.name}`
                  : `${baseCellName}[${i}]`,
              })}
            />
 *
 */
const Table = ({ title, row, value = [] }) => {
    const [state, dispatch] = useState(Array.from(value, (row) => row));
    return (_jsxs("div", { children: [_jsx("h3", { children: title }), _jsx(Grid, Object.assign({ container: true, spacing: 2 }, { children: state.map((_, i) => (_jsx(Grid, { item: true, xs: 6 }, i))) })), _jsx(Button, Object.assign({ onClick: () => dispatch([...state, row]) }, { children: "Add" }))] }));
};
export { Table };
//# sourceMappingURL=table.js.map