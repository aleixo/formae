import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import InfoRounded from "@mui/icons-material/InfoRounded";
import Tooltip from "@mui/material/Tooltip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Accordion as MuiAccordion, AccordionDetails, AccordionSummary, ListItemIcon, ListItemText, } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
export const Accordion = ({ title, description, tooltipText, children, id, disabled, }) => {
    return (_jsxs(MuiAccordion, Object.assign({ disabled: disabled }, { children: [_jsx(AccordionSummary, Object.assign({ expandIcon: _jsx(ExpandMore, {}), id: id }, { children: _jsxs("div", Object.assign({ style: {
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    } }, { children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: title }), _jsx(ListItemText, { secondary: description }), _jsx(Tooltip, Object.assign({ title: tooltipText || description }, { children: _jsx(InfoRounded, { color: "primary" }) }))] })) })), _jsx(AccordionDetails, { children: children })] })));
};
//# sourceMappingURL=accordion.js.map