import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, Box, Typography, Button, Badge } from "@mui/material";
import { useCms } from "../../contexts/cms.context";
import { useSchema } from "../../hooks/useSchema";
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
const ScopeModal = ({ open, onClose, scope }) => {
    const schema = useSchema();
    const cms = useCms();
    return (_jsx(Modal, Object.assign({ open: open, onClose: onClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" }, { children: _jsxs(Box, Object.assign({ sx: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "70%",
                maxHeight: "50%",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                overflow: "auto",
            } }, { children: [_jsx(Typography, Object.assign({ id: "modal-modal-title", variant: "h6", component: "h2" }, { children: "Scope values" })), Object.keys(flatten(scope)).map((key) => {
                    return (_jsxs(Box, Object.assign({ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }, { children: [_jsx(Typography, Object.assign({ id: "modal-modal-description", sx: { mt: 2 } }, { children: key })), _jsxs(Box, Object.assign({ display: "flex", justifyContent: "flex-end", alignItems: "center", flexDirection: "row", gap: "2rem" }, { children: [_jsx(Button, Object.assign({ onClick: () => {
                                            navigator.clipboard.writeText("${" + key + "}");
                                        } }, { children: "Copy" })), _jsx(Badge, { badgeContent: schema.getComponentWithPattern(cms.state.schema, key).length, color: "secondary" })] }))] }), key));
                })] })) })));
};
export { ScopeModal };
//# sourceMappingURL=scope-modal.js.map