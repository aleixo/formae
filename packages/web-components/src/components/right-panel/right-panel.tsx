import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";

import ListSubheader from "@mui/material/ListSubheader";

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { MappedComponents } from "../mapped-components/mapped-components";
import { ComponentPropsForm } from "../component-props-form/component-props-form";
import { FormComponentFeatures } from "../form-component-features/form-component-features";
import { Drawer } from "../drawer/drawer";
import { useCms } from "../../contexts/cms.context";
import { BreadCrumb } from "../breadcrumb/breadcrumb";
import { CoreEvents } from "@form-builder/engine";

enum ERightMenus {
  MAPPED_COMPONENTS = "Mapped components/",
  FIELD_PROPS = "Field Properties",
  VALIDATIONS = "Validations",
  FILTERS = "Filter",
  MASKS = "Masks",
  ERROR_MESSAGES = "Error Messages",
  FORMATTERS = "Formatters",
  API = "Api",
  BASIC = "Basic",
}

function RightPanel() {
  const cms = useCms();
  const [rightOpenedMenu, setRightOpenedMenu] = React.useState<
    string | undefined
  >();

  const toggleRightMenu = (item?: ERightMenus) => () => {
    setRightOpenedMenu(item);
  };

  React.useEffect(() => {
    setRightOpenedMenu(undefined);
  }, [cms.state.selectedComponent?.name]);

  return (
    <Drawer variant="permanent" open={true}>
      <BreadCrumb
        levelOneName={
          cms.state.selectedComponent
            ? `Field ${cms.state.selectedComponent.name}`
            : "Form"
        }
        paths={rightOpenedMenu?.split(".") || []}
        onClick={(path) => {
          const lastElement = rightOpenedMenu?.split(".").pop();

          lastElement === path || setRightOpenedMenu(path);
        }}
      />

      {rightOpenedMenu && (
        <div>
          {rightOpenedMenu === ERightMenus.MAPPED_COMPONENTS && (
            <MappedComponents />
          )}
          {rightOpenedMenu === ERightMenus.FIELD_PROPS && (
            <ComponentPropsForm />
          )}
          {rightOpenedMenu.includes(ERightMenus.VALIDATIONS) && (
            <FormComponentFeatures
              feature="validations"
              events={[
                CoreEvents.ON_FIELD_MOUNT,
                CoreEvents.ON_FIELD_CHANGE,
                CoreEvents.ON_FIELD_FOCUS,
                CoreEvents.ON_FIELD_MOUNT,
              ]}
              showEventSelection={rightOpenedMenu === ERightMenus.VALIDATIONS}
              onEventClick={(event) => {
                setRightOpenedMenu(`${rightOpenedMenu}.${event}`);
              }}
            />
          )}
          {rightOpenedMenu === ERightMenus.ERROR_MESSAGES && (
            <FormComponentFeatures feature="errorMessages" />
          )}
          {rightOpenedMenu === ERightMenus.FILTERS && (
            <FormComponentFeatures feature="filter" />
          )}
          {rightOpenedMenu === ERightMenus.BASIC && <FormComponentFeatures />}
          {rightOpenedMenu.includes(ERightMenus.FORMATTERS) && (
            <FormComponentFeatures
              feature="formatters"
              events={[
                CoreEvents.ON_FIELD_MOUNT,
                CoreEvents.ON_FIELD_CHANGE,
                CoreEvents.ON_FIELD_FOCUS,
                CoreEvents.ON_FIELD_MOUNT,
              ]}
              showEventSelection={rightOpenedMenu === ERightMenus.FORMATTERS}
              onEventClick={(event) => {
                setRightOpenedMenu(`${rightOpenedMenu}.${event}`);
              }}
            />
          )}
          {rightOpenedMenu.includes(ERightMenus.API) && (
            <FormComponentFeatures
              feature="api"
              events={[
                CoreEvents.ON_FIELD_MOUNT,
                CoreEvents.ON_FIELD_CHANGE,
                CoreEvents.ON_FIELD_FOCUS,
                CoreEvents.ON_FIELD_MOUNT,
              ]}
              showEventSelection={rightOpenedMenu === ERightMenus.API}
              onEventClick={(event) => {
                setRightOpenedMenu(`${rightOpenedMenu}.${event}`);
              }}
            />
          )}
          {rightOpenedMenu.includes(ERightMenus.MASKS) && (
            <FormComponentFeatures
              feature="masks"
              events={[
                CoreEvents.ON_FIELD_MOUNT,
                CoreEvents.ON_FIELD_CHANGE,
                CoreEvents.ON_FIELD_FOCUS,
                CoreEvents.ON_FIELD_MOUNT,
              ]}
              showEventSelection={rightOpenedMenu === ERightMenus.MASKS}
              onEventClick={(event) => {
                setRightOpenedMenu(`${rightOpenedMenu}.${event}`);
              }}
            />
          )}
        </div>
      )}
      {!rightOpenedMenu && (
        <List component="nav">
          <ListSubheader component="div" inset>
            General
          </ListSubheader>
          <ListItemButton
            onClick={toggleRightMenu(ERightMenus.MAPPED_COMPONENTS)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Templates & mapped components" />
          </ListItemButton>
          <ListItemButton
            disabled={!cms.state.selectedComponent}
            onClick={toggleRightMenu(ERightMenus.FIELD_PROPS)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Field properties" />
          </ListItemButton>
          <Divider sx={{ my: 1 }} />
          <ListSubheader component="div" inset>
            Form Features
          </ListSubheader>
          <ListItemButton
            disabled={!cms.state.selectedComponent}
            onClick={toggleRightMenu(ERightMenus.BASIC)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Basic" />
          </ListItemButton>
          <ListItemButton
            disabled={!cms.state.selectedComponent}
            onClick={toggleRightMenu(ERightMenus.VALIDATIONS)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Validations" />
          </ListItemButton>
          <ListItemButton
            disabled={!cms.state.selectedComponent}
            onClick={toggleRightMenu(ERightMenus.ERROR_MESSAGES)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Error messages" />
          </ListItemButton>
          <ListItemButton
            disabled={!cms.state.selectedComponent}
            onClick={toggleRightMenu(ERightMenus.FILTERS)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Filter" />
          </ListItemButton>
          <ListItemButton
            disabled={!cms.state.selectedComponent}
            onClick={toggleRightMenu(ERightMenus.MASKS)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Masks" />
          </ListItemButton>
          <ListItemButton
            disabled={!cms.state.selectedComponent}
            onClick={toggleRightMenu(ERightMenus.FORMATTERS)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Formatters" />
          </ListItemButton>
          <ListItemButton
            disabled={!cms.state.selectedComponent}
            onClick={toggleRightMenu(ERightMenus.API)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Api's" />
          </ListItemButton>
          <ListItemButton disabled={!cms.state.selectedComponent}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Visibility conditions" />
          </ListItemButton>
          <ListItemButton disabled={!cms.state.selectedComponent}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Clear Fields" />
          </ListItemButton>
          <ListSubheader component="div" inset>
            Global
          </ListSubheader>
          <ListItemButton disabled={!cms.state.selectedComponent}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Create template" />
          </ListItemButton>
        </List>
      )}
    </Drawer>
  );
}

export { RightPanel };
