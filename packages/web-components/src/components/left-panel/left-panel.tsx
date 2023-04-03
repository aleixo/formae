import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Drawer } from "../drawer/drawer";
import { useCms } from "../../contexts/cms.context";
import { ShortcutsModal } from "../shortcuts-modal/shortcuts-modal";

function LeftPanel() {
  const cms = useCms();
  const [showShortcutModal, setShowShorcutModal] = React.useState(false);
  const [openLeft, setOpenLeft] = React.useState(true);
  const toggleDrawerLeft = () => setOpenLeft(!openLeft);

  return (
    <>
      <ShortcutsModal
        open={showShortcutModal}
        onClose={() => setShowShorcutModal(false)}
      />
      <Drawer variant="permanent" open={openLeft}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawerLeft}>
            {openLeft ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton
            onClick={() => {
              window.open(`/preview?key=form_json`, "_blank");
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Preview" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              cms.onSave(cms.state.schema);
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Save" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setShowShorcutModal(true);
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="HotKeys" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
export { LeftPanel };
