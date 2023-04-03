import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const bull = (_jsx(Box, Object.assign({ component: "span", sx: { display: "inline-block", mx: "2px", transform: "scale(0.8)" } }, { children: "\u2022" })));
function BasicCard() {
    return (_jsxs(Card, Object.assign({ sx: { minWidth: 275 } }, { children: [_jsxs(CardContent, { children: [_jsx(Typography, Object.assign({ sx: { fontSize: 14 }, color: "text.secondary", gutterBottom: true }, { children: "Word of the Day" })), _jsxs(Typography, Object.assign({ variant: "h5", component: "div" }, { children: ["be", bull, "nev", bull, "o", bull, "lent"] })), _jsx(Typography, Object.assign({ sx: { mb: 1.5 }, color: "text.secondary" }, { children: "adjective" })), _jsxs(Typography, Object.assign({ variant: "body2" }, { children: ["well meaning and kindly.", _jsx("br", {}), '"a benevolent smile"'] }))] }), _jsx(CardActions, { children: _jsx(Button, Object.assign({ size: "small" }, { children: "Learn More" })) })] })));
}
export { BasicCard };
//# sourceMappingURL=basic-card.js.map