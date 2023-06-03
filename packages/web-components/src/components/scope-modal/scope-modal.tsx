import { TSchema } from "@form-builder/engine";
import {
  Modal,
  Box,
  Typography,
  Button,
  Badge,
  Tabs,
  Tab,
} from "@mui/material";
import { useCms } from "../../contexts/cms.context";
import { useSchema } from "../../hooks/useSchema";
import { useState } from "react";

function TabPanel(props: any) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {children}
    </div>
  );
}

function flatten(object) {
  function iter(o, p) {
    if (o && typeof o === "object") {
      Object.keys(o).forEach(function (k) {
        iter(o[k], p.concat(k));
      });
      return;
    }
    path[p.join(".")] = o;
  }

  var path = {};
  iter(object, []);
  return path;
}

const ScopeModal = ({ scope }) => {
  const schema = useSchema();
  const cms = useCms();
  const [show, setSHow] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Button onClick={() => setSHow(true)}>Binding variables</Button>
      <Modal
        open={show}
        onClose={() => setSHow(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            overflow: "auto",
            maxHeight: "50%",
            width: "70%",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Mock" />
            <Tab label="Available Scope" />
          </Tabs>
          <TabPanel value={value} index={0} />
          <TabPanel value={value} index={1}>
            {Object.keys(flatten(scope)).map((key) => {
              return (
                <Box
                  key={key}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexDirection="row"
                >
                  <Typography style={{ color: "red" }} sx={{ mt: 2 }}>
                    {key}
                  </Typography>

                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    flexDirection="row"
                    gap="2rem"
                  >
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText("${" + key + "}");
                      }}
                    >
                      Copy
                    </Button>
                    <Badge
                      badgeContent={
                        schema.getComponentWithPattern<TSchema>(
                          cms.state.schema!,
                          key
                        ).length
                      }
                      color="secondary"
                    ></Badge>
                  </Box>
                </Box>
              );
            })}
          </TabPanel>
        </Box>
      </Modal>
    </>
  );
};

export { ScopeModal };
