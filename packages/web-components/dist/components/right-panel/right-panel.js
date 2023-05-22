import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListSubheader from "@mui/material/ListSubheader";
import { ListItemButton, ListItemIcon, ListItemText, } from "@mui/material";
import { MappedComponents } from "../mapped-components/mapped-components";
import { ComponentPropsForm } from "../component-props-form/component-props-form";
import { ComponentsHierarchy } from "../components-hierarchy/components-hierarchy";
import { FormComponentFeatures } from "../form-component-features/form-component-features";
import { Drawer } from "../drawer/drawer";
import { useCms } from "../../contexts/cms.context";
import { BreadCrumb } from "../breadcrumb/breadcrumb";
import { CoreEvents } from "@form-builder/engine";
var ERightMenus;
(function (ERightMenus) {
    ERightMenus["MAPPED_COMPONENTS"] = "Mapped components/";
    ERightMenus["FIELD_PROPS"] = "Field Properties";
    ERightMenus["FORM_HIERARCHY"] = "Hierarchy";
    ERightMenus["VALIDATIONS"] = "Validations";
    ERightMenus["FILTERS"] = "Filter";
    ERightMenus["MASKS"] = "Masks";
    ERightMenus["ERROR_MESSAGES"] = "Error Messages";
    ERightMenus["FORMATTERS"] = "Formatters";
    ERightMenus["API"] = "Api";
    ERightMenus["BASIC"] = "Basic";
})(ERightMenus || (ERightMenus = {}));
function RightPanel() {
    var _a;
    const cms = useCms();
    const [rightOpenedMenu, setRightOpenedMenu] = React.useState();
    const toggleRightMenu = (item) => () => {
        setRightOpenedMenu(item);
    };
    React.useEffect(() => {
        setRightOpenedMenu(undefined);
    }, [(_a = cms.state.selectedComponent) === null || _a === void 0 ? void 0 : _a.name]);
    return (_jsxs(Drawer, Object.assign({ variant: "permanent", open: true }, { children: [_jsx(BreadCrumb, { levelOneName: cms.state.selectedComponent
                    ? `Field ${cms.state.selectedComponent.name}`
                    : "Form", paths: (rightOpenedMenu === null || rightOpenedMenu === void 0 ? void 0 : rightOpenedMenu.split(".")) || [], onClick: (path) => {
                    const lastElement = rightOpenedMenu === null || rightOpenedMenu === void 0 ? void 0 : rightOpenedMenu.split(".").pop();
                    lastElement === path || setRightOpenedMenu(path);
                } }), rightOpenedMenu && (_jsxs("div", { children: [rightOpenedMenu === ERightMenus.MAPPED_COMPONENTS && (_jsx(MappedComponents, {})), rightOpenedMenu === ERightMenus.FIELD_PROPS && (_jsx(ComponentPropsForm, {})), rightOpenedMenu === ERightMenus.FORM_HIERARCHY && (_jsx(ComponentsHierarchy, {})), rightOpenedMenu.includes(ERightMenus.VALIDATIONS) && (_jsx(FormComponentFeatures, { feature: "validations", events: [
                            CoreEvents.ON_FIELD_MOUNT,
                            CoreEvents.ON_FIELD_CHANGE,
                            CoreEvents.ON_FIELD_FOCUS,
                            CoreEvents.ON_FIELD_MOUNT,
                        ], showEventSelection: rightOpenedMenu === ERightMenus.VALIDATIONS, onEventClick: (event) => {
                            setRightOpenedMenu(`${rightOpenedMenu}.${event}`);
                        } })), rightOpenedMenu === ERightMenus.ERROR_MESSAGES && (_jsx(FormComponentFeatures, { feature: "errorMessages" })), rightOpenedMenu === ERightMenus.FILTERS && (_jsx(FormComponentFeatures, { feature: "filter" })), rightOpenedMenu === ERightMenus.BASIC && _jsx(FormComponentFeatures, {}), rightOpenedMenu.includes(ERightMenus.FORMATTERS) && (_jsx(FormComponentFeatures, { feature: "formatters", events: [
                            CoreEvents.ON_FIELD_MOUNT,
                            CoreEvents.ON_FIELD_CHANGE,
                            CoreEvents.ON_FIELD_FOCUS,
                            CoreEvents.ON_FIELD_MOUNT,
                        ], showEventSelection: rightOpenedMenu === ERightMenus.FORMATTERS, onEventClick: (event) => {
                            setRightOpenedMenu(`${rightOpenedMenu}.${event}`);
                        } })), rightOpenedMenu.includes(ERightMenus.API) && (_jsx(FormComponentFeatures, { feature: "api", events: [
                            CoreEvents.ON_FIELD_MOUNT,
                            CoreEvents.ON_FIELD_CHANGE,
                            CoreEvents.ON_FIELD_FOCUS,
                            CoreEvents.ON_FIELD_MOUNT,
                        ], showEventSelection: rightOpenedMenu === ERightMenus.API, onEventClick: (event) => {
                            setRightOpenedMenu(`${rightOpenedMenu}.${event}`);
                        } })), rightOpenedMenu.includes(ERightMenus.MASKS) && (_jsx(FormComponentFeatures, { feature: "masks", events: [
                            CoreEvents.ON_FIELD_MOUNT,
                            CoreEvents.ON_FIELD_CHANGE,
                            CoreEvents.ON_FIELD_FOCUS,
                            CoreEvents.ON_FIELD_MOUNT,
                        ], showEventSelection: rightOpenedMenu === ERightMenus.MASKS, onEventClick: (event) => {
                            setRightOpenedMenu(`${rightOpenedMenu}.${event}`);
                        } }))] })), !rightOpenedMenu && (_jsxs(List, Object.assign({ component: "nav" }, { children: [_jsx(ListSubheader, Object.assign({ component: "div", inset: true }, { children: "General" })), _jsxs(ListItemButton, Object.assign({ onClick: toggleRightMenu(ERightMenus.MAPPED_COMPONENTS) }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Templates & mapped components" })] })), _jsxs(ListItemButton, Object.assign({ onClick: toggleRightMenu(ERightMenus.FORM_HIERARCHY) }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Form Hierarchy" })] })), _jsxs(ListItemButton, Object.assign({ disabled: !cms.state.selectedComponent, onClick: toggleRightMenu(ERightMenus.FIELD_PROPS) }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Field properties" })] })), _jsx(Divider, { sx: { my: 1 } }), _jsx(ListSubheader, Object.assign({ component: "div", inset: true }, { children: "Form Features" })), _jsxs(ListItemButton, Object.assign({ disabled: !cms.state.selectedComponent, onClick: toggleRightMenu(ERightMenus.BASIC) }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Basic" })] })), _jsxs(ListItemButton, Object.assign({ disabled: !cms.state.selectedComponent, onClick: toggleRightMenu(ERightMenus.VALIDATIONS) }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Validations" })] })), _jsxs(ListItemButton, Object.assign({ disabled: !cms.state.selectedComponent, onClick: toggleRightMenu(ERightMenus.ERROR_MESSAGES) }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Error messages" })] })), _jsxs(ListItemButton, Object.assign({ disabled: !cms.state.selectedComponent, onClick: toggleRightMenu(ERightMenus.FILTERS) }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Filter" })] })), _jsxs(ListItemButton, Object.assign({ disabled: !cms.state.selectedComponent, onClick: toggleRightMenu(ERightMenus.MASKS) }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Masks" })] })), _jsxs(ListItemButton, Object.assign({ disabled: !cms.state.selectedComponent, onClick: toggleRightMenu(ERightMenus.FORMATTERS) }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Formatters" })] })), _jsxs(ListItemButton, Object.assign({ disabled: !cms.state.selectedComponent, onClick: toggleRightMenu(ERightMenus.API) }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Api's" })] })), _jsxs(ListItemButton, Object.assign({ disabled: !cms.state.selectedComponent }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Visibility conditions" })] })), _jsxs(ListItemButton, Object.assign({ disabled: !cms.state.selectedComponent }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Clear Fields" })] })), _jsx(ListSubheader, Object.assign({ component: "div", inset: true }, { children: "Global" })), _jsxs(ListItemButton, Object.assign({ disabled: !cms.state.selectedComponent }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Create template" })] }))] })))] })));
}
export { RightPanel };
//# sourceMappingURL=right-panel.js.map