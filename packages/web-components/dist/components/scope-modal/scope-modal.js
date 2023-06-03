import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Modal, Box, Typography, Button, Badge, Tabs, Tab, } from "@mui/material";
import { useCms } from "../../contexts/cms.context";
import { useSchema } from "../../hooks/useSchema";
import { useState } from "react";
function TabPanel(props) {
    const { children, value, index } = props;
    return (_jsx("div", Object.assign({ role: "tabpanel", hidden: value !== index, id: `simple-tabpanel-${index}`, "aria-labelledby": `simple-tab-${index}` }, { children: children })));
}
function flatten(object) {
    function iter(o, p) {
        if (o && typeof o === "object") {
            Object.keys(o).forEach(function (k) {
                iter(o[k], p.concat(k));
            });
            return;
        }
        path[p.join(".")] = o;
    }
    var path = {};
    iter(object, []);
    return path;
}
const ScopeModal = ({ scope }) => {
    const schema = useSchema();
    const cms = useCms();
    const [show, setSHow] = useState(false);
    const [value, setValue] = useState(0);
    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Button, Object.assign({ onClick: () => setSHow(true) }, { children: "Binding variables" })), _jsx(Modal, Object.assign({ open: show, onClose: () => setSHow(false), "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" }, { children: _jsxs(Box, Object.assign({ sx: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        p: 4,
                        overflow: "auto",
                        maxHeight: "50%",
                        width: "70%",
                    } }, { children: [_jsxs(Tabs, Object.assign({ value: value, onChange: handleChange, "aria-label": "basic tabs example" }, { children: [_jsx(Tab, { label: "Mock" }), _jsx(Tab, { label: "Available Scope" })] })), _jsx(TabPanel, { value: value, index: 0 }), _jsx(TabPanel, Object.assign({ value: value, index: 1 }, { children: Object.keys(flatten(scope)).map((key) => {
                                return (_jsxs(Box, Object.assign({ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }, { children: [_jsx(Typography, Object.assign({ style: { color: "red" }, sx: { mt: 2 } }, { children: key })), _jsxs(Box, Object.assign({ display: "flex", justifyContent: "flex-end", alignItems: "center", flexDirection: "row", gap: "2rem" }, { children: [_jsx(Button, Object.assign({ onClick: () => {
                                                        navigator.clipboard.writeText("${" + key + "}");
                                                    } }, { children: "Copy" })), _jsx(Badge, { badgeContent: schema.getComponentWithPattern(cms.state.schema, key).length, color: "secondary" })] }))] }), key));
                            }) }))] })) }))] }));
};
export { ScopeModal };
//# sourceMappingURL=scope-modal.js.map