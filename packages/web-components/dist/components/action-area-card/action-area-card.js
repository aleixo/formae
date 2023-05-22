import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
function ActionAreaCard({ title, description, onClick, preview, }) {
    return (_jsxs(Card, Object.assign({ elevation: 4, draggable: true, onClick: onClick }, { children: [_jsx("div", Object.assign({ style: { padding: "1rem", backgroundColor: "grey" } }, { children: preview && preview() })), _jsx(CardActionArea, { children: _jsxs(CardContent, { children: [_jsx(Typography, Object.assign({ gutterBottom: true, variant: "h5", component: "div" }, { children: title })), _jsx(Typography, Object.assign({ variant: "body2", color: "text.secondary" }, { children: description }))] }) })] })));
}
export { ActionAreaCard };
//# sourceMappingURL=action-area-card.js.map