import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Builder } from "../components/builder/builder";
import { RightPanel } from "../components/right-panel/right-panel";
import { LeftPanel } from "../components/left-panel/left-panel";
import { useRouter } from "next/router";
const mdTheme = createTheme();
function BuilderPage() {
    const { query } = useRouter();
    return (_jsx(ThemeProvider, Object.assign({ theme: mdTheme }, { children: _jsxs(Box, Object.assign({ sx: { display: "flex" } }, { children: [_jsx(CssBaseline, {}), query.mode !== "PREVIEW" && _jsx(LeftPanel, {}), _jsx(Box, Object.assign({ component: "main", sx: {
                        backgroundColor: (theme) => theme.palette.grey[100],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                        padding: "2rem",
                    } }, { children: _jsx(Builder, { mode: query.mode || "BUILDING" }) })), query.mode !== "PREVIEW" && _jsx(RightPanel, {})] })) })));
}
export { BuilderPage };
//# sourceMappingURL=builder.js.map