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

  return (
    <ThemeProvider theme={mdTheme}>
      <ScopeModal
        open={showScopeModal}
        onClose={() => setShowScopeModal(false)}
        scope={{}}
      />

      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <LeftPanel />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.grey[100],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            padding: "2rem",
          }}
        >
          <Builder mode="BUILDING" />
        </Box>
        <RightPanel />
      </Box>
    </ThemeProvider>
  );
}

export { BuilderPage };
