import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography, } from "@mui/material";
import { Stack } from "@mui/system";
const TemplateComponents = ({ components, onComponentClick, }) => {
    return (_jsxs(Accordion, { children: [_jsx(AccordionSummary, Object.assign({ expandIcon: _jsx(ExpandMore, {}), id: "new" }, { children: _jsx(Typography, Object.assign({ sx: { width: "33%", flexShrink: 0 } }, { children: "Template components" })) })), _jsx(AccordionDetails, { children: _jsx(Stack, Object.assign({ spacing: 2 }, { children: Object.keys(components).map((key, i) => (_jsx(Button, Object.assign({ type: "button", variant: "outlined", draggable: true, onClick: () => onComponentClick(key) }, { children: components[key].label }), i))) })) })] }));
};
export { TemplateComponents };
//# sourceMappingURL=template-components.js.map