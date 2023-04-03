import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";

import ListSubheader from "@mui/material/ListSubheader";

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { MappedComponents } from "../mapped-components/mapped-components";
import { ComponentPropsForm } from "../component-props-form/component-props-form";
import { ComponentsHierarchy } from "../components-hierarchy/components-hierarchy";
import { FormComponentFeatures } from "../form-component-features/form-component-features";
import { Drawer } from "../drawer/drawer";
import { useCms } from "../../contexts/cms.context";
import { BreadCrumb } from "../breadcrumb/breadcrumb";

enum ERightMenus {
  MAPPED_COMPONENTS = "mapped",
  FIELD_PROPS = "fieldprops",
  FORM_HIERARCHY = "hierarchy",
  VALIDATIONS = "validations",
  FILTERS = "filters",
  MASKS = "masks",
  ERROR_MESSAGES = "errorMessages",
}

function FeatureEvents({
  events,
  onEventClick,
}: {
  events: string[];
  onEventClick(event: string): void;
}) {
  return (
    <List component="nav">
      <ListSubheader inset>Choose the life-cycle event</ListSubheader>
      {events.map((event) => (
        <ListItemButton key="event" onClick={() => onEventClick(event)}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={event} />
        </ListItemButton>
      ))}
    </List>
  );
}

export { FeatureEvents };
