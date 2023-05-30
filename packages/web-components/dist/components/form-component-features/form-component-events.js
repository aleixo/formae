import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import List from "@mui/material/List";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListSubheader from "@mui/material/ListSubheader";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
function FeatureEvents({ events, onEventClick, }) {
    return (_jsxs(List, Object.assign({ component: "nav" }, { children: [_jsx(ListSubheader, Object.assign({ inset: true }, { children: "Choose the life-cycle event" })), events.map((event) => (_jsxs(ListItemButton, Object.assign({ onClick: () => onEventClick(event) }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: event })] }), "event")))] })));
}
export { FeatureEvents };
//# sourceMappingURL=form-component-events.js.map