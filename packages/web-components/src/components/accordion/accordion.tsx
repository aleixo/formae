import { TComponent } from "@form-builder/engine";

import InfoRounded from "@mui/icons-material/InfoRounded";
import Tooltip from "@mui/material/Tooltip";
import DashboardIcon from "@mui/icons-material/Dashboard";

import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export interface TPros {
  onChange?(component: TComponent): void;
  title: string;
  description?: string;
  tooltipText?: string;
  children: React.ReactNode;
  id?: string;
  disabled?: boolean;
}

export const Accordion = ({
  title,
  description,
  tooltipText,
  children,
  id,
  disabled,
}: TPros) => {
  return (
    <MuiAccordion disabled={disabled}>
      <AccordionSummary expandIcon={<ExpandMore />} id={id}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={title} />
          <ListItemText secondary={description} />
          <Tooltip title={tooltipText || description}>
            <InfoRounded color="primary" />
          </Tooltip>
        </div>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
};
