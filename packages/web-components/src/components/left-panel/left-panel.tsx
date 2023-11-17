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
import { FormComponentFeatures } from "../form-component-features/form-component-features";
import { ComponentsHierarchy } from "../components-hierarchy/components-hierarchy";
import { useApi } from "../../hooks/useApi";

enum EMenus {
  FORM_HIERARCHY = "Hierarchy",
  FORM_CONFIGURATIONS = "FORM_CONFIGURATIONS",
}

function LeftPanel() {
  const api = useApi();
  const cms = useCms();
  const [showShortcutModal, setShowShorcutModal] = React.useState(false);
  const [openLeft, setOpenLeft] = React.useState(true);
  const toggleDrawerLeft = () => setOpenLeft(!openLeft);

  const [openedMenu, setOpenedMenu] = React.useState<string | undefined>();

  const toggleMenu = (item?: EMenus) => () => {
    setOpenedMenu(item);
  };

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
              window.open(`/?mode=PREVIEW`);
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
            <ListItemText primary="Client Save" />
          </ListItemButton>
          <ListItemButton onClick={() => api.updateSchema(cms.state.schema)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Save to local storage" />
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
          <ListItemButton onClick={toggleMenu(EMenus.FORM_CONFIGURATIONS)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Form global configurations" />
          </ListItemButton>
          <ListItemButton onClick={toggleMenu(EMenus.FORM_HIERARCHY)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Form components hierarchy" />
          </ListItemButton>
        </List>
        {openedMenu === EMenus.FORM_CONFIGURATIONS && (
          <FormComponentFeatures
            feature="configurations"
            allowTemplate={false}
          />
        )}

        {openedMenu === EMenus.FORM_HIERARCHY && <ComponentsHierarchy />}
      </Drawer>
    </>
  );
}
export { LeftPanel };
