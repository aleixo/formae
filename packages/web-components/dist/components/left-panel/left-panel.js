import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
import { useCms } from "../../contexts/cms.context";
import { ShortcutsModal } from "../shortcuts-modal/shortcuts-modal";
import { FormComponentFeatures } from "../form-component-features/form-component-features";
import { ComponentsHierarchy } from "../components-hierarchy/components-hierarchy";
var EMenus;
(function (EMenus) {
    EMenus["FORM_HIERARCHY"] = "Hierarchy";
    EMenus["FORM_CONFIGURATIONS"] = "FORM_CONFIGURATIONS";
})(EMenus || (EMenus = {}));
function LeftPanel() {
    const cms = useCms();
    const [showShortcutModal, setShowShorcutModal] = React.useState(false);
    const [openLeft, setOpenLeft] = React.useState(true);
    const toggleDrawerLeft = () => setOpenLeft(!openLeft);
    const [openedMenu, setOpenedMenu] = React.useState();
    const toggleMenu = (item) => () => {
        setOpenedMenu(item);
    };
    return (_jsxs(_Fragment, { children: [_jsx(ShortcutsModal, { open: showShortcutModal, onClose: () => setShowShorcutModal(false) }), _jsxs(Drawer, Object.assign({ variant: "permanent", open: openLeft }, { children: [_jsx(Toolbar, Object.assign({ sx: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            px: [1],
                        } }, { children: _jsx(IconButton, Object.assign({ onClick: toggleDrawerLeft }, { children: openLeft ? _jsx(ChevronLeftIcon, {}) : _jsx(ChevronRightIcon, {}) })) })), _jsx(Divider, {}), _jsxs(List, Object.assign({ component: "nav" }, { children: [_jsxs(ListItemButton, Object.assign({ onClick: () => {
                                    window.open(`/?mode=PREVIEW`);
                                } }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Preview" })] })), _jsxs(ListItemButton, Object.assign({ onClick: () => {
                                    cms.onSave(cms.state.schema);
                                } }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Save" })] })), _jsxs(ListItemButton, Object.assign({ onClick: () => {
                                    setShowShorcutModal(true);
                                } }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "HotKeys" })] })), _jsxs(ListItemButton, Object.assign({ onClick: toggleMenu(EMenus.FORM_CONFIGURATIONS) }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Form global configurations" })] })), _jsxs(ListItemButton, Object.assign({ onClick: toggleMenu(EMenus.FORM_HIERARCHY) }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Form components hierarchy" })] }))] })), openedMenu === EMenus.FORM_CONFIGURATIONS && (_jsx(FormComponentFeatures, { feature: "configurations", allowTemplate: false })), openedMenu === EMenus.FORM_HIERARCHY && _jsx(ComponentsHierarchy, {})] }))] }));
}
export { LeftPanel };
//# sourceMappingURL=left-panel.js.map