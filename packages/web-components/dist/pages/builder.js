import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Builder } from "../components/builder/builder";
import { RightPanel } from "../components/right-panel/right-panel";
import { LeftPanel } from "../components/left-panel/left-panel";
import { useRouter } from "next/router";
import { useKeyboardSensor } from "../hooks/useKeyboardSensor";
import { Container, Stack } from "@mui/material";
const mdTheme = createTheme();
function BuilderPage() {
    const { query } = useRouter();
    useKeyboardSensor();
    return (_jsx(ThemeProvider, Object.assign({ theme: mdTheme }, { children: _jsxs(Stack, Object.assign({ flexDirection: "row" }, { children: [_jsx(CssBaseline, {}), query.mode !== "PREVIEW" && _jsx(LeftPanel, {}), _jsx(Container, Object.assign({ component: "main", sx: {
                        backgroundColor: (theme) => theme.palette.grey[100],
                        padding: "2rem",
                    } }, { children: _jsx(Builder, { mode: query.mode || "BUILDING" }) })), query.mode !== "PREVIEW" && _jsx(RightPanel, {})] })) })));
}
export { BuilderPage };
//# sourceMappingURL=builder.js.map