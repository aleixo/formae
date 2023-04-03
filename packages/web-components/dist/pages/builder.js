import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Builder } from "../components/builder/builder";
import { ScopeModal } from "../components/scope-modal/scope-modal";
import { RightPanel } from "../components/right-panel/right-panel";
import { LeftPanel } from "../components/left-panel/left-panel";
const mdTheme = createTheme();
function BuilderPage() {
    const [showScopeModal, setShowScopeModal] = React.useState(false);
    return (_jsxs(ThemeProvider, Object.assign({ theme: mdTheme }, { children: [_jsx(ScopeModal, { open: showScopeModal, onClose: () => setShowScopeModal(false), scope: {} }), _jsxs(Box, Object.assign({ sx: { display: "flex" } }, { children: [_jsx(CssBaseline, {}), _jsx(LeftPanel, {}), _jsx(Box, Object.assign({ component: "main", sx: {
                            backgroundColor: (theme) => theme.palette.grey[100],
                            flexGrow: 1,
                            height: "100vh",
                            overflow: "auto",
                            padding: "2rem",
                        } }, { children: _jsx(Builder, { mode: "BUILDING" }) })), _jsx(RightPanel, {})] }))] })));
}
export { BuilderPage };
//# sourceMappingURL=builder.js.map