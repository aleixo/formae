import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Builder } from "../components/builder/builder";
import { RightPanel } from "../components/right-panel/right-panel";
import { LeftPanel } from "../components/left-panel/left-panel";

import { useRouter } from "next/router";
import { useKeyboardSensor } from "../hooks/useKeyboardSensor";
import { Container, Stack } from "@mui/material";
import "../styles/globals.css";
const mdTheme = createTheme();

function BuilderPage() {
  const { query } = useRouter();
  useKeyboardSensor();
  return (
    <Container
      component="main"
      style={{
        padding: 0,
        margin: 0,
        maxWidth: "100vw",
      }}
    >
      <ThemeProvider theme={mdTheme}>
        <CssBaseline />
        <Stack flexDirection="row">
          {query.mode !== "PREVIEW" && <LeftPanel />}

          <Builder mode={(query.mode as string) || "BUILDING"} />

          {query.mode !== "PREVIEW" && <RightPanel />}
        </Stack>
      </ThemeProvider>
    </Container>
  );
}

export { BuilderPage };
