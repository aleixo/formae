import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Drawer } from "../drawer/drawer";
function LeftPanel() {
    const [openLeft, setOpenLeft] = React.useState(false);
    const toggleDrawerLeft = () => setOpenLeft(!openLeft);
    return (_jsxs(Drawer, Object.assign({ variant: "permanent", open: openLeft }, { children: [_jsx(Toolbar, Object.assign({ sx: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: [1],
                } }, { children: _jsx(IconButton, Object.assign({ onClick: toggleDrawerLeft }, { children: openLeft ? _jsx(ChevronLeftIcon, {}) : _jsx(ChevronRightIcon, {}) })) })), _jsx(Divider, {}), _jsxs(List, Object.assign({ component: "nav" }, { children: [_jsxs(ListItemButton, Object.assign({ onClick: () => {
                            window.open(`/preview?key=form_json`, "_blank");
                        } }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Preview" })] })), _jsxs(ListItemButton, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Save to JSON" })] }), _jsxs(ListItemButton, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Load from JSON" })] }), _jsxs(ListItemButton, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Manage scope" })] })] }))] })));
}
export { LeftPanel };
//# sourceMappingURL=left-panel.js.map