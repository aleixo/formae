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
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {query.mode !== "PREVIEW" && <LeftPanel />}
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
          <Builder mode={query.mode || "BUILDING"} />
        </Box>
        {query.mode !== "PREVIEW" && <RightPanel />}
      </Box>
    </ThemeProvider>
  );
}

export { BuilderPage };
